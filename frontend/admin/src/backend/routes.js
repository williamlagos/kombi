"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSkipURL = exports.addSkip_TYPE = exports.addSkip_RAW_URL = exports.addSkip = exports.updatePasswordURL = exports.updatePassword_TYPE = exports.updatePassword_RAW_URL = exports.updatePassword = exports.recoverPasswordURL = exports.recoverPassword_TYPE = exports.recoverPassword_RAW_URL = exports.recoverPassword = exports.updateUserURL = exports.updateUser_TYPE = exports.updateUser_RAW_URL = exports.updateUser = exports.authenticateUserURL = exports.authenticateUser_TYPE = exports.authenticateUser_RAW_URL = exports.authenticateUser = exports.getUserProfileURL = exports.getUserProfile_TYPE = exports.getUserProfile_RAW_URL = exports.getUserProfile = exports.isUniqueUsernameURL = exports.isUniqueUsername_TYPE = exports.isUniqueUsername_RAW_URL = exports.isUniqueUsername = exports.createUserURL = exports.createUser_TYPE = exports.createUser_RAW_URL = exports.createUser = exports.removePictureURL = exports.removePicture_TYPE = exports.removePicture_RAW_URL = exports.removePicture = exports.getLatestURL = exports.getLatest_TYPE = exports.getLatest_RAW_URL = exports.getLatest = exports.getPictureURL = exports.getPicture_TYPE = exports.getPicture_RAW_URL = exports.getPicture = exports.addPictureURL = exports.addPicture_TYPE = exports.addPicture_RAW_URL = exports.addPicture = exports.accessWithFacebookURL = exports.accessWithFacebook_TYPE = exports.accessWithFacebook_RAW_URL = exports.accessWithFacebook = exports.getNotificationURL = exports.getNotification_TYPE = exports.getNotification_RAW_URL = exports.getNotification = exports.getNotificationsURL = exports.getNotifications_TYPE = exports.getNotifications_RAW_URL = exports.getNotifications = exports.sendNotificationURL = exports.sendNotification_TYPE = exports.sendNotification_RAW_URL = exports.sendNotification = exports.startOrderURL = exports.startOrder_TYPE = exports.startOrder_RAW_URL = exports.startOrder = exports.setOrderMerchantURL = exports.setOrderMerchant_TYPE = exports.setOrderMerchant_RAW_URL = exports.setOrderMerchant = exports.getOrdersNearbyURL = exports.getOrdersNearby_TYPE = exports.getOrdersNearby_RAW_URL = exports.getOrdersNearby = exports.getPaymentModesURL = exports.getPaymentModes_TYPE = exports.getPaymentModes_RAW_URL = exports.getPaymentModes = exports.getReceivingModesURL = exports.getReceivingModes_TYPE = exports.getReceivingModes_RAW_URL = exports.getReceivingModes = exports.rateOrderURL = exports.rateOrder_TYPE = exports.rateOrder_RAW_URL = exports.rateOrder = exports.cancelOrderURL = exports.cancelOrder_TYPE = exports.cancelOrder_RAW_URL = undefined;
exports.cancelOrder = exports.acceptOrderURL = exports.acceptOrder_TYPE = exports.acceptOrder_RAW_URL = exports.acceptOrder = exports.getOrderURL = exports.getOrder_TYPE = exports.getOrder_RAW_URL = exports.getOrder = exports.getOrdersByPeriodURL = exports.getOrdersByPeriod_TYPE = exports.getOrdersByPeriod_RAW_URL = exports.getOrdersByPeriod = exports.getOrdersURL = exports.getOrders_TYPE = exports.getOrders_RAW_URL = exports.getOrders = exports.createOrderURL = exports.createOrder_TYPE = exports.createOrder_RAW_URL = exports.createOrder = exports.getNearbyMerchantsByServiceURL = exports.getNearbyMerchantsByService_TYPE = exports.getNearbyMerchantsByService_RAW_URL = exports.getNearbyMerchantsByService = exports.getNearbyMerchantsURL = exports.getNearbyMerchants_TYPE = exports.getNearbyMerchants_RAW_URL = exports.getNearbyMerchants = exports.createMerchantURL = exports.createMerchant_TYPE = exports.createMerchant_RAW_URL = exports.createMerchant = exports.getMerchantByUsernameURL = exports.getMerchantByUsername_TYPE = exports.getMerchantByUsername_RAW_URL = exports.getMerchantByUsername = exports.getMerchantByIdURL = exports.getMerchantById_TYPE = exports.getMerchantById_RAW_URL = exports.getMerchantById = exports.getFavoritesListURL = exports.getFavoritesList_TYPE = exports.getFavoritesList_RAW_URL = exports.getFavoritesList = exports.removeFavoriteMerchantURL = exports.removeFavoriteMerchant_TYPE = exports.removeFavoriteMerchant_RAW_URL = exports.removeFavoriteMerchant = exports.getOrderBidsURL = exports.getOrderBids_TYPE = exports.getOrderBids_RAW_URL = exports.getOrderBids = exports.placeFinalBidURL = exports.placeFinalBid_TYPE = exports.placeFinalBid_RAW_URL = exports.placeFinalBid = exports.placeBidURL = exports.placeBid_TYPE = exports.placeBid_RAW_URL = exports.placeBid = exports.getLeadURL = exports.getLead_TYPE = exports.getLead_RAW_URL = exports.getLead = exports.getLeadsURL = exports.getLeads_TYPE = exports.getLeads_RAW_URL = exports.getLeads = exports.addLeadURL = exports.addLead_TYPE = exports.addLead_RAW_URL = exports.addLead = exports.getChatURL = exports.getChat_TYPE = exports.getChat_RAW_URL = exports.getChat = exports.getChatsURL = exports.getChats_TYPE = exports.getChats_RAW_URL = exports.getChats = exports.changeUserRoleURL = exports.changeUserRole_TYPE = exports.changeUserRole_RAW_URL = exports.changeUserRole = exports.activateUserAsAdminURL = exports.activateUserAsAdmin_TYPE = exports.activateUserAsAdmin_RAW_URL = exports.activateUserAsAdmin = exports.deactivateUserAsAdminURL = exports.deactivateUserAsAdmin_TYPE = exports.deactivateUserAsAdmin_RAW_URL = exports.deactivateUserAsAdmin = exports.getUsersAsAdminURL = exports.getUsersAsAdmin_TYPE = exports.getUsersAsAdmin_RAW_URL = exports.getUsersAsAdmin = exports.request = exports.setDomain = exports.getDomain = undefined;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _qs = require("qs");

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
let domain = '';

