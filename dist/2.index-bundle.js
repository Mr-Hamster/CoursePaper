(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{466:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return m}));var a=n(0),o=n.n(a),r=n(22);function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function i(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?f(t):e}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function b(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var m=function(t){function e(){var t,n;u(this,e);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return b(f(n=i(this,(t=p(e)).call.apply(t,[this].concat(o)))),"state",{globalInfo:[]}),n}var n,a,c;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(e,t),n=e,(a=[{key:"componentDidMount",value:function(){var t=this;r.a("https://api.coingecko.com/api/v3/global").get().then((function(e){t.setState({globalInfo:e.data.data,marketCapPerc:e.data.data.market_cap_percentage.usdt,marketCap:e.data.data.total_market_cap.usd,totalVolume:e.data.data.total_volume.usd})})).catch((function(t){alert("".concat(t))}))}},{key:"render",value:function(){var t=this.state,e=t.globalInfo,n=t.marketCapPerc,a=t.marketCap,r=t.totalVolume;return o.a.createElement("div",null,o.a.createElement("h2",null,"Global Info Data"),o.a.createElement("p",null,"Market cap change percentage 24h usd: ",e.market_cap_change_percentage_24h_usd),o.a.createElement("p",null,"Market cap percentage: ",n),o.a.createElement("p",null,"Total market cap (usd): ",a),o.a.createElement("p",null,"Total volume (usd): ",r))}}])&&l(n.prototype,a),c&&l(n,c),e}(o.a.Component)}}]);