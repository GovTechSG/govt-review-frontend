let email;
if (process.env.REACT_APP_BACKEND_ENV === 'production') {
  email = 'poh_kah_kong@tech.gov.sg';
} else {
  email = '?';
}

export const CONTACT_US_EMAIL = email;
