import Admin, { AdminDocument } from '../models/adminUser';

export const createAdmin = async (adminData: Partial<AdminDocument>): Promise<AdminDocument> => {
  const admin = new Admin(adminData);
  return await admin.save();
};

export const findAdminByUsername = async (username: string): Promise<AdminDocument | null> => {
  return await Admin.findOne({ username });
};

export const findAdminById = async (id: string): Promise<AdminDocument | null> => {
  return await Admin.findById(id);
};

export const addClaimsToAdmin = async (adminId: string, claims: string[]): Promise<AdminDocument | null> => {
  const admin = await Admin.findById(adminId);
  if (!admin) return null;
  admin.claims.push(...claims);
  return await admin.save();
};

export const lockSystem = async (): Promise<void> => {
  await Admin.updateMany({}, { isLocked: true });
};

export const unlockSystem = async (): Promise<void> => {
  await Admin.updateMany({}, { isLocked: false });
};
