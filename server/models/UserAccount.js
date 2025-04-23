import mongoose from 'mongoose';

const userAccountSchema = new mongoose.Schema({
  id: Number,
  issuedDate: String,
  address: String,
  company: String,
  companyEmail: String,
  country: String,
  contact: String,
  name: String,
  service: String,
  total: Number,
  avatar: String,
  avatarColor: String,
  invoiceStatus: String,
  balance: mongoose.Schema.Types.Mixed,
  dueDate: String
});

const UserAccount = mongoose.model('UserAccount', userAccountSchema);

export default UserAccount;
