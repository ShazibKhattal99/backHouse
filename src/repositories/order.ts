import Order, { OrderDocument } from '../models/orders';

export const createOrder = async (orderData: OrderDocument) => {
  const order = new Order(orderData);
  return await order.save();
};

export const updateOrder = async (transactionId: string, updateData: Partial<OrderDocument>) => {
  return await Order.findOneAndUpdate({ transactionId }, updateData, { new: true });
};
export const findOrdersByUserId = async (userId: any) => {
  try {
    // Query the database for orders associated with the given userId
    const orders = await Order.find({ userId }).exec();
    return orders; // Return the found orders
  } catch (error) {
    throw new Error('Error retrieving orders: ' + error);
  }
};