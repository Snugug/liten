# Liten [![Build Status](https://travis-ci.org/Snugug/liten.svg)](https://travis-ci.org/Snugug/liten) [![Coverage Status](https://img.shields.io/coveralls/Snugug/liten.svg)](https://coveralls.io/r/Snugug/liten?branch=1.x.x) [![Code Climate](https://codeclimate.com/github/Snugug/liten/badges/gpa.svg)](https://codeclimate.com/github/Snugug/liten) [![Bower version](https://badge.fury.io/bo/liten.svg)](https://github.com/Snugug/liten/releases/latest)
### A super tiny DOM manipulation library that is basically just syntactic sugar for ES5

A super duper tiny DOM manipulation library that adds some syntactic sugar to doing these things with vanilla JavaScript. Mostly build so I could learn the pattern, but probably usable in production.

Heavily inspired (and in places, borrowed from) [Chibi](https://github.com/kylebarrow/chibi).

## Browser Support

**liten** uses modern JavaScript, but can [support older browsers as well](#a-note-on-ie8older-browser-support). It has been tested in the following browsers but is likely to support more:

* IE8+ (see below for notes)
* Firefox 3.5+
* Chrome
* Safari
* Opera 10.0+
* iOS Safari
* Opera Mini
* Android Browser
* Blackberry Browser
* Opera Mobile
* Chrome for Android
* Firefox for Android
* IE Mobile

### A note on IE8/Older Browser Support

There are two files provided: `eq.min.js`, `eq.polyfilled.min.js`, and `polyfills.min.js`. `eq.polyfilled.min.js` includes the polyfills needed to run **liten** in older browsers that are missing some newer JavaScript niceties (yes, this includes IE8+) and `polyfills.js` just includes the polyfills. While these allow for a drop-in solutions using just what's provided here, a better solution (and where a bunch of the polyfills come from), consider using something like a [polyfill service](https://github.com/Financial-Times/polyfill-service) for a more robust and well-rounded solution.

The specific polyfills included are as follows:

* [`Event.DOMContentLoaded`](http://caniuse.com/#feat=domcontentloaded)
* [`Element.prototype.classList`](http://caniuse.com/#feat=classlist)
* [`Array.prototype.forEach`](http://kangax.github.io/compat-table/es5/#Array.prototype.forEach)
