let aes256 = require("aes256");

let key = "obvwoqcbv21801f19d0zibcoavwpnq";

export const DoEncrypt = (text) => {
  let encrypted = aes256.encrypt(key, text);
  return encrypted;
};
export const DoDecrypt = (cipher, username) => {
  if (cipher.startsWith("Welcome")) {
    return cipher;
  }

  if (cipher.startsWith(username)) {
    return cipher;
  }

  let decrypted = aes256.decrypt(key, cipher);
  return decrypted;
};
