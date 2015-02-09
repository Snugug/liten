/*
 * The global Liten object that contains all functionality.
 *
 */
(function (Liten, w, d) {
  'use strict';

  //////////////////////////////
  // Normalize Return Values
  //////////////////////////////
  var returnValues = function returnValues (values) {
    values = values.reverse();

    if (values.length === 1) {
      values = values[0];
    }

    return values;
  };

  //////////////////////////////
  // Liten Structure
  //////////////////////////////
  var LitenStruct = function LitenStruct(selector) {
    var nodes = [],
        nodeList,
        ltn;

    if (selector) {
      nodeList = d.querySelectorAll(selector);
      console.log(nodeList);
      nodes = Array.prototype.slice.call(nodeList);
    }

    ltn = nodes;

    //////////////////////////////
    // Events Goodies
    //////////////////////////////
    ltn.on = function (event, fn, clear) {
      // If the selector is the window or document, set nodes to just that selector
      if (selector === w || selector === d) {
        nodes = [selector];
      }

      nodes.forEach(function (elem) {
        // Modern Goodies
        if (d.addEventListener) {
          if (clear) {
            elem.removeEventListener(event, fn, false);
          }
          else {
            elem.addEventListener(event, fn, false);
          }
        }
        // Old IE
        else if (d.attachEvent) {
          if (clear) {
            elem.detachEvent('on' + event, elem[event + fn]);
            elem[event + fn] = null;
          }
          else {
            elem[event + fn] = function () {
              return fn.apply(elem, arguments);
            };
            elem.attachEvent('on' + event, elem[event + fn]);
          }
        }
      });
    };

    // DOMContentLoaded
    ltn.ready = function (fn) {
      nodes = [w];
      ltn.on('DOMContentLoaded', fn);
    };

    //////////////////////////////
    // Attribute Manipulation
    //////////////////////////////
    ltn.attr = function (name, value) {
      var values = [];

      if (value) {
        nodes.forEach(function (elem) {
          elem.setAttribute(name, value);
        });
      }
      else {
        nodes.forEach(function (elem) {
          values.push(elem.getAttribute(name));
        });

        return returnValues(values);
      }
    };

    //////////////////////////////
    // Display Manipulation
    //////////////////////////////
    ltn.toggle = function () {
      nodes.forEach(function (elem) {
        if (elem.getAttribute('aria-hidden') !== 'true') {
          elem.setAttribute('aria-hidden', 'true');
        }
        else {
          elem.setAttribute('aria-hidden', 'false');
        }
      });
    };

    ltn.hide = function () {
      nodes.forEach(function (elem) {
        elem.setAttribute('aria-hidden', 'true');
      });
    };

    ltn.show = function () {
      nodes.forEach(function (elem) {
        elem.setAttribute('aria-hidden', 'false');
      });
    };

    //////////////////////////////
    // Class Manipulation
    //////////////////////////////
    ltn.class = function (classes, action) {
      var classArray,
          className,
          i;

      if (classes) {
        classArray = classes.split(/\s+/);
        action = action || 'replace';
      }

      nodes.forEach(function (elem) {
        className = elem.className;

        if (classes) {
          switch (action) {
            case 'add':
              elem.className = className + ' ' + classes;
              break;
            case 'replace':
              elem.className = classes;
              break;
            case 'remove':
            case 'toggle':
              for (i = 0; i < classArray.length; i++) {
                elem.classList[action](classArray[i]);
              }
          }
        }
      });
    };

    ltn.toggleClass = function (classes) {
      ltn.class(classes, 'toggle');
    };

    ltn.addClass = function (classes) {
      ltn.class(classes, 'add');
    };

    ltn.replaceClass = function (classes) {
      ltn.class(classes, 'replace');
    };

    ltn.removeClass = function (classes) {
      ltn.class(classes, 'remove');
    };

    //////////////////////////////
    // Return that sucka!
    //////////////////////////////
    return ltn;
  };

  //////////////////////////////
  // We only ever want one instance of state
  //////////////////////////////
  Liten = Liten || LitenStruct;

  //////////////////////////////
  // All of the various exports!
  //////////////////////////////
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Liten;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return Liten;
    });
  } else {
    window.Liten = Liten;
    window.$ = Liten;
  }
}(window.Liten, window, document));
