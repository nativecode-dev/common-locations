# common-locations

Node module that provides access to common locations across platforms.

## Usage

The default usage of the library can be invoked by just requiring the package.

```
const locations = require('common-locations')
```

If you wish to use with `memfs` or `unionfs`, you can optionally pass in a `fs` object.

```
const fs = require('fs')
const cl = require('common-locations)
const locations = cl.use(fs)
```

### Future Implementations

- Allow creation of sub-directories.

## Development Setup
```
npm run setup
```