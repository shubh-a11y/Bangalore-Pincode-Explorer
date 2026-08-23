import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/app.js';
import Pincode from '../src/models/pincode.model.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Seed sample data for tests
  await Pincode.insertMany([
    { pincode: '560001', area: 'Bangalore GPO', city: 'Bangalore', state: 'Karnataka' },
    { pincode: '560034', area: 'Koramangala', city: 'Bangalore', state: 'Karnataka' }
  ]);
}, 120000); // 2-minute timeout for binary download

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe('Bangalore Pincode Explorer API', () => {
  describe('GET /api/health', () => {
    it('should return 200 and healthy status message', async () => {
      const res = await request(app).get('/api/health');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: 'Server is healthy'
      });
    });
  });

  describe('GET /api/pincodes/:pincode', () => {
    it('should return 200 and area details for a valid existing PIN code', async () => {
      const res = await request(app).get('/api/pincodes/560001');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual({
        pincode: '560001',
        area: 'Bangalore GPO',
        city: 'Bangalore',
        state: 'Karnataka'
      });
    });

    it('should return 400 for an invalid PIN code format (less than 6 digits)', async () => {
      const res = await request(app).get('/api/pincodes/5600');

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: 'Please provide a valid 6-digit PIN code.'
      });
    });

    it('should return 400 for non-numeric PIN codes', async () => {
      const res = await request(app).get('/api/pincodes/abc123');

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: 'Please provide a valid 6-digit PIN code.'
      });
    });

    it('should return 404 when PIN code does not exist in dataset', async () => {
      const res = await request(app).get('/api/pincodes/569999');

      expect(res.status).toBe(404);
      expect(res.body).toEqual({
        success: false,
        message: 'No area found for this PIN code.'
      });
    });
  });
});
