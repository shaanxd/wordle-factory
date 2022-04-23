import cryptoJs from "crypto-js";

const { REACT_APP_ENCRYPTION_SECRET_KEY: secretKey } = process.env;

function getEncryptedWord(word) {
  return cryptoJs.AES.encrypt(word, secretKey);
}

function getDecryptedWord(cipher) {
  return cryptoJs.AES.decrypt(cipher, secretKey).toString(cryptoJs.enc.Utf8);
}

export { getEncryptedWord, getDecryptedWord };
