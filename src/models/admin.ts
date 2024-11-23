import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Admin document
export interface AdminDocument extends Document {
  username: string; // Admin's unique username
  password: string; // Admin's hashed password
  level: string;    // Admin's level (e.g., Grandmaster, Overseer, etc.)
  claims: string[]; // List of permissions or claims
  isLocked: boolean; // Indicates if the system is locked
}

// Define the Admin schema
const AdminSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true }, // Unique username for each admin
  password: { type: String, required: true },               // Admin's password (should be hashed)
  level: { type: String, required: true },                  // Admin level (e.g., Grandmaster)
  claims: { type: [String], default: [] },                  // Array of claims
  isLocked: { type: Boolean, default: false },              // Lock status for the system
});

// Create the Admin model
const Admin = mongoose.model<AdminDocument>('Admin', AdminSchema);

export default Admin;
