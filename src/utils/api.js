// src/utils/api.js
export function baseApiUrl() {
  return 'https://api.sinergiabadisentosa.com'; //for production
  // return 'http://172.16.0.117:3333'; //for development
}

export function baseFileUrl() {
  return `${baseApiUrl()}/files`;
}
