import validator from "validator";
import axios from "axios";

// VALIDATING URL:

const validateAndCheckURL = async (url) => {
    // Validate the URL format
    if (!validator.isURL(url, { protocols: ['http', 'https'], require_protocol: true })) {
      return { isValid: false, message: 'Invalid URL format' };
    }
  
    try {
      // Check if the URL is reachable
      await axios.get(url);
      return { isValid: true };
    } catch (error) {
      return { isValid: false, message: 'URL is not reachable' };
    }
  };

  export default validateAndCheckURL;