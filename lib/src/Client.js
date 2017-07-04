const Request = require('./Request');
const Validate = require('./Validate');

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
        return new Promise((resolve, reject) => {
            if (!method || !this[method]) {
                return reject(new Error('Cannot access method'));
            }
            return this[method].call(this, ...args)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    sendSMS(from, to, msg) {
        let numbers = Validate.numberExplode(to);

        let params = this.getParams({
            orig: from,
            dest: numbers,
            msg: msg,
            cc: this.defaultCountry,
            validity: 1
        });

        return this.request.getResponse('sendSMS', params);
    }

    getSMS(dateFrom, dateTo) {
        let dates = {};
        if(dateFrom && dateTo) {
            dates = {
                from:  Validate.validateDate(dateFrom),
                to:  Validate.validateDate(dateTo)
            }
        }
        let params = this.getParams(dates);
        return this.request.getResponse('getSMS', params);
    }

    getCredit() {
        let params = this.getParams();
        return this.request.getResponse('getCredit', params);
    }

    getDlrStatus(reference) {
        let params = this.getParams({
            reference_id: reference
        });
        return this.request.getResponse('getDlrStatus', params);
    }

    getDlr(date) {
        let params = this.getParams({
            date: Validate.validateDate(date)
        });
        return this.request.getResponse('getDlr', params);
    }

}

module.exports = VoodooClient;