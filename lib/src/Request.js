var _ = require('lodash');
var request = require('request');
var querystring = require('querystring');
var Exception = require('./Exception');

class VoodooRequest {

    constructor() { }

    urlJoin() {
        let str = [].slice.call(arguments).join('/');

        str = str.replace(/:\//g, '://');

        // remove consecutive slashes
        str = str.replace(/([^:\s])\/+/g, '$1/');

        // remove trailing slash before parameters or hash
        str = str.replace(/\/(\?|&|#[^!])/g, '$1');

        // replace ? in parameters with &
        str = str.replace(/(\?.+)\?/g, '$1&');
        return str;
    }

    getUriBase() {
        const URI = 'www.voodoosms.com/vapi/server/';
        return `https://${URI}`;
    }

    buildQuery (args) {
        return _.isObject(args) && !_.isEmpty(args) ? `?${querystring.stringify(args)}` : '';
    }

    getUrl(method, args) {
        return this.urlJoin(this.getUriBase(), method, this.buildQuery(args));
    }

    async getResponse(method, params) {
        let response = await this.getResponseAsync(method, params);
        // if(_.isObject(response)) {
        //     if(!_.isEmpty(response.result)) {
        //         if (response.result !== 200) {
        //             let message = (!_.isEmpty(response.resultText)) ? response.resultText : 'no message';
        //             throw new Exception(message);
        //         }
        //     }
        //     if(!_.isEmpty(response.status)) {
        //         if (response.status !== 200) {
        //             let message = (!_.isEmpty(response.message)) ? response.message : 'no message';
        //             throw new Exception(message);
        //         }
        //     }
        // }
        return response;
    }

    async getResponseAsync(method, params) {
        let options = {
            method: 'GET',
            url: this.getUrl(method, params),
            header: {}
        };

        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                resolve(JSON.parse(body));
            });
        });
    }

}

module.exports = VoodooRequest;