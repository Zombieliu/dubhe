System.register(["./index-433d8403.js","./director-c293a59c.js","./node-event-0336ef70.js"],(function(n){"use strict";var t,e,r,i,o,s,f,a,c;return{setters:[function(n){t=n.av,e=n.l,r=n.bq,i=n.aM,o=n.bO,s=n.au,f=n.af},function(n){a=n.ax},function(n){c=n.C}],execute:function(){n("i",v);var u=t.Flags.Destroyed,l=t.Flags.PersistentMask,_=[];function v(n){var t;if(r(n)){if(function(n){return"function"==typeof n._instantiate}(n))return e.game._isCloning=!0,t=n._instantiate(null,!0),e.game._isCloning=!1,t;if(n instanceof e.Asset)throw new TypeError(i(6903))}return e.game._isCloning=!0,t=g(n),e.game._isCloning=!1,t}function g(n,t){var e;h(n,e=n._iN$t?n._iN$t:n.constructor?new(0,n.constructor):Object.create(null),t);for(var r=0,i=_.length;r<i;++r)_[r]._iN$t=null;return _.length=0,e}function h(n,t,e){o(n,"_iN$t",t,!0),_.push(n);var i=n.constructor;if(s(i))!function(n,t,e,r){for(var i=n.__values__,o=0;o<i.length;o++){var s=i[o],a=t[s];if("object"==typeof a&&a){var c=e[s];c instanceof f&&c.constructor===a.constructor?c.set(a):e[s]=a._iN$t||y(a,r)}else e[s]=a}}(i,n,t,e);else for(var a in n)if(n.hasOwnProperty(a)&&(95!==a.charCodeAt(0)||95!==a.charCodeAt(1)||"__type__"===a||"__prefab"===a)){var c=n[a];if("object"==typeof c&&c){if(c===t)continue;t[a]=c._iN$t||y(c,e)}else t[a]=c}r(n)&&(t._objFlags&=l)}function y(n,t){if(n instanceof f)return n.clone();if(n instanceof e.Asset)return n;var r;if(ArrayBuffer.isView(n)){var i=n.length;r=new n.constructor(i),n._iN$t=r,_.push(n);for(var o=0;o<i;++o)r[o]=n[o];return r}if(Array.isArray(n)){var l=n.length;r=new Array(l),n._iN$t=r,_.push(n);for(var v=0;v<l;++v){var g=n[v];r[v]="object"==typeof g&&g?g._iN$t||y(g,t):g}return r}if(n._objFlags&u)return null;var b=n.constructor;if(s(b)){if(t)if(t instanceof c){if(n instanceof a||n instanceof c)return n}else if(t instanceof a)if(n instanceof a){if(!n.isChildOf(t))return n}else if(n instanceof c&&n.node&&!n.node.isChildOf(t))return n;r=new b}else if(b===Object)r={};else{if(b)return n;r=Object.create(null)}return h(n,r,t),r}v._clone=g,e.instantiate=v}}}));