import { Request, Response } from 'express';
import { createCustomer, findCustomerByMobile,getCustomerDetailsByMobile } from '../repositories/customerUser';
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

export const customerExist = async (req: Request, res: Response): Promise<void> => {
    try {
        const phoneNumber = req.query.phoneNumber as string | undefined;
        if (!phoneNumber) {
            res.status(400).json({ error: 'Phone number is required' });
            return;
        }
        if (!/^\d{12}$/.test(phoneNumber) || !phoneNumber.startsWith('91')) {
            res.status(400).json({ error: 'Invalid phone number. It must start with 91 and be 12 digits long.' });
            return;
        }
        const customer = await findCustomerByMobile(phoneNumber);
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
export const getCustomerDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const phoneNumber = req.query.phoneNumber as string | undefined;
        if (!phoneNumber) {
            res.status(400).json({ error: 'Phone number is required' });
            return;
        }
        if (!/^\d{12}$/.test(phoneNumber) || !phoneNumber.startsWith('91')) {
            res.status(400).json({ error: 'Invalid phone number. It must start with 91 and be 12 digits long.' });
            return;
        }
        const customer = await getCustomerDetailsByMobile(phoneNumber);
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