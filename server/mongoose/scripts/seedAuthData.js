// Seeds roles, permissions and demo users the first time the server starts
// (only when the collections are empty), so a fresh database works out of the box.
//
// Run manually to reset the demo data:   node mongoose/scripts/seedAuthData.js --reset
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import 'dotenv/config';
import User from '../models/User.js';
import Role, { PERMISSION_MODULES } from '../models/Role.js';
import Permission from '../models/Permission.js';

export const DEMO_ADMIN = {
  email: 'admin@demo.com',
  password: process.env.DEMO_ADMIN_PASSWORD || 'Admin@123',
};

const allow = (read, write, create) => PERMISSION_MODULES.map((module) => ({ module, read, write, create }));

const ROLES = [
  { name: 'Administrator', description: 'Full access to every module.', permissions: allow(true, true, true) },
  {
    name: 'Manager',
    description: 'Manages users, content and reports.',
    permissions: PERMISSION_MODULES.map((module, i) => ({ module, read: true, write: i < 5, create: i < 3 })),
  },
  {
    name: 'Editor',
    description: 'Creates and edits content.',
    permissions: PERMISSION_MODULES.map((module) => ({
      module,
      read: true,
      write: module === 'Content Management',
      create: module === 'Content Management',
    })),
  },
  {
    name: 'Support',
    description: 'Handles disputes and customer issues.',
    permissions: PERMISSION_MODULES.map((module) => ({
      module,
      read: true,
      write: module === 'Disputes Management',
      create: false,
    })),
  },
  { name: 'Subscriber', description: 'Read-only access.', permissions: allow(true, false, false) },
];

const PERMISSIONS = [
  { name: 'Management', assignedTo: ['Administrator'], isCore: true },
  { name: 'Manage Billing & Roles', assignedTo: ['Administrator'] },
  { name: 'Add & Remove Users', assignedTo: ['Administrator', 'Manager'] },
  { name: 'Project Planning', assignedTo: ['Administrator', 'Manager', 'Editor'] },
  { name: 'Manage Email Sequences', assignedTo: ['Administrator', 'Editor', 'Support'] },
  { name: 'Client Communication', assignedTo: ['Administrator', 'Manager', 'Support'] },
  { name: 'Only View', assignedTo: ['Administrator', 'Subscriber'] },
  { name: 'Financial Management', assignedTo: ['Administrator', 'Manager'] },
  { name: 'Manage Others’ Tasks', assignedTo: ['Administrator', 'Support'] },
];

const FIRST = ['Ava', 'Liam', 'Mia', 'Noah', 'Emma', 'Ethan', 'Sofia', 'Lucas', 'Chloe', 'Mason', 'Grace', 'Leo',
  'Zoe', 'Owen', 'Ivy', 'Kai', 'Nora', 'Eli', 'Ruby', 'Max', 'Luna', 'Ryan', 'Hazel', 'Adam', 'Aria'];
const LAST = ['Chen', 'Patel', 'Garcia', 'Kim', 'Novak', 'Silva', 'Okafor', 'Rossi', 'Müller', 'Tanaka', 'Haddad',
  'Larsen', 'Moreau', 'Nguyen', 'Cohen', 'Brooks', 'Ivanova', 'Santos', 'Walsh', 'Ahmed', 'Kowalski', 'Ortiz', 'Berg',
  'Fischer', 'Duarte'];
const COUNTRIES = ['USA', 'Canada', 'Brazil', 'Germany', 'India', 'Japan', 'France', 'UK', 'Australia', 'China'];
const COMPANIES = ['Northwind', 'Blue Harbor', 'Lumen Labs', 'Pinecrest', 'Atlas Works', 'Brightline', 'Kestrel Co'];
const PLANS = ['Basic', 'Company', 'Enterprise', 'Team'];
const STATUSES = ['active', 'active', 'pending', 'inactive'];
const BILLING = ['Auto Debit', 'Manual - Cash', 'Manual - Paypal', 'Manual - Credit Card'];
const COLORS = ['primary', 'success', 'warning', 'error', 'info', 'secondary'];
const SEED_ROLES = ['Manager', 'Editor', 'Support', 'Subscriber', 'Subscriber', 'Editor'];

function buildDemoUsers(passwordHash) {
  const users = [];
  for (let i = 0; i < 48; i += 1) {
    const first = FIRST[i % FIRST.length];
    const last = LAST[(i * 7) % LAST.length];
    const username = `${first}.${last}${i}`.toLowerCase().replace(/[^a-z0-9.]/g, '');
    users.push({
      fullName: `${first} ${last}`,
      username,
      email: `${username}@example.com`,
      passwordHash,
      role: SEED_ROLES[i % SEED_ROLES.length],
      plan: PLANS[i % PLANS.length],
      status: STATUSES[i % STATUSES.length],
      contact: `+1 (${200 + ((i * 37) % 700)}) 555-${String(1000 + i * 113).slice(-4)}`,
      company: COMPANIES[i % COMPANIES.length],
      country: COUNTRIES[(i * 3) % COUNTRIES.length],
      avatarColor: COLORS[i % COLORS.length],
      billing: BILLING[i % BILLING.length],
    });
  }
  return users;
}

export async function ensureAuthSeed({ reset = false } = {}) {
  if (reset) {
    await Promise.all([User.deleteMany({}), Role.deleteMany({}), Permission.deleteMany({})]);
  }

  if ((await Role.countDocuments()) === 0) {
    await Role.insertMany(ROLES.map((r) => ({ ...r, isSystem: true })));
    console.log('🌱 Seeded roles');
  }
  if ((await Permission.countDocuments()) === 0) {
    await Permission.insertMany(PERMISSIONS);
    console.log('🌱 Seeded permissions');
  }
  if ((await User.countDocuments()) === 0) {
    const adminHash = await bcrypt.hash(DEMO_ADMIN.password, 10);
    // Demo users get a random password nobody knows; they exist only to fill the tables.
    const randomHash = await bcrypt.hash(Math.random().toString(36) + Date.now(), 10);
    await User.create({
      fullName: 'Demo Admin',
      username: 'demoadmin',
      email: DEMO_ADMIN.email,
      passwordHash: adminHash,
      role: 'Administrator',
      plan: 'Enterprise',
      status: 'active',
      contact: '+1 (408) 555-0100',
      company: 'Analytics Dashboard',
      country: 'USA',
      avatarColor: 'primary',
      isDemoAdmin: true,
    });
    await User.insertMany(buildDemoUsers(randomHash));
    console.log('🌱 Seeded demo users');
  }
}

// Allow running this file directly: node mongoose/scripts/seedAuthData.js [--reset]
if (process.argv[1] && process.argv[1].endsWith('seedAuthData.js')) {
  const reset = process.argv.includes('--reset');
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => ensureAuthSeed({ reset }))
    .then(() => console.log('✅ Auth seed finished'))
    .catch((err) => console.error('❌ Seed failed:', err))
    .finally(() => mongoose.disconnect());
}
