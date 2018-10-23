"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInventoryItemsCount = exports.removeInventoryItemURL = exports.removeInventoryItem_TYPE = exports.removeInventoryItem_RAW_URL = exports.removeInventoryItem = exports.saveInventoryItemURL = exports.saveInventoryItem_TYPE = exports.saveInventoryItem_RAW_URL = exports.saveInventoryItem = exports.getFavoritesListURL = exports.getFavoritesList_TYPE = exports.getFavoritesList_RAW_URL = exports.getFavoritesList = exports.removeFavoriteMerchantURL = exports.removeFavoriteMerchant_TYPE = exports.removeFavoriteMerchant_RAW_URL = exports.removeFavoriteMerchant = exports.useCouponURL = exports.useCoupon_TYPE = exports.useCoupon_RAW_URL = exports.useCoupon = exports.getCouponURL = exports.getCoupon_TYPE = exports.getCoupon_RAW_URL = exports.getCoupon = exports.createCouponURL = exports.createCoupon_TYPE = exports.createCoupon_RAW_URL = exports.createCoupon = exports.decrementOnCartURL = exports.decrementOnCart_TYPE = exports.decrementOnCart_RAW_URL = exports.decrementOnCart = exports.incrementOnCartURL = exports.incrementOnCart_TYPE = exports.incrementOnCart_RAW_URL = exports.incrementOnCart = exports.getCartItemsURL = exports.getCartItems_TYPE = exports.getCartItems_RAW_URL = exports.getCartItems = exports.clearCartURL = exports.clearCart_TYPE = exports.clearCart_RAW_URL = exports.clearCart = exports.getCartURL = exports.getCart_TYPE = exports.getCart_RAW_URL = exports.getCart = exports.createCartURL = exports.createCart_TYPE = exports.createCart_RAW_URL = exports.createCart = exports.getLeadURL = exports.getLead_TYPE = exports.getLead_RAW_URL = exports.getLead = exports.getLeadsURL = exports.getLeads_TYPE = exports.getLeads_RAW_URL = exports.getLeads = exports.addLeadURL = exports.addLead_TYPE = exports.addLead_RAW_URL = exports.addLead = exports.getPostCommentsURL = exports.getPostComments_TYPE = exports.getPostComments_RAW_URL = exports.getPostComments = exports.saveCommentURL = exports.saveComment_TYPE = exports.saveComment_RAW_URL = exports.saveComment = exports.getChatURL = exports.getChat_TYPE = exports.getChat_RAW_URL = exports.getChat = exports.getChatsURL = exports.getChats_TYPE = exports.getChats_RAW_URL = exports.getChats = exports.changeUserRoleURL = exports.changeUserRole_TYPE = exports.changeUserRole_RAW_URL = exports.changeUserRole = exports.activateUserAsAdminURL = exports.activateUserAsAdmin_TYPE = exports.activateUserAsAdmin_RAW_URL = exports.activateUserAsAdmin = exports.deactivateUserAsAdminURL = exports.deactivateUserAsAdmin_TYPE = exports.deactivateUserAsAdmin_RAW_URL = exports.deactivateUserAsAdmin = exports.getUsersAsAdminURL = exports.getUsersAsAdmin_TYPE = exports.getUsersAsAdmin_RAW_URL = exports.getUsersAsAdmin = exports.request = exports.setDomain = exports.getDomain = void 0;
exports.createOrder = exports.getNearbyMerchantsByServiceURL = exports.getNearbyMerchantsByService_TYPE = exports.getNearbyMerchantsByService_RAW_URL = exports.getNearbyMerchantsByService = exports.getNearbyMerchantsURL = exports.getNearbyMerchants_TYPE = exports.getNearbyMerchants_RAW_URL = exports.getNearbyMerchants = exports.getMerchantByUsernameURL = exports.getMerchantByUsername_TYPE = exports.getMerchantByUsername_RAW_URL = exports.getMerchantByUsername = exports.getMerchantByIdURL = exports.getMerchantById_TYPE = exports.getMerchantById_RAW_URL = exports.getMerchantById = exports.activateMarketItemCategoryURL = exports.activateMarketItemCategory_TYPE = exports.activateMarketItemCategory_RAW_URL = exports.activateMarketItemCategory = exports.deactivateMarketItemCategoryURL = exports.deactivateMarketItemCategory_TYPE = exports.deactivateMarketItemCategory_RAW_URL = exports.deactivateMarketItemCategory = exports.getMarketItemCategoryBySlugURL = exports.getMarketItemCategoryBySlug_TYPE = exports.getMarketItemCategoryBySlug_RAW_URL = exports.getMarketItemCategoryBySlug = exports.getRootMarketItemCategoriesURL = exports.getRootMarketItemCategories_TYPE = exports.getRootMarketItemCategories_RAW_URL = exports.getRootMarketItemCategories = exports.getMarketItemCategoriesURL = exports.getMarketItemCategories_TYPE = exports.getMarketItemCategories_RAW_URL = exports.getMarketItemCategories = exports.addMarketItemCategoryURL = exports.addMarketItemCategory_TYPE = exports.addMarketItemCategory_RAW_URL = exports.addMarketItemCategory = exports.getMarketItemAttributesURL = exports.getMarketItemAttributes_TYPE = exports.getMarketItemAttributes_RAW_URL = exports.getMarketItemAttributes = exports.addMarketItemAttributeURL = exports.addMarketItemAttribute_TYPE = exports.addMarketItemAttribute_RAW_URL = exports.addMarketItemAttribute = exports.getMarketItemsURL = exports.getMarketItems_TYPE = exports.getMarketItems_RAW_URL = exports.getMarketItems = exports.getAllMarketItemsURL = exports.getAllMarketItems_TYPE = exports.getAllMarketItems_RAW_URL = exports.getAllMarketItems = exports.getPendingMarketItemsURL = exports.getPendingMarketItems_TYPE = exports.getPendingMarketItems_RAW_URL = exports.getPendingMarketItems = exports.activateMarketItemURL = exports.activateMarketItem_TYPE = exports.activateMarketItem_RAW_URL = exports.activateMarketItem = exports.deactivateMarketItemURL = exports.deactivateMarketItem_TYPE = exports.deactivateMarketItem_RAW_URL = exports.deactivateMarketItem = exports.rejectMarketItemURL = exports.rejectMarketItem_TYPE = exports.rejectMarketItem_RAW_URL = exports.rejectMarketItem = exports.acceptMarketItemURL = exports.acceptMarketItem_TYPE = exports.acceptMarketItem_RAW_URL = exports.acceptMarketItem = exports.getMarketItemBySlugURL = exports.getMarketItemBySlug_TYPE = exports.getMarketItemBySlug_RAW_URL = exports.getMarketItemBySlug = exports.getMarketItemByIdURL = exports.getMarketItemById_TYPE = exports.getMarketItemById_RAW_URL = exports.getMarketItemById = exports.saveMarketItemURL = exports.saveMarketItem_TYPE = exports.saveMarketItem_RAW_URL = exports.saveMarketItem = exports.getInventoryItemsURL = exports.getInventoryItems_TYPE = exports.getInventoryItems_RAW_URL = exports.getInventoryItems = exports.getInventoryCategoryURL = exports.getInventoryCategory_TYPE = exports.getInventoryCategory_RAW_URL = exports.getInventoryCategory = exports.getInventoryItemsCountURL = exports.getInventoryItemsCount_TYPE = exports.getInventoryItemsCount_RAW_URL = void 0;
exports.removePaymentCard = exports.addPaymentCardURL = exports.addPaymentCard_TYPE = exports.addPaymentCard_RAW_URL = exports.addPaymentCard = exports.removeBankAccountURL = exports.removeBankAccount_TYPE = exports.removeBankAccount_RAW_URL = exports.removeBankAccount = exports.getBankAccountsURL = exports.getBankAccounts_TYPE = exports.getBankAccounts_RAW_URL = exports.getBankAccounts = exports.addBankAccountURL = exports.addBankAccount_TYPE = exports.addBankAccount_RAW_URL = exports.addBankAccount = exports.accessWithFacebookURL = exports.accessWithFacebook_TYPE = exports.accessWithFacebook_RAW_URL = exports.accessWithFacebook = exports.getNotificationURL = exports.getNotification_TYPE = exports.getNotification_RAW_URL = exports.getNotification = exports.getNotificationsURL = exports.getNotifications_TYPE = exports.getNotifications_RAW_URL = exports.getNotifications = exports.sendNotificationURL = exports.sendNotification_TYPE = exports.sendNotification_RAW_URL = exports.sendNotification = exports.getMerchantScheduleURL = exports.getMerchantSchedule_TYPE = exports.getMerchantSchedule_RAW_URL = exports.getMerchantSchedule = exports.requestServiceProvisionNearbyURL = exports.requestServiceProvisionNearby_TYPE = exports.requestServiceProvisionNearby_RAW_URL = exports.requestServiceProvisionNearby = exports.removePromotionItemURL = exports.removePromotionItem_TYPE = exports.removePromotionItem_RAW_URL = exports.removePromotionItem = exports.addPromotionItemURL = exports.addPromotionItem_TYPE = exports.addPromotionItem_RAW_URL = exports.addPromotionItem = exports.getPromotionItemsURL = exports.getPromotionItems_TYPE = exports.getPromotionItems_RAW_URL = exports.getPromotionItems = exports.getPromotionCategoryURL = exports.getPromotionCategory_TYPE = exports.getPromotionCategory_RAW_URL = exports.getPromotionCategory = exports.getPromotionURL = exports.getPromotion_TYPE = exports.getPromotion_RAW_URL = exports.getPromotion = exports.savePromotionURL = exports.savePromotion_TYPE = exports.savePromotion_RAW_URL = exports.savePromotion = exports.getPromotionsURL = exports.getPromotions_TYPE = exports.getPromotions_RAW_URL = exports.getPromotions = exports.getReceivingModesURL = exports.getReceivingModes_TYPE = exports.getReceivingModes_RAW_URL = exports.getReceivingModes = exports.rateOrderURL = exports.rateOrder_TYPE = exports.rateOrder_RAW_URL = exports.rateOrder = exports.cancelOrderURL = exports.cancelOrder_TYPE = exports.cancelOrder_RAW_URL = exports.cancelOrder = exports.acceptOrderURL = exports.acceptOrder_TYPE = exports.acceptOrder_RAW_URL = exports.acceptOrder = exports.getOrderURL = exports.getOrder_TYPE = exports.getOrder_RAW_URL = exports.getOrder = exports.getOrdersByPeriodURL = exports.getOrdersByPeriod_TYPE = exports.getOrdersByPeriod_RAW_URL = exports.getOrdersByPeriod = exports.getOrdersURL = exports.getOrders_TYPE = exports.getOrders_RAW_URL = exports.getOrders = exports.createOrderURL = exports.createOrder_TYPE = exports.createOrder_RAW_URL = void 0;
exports.getPet = exports.removeCommentFromPetURL = exports.removeCommentFromPet_TYPE = exports.removeCommentFromPet_RAW_URL = exports.removeCommentFromPet = exports.addCommentToPetURL = exports.addCommentToPet_TYPE = exports.addCommentToPet_RAW_URL = exports.addCommentToPet = exports.removePetURL = exports.removePet_TYPE = exports.removePet_RAW_URL = exports.removePet = exports.savePetURL = exports.savePet_TYPE = exports.savePet_RAW_URL = exports.savePet = exports.removePetFromUserURL = exports.removePetFromUser_TYPE = exports.removePetFromUser_RAW_URL = exports.removePetFromUser = exports.addPetToUserURL = exports.addPetToUser_TYPE = exports.addPetToUser_RAW_URL = exports.addPetToUser = exports.getPetsByStatusURL = exports.getPetsByStatus_TYPE = exports.getPetsByStatus_RAW_URL = exports.getPetsByStatus = exports.getPetsByONGURL = exports.getPetsByONG_TYPE = exports.getPetsByONG_RAW_URL = exports.getPetsByONG = exports.getPetsByUserURL = exports.getPetsByUser_TYPE = exports.getPetsByUser_RAW_URL = exports.getPetsByUser = exports.transferWithdrawalURL = exports.transferWithdrawal_TYPE = exports.transferWithdrawal_RAW_URL = exports.transferWithdrawal = exports.getAvailabeWithdrawalURL = exports.getAvailabeWithdrawal_TYPE = exports.getAvailabeWithdrawal_RAW_URL = exports.getAvailabeWithdrawal = exports.cancelSubscriptionURL = exports.cancelSubscription_TYPE = exports.cancelSubscription_RAW_URL = exports.cancelSubscription = exports.addSubscriptionURL = exports.addSubscription_TYPE = exports.addSubscription_RAW_URL = exports.addSubscription = exports.getSubscriptionCouponURL = exports.getSubscriptionCoupon_TYPE = exports.getSubscriptionCoupon_RAW_URL = exports.getSubscriptionCoupon = exports.toggleSubscriptionCouponURL = exports.toggleSubscriptionCoupon_TYPE = exports.toggleSubscriptionCoupon_RAW_URL = exports.toggleSubscriptionCoupon = exports.getSubscriptionCouponsURL = exports.getSubscriptionCoupons_TYPE = exports.getSubscriptionCoupons_RAW_URL = exports.getSubscriptionCoupons = exports.saveSubscriptionCouponURL = exports.saveSubscriptionCoupon_TYPE = exports.saveSubscriptionCoupon_RAW_URL = exports.saveSubscriptionCoupon = exports.toggleSubscriptionPlanURL = exports.toggleSubscriptionPlan_TYPE = exports.toggleSubscriptionPlan_RAW_URL = exports.toggleSubscriptionPlan = exports.getSubscriptionPlansURL = exports.getSubscriptionPlans_TYPE = exports.getSubscriptionPlans_RAW_URL = exports.getSubscriptionPlans = exports.saveSubscriptionPlanURL = exports.saveSubscriptionPlan_TYPE = exports.saveSubscriptionPlan_RAW_URL = exports.saveSubscriptionPlan = exports.createMerchantURL = exports.createMerchant_TYPE = exports.createMerchant_RAW_URL = exports.createMerchant = exports.getPaymentModesURL = exports.getPaymentModes_TYPE = exports.getPaymentModes_RAW_URL = exports.getPaymentModes = exports.createCustomerAccountURL = exports.createCustomerAccount_TYPE = exports.createCustomerAccount_RAW_URL = exports.createCustomerAccount = exports.getPaymentCardsURL = exports.getPaymentCards_TYPE = exports.getPaymentCards_RAW_URL = exports.getPaymentCards = exports.removePaymentCardURL = exports.removePaymentCard_TYPE = exports.removePaymentCard_RAW_URL = void 0;
exports.addSkipURL = exports.addSkip_TYPE = exports.addSkip_RAW_URL = exports.addSkip = exports.updatePasswordURL = exports.updatePassword_TYPE = exports.updatePassword_RAW_URL = exports.updatePassword = exports.recoverPasswordURL = exports.recoverPassword_TYPE = exports.recoverPassword_RAW_URL = exports.recoverPassword = exports.updateUserURL = exports.updateUser_TYPE = exports.updateUser_RAW_URL = exports.updateUser = exports.authenticateUserURL = exports.authenticateUser_TYPE = exports.authenticateUser_RAW_URL = exports.authenticateUser = exports.getUserProfileURL = exports.getUserProfile_TYPE = exports.getUserProfile_RAW_URL = exports.getUserProfile = exports.isUniqueUsernameURL = exports.isUniqueUsername_TYPE = exports.isUniqueUsername_RAW_URL = exports.isUniqueUsername = exports.createUserURL = exports.createUser_TYPE = exports.createUser_RAW_URL = exports.createUser = exports.removePictureURL = exports.removePicture_TYPE = exports.removePicture_RAW_URL = exports.removePicture = exports.getLatestURL = exports.getLatest_TYPE = exports.getLatest_RAW_URL = exports.getLatest = exports.getPictureURL = exports.getPicture_TYPE = exports.getPicture_RAW_URL = exports.getPicture = exports.addPictureURL = exports.addPicture_TYPE = exports.addPicture_RAW_URL = exports.addPicture = exports.getPetURL = exports.getPet_TYPE = exports.getPet_RAW_URL = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
let domain = '';

