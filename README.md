# Voodoo SMS API Javascript SDK

## Simple to use

Create you own Voodoo SMS account and try to fire up simple sendSMS call.

```js
var VoodooApi = require('voodoo-sms-api-sdk');
var api = new VoodooApi('user', 'pass', 48);

api.call('sendSMS', 'from' , '123456789', 'test message')
    .then((result) => {
        // result
    })
    .catch((err) => {
        // error handling
    });
```

## Methods

- constructor
- sendSMS
- getSMS
- getCredit
- getDlrStatus
- getDlr

## constructor

Constructor.
`new VoodooApi(user, pass, defaultCountry)`
## sendSMS

Send SMS.
`call('sendSMS', from, to, msg)`
## getSMS

Get Incoming SMSs.
`call('getSMS', dateFrom, dateTo)`

## getCredit

Get Credit.
`call('getCredit')`

## getDlrStatus

Get status of Single Message.
`call('getDlrStatus', reference)`

## getDlr

Get Deliveries.
`call('getDlr', date)`