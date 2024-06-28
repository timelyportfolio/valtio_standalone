I know this is ancient technology but standalone JavaScript can be convenient, especially when modern JavaScript build tools are not available.  Both `valtio/vanilla` proper and `valtio/vanilla/utils` will be namespaced as `window.valtio`.

Please see [`valtio`](https://github.com/pmndrs/valtio).   Thanks so much to all the authors for all their work.

### build

```
browserify index.js --standalone valtio | terser -c > valtio.js
```