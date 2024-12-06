import admin from '../config/firebase';
import RefreshToken from '../models/refreshToken'; 
import { v4 as uuidv4 } from 'uuid'; 
import ArtistUser, { IArtistUser } from '../models/artistUser';

const auth = admin.auth();

export const createUser = async (email: string, password: string) => {
    const existingUser = await auth.getUserByEmail(email).catch(() => null);
    if (existingUser) {
        throw new Error('Email already in use');
    }
    const user = await auth.createUser({ email, password });
    return user;
};

export const createArtistUser = async (artistData: IArtistUser) => {
    const existingArtist = await ArtistUser.findOne({ email: artistData.email });
    if (existingArtist) {
        throw new Error('Artist user already exists with this email');
    }
    const artistUser = new ArtistUser(artistData);
    await artistUser.save(); 
    return artistUser;
};

export const getArtistDetailsByEmail = async (email: string) => {
    // Replace this with your actual database query
    const artist = await ArtistUser.findOne({ email }); // Use your artist model
    return artist;
};
export const saveRefreshToken = async (userId: string, refreshToken: string) => {
    const token = new RefreshToken({ userId, token: refreshToken });
    await token.save();
};

export const generateRefreshToken = () => {
    return uuidv4(); 
};

export const verifyRefreshToken = async (refreshToken: string) => {
    const tokenRecord = await RefreshToken.findOne({ token: refreshToken });
    if (!tokenRecord) {
        throw new Error('Invalid or expired refresh token');
    }
    return tokenRecord.userId; 
};

export const generateNewToken = async (refreshToken: string) => {
    const userId = await verifyRefreshToken(refreshToken);
    const newToken = await auth.createCustomToken(userId);
    return newToken;
};

export const deleteRefreshToken = async (refreshToken: string) => {
    await RefreshToken.deleteOne({ token: refreshToken });
}; 
export const fetchAllArtists = async () => {
    const artists = await ArtistUser.find(); // Retrieve all artist users
    return artists;
};