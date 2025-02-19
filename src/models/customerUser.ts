import { Schema, model, Document } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  phoneNumber: string;
  // Optionally, you can add a computed hashed ID, but it’s typically not needed
  // mobileHash?: string;
}

const CustomerSchema = new Schema<ICustomer>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true, // Enforces uniqueness and creates an index automatically
    index: true,
  },
});

// If you need a hashed index (only for equality queries) you can uncomment the following line.
// Note: Hashed indexes in MongoDB only support equality matches.
// CustomerSchema.index({ mobile: "hashed" });

export default model<ICustomer>('Customer', CustomerSchema);
