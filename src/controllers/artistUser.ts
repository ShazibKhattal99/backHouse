import { Request, Response } from 'express';
import { IArtistUser } from '../models/artistUser';
import {
    createArtistUser, fetchAllArtists,
    fetchArtistByPhoneNumber
} from '../repositories/artistUser';

export const registerUser = async (req: Request, res: Response) => {
    const { customerDetails, skills } = req.body;
    try {
        if (customerDetails) {
            const artistData: IArtistUser = {
                email: customerDetails?.email,
                name: customerDetails.name,
                phoneNumber: customerDetails.phone,
                houseNo: customerDetails.houseNo,
                buildingHouseName: customerDetails.buildingHouseName,
                street: customerDetails.street,
                pincode: customerDetails.pincode,
                skills: skills,
                pancard: customerDetails.panCard,
                artistId: customerDetails.userId,
                city: customerDetails.city,
            } as unknown as IArtistUser; console.log(artistData)
            let res = await createArtistUser(artistData);
            console.log("res", JSON.stringify(res))
        }
        res.status(201).json({
            message: 'User registered successfully',
        });
    } catch (error: any) {
        console.log("error", error)
        res.status(400).json({ message: error.message });
    }
};

// export const loginUser = async (req: Request, res: Response) => {
//     const { email } = req.body;
//     try {
//         const artistDetails = await getArtistDetailsByEmail(email);
//         if (!artistDetails) {
//             throw new Error('User does not exist');
//         }
//         res.status(200).json({
//             message: 'Login successful',
//             user: artistDetails, // Return all artist details
//         });
//     } catch (error: any) {
//         res.status(400).json({
//             message: error.message || 'Invalid credentials',
//         });
//     }
// };

export const getAllArtists = async (req: Request, res: Response) => {
    try {
        const artists = await fetchAllArtists(); // Fetch all artists
        res.status(200).json({ message: 'Artists fetched successfully', artists });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getArtistByPhoneNumber = async (req: any, res: any) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({ message: 'Phone number is required' });
        }
        const artist = await fetchArtistByPhoneNumber(phoneNumber as string); // Fetch artist by phone number
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        res.status(200).json({ message: 'Artist fetched successfully', artist });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
