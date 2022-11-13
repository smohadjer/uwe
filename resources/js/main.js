(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var Navigation = /*#__PURE__*/function () {
    function Navigation(options) {
      _classCallCheck(this, Navigation);
      this.maxHeight = undefined;
      this.el = options.element;
      var self = this;
      if (this.el.getAttribute('data-set-max-height')) {
        this.el.style.maxHeight = 0;
        var observer = new MutationObserver(function () {
          self.update();
        });
        observer.observe(self.el, {
          attributes: true,
          attributeFilter: ['class'],
          childList: false,
          characterData: false
        });
      }
    }
    _createClass(Navigation, [{
      key: "getHeight",
      value: function getHeight() {
        var h;
        var maxHeight = this.el.style.maxHeight;
        this.el.style.maxHeight = 'none';
        h = this.el.offsetHeight;
        this.el.style.maxHeight = maxHeight;
        return h;
      }
    }, {
      key: "update",
      value: function update() {
        var self = this;
        if (this.el.classList.contains('is-visible')) {
          if (this.maxHeight === undefined) {
            this.maxHeight = this.getHeight();
          }

          //wihtout setTimeout style change won't be animated
          setTimeout(function () {
            self.el.style.maxHeight = self.maxHeight + 'px';
          }, 0);
        } else {
          this.el.style.maxHeight = 0;
        }
      }
    }]);
    return Navigation;
  }();

  //Helper classes to HTML for styling of nojs version
  var html = document.querySelector('html');
  html.classList.remove('no-js');
  html.classList.add('js');

  //taken from http://youmightnotneedjquery.com/
  function ready(fn) {

    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  ready(function () {

    console.log('DOM is ready!');

    //initialize navigation
    var nav = new Navigation({
      element: document.querySelector('header > nav')
    });

    //hamburger button
    var hamburger = document.querySelector('button.hamburger');
    if (hamburger) {
      hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('is-active');
        if (nav.el) {
          nav.el.classList.toggle('is-visible');
        }
      });
    }
  });

})();
