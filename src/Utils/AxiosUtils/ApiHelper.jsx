// ApiHelper.js
import axios from 'axios';
import { useState } from 'react';

export const useApiHelper = () => {
  const [loading, setLoading] = useState(false);
  const apiRequest = async (method, url, data, config) => {
    setLoading(true);
    try {
      const response = await axios({ method, url, data, ...config });
      return response.data;
    } catch (error) {
      // console.log(error?.code);
      
      if (error?.code === 'ERR_NETWORK') {
        console.error('Network Error: Please check your internet connection.');
        // navigate(`${process.env.PUBLIC_URL}/connection-lost`);
      }
      console.error(`API ${method.toUpperCase()} request failed:`, error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const get = (url, config) => apiRequest('get', url, null, config);
  const post = (url, data, config) => apiRequest('post', url, data, config);
  const put = (url, data, config) => apiRequest('put', url, data, config);
  const del = (url, config) => apiRequest('delete', url, null, config);

  return { get, post, put, del, loading };
};
