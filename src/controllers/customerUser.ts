import { Request, Response } from 'express';
import { createCustomer, findCustomerByMobile } from '../repositories/customerUser';
import { ICustomer } from '../models/customerUser';

export const registerCustomer = async (req: Request, res: Response): Promise<void> => {
    const { name, phoneNumber } = req.body;
    try {
        const existingCustomer = await findCustomerByMobile(phoneNumber);
        if (existingCustomer) {
            res.status(400).json({
                success: false,
                message: 'Customer with this mobile number already exists'
            });
            return;
        }
        const customer: ICustomer = await createCustomer({ name, phoneNumber });
        res.status(201).json({
            success: true,
            message: 'Customer registered successfully',
        });
    } catch (error: any) {
        console.error("Error during customer registration:", error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getCustomerDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { mobile } = req.params;
        const customer = await findCustomerByMobile(mobile);
        if (!customer) {
            res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            customer
        });
    } catch (error: any) {
        console.error('Error fetching customer details:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}