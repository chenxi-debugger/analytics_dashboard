import mongoose from 'mongoose';

// The modules a role can be granted access to, and the actions per module.
export const PERMISSION_MODULES = [
  'User Management',
  'Content Management',
  'Disputes Management',
  'Database Management',
  'Financial Management',
  'Reporting',
  'API Control',
  'Repository Management',
  'Payroll',
];

const modulePermissionSchema = new mongoose.Schema(
  {
    module: { type: String, required: true },
    read: { type: Boolean, default: false },
    write: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
  },
  { _id: false }
);

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: '' },
    permissions: { type: [modulePermissionSchema], default: [] },
    isSystem: { type: Boolean, default: false }, // built-in roles cannot be deleted
  },
  { timestamps: true }
);

roleSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id.toString(),
    name: this.name,
    description: this.description,
    permissions: this.permissions,
    isSystem: this.isSystem,
  };
};

const Role = mongoose.model('Role', roleSchema);

export default Role;
