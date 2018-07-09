let prefix = 'https://review-api.gds-gov.tech';
if (process.env.REACT_APP_BACKEND_ENV === 'production') {
  prefix = 'https://review-api.gds-gov.tech';
}
if (process.env.REACT_APP_BACKEND_ENV === 'qa') {
  prefix = 'https://qa-review-api.gds-gov.tech';
}
if (process.env.REACT_APP_BACKEND_ENV === 'development') {
  prefix = 'http://localhost:3000';
}
if (process.env.REACT_APP_BACKEND_ENV === 'docker') {
  prefix = '172.18.0.4:3000';
}

export const API_URL_PREFIX = prefix;
