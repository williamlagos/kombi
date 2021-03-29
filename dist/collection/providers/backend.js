import _qs from 'qs';
class Backend {
    static getDomain() {
        return Backend.backendDomain;
    }
    static setDomain($domain) {
        Backend.backendDomain = $domain;
    }
    static request(method, url, body, queryParameters, form, config) {
        method = method.toUpperCase();
        const keys = Object.keys(queryParameters);
        let queryUrl = url;
        if (keys.length > 0) {
            queryUrl = url + '?' + _qs.stringify(queryParameters);
        }
        config.method = method;
        config.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': config.headers['x-access-token']
        };
        if (method !== 'GET') {
            if (body) {
                config.body = JSON.stringify(body);
            }
            else if (form) {
                config.body = _qs.stringify(form);
            }
        }
        return fetch(queryUrl, config);
    }
    static multipartRequest(method, url, form, config) {
        const formData = new FormData();
        const files = form['files'];
        for (let i = 0; i < files.length; i++) {
            formData.append('files[]', files[i]);
        }
        const options = {
            method,
            headers: {
                'x-access-token': config.headers['x-access-token']
            },
            body: formData
        };
        return fetch(url, options);
    }
    static getUsersAsAdmin(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/admin/users';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static deactivateUserAsAdmin(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/admin/users/{id}';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static activateUserAsAdmin(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/admin/users/{id}/activate';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static changeUserRole(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/admin/users/{id}/role/{role}';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static getChats(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/chat/chats';
        const body = {};
        const queryParameters = {};
        const form = {};
        if (parameters['xAccessToken'] !== undefined) {
            config.headers['x-access-token'] = parameters['xAccessToken'];
        }
        if (parameters['xAccessToken'] === undefined) {
            return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
        }
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static getChat(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/chat/{chat}';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static addLead(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/lead';
        let body = {};
        const queryParameters = {};
        const form = {};
        if (parameters['lead'] !== undefined) {
            body = parameters['lead'];
        }
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static getLeads(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/lead';
        const body = {};
        const queryParameters = {};
        const form = {};
        if (parameters['xAccessToken'] !== undefined) {
            config.headers['x-access-token'] = parameters['xAccessToken'];
        }
        if (parameters['xAccessToken'] === undefined) {
            return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
        }
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static getLead(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/lead/{id}';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static placeBid(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/bid/{order}/place';
        let body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static placeFinalBid(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/bid/{order}/final';
        let body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static getOrderBids(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/bid/by-order/{order}';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static removeFavoriteMerchant(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/customer/favorites/merchant/{merchant}';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static getFavoritesList(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/customer/favorites/merchants';
        const body = {};
        const queryParameters = {};
        const form = {};
        if (parameters['xAccessToken'] !== undefined) {
            config.headers['x-access-token'] = parameters['xAccessToken'];
        }
        if (parameters['xAccessToken'] === undefined) {
            return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
        }
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static getMerchantById(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/merchant/{id}/details';
        const body = {};
        const queryParameters = {};
        const form = {};
        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['id'] === undefined) {
            return Promise.reject(new Error('Missing required  parameter: id'));
        }
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static getMerchantByUsername(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/merchant/by-username/{username}';
        const body = {};
        const queryParameters = {};
        const form = {};
        path = path.replace('{username}', `${parameters['username']}`);
        if (parameters['username'] === undefined) {
            return Promise.reject(new Error('Missing required  parameter: username'));
        }
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static createMerchant(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/merchant/account/payment';
        let body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static getNearbyMerchants(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/merchant/nearby';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static getNearbyMerchantsByService(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/merchant/nearby/{service}';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static createOrder(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/order';
        let body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static getOrders(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/order';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static getReadyOrders(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/order/ready';
        const body = {};
        const queryParameters = {};
        const form = {};
        if (parameters['xAccessToken'] !== undefined) {
            config.headers['x-access-token'] = parameters['xAccessToken'];
        }
        if (parameters['xAccessToken'] === undefined) {
            return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
        }
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static getOrdersByPeriod(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/order/between-dates';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static getOrder(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/order/{id}';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static acceptOrder(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/order/{id}/accept';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static cancelOrder(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/order/{id}/cancel';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static finishOrder(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/order/{id}/finish';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static rateOrder(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/order/{id}/rate/{rate}';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static getReceivingModes(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/order/receiving-modes';
        const body = {};
        const queryParameters = {};
        const form = {};
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static getPaymentModes(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/order/payment-modes/list';
        const body = {};
        const queryParameters = {};
        const form = {};
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static getOrdersNearby(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/order/by-location/nearby';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static setOrderMerchant(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/order/{id}/merchant/{merchant}';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static startOrder(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/order/{id}/start';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static sendNotification(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/notification/send';
        const body = {};
        const queryParameters = {};
        const form = {};
        if (parameters['xAccessToken'] !== undefined) {
            config.headers['x-access-token'] = parameters['xAccessToken'];
        }
        if (parameters['xAccessToken'] === undefined) {
            return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
        }
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static getNotifications(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/notification';
        const body = {};
        const queryParameters = {};
        const form = {};
        if (parameters['xAccessToken'] !== undefined) {
            config.headers['x-access-token'] = parameters['xAccessToken'];
        }
        if (parameters['xAccessToken'] === undefined) {
            return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
        }
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static getNotification(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/notification/{id}';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static accessWithFacebook(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/oauth/access/facebook';
        const body = {};
        const queryParameters = {};
        const form = {};
        if (parameters['accessToken'] !== undefined) {
            queryParameters['access_token'] = parameters['accessToken'];
        }
        if (parameters['accessToken'] === undefined) {
            return Promise.reject(new Error('Missing required  parameter: accessToken'));
        }
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static addPicture(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/picture/save';
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.multipartRequest('POST', domain + path, form, config);
    }
    static getPicture(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/picture/{id}';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static getPictures(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/picture/multiple';
        const body = {};
        let queryParameters = {};
        const form = {};
        if (parameters['xAccessToken'] !== undefined) {
            config.headers['x-access-token'] = parameters['xAccessToken'];
        }
        if (parameters['xAccessToken'] === undefined) {
            return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
        }
        if (parameters['ids'] === undefined) {
            return Promise.reject(new Error('Missing required  parameter: id'));
        }
        queryParameters = { ids: String(parameters['ids']) };
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static getLatest(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/picture/{itemId}';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static removePicture(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/picture/remove/{id}';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static createUser(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/user/create';
        let body = {};
        const queryParameters = {};
        const form = {};
        if (parameters['user'] !== undefined) {
            body = parameters['user'];
        }
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static isUniqueUsername(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/user/username/exists/{username}';
        const body = {};
        const queryParameters = {};
        const form = {};
        path = path.replace('{username}', `${parameters['username']}`);
        if (parameters['username'] === undefined) {
            return Promise.reject(new Error('Missing required  parameter: username'));
        }
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static getUserProfile(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/user/profile';
        const body = {};
        const queryParameters = {};
        const form = {};
        if (parameters['xAccessToken'] !== undefined) {
            config.headers['x-access-token'] = parameters['xAccessToken'];
        }
        if (parameters['xAccessToken'] === undefined) {
            return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
        }
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('get', domain + path, body, queryParameters, form, config);
    }
    static authenticateUser(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/user/authenticate';
        let body = {};
        const queryParameters = {};
        const form = {};
        if (parameters['user'] !== undefined) {
            body = parameters['user'];
        }
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static updateUser(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/user/update';
        let body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static recoverPassword(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/user/password/recover/{email}';
        const body = {};
        const queryParameters = {};
        const form = {};
        path = path.replace('{email}', `${parameters['email']}`);
        if (parameters['email'] === undefined) {
            return Promise.reject(new Error('Missing required  parameter: email'));
        }
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static updatePassword(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        const path = '/user/password/update';
        let body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
    static addSkip(parameters = {}) {
        const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
        const config = parameters.$config || {
            headers: {}
        };
        let path = '/user/skips/{skip}';
        const body = {};
        const queryParameters = {};
        const form = {};
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
            Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        return Backend.request('post', domain + path, body, queryParameters, form, config);
    }
}
Backend.backendDomain = '';
export { Backend };
