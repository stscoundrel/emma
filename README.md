# Emma

Simple localStorage with expiration times. For data that you'd only like to keep fresh for a given time.

LocalStorage values can live for a long time. If you save somethig in there, it might remain there for weeks. Often simple solution is using sessionStorage instead, but it comes with its own set of limitations. Notably, you can't trivially share sessionStorage between browser tabs. In these situations, localStorage with given expiration might be what you're looking for.

### Install

`yarn add emma-storage`

##### Usage

```javascript
// Your usage example here
```

### What's in the name?

Emma is a feminine given name in multiple languages and countries. How it came to represent storage in this libray is a verse from an urban poet in Kannelmäki, Finland:

_"Mummolassa jemma ja mummon nimi Emma"_

Where he rhymes his "stash" with her grandmothers name, Emma.