const getDomain = () => {
  return domain;
};

exports.getDomain = getDomain;

const setDomain = $domain => {
  domain = $domain;
};

exports.setDomain = setDomain;

const request = (method, url, body, queryParameters, form, config) => {
  method = method.toLowerCase();
  let keys = Object.keys(queryParameters);
  let queryUrl = url;

  if (keys.length > 0) {
    queryUrl = url + '?' + _qs.default.stringify(queryParameters);
  } // let queryUrl = url+(keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')


  if (body) {
    return _axios.default[method](queryUrl, body, config);
  } else if (method === 'get' || method === 'delete' || method === 'head' || method === 'option') {
    return _axios.default[method](queryUrl, config);
  } else {
    return _axios.default[method](queryUrl, _qs.default.stringify(form), config);
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


exports.request = request;

const getUsersAsAdmin = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/admin/users';
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

exports.getUsersAsAdmin = getUsersAsAdmin;

const getUsersAsAdmin_RAW_URL = function () {
  return '/admin/users';
};

exports.getUsersAsAdmin_RAW_URL = getUsersAsAdmin_RAW_URL;

const getUsersAsAdmin_TYPE = function () {
  return 'get';
};

exports.getUsersAsAdmin_TYPE = getUsersAsAdmin_TYPE;

const getUsersAsAdminURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/admin/users';

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


exports.getUsersAsAdminURL = getUsersAsAdminURL;

const deactivateUserAsAdmin = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/admin/users/{id}';
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

exports.deactivateUserAsAdmin = deactivateUserAsAdmin;

const deactivateUserAsAdmin_RAW_URL = function () {
  return '/admin/users/{id}';
};

exports.deactivateUserAsAdmin_RAW_URL = deactivateUserAsAdmin_RAW_URL;

const deactivateUserAsAdmin_TYPE = function () {
  return 'post';
};

exports.deactivateUserAsAdmin_TYPE = deactivateUserAsAdmin_TYPE;

const deactivateUserAsAdminURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/admin/users/{id}';
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


exports.deactivateUserAsAdminURL = deactivateUserAsAdminURL;

const activateUserAsAdmin = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/admin/users/{id}/activate';
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

exports.activateUserAsAdmin = activateUserAsAdmin;

const activateUserAsAdmin_RAW_URL = function () {
  return '/admin/users/{id}/activate';
};

exports.activateUserAsAdmin_RAW_URL = activateUserAsAdmin_RAW_URL;

const activateUserAsAdmin_TYPE = function () {
  return 'post';
};

exports.activateUserAsAdmin_TYPE = activateUserAsAdmin_TYPE;

const activateUserAsAdminURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/admin/users/{id}/activate';
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


exports.activateUserAsAdminURL = activateUserAsAdminURL;

const changeUserRole = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/admin/users/{id}/role/{role}';
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

exports.changeUserRole = changeUserRole;

const changeUserRole_RAW_URL = function () {
  return '/admin/users/{id}/role/{role}';
};

exports.changeUserRole_RAW_URL = changeUserRole_RAW_URL;

const changeUserRole_TYPE = function () {
  return 'post';
};

exports.changeUserRole_TYPE = changeUserRole_TYPE;

const changeUserRoleURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/admin/users/{id}/role/{role}';
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


exports.changeUserRoleURL = changeUserRoleURL;

const getChats = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/chat/chats';
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

exports.getChats = getChats;

const getChats_RAW_URL = function () {
  return '/chat/chats';
};

exports.getChats_RAW_URL = getChats_RAW_URL;

const getChats_TYPE = function () {
  return 'get';
};

exports.getChats_TYPE = getChats_TYPE;

const getChatsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/chat/chats';

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


exports.getChatsURL = getChatsURL;

const getChat = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/chat/{chat}';
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

exports.getChat = getChat;

const getChat_RAW_URL = function () {
  return '/chat/{chat}';
};

exports.getChat_RAW_URL = getChat_RAW_URL;

const getChat_TYPE = function () {
  return 'get';
};

exports.getChat_TYPE = getChat_TYPE;

const getChatURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/chat/{chat}';
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
 * request: saveComment
 * url: saveCommentURL
 * method: saveComment_TYPE
 * raw_url: saveComment_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param comment - JSON representation of the comment.
 * @param post - 
 */


exports.getChatURL = getChatURL;

const saveComment = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/comment/{post}/save';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['comment'] !== undefined) {
    body = parameters['comment'];
  }

  path = path.replace('{post}', `${parameters['post']}`);

  if (parameters['post'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: post'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.saveComment = saveComment;

const saveComment_RAW_URL = function () {
  return '/comment/{post}/save';
};

exports.saveComment_RAW_URL = saveComment_RAW_URL;

const saveComment_TYPE = function () {
  return 'post';
};

exports.saveComment_TYPE = saveComment_TYPE;

const saveCommentURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/comment/{post}/save';
  path = path.replace('{post}', `${parameters['post']}`);

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
 * request: getPostComments
 * url: getPostCommentsURL
 * method: getPostComments_TYPE
 * raw_url: getPostComments_RAW_URL
 * @param post - 
 */


exports.saveCommentURL = saveCommentURL;

const getPostComments = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/comment/by-post/{post}';
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace('{post}', `${parameters['post']}`);

  if (parameters['post'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: post'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getPostComments = getPostComments;

const getPostComments_RAW_URL = function () {
  return '/comment/by-post/{post}';
};

exports.getPostComments_RAW_URL = getPostComments_RAW_URL;

const getPostComments_TYPE = function () {
  return 'get';
};

exports.getPostComments_TYPE = getPostComments_TYPE;

const getPostCommentsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/comment/by-post/{post}';
  path = path.replace('{post}', `${parameters['post']}`);

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


exports.getPostCommentsURL = getPostCommentsURL;

const addLead = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/lead';
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

exports.addLead = addLead;

const addLead_RAW_URL = function () {
  return '/lead';
};

exports.addLead_RAW_URL = addLead_RAW_URL;

const addLead_TYPE = function () {
  return 'post';
};

exports.addLead_TYPE = addLead_TYPE;

const addLeadURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/lead';

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


exports.addLeadURL = addLeadURL;

const getLeads = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/lead';
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

exports.getLeads = getLeads;

const getLeads_RAW_URL = function () {
  return '/lead';
};

exports.getLeads_RAW_URL = getLeads_RAW_URL;

const getLeads_TYPE = function () {
  return 'get';
};

exports.getLeads_TYPE = getLeads_TYPE;

const getLeadsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/lead';

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


exports.getLeadsURL = getLeadsURL;

const getLead = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/lead/{id}';
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

exports.getLead = getLead;

const getLead_RAW_URL = function () {
  return '/lead/{id}';
};

exports.getLead_RAW_URL = getLead_RAW_URL;

const getLead_TYPE = function () {
  return 'get';
};

exports.getLead_TYPE = getLead_TYPE;

const getLeadURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/lead/{id}';
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
 * request: createCart
 * url: createCartURL
 * method: createCart_TYPE
 * raw_url: createCart_RAW_URL
 */


exports.getLeadURL = getLeadURL;

const createCart = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/cart/create';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.createCart = createCart;

const createCart_RAW_URL = function () {
  return '/cart/create';
};

exports.createCart_RAW_URL = createCart_RAW_URL;

const createCart_TYPE = function () {
  return 'post';
};

exports.createCart_TYPE = createCart_TYPE;

const createCartURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/cart/create';

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
 * request: getCart
 * url: getCartURL
 * method: getCart_TYPE
 * raw_url: getCart_RAW_URL
 * @param id - 
 */


exports.createCartURL = createCartURL;

const getCart = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/cart/{id}';
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

exports.getCart = getCart;

const getCart_RAW_URL = function () {
  return '/cart/{id}';
};

exports.getCart_RAW_URL = getCart_RAW_URL;

const getCart_TYPE = function () {
  return 'get';
};

exports.getCart_TYPE = getCart_TYPE;

const getCartURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/cart/{id}';
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
 * request: clearCart
 * url: clearCartURL
 * method: clearCart_TYPE
 * raw_url: clearCart_RAW_URL
 * @param id - 
 */


exports.getCartURL = getCartURL;

const clearCart = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/cart/{id}/clear';
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

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.clearCart = clearCart;

const clearCart_RAW_URL = function () {
  return '/cart/{id}/clear';
};

exports.clearCart_RAW_URL = clearCart_RAW_URL;

const clearCart_TYPE = function () {
  return 'post';
};

exports.clearCart_TYPE = clearCart_TYPE;

const clearCartURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/cart/{id}/clear';
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
 * request: getCartItems
 * url: getCartItemsURL
 * method: getCartItems_TYPE
 * raw_url: getCartItems_RAW_URL
 * @param id - 
 * @param category - 
 */


exports.clearCartURL = clearCartURL;

const getCartItems = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/cart/{id}/items/list/{category}';
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  path = path.replace('{category}', `${parameters['category']}`);

  if (parameters['category'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: category'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getCartItems = getCartItems;

const getCartItems_RAW_URL = function () {
  return '/cart/{id}/items/list/{category}';
};

exports.getCartItems_RAW_URL = getCartItems_RAW_URL;

const getCartItems_TYPE = function () {
  return 'get';
};

exports.getCartItems_TYPE = getCartItems_TYPE;

const getCartItemsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/cart/{id}/items/list/{category}';
  path = path.replace('{id}', `${parameters['id']}`);
  path = path.replace('{category}', `${parameters['category']}`);

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
 * request: incrementOnCart
 * url: incrementOnCartURL
 * method: incrementOnCart_TYPE
 * raw_url: incrementOnCart_RAW_URL
 * @param item - JSON representation of the item.
 * @param id - 
 */


exports.getCartItemsURL = getCartItemsURL;

const incrementOnCart = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/cart/{id}/items/increment';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['item'] !== undefined) {
    body = parameters['item'];
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

exports.incrementOnCart = incrementOnCart;

const incrementOnCart_RAW_URL = function () {
  return '/cart/{id}/items/increment';
};

exports.incrementOnCart_RAW_URL = incrementOnCart_RAW_URL;

const incrementOnCart_TYPE = function () {
  return 'post';
};

exports.incrementOnCart_TYPE = incrementOnCart_TYPE;

const incrementOnCartURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/cart/{id}/items/increment';
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
 * request: decrementOnCart
 * url: decrementOnCartURL
 * method: decrementOnCart_TYPE
 * raw_url: decrementOnCart_RAW_URL
 * @param item - JSON representation of the item.
 * @param id - 
 */


exports.incrementOnCartURL = incrementOnCartURL;

const decrementOnCart = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/cart/{id}/items/decrement';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['item'] !== undefined) {
    body = parameters['item'];
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

exports.decrementOnCart = decrementOnCart;

const decrementOnCart_RAW_URL = function () {
  return '/cart/{id}/items/decrement';
};

exports.decrementOnCart_RAW_URL = decrementOnCart_RAW_URL;

const decrementOnCart_TYPE = function () {
  return 'post';
};

exports.decrementOnCart_TYPE = decrementOnCart_TYPE;

const decrementOnCartURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/cart/{id}/items/decrement';
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
 * request: createCoupon
 * url: createCouponURL
 * method: createCoupon_TYPE
 * raw_url: createCoupon_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param couponInfo - JSON representation of the Coupon to be created.
 */


exports.decrementOnCartURL = decrementOnCartURL;

const createCoupon = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/coupon/create';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['couponInfo'] !== undefined) {
    body = parameters['couponInfo'];
  }

  if (parameters['couponInfo'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: couponInfo'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.createCoupon = createCoupon;

const createCoupon_RAW_URL = function () {
  return '/coupon/create';
};

exports.createCoupon_RAW_URL = createCoupon_RAW_URL;

const createCoupon_TYPE = function () {
  return 'post';
};

exports.createCoupon_TYPE = createCoupon_TYPE;

const createCouponURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/coupon/create';

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
 * request: getCoupon
 * url: getCouponURL
 * method: getCoupon_TYPE
 * raw_url: getCoupon_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param couponName - Informations about the coupon
 * @param name - 
 */


exports.createCouponURL = createCouponURL;

const getCoupon = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/coupon/by-name/{name}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{couponName}', `${parameters['couponName']}`);

  if (parameters['couponName'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: couponName'));
  }

  path = path.replace('{name}', `${parameters['name']}`);

  if (parameters['name'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: name'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getCoupon = getCoupon;

const getCoupon_RAW_URL = function () {
  return '/coupon/by-name/{name}';
};

exports.getCoupon_RAW_URL = getCoupon_RAW_URL;

const getCoupon_TYPE = function () {
  return 'get';
};

exports.getCoupon_TYPE = getCoupon_TYPE;

const getCouponURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/coupon/by-name/{name}';
  path = path.replace('{couponName}', `${parameters['couponName']}`);
  path = path.replace('{name}', `${parameters['name']}`);

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
 * request: useCoupon
 * url: useCouponURL
 * method: useCoupon_TYPE
 * raw_url: useCoupon_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param couponName - Decrement countMax of the couponName by one.
 */


exports.getCouponURL = getCouponURL;

const useCoupon = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/coupon/{couponName}/use';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{couponName}', `${parameters['couponName']}`);

  if (parameters['couponName'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: couponName'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.useCoupon = useCoupon;

const useCoupon_RAW_URL = function () {
  return '/coupon/{couponName}/use';
};

exports.useCoupon_RAW_URL = useCoupon_RAW_URL;

const useCoupon_TYPE = function () {
  return 'post';
};

exports.useCoupon_TYPE = useCoupon_TYPE;

const useCouponURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/coupon/{couponName}/use';
  path = path.replace('{couponName}', `${parameters['couponName']}`);

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


exports.useCouponURL = useCouponURL;

const removeFavoriteMerchant = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/customer/favorites/merchant/{merchant}';
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

exports.removeFavoriteMerchant = removeFavoriteMerchant;

const removeFavoriteMerchant_RAW_URL = function () {
  return '/customer/favorites/merchant/{merchant}';
};

exports.removeFavoriteMerchant_RAW_URL = removeFavoriteMerchant_RAW_URL;

const removeFavoriteMerchant_TYPE = function () {
  return 'post';
};

exports.removeFavoriteMerchant_TYPE = removeFavoriteMerchant_TYPE;

const removeFavoriteMerchantURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/customer/favorites/merchant/{merchant}';
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


exports.removeFavoriteMerchantURL = removeFavoriteMerchantURL;

const getFavoritesList = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/customer/favorites/merchants';
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

exports.getFavoritesList = getFavoritesList;

const getFavoritesList_RAW_URL = function () {
  return '/customer/favorites/merchants';
};

exports.getFavoritesList_RAW_URL = getFavoritesList_RAW_URL;

const getFavoritesList_TYPE = function () {
  return 'get';
};

exports.getFavoritesList_TYPE = getFavoritesList_TYPE;

const getFavoritesListURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/customer/favorites/merchants';

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
 * request: saveInventoryItem
 * url: saveInventoryItemURL
 * method: saveInventoryItem_TYPE
 * raw_url: saveInventoryItem_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param item - JSON representation of the item.
 */


exports.getFavoritesListURL = getFavoritesListURL;

const saveInventoryItem = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/inventory/items';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['item'] !== undefined) {
    body = parameters['item'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.saveInventoryItem = saveInventoryItem;

const saveInventoryItem_RAW_URL = function () {
  return '/inventory/items';
};

exports.saveInventoryItem_RAW_URL = saveInventoryItem_RAW_URL;

const saveInventoryItem_TYPE = function () {
  return 'post';
};

exports.saveInventoryItem_TYPE = saveInventoryItem_TYPE;

const saveInventoryItemURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/inventory/items';

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
 * request: removeInventoryItem
 * url: removeInventoryItemURL
 * method: removeInventoryItem_TYPE
 * raw_url: removeInventoryItem_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 */


exports.saveInventoryItemURL = saveInventoryItemURL;

const removeInventoryItem = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/inventory/items/{id}/delete';
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

exports.removeInventoryItem = removeInventoryItem;

const removeInventoryItem_RAW_URL = function () {
  return '/inventory/items/{id}/delete';
};

exports.removeInventoryItem_RAW_URL = removeInventoryItem_RAW_URL;

const removeInventoryItem_TYPE = function () {
  return 'post';
};

exports.removeInventoryItem_TYPE = removeInventoryItem_TYPE;

const removeInventoryItemURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/inventory/items/{id}/delete';
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
 * request: getInventoryItemsCount
 * url: getInventoryItemsCountURL
 * method: getInventoryItemsCount_TYPE
 * raw_url: getInventoryItemsCount_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


exports.removeInventoryItemURL = removeInventoryItemURL;

const getInventoryItemsCount = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/inventory/items/count';
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

exports.getInventoryItemsCount = getInventoryItemsCount;

const getInventoryItemsCount_RAW_URL = function () {
  return '/inventory/items/count';
};

exports.getInventoryItemsCount_RAW_URL = getInventoryItemsCount_RAW_URL;

const getInventoryItemsCount_TYPE = function () {
  return 'get';
};

exports.getInventoryItemsCount_TYPE = getInventoryItemsCount_TYPE;

const getInventoryItemsCountURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/inventory/items/count';

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
 * request: getInventoryCategory
 * url: getInventoryCategoryURL
 * method: getInventoryCategory_TYPE
 * raw_url: getInventoryCategory_RAW_URL
 * @param merchant - 
 * @param category - 
 */


exports.getInventoryItemsCountURL = getInventoryItemsCountURL;

const getInventoryCategory = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/inventory/{merchant}/category/{category}';
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace('{merchant}', `${parameters['merchant']}`);

  if (parameters['merchant'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: merchant'));
  }

  path = path.replace('{category}', `${parameters['category']}`);

  if (parameters['category'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: category'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getInventoryCategory = getInventoryCategory;

const getInventoryCategory_RAW_URL = function () {
  return '/inventory/{merchant}/category/{category}';
};

exports.getInventoryCategory_RAW_URL = getInventoryCategory_RAW_URL;

const getInventoryCategory_TYPE = function () {
  return 'get';
};

exports.getInventoryCategory_TYPE = getInventoryCategory_TYPE;

const getInventoryCategoryURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/inventory/{merchant}/category/{category}';
  path = path.replace('{merchant}', `${parameters['merchant']}`);
  path = path.replace('{category}', `${parameters['category']}`);

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
 * request: getInventoryItems
 * url: getInventoryItemsURL
 * method: getInventoryItems_TYPE
 * raw_url: getInventoryItems_RAW_URL
 * @param page - Number of pages to skip.
 * @param pageSize - Size of documents on one page.
 * @param merchant - 
 * @param category - 
 */


exports.getInventoryCategoryURL = getInventoryCategoryURL;

const getInventoryItems = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/inventory/{merchant}/items/list/{category}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page'];
  }

  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize'];
  }

  path = path.replace('{merchant}', `${parameters['merchant']}`);

  if (parameters['merchant'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: merchant'));
  }

  path = path.replace('{category}', `${parameters['category']}`);

  if (parameters['category'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: category'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getInventoryItems = getInventoryItems;

const getInventoryItems_RAW_URL = function () {
  return '/inventory/{merchant}/items/list/{category}';
};

exports.getInventoryItems_RAW_URL = getInventoryItems_RAW_URL;

const getInventoryItems_TYPE = function () {
  return 'get';
};

exports.getInventoryItems_TYPE = getInventoryItems_TYPE;

const getInventoryItemsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/inventory/{merchant}/items/list/{category}';

  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page'];
  }

  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize'];
  }

  path = path.replace('{merchant}', `${parameters['merchant']}`);
  path = path.replace('{category}', `${parameters['category']}`);

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
 * request: saveMarketItem
 * url: saveMarketItemURL
 * method: saveMarketItem_TYPE
 * raw_url: saveMarketItem_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param item - JSON representation of the market item to be created.
 */


exports.getInventoryItemsURL = getInventoryItemsURL;

const saveMarketItem = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item/save';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['item'] !== undefined) {
    body = parameters['item'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.saveMarketItem = saveMarketItem;

const saveMarketItem_RAW_URL = function () {
  return '/market-item/save';
};

exports.saveMarketItem_RAW_URL = saveMarketItem_RAW_URL;

const saveMarketItem_TYPE = function () {
  return 'post';
};

exports.saveMarketItem_TYPE = saveMarketItem_TYPE;

const saveMarketItemURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item/save';

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
 * request: getMarketItemById
 * url: getMarketItemByIdURL
 * method: getMarketItemById_TYPE
 * raw_url: getMarketItemById_RAW_URL
 * @param id - 
 */


exports.saveMarketItemURL = saveMarketItemURL;

const getMarketItemById = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item/by-id/{id}';
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

exports.getMarketItemById = getMarketItemById;

const getMarketItemById_RAW_URL = function () {
  return '/market-item/by-id/{id}';
};

exports.getMarketItemById_RAW_URL = getMarketItemById_RAW_URL;

const getMarketItemById_TYPE = function () {
  return 'get';
};

exports.getMarketItemById_TYPE = getMarketItemById_TYPE;

const getMarketItemByIdURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item/by-id/{id}';
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
 * request: getMarketItemBySlug
 * url: getMarketItemBySlugURL
 * method: getMarketItemBySlug_TYPE
 * raw_url: getMarketItemBySlug_RAW_URL
 * @param slug - 
 */


exports.getMarketItemByIdURL = getMarketItemByIdURL;

const getMarketItemBySlug = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item/by-slug/{slug}';
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace('{slug}', `${parameters['slug']}`);

  if (parameters['slug'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: slug'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getMarketItemBySlug = getMarketItemBySlug;

const getMarketItemBySlug_RAW_URL = function () {
  return '/market-item/by-slug/{slug}';
};

exports.getMarketItemBySlug_RAW_URL = getMarketItemBySlug_RAW_URL;

const getMarketItemBySlug_TYPE = function () {
  return 'get';
};

exports.getMarketItemBySlug_TYPE = getMarketItemBySlug_TYPE;

const getMarketItemBySlugURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item/by-slug/{slug}';
  path = path.replace('{slug}', `${parameters['slug']}`);

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
 * request: acceptMarketItem
 * url: acceptMarketItemURL
 * method: acceptMarketItem_TYPE
 * raw_url: acceptMarketItem_RAW_URL
 * @param id - 
 */


exports.getMarketItemBySlugURL = getMarketItemBySlugURL;

const acceptMarketItem = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item/{id}/accept';
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

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.acceptMarketItem = acceptMarketItem;

const acceptMarketItem_RAW_URL = function () {
  return '/market-item/{id}/accept';
};

exports.acceptMarketItem_RAW_URL = acceptMarketItem_RAW_URL;

const acceptMarketItem_TYPE = function () {
  return 'post';
};

exports.acceptMarketItem_TYPE = acceptMarketItem_TYPE;

const acceptMarketItemURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item/{id}/accept';
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
 * request: rejectMarketItem
 * url: rejectMarketItemURL
 * method: rejectMarketItem_TYPE
 * raw_url: rejectMarketItem_RAW_URL
 * @param id - 
 */


exports.acceptMarketItemURL = acceptMarketItemURL;

const rejectMarketItem = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item/{id}/reject';
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

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.rejectMarketItem = rejectMarketItem;

const rejectMarketItem_RAW_URL = function () {
  return '/market-item/{id}/reject';
};

exports.rejectMarketItem_RAW_URL = rejectMarketItem_RAW_URL;

const rejectMarketItem_TYPE = function () {
  return 'post';
};

exports.rejectMarketItem_TYPE = rejectMarketItem_TYPE;

const rejectMarketItemURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item/{id}/reject';
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
 * request: deactivateMarketItem
 * url: deactivateMarketItemURL
 * method: deactivateMarketItem_TYPE
 * raw_url: deactivateMarketItem_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 */


exports.rejectMarketItemURL = rejectMarketItemURL;

const deactivateMarketItem = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item/deactivate/{id}';
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

exports.deactivateMarketItem = deactivateMarketItem;

const deactivateMarketItem_RAW_URL = function () {
  return '/market-item/deactivate/{id}';
};

exports.deactivateMarketItem_RAW_URL = deactivateMarketItem_RAW_URL;

const deactivateMarketItem_TYPE = function () {
  return 'get';
};

exports.deactivateMarketItem_TYPE = deactivateMarketItem_TYPE;

const deactivateMarketItemURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item/deactivate/{id}';
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
 * request: activateMarketItem
 * url: activateMarketItemURL
 * method: activateMarketItem_TYPE
 * raw_url: activateMarketItem_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 */


exports.deactivateMarketItemURL = deactivateMarketItemURL;

const activateMarketItem = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item/activate/{id}';
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

exports.activateMarketItem = activateMarketItem;

const activateMarketItem_RAW_URL = function () {
  return '/market-item/activate/{id}';
};

exports.activateMarketItem_RAW_URL = activateMarketItem_RAW_URL;

const activateMarketItem_TYPE = function () {
  return 'get';
};

exports.activateMarketItem_TYPE = activateMarketItem_TYPE;

const activateMarketItemURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item/activate/{id}';
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
 * request: getPendingMarketItems
 * url: getPendingMarketItemsURL
 * method: getPendingMarketItems_TYPE
 * raw_url: getPendingMarketItems_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


exports.activateMarketItemURL = activateMarketItemURL;

const getPendingMarketItems = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item/pending';
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

exports.getPendingMarketItems = getPendingMarketItems;

const getPendingMarketItems_RAW_URL = function () {
  return '/market-item/pending';
};

exports.getPendingMarketItems_RAW_URL = getPendingMarketItems_RAW_URL;

const getPendingMarketItems_TYPE = function () {
  return 'get';
};

exports.getPendingMarketItems_TYPE = getPendingMarketItems_TYPE;

const getPendingMarketItemsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item/pending';

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
 * request: getAllMarketItems
 * url: getAllMarketItemsURL
 * method: getAllMarketItems_TYPE
 * raw_url: getAllMarketItems_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param page - Number of pages to skip.
 * @param pageSize - Size of documents on one page.
 * @param category - 
 */


exports.getPendingMarketItemsURL = getPendingMarketItemsURL;

const getAllMarketItems = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item/admin/list/{category}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page'];
  }

  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize'];
  }

  path = path.replace('{category}', `${parameters['category']}`);

  if (parameters['category'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: category'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getAllMarketItems = getAllMarketItems;

const getAllMarketItems_RAW_URL = function () {
  return '/market-item/admin/list/{category}';
};

exports.getAllMarketItems_RAW_URL = getAllMarketItems_RAW_URL;

const getAllMarketItems_TYPE = function () {
  return 'get';
};

exports.getAllMarketItems_TYPE = getAllMarketItems_TYPE;

const getAllMarketItemsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item/admin/list/{category}';

  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page'];
  }

  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize'];
  }

  path = path.replace('{category}', `${parameters['category']}`);

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
 * request: getMarketItems
 * url: getMarketItemsURL
 * method: getMarketItems_TYPE
 * raw_url: getMarketItems_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param page - Number of pages to skip.
 * @param pageSize - Size of documents on one page.
 * @param exclude - Ids of items that must excluded from the results.
 * @param category - 
 */


exports.getAllMarketItemsURL = getAllMarketItemsURL;

const getMarketItems = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item/list/{category}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page'];
  }

  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize'];
  }

  if (parameters['exclude'] !== undefined) {
    queryParameters['exclude'] = parameters['exclude'];
  }

  if (parameters['exclude'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: exclude'));
  }

  path = path.replace('{category}', `${parameters['category']}`);

  if (parameters['category'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: category'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getMarketItems = getMarketItems;

const getMarketItems_RAW_URL = function () {
  return '/market-item/list/{category}';
};

exports.getMarketItems_RAW_URL = getMarketItems_RAW_URL;

const getMarketItems_TYPE = function () {
  return 'get';
};

exports.getMarketItems_TYPE = getMarketItems_TYPE;

const getMarketItemsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item/list/{category}';

  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page'];
  }

  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize'];
  }

  if (parameters['exclude'] !== undefined) {
    queryParameters['exclude'] = parameters['exclude'];
  }

  path = path.replace('{category}', `${parameters['category']}`);

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
 * request: addMarketItemAttribute
 * url: addMarketItemAttributeURL
 * method: addMarketItemAttribute_TYPE
 * raw_url: addMarketItemAttribute_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param attribute - JSON representation of the attribute to be created.
 */


exports.getMarketItemsURL = getMarketItemsURL;

const addMarketItemAttribute = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item-attribute/attributes/save';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['attribute'] !== undefined) {
    body = parameters['attribute'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.addMarketItemAttribute = addMarketItemAttribute;

const addMarketItemAttribute_RAW_URL = function () {
  return '/market-item-attribute/attributes/save';
};

exports.addMarketItemAttribute_RAW_URL = addMarketItemAttribute_RAW_URL;

const addMarketItemAttribute_TYPE = function () {
  return 'post';
};

exports.addMarketItemAttribute_TYPE = addMarketItemAttribute_TYPE;

const addMarketItemAttributeURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item-attribute/attributes/save';

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
 * request: getMarketItemAttributes
 * url: getMarketItemAttributesURL
 * method: getMarketItemAttributes_TYPE
 * raw_url: getMarketItemAttributes_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


exports.addMarketItemAttributeURL = addMarketItemAttributeURL;

const getMarketItemAttributes = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item-attribute/attributes/list';
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

exports.getMarketItemAttributes = getMarketItemAttributes;

const getMarketItemAttributes_RAW_URL = function () {
  return '/market-item-attribute/attributes/list';
};

exports.getMarketItemAttributes_RAW_URL = getMarketItemAttributes_RAW_URL;

const getMarketItemAttributes_TYPE = function () {
  return 'get';
};

exports.getMarketItemAttributes_TYPE = getMarketItemAttributes_TYPE;

const getMarketItemAttributesURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item-attribute/attributes/list';

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
 * request: addMarketItemCategory
 * url: addMarketItemCategoryURL
 * method: addMarketItemCategory_TYPE
 * raw_url: addMarketItemCategory_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param category - JSON representation of the category to be created.
 */


exports.getMarketItemAttributesURL = getMarketItemAttributesURL;

const addMarketItemCategory = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item-category';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['category'] !== undefined) {
    body = parameters['category'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.addMarketItemCategory = addMarketItemCategory;

const addMarketItemCategory_RAW_URL = function () {
  return '/market-item-category';
};

exports.addMarketItemCategory_RAW_URL = addMarketItemCategory_RAW_URL;

const addMarketItemCategory_TYPE = function () {
  return 'post';
};

exports.addMarketItemCategory_TYPE = addMarketItemCategory_TYPE;

const addMarketItemCategoryURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item-category';

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
 * request: getMarketItemCategories
 * url: getMarketItemCategoriesURL
 * method: getMarketItemCategories_TYPE
 * raw_url: getMarketItemCategories_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


exports.addMarketItemCategoryURL = addMarketItemCategoryURL;

const getMarketItemCategories = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item-category';
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

exports.getMarketItemCategories = getMarketItemCategories;

const getMarketItemCategories_RAW_URL = function () {
  return '/market-item-category';
};

exports.getMarketItemCategories_RAW_URL = getMarketItemCategories_RAW_URL;

const getMarketItemCategories_TYPE = function () {
  return 'get';
};

exports.getMarketItemCategories_TYPE = getMarketItemCategories_TYPE;

const getMarketItemCategoriesURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item-category';

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
 * request: getRootMarketItemCategories
 * url: getRootMarketItemCategoriesURL
 * method: getRootMarketItemCategories_TYPE
 * raw_url: getRootMarketItemCategories_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


exports.getMarketItemCategoriesURL = getMarketItemCategoriesURL;

const getRootMarketItemCategories = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item-category/root';
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

exports.getRootMarketItemCategories = getRootMarketItemCategories;

const getRootMarketItemCategories_RAW_URL = function () {
  return '/market-item-category/root';
};

exports.getRootMarketItemCategories_RAW_URL = getRootMarketItemCategories_RAW_URL;

const getRootMarketItemCategories_TYPE = function () {
  return 'get';
};

exports.getRootMarketItemCategories_TYPE = getRootMarketItemCategories_TYPE;

const getRootMarketItemCategoriesURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item-category/root';

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
 * request: getMarketItemCategoryBySlug
 * url: getMarketItemCategoryBySlugURL
 * method: getMarketItemCategoryBySlug_TYPE
 * raw_url: getMarketItemCategoryBySlug_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param category - 
 */


exports.getRootMarketItemCategoriesURL = getRootMarketItemCategoriesURL;

const getMarketItemCategoryBySlug = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item-category/categories/by-slug/{category}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{category}', `${parameters['category']}`);

  if (parameters['category'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: category'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getMarketItemCategoryBySlug = getMarketItemCategoryBySlug;

const getMarketItemCategoryBySlug_RAW_URL = function () {
  return '/market-item-category/categories/by-slug/{category}';
};

exports.getMarketItemCategoryBySlug_RAW_URL = getMarketItemCategoryBySlug_RAW_URL;

const getMarketItemCategoryBySlug_TYPE = function () {
  return 'get';
};

exports.getMarketItemCategoryBySlug_TYPE = getMarketItemCategoryBySlug_TYPE;

const getMarketItemCategoryBySlugURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item-category/categories/by-slug/{category}';
  path = path.replace('{category}', `${parameters['category']}`);

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
 * request: deactivateMarketItemCategory
 * url: deactivateMarketItemCategoryURL
 * method: deactivateMarketItemCategory_TYPE
 * raw_url: deactivateMarketItemCategory_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param categoryId - 
 */


exports.getMarketItemCategoryBySlugURL = getMarketItemCategoryBySlugURL;

const deactivateMarketItemCategory = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item-category/categories/{categoryId}/deactivate';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{categoryId}', `${parameters['categoryId']}`);

  if (parameters['categoryId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: categoryId'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.deactivateMarketItemCategory = deactivateMarketItemCategory;

const deactivateMarketItemCategory_RAW_URL = function () {
  return '/market-item-category/categories/{categoryId}/deactivate';
};

exports.deactivateMarketItemCategory_RAW_URL = deactivateMarketItemCategory_RAW_URL;

const deactivateMarketItemCategory_TYPE = function () {
  return 'post';
};

exports.deactivateMarketItemCategory_TYPE = deactivateMarketItemCategory_TYPE;

const deactivateMarketItemCategoryURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item-category/categories/{categoryId}/deactivate';
  path = path.replace('{categoryId}', `${parameters['categoryId']}`);

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
 * request: activateMarketItemCategory
 * url: activateMarketItemCategoryURL
 * method: activateMarketItemCategory_TYPE
 * raw_url: activateMarketItemCategory_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param categoryId - 
 */


exports.deactivateMarketItemCategoryURL = deactivateMarketItemCategoryURL;

const activateMarketItemCategory = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/market-item-category/categories/{categoryId}/activate';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{categoryId}', `${parameters['categoryId']}`);

  if (parameters['categoryId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: categoryId'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.activateMarketItemCategory = activateMarketItemCategory;

const activateMarketItemCategory_RAW_URL = function () {
  return '/market-item-category/categories/{categoryId}/activate';
};

exports.activateMarketItemCategory_RAW_URL = activateMarketItemCategory_RAW_URL;

const activateMarketItemCategory_TYPE = function () {
  return 'post';
};

exports.activateMarketItemCategory_TYPE = activateMarketItemCategory_TYPE;

const activateMarketItemCategoryURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/market-item-category/categories/{categoryId}/activate';
  path = path.replace('{categoryId}', `${parameters['categoryId']}`);

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


exports.activateMarketItemCategoryURL = activateMarketItemCategoryURL;

const getMerchantById = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/merchant/{id}/details';
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

exports.getMerchantById = getMerchantById;

const getMerchantById_RAW_URL = function () {
  return '/merchant/{id}/details';
};

exports.getMerchantById_RAW_URL = getMerchantById_RAW_URL;

const getMerchantById_TYPE = function () {
  return 'get';
};

exports.getMerchantById_TYPE = getMerchantById_TYPE;

const getMerchantByIdURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/merchant/{id}/details';
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


exports.getMerchantByIdURL = getMerchantByIdURL;

const getMerchantByUsername = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/merchant/by-username/{username}';
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

exports.getMerchantByUsername = getMerchantByUsername;

const getMerchantByUsername_RAW_URL = function () {
  return '/merchant/by-username/{username}';
};

exports.getMerchantByUsername_RAW_URL = getMerchantByUsername_RAW_URL;

const getMerchantByUsername_TYPE = function () {
  return 'get';
};

exports.getMerchantByUsername_TYPE = getMerchantByUsername_TYPE;

const getMerchantByUsernameURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/merchant/by-username/{username}';
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
 * request: getNearbyMerchants
 * url: getNearbyMerchantsURL
 * method: getNearbyMerchants_TYPE
 * raw_url: getNearbyMerchants_RAW_URL
 * @param latitude - Geolocation latitude value.
 * @param longitude - Geolocation longitude value.
 * @param radius - Maximum radius to search for (km).
 * @param keyword - Geolocation keyword value.
 */


exports.getMerchantByUsernameURL = getMerchantByUsernameURL;

const getNearbyMerchants = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/merchant/nearby';
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

exports.getNearbyMerchants = getNearbyMerchants;

const getNearbyMerchants_RAW_URL = function () {
  return '/merchant/nearby';
};

exports.getNearbyMerchants_RAW_URL = getNearbyMerchants_RAW_URL;

const getNearbyMerchants_TYPE = function () {
  return 'get';
};

exports.getNearbyMerchants_TYPE = getNearbyMerchants_TYPE;

const getNearbyMerchantsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/merchant/nearby';

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


exports.getNearbyMerchantsURL = getNearbyMerchantsURL;

const getNearbyMerchantsByService = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/merchant/nearby/{service}';
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

exports.getNearbyMerchantsByService = getNearbyMerchantsByService;

const getNearbyMerchantsByService_RAW_URL = function () {
  return '/merchant/nearby/{service}';
};

exports.getNearbyMerchantsByService_RAW_URL = getNearbyMerchantsByService_RAW_URL;

const getNearbyMerchantsByService_TYPE = function () {
  return 'get';
};

exports.getNearbyMerchantsByService_TYPE = getNearbyMerchantsByService_TYPE;

const getNearbyMerchantsByServiceURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/merchant/nearby/{service}';
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


exports.getNearbyMerchantsByServiceURL = getNearbyMerchantsByServiceURL;

const createOrder = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order';
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

exports.createOrder = createOrder;

const createOrder_RAW_URL = function () {
  return '/order';
};

exports.createOrder_RAW_URL = createOrder_RAW_URL;

const createOrder_TYPE = function () {
  return 'post';
};

exports.createOrder_TYPE = createOrder_TYPE;

const createOrderURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order';

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


exports.createOrderURL = createOrderURL;

const getOrders = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order';
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

exports.getOrders = getOrders;

const getOrders_RAW_URL = function () {
  return '/order';
};

exports.getOrders_RAW_URL = getOrders_RAW_URL;

const getOrders_TYPE = function () {
  return 'get';
};

exports.getOrders_TYPE = getOrders_TYPE;

const getOrdersURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order';

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


exports.getOrdersURL = getOrdersURL;

const getOrdersByPeriod = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order/between-dates';
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

exports.getOrdersByPeriod = getOrdersByPeriod;

const getOrdersByPeriod_RAW_URL = function () {
  return '/order/between-dates';
};

exports.getOrdersByPeriod_RAW_URL = getOrdersByPeriod_RAW_URL;

const getOrdersByPeriod_TYPE = function () {
  return 'get';
};

exports.getOrdersByPeriod_TYPE = getOrdersByPeriod_TYPE;

const getOrdersByPeriodURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order/between-dates';

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


exports.getOrdersByPeriodURL = getOrdersByPeriodURL;

const getOrder = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order/{id}';
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

exports.getOrder = getOrder;

const getOrder_RAW_URL = function () {
  return '/order/{id}';
};

exports.getOrder_RAW_URL = getOrder_RAW_URL;

const getOrder_TYPE = function () {
  return 'get';
};

exports.getOrder_TYPE = getOrder_TYPE;

const getOrderURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order/{id}';
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


exports.getOrderURL = getOrderURL;

const acceptOrder = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order/{id}/accept';
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

exports.acceptOrder = acceptOrder;

const acceptOrder_RAW_URL = function () {
  return '/order/{id}/accept';
};

exports.acceptOrder_RAW_URL = acceptOrder_RAW_URL;

const acceptOrder_TYPE = function () {
  return 'post';
};

exports.acceptOrder_TYPE = acceptOrder_TYPE;

const acceptOrderURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order/{id}/accept';
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


exports.acceptOrderURL = acceptOrderURL;

const cancelOrder = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order/{id}/cancel';
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

exports.cancelOrder = cancelOrder;

const cancelOrder_RAW_URL = function () {
  return '/order/{id}/cancel';
};

exports.cancelOrder_RAW_URL = cancelOrder_RAW_URL;

const cancelOrder_TYPE = function () {
  return 'get';
};

exports.cancelOrder_TYPE = cancelOrder_TYPE;

const cancelOrderURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order/{id}/cancel';
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


exports.cancelOrderURL = cancelOrderURL;

const rateOrder = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order/{id}/rate/{rate}';
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

exports.rateOrder = rateOrder;

const rateOrder_RAW_URL = function () {
  return '/order/{id}/rate/{rate}';
};

exports.rateOrder_RAW_URL = rateOrder_RAW_URL;

const rateOrder_TYPE = function () {
  return 'post';
};

exports.rateOrder_TYPE = rateOrder_TYPE;

const rateOrderURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order/{id}/rate/{rate}';
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


exports.rateOrderURL = rateOrderURL;

const getReceivingModes = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order/receiving-modes';
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

exports.getReceivingModes = getReceivingModes;

const getReceivingModes_RAW_URL = function () {
  return '/order/receiving-modes';
};

exports.getReceivingModes_RAW_URL = getReceivingModes_RAW_URL;

const getReceivingModes_TYPE = function () {
  return 'get';
};

exports.getReceivingModes_TYPE = getReceivingModes_TYPE;

const getReceivingModesURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order/receiving-modes';

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
 * request: getPromotions
 * url: getPromotionsURL
 * method: getPromotions_TYPE
 * raw_url: getPromotions_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


exports.getReceivingModesURL = getReceivingModesURL;

const getPromotions = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/promotion';
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

exports.getPromotions = getPromotions;

const getPromotions_RAW_URL = function () {
  return '/promotion';
};

exports.getPromotions_RAW_URL = getPromotions_RAW_URL;

const getPromotions_TYPE = function () {
  return 'get';
};

exports.getPromotions_TYPE = getPromotions_TYPE;

const getPromotionsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/promotion';

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
 * request: savePromotion
 * url: savePromotionURL
 * method: savePromotion_TYPE
 * raw_url: savePromotion_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param promotion - JSON representation of the promotion to be created.
 */


exports.getPromotionsURL = getPromotionsURL;

const savePromotion = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/promotion';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['promotion'] !== undefined) {
    body = parameters['promotion'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.savePromotion = savePromotion;

const savePromotion_RAW_URL = function () {
  return '/promotion';
};

exports.savePromotion_RAW_URL = savePromotion_RAW_URL;

const savePromotion_TYPE = function () {
  return 'post';
};

exports.savePromotion_TYPE = savePromotion_TYPE;

const savePromotionURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/promotion';

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
 * request: getPromotion
 * url: getPromotionURL
 * method: getPromotion_TYPE
 * raw_url: getPromotion_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 * @param merchant - 
 */


exports.savePromotionURL = savePromotionURL;

const getPromotion = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/promotion/{id}/{merchant}';
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

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getPromotion = getPromotion;

const getPromotion_RAW_URL = function () {
  return '/promotion/{id}/{merchant}';
};

exports.getPromotion_RAW_URL = getPromotion_RAW_URL;

const getPromotion_TYPE = function () {
  return 'get';
};

exports.getPromotion_TYPE = getPromotion_TYPE;

const getPromotionURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/promotion/{id}/{merchant}';
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
 * request: getPromotionCategory
 * url: getPromotionCategoryURL
 * method: getPromotionCategory_TYPE
 * raw_url: getPromotionCategory_RAW_URL
 * @param id - 
 * @param merchant - 
 * @param category - 
 */


exports.getPromotionURL = getPromotionURL;

const getPromotionCategory = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/promotion/{id}/{merchant}/{category}';
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  path = path.replace('{merchant}', `${parameters['merchant']}`);

  if (parameters['merchant'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: merchant'));
  }

  path = path.replace('{category}', `${parameters['category']}`);

  if (parameters['category'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: category'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getPromotionCategory = getPromotionCategory;

const getPromotionCategory_RAW_URL = function () {
  return '/promotion/{id}/{merchant}/{category}';
};

exports.getPromotionCategory_RAW_URL = getPromotionCategory_RAW_URL;

const getPromotionCategory_TYPE = function () {
  return 'get';
};

exports.getPromotionCategory_TYPE = getPromotionCategory_TYPE;

const getPromotionCategoryURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/promotion/{id}/{merchant}/{category}';
  path = path.replace('{id}', `${parameters['id']}`);
  path = path.replace('{merchant}', `${parameters['merchant']}`);
  path = path.replace('{category}', `${parameters['category']}`);

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
 * request: getPromotionItems
 * url: getPromotionItemsURL
 * method: getPromotionItems_TYPE
 * raw_url: getPromotionItems_RAW_URL
 * @param id - 
 * @param merchant - 
 * @param category - 
 */


exports.getPromotionCategoryURL = getPromotionCategoryURL;

const getPromotionItems = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/promotion/{id}/{merchant}/{category}/items/list';
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  path = path.replace('{merchant}', `${parameters['merchant']}`);

  if (parameters['merchant'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: merchant'));
  }

  path = path.replace('{category}', `${parameters['category']}`);

  if (parameters['category'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: category'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getPromotionItems = getPromotionItems;

const getPromotionItems_RAW_URL = function () {
  return '/promotion/{id}/{merchant}/{category}/items/list';
};

exports.getPromotionItems_RAW_URL = getPromotionItems_RAW_URL;

const getPromotionItems_TYPE = function () {
  return 'get';
};

exports.getPromotionItems_TYPE = getPromotionItems_TYPE;

const getPromotionItemsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/promotion/{id}/{merchant}/{category}/items/list';
  path = path.replace('{id}', `${parameters['id']}`);
  path = path.replace('{merchant}', `${parameters['merchant']}`);
  path = path.replace('{category}', `${parameters['category']}`);

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
 * request: addPromotionItem
 * url: addPromotionItemURL
 * method: addPromotionItem_TYPE
 * raw_url: addPromotionItem_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param item - JSON representation of the category to be created.
 * @param id - 
 * @param category - 
 */


exports.getPromotionItemsURL = getPromotionItemsURL;

const addPromotionItem = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/promotion/{id}/{category}/items/add';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['item'] !== undefined) {
    body = parameters['item'];
  }

  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  path = path.replace('{category}', `${parameters['category']}`);

  if (parameters['category'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: category'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.addPromotionItem = addPromotionItem;

const addPromotionItem_RAW_URL = function () {
  return '/promotion/{id}/{category}/items/add';
};

exports.addPromotionItem_RAW_URL = addPromotionItem_RAW_URL;

const addPromotionItem_TYPE = function () {
  return 'post';
};

exports.addPromotionItem_TYPE = addPromotionItem_TYPE;

const addPromotionItemURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/promotion/{id}/{category}/items/add';
  path = path.replace('{id}', `${parameters['id']}`);
  path = path.replace('{category}', `${parameters['category']}`);

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
 * request: removePromotionItem
 * url: removePromotionItemURL
 * method: removePromotionItem_TYPE
 * raw_url: removePromotionItem_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param item - JSON representation of the category to be created.
 * @param id - 
 * @param category - 
 */


exports.addPromotionItemURL = addPromotionItemURL;

const removePromotionItem = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/promotion/{id}/{category}/items/remove';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['item'] !== undefined) {
    body = parameters['item'];
  }

  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  path = path.replace('{category}', `${parameters['category']}`);

  if (parameters['category'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: category'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.removePromotionItem = removePromotionItem;

const removePromotionItem_RAW_URL = function () {
  return '/promotion/{id}/{category}/items/remove';
};

exports.removePromotionItem_RAW_URL = removePromotionItem_RAW_URL;

const removePromotionItem_TYPE = function () {
  return 'post';
};

exports.removePromotionItem_TYPE = removePromotionItem_TYPE;

const removePromotionItemURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/promotion/{id}/{category}/items/remove';
  path = path.replace('{id}', `${parameters['id']}`);
  path = path.replace('{category}', `${parameters['category']}`);

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
 * request: requestServiceProvisionNearby
 * url: requestServiceProvisionNearbyURL
 * method: requestServiceProvisionNearby_TYPE
 * raw_url: requestServiceProvisionNearby_RAW_URL
 * @param service - Requested service name (BathAtPetshop, Training, Dogwalker, etc.).
 * @param latitude - Geolocation latitude value.
 * @param longitude - Geolocation longitude value.
 * @param keyword - Geolocation keyword value.
 * @param radius - Maximum radius to search for (km).
 */


exports.removePromotionItemURL = removePromotionItemURL;

const requestServiceProvisionNearby = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/service-provision/request/{service}/nearby';
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

exports.requestServiceProvisionNearby = requestServiceProvisionNearby;

const requestServiceProvisionNearby_RAW_URL = function () {
  return '/service-provision/request/{service}/nearby';
};

exports.requestServiceProvisionNearby_RAW_URL = requestServiceProvisionNearby_RAW_URL;

const requestServiceProvisionNearby_TYPE = function () {
  return 'get';
};

exports.requestServiceProvisionNearby_TYPE = requestServiceProvisionNearby_TYPE;

const requestServiceProvisionNearbyURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/service-provision/request/{service}/nearby';
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
 * request: getMerchantSchedule
 * url: getMerchantScheduleURL
 * method: getMerchantSchedule_TYPE
 * raw_url: getMerchantSchedule_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


exports.requestServiceProvisionNearbyURL = requestServiceProvisionNearbyURL;

const getMerchantSchedule = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/service-provision/schedule';
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

exports.getMerchantSchedule = getMerchantSchedule;

const getMerchantSchedule_RAW_URL = function () {
  return '/service-provision/schedule';
};

exports.getMerchantSchedule_RAW_URL = getMerchantSchedule_RAW_URL;

const getMerchantSchedule_TYPE = function () {
  return 'get';
};

exports.getMerchantSchedule_TYPE = getMerchantSchedule_TYPE;

const getMerchantScheduleURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/service-provision/schedule';

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


exports.getMerchantScheduleURL = getMerchantScheduleURL;

const sendNotification = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/notification/send';
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

exports.sendNotification = sendNotification;

const sendNotification_RAW_URL = function () {
  return '/notification/send';
};

exports.sendNotification_RAW_URL = sendNotification_RAW_URL;

const sendNotification_TYPE = function () {
  return 'post';
};

exports.sendNotification_TYPE = sendNotification_TYPE;

const sendNotificationURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/notification/send';

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


exports.sendNotificationURL = sendNotificationURL;

const getNotifications = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/notification';
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

exports.getNotifications = getNotifications;

const getNotifications_RAW_URL = function () {
  return '/notification';
};

exports.getNotifications_RAW_URL = getNotifications_RAW_URL;

const getNotifications_TYPE = function () {
  return 'get';
};

exports.getNotifications_TYPE = getNotifications_TYPE;

const getNotificationsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/notification';

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


exports.getNotificationsURL = getNotificationsURL;

const getNotification = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/notification/{id}';
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

exports.getNotification = getNotification;

const getNotification_RAW_URL = function () {
  return '/notification/{id}';
};

exports.getNotification_RAW_URL = getNotification_RAW_URL;

const getNotification_TYPE = function () {
  return 'get';
};

exports.getNotification_TYPE = getNotification_TYPE;

const getNotificationURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/notification/{id}';
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


exports.getNotificationURL = getNotificationURL;

const accessWithFacebook = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/oauth/access/facebook';
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

exports.accessWithFacebook = accessWithFacebook;

const accessWithFacebook_RAW_URL = function () {
  return '/oauth/access/facebook';
};

exports.accessWithFacebook_RAW_URL = accessWithFacebook_RAW_URL;

const accessWithFacebook_TYPE = function () {
  return 'post';
};

exports.accessWithFacebook_TYPE = accessWithFacebook_TYPE;

const accessWithFacebookURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/oauth/access/facebook';

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
 * request: addBankAccount
 * url: addBankAccountURL
 * method: addBankAccount_TYPE
 * raw_url: addBankAccount_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param account - JSON representation of the account.
 */


exports.accessWithFacebookURL = accessWithFacebookURL;

const addBankAccount = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/bank-account-ref/bank-account';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['account'] !== undefined) {
    body = parameters['account'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.addBankAccount = addBankAccount;

const addBankAccount_RAW_URL = function () {
  return '/bank-account-ref/bank-account';
};

exports.addBankAccount_RAW_URL = addBankAccount_RAW_URL;

const addBankAccount_TYPE = function () {
  return 'post';
};

exports.addBankAccount_TYPE = addBankAccount_TYPE;

const addBankAccountURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/bank-account-ref/bank-account';

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
 * request: getBankAccounts
 * url: getBankAccountsURL
 * method: getBankAccounts_TYPE
 * raw_url: getBankAccounts_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


exports.addBankAccountURL = addBankAccountURL;

const getBankAccounts = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/bank-account-ref/bank-accounts';
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

exports.getBankAccounts = getBankAccounts;

const getBankAccounts_RAW_URL = function () {
  return '/bank-account-ref/bank-accounts';
};

exports.getBankAccounts_RAW_URL = getBankAccounts_RAW_URL;

const getBankAccounts_TYPE = function () {
  return 'get';
};

exports.getBankAccounts_TYPE = getBankAccounts_TYPE;

const getBankAccountsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/bank-account-ref/bank-accounts';

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
 * request: removeBankAccount
 * url: removeBankAccountURL
 * method: removeBankAccount_TYPE
 * raw_url: removeBankAccount_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 */


exports.getBankAccountsURL = getBankAccountsURL;

const removeBankAccount = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/bank-account-ref/bank-account/{id}/delete';
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

exports.removeBankAccount = removeBankAccount;

const removeBankAccount_RAW_URL = function () {
  return '/bank-account-ref/bank-account/{id}/delete';
};

exports.removeBankAccount_RAW_URL = removeBankAccount_RAW_URL;

const removeBankAccount_TYPE = function () {
  return 'post';
};

exports.removeBankAccount_TYPE = removeBankAccount_TYPE;

const removeBankAccountURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/bank-account-ref/bank-account/{id}/delete';
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
 * request: addPaymentCard
 * url: addPaymentCardURL
 * method: addPaymentCard_TYPE
 * raw_url: addPaymentCard_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param card - JSON representation of the card.
 */


exports.removeBankAccountURL = removeBankAccountURL;

const addPaymentCard = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/card-ref/card';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['card'] !== undefined) {
    body = parameters['card'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.addPaymentCard = addPaymentCard;

const addPaymentCard_RAW_URL = function () {
  return '/card-ref/card';
};

exports.addPaymentCard_RAW_URL = addPaymentCard_RAW_URL;

const addPaymentCard_TYPE = function () {
  return 'post';
};

exports.addPaymentCard_TYPE = addPaymentCard_TYPE;

const addPaymentCardURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/card-ref/card';

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
 * request: removePaymentCard
 * url: removePaymentCardURL
 * method: removePaymentCard_TYPE
 * raw_url: removePaymentCard_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 */


exports.addPaymentCardURL = addPaymentCardURL;

const removePaymentCard = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/card-ref/card/{id}/delete';
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

exports.removePaymentCard = removePaymentCard;

const removePaymentCard_RAW_URL = function () {
  return '/card-ref/card/{id}/delete';
};

exports.removePaymentCard_RAW_URL = removePaymentCard_RAW_URL;

const removePaymentCard_TYPE = function () {
  return 'post';
};

exports.removePaymentCard_TYPE = removePaymentCard_TYPE;

const removePaymentCardURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/card-ref/card/{id}/delete';
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
 * request: getPaymentCards
 * url: getPaymentCardsURL
 * method: getPaymentCards_TYPE
 * raw_url: getPaymentCards_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - 
 */


exports.removePaymentCardURL = removePaymentCardURL;

const getPaymentCards = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/card-ref/customer/{id}/cards';
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

exports.getPaymentCards = getPaymentCards;

const getPaymentCards_RAW_URL = function () {
  return '/card-ref/customer/{id}/cards';
};

exports.getPaymentCards_RAW_URL = getPaymentCards_RAW_URL;

const getPaymentCards_TYPE = function () {
  return 'get';
};

exports.getPaymentCards_TYPE = getPaymentCards_TYPE;

const getPaymentCardsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/card-ref/customer/{id}/cards';
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
 * request: createCustomerAccount
 * url: createCustomerAccountURL
 * method: createCustomerAccount_TYPE
 * raw_url: createCustomerAccount_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param user - JSON representation of the user.
 */


exports.getPaymentCardsURL = getPaymentCardsURL;

const createCustomerAccount = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/customer-ref/account/payment';
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

exports.createCustomerAccount = createCustomerAccount;

const createCustomerAccount_RAW_URL = function () {
  return '/customer-ref/account/payment';
};

exports.createCustomerAccount_RAW_URL = createCustomerAccount_RAW_URL;

const createCustomerAccount_TYPE = function () {
  return 'post';
};

exports.createCustomerAccount_TYPE = createCustomerAccount_TYPE;

const createCustomerAccountURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/customer-ref/account/payment';

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


exports.createCustomerAccountURL = createCustomerAccountURL;

const getPaymentModes = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/payment/modes';
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

exports.getPaymentModes = getPaymentModes;

const getPaymentModes_RAW_URL = function () {
  return '/payment/modes';
};

exports.getPaymentModes_RAW_URL = getPaymentModes_RAW_URL;

const getPaymentModes_TYPE = function () {
  return 'get';
};

exports.getPaymentModes_TYPE = getPaymentModes_TYPE;

const getPaymentModesURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/payment/modes';

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


exports.getPaymentModesURL = getPaymentModesURL;

const createMerchant = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/merchant-ref/account/payment';
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

exports.createMerchant = createMerchant;

const createMerchant_RAW_URL = function () {
  return '/merchant-ref/account/payment';
};

exports.createMerchant_RAW_URL = createMerchant_RAW_URL;

const createMerchant_TYPE = function () {
  return 'post';
};

exports.createMerchant_TYPE = createMerchant_TYPE;

const createMerchantURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/merchant-ref/account/payment';

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
 * request: saveSubscriptionPlan
 * url: saveSubscriptionPlanURL
 * method: saveSubscriptionPlan_TYPE
 * raw_url: saveSubscriptionPlan_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param plan - JSON representation of the plan.
 */


exports.createMerchantURL = createMerchantURL;

const saveSubscriptionPlan = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/subscription-ref/subscription/plans';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['plan'] !== undefined) {
    body = parameters['plan'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.saveSubscriptionPlan = saveSubscriptionPlan;

const saveSubscriptionPlan_RAW_URL = function () {
  return '/subscription-ref/subscription/plans';
};

exports.saveSubscriptionPlan_RAW_URL = saveSubscriptionPlan_RAW_URL;

const saveSubscriptionPlan_TYPE = function () {
  return 'post';
};

exports.saveSubscriptionPlan_TYPE = saveSubscriptionPlan_TYPE;

const saveSubscriptionPlanURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/subscription-ref/subscription/plans';

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
 * request: getSubscriptionPlans
 * url: getSubscriptionPlansURL
 * method: getSubscriptionPlans_TYPE
 * raw_url: getSubscriptionPlans_RAW_URL
 */


exports.saveSubscriptionPlanURL = saveSubscriptionPlanURL;

const getSubscriptionPlans = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/subscription-ref/subscription/plans';
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

exports.getSubscriptionPlans = getSubscriptionPlans;

const getSubscriptionPlans_RAW_URL = function () {
  return '/subscription-ref/subscription/plans';
};

exports.getSubscriptionPlans_RAW_URL = getSubscriptionPlans_RAW_URL;

const getSubscriptionPlans_TYPE = function () {
  return 'get';
};

exports.getSubscriptionPlans_TYPE = getSubscriptionPlans_TYPE;

const getSubscriptionPlansURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/subscription-ref/subscription/plans';

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
 * request: toggleSubscriptionPlan
 * url: toggleSubscriptionPlanURL
 * method: toggleSubscriptionPlan_TYPE
 * raw_url: toggleSubscriptionPlan_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param planId - 
 */


exports.getSubscriptionPlansURL = getSubscriptionPlansURL;

const toggleSubscriptionPlan = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/subscription-ref/subscription/plans/toggle/{planId}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{planId}', `${parameters['planId']}`);

  if (parameters['planId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: planId'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.toggleSubscriptionPlan = toggleSubscriptionPlan;

const toggleSubscriptionPlan_RAW_URL = function () {
  return '/subscription-ref/subscription/plans/toggle/{planId}';
};

exports.toggleSubscriptionPlan_RAW_URL = toggleSubscriptionPlan_RAW_URL;

const toggleSubscriptionPlan_TYPE = function () {
  return 'post';
};

exports.toggleSubscriptionPlan_TYPE = toggleSubscriptionPlan_TYPE;

const toggleSubscriptionPlanURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/subscription-ref/subscription/plans/toggle/{planId}';
  path = path.replace('{planId}', `${parameters['planId']}`);

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
 * request: saveSubscriptionCoupon
 * url: saveSubscriptionCouponURL
 * method: saveSubscriptionCoupon_TYPE
 * raw_url: saveSubscriptionCoupon_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param coupon - JSON representation of the coupon.
 */


exports.toggleSubscriptionPlanURL = toggleSubscriptionPlanURL;

const saveSubscriptionCoupon = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/subscription-ref/subscription/coupons';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['coupon'] !== undefined) {
    body = parameters['coupon'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.saveSubscriptionCoupon = saveSubscriptionCoupon;

const saveSubscriptionCoupon_RAW_URL = function () {
  return '/subscription-ref/subscription/coupons';
};

exports.saveSubscriptionCoupon_RAW_URL = saveSubscriptionCoupon_RAW_URL;

const saveSubscriptionCoupon_TYPE = function () {
  return 'post';
};

exports.saveSubscriptionCoupon_TYPE = saveSubscriptionCoupon_TYPE;

const saveSubscriptionCouponURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/subscription-ref/subscription/coupons';

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
 * request: getSubscriptionCoupons
 * url: getSubscriptionCouponsURL
 * method: getSubscriptionCoupons_TYPE
 * raw_url: getSubscriptionCoupons_RAW_URL
 */


exports.saveSubscriptionCouponURL = saveSubscriptionCouponURL;

const getSubscriptionCoupons = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/subscription-ref/subscription/coupons';
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

exports.getSubscriptionCoupons = getSubscriptionCoupons;

const getSubscriptionCoupons_RAW_URL = function () {
  return '/subscription-ref/subscription/coupons';
};

exports.getSubscriptionCoupons_RAW_URL = getSubscriptionCoupons_RAW_URL;

const getSubscriptionCoupons_TYPE = function () {
  return 'get';
};

exports.getSubscriptionCoupons_TYPE = getSubscriptionCoupons_TYPE;

const getSubscriptionCouponsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/subscription-ref/subscription/coupons';

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
 * request: toggleSubscriptionCoupon
 * url: toggleSubscriptionCouponURL
 * method: toggleSubscriptionCoupon_TYPE
 * raw_url: toggleSubscriptionCoupon_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param couponId - 
 */


exports.getSubscriptionCouponsURL = getSubscriptionCouponsURL;

const toggleSubscriptionCoupon = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/subscription-ref/subscription/coupons/toggle/{couponId}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  path = path.replace('{couponId}', `${parameters['couponId']}`);

  if (parameters['couponId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: couponId'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.toggleSubscriptionCoupon = toggleSubscriptionCoupon;

const toggleSubscriptionCoupon_RAW_URL = function () {
  return '/subscription-ref/subscription/coupons/toggle/{couponId}';
};

exports.toggleSubscriptionCoupon_RAW_URL = toggleSubscriptionCoupon_RAW_URL;

const toggleSubscriptionCoupon_TYPE = function () {
  return 'post';
};

exports.toggleSubscriptionCoupon_TYPE = toggleSubscriptionCoupon_TYPE;

const toggleSubscriptionCouponURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/subscription-ref/subscription/coupons/toggle/{couponId}';
  path = path.replace('{couponId}', `${parameters['couponId']}`);

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
 * request: getSubscriptionCoupon
 * url: getSubscriptionCouponURL
 * method: getSubscriptionCoupon_TYPE
 * raw_url: getSubscriptionCoupon_RAW_URL
 * @param id - 
 */


exports.toggleSubscriptionCouponURL = toggleSubscriptionCouponURL;

const getSubscriptionCoupon = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/subscription-ref/subscription/coupons/{id}';
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

exports.getSubscriptionCoupon = getSubscriptionCoupon;

const getSubscriptionCoupon_RAW_URL = function () {
  return '/subscription-ref/subscription/coupons/{id}';
};

exports.getSubscriptionCoupon_RAW_URL = getSubscriptionCoupon_RAW_URL;

const getSubscriptionCoupon_TYPE = function () {
  return 'get';
};

exports.getSubscriptionCoupon_TYPE = getSubscriptionCoupon_TYPE;

const getSubscriptionCouponURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/subscription-ref/subscription/coupons/{id}';
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
 * request: addSubscription
 * url: addSubscriptionURL
 * method: addSubscription_TYPE
 * raw_url: addSubscription_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param subscription - JSON representation of the subscription.
 */


exports.getSubscriptionCouponURL = getSubscriptionCouponURL;

const addSubscription = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/subscription-ref/subscription';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['subscription'] !== undefined) {
    body = parameters['subscription'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.addSubscription = addSubscription;

const addSubscription_RAW_URL = function () {
  return '/subscription-ref/subscription';
};

exports.addSubscription_RAW_URL = addSubscription_RAW_URL;

const addSubscription_TYPE = function () {
  return 'post';
};

exports.addSubscription_TYPE = addSubscription_TYPE;

const addSubscriptionURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/subscription-ref/subscription';

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
 * request: cancelSubscription
 * url: cancelSubscriptionURL
 * method: cancelSubscription_TYPE
 * raw_url: cancelSubscription_RAW_URL
 * @param id - 
 */


exports.addSubscriptionURL = addSubscriptionURL;

const cancelSubscription = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/subscription-ref/subscription/{id}/delete';
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

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.cancelSubscription = cancelSubscription;

const cancelSubscription_RAW_URL = function () {
  return '/subscription-ref/subscription/{id}/delete';
};

exports.cancelSubscription_RAW_URL = cancelSubscription_RAW_URL;

const cancelSubscription_TYPE = function () {
  return 'post';
};

exports.cancelSubscription_TYPE = cancelSubscription_TYPE;

const cancelSubscriptionURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/subscription-ref/subscription/{id}/delete';
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
 * request: getAvailabeWithdrawal
 * url: getAvailabeWithdrawalURL
 * method: getAvailabeWithdrawal_TYPE
 * raw_url: getAvailabeWithdrawal_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


exports.cancelSubscriptionURL = cancelSubscriptionURL;

const getAvailabeWithdrawal = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/transfers-ref/withdrawal/available';
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

exports.getAvailabeWithdrawal = getAvailabeWithdrawal;

const getAvailabeWithdrawal_RAW_URL = function () {
  return '/transfers-ref/withdrawal/available';
};

exports.getAvailabeWithdrawal_RAW_URL = getAvailabeWithdrawal_RAW_URL;

const getAvailabeWithdrawal_TYPE = function () {
  return 'get';
};

exports.getAvailabeWithdrawal_TYPE = getAvailabeWithdrawal_TYPE;

const getAvailabeWithdrawalURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/transfers-ref/withdrawal/available';

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
 * request: transferWithdrawal
 * url: transferWithdrawalURL
 * method: transferWithdrawal_TYPE
 * raw_url: transferWithdrawal_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param account - JSON representation of the account.
 * @param amount - 
 */


exports.getAvailabeWithdrawalURL = getAvailabeWithdrawalURL;

const transferWithdrawal = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/transfers-ref/withdrawal/transfer/{amount}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['account'] !== undefined) {
    body = parameters['account'];
  }

  path = path.replace('{amount}', `${parameters['amount']}`);

  if (parameters['amount'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: amount'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.transferWithdrawal = transferWithdrawal;

const transferWithdrawal_RAW_URL = function () {
  return '/transfers-ref/withdrawal/transfer/{amount}';
};

exports.transferWithdrawal_RAW_URL = transferWithdrawal_RAW_URL;

const transferWithdrawal_TYPE = function () {
  return 'post';
};

exports.transferWithdrawal_TYPE = transferWithdrawal_TYPE;

const transferWithdrawalURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/transfers-ref/withdrawal/transfer/{amount}';
  path = path.replace('{amount}', `${parameters['amount']}`);

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
 * request: getPetsByUser
 * url: getPetsByUserURL
 * method: getPetsByUser_TYPE
 * raw_url: getPetsByUser_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


exports.transferWithdrawalURL = transferWithdrawalURL;

const getPetsByUser = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/pet/by-user';
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

exports.getPetsByUser = getPetsByUser;

const getPetsByUser_RAW_URL = function () {
  return '/pet/by-user';
};

exports.getPetsByUser_RAW_URL = getPetsByUser_RAW_URL;

const getPetsByUser_TYPE = function () {
  return 'get';
};

exports.getPetsByUser_TYPE = getPetsByUser_TYPE;

const getPetsByUserURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/pet/by-user';

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
 * request: getPetsByONG
 * url: getPetsByONGURL
 * method: getPetsByONG_TYPE
 * raw_url: getPetsByONG_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param page - Number of pages to skip.
 * @param pageSize - Size of documents on one page.
 * @param status - 
 */


exports.getPetsByUserURL = getPetsByUserURL;

const getPetsByONG = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/pet/by-ong/{status}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
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

  path = path.replace('{status}', `${parameters['status']}`);

  if (parameters['status'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: status'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getPetsByONG = getPetsByONG;

const getPetsByONG_RAW_URL = function () {
  return '/pet/by-ong/{status}';
};

exports.getPetsByONG_RAW_URL = getPetsByONG_RAW_URL;

const getPetsByONG_TYPE = function () {
  return 'get';
};

exports.getPetsByONG_TYPE = getPetsByONG_TYPE;

const getPetsByONGURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/pet/by-ong/{status}';

  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page'];
  }

  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize'];
  }

  path = path.replace('{status}', `${parameters['status']}`);

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
 * request: getPetsByStatus
 * url: getPetsByStatusURL
 * method: getPetsByStatus_TYPE
 * raw_url: getPetsByStatus_RAW_URL
 * @param latitude - Geolocation latitude value.
 * @param longitude - Geolocation longitude value.
 * @param radius - Maximum radius to search for (km).
 * @param page - Number of pages to skip.
 * @param pageSize - Size of documents on one page.
 * @param status - 
 */


exports.getPetsByONGURL = getPetsByONGURL;

const getPetsByStatus = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/pet/by-status/{status}';
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

  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page'];
  }

  if (parameters['page'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: page'));
  }

  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize'];
  }

  path = path.replace('{status}', `${parameters['status']}`);

  if (parameters['status'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: status'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getPetsByStatus = getPetsByStatus;

const getPetsByStatus_RAW_URL = function () {
  return '/pet/by-status/{status}';
};

exports.getPetsByStatus_RAW_URL = getPetsByStatus_RAW_URL;

const getPetsByStatus_TYPE = function () {
  return 'get';
};

exports.getPetsByStatus_TYPE = getPetsByStatus_TYPE;

const getPetsByStatusURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/pet/by-status/{status}';

  if (parameters['latitude'] !== undefined) {
    queryParameters['latitude'] = parameters['latitude'];
  }

  if (parameters['longitude'] !== undefined) {
    queryParameters['longitude'] = parameters['longitude'];
  }

  if (parameters['radius'] !== undefined) {
    queryParameters['radius'] = parameters['radius'];
  }

  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page'];
  }

  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize'];
  }

  path = path.replace('{status}', `${parameters['status']}`);

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
 * request: addPetToUser
 * url: addPetToUserURL
 * method: addPetToUser_TYPE
 * raw_url: addPetToUser_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param pet - JSON representation of the pet.
 */


exports.getPetsByStatusURL = getPetsByStatusURL;

const addPetToUser = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/pet/add';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['pet'] !== undefined) {
    body = parameters['pet'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.addPetToUser = addPetToUser;

const addPetToUser_RAW_URL = function () {
  return '/pet/add';
};

exports.addPetToUser_RAW_URL = addPetToUser_RAW_URL;

const addPetToUser_TYPE = function () {
  return 'post';
};

exports.addPetToUser_TYPE = addPetToUser_TYPE;

const addPetToUserURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/pet/add';

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
 * request: removePetFromUser
 * url: removePetFromUserURL
 * method: removePetFromUser_TYPE
 * raw_url: removePetFromUser_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param pet - JSON representation of the pet.
 */


exports.addPetToUserURL = addPetToUserURL;

const removePetFromUser = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/pet/remove';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['pet'] !== undefined) {
    body = parameters['pet'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.removePetFromUser = removePetFromUser;

const removePetFromUser_RAW_URL = function () {
  return '/pet/remove';
};

exports.removePetFromUser_RAW_URL = removePetFromUser_RAW_URL;

const removePetFromUser_TYPE = function () {
  return 'post';
};

exports.removePetFromUser_TYPE = removePetFromUser_TYPE;

const removePetFromUserURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/pet/remove';

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
 * request: savePet
 * url: savePetURL
 * method: savePet_TYPE
 * raw_url: savePet_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param pet - JSON representation of the pet.
 * @param status - 
 */


exports.removePetFromUserURL = removePetFromUserURL;

const savePet = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/pet/save/{status}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['pet'] !== undefined) {
    body = parameters['pet'];
  }

  path = path.replace('{status}', `${parameters['status']}`);

  if (parameters['status'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: status'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.savePet = savePet;

const savePet_RAW_URL = function () {
  return '/pet/save/{status}';
};

exports.savePet_RAW_URL = savePet_RAW_URL;

const savePet_TYPE = function () {
  return 'post';
};

exports.savePet_TYPE = savePet_TYPE;

const savePetURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/pet/save/{status}';
  path = path.replace('{status}', `${parameters['status']}`);

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
 * request: removePet
 * url: removePetURL
 * method: removePet_TYPE
 * raw_url: removePet_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id - _id of the user to return the pet related
 */


exports.savePetURL = savePetURL;

const removePet = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/pet/remove/{id}';
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

exports.removePet = removePet;

const removePet_RAW_URL = function () {
  return '/pet/remove/{id}';
};

exports.removePet_RAW_URL = removePet_RAW_URL;

const removePet_TYPE = function () {
  return 'post';
};

exports.removePet_TYPE = removePet_TYPE;

const removePetURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/pet/remove/{id}';
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
 * request: addCommentToPet
 * url: addCommentToPetURL
 * method: addCommentToPet_TYPE
 * raw_url: addCommentToPet_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param comment - JSON representation of the comment.
 * @param id - 
 */


exports.removePetURL = removePetURL;

const addCommentToPet = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/pet/comments/add/{id}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['comment'] !== undefined) {
    body = parameters['comment'];
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

exports.addCommentToPet = addCommentToPet;

const addCommentToPet_RAW_URL = function () {
  return '/pet/comments/add/{id}';
};

exports.addCommentToPet_RAW_URL = addCommentToPet_RAW_URL;

const addCommentToPet_TYPE = function () {
  return 'post';
};

exports.addCommentToPet_TYPE = addCommentToPet_TYPE;

const addCommentToPetURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/pet/comments/add/{id}';
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
 * request: removeCommentFromPet
 * url: removeCommentFromPetURL
 * method: removeCommentFromPet_TYPE
 * raw_url: removeCommentFromPet_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param comment - JSON representation of the comment.
 * @param id - 
 */


exports.addCommentToPetURL = addCommentToPetURL;

const removeCommentFromPet = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/pet/comments/remove/{id}';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters['comment'] !== undefined) {
    body = parameters['comment'];
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

exports.removeCommentFromPet = removeCommentFromPet;

const removeCommentFromPet_RAW_URL = function () {
  return '/pet/comments/remove/{id}';
};

exports.removeCommentFromPet_RAW_URL = removeCommentFromPet_RAW_URL;

const removeCommentFromPet_TYPE = function () {
  return 'post';
};

exports.removeCommentFromPet_TYPE = removeCommentFromPet_TYPE;

const removeCommentFromPetURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/pet/comments/remove/{id}';
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
 * request: getPet
 * url: getPetURL
 * method: getPet_TYPE
 * raw_url: getPet_RAW_URL
 * @param id - _id of the pet
 */


exports.removeCommentFromPetURL = removeCommentFromPetURL;

const getPet = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/pet/{id}';
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

exports.getPet = getPet;

const getPet_RAW_URL = function () {
  return '/pet/{id}';
};

exports.getPet_RAW_URL = getPet_RAW_URL;

const getPet_TYPE = function () {
  return 'get';
};

exports.getPet_TYPE = getPet_TYPE;

const getPetURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/pet/{id}';
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
 * request: addPicture
 * url: addPictureURL
 * method: addPicture_TYPE
 * raw_url: addPicture_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param files - path of the file to update
 */


exports.getPetURL = getPetURL;

const addPicture = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/picture/save';
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

exports.addPicture = addPicture;

const addPicture_RAW_URL = function () {
  return '/picture/save';
};

exports.addPicture_RAW_URL = addPicture_RAW_URL;

const addPicture_TYPE = function () {
  return 'post';
};

exports.addPicture_TYPE = addPicture_TYPE;

const addPictureURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/picture/save';

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


exports.addPictureURL = addPictureURL;

const getPicture = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/picture/{id}';
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

exports.getPicture = getPicture;

const getPicture_RAW_URL = function () {
  return '/picture/{id}';
};

exports.getPicture_RAW_URL = getPicture_RAW_URL;

const getPicture_TYPE = function () {
  return 'get';
};

exports.getPicture_TYPE = getPicture_TYPE;

const getPictureURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/picture/{id}';
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


exports.getPictureURL = getPictureURL;

const getLatest = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/picture/{itemId}';
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

exports.getLatest = getLatest;

const getLatest_RAW_URL = function () {
  return '/picture/{itemId}';
};

exports.getLatest_RAW_URL = getLatest_RAW_URL;

const getLatest_TYPE = function () {
  return 'get';
};

exports.getLatest_TYPE = getLatest_TYPE;

const getLatestURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/picture/{itemId}';
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


exports.getLatestURL = getLatestURL;

const removePicture = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/picture/remove/{id}';
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

exports.removePicture = removePicture;

const removePicture_RAW_URL = function () {
  return '/picture/remove/{id}';
};

exports.removePicture_RAW_URL = removePicture_RAW_URL;

const removePicture_TYPE = function () {
  return 'post';
};

exports.removePicture_TYPE = removePicture_TYPE;

const removePictureURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/picture/remove/{id}';
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


exports.removePictureURL = removePictureURL;

const createUser = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/user/create';
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

exports.createUser = createUser;

const createUser_RAW_URL = function () {
  return '/user/create';
};

exports.createUser_RAW_URL = createUser_RAW_URL;

const createUser_TYPE = function () {
  return 'post';
};

exports.createUser_TYPE = createUser_TYPE;

const createUserURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/user/create';

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


exports.createUserURL = createUserURL;

const isUniqueUsername = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/user/username/exists/{username}';
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

exports.isUniqueUsername = isUniqueUsername;

const isUniqueUsername_RAW_URL = function () {
  return '/user/username/exists/{username}';
};

exports.isUniqueUsername_RAW_URL = isUniqueUsername_RAW_URL;

const isUniqueUsername_TYPE = function () {
  return 'get';
};

exports.isUniqueUsername_TYPE = isUniqueUsername_TYPE;

const isUniqueUsernameURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/user/username/exists/{username}';
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


exports.isUniqueUsernameURL = isUniqueUsernameURL;

const getUserProfile = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/user/profile';
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

exports.getUserProfile = getUserProfile;

const getUserProfile_RAW_URL = function () {
  return '/user/profile';
};

exports.getUserProfile_RAW_URL = getUserProfile_RAW_URL;

const getUserProfile_TYPE = function () {
  return 'get';
};

exports.getUserProfile_TYPE = getUserProfile_TYPE;

const getUserProfileURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/user/profile';

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


exports.getUserProfileURL = getUserProfileURL;

const authenticateUser = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/user/authenticate';
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

exports.authenticateUser = authenticateUser;

const authenticateUser_RAW_URL = function () {
  return '/user/authenticate';
};

exports.authenticateUser_RAW_URL = authenticateUser_RAW_URL;

const authenticateUser_TYPE = function () {
  return 'post';
};

exports.authenticateUser_TYPE = authenticateUser_TYPE;

const authenticateUserURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/user/authenticate';

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


exports.authenticateUserURL = authenticateUserURL;

const updateUser = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/user/update';
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

exports.updateUser = updateUser;

const updateUser_RAW_URL = function () {
  return '/user/update';
};

exports.updateUser_RAW_URL = updateUser_RAW_URL;

const updateUser_TYPE = function () {
  return 'post';
};

exports.updateUser_TYPE = updateUser_TYPE;

const updateUserURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/user/update';

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


exports.updateUserURL = updateUserURL;

const recoverPassword = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/user/password/recover/{email}';
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

exports.recoverPassword = recoverPassword;

const recoverPassword_RAW_URL = function () {
  return '/user/password/recover/{email}';
};

exports.recoverPassword_RAW_URL = recoverPassword_RAW_URL;

const recoverPassword_TYPE = function () {
  return 'post';
};

exports.recoverPassword_TYPE = recoverPassword_TYPE;

const recoverPasswordURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/user/password/recover/{email}';
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


exports.recoverPasswordURL = recoverPasswordURL;

const updatePassword = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/user/password/update';
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

exports.updatePassword = updatePassword;

const updatePassword_RAW_URL = function () {
  return '/user/password/update';
};

exports.updatePassword_RAW_URL = updatePassword_RAW_URL;

const updatePassword_TYPE = function () {
  return 'post';
};

exports.updatePassword_TYPE = updatePassword_TYPE;

const updatePasswordURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/user/password/update';

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


exports.updatePasswordURL = updatePasswordURL;

const addSkip = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/user/skips/{skip}';
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

exports.addSkip = addSkip;

const addSkip_RAW_URL = function () {
  return '/user/skips/{skip}';
};

exports.addSkip_RAW_URL = addSkip_RAW_URL;

const addSkip_TYPE = function () {
  return 'post';
};

exports.addSkip_TYPE = addSkip_TYPE;

const addSkipURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/user/skips/{skip}';
  path = path.replace('{skip}', `${parameters['skip']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};

exports.addSkipURL = addSkipURL;