const getDomain = exports.getDomain = () => {
  return domain;
};

const setDomain = exports.setDomain = $domain => {
  domain = $domain;
};

const request = exports.request = (method, url, body, queryParameters, form, config) => {
  method = method.toLowerCase();
  let keys = Object.keys(queryParameters);
  let queryUrl = url;

  if (keys.length > 0) {
    queryUrl = url + '?' + _qs2.default.stringify(queryParameters);
  } // let queryUrl = url+(keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')


  if (body) {
    return _axios2.default[method](queryUrl, body, config);
  } else if (method === 'get' || method === 'delete' || method === 'head' || method === 'option') {
    return _axios2.default[method](queryUrl, config);
  } else {
    return _axios2.default[method](queryUrl, _qs2.default.stringify(form), config);
  }
};
/*==========================================================
 *                    
 ==========================================================*/

/**
 * 
 * request: getUsersAsAdmin
 * url: getUsersAsAdminURL
 * method: getUsersAsAdmin_TYPE
 * raw_url: getUsersAsAdmin_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param role - Desired role.
 * @param keyword - Filtering keyword.
 * @param page - Number of pages to skip.
 * @param pageSize - Size of documents on one page.
 */


const getUsersAsAdmin = exports.getUsersAsAdmin = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/admin/users';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['role'] !== undefined) {
    queryParameters['role'] = parameters['role'];
  }

  if (parameters['role'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: role'));
  }

  if (parameters['keyword'] !== undefined) {
    queryParameters['keyword'] = parameters['keyword'];
  }

  if (parameters['keyword'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: keyword'));
  }

  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page'];
  }

  if (parameters['page'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: page'));
  }

  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getUsersAsAdmin_RAW_URL = exports.getUsersAsAdmin_RAW_URL = function () {
  return '/api/admin/users';
};

const getUsersAsAdmin_TYPE = exports.getUsersAsAdmin_TYPE = function () {
  return 'get';
};

const getUsersAsAdminURL = exports.getUsersAsAdminURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/admin/users';

  if (parameters['role'] !== undefined) {
    queryParameters['role'] = parameters['role'];
  }

  if (parameters['keyword'] !== undefined) {
    queryParameters['keyword'] = parameters['keyword'];
  }

  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page'];
  }

  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: deactivateUserAsAdmin
 * url: deactivateUserAsAdminURL
 * method: deactivateUserAsAdmin_TYPE
 * raw_url: deactivateUserAsAdmin_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 */


const deactivateUserAsAdmin = exports.deactivateUserAsAdmin = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/admin/users/{id}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const deactivateUserAsAdmin_RAW_URL = exports.deactivateUserAsAdmin_RAW_URL = function () {
  return '/api/admin/users/{id}';
};

const deactivateUserAsAdmin_TYPE = exports.deactivateUserAsAdmin_TYPE = function () {
  return 'post';
};

const deactivateUserAsAdminURL = exports.deactivateUserAsAdminURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/admin/users/{id}';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: activateUserAsAdmin
 * url: activateUserAsAdminURL
 * method: activateUserAsAdmin_TYPE
 * raw_url: activateUserAsAdmin_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 */


const activateUserAsAdmin = exports.activateUserAsAdmin = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/admin/users/{id}/activate';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const activateUserAsAdmin_RAW_URL = exports.activateUserAsAdmin_RAW_URL = function () {
  return '/api/admin/users/{id}/activate';
};

const activateUserAsAdmin_TYPE = exports.activateUserAsAdmin_TYPE = function () {
  return 'post';
};

const activateUserAsAdminURL = exports.activateUserAsAdminURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/admin/users/{id}/activate';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: changeUserRole
 * url: changeUserRoleURL
 * method: changeUserRole_TYPE
 * raw_url: changeUserRole_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 * @param role - 
 */


