webpackJsonp([1],{"./app/containers/Help/constants.js":function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n.d(t,"b",function(){return p}),n.d(t,"c",function(){return s});var a="app/Help/GET_LINKS",p="app/Help/GET_LINKS_SUCCESS",s="app/Help/GET_LINKS_FAILURE"},"./app/containers/Help/reducer.js":function(e,t,n){"use strict";function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments[1];switch(t.type){case s.b:return e.setIn(["links","data"],t.payload.wikipedia);default:return e}}Object.defineProperty(t,"__esModule",{value:!0});var p=n("./node_modules/immutable/dist/immutable.js"),s=(n.n(p),n("./app/containers/Help/constants.js")),i=n.i(p.fromJS)({links:{data:[]},page:{data:""}});t.default=a}});