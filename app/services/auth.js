import { post } from '../utils/http';
export const login = (email, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await post({ url: 'login', body: { email, password } });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
