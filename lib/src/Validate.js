var _ = require('lodash');

var VoodooValidate = {
    numberExplode: (number) => {
        return _.isArray(number) ? number : number.split(',');
    }
};

module.exports = VoodooValidate;