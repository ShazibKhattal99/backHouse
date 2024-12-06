import { Request, Response } from 'express';
import { IArtistUser } from '../models/artistUser';
import {
    createUser,
    getArtistDetailsByEmail,
    saveRefreshToken,
    verifyRefreshToken,
    generateNewToken,
    generateRefreshToken, 
    createArtistUser,fetchAllArtists
} from '../repositories/user.repository';

export const registerUser = async (req: Request, res: Response) => {
    const { email, password, artistDetails ,skills} = req.body; 
    console.log("req",req.body)
    try {
        const user = await createUser(email, password);
        if (artistDetails) {
            const artistData: IArtistUser = {
                email: artistDetails.email,
                password:password,
                name: artistDetails.name,
                phoneNumber: artistDetails.phoneNumber,
                houseNo: artistDetails.houseNo,
                buildingHouseName: artistDetails.buildingHouseName,
                street: artistDetails.street,
                pincode: artistDetails.pincode,
                skills: skills,
                pancard: artistDetails.pancard,
                userId: artistDetails.userId,
                city:artistDetails.city,
            } as IArtistUser;
            let res = await createArtistUser(artistData);
            console.log("res", JSON.stringify(res))
        }
        res.status(201).json({
            message: 'User registered successfully',
            user
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Fetch artist details by email
        const artistDetails = await getArtistDetailsByEmail(email);
        if (!artistDetails) {
            throw new Error('User does not exist');
        }

        // Validate the password
        if (artistDetails.password !== password) {
            console.log("artistDetails.password",artistDetails.password)
            throw new Error('Invalid email or password');
        }

        // Respond with the artist details
        res.status(200).json({
            message: 'Login successful',
            user: artistDetails, // Return all artist details
        });
    } catch (error: any) {
        res.status(400).json({
            message: error.message || 'Invalid credentials',
        });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    try {
        const userId = await verifyRefreshToken(refreshToken);
        const newToken = await generateNewToken(refreshToken);
        res.status(200).json({ token: newToken });
    } catch (error: any) {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};
export const getAllArtists = async (req: Request, res: Response) => {
    try {
        const artists = await fetchAllArtists(); // Fetch all artists
        res.status(200).json({ message: 'Artist users fetched successfully', artists });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};