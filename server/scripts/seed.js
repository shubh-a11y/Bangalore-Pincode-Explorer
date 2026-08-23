import dotenv from 'dotenv';
dotenv.config();

import { connectDB, disconnectDB } from '../src/config/db.js';
import Pincode from '../src/models/pincode.model.js';

const bangalorePincodes = [
  { pincode: '560001', area: 'Bangalore GPO / MG Road / Vidhana Soudha', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560002', area: 'City Market / Chickpet', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560003', area: 'Malleshwaram', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560004', area: 'Basavanagudi', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560008', area: 'Ulsoor / Halasuru', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560010', area: 'Rajajinagar', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560011', area: 'Jayanagar 3rd Block', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560016', area: 'Ramamurthy Nagar', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560017', area: 'Vimanapura / Old Airport Road', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560025', area: 'Richmond Town', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560029', area: 'Dharmaram College / Tavarekere', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560034', area: 'Koramangala', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560037', area: 'Marathahalli', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560038', area: 'Indiranagar', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560040', area: 'Vijayanagar', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560041', area: 'Jayanagar 4th Block', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560043', area: 'Banaswadi', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560064', area: 'Yelahanka', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560066', area: 'Whitefield', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560067', area: 'Kadugodi', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560068', area: 'Bommanahalli / Hosur Road', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560070', area: 'Banashankari 2nd Stage', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560075', area: 'HAL II Stage', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560076', area: 'Bannerghatta Road / Arekere', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560078', area: 'JP Nagar', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560085', area: 'Banashankari 3rd Stage / Kathriguppe', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560092', area: 'Sahakarnagar / Hebbal', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560093', area: 'Kaggadasapura / CV Raman Nagar', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560094', area: 'RMV 2nd Stage / Dollars Colony', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560100', area: 'Electronic City Phase 1', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560102', area: 'HSR Layout', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560103', area: 'Bellandur / Devarabesanahalli', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560104', area: 'Nagarbhavi', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560107', area: 'Madavara / Tumkur Road', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '560108', area: 'Peenya Industrial Estate', city: 'Bangalore', state: 'Karnataka' }
];

const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await connectDB();

    console.log('[Seed] Clearing existing pincode collection...');
    await Pincode.deleteMany({});

    console.log(`[Seed] Inserting ${bangalorePincodes.length} Bangalore PIN code entries...`);
    const created = await Pincode.insertMany(bangalorePincodes);

    console.log(`[Seed] Success! Seeded ${created.length} pincodes into MongoDB.`);
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error(`[Seed] Seeding failed: ${error.message}`);
    await disconnectDB();
    process.exit(1);
  }
};

seedDatabase();
