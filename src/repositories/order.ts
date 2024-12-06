import Order, { OrderDocument } from '../models/orders';

export const createOrder = async (orderData: OrderDocument) => {
  const order = new Order(orderData);
  return await order.save();
};

export const updateOrder = async (transactionId: string, updateData: Partial<OrderDocument>) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { transactionId },
      updateData,
      { new: true } // Return updated document
    );
    return updatedOrder;
  } catch (error) {
    throw new Error('Failed to update order: ' + error);
  }
};

export const findOrdersByArtistId = async (artistId: any) => {
  try {
    // Query the database for orders associated with the given userId
    const orders = await Order.find({ artistId }).exec();
    return orders; // Return the found orders
  } catch (error) {
    throw new Error('Error retrieving orders: ' + error);
  }
};

export const getAllOrders = async () => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find().exec();
    return orders;
  } catch (error) {
    throw new Error('Error retrieving all orders: ' + error);
  }
};