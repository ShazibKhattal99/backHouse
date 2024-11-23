import { Request, Response } from 'express';
import { IArtistUser } from '../models/artistUser';
import {
    createUser,
    loginUserWithEmail,
    saveRefreshToken,
    verifyRefreshToken,
    generateNewToken,
    generateRefreshToken, 
    createArtistUser
} from '../repositories/user.repository';

export const registerUser = async (req: Request, res: Response) => {
    const { email, password, artistDetails } = req.body; 
    try {
        const user = await createUser(email, password);
        if (artistDetails) {
            const artistData: IArtistUser = {
                email: artistDetails.email,
                name: artistDetails.name,
                phoneNumber: artistDetails.phoneNumber,
                houseNo: artistDetails.houseNo,
                buildingHouseName: artistDetails.buildingHouseName,
                street: artistDetails.street,
                pincode: artistDetails.pincode,
                skills: artistDetails.skills,
                pancard: artistDetails.pancard,
                userId: artistDetails.userId
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
        const { token, uid } = await loginUserWithEmail(email, password);
        const refreshToken = generateRefreshToken(); 
        await saveRefreshToken(uid, refreshToken); 
        res.status(200).json({ message: 'Login successful', accesToken: token, refreshToken: refreshToken });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
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
