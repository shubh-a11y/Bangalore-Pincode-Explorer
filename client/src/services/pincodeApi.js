const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Searches Bangalore area details for a given 6-digit PIN code.
 *
 * @param {string} pincode - 6-digit PIN code to query
 * @returns {Promise<{success: boolean, data?: object, message?: string}>}
 */
export async function searchPincode(pincode) {
  const cleanPincode = pincode ? pincode.trim() : '';

  if (!cleanPincode) {
    return {
      success: false,
      message: 'Please enter a PIN code to search.'
    };
  }

  const endpoint = `${API_BASE_URL}/api/pincodes/${encodeURIComponent(cleanPincode)}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Unable to retrieve area details. Please try again.'
      };
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      return {
        success: false,
        message: 'Request timed out. Please check your internet connection or server status.'
      };
    }

    return {
      success: false,
      message: 'Unable to connect to server. Please ensure the backend server is running.'
    };
  }
}

/**
 * Utility function to check backend API health status.
 *
 * @returns {Promise<boolean>}
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    const data = await response.json();
    return data.success === true;
  } catch (err) {
    return false;
  }
}
