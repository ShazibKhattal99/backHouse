import mongoose, { Schema, Document } from 'mongoose';

interface CartItem {
  serviceId: string;
  quantity: number;
  title: string;
  image: string;
  price: number;
  totalPrice: number;
}

export interface OrderDocument extends Document {
  transactionId: string;
  name: string;
  phoneNumber: string;
  address: string;
  date: string;
  time: string;
  longitude: number;
  latitude: number;
  cartItems: CartItem[];
  orderPlacedDate: string;
  orderPlacedTime: string;
  userId: string;
  artistId: string;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
}

const CartItemSchema = new Schema<CartItem>({
  serviceId: { type: String, required: true },
  quantity: { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

const OrderSchema = new Schema<OrderDocument>({
  transactionId: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  cartItems: [CartItemSchema],
  orderPlacedDate: { type: String, required: true },
  orderPlacedTime: { type: String, required: true },
  userId: { type: String, required: true },
  artistId:{ type: String, required: false },
  totalAmount: { type: Number, required: true },
  orderStatus: { type: String, required: true },
  paymentStatus: { type: String, required: true },
});

export default mongoose.model<OrderDocument>('Order', OrderSchema);
