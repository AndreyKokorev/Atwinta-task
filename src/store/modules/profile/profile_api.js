import axios from 'axios';

const getResource = async (method, action, json) => {
  const access_token = localStorage.getItem('accessToken');
  const base_url = 'http://test.atwinta.ru/api/v1';
  const request_par = {
    method,
    headers: {
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json'
    },
    data: json
  };

  return await axios(`${base_url}${action}`, request_par);
};

export default getResource;