webpackJsonp([13],{"./app/containers/ConstructorPage/actions.js":function(t,n,r){"use strict";function e(t){return{type:i.c,payload:t}}function u(t){return{type:i.d,payload:t}}function a(t){return{type:i.g,payload:t}}function o(t){return{type:i.j,payload:t}}function c(t){return{type:i.m,payload:t}}var i=r("./app/containers/ConstructorPage/constants.js");n.f=e,n.a=u,n.b=a,n.d=o,n.c=c,r.d(n,"e",function(){return s}),r.d(n,"g",function(){return p}),r.d(n,"h",function(){return f}),r.d(n,"i",function(){return E}),r.d(n,"j",function(){return d}),r.d(n,"k",function(){return C}),r.d(n,"l",function(){return _});var s=function(){return{type:i.n}},p=function(t){return{type:i.o,payload:t}},f=function(t){return{type:i.p,error:t}},E=function(t){return{type:i.r,payload:t}},d=function(t){return{type:i.s,error:t}},C=function(t){return{type:i.u,payload:t}},_=function(t){return{type:i.v,error:t}}},"./app/containers/ConstructorPage/constants.js":function(t,n,r){"use strict";r.d(n,"d",function(){return e}),r.d(n,"e",function(){return u}),r.d(n,"f",function(){return a}),r.d(n,"n",function(){return o}),r.d(n,"o",function(){return c}),r.d(n,"p",function(){return i}),r.d(n,"q",function(){return s}),r.d(n,"r",function(){return p}),r.d(n,"s",function(){return f}),r.d(n,"t",function(){return E}),r.d(n,"u",function(){return d}),r.d(n,"v",function(){return C}),r.d(n,"g",function(){return _}),r.d(n,"h",function(){return g}),r.d(n,"i",function(){return l}),r.d(n,"j",function(){return P}),r.d(n,"k",function(){return S}),r.d(n,"l",function(){return T}),r.d(n,"m",function(){return v}),r.d(n,"b",function(){return L}),r.d(n,"c",function(){return R}),r.d(n,"a",function(){return x});var e="app/ConstructorPage/LOAD_FEED",u="app/ConstructorPage/LOAD_FEED_SUCCESS",a="app/ConstructorPage/LOAD_FEED_FAILURE",o="app/ConstructorPage/LOAD_NEWSLIST",c="app/ConstructorPage/LOAD_NEWSLIST_SUCCESS",i="app/ConstructorPage/LOAD_NEWSLIST_FAILURE",s="app/ConstructorPage/REJECT_ARTICLE",p="app/ConstructorPage/REJECT_ARTICLE_SUCCESS",f="app/ConstructorPage/REJECT_ARTICLE_FAILURE",E="app/ConstructorPage/ACCEPT_ARTICLE",d="app/ConstructorPage/ACCEPT_ARTICLE_SUCCESS",C="app/ConstructorPage/ACCEPT_ARTICLE_FAILURE",_="app/ConstructorPage/HIDE_FEED_ITEM",g="app/ConstructorPage/HIDE_FEED_ITEM_SUCCESS",l="app/ConstructorPage/HIDE_FEED_ITEM_FAILURE",P="app/ConstructorPage/FEED_TO_WORK",S="app/ConstructorPage/FEED_TO_WORK_SUCCESS",T="app/ConstructorPage/FEED_TO_WORK_FAILURE",v="app/ConstructorPage/SELECT_FEED",L="app/ConstructorPage/SET_FILTERS",R="app/ConstructorPage/SET_FILTER",x=[{title:"Новости",value:"news"},{title:"ИНФОШУМ",value:"infoshoom"},{title:"Из эфира",value:"BROADCAST"}]},"./app/containers/ConstructorPage/sagas.js":function(t,n,r){"use strict";function e(){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,r.i(c.call)(f.s);case 3:return t=n.sent,n.next=6,r.i(c.put)(r.i(p.g)(t));case 6:n.next=12;break;case 8:return n.prev=8,n.t0=n.catch(0),n.next=12,r.i(c.put)(r.i(p.h)(n.t0));case 12:case"end":return n.stop()}},E[0],this,[[0,8]])}function u(t){var n=t.payload;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,r.i(c.call)(f.t,n);case 3:return t.next=5,r.i(c.put)(r.i(p.i)(n));case 5:return t.next=7,r.i(c.fork)(e);case 7:t.next=13;break;case 9:return t.prev=9,t.t0=t.catch(0),t.next=13,r.i(c.put)(r.i(p.j)(t.t0));case 13:case"end":return t.stop()}},E[1],this,[[0,9]])}function a(t){var n=t.payload;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,r.i(c.call)(f.u,n);case 3:return t.next=5,r.i(c.put)(r.i(c.push)("/editor/"+n));case 5:return t.next=7,r.i(c.put)(r.i(p.k)(n));case 7:return t.next=9,r.i(c.fork)(e);case 9:t.next=15;break;case 11:return t.prev=11,t.t0=t.catch(0),t.next=15,r.i(c.put)(r.i(p.l)(t.t0));case 15:case"end":return t.stop()}},E[2],this,[[0,11]])}function o(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.i(c.takeLatest)(s.n,e);case 2:return t.next=4,r.i(c.takeEvery)(s.q,u);case 4:return t.next=6,r.i(c.takeEvery)(s.t,a);case 6:case"end":return t.stop()}},E[3],this)}Object.defineProperty(n,"__esModule",{value:!0});var c=r("./node_modules/redux-saga/effects.js"),i=(r.n(c),r("./node_modules/react-router-redux/lib/index.js")),s=(r.n(i),r("./app/containers/ConstructorPage/constants.js")),p=r("./app/containers/ConstructorPage/actions.js"),f=r("./app/api.js");n.getList=e,n.rejectArticle=u,n.acceptArticle=a,n.newslistData=o;var E=[e,u,a,o].map(regeneratorRuntime.mark);n.default=[o]}});