import mongoose from 'mongoose';

// A named permission and the roles it is assigned to.
const permissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    assignedTo: { type: [String], default: [] }, // Role names
    isCore: { type: Boolean, default: false },
  },
  { timestamps: true }
);

permissionSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id.toString(),
    name: this.name,
    assignedTo: this.assignedTo,
    isCore: this.isCore,
    createdAt: this.createdAt,
  };
};

const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;
