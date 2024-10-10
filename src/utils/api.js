// src/utils/api.js
export function baseApiUrl() {
  return 'http://172.16.0.117:3333';
}

export function baseFileUrl() {
  return `${baseApiUrl()}/files`;
}
