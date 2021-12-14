import { post, postRecaptcha } from '../utils/http';
export const login = (email, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await post({ url: 'login', body: { email, password } });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });

export const verifyRecaptcha = token =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await postRecaptcha({
        url: 'siteverify',
        body: {
          response: token,
          secret: '6Le0Mo0dAAAAAPgxjWVwGU2v1Jud6sm-gXya6njm',
        },
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
