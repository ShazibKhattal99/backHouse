import mongoose, { Schema, Document } from 'mongoose';

export interface IArtistUser extends Document {
    email: string;
    name: string;
    phoneNumber: string;
    houseNo: string;
    buildingHouseName: string;
    street: string;
    pincode: string;
    skills: string[];
    pancard: string;
    userId:string;
    city:String;
}

const artistUserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    houseNo: { type: String, required: true },
    buildingHouseName: { type: String, required: true },
    street: { type: String, required: true },
    pincode: { type: String, required: true },
    skills: { type: [], required: true }, // Array of skills
    pancard: { type: String, required: true },
    artistId: { type: String, required: true },
    city:{ type: String, required: true }
});

const ArtistUser = mongoose.model<IArtistUser>('ArtistUser', artistUserSchema);
export default ArtistUser;
