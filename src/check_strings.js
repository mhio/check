/**
* Contains the config for all the different validation tests
* This is loaded as `validate_config` into the `Validate` class at require time. 
*
* A lot of the tests are based on [lodash](https://lodash.com/docs/) methods.
*/
export const check_strings = {

  strinteger: {
    args: ['value'],
    test: (value)=> Boolean(/^[0-9]+$/.exec(value)),
    message: '{{name}} must be an integer [0-9]+',
    group: 'string'
  },
  match: {
    args: ['string', 'regex'],
    test: ( string, regex ) => Boolean(string.match(regex)),
    message: '{{name}} must match regular expression {{regex}}',
    group: 'string'
  },
  uuid: {
    args: ['string'],
    test: ( string ) => Boolean( 
      string.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
    ),
    message: '{{name}} must match a UUID',
    group: 'string'
  },
  stuid: {
    args: ['string'],
    test: ( string ) => Boolean(string.match(/^[a-zA-Z0-9]{18}$/)),
    message: '{{name}} must match a base62 uid [a-zA-Z0-9]{18}',
    group: 'string'
  },
  alphaNumericDashUnderscore: {
    args: ['string'],
    test: (string) => Boolean(string.match(/^[A-Za-z0-9_-]+$/)),
    message: '{{name}} must only contain letters, numbers, dash and underscore [ A-Z a-z 0-9 _ - ]',
    group: 'string'
  },
  alphaNumeric: { 
    args: ['string'],
    test: (string) => Boolean(string.match(/^[A-Za-z0-9]+$/)),
    message: '{{name}} must only contain letters and numbers [ A-Z a-z 0-9 ]',
    group: 'string'
  },
  alpha: { 
    args: ['string'],
    test: (string) => Boolean(string.match(/^[A-Za-z]+$/)),
    message: '{{name}} must only contain letters [ A-Z a-z ]',
    group: 'string'
  },
  numeric: { 
    args: ['string'],
    test: (string) => Boolean(string.match(/^[0-9]+$/)),
    message: '{{name}} must only contain numbers [ 0-9 ]',
    group: 'string'
  },
  word: { 
    args: ['string'],
    test: (string) => Boolean(string.match(/^\w+$/)),
    message: '{{name}} must only contain numbers [ 0-9 ]',
    group: 'string'
  },

}