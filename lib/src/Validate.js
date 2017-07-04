const _ = require('lodash');
const moment = require('moment');

let VoodooValidate = {
    numberExplode: (number) => {
        return _.isArray(number) ? number : number.split(',');
    },
    validateDate: (date) => {
        if(!date) {
            date = new Date();
        }
        return moment(date).toISOString();
    }
};

module.exports = VoodooValidate;