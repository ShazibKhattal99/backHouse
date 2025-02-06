import { Request, Response } from 'express';
import { createAdmin, findAdminByUsername, findAdminById, addClaimsToAdmin, lockSystem, unlockSystem } from '../repositories/admin';

const ADMIN_LEVELS = ['Grandmaster', 'Overseer', 'Commander'];

export const registerAdmin = async (req: Request, res: any) => {
  try {
    const { username, password, level } = req.body;
    const adminLevel = level || ADMIN_LEVELS[Math.floor(Math.random() * ADMIN_LEVELS.length)];
    const admin = await createAdmin({ username, password, level: adminLevel });
    res.status(201).json({ message: 'Admin created', admin });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const loginAdmin = async (req: Request, res: any) => {
  try {
    const { username, password } = req.body;
    const admin = await findAdminByUsername(username);
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    if (admin.password !== password) return res.status(401).json({ error: 'Invalid credentials' });
    if (admin.isLocked) return res.status(403).json({ error: 'System is locked' });

    res.status(200).json({ message: 'Login successful', admin });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const addClaims = async (req: Request, res: any) => {
  try {
    const { adminId, claims } = req.body;
    const updatedAdmin = await addClaimsToAdmin(adminId, claims);
    if (!updatedAdmin) return res.status(404).json({ error: 'Admin not found' });
    res.status(200).json({ message: 'Claims added', admin: updatedAdmin });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const lockSystemByAdmin = async (req: Request, res: any) => {
  try {
    const { adminId } = req.body;
    const admin = await findAdminById(adminId);
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    if (admin.level !== 'Grandmaster') return res.status(403).json({ error: 'Only Grandmaster can lock the system' });

    await lockSystem();
    res.status(200).json({ message: 'System locked by Grandmaster' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
export const unlockSystemByAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { adminId } = req.body;
    const admin = await findAdminById(adminId);
    if (!admin) {
      res.status(404).json({ error: 'Admin not found' });
      return;
    }
    if (admin.level !== 'Grandmaster') {
      res.status(403).json({ error: 'Only Grandmaster can unlock the system' });
      return;
    }

    await unlockSystem();
    res.status(200).json({ message: 'System unlocked by Grandmaster' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};