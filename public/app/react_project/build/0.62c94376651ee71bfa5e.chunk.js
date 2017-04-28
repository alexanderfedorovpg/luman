webpackJsonp([0],{"./app/containers/ProgramsPage/actions.js":function(e,r,t){"use strict";function n(){return{type:w.a}}function a(e){return{type:w.b,payload:{id:e}}}function u(e){return{type:w.c,payload:{type:e}}}function i(e){return{type:w.d,payload:{id:e}}}function c(){return{type:w.e}}function o(e){return{type:w.f,payload:{programs:e}}}function s(e){return{type:w.g,error:e}}function p(e){return{type:w.h,payload:{id:e}}}function d(e){return{type:w.i,payload:{id:e}}}function f(e){return{type:w.j,payload:{id:e}}}function l(e){return{type:w.k,error:e}}function g(e){return{type:w.l,payload:e}}function P(e){return{type:w.m,payload:e}}function x(e){return{type:w.n,error:e}}function y(e){return{type:w.o,payload:e}}function R(e){return{type:w.p,payload:e}}function m(e){return{type:w.q,error:e}}function E(e){return{type:w.r,payload:e}}function v(e){return{type:w.s,payload:e}}function _(e){return{type:w.t,error:e}}function h(e){return{type:w.u,payload:{modal:e}}}function O(){return{type:w.v}}function D(e){return{type:w.w,payload:{id:e}}}function C(e){return{type:w.x,payload:{query:e}}}function L(e){return{type:w.y,payload:{id:e}}}var w=t("./app/containers/ProgramsPage/constants.js");r.a=n,r.x=a,r.k=u,r.j=i,r.y=c,r.n=o,r.o=s,r.i=p,r.b=d,r.p=f,r.q=l,r.f=g,r.r=P,r.s=x,r.d=y,r.t=R,r.u=m,r.e=E,r.v=v,r.w=_,r.l=h,r.c=O,r.g=D,r.m=C,r.h=L},"./app/containers/ProgramsPage/constants.js":function(e,r,t){"use strict";t.d(r,"a",function(){return n}),t.d(r,"c",function(){return a}),t.d(r,"d",function(){return u}),t.d(r,"e",function(){return i}),t.d(r,"f",function(){return c}),t.d(r,"g",function(){return o}),t.d(r,"h",function(){return s}),t.d(r,"i",function(){return p}),t.d(r,"j",function(){return d}),t.d(r,"k",function(){return f}),t.d(r,"l",function(){return l}),t.d(r,"B",function(){return g}),t.d(r,"m",function(){return P}),t.d(r,"n",function(){return x}),t.d(r,"o",function(){return y}),t.d(r,"p",function(){return R}),t.d(r,"q",function(){return m}),t.d(r,"r",function(){return E}),t.d(r,"s",function(){return v}),t.d(r,"t",function(){return _}),t.d(r,"u",function(){return h}),t.d(r,"v",function(){return O}),t.d(r,"w",function(){return D}),t.d(r,"x",function(){return C}),t.d(r,"b",function(){return L}),t.d(r,"y",function(){return w}),t.d(r,"z",function(){return S}),t.d(r,"A",function(){return k}),t.d(r,"C",function(){return A});var n="app/ProgramsPage/OPEN_PAGE",a="app/ProgramsPage/SET_RECORDS_TYPE",u="app/ProgramsPage/CHANGE_RUBRIC",i="app/ProgramsPage/LOAD_PROGRAMS",c="app/ProgramsPage/LOAD_PROGRAMS_SUCCESS",o="app/ProgramsPage/LOAD_PROGRAMS_FAILURE",s="app/ProgramsPage/WANT_DELETE_RECORD",p="app/ProgramsPage/DELETE_RECORD",d="app/ProgramsPage/DELETE_RECORD_SUCCESS",f="app/ProgramsPage/DELETE_RECORD_FAILURE",l="app/ProgramsPage/LOAD_RECORDS",g="app/ProgramsPage/PENDING_RECORDS",P="app/ProgramsPage/LOAD_RECORDS_SUCCESS",x="app/ProgramsPage/LOAD_RECORDS_FAILURE",y="app/ProgramsPage/POST_RECORD",R="app/ProgramsPage/POST_RECORD_SUCCESS",m="app/ProgramsPage/POST_RECORD_FAILURE",E="app/ProgramsPage/EDIT_RECORD",v="app/ProgramsPage/EDIT_RECORD_SUCCESS",_="app/ProgramsPage/EDIT_RECORD_FAILURE",h="app/ProgramsPage/OPEN_MODAL",O="app/ProgramsPage/CLOSE_MODAL",D="app/ProgramsPage/START_EDIT_RECORD",C="app/ProgramsPage/SEARCH_RECORD",L="app/ProgramsPage/SELECT_RECORD",w="app/ProgramsPage/PLAY_VIDEO",S={record:"record",video:"video",confirmRecordDelete:"confirmRecordDelete"},k=[{title:"Выпуски",value:"FULL"},{title:"Из эфира",value:"CUT"}],A=8},"./app/containers/ProgramsPage/sagas.js":function(e,r,t){"use strict";function n(){var e,r;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.i(g.call)(x.i);case 3:return e=n.sent,r={byId:{},ids:[]},e.data.forEach(function(e){r.byId[e.id]=e,r.ids.push(e.id)}),n.next=8,t.i(g.put)(t.i(R.n)(r));case 8:n.next=14;break;case 10:return n.prev=10,n.t0=n.catch(0),n.next=14,t.i(g.put)(t.i(R.o)(n.t0));case 14:case"end":return n.stop()}},_[0],this,[[0,10]])}function a(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.i(g.put)(t.i(R.c)());case 2:return e.next=4,t.i(g.put)(t.i(R.l)(m.z.confirmRecordDelete));case 4:case"end":return e.stop()}},_[1],this)}function u(e){var r,n=e.payload;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.i(g.call)(x.j,n.id);case 3:if(r=e.sent,!r.data.success){e.next=11;break}return e.next=7,t.i(g.put)(t.i(R.p)(n.id));case 7:return e.next=9,t.i(g.put)(t.i(R.c)());case 9:e.next=12;break;case 11:throw new Error(r.statusText);case 12:e.next=18;break;case 14:return e.prev=14,e.t0=e.catch(0),e.next=18,t.i(g.put)(t.i(R.q)(e.t0));case 18:case"end":return e.stop()}},_[2],this,[[0,14]])}function i(){var e,r,n,a,u,i,c,o,s,p,d=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{payload:{}};return regeneratorRuntime.wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.prev=0,f.next=3,t.i(g.put)({type:m.B});case 3:return e={},r=d.payload,n=void 0===r.replace||r.replace,f.next=8,[t.i(g.select)(h),t.i(g.select)(D),t.i(g.select)(O),t.i(g.select)(C)];case 8:return a=f.sent,u=v(a,4),i=u[0],c=u[1],o=u[2],s=u[3],c>=0&&(e.rubricId=c),s&&(e.search=s),e.fullVideo="FULL"===i,e.offset=n?0:o,e.limit=m.C,f.next=21,t.i(g.call)(x.k,e);case 21:return p=f.sent,f.next=24,t.i(g.put)(t.i(R.r)({records:p.data,allUploaded:p.data.length<m.C,replace:n}));case 24:f.next=30;break;case 26:return f.prev=26,f.t0=f.catch(0),f.next=30,t.i(g.put)(t.i(R.s)(f.t0));case 30:case"end":return f.stop()}},_[3],this,[[0,26]])}function c(e){var r,n,a,u,i=e.payload;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.i(g.call)(x.g,i.video_url[0]);case 3:return r=e.sent,e.next=6,t.i(g.select)(h);case 6:return n=e.sent,a=E({},i,{is_full_video:"FULL"===n,video_url:r.data.file.url}),e.next=10,t.i(g.call)(x.l,a);case 10:if(u=e.sent,!u.data.success){e.next=17;break}return a.id=u.data.data.id,e.next=15,t.i(g.put)(t.i(R.t)(a));case 15:return e.next=17,t.i(g.put)(t.i(R.c)());case 17:e.next=23;break;case 19:return e.prev=19,e.t0=e.catch(0),e.next=23,t.i(g.put)(t.i(R.u)(e.t0));case 23:case"end":return e.stop()}},_[4],this,[[0,19]])}function o(e){var r,n,a,u=e.payload;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,r=E({},u),"string"==typeof u.video_url){e.next=7;break}return e.next=5,t.i(g.call)(x.g,u.video_url[0]);case 5:n=e.sent,r.video_url=n.data.file.url;case 7:return e.next=9,t.i(g.call)(x.m,r.id,r);case 9:if(a=e.sent,!a.data.success){e.next=15;break}return e.next=13,t.i(g.put)(t.i(R.v)(r));case 13:return e.next=15,t.i(g.put)(t.i(R.c)());case 15:e.next=21;break;case 17:return e.prev=17,e.t0=e.catch(0),e.next=21,t.i(g.put)(t.i(R.w)(e.t0));case 21:case"end":return e.stop()}},_[5],this,[[0,17]])}function s(e){var r=e.payload;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.i(g.put)(t.i(R.c)());case 2:return e.next=4,t.i(g.put)(t.i(R.x)(r.id));case 4:return e.next=6,t.i(g.put)(t.i(R.l)(m.z.record));case 6:case"end":return e.stop()}},_[6],this)}function p(e){var r=e.payload;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.i(g.put)(t.i(R.c)());case 2:return e.next=4,t.i(g.put)(t.i(R.x)(r.id));case 4:return e.next=6,t.i(g.put)(t.i(R.l)(m.z.video));case 6:case"end":return e.stop()}},_[7],this)}function d(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,[t.i(g.call)(y.b),t.i(g.call)(n)];case 2:return e.next=4,t.i(g.call)(i,{payload:{replace:!0}});case 4:case"end":return e.stop()}},_[8],this)}function f(){var e;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.i(g.takeLatest)(m.a,d);case 2:return e=r.sent,r.next=5,t.i(g.take)(P.LOCATION_CHANGE);case 5:return r.next=7,t.i(g.cancel)(e);case 7:case"end":return r.stop()}},_[9],this)}function l(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.i(g.takeLatest)(m.e,n);case 2:return e.next=4,t.i(g.takeEvery)(m.i,u);case 4:return e.next=6,t.i(g.takeLatest)(m.l,i);case 6:return e.next=8,t.i(g.takeLatest)(m.c,i);case 8:return e.next=10,t.i(g.takeLatest)(m.d,i);case 10:return e.next=12,t.i(g.takeEvery)(m.o,c);case 12:return e.next=14,t.i(g.takeEvery)(m.r,o);case 14:return e.next=16,t.i(g.takeLatest)(m.w,s);case 16:return e.next=18,t.i(g.takeLatest)(m.x,i,{payload:{replace:!0}});case 18:return e.next=20,t.i(g.takeLatest)(m.y,p);case 20:return e.next=22,t.i(g.takeLatest)(m.h,a);case 22:case"end":return e.stop()}},_[10],this)}Object.defineProperty(r,"__esModule",{value:!0});var g=t("./node_modules/redux-saga/effects.js"),P=(t.n(g),t("./node_modules/react-router-redux/lib/index.js")),x=(t.n(P),t("./app/api.js")),y=t("./app/containers/App/sagas.js"),R=t("./app/containers/ProgramsPage/actions.js"),m=t("./app/containers/ProgramsPage/constants.js");r.getPrograms=n,r.wantDeleteRecord=a,r.deleteRecord=u,r.getRecords=i,r.postRecord=c,r.editRecord=o,r.startEditRecord=s,r.playVideo=p,r.initPage=d,r.initData=f,r.programsData=l;var E=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},v=function(){function e(e,r){var t=[],n=!0,a=!1,u=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(t.push(i.value),!r||t.length!==r);n=!0);}catch(e){a=!0,u=e}finally{try{!n&&c.return&&c.return()}finally{if(a)throw u}}return t}return function(r,t){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return e(r,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_=[n,a,u,i,c,o,s,p,d,f,l].map(regeneratorRuntime.mark),h=function(e){return e.getIn(["programsPage","recordsType"])},O=function(e){return e.getIn(["programsPage","records"]).size},D=function(e){return e.getIn(["programsPage","rubric"])},C=function(e){return e.getIn(["programsPage","searchQuery"])};r.default=[l,f]}});