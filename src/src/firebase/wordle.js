import { doc, getDoc, setDoc } from "firebase/firestore";

import db from "./db";

const WORDLE = "wordles";

export function createWordle(id, challenge) {
  return setDoc(doc(db, WORDLE, id), challenge);
}

export function getWordle(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const document = await getDoc(doc(db, WORDLE, id));

      if (!document.exists()) {
        reject(
          "Could not find the challenge. Please try again with a valid invite."
        );
      }

      resolve(document.data());
    } catch (error) {
      reject(
        "Error occurred while retrieving challenge. Please try again later."
      );
    }
  });
}
