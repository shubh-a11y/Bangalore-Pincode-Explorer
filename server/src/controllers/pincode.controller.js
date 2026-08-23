import Pincode from '../models/pincode.model.js';

/**
 * Controller to fetch Bangalore area details by 6-digit PIN code.
 * GET /api/pincodes/:pincode
 */
export const getPincodeDetails = async (req, res, next) => {
  try {
    const { pincode } = req.params;

    // Validate 6-digit Indian PIN code format (starts with 1-9 followed by 5 digits)
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!pincode || !pincodeRegex.test(pincode.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 6-digit PIN code.'
      });
    }

    const cleanPincode = pincode.trim();

    // Query database for pincode details
    const result = await Pincode.findOne({ pincode: cleanPincode }).lean();

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'No area found for this PIN code.'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        pincode: result.pincode,
        area: result.area,
        city: result.city,
        state: result.state
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Health check controller.
 * GET /api/health
 */
export const getHealth = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Server is healthy'
  });
};
