import { Request, Response } from 'express';
import * as orderRepository from '../repositories/order';

// Existing createOrder function
export const createOrders = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const newOrder = await orderRepository.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
};

// New updateOrder function
export const updateOrders = async (req: Request, res: any) => {
  try {
    const { transactionId } = req.params;
    const updateData = req.body;
    const updatedOrder = await orderRepository.updateOrder(transactionId, updateData);
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order', error });
  }
};
export const getOrdersByUserId = async (req: Request, res: any) => {
  try {
    const { userId } = req.query; // Get userId from route parameters
    console.log("userId",userId)
    const orders = await orderRepository.findOrdersByUserId(userId); // Call repository function
console.log("orders",orders)
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve orders', error });
  }
};