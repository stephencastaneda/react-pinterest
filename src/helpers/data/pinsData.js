import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((result) => {
      const allPinsObject = result.data;
      const pins = [];
      if (allPinsObject !== null) {
        Object.keys(allPinsObject).forEach((pinId) => {
          const newPin = allPinsObject[pinId];
          newPin.id = pinId;
          pins.push(newPin);
        });
      }
      resolve(pins);
    })
    .catch((err) => reject(err));
});


export default { getPinsByBoardId };
