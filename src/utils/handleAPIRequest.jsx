import axios from 'axios';

const handleAPIRequest = ({ url, method, data }) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        url: url,
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      });

      if (response) {
        let { Data } = response.data;
        resolve(Data);
      }
    } catch (error) {
      reject(
        error.response
          ? error.response.data
          : 'Some Thing is wrong, Try again later'
      );
    }
  });
};

export default handleAPIRequest;
