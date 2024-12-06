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
    const { transactionId } = req.params; // Fetch transaction ID from URL
    const updateData = req.body; // Fetch update data from request body

    // Validate if the artistAssigned is boolean when provided
    if (updateData.artistAssigned !== undefined && typeof updateData.artistAssigned !== 'boolean') {
      return res.status(400).json({ message: 'Invalid value for artistAssigned' });
    }

    const updatedOrder = await orderRepository.updateOrder(transactionId, updateData);

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order', error });
  }
};

export const findOrdersByArtistId = async (req: Request, res: any) => {
  try {
    const { artistId } = req.query; // Get userId from route parameters
    const orders = await orderRepository.findOrdersByArtistId(artistId); // Call repository function
    console.log("orders", orders)
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve orders', error });
  }
};

export const getAllOrders = async (req: Request, res: any) => {
  try {
    const orders = await orderRepository.getAllOrders();
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve all orders', error });
  }
};