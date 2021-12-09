import { get } from '../utils/http';
export const getList = (filter, token) =>
  new Promise(async (resolve, reject) => {
    const tokens = filter.split(' ');
    let filterString = tokens.join('+');
    if (filterString.charAt(filterString.length - 1) === '+') {
      filterString = filterString.substring(0, filterString.length - 1);
    }
    try {
      const response = await get(
        `itunes?filter=${filterString}&token=${token}`,
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
