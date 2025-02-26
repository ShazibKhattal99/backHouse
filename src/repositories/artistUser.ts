import admin from '../config/firebase';
import { v4 as uuidv4 } from 'uuid'; 
import ArtistUser, { IArtistUser } from '../models/artistUser';

const auth = admin.auth();

export const createArtistUser = async (artistData: IArtistUser) => {
    const artistUser = new ArtistUser(artistData);
    await artistUser.save(); 
    return artistUser;
};

export const fetchAllArtists = async () => {
    const artists = await ArtistUser.find();
    return artists;
};

export const fetchArtistByPhoneNumber = async (phoneNumber: string) => {
        const artist = await ArtistUser.findOne({ phoneNumber }).exec();
        return artist;
};
