import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Pricing from './models/Pricing.js';
import Warehouse from './models/Warehouse.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const adminExists = await User.findOne({ email: 'admin@vardha.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@vardha.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created: admin@vardha.com / admin123');
    } else {
      console.log('Admin user already exists');
    }

    const defaultPricings = [
      { warehouseType: 'small', pricePerSqFt: 15, minArea: '500 sq ft', maxArea: '2000 sq ft', deposit: 50000, maintenance: 2000, currency: 'INR', billingCycle: 'monthly' },
      { warehouseType: 'medium', pricePerSqFt: 12, minArea: '2000 sq ft', maxArea: '10000 sq ft', deposit: 100000, maintenance: 5000, currency: 'INR', billingCycle: 'monthly' },
      { warehouseType: 'large', pricePerSqFt: 10, minArea: '10000 sq ft', maxArea: '50000 sq ft', deposit: 200000, maintenance: 10000, currency: 'INR', billingCycle: 'monthly' },
      { warehouseType: 'cold-storage', pricePerSqFt: 25, minArea: '1000 sq ft', maxArea: '20000 sq ft', deposit: 150000, maintenance: 8000, currency: 'INR', billingCycle: 'monthly' },
    ];

    for (const pricing of defaultPricings) {
      const exists = await Pricing.findOne({ warehouseType: pricing.warehouseType });
      if (!exists) {
        await Pricing.create(pricing);
        console.log(`Pricing created for: ${pricing.warehouseType}`);
      }
    }

    const sampleWarehouses = [
      {
        title: 'Premium Warehouse A',
        location: 'Gorakhpur Industrial Area, Phase 1',
        description: 'State-of-the-art warehouse with modern amenities, 24/7 security, and excellent connectivity to major highways.',
        area: '10,000 sq ft',
        price: 120000,
        priceUnit: 'month',
        minArea: '5000 sq ft',
        maxArea: '25000 sq ft',
        warehouseType: 'large',
        amenities: ['24/7 Security', 'CCTV Surveillance', 'Fire Safety', 'Loading Dock', 'Power Backup', 'Ramp Access'],
        featured: true,
        status: 'available',
      },
      {
        title: 'Compact Storage Unit B',
        location: 'Gorakhpur, Near NH-27',
        description: 'Compact and affordable storage solution ideal for small businesses and startups.',
        area: '2,000 sq ft',
        price: 30000,
        priceUnit: 'month',
        minArea: '1000 sq ft',
        maxArea: '5000 sq ft',
        warehouseType: 'small',
        amenities: ['24/7 Security', 'CCTV', 'Power Backup'],
        featured: true,
        status: 'available',
      },
      {
        title: 'Cold Storage Facility C',
        location: 'Gorakhpur Food Park',
        description: 'Temperature-controlled cold storage facility perfect for perishable goods and pharmaceuticals.',
        area: '15,000 sq ft',
        price: 375000,
        priceUnit: 'month',
        minArea: '5000 sq ft',
        maxArea: '50000 sq ft',
        warehouseType: 'cold-storage',
        amenities: ['Temperature Control', 'Humidity Control', 'Backup Generator', 'Loading Dock', 'Quality Inspection'],
        featured: false,
        status: 'available',
      },
    ];

    for (const warehouse of sampleWarehouses) {
      const exists = await Warehouse.findOne({ slug: warehouse.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') });
      if (!exists) {
        await Warehouse.create(warehouse);
        console.log(`Warehouse created: ${warehouse.title}`);
      }
    }

    console.log('Seed data completed successfully');
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
