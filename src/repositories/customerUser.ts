import Customer, { ICustomer } from '../models/customerUser'

export const createCustomer = async (customerData: Partial<ICustomer>): Promise<ICustomer> => {
  const customer = new Customer(customerData);
  return await customer.save();
};

export const findCustomerByMobile = async (phoneNumber: string): Promise<boolean> => {
  const customer = await Customer.findOne({ phoneNumber });
  return !!customer;
};

export const getCustomerDetailsByMobile = async (phoneNumber: string): Promise<ICustomer | null> => {
  return await Customer.findOne({ phoneNumber });
};