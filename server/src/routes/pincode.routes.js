import express from 'express';
import { getPincodeDetails, getHealth } from '../controllers/pincode.controller.js';

const router = express.Router();

// Health check route
router.get('/health', getHealth);

// Pincode detail retrieval route
router.get('/pincodes/:pincode', getPincodeDetails);

export default router;
