import 'jquery';
import { API_URL_PREFIX } from './api_url_prefix';

function ajaxCall(args) {
  return $.ajax({
    beforeSend(xhr) {
      !args.hasOwnProperty('skipHeader') &&
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) &&
      xhr.setRequestHeader('Authorization', sessionStorage.getItem('authToken'));
    },
    ...args
  }).fail(result => {
    switch (result.status) {
      case 401:
        sessionStorage.removeItem('authToken');
        if (args.url !== `${API_URL_PREFIX}/api/v1/oauth/token`) {
          window.location.href = '/demo/login';
        }
        break;
      case 403:
        sessionStorage.removeItem('authToken');
        if (args.url !== `${API_URL_PREFIX}/api/v1/oauth/token`) {
          window.location.href = '/demo/login';
        }
        break;
      default:
    }
  });
}

function promisify(fun, args) {
  return fun(args).then(response => response);
}

const nonPromisedAPI = {
  get: args => ajaxCall(Object.assign(args, { method: 'GET' })),
  post: args => ajaxCall(Object.assign(args, { method: 'POST' })),
  put: args => ajaxCall(Object.assign(args, { method: 'PUT' })),
  delete: args => ajaxCall(Object.assign(args, { method: 'DELETE' }))
};

export const API = {
  get: url => promisify(nonPromisedAPI.get, { url }),
  post: args => promisify(nonPromisedAPI.post, args),
  put: args => promisify(nonPromisedAPI.put, args),
  delete: args => promisify(nonPromisedAPI.delete, args)
};

export default nonPromisedAPI;
