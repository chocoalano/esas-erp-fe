// src/utils/api.js
export function baseApiUrl() {
  return 'https://api.sinergiabadisentosa.com'; //for production
  // return 'http://192.168.28.186:3333'; //for development
}

export function baseFileUrl() {
  return `${baseApiUrl()}/files`;
}
