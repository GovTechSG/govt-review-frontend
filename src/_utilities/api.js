import '../jquery';
import authToken from '../../config/secrets';

function ajaxCall(args) {
  return $.ajax({
    beforeSend(xhr) {
      !args.hasOwnProperty('skipHeader') &&
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) &&
      xhr.setRequestHeader('Authorization', authToken);
    },
    ...args
  }).fail(result => {
    switch (result.status) {
      case 401:
        window.location.href = '/logged_out';
        break;
      case 403:
        window.location.href = '/unauthorized/403';
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
