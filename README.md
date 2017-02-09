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

Once you've required the module, you can access the various methods in the namespace.

```
const home = locations.home()
```

The above will return `/home/<username>` on POSIX systems or `C:\Users\<username>` on Windows machines.
You can optionally pass additional directory parts as well.

```
const home = locations.home('etc', 'myapp')
```

The above will return `/home/<username>/etc/myapp`.

NOTE: You will have to view the source to see the other options until the API is finalized and documentation
is produced.

### Future Implementations

- Allow creation of sub-directories.

## Development Setup
```
npm run setup
```