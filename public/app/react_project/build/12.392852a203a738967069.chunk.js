webpackJsonp([12],{"./app/containers/FeedPage/actions.js":function(e,t,n){"use strict";function r(e){return{type:g.a,payload:e}}function a(e){return{type:g.b,payload:e}}function u(e){return{type:g.c,payload:e}}function c(e){return{type:g.d,error:e}}function i(e){return{type:g.e,payload:e}}function s(e){return{type:g.f,payload:e}}function o(e){return{type:g.g,error:e}}function p(e){return{type:g.h,payload:e}}function f(){return{type:g.i}}function d(e){return{type:g.j,error:e}}function l(e){return{type:g.k,payload:e}}var g=n("./app/containers/FeedPage/constants.js");t.d=r,t.e=a,t.f=u,t.g=c,t.a=i,t.h=s,t.i=o,t.c=p,t.j=f,t.k=d,t.b=l},"./app/containers/FeedPage/sagas.js":function(e,t,n){"use strict";function r(e){var t,r,a=e.payload;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.i(o.select)(l.f);case 2:return t=e.sent,e.prev=3,e.next=6,n.i(o.call)(g.o,x({},t,a));case 6:return r=e.sent,e.next=9,n.i(o.put)(n.i(d.f)(r));case 9:e.next=15;break;case 11:return e.prev=11,e.t0=e.catch(3),e.next=15,n.i(o.put)(n.i(d.g)(e.t0));case 15:case"end":return e.stop()}},v[0],this,[[3,11]])}function a(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.i(o.takeLatest)(f.b,r);case 2:return e=t.sent,t.next=5,n.i(o.take)(p.LOCATION_CHANGE);case 5:return t.next=7,n.i(o.cancel)(e);case 7:case"end":return t.stop()}},v[1],this)}function u(e){var t=e.payload;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.i(o.call)(g.p,t);case 3:return e.next=5,n.i(o.put)(n.i(d.h)(t));case 5:return e.next=7,n.i(o.fork)(r,{});case 7:e.next=13;break;case 9:return e.prev=9,e.t0=e.catch(0),e.next=13,n.i(o.put)(n.i(d.i)(e.t0));case 13:case"end":return e.stop()}},v[2],this,[[0,9]])}function c(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.i(o.takeLatest)(f.e,u);case 2:case"end":return e.stop()}},v[3],this)}function i(e){var t=e.payload;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.i(o.call)(g.q,t);case 3:return e.next=5,n.i(o.put)(n.i(d.j)());case 5:e.next=11;break;case 7:return e.prev=7,e.t0=e.catch(0),e.next=11,n.i(o.put)(n.i(d.k)(e.t0));case 11:case"end":return e.stop()}},v[4],this,[[0,7]])}function s(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.i(o.takeEvery)(f.h,i);case 2:case"end":return e.stop()}},v[5],this)}Object.defineProperty(t,"__esModule",{value:!0});var o=n("./node_modules/redux-saga/effects.js"),p=(n.n(o),n("./node_modules/react-router-redux/lib/index.js")),f=(n.n(p),n("./app/containers/FeedPage/constants.js")),d=n("./app/containers/FeedPage/actions.js"),l=n("./app/containers/FeedPage/selectors.js"),g=n("./app/api.js");t.getFeed=r,t.feedData=a,t.hideItem=u,t.hideData=c,t.feedToWork=i,t.toWork=s;var x=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},v=[r,a,u,c,i,s].map(regeneratorRuntime.mark);t.default=[a,c,s]},"./app/containers/FeedPage/selectors.js":function(e,t,n){"use strict";var r=n("./node_modules/reselect/es/index.js"),a=n("./node_modules/immutable/dist/immutable.js");n.n(a);n.d(t,"a",function(){return c}),n.d(t,"c",function(){return o}),n.d(t,"d",function(){return s}),n.d(t,"e",function(){return p}),n.d(t,"b",function(){return f}),n.d(t,"f",function(){return d});var u=function(e){return e.get("feedPage")},c=n.i(r.a)(u,function(e){return e.get("news").get("data")}),i=n.i(r.a)(u,function(e){return e.get("selectedFeed")}),s=n.i(r.a)(u,function(e){return{current:e.getIn(["news","current"]),max:e.getIn(["news","max"])}}),o=n.i(r.a)(c,i,function(e,t){return e.find(function(e){return e.get("id")===t},null,n.i(a.Map)()).toJS()}),p=n.i(r.a)(u,function(e){return e.getIn(["news","loading"])}),f=n.i(r.a)(u,function(e){return e.getIn(["news","search"])}),d=n.i(r.a)(f,s,function(e,t){return e.set("page",t.current).toJS()})}});