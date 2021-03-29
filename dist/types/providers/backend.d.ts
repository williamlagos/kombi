declare class Backend {
    static backendDomain: string;
    static getDomain(): string;
    static setDomain($domain: any): void;
    static request(method: any, url: string, body: any, queryParameters: any, form: any, config: any): Promise<Response>;
    static multipartRequest(method: any, url: string, form: any, config: any): Promise<Response>;
    /**
     * request: getUsersAsAdmin
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param role - Desired role.
     * @param keyword - Filtering keyword.
     * @param page - Number of pages to skip.
     * @param pageSize - Size of documents on one page.
     */
    static getUsersAsAdmin(parameters?: any): Promise<Response>;
    /**
     * request: deactivateUserAsAdmin
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param id -
     */
    static deactivateUserAsAdmin(parameters?: any): Promise<Response>;
    /**
     * request: activateUserAsAdmin
     * url: activateUserAsAdminURL
     * method: activateUserAsAdmin_TYPE
     * raw_url: activateUserAsAdmin_RAW_URL
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param id -
     */
    static activateUserAsAdmin(parameters?: any): Promise<Response>;
    /**
     * request: changeUserRole
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param id -
     * @param role -
     */
    static changeUserRole(parameters?: any): Promise<Response>;
    /**
     * request: getChats
     * @param xAccessToken - JWT created on user creation or authentication.
     */
    static getChats(parameters?: any): Promise<Response>;
    /**
     * request: getChat
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param chat -
     */
    static getChat(parameters?: any): Promise<Response>;
    /**
     * request: addLead
     * @param lead - JSON representation of the lead.
     */
    static addLead(parameters?: any): Promise<Response>;
    /**
     * request: getLeads
     * @param xAccessToken - JWT created on user creation or authentication.
     */
    static getLeads(parameters?: any): Promise<Response>;
    /**
     * request: getLead
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param id -
     */
    static getLead(parameters?: any): Promise<Response>;
    /**
     * request: placeBid
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param bid - JSON representation of the bid.
     * @param order -
     */
    static placeBid(parameters?: any): Promise<Response>;
    /**
     * request: placeFinalBid
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param bid - JSON representation of the bid.
     * @param order -
     */
    static placeFinalBid(parameters?: any): Promise<Response>;
    /**
     * request: getOrderBids
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param order -
     */
    static getOrderBids(parameters?: any): Promise<Response>;
    /**
     * request: removeFavoriteMerchant
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param merchant -
     */
    static removeFavoriteMerchant(parameters?: any): Promise<Response>;
    /**
     * request: getFavoritesList
     * @param xAccessToken - JWT created on user creation or authentication.
     */
    static getFavoritesList(parameters?: any): Promise<Response>;
    /**
     * request: getMerchantById
     * @param id -
     */
    static getMerchantById(parameters?: any): Promise<Response>;
    /**
     * request: getMerchantByUsername
     * @param username -
     */
    static getMerchantByUsername(parameters?: any): Promise<Response>;
    /**
     * request: createMerchant
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param user - JSON representation of the user.
     */
    static createMerchant(parameters?: any): Promise<Response>;
    /**
     * request: getNearbyMerchants
     * @param latitude - Geolocation latitude value.
     * @param longitude - Geolocation longitude value.
     * @param radius - Maximum radius to search for (km).
     * @param keyword - Geolocation keyword value.
     */
    static getNearbyMerchants(parameters?: any): Promise<Response>;
    /**
     * request: getNearbyMerchantsByService
     * @param service - Requested service name.
     * @param latitude - Geolocation latitude value.
     * @param longitude - Geolocation longitude value.
     * @param keyword - Geolocation keyword value.
     * @param radius - Maximum radius to search for (km).
     */
    static getNearbyMerchantsByService(parameters?: any): Promise<Response>;
    /**
     * request: createOrder
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param order - JSON representation of the order to be created.
     */
    static createOrder(parameters?: any): Promise<Response>;
    /**
     * request: getOrders
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param status - Filtering status.
     */
    static getOrders(parameters?: any): Promise<Response>;
    /**
     * request: getReadyOrders
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param status - Filtering status.
     */
    static getReadyOrders(parameters?: any): Promise<Response>;
    /**
     * request: getOrdersByPeriod
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param status - Filtering status.
     * @param startDate - Filtering start date.
     * @param endDate - Filtering end date.
     */
    static getOrdersByPeriod(parameters?: any): Promise<Response>;
    /**
     * request: getOrder
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param id -
     */
    static getOrder(parameters?: any): Promise<Response>;
    /**
     * request: acceptOrder
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param id -
     */
    static acceptOrder(parameters?: any): Promise<Response>;
    /**
     * request: cancelOrder
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param id -
     */
    static cancelOrder(parameters?: any): Promise<Response>;
    /**
     * request: finishOrder
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param id -
     */
    static finishOrder(parameters?: any): Promise<Response>;
    /**
     * request: rateOrder
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param id -
     * @param rate -
     */
    static rateOrder(parameters?: any): Promise<Response>;
    /**
     * request: getReceivingModes
     * url: getReceivingModesURL
     * method: getReceivingModes_TYPE
     * raw_url: getReceivingModes_RAW_URL
     */
    static getReceivingModes(parameters?: any): Promise<Response>;
    /**
     * request: getPaymentModes
     * url: getPaymentModesURL
     * method: getPaymentModes_TYPE
     * raw_url: getPaymentModes_RAW_URL
     */
    static getPaymentModes(parameters?: any): Promise<Response>;
    /**
     * request: getOrdersNearby
     * @param latitude - Geolocation latitude value.
     * @param longitude - Geolocation longitude value.
     * @param radius - Maximum radius to search for (km).
     * @param keyword - Geolocation keyword value.
     * @param page - Number of pages to skip.
     * @param pageSize - Size of documents on one page.
     */
    static getOrdersNearby(parameters?: any): Promise<Response>;
    /**
     * request: setOrderMerchant
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param id -
     * @param merchant -
     */
    static setOrderMerchant(parameters?: any): Promise<Response>;
    /**
     * request: startOrder
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param id -
     */
    static startOrder(parameters?: any): Promise<Response>;
    /**
     * request: sendNotification
     * @param xAccessToken - JWT created on user creation or authentication.
     */
    static sendNotification(parameters?: any): Promise<Response>;
    /**
     * request: getNotifications
     * @param xAccessToken - JWT created on user creation or authentication.
     */
    static getNotifications(parameters?: any): Promise<Response>;
    /**
     * request: getNotification
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param id -
     */
    static getNotification(parameters?: any): Promise<Response>;
    /**
     * request: accessWithFacebook
     * @param accessToken - User access token returned from Facebook oauth.
     */
    static accessWithFacebook(parameters?: any): Promise<Response>;
    /**
     * Send images to system.
     * @param multipart - Image to upload
     */
    static addPicture(parameters?: any): Promise<Response>;
    /**
     * request: getPicture
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param id -
     */
    static getPicture(parameters?: any): Promise<Response>;
    /**
     * request: getPictures
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param ids - list of ids
     */
    static getPictures(parameters?: any): Promise<Response>;
    /**
     * request: getLatest
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param itemId -
     */
    static getLatest(parameters?: any): Promise<Response>;
    /**
     * request: removePicture
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param id -
     */
    static removePicture(parameters?: any): Promise<Response>;
    /**
     * Creates an element with user data.
     * @param user - User credentials object.
     */
    static createUser(parameters?: any): Promise<Response>;
    /**
     * request: isUniqueUsername
     * @param username -
     */
    static isUniqueUsername(parameters?: any): Promise<Response>;
    /**
     * request: getUserProfile
     * @param xAccessToken - JWT created on user creation or authentication.
     */
    static getUserProfile(parameters?: any): Promise<Response>;
    /**
     * Authenticates an user with e-mail and password.
     * @param user - User credentials object.
     */
    static authenticateUser(parameters?: any): Promise<Response>;
    static updateUser(parameters?: any): Promise<Response>;
    /**
     * request: recoverPassword
     * @param email -
     */
    static recoverPassword(parameters?: any): Promise<Response>;
    /**
     * request: updatePassword
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param user - User credentials object.
     */
    static updatePassword(parameters?: any): Promise<Response>;
    /**
     * request: addSkip
     * @param xAccessToken - JWT created on user creation or authentication.
     * @param skip - User step in order to skip.
     */
    static addSkip(parameters?: any): Promise<Response>;
}
export { Backend };
