# Emma

Simple localStorage with expiration times. For data that you'd only like to keep fresh for a given time.

LocalStorage values can live for a long time. If you save something in there, it might remain there for weeks. Often simple solution is using sessionStorage instead, but it comes with its own set of limitations. Notably, you can't trivially share sessionStorage between browser tabs. In these situations, localStorage with given expiration might be what you're looking for.

Emma still stores values in localStorage, but invalidates them if they reach their best-before date.

### Install

`yarn add emma-storage`

##### Usage

```javascript
// Emma has the same methods as localStorage.
import emma from 'emma-storage';

const myObject = {
  foo: 'Lorem ipsum',
  bar: 'Dolor sit amet',
}

/**
 * Store a value.
 * Emma prefixes the keys under-the-hood
 * to avoid collisions with regular localStorage. 
 */
emma.setItem('myKey', myObject);

/**
 * You can also give short TTL instead of default 24h
 * This one lives for one hour / 60 minutes.
 */
emma.setItem('myShortLivedKey', myObject, 3600000);

/**
 * Values can be removed, or the whole store can be cleared.
 */
emma.removeItem('myShortLivedKey');

/**
 * Clearing storage _only_ clears Emma values.
 * If there are other things, they're spared.
 */ 
emma.clear();

```

### How does it work?

Nothing fancy. Instead of storing just the value in localStorage, Emma stores it with expiration time. The final value is JSON string of structure:

```javascript
{
  value: yourOriginalValue,
  expiration: creation timestamp + ttl
}
```

##### Caveats

- Emma still works with localStorage.
- Emma is no more safe than regular localStorage, or any more hidden.
- If value is not _ever_ used after the expiration, it remains in localStorage. Values are only cleared as you try to fetch them.


### What's in the name?

Emma is a feminine given name in multiple languages and countries. How it came to represent storage in this libray is a verse from an urban poet in Kannelmäki, Finland, where he rhymes his "stash" with his grandmothers name, Emma.

_"Mummolassa jemma ja mummon nimi Emma"_

