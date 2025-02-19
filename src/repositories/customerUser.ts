// repositories/customer.repository.ts

import Customer, { ICustomer } from '../models/customerUser'
/**
 * Creates and saves a new customer.
 * @param customerData Partial customer details including name and mobile.
 * @returns The saved customer document.
 */
export const createCustomer = async (customerData: Partial<ICustomer>): Promise<ICustomer> => {
  const customer = new Customer(customerData);
  return await customer.save();
};

/**
 * Finds a customer by mobile number.
 * @param mobile The customer's mobile number.
 * @returns The customer document or null if not found.
 */
export const findCustomerByMobile = async (mobile: string): Promise<ICustomer | null> => {
  return await Customer.findOne({ mobile });
};
