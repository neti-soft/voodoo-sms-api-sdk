var moment = require('moment');
var Request = require('./Request');
var Exception = require('./Exception');
var Validate = require('./Validate');

class VoodooClient {

    constructor(user, pass, defaultCountry) {
        this.user = user;
        this.pass = pass;
        this.defaultCountry = defaultCountry || 44;
        this.format = 'json';

        this.request = new Request();
    }

    getParamsDefault() {
        return {
            uid:    this.user,
            pass:   this.pass,
            format: this.format
        };
    }

    getParams(params) {
        return Object.assign(
            this.getParamsDefault(),
            params || {}
        );
    }

    call() {
        let args = [].slice.call(arguments);
        let method = args.shift();

        if (!method || !this[method]) {
            throw new Exception('Cannot access method');
        }

        return this[method].call(this, ...args);
    }

    async sendSMS(from, to, msg) {
        let numbers = Validate.numberExplode(to);

        let params = this.getParams({
            orig: from,
            dest: numbers,
            msg: msg,
            cc: this.defaultCountry,
            validity: 1
        });

        let response = await this.request.getResponse('sendSMS', params);
        return response;
    }

    async getSMS(dateFrom, dateTo) {
        let params = this.getParams({
            from: dateFrom,
            to: dateTo
        });

        let response = await this.request.getResponse('getSMS', params);
        return response;
    }

    async getCredit() {
        let params = this.getParams();

        let response = await this.request.getResponse('getCredit', params);
        return response;
    }

    async getDlrStatus(reference) {
        let params = this.getParams({
            reference_id: reference
        });

        let response = await this.request.getResponse('getDlrStatus', params);
        return response;
    }

    async getDlr(date) {
        if(!date) {
            date = new Date();
        }
        if(!moment.isMoment(date)) {
            date = moment(date);
        }
        date = date.format('Y-m-d');
        let params = this.getParams({
            date: date
        });

        let response = await this.request.getResponse('getDlr', params);
        return response;
    }

}

module.exports = VoodooClient;