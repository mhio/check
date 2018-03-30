/**
* Contains the config for all the different validation tests
* This is loaded as `validate_config` into the `Validate` class at require time. 
*
* A lot of the tests are based on [lodash](https://lodash.com/docs/) methods.
*/
export const check_numbers = {

  range: {
    args: ['value','min','max'],
    test: (value, min, max) => ( value >= min && value <= max ),
    message: '{{name}} must be in {{min}} .. {{max}}',
    group: 'number'
  },
  between: {
    args: ['value','min','max'],
    test: (value, min, max) => ( value > min && value < max ),
    message: '{{name}} must be between {{min}} and {{max}}',
    group: 'number'
  },

}