
/**
* Contains the config for all the different validation tests
* This is loaded as `validate_config` into the `Validate` class at require time. 
*
* A lot of the tests are based on [lodash](https://lodash.com/docs/) methods.
*/
export const hex_re_str = '[a-fA-F0-9]'
export const hex_re = new RegExp(hex_re_str)
export const hex_complete_re = new RegExp(`^${hex_re_str}+$`)

export const base62_re_str = '[a-zA-Z0-9]'
export const base62_re = new RegExp(base62_re_str)
export const base62_complete_re = new RegExp(`^${base62_re_str}+$`)

export const base58_re_str = '[a-km-zA-NP-Z2-9]'
export const base58_re = new RegExp(base58_re_str)
export const base58_complete_re = new RegExp(`^${base62_re_str}+$`)

export const stuid_re_str = '[a-zA-Z0-9]{18}'
export const stuid_re = new RegExp(stuid_re_str)
export const stuid_complete_re = new RegExp(`^${stuid_re_str}$`)

export const uuid_re_str = '[0-9a-fA-F]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
export const uuid_re = new RegExp(uuid_re_str)
export const uuid_complete_re = new RegExp(`^${uuid_re_str}$`)


export const check_strings = {

  strinteger: {
    args: ['value'],
    test: (value)=> Boolean(/^[0-9]+$/.exec(value)),
    message: '{{name}} must be an integer [0-9]+',
    group: 'string',
    requires: [ 'string' ]
  },
  match: {
    args: ['string', 'regex'],
    test: ( string, regex ) => Boolean(string.match(regex)),
    message: '{{name}} must match regular expression {{regex}}',
    group: 'string',
    requires: [ 'string' ]
  },
  uuid: {
    args: ['string'],
    test: ( string ) => Boolean( 
      string.match(uuid_complete_re)
    ),
    message: '{{name}} must match a UUID',
    group: 'string',
    requires: [ 'string' ]
  },
  stuid: {
    args: ['string'],
    test: ( string ) => Boolean(stuid_complete_re.exec(string)),
    message: '{{name}} must match a base62 uid [a-zA-Z0-9]{18}',
    group: 'string',
    requires: [ 'string' ]
  },
  alphaNumericDashUnderscore: {
    args: ['string'],
    test: (string) => Boolean(/^[A-Za-z0-9_-]+$/.exec(string)),
    message: '{{name}} must only contain letters, numbers, dash and underscore [ A-Z a-z 0-9 _ - ]',
    group: 'string',
    requires: [ 'string' ]
  },
  alphaNumeric: { 
    args: ['string'],
    test: (string) => Boolean(string.match(/^[A-Za-z0-9]+$/)),
    message: '{{name}} must only contain letters and numbers [ A-Z a-z 0-9 ]',
    group: 'string',
    requires: [ 'string' ]
  },
  alpha: { 
    args: ['string'],
    test: (string) => Boolean(string.match(/^[A-Za-z]+$/)),
    message: '{{name}} must only contain letters [ A-Z a-z ]',
    group: 'string',
    requires: [ 'string' ]
  },
  numeric: { 
    args: ['string'],
    test: (string) => Boolean(string.match(/^[0-9]+$/)),
    message: '{{name}} must only contain numbers [ 0-9 ]',
    group: 'string',
    requires: [ 'string' ]
  },
  word: { 
    args: ['string'],
    test: (string) => Boolean(string.match(/^\w+$/)),
    message: '{{name}} must only contain numbers [ 0-9 ]',
    group: 'string',
    requires: [ 'string' ]
  },

}
