import { h } from '../clipper.core.js';

var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    var obj;

    while (queue.length) {
        var item = queue.pop();
        obj = item.obj[item.prop];

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }

    return obj;
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

var encode = function encode(str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    return compactQueue(queue);
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var utils = {
    arrayToObject: arrayToObject,
    assign: assign,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};

var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var formats = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

var stringify_1 = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats['default'];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};

var has$1 = Object.prototype.hasOwnProperty;

var defaults$1 = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults$1.decoder);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults$1.decoder);
            val = options.decoder(part.slice(pos + 1), defaults$1.decoder);
        }
        if (has$1.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]') {
            obj = [];
            obj = obj.concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has$1.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has$1.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

var parse = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults$1.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults$1.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults$1.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults$1.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults$1.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults$1.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults$1.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults$1.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults$1.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};

var lib = {
    formats: formats,
    parse: parse,
    stringify: stringify_1
};

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
            queryUrl = url + '?' + lib.stringify(queryParameters);
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
                config.body = lib.stringify(form);
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

var TypeKeys;
(function (TypeKeys) {
    TypeKeys["NULL"] = "NULL";
    TypeKeys["OPEN"] = "OPEN";
    TypeKeys["CLOSE"] = "CLOSE";
    TypeKeys["ERROR"] = "ERROR";
    TypeKeys["SET_TOKEN"] = "SET_TOKEN";
    TypeKeys["REVOKE_TOKEN"] = "REVOKE_TOKEN";
    TypeKeys["SKIP_INTRO"] = "SKIP_INTRO";
    TypeKeys["SKIP_TOUR"] = "SKIP_TOUR";
    TypeKeys["OPEN_REGISTER"] = "OPEN_REGISTER";
    TypeKeys["CLOSE_REGISTER"] = "CLOSE_REGISTER";
    TypeKeys["REGISTER_ORDER"] = "REGISTER_ORDER";
    TypeKeys["SELECT_ORDER"] = "SELECT_ORDER";
    TypeKeys["SHOW_ORDER"] = "SHOW_ORDER";
    TypeKeys["PLACE_ORDER"] = "PLACE_ORDER";
    TypeKeys["MY_ORDERS"] = "MY_ORDERS";
    TypeKeys["ORDER_BIDS"] = "ORDER_BIDS";
    TypeKeys["ORDER_MERCHANT"] = "ORDER_MERCHANT";
    TypeKeys["MERCHANT_ORDERS"] = "MERCHANT_ORDERS";
    TypeKeys["START_ORDER"] = "START_ORDER";
    TypeKeys["CANCEL_ORDER"] = "CANCEL_ORDER";
    TypeKeys["FINISH_ORDER"] = "FINISH_ORDER";
    TypeKeys["RATE_ORDER"] = "RATE_ORDER";
    TypeKeys["OPEN_PROFILE"] = "OPEN_PROFILE";
    TypeKeys["UPDATE_PROFILE"] = "UPDATE_PROFILE";
})(TypeKeys || (TypeKeys = {}));

export { Backend as a, TypeKeys as b };
