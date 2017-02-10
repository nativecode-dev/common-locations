# common-locations

Node module that provides access to common locations across platforms.

## Usage

The default usage of the library can be invoked by just requiring the package
and passing the name of your application.
```javascript
const cl = require('common-locations')
const locations = cl('myapp')
```

If you wish to use with [memfs](https://www.npmjs.com/package/memfs) or
[unionfs](https://www.npmjs.com/package/unionfs), you can optionally pass in an
`fs` object.
```javascript
const fs = require('fs')
const cl = require('common-locations')
const locations = cl.use('myapp', fs)
```

You can also pass in an `env` object as well, that is merged with the `process.env`
variables.
```javascript
const locations = cl.use('myapp', fs, {
  NODE_ENV: 'debug'
})
```

NOTE: It will mainly affect Windows as most of the directory locations are pulled
from environment variables.

Once you've required the module, you can access the various methods in the namespace.
```javascript
const home = locations.home()
```

The above will return `/home/<username>` on POSIX systems or `C:\Users\<username>` on
Windows machines. You can optionally pass additional directory parts as well.
```javascript
const home = locations.home('etc', 'myapp')
```

The above will return `/home/<username>/etc/myapp`.

NOTE: You will have to view the source to see the other options until the API is finalized
and documentation is produced.

- app
    - local()
    - system()
    - user()
- binaries
    - local()
    - system()
    - user()
- config
    - local()
    - system()
    - user()
- home()
- log
    - local()
    - system()
    - user()
- temp()

### TODO
- Implement some sort of mkdir when grabbing paths.

## Development Setup
```
npm install
```

NOTE: If you are using an editor and would like to run `gulp` commands in your IDE,
you'll need to also install `gulp-cli` globally.
```
npm install -g gulp-cli
```
