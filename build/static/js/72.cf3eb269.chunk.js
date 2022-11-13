(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[72],{1646:function(e,t,a){"use strict";a.r(t);var n=a(14),r=a(15),s=a(1),i=a(130),c=a(486),l=a(140),o=a(151),u=a(874),d=a(871),p=a(909),f=a(841),b=a(955),m=a(940),g=a(89),h=a(10),j=function(e){c.a,e.avatarColor,e.name},v={pending:"light-warning",active:"light-success",inactive:"light-secondary"},x=[{name:"Service",sortable:!0,minWidth:"300px",sortField:"name",selector:function(e){return e.name},cell:function(e){return Object(h.jsxs)("div",{className:"d-flex justify-content-left align-items-center",children:[j(e),Object(h.jsx)("div",{className:"d-flex flex-column",children:Object(h.jsx)(i.b,{to:"/service/view/".concat(e.id),className:"user_name text-truncate text-body",onClick:function(){return l.a.dispatch(Object(o.d)(e.id))},children:Object(h.jsx)("span",{className:"fw-bolder",children:e.name})})})]})}},{name:"Category",sortable:!0,minWidth:"172px",sortField:"role",selector:function(e){return e.category},cell:function(e){return Object(h.jsx)("span",{className:"text-capitalize",children:e.category})}},{name:"Status",minWidth:"138px",sortable:!0,sortField:"status",selector:function(e){return e.status},cell:function(e){return Object(h.jsx)(g.f,{className:"text-capitalize",color:v[e.status],pill:!0,children:e.status})}},{name:"Actions",minWidth:"100px",cell:function(e){return Object(h.jsxs)("div",{className:"column-action d-flex align-items-center",children:[Object(h.jsx)(g.B,{tag:i.b,lg:4,to:"/service/view/".concat(e.id),onClick:function(){return l.a.dispatch(Object(o.d)(e.id))},children:Object(h.jsx)(u.a,{className:"cursor-pointer mt-0",size:16})}),Object(h.jsx)(g.B,{lg:4,tag:i.b,to:"/service/edit/".concat(e.id),onClick:function(){return l.a.dispatch(Object(o.d)(e.id))},children:Object(h.jsx)(d.a,{className:"cursor-pointer ms-1 mt-0",size:16})}),Object(h.jsxs)(g.wb,{children:[Object(h.jsx)(g.G,{tag:"div",className:"btn btn-sm",children:Object(h.jsx)(p.a,{size:14,className:"cursor-pointer"})}),Object(h.jsxs)(g.F,{children:[Object(h.jsxs)(g.E,{tag:"a",href:"/",className:"w-100",onClick:function(e){return e.preventDefault()},children:[Object(h.jsx)(f.a,{size:14,className:"me-50"}),Object(h.jsx)("span",{className:"align-middle",children:"Mark as Active"})]}),Object(h.jsxs)(g.E,{tag:"a",href:"/",className:"w-100",onClick:function(e){return e.preventDefault()},children:[Object(h.jsx)(b.a,{size:14,className:"me-50"}),Object(h.jsx)("span",{className:"align-middle",children:"Mark as Inactive"})]}),Object(h.jsxs)(g.E,{tag:"a",href:"/",className:"w-100",onClick:function(t){t.preventDefault(),l.a.dispatch(Object(o.b)(e.id))},children:[Object(h.jsx)(m.a,{size:14,className:"me-50"}),Object(h.jsx)("span",{className:"align-middle",children:"Delete"})]})]})]})]})}}],O=a(131),y=a(495),N=a.n(y),C=a(503),k=a.n(C),P=a(926),w=a(919),L=a(879),E=a(886),S=a(880),R=a(858),_=a(844),D=(a(491),a(494),function(e){var t=e.store,a=e.handlePerPage,n=e.rowsPerPage,r=e.handleFilter,s=e.searchTerm;function c(e){var a=document.createElement("a"),n=function(e){var a,n=Object.keys(t.data[0]);return a="",a+=n.join(","),a+="\n",e.forEach((function(e){var t=0;n.forEach((function(n){t>0&&(a+=","),a+=e[n],t++})),a+="\n"})),a}(e);if(null!==n){n.match(/^data:text\/csv/i)||(n="data:text/csv;charset=utf-8,".concat(n)),a.setAttribute("href",encodeURI(n)),a.setAttribute("download","export.csv"),a.click()}}return Object(h.jsx)("div",{className:"invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75",children:Object(h.jsxs)(g.ib,{children:[Object(h.jsx)(g.B,{xl:"6",className:"d-flex align-items-center p-0",children:Object(h.jsxs)("div",{className:"d-flex align-items-center w-100",children:[Object(h.jsx)("label",{htmlFor:"rows-per-page",children:"Show"}),Object(h.jsxs)(g.K,{className:"mx-50",type:"select",id:"rows-per-page",value:n,onChange:a,style:{width:"5rem"},children:[Object(h.jsx)("option",{value:"10",children:"10"}),Object(h.jsx)("option",{value:"25",children:"25"}),Object(h.jsx)("option",{value:"50",children:"50"})]}),Object(h.jsx)("label",{htmlFor:"rows-per-page",children:"Entries"})]})}),Object(h.jsxs)(g.B,{xl:"6",className:"d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1",children:[Object(h.jsxs)("div",{className:"d-flex align-items-center mb-sm-0 mb-1 me-1",children:[Object(h.jsx)("label",{className:"mb-0",htmlFor:"search-invoice",children:"Search:"}),Object(h.jsx)(g.K,{id:"search-invoice",className:"ms-50 w-100",type:"text",value:s,onChange:function(e){return r(e.target.value)}})]}),Object(h.jsxs)("div",{className:"d-flex align-items-center table-header-actions",children:[Object(h.jsxs)(g.wb,{className:"me-1",children:[Object(h.jsxs)(g.G,{color:"secondary",caret:!0,outline:!0,children:[Object(h.jsx)(P.a,{className:"font-small-4 me-50"}),Object(h.jsx)("span",{className:"align-middle",children:"Export"})]}),Object(h.jsxs)(g.F,{children:[Object(h.jsxs)(g.E,{className:"w-100",children:[Object(h.jsx)(w.a,{className:"font-small-4 me-50"}),Object(h.jsx)("span",{className:"align-middle",children:"Print"})]}),Object(h.jsxs)(g.E,{className:"w-100",onClick:function(){return c(t.data)},children:[Object(h.jsx)(L.a,{className:"font-small-4 me-50"}),Object(h.jsx)("span",{className:"align-middle",children:"CSV"})]}),Object(h.jsxs)(g.E,{className:"w-100",children:[Object(h.jsx)(E.a,{className:"font-small-4 me-50"}),Object(h.jsx)("span",{className:"align-middle",children:"Excel"})]}),Object(h.jsxs)(g.E,{className:"w-100",children:[Object(h.jsx)(S.a,{className:"font-small-4 me-50"}),Object(h.jsx)("span",{className:"align-middle",children:"PDF"})]}),Object(h.jsxs)(g.E,{className:"w-100",children:[Object(h.jsx)(R.a,{className:"font-small-4 me-50"}),Object(h.jsx)("span",{className:"align-middle",children:"Copy"})]})]})]}),Object(h.jsx)(g.i,{className:"add-new-user",color:"primary",tag:i.b,to:"/service/add",children:"Add Service"})]})]})]})})}),T=function(){var e=Object(O.b)(),t=Object(O.c)((function(e){return e.users})),a=Object(s.useState)("desc"),i=Object(r.a)(a,2),c=i[0],l=i[1],u=Object(s.useState)(""),d=Object(r.a)(u,2),p=d[0],f=d[1],b=Object(s.useState)(1),m=Object(r.a)(b,2),j=m[0],v=m[1],y=Object(s.useState)("id"),C=Object(r.a)(y,2),P=C[0],w=C[1],L=Object(s.useState)(10),E=Object(r.a)(L,2),S=E[0],R=E[1],T=Object(s.forwardRef)((function(e,t){return Object(h.jsx)("div",{className:"form-check",children:Object(h.jsx)(g.K,Object(n.a)({type:"checkbox",ref:t},e))})}));Object(s.useEffect)((function(){e(Object(o.c)({sort:c,sortColumn:P,q:p,page:j,perPage:S}))}),[e,t.data.length,c,P,j]);return Object(h.jsx)(s.Fragment,{children:Object(h.jsx)(g.l,{className:"overflow-hidden",children:Object(h.jsx)("div",{className:"react-dataTable",children:Object(h.jsx)(k.a,{noHeader:!0,subHeader:!0,sortServer:!0,pagination:!0,responsive:!0,selectableRows:!0,paginationServer:!0,columns:x,onSort:function(t,a){l(a),w(t.sortField),e(Object(o.c)({sort:c,sortColumn:P,q:p,page:j,perPage:S}))},sortIcon:Object(h.jsx)(_.a,{}),className:"react-dataTable",paginationComponent:function(){var a=Number(Math.ceil(t.total/S));return Object(h.jsx)(N.a,{previousLabel:"",nextLabel:"",pageCount:a||1,activeClassName:"active",forcePage:0!==j?j-1:0,onPageChange:function(t){return function(t){e(Object(o.c)({sort:c,sortColumn:P,q:p,perPage:S,page:t.selected+1})),v(t.selected+1)}(t)},pageClassName:"page-item",nextLinkClassName:"page-link",nextClassName:"page-item next",previousClassName:"page-item prev",previousLinkClassName:"page-link",pageLinkClassName:"page-link",containerClassName:"pagination react-paginate justify-content-end my-2 pe-1"})},data:function(){var e={q:p},a=Object.keys(e).some((function(t){return e[t].length>0}));return t.data.length>0?t.data:0===t.data.length&&a?[]:t.allData.slice(0,S)}(),selectableRowsComponent:T,subHeaderComponent:Object(h.jsx)(D,{store:t,searchTerm:p,rowsPerPage:S,handleFilter:function(t){f(t),e(Object(o.c)({sort:c,q:t,sortColumn:P,page:j,perPage:S}))},handlePerPage:function(t){var a=parseInt(t.currentTarget.value);e(Object(o.c)({sort:c,sortColumn:P,q:p,perPage:a,page:j})),R(a)}})})})})})};a(544),a(507),t.default=function(){return Object(h.jsx)("div",{className:"app-user-list",children:Object(h.jsx)(T,{})})}},494:function(e,t,a){},495:function(e,t,a){(function(n){var r;e.exports=(r=a(1),function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}return a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=4)}([function(e,t,a){e.exports=a(2)()},function(e,t){e.exports=r},function(e,t,a){"use strict";var n=a(3);function r(){}function s(){}s.resetWarningCache=r,e.exports=function(){function e(e,t,a,r,s,i){if(i!==n){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var a={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:s,resetWarningCache:r};return a.PropTypes=a,a}},function(e,t,a){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,a,n){"use strict";n.r(a);var r=n(1),s=n.n(r),i=n(0),c=n.n(i);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var o=function(e){var t=e.pageClassName,a=e.pageLinkClassName,n=e.page,r=e.selected,i=e.activeClassName,c=e.activeLinkClassName,o=e.getEventListener,u=e.pageSelectedHandler,d=e.href,p=e.extraAriaContext,f=e.ariaLabel||"Page "+n+(p?" "+p:""),b=null;return r&&(b="page",f=e.ariaLabel||"Page "+n+" is your current page",t=void 0!==t?t+" "+i:i,void 0!==a?void 0!==c&&(a=a+" "+c):a=c),s.a.createElement("li",{className:t},s.a.createElement("a",l({role:"button",className:a,href:d,tabIndex:"0","aria-label":f,"aria-current":b,onKeyPress:u},o(u)),n))};o.propTypes={pageSelectedHandler:c.a.func.isRequired,selected:c.a.bool.isRequired,pageClassName:c.a.string,pageLinkClassName:c.a.string,activeClassName:c.a.string,activeLinkClassName:c.a.string,extraAriaContext:c.a.string,href:c.a.string,ariaLabel:c.a.string,page:c.a.number.isRequired,getEventListener:c.a.func.isRequired};var u=o;function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}!function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(e){var n=void 0!==a?a:t;if(n)if("function"!=typeof n){for(var r in n)if(Object.prototype.hasOwnProperty.call(n,r)){var s=void 0;try{s=n[r]}catch(e){continue}e.register(s,r,"/home/adele/workspace/react-paginate/react_components/PageView.js")}}else e.register(n,"module.exports","/home/adele/workspace/react-paginate/react_components/PageView.js")}}();var p=function(e){var t=e.breakLabel,a=e.breakClassName,n=e.breakLinkClassName,r=e.breakHandler,i=e.getEventListener,c=a||"break";return s.a.createElement("li",{className:c},s.a.createElement("a",d({className:n,role:"button",tabIndex:"0",onKeyPress:r},i(r)),t))};p.propTypes={breakLabel:c.a.oneOfType([c.a.string,c.a.node]),breakClassName:c.a.string,breakLinkClassName:c.a.string,breakHandler:c.a.func.isRequired,getEventListener:c.a.func.isRequired};var f=p;function b(e){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function g(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function j(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=O(e);if(t){var r=O(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return v(this,a)}}function v(e,t){return!t||"object"!==b(t)&&"function"!=typeof t?x(e):t}function x(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}!function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(e){var n=void 0!==a?a:t;if(n)if("function"!=typeof n){for(var r in n)if(Object.prototype.hasOwnProperty.call(n,r)){var s=void 0;try{s=n[r]}catch(e){continue}e.register(s,r,"/home/adele/workspace/react-paginate/react_components/BreakView.js")}}else e.register(n,"module.exports","/home/adele/workspace/react-paginate/react_components/BreakView.js")}}();var N=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(i,e);var t,a,n,r=j(i);function i(e){var t,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),y(x(t=r.call(this,e)),"handlePreviousPage",(function(e){var a=t.state.selected;e.preventDefault?e.preventDefault():e.returnValue=!1,a>0&&t.handlePageSelected(a-1,e)})),y(x(t),"handleNextPage",(function(e){var a=t.state.selected,n=t.props.pageCount;e.preventDefault?e.preventDefault():e.returnValue=!1,a<n-1&&t.handlePageSelected(a+1,e)})),y(x(t),"handlePageSelected",(function(e,a){a.preventDefault?a.preventDefault():a.returnValue=!1,t.state.selected!==e&&(t.setState({selected:e}),t.callCallback(e))})),y(x(t),"getEventListener",(function(e){return y({},t.props.eventListener,e)})),y(x(t),"handleBreakClick",(function(e,a){a.preventDefault?a.preventDefault():a.returnValue=!1;var n=t.state.selected;t.handlePageSelected(n<e?t.getForwardJump():t.getBackwardJump(),a)})),y(x(t),"callCallback",(function(e){void 0!==t.props.onPageChange&&"function"==typeof t.props.onPageChange&&t.props.onPageChange({selected:e})})),y(x(t),"pagination",(function(){var e=[],a=t.props,n=a.pageRangeDisplayed,r=a.pageCount,i=a.marginPagesDisplayed,c=a.breakLabel,l=a.breakClassName,o=a.breakLinkClassName,u=t.state.selected;if(r<=n)for(var d=0;d<r;d++)e.push(t.getPageElement(d));else{var p,b,m,g=n/2,h=n-g;u>r-n/2?g=n-(h=r-u):u<n/2&&(h=n-(g=u));var j=function(e){return t.getPageElement(e)};for(p=0;p<r;p++)(b=p+1)<=i||b>r-i||p>=u-g&&p<=u+h?e.push(j(p)):c&&e[e.length-1]!==m&&(m=s.a.createElement(f,{key:p,breakLabel:c,breakClassName:l,breakLinkClassName:o,breakHandler:t.handleBreakClick.bind(null,p),getEventListener:t.getEventListener}),e.push(m))}return e})),a=e.initialPage?e.initialPage:e.forcePage?e.forcePage:0,t.state={selected:a},t}return t=i,(a=[{key:"componentDidMount",value:function(){var e=this.props,t=e.initialPage,a=e.disableInitialCallback,n=e.extraAriaContext;void 0===t||a||this.callCallback(t),n&&console.warn("DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead.")}},{key:"componentDidUpdate",value:function(e){void 0!==this.props.forcePage&&this.props.forcePage!==e.forcePage&&this.setState({selected:this.props.forcePage})}},{key:"getForwardJump",value:function(){var e=this.state.selected,t=this.props,a=t.pageCount,n=e+t.pageRangeDisplayed;return n>=a?a-1:n}},{key:"getBackwardJump",value:function(){var e=this.state.selected-this.props.pageRangeDisplayed;return e<0?0:e}},{key:"hrefBuilder",value:function(e){var t=this.props,a=t.hrefBuilder,n=t.pageCount;if(a&&e!==this.state.selected&&e>=0&&e<n)return a(e+1)}},{key:"ariaLabelBuilder",value:function(e){var t=e===this.state.selected;if(this.props.ariaLabelBuilder&&e>=0&&e<this.props.pageCount){var a=this.props.ariaLabelBuilder(e+1,t);return this.props.extraAriaContext&&!t&&(a=a+" "+this.props.extraAriaContext),a}}},{key:"getPageElement",value:function(e){var t=this.state.selected,a=this.props,n=a.pageClassName,r=a.pageLinkClassName,i=a.activeClassName,c=a.activeLinkClassName,l=a.extraAriaContext;return s.a.createElement(u,{key:e,pageSelectedHandler:this.handlePageSelected.bind(null,e),selected:t===e,pageClassName:n,pageLinkClassName:r,activeClassName:i,activeLinkClassName:c,extraAriaContext:l,href:this.hrefBuilder(e),ariaLabel:this.ariaLabelBuilder(e),page:e+1,getEventListener:this.getEventListener})}},{key:"render",value:function(){var e=this.props,t=e.disabledClassName,a=e.pageCount,n=e.containerClassName,r=e.previousLabel,i=e.previousClassName,c=e.previousLinkClassName,l=e.previousAriaLabel,o=e.prevRel,u=e.nextLabel,d=e.nextClassName,p=e.nextLinkClassName,f=e.nextAriaLabel,b=e.nextRel,g=this.state.selected,h=i+(0===g?" ".concat(t):""),j=d+(g===a-1?" ".concat(t):""),v=0===g?"true":"false",x=g===a-1?"true":"false";return s.a.createElement("ul",{className:n},s.a.createElement("li",{className:h},s.a.createElement("a",m({className:c,href:this.hrefBuilder(g-1),tabIndex:"0",role:"button",onKeyPress:this.handlePreviousPage,"aria-disabled":v,"aria-label":l,rel:o},this.getEventListener(this.handlePreviousPage)),r)),this.pagination(),s.a.createElement("li",{className:j},s.a.createElement("a",m({className:p,href:this.hrefBuilder(g+1),tabIndex:"0",role:"button",onKeyPress:this.handleNextPage,"aria-disabled":x,"aria-label":f,rel:b},this.getEventListener(this.handleNextPage)),u)))}}])&&g(t.prototype,a),n&&g(t,n),i}(r.Component);y(N,"propTypes",{pageCount:c.a.number.isRequired,pageRangeDisplayed:c.a.number.isRequired,marginPagesDisplayed:c.a.number.isRequired,previousLabel:c.a.node,previousAriaLabel:c.a.string,prevRel:c.a.string,nextLabel:c.a.node,nextAriaLabel:c.a.string,nextRel:c.a.string,breakLabel:c.a.oneOfType([c.a.string,c.a.node]),hrefBuilder:c.a.func,onPageChange:c.a.func,initialPage:c.a.number,forcePage:c.a.number,disableInitialCallback:c.a.bool,containerClassName:c.a.string,pageClassName:c.a.string,pageLinkClassName:c.a.string,activeClassName:c.a.string,activeLinkClassName:c.a.string,previousClassName:c.a.string,nextClassName:c.a.string,previousLinkClassName:c.a.string,nextLinkClassName:c.a.string,disabledClassName:c.a.string,breakClassName:c.a.string,breakLinkClassName:c.a.string,extraAriaContext:c.a.string,ariaLabelBuilder:c.a.func,eventListener:c.a.string}),y(N,"defaultProps",{pageCount:10,pageRangeDisplayed:2,marginPagesDisplayed:3,activeClassName:"selected",previousLabel:"Previous",previousClassName:"previous",previousAriaLabel:"Previous page",prevRel:"prev",nextLabel:"Next",nextClassName:"next",nextAriaLabel:"Next page",nextRel:"next",breakLabel:"...",disabledClassName:"disabled",disableInitialCallback:!1,eventListener:"onClick"}),function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(e){var n=void 0!==a?a:t;if(n)if("function"!=typeof n){for(var r in n)if(Object.prototype.hasOwnProperty.call(n,r)){var s=void 0;try{s=n[r]}catch(e){continue}e.register(s,r,"/home/adele/workspace/react-paginate/react_components/PaginationBoxView.js")}}else e.register(n,"module.exports","/home/adele/workspace/react-paginate/react_components/PaginationBoxView.js")}}(),a.default=N,function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(e){var n=void 0!==a?a:t;if(n)if("function"!=typeof n){for(var r in n)if(Object.prototype.hasOwnProperty.call(n,r)){var s=void 0;try{s=n[r]}catch(e){continue}e.register(s,r,"/home/adele/workspace/react-paginate/react_components/index.js")}}else e.register(n,"module.exports","/home/adele/workspace/react-paginate/react_components/index.js")}}()}]))}).call(this,a(18))},507:function(e,t,a){},544:function(e,t,a){"use strict";var n=a(28),r=a(3),s=a.n(r),i=a(89),c=a(10);t.a=function(e){var t=e.icon,a=e.color,r=e.stats,l=e.renderStats,o=e.statTitle,u=e.className,d=e.statsMargin;return Object(c.jsx)(i.l,{children:Object(c.jsx)(i.m,{className:u,children:Object(c.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[Object(c.jsxs)("div",{children:[l||Object(c.jsx)("h2",{className:s()("fw-bolder",Object(n.a)({"mb-0":!d},d,d)),children:r}),Object(c.jsx)("p",{className:"card-text",children:o})]}),Object(c.jsx)("div",{className:"avatar avatar-stats p-50 m-0 ".concat(a?"bg-light-".concat(a):"bg-light-primary"),children:Object(c.jsx)("div",{className:"avatar-content",children:t})})]})})})}}}]);
//# sourceMappingURL=72.cf3eb269.chunk.js.map