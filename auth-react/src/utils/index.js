const { env } = require('./const');
const crypto = require('crypto-js');

export const encrypt = async (
  text,
  secret = env.REACT_APP_PASSWORD_MASK_SECRET
) => {
  return crypto.AES.encrypt(text, secret).toString();
};

export const decrypt = async (
  text,
  secret = env.REACT_APP_PASSWORD_MASK_SECRET
) => {
  const bytes = crypto.AES.decrypt(text, secret);
  return bytes.toString(crypto.enc.Utf8);
};

export const getDevAppLink=(link)=>{
  if(!link.includes('?')) return null
  let port=3001;
  if(link.toLowerCase().includes('institute')){
    port=3002
  }else if(link.toLowerCase().includes('student')){
    port=3003
  }
  return `http://localhost:${port}?${link.split('?')[1]}`
}