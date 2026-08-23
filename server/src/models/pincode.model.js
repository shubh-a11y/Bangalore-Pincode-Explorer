import mongoose from 'mongoose';

const pincodeSchema = new mongoose.Schema(
  {
    pincode: {
      type: String,
      required: [true, 'PIN code is required'],
      unique: true,
      index: true, // Creates a B-tree index for O(log N) lookup speed on frequent PIN searches
      trim: true,
      validate: {
        validator: function (v) {
          return /^[1-9][0-9]{5}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid 6-digit Indian PIN code.`
      }
    },
    area: {
      type: String,
      required: [true, 'Area name is required'],
      trim: true
    },
    city: {
      type: String,
      required: true,
      default: 'Bangalore',
      trim: true
    },
    state: {
      type: String,
      required: true,
      default: 'Karnataka',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Pincode = mongoose.model('Pincode', pincodeSchema);

export default Pincode;
