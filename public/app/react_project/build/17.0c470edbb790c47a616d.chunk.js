webpackJsonp([17],{"./app/containers/ReadyPage/constants.js":function(e,n,a){"use strict";a.d(n,"c",function(){return t}),a.d(n,"d",function(){return r}),a.d(n,"e",function(){return d}),a.d(n,"f",function(){return s}),a.d(n,"g",function(){return i}),a.d(n,"h",function(){return o}),a.d(n,"b",function(){return u}),a.d(n,"a",function(){return c});var t="app/ReadyPage/LOAD_READY_NEWS",r="app/ReadyPage/LOAD_READY_NEWS_SUCCESS",d="app/ReadyPage/LOAD_READY_NEWS_FAILURE",s="app/ReadyPage/PUBLISH_ARTICLE",i="app/ReadyPage/PUBLISH_ARTICLE_SUCCESS",o="app/ReadyPage/PUBLISH_ARTICLE_FAILURE",u="app/ReadyPage/SET_FILTERS",c=[{id:1,title:"По времени",value:"datetime"},{id:2,title:"По важности",value:"top"}]},"./app/containers/ReadyPage/reducer.js":function(e,n,a){"use strict";function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,n=arguments[1];switch(n.type){case d.c:return e.setIn(["news","loading"],!0);case d.d:var t=e.getIn(["news","data"]).map(function(e){return e.get("id")});return e.getIn(["news","initialLoad"])?t=e.getIn(["news","showed"]):localStorage.setItem("readyShowed",JSON.stringify(t.toJS())),e.setIn(["news","showed"],t).setIn(["news","data"],a.i(r.fromJS)(n.payload)).setIn(["news","loading"],!1).setIn(["news","initialLoad"],!1);case d.e:return e.setIn(["news","loading"],!1);case d.b:return e.mergeIn(["news","search"],n.payload);case d.g:return e.updateIn(["news","data"],function(e){return e.filter(function(e){return e.get("id")!==n.payload})});default:return e}}Object.defineProperty(n,"__esModule",{value:!0});var r=a("./node_modules/immutable/dist/immutable.js"),d=(a.n(r),a("./app/containers/ReadyPage/constants.js")),s=a.i(r.fromJS)({news:{search:{},loading:!1,data:[],showed:JSON.parse(localStorage.getItem("readyShowed"))||[],initialLoad:!0}});n.default=t}});