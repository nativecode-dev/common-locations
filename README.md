# common-locations

[![npm](https://img.shields.io/npm/v/common-locations.svg?style=flat-square)](https://www.npmjs.com/package/common-locations)
[![Travis](https://img.shields.io/travis/nativecode-dev/common-locations.svg?style=flat-square&label=travis)](https://travis-ci.org/nativecode-dev/common-locations)
[![TeamCity](https://img.shields.io/teamcity/https/build.nativecode.com/s/commonlocations_continuous.svg?style=flat-square&lbabel=teamcity)](https://build.nativecode.com/viewType.html?buildTypeId=commonlocations_continuous&guest=1)
[![David](https://img.shields.io/david/nativecode-dev/common-locations.svg?style=flat-square&label=deps)](https://www.npmjs.com/package/common-locations)
[![David](https://img.shields.io/david/dev/nativecode-dev/common-locations.svg?style=flat-square&label=devdeps)](https://www.npmjs.com/package/common-locations)

Node module that provides access to common locations across platforms.

# Installation
```
npm install --save common-locations
```

# Usage

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

## TODO
- Implement some sort of mkdir when grabbing paths.
- Implement Mac OSX paths, which currently uses the same as POSIX paths.

# Development Setup
```
npm install
```

NOTE: If you are using an editor and would like to run `gulp` commands in your IDE,
you'll need to also install `gulp-cli` globally.
```
npm install -g gulp-cli
```

# License
Copyright 2017 NativeCode Development <support@nativecode.com>

Copyright 2017 NativeCode Development <support@nativecode.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without
limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
