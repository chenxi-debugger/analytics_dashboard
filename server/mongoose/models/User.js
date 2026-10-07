import mongoose from 'mongoose';

// A dashboard user. The password is never stored in plain text:
// we only keep a bcrypt hash, and `select: false` keeps it out of normal queries.
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, default: 'Subscriber' }, // matches a Role.name
    plan: { type: String, enum: ['Basic', 'Company', 'Enterprise', 'Team'], default: 'Basic' },
    status: { type: String, enum: ['active', 'pending', 'inactive'], default: 'active' },
    contact: { type: String, default: '' },
    company: { type: String, default: '' },
    country: { type: String, default: '' },
    language: { type: String, default: 'English' },
    avatarColor: { type: String, default: 'primary' },
    billing: { type: String, enum: ['Auto Debit', 'Manual - Cash', 'Manual - Paypal', 'Manual - Credit Card'], default: 'Auto Debit' },
    isDemoAdmin: { type: Boolean, default: false }, // the seeded demo account cannot be deleted
  },
  { timestamps: true }
);

// Shape sent to the browser (no password hash, `id` instead of `_id`).
userSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id.toString(),
    fullName: this.fullName,
    username: this.username,
    email: this.email,
    role: this.role,
    plan: this.plan,
    status: this.status,
    contact: this.contact,
    company: this.company,
    country: this.country,
    language: this.language,
    avatarColor: this.avatarColor,
    billing: this.billing,
    isDemoAdmin: this.isDemoAdmin,
    createdAt: this.createdAt,
  };
};

const User = mongoose.model('User', userSchema);

export default User;
