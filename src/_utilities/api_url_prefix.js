let prefix = 'https://review-api.gds-gov.tech';
if (process.env.NODE_ENV === 'production') {
  prefix = 'https://review-api.gds-gov.tech';
}
if (process.env.NODE_ENV === 'qa') {
  prefix = 'https://qa-review-api.gds-gov.tech';
}
if (process.env.NODE_ENV === 'development') {
  prefix = 'http://localhost:3000';
}

export const API_URL_PREFIX = prefix;