const changeUserRole = exports.changeUserRole = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/admin/users/{id}/role/{role}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  path = path.replace('{role}', `${parameters['role']}`);

  if (parameters['role'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: role'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const changeUserRole_RAW_URL = exports.changeUserRole_RAW_URL = function () {
  return '/api/admin/users/{id}/role/{role}';
};

const changeUserRole_TYPE = exports.changeUserRole_TYPE = function () {
  return 'post';
};

const changeUserRoleURL = exports.changeUserRoleURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/admin/users/{id}/role/{role}';
  path = path.replace('{id}', `${parameters['id']}`);
  path = path.replace('{role}', `${parameters['role']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getChats
 * url: getChatsURL
 * method: getChats_TYPE
 * raw_url: getChats_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


const getChats = exports.getChats = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/chat/chats';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getChats_RAW_URL = exports.getChats_RAW_URL = function () {
  return '/api/chat/chats';
};

const getChats_TYPE = exports.getChats_TYPE = function () {
  return 'get';
};

const getChatsURL = exports.getChatsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/chat/chats';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getChat
 * url: getChatURL
 * method: getChat_TYPE
 * raw_url: getChat_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param chat - 
 */


const getChat = exports.getChat = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/chat/{chat}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{chat}', `${parameters['chat']}`);

  if (parameters['chat'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: chat'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getChat_RAW_URL = exports.getChat_RAW_URL = function () {
  return '/api/chat/{chat}';
};

const getChat_TYPE = exports.getChat_TYPE = function () {
  return 'get';
};

const getChatURL = exports.getChatURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/chat/{chat}';
  path = path.replace('{chat}', `${parameters['chat']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: addLead
 * url: addLeadURL
 * method: addLead_TYPE
 * raw_url: addLead_RAW_URL
 * @param lead - JSON representation of the lead.
 */


const addLead = exports.addLead = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/lead';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['lead'] !== undefined) {
    body = parameters['lead'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const addLead_RAW_URL = exports.addLead_RAW_URL = function () {
  return '/api/lead';
};

const addLead_TYPE = exports.addLead_TYPE = function () {
  return 'post';
};

const addLeadURL = exports.addLeadURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/lead';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getLeads
 * url: getLeadsURL
 * method: getLeads_TYPE
 * raw_url: getLeads_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


const getLeads = exports.getLeads = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/lead';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getLeads_RAW_URL = exports.getLeads_RAW_URL = function () {
  return '/api/lead';
};

const getLeads_TYPE = exports.getLeads_TYPE = function () {
  return 'get';
};

const getLeadsURL = exports.getLeadsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/lead';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getLead
 * url: getLeadURL
 * method: getLead_TYPE
 * raw_url: getLead_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 */


const getLead = exports.getLead = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/lead/{id}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getLead_RAW_URL = exports.getLead_RAW_URL = function () {
  return '/api/lead/{id}';
};

const getLead_TYPE = exports.getLead_TYPE = function () {
  return 'get';
};

const getLeadURL = exports.getLeadURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/lead/{id}';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: placeBid
 * url: placeBidURL
 * method: placeBid_TYPE
 * raw_url: placeBid_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param bid - JSON representation of the bid.
 * @param order - 
 */


const placeBid = exports.placeBid = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/bid/{order}/place';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['bid'] !== undefined) {
    body = parameters['bid'];
  }

  path = path.replace('{order}', `${parameters['order']}`);

  if (parameters['order'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: order'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const placeBid_RAW_URL = exports.placeBid_RAW_URL = function () {
  return '/api/bid/{order}/place';
};

const placeBid_TYPE = exports.placeBid_TYPE = function () {
  return 'post';
};

const placeBidURL = exports.placeBidURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/bid/{order}/place';
  path = path.replace('{order}', `${parameters['order']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: placeFinalBid
 * url: placeFinalBidURL
 * method: placeFinalBid_TYPE
 * raw_url: placeFinalBid_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param bid - JSON representation of the bid.
 * @param order - 
 */


const placeFinalBid = exports.placeFinalBid = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/bid/{order}/final';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['bid'] !== undefined) {
    body = parameters['bid'];
  }

  path = path.replace('{order}', `${parameters['order']}`);

  if (parameters['order'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: order'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const placeFinalBid_RAW_URL = exports.placeFinalBid_RAW_URL = function () {
  return '/api/bid/{order}/final';
};

const placeFinalBid_TYPE = exports.placeFinalBid_TYPE = function () {
  return 'post';
};

const placeFinalBidURL = exports.placeFinalBidURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/bid/{order}/final';
  path = path.replace('{order}', `${parameters['order']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getOrderBids
 * url: getOrderBidsURL
 * method: getOrderBids_TYPE
 * raw_url: getOrderBids_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param order - 
 */


const getOrderBids = exports.getOrderBids = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/bid/by-order/{order}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{order}', `${parameters['order']}`);

  if (parameters['order'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: order'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getOrderBids_RAW_URL = exports.getOrderBids_RAW_URL = function () {
  return '/api/bid/by-order/{order}';
};

const getOrderBids_TYPE = exports.getOrderBids_TYPE = function () {
  return 'get';
};

const getOrderBidsURL = exports.getOrderBidsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/bid/by-order/{order}';
  path = path.replace('{order}', `${parameters['order']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: removeFavoriteMerchant
 * url: removeFavoriteMerchantURL
 * method: removeFavoriteMerchant_TYPE
 * raw_url: removeFavoriteMerchant_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param merchant - 
 */


const removeFavoriteMerchant = exports.removeFavoriteMerchant = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/customer/favorites/merchant/{merchant}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{merchant}', `${parameters['merchant']}`);

  if (parameters['merchant'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: merchant'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const removeFavoriteMerchant_RAW_URL = exports.removeFavoriteMerchant_RAW_URL = function () {
  return '/api/customer/favorites/merchant/{merchant}';
};

const removeFavoriteMerchant_TYPE = exports.removeFavoriteMerchant_TYPE = function () {
  return 'post';
};

const removeFavoriteMerchantURL = exports.removeFavoriteMerchantURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/customer/favorites/merchant/{merchant}';
  path = path.replace('{merchant}', `${parameters['merchant']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getFavoritesList
 * url: getFavoritesListURL
 * method: getFavoritesList_TYPE
 * raw_url: getFavoritesList_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


const getFavoritesList = exports.getFavoritesList = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/customer/favorites/merchants';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getFavoritesList_RAW_URL = exports.getFavoritesList_RAW_URL = function () {
  return '/api/customer/favorites/merchants';
};

const getFavoritesList_TYPE = exports.getFavoritesList_TYPE = function () {
  return 'get';
};

const getFavoritesListURL = exports.getFavoritesListURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/customer/favorites/merchants';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getMerchantById
 * url: getMerchantByIdURL
 * method: getMerchantById_TYPE
 * raw_url: getMerchantById_RAW_URL
 * @param id - 
 */


const getMerchantById = exports.getMerchantById = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/merchant/{id}/details';
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getMerchantById_RAW_URL = exports.getMerchantById_RAW_URL = function () {
  return '/api/merchant/{id}/details';
};

const getMerchantById_TYPE = exports.getMerchantById_TYPE = function () {
  return 'get';
};

const getMerchantByIdURL = exports.getMerchantByIdURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/merchant/{id}/details';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getMerchantByUsername
 * url: getMerchantByUsernameURL
 * method: getMerchantByUsername_TYPE
 * raw_url: getMerchantByUsername_RAW_URL
 * @param username - 
 */


const getMerchantByUsername = exports.getMerchantByUsername = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/merchant/by-username/{username}';
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace('{username}', `${parameters['username']}`);

  if (parameters['username'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: username'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getMerchantByUsername_RAW_URL = exports.getMerchantByUsername_RAW_URL = function () {
  return '/api/merchant/by-username/{username}';
};

const getMerchantByUsername_TYPE = exports.getMerchantByUsername_TYPE = function () {
  return 'get';
};

const getMerchantByUsernameURL = exports.getMerchantByUsernameURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/merchant/by-username/{username}';
  path = path.replace('{username}', `${parameters['username']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: createMerchant
 * url: createMerchantURL
 * method: createMerchant_TYPE
 * raw_url: createMerchant_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param user - JSON representation of the user.
 */


const createMerchant = exports.createMerchant = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/merchant/account/payment';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['user'] !== undefined) {
    body = parameters['user'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const createMerchant_RAW_URL = exports.createMerchant_RAW_URL = function () {
  return '/api/merchant/account/payment';
};

const createMerchant_TYPE = exports.createMerchant_TYPE = function () {
  return 'post';
};

const createMerchantURL = exports.createMerchantURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/merchant/account/payment';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getNearbyMerchants
 * url: getNearbyMerchantsURL
 * method: getNearbyMerchants_TYPE
 * raw_url: getNearbyMerchants_RAW_URL
 * @param latitude - Geolocation latitude value.
 * @param longitude - Geolocation longitude value.
 * @param radius - Maximum radius to search for (km).
 * @param keyword - Geolocation keyword value.
 */


const getNearbyMerchants = exports.getNearbyMerchants = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/merchant/nearby';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['latitude'] !== undefined) {
    queryParameters['latitude'] = parameters['latitude'];
  }

  if (parameters['latitude'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: latitude'));
  }

  if (parameters['longitude'] !== undefined) {
    queryParameters['longitude'] = parameters['longitude'];
  }

  if (parameters['longitude'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: longitude'));
  }

  if (parameters['radius'] !== undefined) {
    queryParameters['radius'] = parameters['radius'];
  }

  if (parameters['keyword'] !== undefined) {
    queryParameters['keyword'] = parameters['keyword'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getNearbyMerchants_RAW_URL = exports.getNearbyMerchants_RAW_URL = function () {
  return '/api/merchant/nearby';
};

const getNearbyMerchants_TYPE = exports.getNearbyMerchants_TYPE = function () {
  return 'get';
};

const getNearbyMerchantsURL = exports.getNearbyMerchantsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/merchant/nearby';

  if (parameters['latitude'] !== undefined) {
    queryParameters['latitude'] = parameters['latitude'];
  }

  if (parameters['longitude'] !== undefined) {
    queryParameters['longitude'] = parameters['longitude'];
  }

  if (parameters['radius'] !== undefined) {
    queryParameters['radius'] = parameters['radius'];
  }

  if (parameters['keyword'] !== undefined) {
    queryParameters['keyword'] = parameters['keyword'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getNearbyMerchantsByService
 * url: getNearbyMerchantsByServiceURL
 * method: getNearbyMerchantsByService_TYPE
 * raw_url: getNearbyMerchantsByService_RAW_URL
 * @param service - Requested service name.
 * @param latitude - Geolocation latitude value.
 * @param longitude - Geolocation longitude value.
 * @param keyword - Geolocation keyword value.
 * @param radius - Maximum radius to search for (km).
 */


const getNearbyMerchantsByService = exports.getNearbyMerchantsByService = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/merchant/nearby/{service}';
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace('{service}', `${parameters['service']}`);

  if (parameters['service'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: service'));
  }

  if (parameters['latitude'] !== undefined) {
    queryParameters['latitude'] = parameters['latitude'];
  }

  if (parameters['latitude'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: latitude'));
  }

  if (parameters['longitude'] !== undefined) {
    queryParameters['longitude'] = parameters['longitude'];
  }

  if (parameters['longitude'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: longitude'));
  }

  if (parameters['keyword'] !== undefined) {
    queryParameters['keyword'] = parameters['keyword'];
  }

  if (parameters['radius'] !== undefined) {
    queryParameters['radius'] = parameters['radius'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getNearbyMerchantsByService_RAW_URL = exports.getNearbyMerchantsByService_RAW_URL = function () {
  return '/api/merchant/nearby/{service}';
};

const getNearbyMerchantsByService_TYPE = exports.getNearbyMerchantsByService_TYPE = function () {
  return 'get';
};

const getNearbyMerchantsByServiceURL = exports.getNearbyMerchantsByServiceURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/merchant/nearby/{service}';
  path = path.replace('{service}', `${parameters['service']}`);

  if (parameters['latitude'] !== undefined) {
    queryParameters['latitude'] = parameters['latitude'];
  }

  if (parameters['longitude'] !== undefined) {
    queryParameters['longitude'] = parameters['longitude'];
  }

  if (parameters['keyword'] !== undefined) {
    queryParameters['keyword'] = parameters['keyword'];
  }

  if (parameters['radius'] !== undefined) {
    queryParameters['radius'] = parameters['radius'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: createOrder
 * url: createOrderURL
 * method: createOrder_TYPE
 * raw_url: createOrder_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param order - JSON representation of the order to be created.
 */


const createOrder = exports.createOrder = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/order';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['order'] !== undefined) {
    body = parameters['order'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const createOrder_RAW_URL = exports.createOrder_RAW_URL = function () {
  return '/api/order';
};

const createOrder_TYPE = exports.createOrder_TYPE = function () {
  return 'post';
};

const createOrderURL = exports.createOrderURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/order';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getOrders
 * url: getOrdersURL
 * method: getOrders_TYPE
 * raw_url: getOrders_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param status - Filtering status.
 */


const getOrders = exports.getOrders = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/order';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['status'] !== undefined) {
    queryParameters['status'] = parameters['status'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getOrders_RAW_URL = exports.getOrders_RAW_URL = function () {
  return '/api/order';
};

const getOrders_TYPE = exports.getOrders_TYPE = function () {
  return 'get';
};

const getOrdersURL = exports.getOrdersURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/order';

  if (parameters['status'] !== undefined) {
    queryParameters['status'] = parameters['status'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getOrdersByPeriod
 * url: getOrdersByPeriodURL
 * method: getOrdersByPeriod_TYPE
 * raw_url: getOrdersByPeriod_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param status - Filtering status.
 * @param startDate - Filtering start date.
 * @param endDate - Filtering end date.
 */


const getOrdersByPeriod = exports.getOrdersByPeriod = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/order/between-dates';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['status'] !== undefined) {
    queryParameters['status'] = parameters['status'];
  }

  if (parameters['startDate'] !== undefined) {
    queryParameters['startDate'] = parameters['startDate'];
  }

  if (parameters['endDate'] !== undefined) {
    queryParameters['endDate'] = parameters['endDate'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getOrdersByPeriod_RAW_URL = exports.getOrdersByPeriod_RAW_URL = function () {
  return '/api/order/between-dates';
};

const getOrdersByPeriod_TYPE = exports.getOrdersByPeriod_TYPE = function () {
  return 'get';
};

const getOrdersByPeriodURL = exports.getOrdersByPeriodURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/order/between-dates';

  if (parameters['status'] !== undefined) {
    queryParameters['status'] = parameters['status'];
  }

  if (parameters['startDate'] !== undefined) {
    queryParameters['startDate'] = parameters['startDate'];
  }

  if (parameters['endDate'] !== undefined) {
    queryParameters['endDate'] = parameters['endDate'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getOrder
 * url: getOrderURL
 * method: getOrder_TYPE
 * raw_url: getOrder_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 */


const getOrder = exports.getOrder = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/order/{id}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getOrder_RAW_URL = exports.getOrder_RAW_URL = function () {
  return '/api/order/{id}';
};

const getOrder_TYPE = exports.getOrder_TYPE = function () {
  return 'get';
};

const getOrderURL = exports.getOrderURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/order/{id}';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: acceptOrder
 * url: acceptOrderURL
 * method: acceptOrder_TYPE
 * raw_url: acceptOrder_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 */


const acceptOrder = exports.acceptOrder = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/order/{id}/accept';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const acceptOrder_RAW_URL = exports.acceptOrder_RAW_URL = function () {
  return '/api/order/{id}/accept';
};

const acceptOrder_TYPE = exports.acceptOrder_TYPE = function () {
  return 'post';
};

const acceptOrderURL = exports.acceptOrderURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/order/{id}/accept';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: cancelOrder
 * url: cancelOrderURL
 * method: cancelOrder_TYPE
 * raw_url: cancelOrder_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 */


const cancelOrder = exports.cancelOrder = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/order/{id}/cancel';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const cancelOrder_RAW_URL = exports.cancelOrder_RAW_URL = function () {
  return '/api/order/{id}/cancel';
};

const cancelOrder_TYPE = exports.cancelOrder_TYPE = function () {
  return 'get';
};

const cancelOrderURL = exports.cancelOrderURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/order/{id}/cancel';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: rateOrder
 * url: rateOrderURL
 * method: rateOrder_TYPE
 * raw_url: rateOrder_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 * @param rate - 
 */


const rateOrder = exports.rateOrder = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/order/{id}/rate/{rate}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  path = path.replace('{rate}', `${parameters['rate']}`);

  if (parameters['rate'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: rate'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const rateOrder_RAW_URL = exports.rateOrder_RAW_URL = function () {
  return '/api/order/{id}/rate/{rate}';
};

const rateOrder_TYPE = exports.rateOrder_TYPE = function () {
  return 'post';
};

const rateOrderURL = exports.rateOrderURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/order/{id}/rate/{rate}';
  path = path.replace('{id}', `${parameters['id']}`);
  path = path.replace('{rate}', `${parameters['rate']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getReceivingModes
 * url: getReceivingModesURL
 * method: getReceivingModes_TYPE
 * raw_url: getReceivingModes_RAW_URL
 */


const getReceivingModes = exports.getReceivingModes = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/order/receiving-modes';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getReceivingModes_RAW_URL = exports.getReceivingModes_RAW_URL = function () {
  return '/api/order/receiving-modes';
};

const getReceivingModes_TYPE = exports.getReceivingModes_TYPE = function () {
  return 'get';
};

const getReceivingModesURL = exports.getReceivingModesURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/order/receiving-modes';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getPaymentModes
 * url: getPaymentModesURL
 * method: getPaymentModes_TYPE
 * raw_url: getPaymentModes_RAW_URL
 */


const getPaymentModes = exports.getPaymentModes = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/order/payment-modes/list';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getPaymentModes_RAW_URL = exports.getPaymentModes_RAW_URL = function () {
  return '/api/order/payment-modes/list';
};

const getPaymentModes_TYPE = exports.getPaymentModes_TYPE = function () {
  return 'get';
};

const getPaymentModesURL = exports.getPaymentModesURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/order/payment-modes/list';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getOrdersNearby
 * url: getOrdersNearbyURL
 * method: getOrdersNearby_TYPE
 * raw_url: getOrdersNearby_RAW_URL
 * @param latitude - Geolocation latitude value.
 * @param longitude - Geolocation longitude value.
 * @param radius - Maximum radius to search for (km).
 * @param keyword - Geolocation keyword value.
 * @param page - Number of pages to skip.
 * @param pageSize - Size of documents on one page.
 */


const getOrdersNearby = exports.getOrdersNearby = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/order/by-location/nearby';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['latitude'] !== undefined) {
    queryParameters['latitude'] = parameters['latitude'];
  }

  if (parameters['latitude'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: latitude'));
  }

  if (parameters['longitude'] !== undefined) {
    queryParameters['longitude'] = parameters['longitude'];
  }

  if (parameters['longitude'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: longitude'));
  }

  if (parameters['radius'] !== undefined) {
    queryParameters['radius'] = parameters['radius'];
  }

  if (parameters['keyword'] !== undefined) {
    queryParameters['keyword'] = parameters['keyword'];
  }

  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page'];
  }

  if (parameters['page'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: page'));
  }

  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getOrdersNearby_RAW_URL = exports.getOrdersNearby_RAW_URL = function () {
  return '/api/order/by-location/nearby';
};

const getOrdersNearby_TYPE = exports.getOrdersNearby_TYPE = function () {
  return 'get';
};

const getOrdersNearbyURL = exports.getOrdersNearbyURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/order/by-location/nearby';

  if (parameters['latitude'] !== undefined) {
    queryParameters['latitude'] = parameters['latitude'];
  }

  if (parameters['longitude'] !== undefined) {
    queryParameters['longitude'] = parameters['longitude'];
  }

  if (parameters['radius'] !== undefined) {
    queryParameters['radius'] = parameters['radius'];
  }

  if (parameters['keyword'] !== undefined) {
    queryParameters['keyword'] = parameters['keyword'];
  }

  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page'];
  }

  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: setOrderMerchant
 * url: setOrderMerchantURL
 * method: setOrderMerchant_TYPE
 * raw_url: setOrderMerchant_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 * @param merchant - 
 */


const setOrderMerchant = exports.setOrderMerchant = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/order/{id}/merchant/{merchant}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  path = path.replace('{merchant}', `${parameters['merchant']}`);

  if (parameters['merchant'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: merchant'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const setOrderMerchant_RAW_URL = exports.setOrderMerchant_RAW_URL = function () {
  return '/api/order/{id}/merchant/{merchant}';
};

const setOrderMerchant_TYPE = exports.setOrderMerchant_TYPE = function () {
  return 'post';
};

const setOrderMerchantURL = exports.setOrderMerchantURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/order/{id}/merchant/{merchant}';
  path = path.replace('{id}', `${parameters['id']}`);
  path = path.replace('{merchant}', `${parameters['merchant']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: startOrder
 * url: startOrderURL
 * method: startOrder_TYPE
 * raw_url: startOrder_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 */


const startOrder = exports.startOrder = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/order/{id}/start';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const startOrder_RAW_URL = exports.startOrder_RAW_URL = function () {
  return '/api/order/{id}/start';
};

const startOrder_TYPE = exports.startOrder_TYPE = function () {
  return 'post';
};

const startOrderURL = exports.startOrderURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/order/{id}/start';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: sendNotification
 * url: sendNotificationURL
 * method: sendNotification_TYPE
 * raw_url: sendNotification_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


const sendNotification = exports.sendNotification = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/notification/send';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const sendNotification_RAW_URL = exports.sendNotification_RAW_URL = function () {
  return '/api/notification/send';
};

const sendNotification_TYPE = exports.sendNotification_TYPE = function () {
  return 'post';
};

const sendNotificationURL = exports.sendNotificationURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/notification/send';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getNotifications
 * url: getNotificationsURL
 * method: getNotifications_TYPE
 * raw_url: getNotifications_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


const getNotifications = exports.getNotifications = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/notification';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getNotifications_RAW_URL = exports.getNotifications_RAW_URL = function () {
  return '/api/notification';
};

const getNotifications_TYPE = exports.getNotifications_TYPE = function () {
  return 'get';
};

const getNotificationsURL = exports.getNotificationsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/notification';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getNotification
 * url: getNotificationURL
 * method: getNotification_TYPE
 * raw_url: getNotification_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 */


const getNotification = exports.getNotification = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/notification/{id}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getNotification_RAW_URL = exports.getNotification_RAW_URL = function () {
  return '/api/notification/{id}';
};

const getNotification_TYPE = exports.getNotification_TYPE = function () {
  return 'get';
};

const getNotificationURL = exports.getNotificationURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/notification/{id}';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: accessWithFacebook
 * url: accessWithFacebookURL
 * method: accessWithFacebook_TYPE
 * raw_url: accessWithFacebook_RAW_URL
 * @param accessToken - User access token returned from Facebook oauth.
 */


const accessWithFacebook = exports.accessWithFacebook = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/oauth/access/facebook';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['accessToken'] !== undefined) {
    queryParameters['access_token'] = parameters['accessToken'];
  }

  if (parameters['accessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: accessToken'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const accessWithFacebook_RAW_URL = exports.accessWithFacebook_RAW_URL = function () {
  return '/api/oauth/access/facebook';
};

const accessWithFacebook_TYPE = exports.accessWithFacebook_TYPE = function () {
  return 'post';
};

const accessWithFacebookURL = exports.accessWithFacebookURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/oauth/access/facebook';

  if (parameters['accessToken'] !== undefined) {
    queryParameters['access_token'] = parameters['accessToken'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: addPicture
 * url: addPictureURL
 * method: addPicture_TYPE
 * raw_url: addPicture_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param files - path of the file to update
 */


const addPicture = exports.addPicture = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/picture/save';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['files'] !== undefined) {
    form['files'] = parameters['files'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const addPicture_RAW_URL = exports.addPicture_RAW_URL = function () {
  return '/api/picture/save';
};

const addPicture_TYPE = exports.addPicture_TYPE = function () {
  return 'post';
};

const addPictureURL = exports.addPictureURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/picture/save';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getPicture
 * url: getPictureURL
 * method: getPicture_TYPE
 * raw_url: getPicture_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 */


const getPicture = exports.getPicture = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/picture/{id}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getPicture_RAW_URL = exports.getPicture_RAW_URL = function () {
  return '/api/picture/{id}';
};

const getPicture_TYPE = exports.getPicture_TYPE = function () {
  return 'get';
};

const getPictureURL = exports.getPictureURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/picture/{id}';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getLatest
 * url: getLatestURL
 * method: getLatest_TYPE
 * raw_url: getLatest_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param itemId - 
 */


const getLatest = exports.getLatest = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/picture/{itemId}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{itemId}', `${parameters['itemId']}`);

  if (parameters['itemId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: itemId'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getLatest_RAW_URL = exports.getLatest_RAW_URL = function () {
  return '/api/picture/{itemId}';
};

const getLatest_TYPE = exports.getLatest_TYPE = function () {
  return 'get';
};

const getLatestURL = exports.getLatestURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/picture/{itemId}';
  path = path.replace('{itemId}', `${parameters['itemId']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: removePicture
 * url: removePictureURL
 * method: removePicture_TYPE
 * raw_url: removePicture_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 */


const removePicture = exports.removePicture = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/picture/remove/{id}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const removePicture_RAW_URL = exports.removePicture_RAW_URL = function () {
  return '/api/picture/remove/{id}';
};

const removePicture_TYPE = exports.removePicture_TYPE = function () {
  return 'post';
};

const removePictureURL = exports.removePictureURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/picture/remove/{id}';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: createUser
 * url: createUserURL
 * method: createUser_TYPE
 * raw_url: createUser_RAW_URL
 * @param user - JSON representation of the user to be created.
 */


const createUser = exports.createUser = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/user/create';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['user'] !== undefined) {
    body = parameters['user'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const createUser_RAW_URL = exports.createUser_RAW_URL = function () {
  return '/api/user/create';
};

const createUser_TYPE = exports.createUser_TYPE = function () {
  return 'post';
};

const createUserURL = exports.createUserURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/user/create';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: isUniqueUsername
 * url: isUniqueUsernameURL
 * method: isUniqueUsername_TYPE
 * raw_url: isUniqueUsername_RAW_URL
 * @param username - 
 */


const isUniqueUsername = exports.isUniqueUsername = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/user/username/exists/{username}';
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace('{username}', `${parameters['username']}`);

  if (parameters['username'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: username'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const isUniqueUsername_RAW_URL = exports.isUniqueUsername_RAW_URL = function () {
  return '/api/user/username/exists/{username}';
};

const isUniqueUsername_TYPE = exports.isUniqueUsername_TYPE = function () {
  return 'get';
};

const isUniqueUsernameURL = exports.isUniqueUsernameURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/user/username/exists/{username}';
  path = path.replace('{username}', `${parameters['username']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: getUserProfile
 * url: getUserProfileURL
 * method: getUserProfile_TYPE
 * raw_url: getUserProfile_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


const getUserProfile = exports.getUserProfile = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/user/profile';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

const getUserProfile_RAW_URL = exports.getUserProfile_RAW_URL = function () {
  return '/api/user/profile';
};

const getUserProfile_TYPE = exports.getUserProfile_TYPE = function () {
  return 'get';
};

const getUserProfileURL = exports.getUserProfileURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/user/profile';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: authenticateUser
 * url: authenticateUserURL
 * method: authenticateUser_TYPE
 * raw_url: authenticateUser_RAW_URL
 * @param user - User credentials object.
 */


const authenticateUser = exports.authenticateUser = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/user/authenticate';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['user'] !== undefined) {
    body = parameters['user'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const authenticateUser_RAW_URL = exports.authenticateUser_RAW_URL = function () {
  return '/api/user/authenticate';
};

const authenticateUser_TYPE = exports.authenticateUser_TYPE = function () {
  return 'post';
};

const authenticateUserURL = exports.authenticateUserURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/user/authenticate';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: updateUser
 * url: updateUserURL
 * method: updateUser_TYPE
 * raw_url: updateUser_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param user - JSON representation of the user to be created.
 */


const updateUser = exports.updateUser = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/user/update';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['user'] !== undefined) {
    body = parameters['user'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const updateUser_RAW_URL = exports.updateUser_RAW_URL = function () {
  return '/api/user/update';
};

const updateUser_TYPE = exports.updateUser_TYPE = function () {
  return 'post';
};

const updateUserURL = exports.updateUserURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/user/update';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: recoverPassword
 * url: recoverPasswordURL
 * method: recoverPassword_TYPE
 * raw_url: recoverPassword_RAW_URL
 * @param email - 
 */


const recoverPassword = exports.recoverPassword = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/user/password/recover/{email}';
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace('{email}', `${parameters['email']}`);

  if (parameters['email'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: email'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const recoverPassword_RAW_URL = exports.recoverPassword_RAW_URL = function () {
  return '/api/user/password/recover/{email}';
};

const recoverPassword_TYPE = exports.recoverPassword_TYPE = function () {
  return 'post';
};

const recoverPasswordURL = exports.recoverPasswordURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/user/password/recover/{email}';
  path = path.replace('{email}', `${parameters['email']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: updatePassword
 * url: updatePasswordURL
 * method: updatePassword_TYPE
 * raw_url: updatePassword_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param user - User credentials object.
 */


const updatePassword = exports.updatePassword = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/user/password/update';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['user'] !== undefined) {
    body = parameters['user'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const updatePassword_RAW_URL = exports.updatePassword_RAW_URL = function () {
  return '/api/user/password/update';
};

const updatePassword_TYPE = exports.updatePassword_TYPE = function () {
  return 'post';
};

const updatePasswordURL = exports.updatePasswordURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/user/password/update';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 * 
 * request: addSkip
 * url: addSkipURL
 * method: addSkip_TYPE
 * raw_url: addSkip_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param skip - User step in order to skip.
 */


const addSkip = exports.addSkip = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/api/user/skips/{skip}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{skip}', `${parameters['skip']}`);

  if (parameters['skip'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: skip'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

const addSkip_RAW_URL = exports.addSkip_RAW_URL = function () {
  return '/api/user/skips/{skip}';
};

const addSkip_TYPE = exports.addSkip_TYPE = function () {
  return 'post';
};

const addSkipURL = exports.addSkipURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/user/skips/{skip}';
  path = path.replace('{skip}', `${parameters['skip']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};