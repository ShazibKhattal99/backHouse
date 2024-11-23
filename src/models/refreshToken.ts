import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, expires: '1d', default: Date.now }, // Automatically remove after 1 hour
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
export default RefreshToken;
