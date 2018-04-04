[@mhio/check](https://github.com/mhio/check)
-----------

Check JS variables types

[API docco](doc/API.md)

### Install
```
yarn add @mhio/check
npm i @mhio/check --save
```

### Usage
```
import { Check } from '@mhio/check'
let checkFn = Check.generate({
  first_name: {
    label: "First Name",
    check: 'length',
    args: [ 1, 64 ],
  },
  last_name: {
    label: "Last Name",
    check: 'length',
    args: [ 1, 96 ],
  }
  size: {
    label: "Size",
    type: 'integer' 
  }
})
const some_data = {
  first_name: 'Jimmy',
  last_name: 'Stewart',
  size: 42,
}
fn(some_data)
```

### Links

- [Github `mhio/check`](https://github.com/mhio/check)
- [npm `@mhio/check`](https://npmjs.org/package/@mhio/check)
