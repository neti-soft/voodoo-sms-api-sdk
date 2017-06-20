# Voodoo SMS API Javascript SDK

## Simple to use

Create you owm Voodoo SMS account and try to fireup simple sendSMS call.

```js
var VoodooApi = require('voodoo-sms-api-sdk');
var api = new VoodooApi('user', 'pass', 48);

api.call('sendSMS', 'from' , '123456789', 'test message')
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(`Error ${err}`);
    });
```

## Methods

- constructor
- sendSMS
- getSms
- getCredit
- getDlrStatus
- getDlr

...to be continued

## constructor

Constructor.
new VoodooApi(user, pass, defaultCountry)
## sendSMS

Send SMS.
call(`sendSMS`, from, to, msg)
## getSms

Get Incoming SMSs.
call(`getSms`, dateFrom, dateTo)

## getCredit

Get Credit.
call(`getCredit`)

## getDlrStatus

Get status of Single Message.
call(`getDlrStatus`, reference)

## getDlr

Get Deliveries.
call(`getDlr`, date)