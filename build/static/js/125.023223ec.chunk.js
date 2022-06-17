(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[125],{1656:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a(88),s=a(14),i=a(132),o=a(15),c=a(129),l=a(2),u=a.n(l),p=a(10),d={support:"light-info",user:"light-success",manager:"light-warning",administrator:"light-primary","restricted-user":"light-danger"},m=[{name:"Name",sortable:!0,minWidth:"350px",cell:function(e){return e.name},selector:function(e){return e.name}},{sortable:!0,minWidth:"350px",name:"Assigned To",cell:function(e){var t=e.assignedTo;return t?t.map((function(e,a){var r=t[t.length-1]===a;return Object(p.jsx)(c.b,{to:"/apps/user/list",className:u()({"me-50":!r}),children:Object(p.jsx)(n.f,{pill:!0,color:d[e],className:"text-capitalize",children:e.replace("-"," ")})},"".concat(e,"-").concat(a))})):null}},{sortable:!0,minWidth:"350px",name:"Created Date",selector:function(e){return e.createdDate},cell:function(e){return e.createdDate},sortFunction:function(e,t){return new Date(t.createdDate)-new Date(e.createdDate)}}],b=a(131),f=a(165),g=a(495),h=a.n(g),j=a(502),v=a.n(j),x=a(483),y=a(866),O=a(935),N=a(840),C=(a(491),function(e){var t=e.role,a=e.setShow,r=e.searchTerm,s=e.rowsPerPage,i=e.handlePerPage,o=e.handleFilter,c=e.handleAssignedToChange;return Object(p.jsxs)(n.ib,{className:"text-nowrap w-100 my-75 g-0 permission-header",children:[Object(p.jsx)(n.B,{xs:12,lg:4,className:"d-flex align-items-center",children:Object(p.jsxs)("div",{className:"d-flex align-items-center justify-content-center justify-content-lg-start",children:[Object(p.jsx)("label",{htmlFor:"rows-per-page",children:"Show"}),Object(p.jsxs)(n.K,{className:"mx-50",type:"select",id:"rows-per-page",value:s,onChange:i,style:{width:"5rem"},children:[Object(p.jsx)("option",{value:"10",children:"10"}),Object(p.jsx)("option",{value:"25",children:"25"}),Object(p.jsx)("option",{value:"50",children:"50"})]}),Object(p.jsx)("label",{htmlFor:"rows-per-page",children:"Entries"})]})}),Object(p.jsx)(n.B,{xs:12,lg:8,children:Object(p.jsxs)("div",{className:"d-flex align-items-center justify-content-lg-end justify-content-start flex-md-nowrap flex-wrap mt-lg-0 mt-1",children:[Object(p.jsxs)("div",{className:"d-flex align-items-center me-1",children:[Object(p.jsx)("label",{className:"mb-0",htmlFor:"search-permission",children:"Search:"}),Object(p.jsx)(n.K,{type:"text",value:r,id:"search-permission",className:"ms-50 w-100",onChange:function(e){return o(e.target.value)}})]}),Object(p.jsx)("div",{className:"mt-50 width-200 me-1 mt-sm-0 mt-1",children:Object(p.jsxs)(n.K,{type:"select",name:"select",value:t,onChange:function(e){return c(e.target.value)},children:[Object(p.jsx)("option",{value:"",children:"Select Role"}),Object(p.jsx)("option",{value:"administrator",children:"Administrator"}),Object(p.jsx)("option",{value:"manager",children:"Manager"}),Object(p.jsx)("option",{value:"user",children:"User"}),Object(p.jsx)("option",{value:"support",children:"Support"}),Object(p.jsx)("option",{value:"restricted-user",children:"Restricted User"})]})}),Object(p.jsx)(n.i,{className:"add-permission mt-sm-0 mt-1",color:"primary",onClick:function(){return a(!0)},children:"Add Permission"})]})})]})}),P=function(){var e=Object(b.b)(),t=Object(b.c)((function(e){return e.permissions})),a=Object(x.f)({defaultValues:{permissionName:""}}),c=a.reset,l=a.control,d=a.setError,g=a.setValue,j=a.handleSubmit,P=a.formState.errors,k=Object(r.useState)(!1),L=Object(o.a)(k,2),w=L[0],S=L[1],E=Object(r.useState)(""),T=Object(o.a)(E,2),R=T[0],D=T[1],B=Object(r.useState)(""),_=Object(o.a)(B,2),A=_[0],H=_[1],q=Object(r.useState)(1),I=Object(o.a)(q,2),V=I[0],F=I[1],K=Object(r.useState)(10),G=Object(o.a)(K,2),M=G[0],W=G[1];Object(r.useEffect)((function(){e(Object(f.d)({assignedTo:R,q:A,page:V,perPage:M}))}),[e,t.data.length]);var J=function(a){a.permissionName.length?(null!==t.selected?e(Object(f.f)({name:a.permissionName,id:t.selected.id})):e(Object(f.a)({name:a.permissionName})),S(!1)):d("permissionName",{type:"manual"})},U=[].concat(Object(i.a)(m),[{name:"Actions",cell:function(t){return Object(p.jsxs)("div",{className:"d-flex align-items-center permissions-actions",children:[Object(p.jsx)(n.i,{size:"sm",color:"transparent",className:"btn btn-icon",onClick:function(){return a=t,e(Object(f.e)(a)),g("permissionName",a.name),void S(!0);var a},children:Object(p.jsx)(y.a,{className:"font-medium-2"})}),Object(p.jsx)(n.i,{size:"sm",color:"transparent",className:"btn btn-icon",onClick:function(){return e(Object(f.c)(t.id))},children:Object(p.jsx)(O.a,{className:"font-medium-2"})})]})}}]),z=function(){c(),S(!1)};return Object(p.jsxs)(r.Fragment,{children:[Object(p.jsx)("div",{className:"react-dataTable",children:Object(p.jsx)(v.a,{noHeader:!0,pagination:!0,subHeader:!0,responsive:!0,paginationServer:!0,columns:U,sortIcon:Object(p.jsx)(N.a,{}),className:"react-dataTable",paginationComponent:function(){var a=Number(Math.ceil(t.total/M));return Object(p.jsx)(h.a,{previousLabel:"",nextLabel:"",pageCount:a||1,activeClassName:"active",forcePage:0!==V?V-1:0,onPageChange:function(t){return function(t){e(Object(f.d)({assignedTo:R,q:A,perPage:M,page:t.selected+1})),F(t.selected+1)}(t)},pageClassName:"page-item",nextLinkClassName:"page-link",nextClassName:"page-item next",previousClassName:"page-item prev",previousLinkClassName:"page-link",pageLinkClassName:"page-link",containerClassName:"pagination react-paginate justify-content-end my-2 pe-1"})},data:function(){var e={q:A},a=Object.keys(e).some((function(t){return e[t].length>0}));return t.data.length>0?t.data:0===t.data.length&&a?[]:t.allData.slice(0,M)}(),subHeaderComponent:Object(p.jsx)(C,{setShow:S,assignedTo:R,searchTerm:A,rowsPerPage:M,handleFilter:function(t){H(t),e(Object(f.d)({q:t,assignedTo:R,page:V,perPage:M}))},handlePerPage:function(t){var a=parseInt(t.currentTarget.value);e(Object(f.d)({assignedTo:R,q:A,perPage:a,page:V})),W(a)},handleAssignedToChange:function(t){D(t),e(Object(f.d)({q:A,assignedTo:t,page:V,perPage:M}))}})})}),Object(p.jsxs)(n.Q,{isOpen:w,onClosed:function(){e(Object(f.e)(null)),g("permissionName","")},toggle:function(){return S(!w)},className:"modal-dialog-centered",children:[Object(p.jsx)(n.T,{className:"bg-transparent",toggle:function(){return S(!w)}}),Object(p.jsxs)(n.R,{className:u()({"p-3 pt-0":null!==t.selected,"px-sm-5 pb-5":null===t.selected}),children:[Object(p.jsxs)("div",{className:"text-center mb-2",children:[Object(p.jsxs)("h1",{className:"mb-1",children:[null!==t.selected?"Edit":"Add New"," Permission"]}),Object(p.jsx)("p",{children:null!==t.selected?"Edit permission as per your requirements.":"Permissions you may use and assign to your users."})]}),null===t.selected?Object(p.jsxs)(n.ib,{tag:n.H,onSubmit:j(J),children:[Object(p.jsxs)(n.B,{xs:12,children:[Object(p.jsx)(n.N,{className:"form-label",for:"permission-name",children:"Permission Name"}),Object(p.jsx)(x.a,{control:l,id:"permissionName",name:"permissionName",render:function(e){var t=e.field;return Object(p.jsx)(n.K,Object(s.a)({placeholder:"Permission Name",invalid:P.permissionName&&!0},t))}}),P&&P.permissionName&&Object(p.jsx)(n.I,{children:"Please enter a valid Permission Name"})]}),Object(p.jsx)(n.B,{xs:12,className:"mt-75",children:Object(p.jsxs)("div",{className:"form-check",children:[Object(p.jsx)(n.K,{type:"checkbox",id:"core-perm-checkbox"}),Object(p.jsx)(n.N,{className:"form-check-label",for:"core-perm-checkbox",children:"Set as core permission"})]})}),Object(p.jsxs)(n.B,{xs:12,className:"text-center mt-2",children:[Object(p.jsx)(n.i,{className:"me-1",color:"primary",children:"Create Permission"}),Object(p.jsx)(n.i,{outline:!0,type:"reset",onClick:z,children:"Discard"})]})]}):Object(p.jsxs)(r.Fragment,{children:[Object(p.jsxs)(n.e,{color:"warning",children:[Object(p.jsx)("h6",{className:"alert-heading",children:"Warning!"}),Object(p.jsx)("div",{className:"alert-body",children:"By editing the permission name, you might break the system permissions functionality. Please ensure you're absolutely certain before proceeding."})]}),Object(p.jsxs)(n.ib,{tag:n.H,onSubmit:j(J),children:[Object(p.jsxs)(n.B,{xs:12,sm:9,children:[Object(p.jsx)(n.N,{className:"form-label",for:"permission-name",children:"Permission Name"}),Object(p.jsx)(x.a,{control:l,id:"permissionName",name:"permissionName",render:function(e){var t=e.field;return Object(p.jsx)(n.K,Object(s.a)({placeholder:"Permission Name",invalid:P.permissionName&&!0},t))}}),P&&P.permissionName&&Object(p.jsx)(n.I,{children:"Please enter a valid Permission Name"})]}),Object(p.jsx)(n.B,{xs:12,sm:3,className:"p-sm-0",children:Object(p.jsx)(n.i,{className:"mt-2",color:"primary",children:"Update"})}),Object(p.jsx)(n.B,{xs:12,className:"mt-75",children:Object(p.jsxs)("div",{className:"form-check",children:[Object(p.jsx)(n.K,{type:"checkbox",id:"core-perm-checkbox"}),Object(p.jsx)(n.N,{className:"form-check-label",for:"core-perm-checkbox",children:"Set as core permission"})]})})]})]})]})]})]})};t.default=function(){return Object(p.jsxs)(r.Fragment,{children:[Object(p.jsx)("h3",{children:"Permissions List"}),Object(p.jsx)("p",{children:"Each category (Basic, Professional, and Business) includes the four predefined roles shown below."}),Object(p.jsx)(n.l,{children:Object(p.jsx)("div",{className:"card-datatable app-user-list table-responsive",children:Object(p.jsx)(P,{})})})]})}},491:function(e,t,a){},495:function(e,t,a){(function(r){var n;e.exports=(n=a(1),function(e){var t={};function a(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,a),n.l=!0,n.exports}return a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=4)}([function(e,t,a){e.exports=a(2)()},function(e,t){e.exports=n},function(e,t,a){"use strict";var r=a(3);function n(){}function s(){}s.resetWarningCache=n,e.exports=function(){function e(e,t,a,n,s,i){if(i!==r){var o=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw o.name="Invariant Violation",o}}function t(){return e}e.isRequired=e;var a={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:s,resetWarningCache:n};return a.PropTypes=a,a}},function(e,t,a){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,a,r){"use strict";r.r(a);var n=r(1),s=r.n(n),i=r(0),o=r.n(i);function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}var l=function(e){var t=e.pageClassName,a=e.pageLinkClassName,r=e.page,n=e.selected,i=e.activeClassName,o=e.activeLinkClassName,l=e.getEventListener,u=e.pageSelectedHandler,p=e.href,d=e.extraAriaContext,m=e.ariaLabel||"Page "+r+(d?" "+d:""),b=null;return n&&(b="page",m=e.ariaLabel||"Page "+r+" is your current page",t=void 0!==t?t+" "+i:i,void 0!==a?void 0!==o&&(a=a+" "+o):a=o),s.a.createElement("li",{className:t},s.a.createElement("a",c({role:"button",className:a,href:p,tabIndex:"0","aria-label":m,"aria-current":b,onKeyPress:u},l(u)),r))};l.propTypes={pageSelectedHandler:o.a.func.isRequired,selected:o.a.bool.isRequired,pageClassName:o.a.string,pageLinkClassName:o.a.string,activeClassName:o.a.string,activeLinkClassName:o.a.string,extraAriaContext:o.a.string,href:o.a.string,ariaLabel:o.a.string,page:o.a.number.isRequired,getEventListener:o.a.func.isRequired};var u=l;function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}!function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(e){var r=void 0!==a?a:t;if(r)if("function"!=typeof r){for(var n in r)if(Object.prototype.hasOwnProperty.call(r,n)){var s=void 0;try{s=r[n]}catch(e){continue}e.register(s,n,"/home/adele/workspace/react-paginate/react_components/PageView.js")}}else e.register(r,"module.exports","/home/adele/workspace/react-paginate/react_components/PageView.js")}}();var d=function(e){var t=e.breakLabel,a=e.breakClassName,r=e.breakLinkClassName,n=e.breakHandler,i=e.getEventListener,o=a||"break";return s.a.createElement("li",{className:o},s.a.createElement("a",p({className:r,role:"button",tabIndex:"0",onKeyPress:n},i(n)),t))};d.propTypes={breakLabel:o.a.oneOfType([o.a.string,o.a.node]),breakClassName:o.a.string,breakLinkClassName:o.a.string,breakHandler:o.a.func.isRequired,getEventListener:o.a.func.isRequired};var m=d;function b(e){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function g(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function j(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,r=y(e);if(t){var n=y(this).constructor;a=Reflect.construct(r,arguments,n)}else a=r.apply(this,arguments);return v(this,a)}}function v(e,t){return!t||"object"!==b(t)&&"function"!=typeof t?x(e):t}function x(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function O(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}!function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(e){var r=void 0!==a?a:t;if(r)if("function"!=typeof r){for(var n in r)if(Object.prototype.hasOwnProperty.call(r,n)){var s=void 0;try{s=r[n]}catch(e){continue}e.register(s,n,"/home/adele/workspace/react-paginate/react_components/BreakView.js")}}else e.register(r,"module.exports","/home/adele/workspace/react-paginate/react_components/BreakView.js")}}();var N=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(i,e);var t,a,r,n=j(i);function i(e){var t,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),O(x(t=n.call(this,e)),"handlePreviousPage",(function(e){var a=t.state.selected;e.preventDefault?e.preventDefault():e.returnValue=!1,a>0&&t.handlePageSelected(a-1,e)})),O(x(t),"handleNextPage",(function(e){var a=t.state.selected,r=t.props.pageCount;e.preventDefault?e.preventDefault():e.returnValue=!1,a<r-1&&t.handlePageSelected(a+1,e)})),O(x(t),"handlePageSelected",(function(e,a){a.preventDefault?a.preventDefault():a.returnValue=!1,t.state.selected!==e&&(t.setState({selected:e}),t.callCallback(e))})),O(x(t),"getEventListener",(function(e){return O({},t.props.eventListener,e)})),O(x(t),"handleBreakClick",(function(e,a){a.preventDefault?a.preventDefault():a.returnValue=!1;var r=t.state.selected;t.handlePageSelected(r<e?t.getForwardJump():t.getBackwardJump(),a)})),O(x(t),"callCallback",(function(e){void 0!==t.props.onPageChange&&"function"==typeof t.props.onPageChange&&t.props.onPageChange({selected:e})})),O(x(t),"pagination",(function(){var e=[],a=t.props,r=a.pageRangeDisplayed,n=a.pageCount,i=a.marginPagesDisplayed,o=a.breakLabel,c=a.breakClassName,l=a.breakLinkClassName,u=t.state.selected;if(n<=r)for(var p=0;p<n;p++)e.push(t.getPageElement(p));else{var d,b,f,g=r/2,h=r-g;u>n-r/2?g=r-(h=n-u):u<r/2&&(h=r-(g=u));var j=function(e){return t.getPageElement(e)};for(d=0;d<n;d++)(b=d+1)<=i||b>n-i||d>=u-g&&d<=u+h?e.push(j(d)):o&&e[e.length-1]!==f&&(f=s.a.createElement(m,{key:d,breakLabel:o,breakClassName:c,breakLinkClassName:l,breakHandler:t.handleBreakClick.bind(null,d),getEventListener:t.getEventListener}),e.push(f))}return e})),a=e.initialPage?e.initialPage:e.forcePage?e.forcePage:0,t.state={selected:a},t}return t=i,(a=[{key:"componentDidMount",value:function(){var e=this.props,t=e.initialPage,a=e.disableInitialCallback,r=e.extraAriaContext;void 0===t||a||this.callCallback(t),r&&console.warn("DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead.")}},{key:"componentDidUpdate",value:function(e){void 0!==this.props.forcePage&&this.props.forcePage!==e.forcePage&&this.setState({selected:this.props.forcePage})}},{key:"getForwardJump",value:function(){var e=this.state.selected,t=this.props,a=t.pageCount,r=e+t.pageRangeDisplayed;return r>=a?a-1:r}},{key:"getBackwardJump",value:function(){var e=this.state.selected-this.props.pageRangeDisplayed;return e<0?0:e}},{key:"hrefBuilder",value:function(e){var t=this.props,a=t.hrefBuilder,r=t.pageCount;if(a&&e!==this.state.selected&&e>=0&&e<r)return a(e+1)}},{key:"ariaLabelBuilder",value:function(e){var t=e===this.state.selected;if(this.props.ariaLabelBuilder&&e>=0&&e<this.props.pageCount){var a=this.props.ariaLabelBuilder(e+1,t);return this.props.extraAriaContext&&!t&&(a=a+" "+this.props.extraAriaContext),a}}},{key:"getPageElement",value:function(e){var t=this.state.selected,a=this.props,r=a.pageClassName,n=a.pageLinkClassName,i=a.activeClassName,o=a.activeLinkClassName,c=a.extraAriaContext;return s.a.createElement(u,{key:e,pageSelectedHandler:this.handlePageSelected.bind(null,e),selected:t===e,pageClassName:r,pageLinkClassName:n,activeClassName:i,activeLinkClassName:o,extraAriaContext:c,href:this.hrefBuilder(e),ariaLabel:this.ariaLabelBuilder(e),page:e+1,getEventListener:this.getEventListener})}},{key:"render",value:function(){var e=this.props,t=e.disabledClassName,a=e.pageCount,r=e.containerClassName,n=e.previousLabel,i=e.previousClassName,o=e.previousLinkClassName,c=e.previousAriaLabel,l=e.prevRel,u=e.nextLabel,p=e.nextClassName,d=e.nextLinkClassName,m=e.nextAriaLabel,b=e.nextRel,g=this.state.selected,h=i+(0===g?" ".concat(t):""),j=p+(g===a-1?" ".concat(t):""),v=0===g?"true":"false",x=g===a-1?"true":"false";return s.a.createElement("ul",{className:r},s.a.createElement("li",{className:h},s.a.createElement("a",f({className:o,href:this.hrefBuilder(g-1),tabIndex:"0",role:"button",onKeyPress:this.handlePreviousPage,"aria-disabled":v,"aria-label":c,rel:l},this.getEventListener(this.handlePreviousPage)),n)),this.pagination(),s.a.createElement("li",{className:j},s.a.createElement("a",f({className:d,href:this.hrefBuilder(g+1),tabIndex:"0",role:"button",onKeyPress:this.handleNextPage,"aria-disabled":x,"aria-label":m,rel:b},this.getEventListener(this.handleNextPage)),u)))}}])&&g(t.prototype,a),r&&g(t,r),i}(n.Component);O(N,"propTypes",{pageCount:o.a.number.isRequired,pageRangeDisplayed:o.a.number.isRequired,marginPagesDisplayed:o.a.number.isRequired,previousLabel:o.a.node,previousAriaLabel:o.a.string,prevRel:o.a.string,nextLabel:o.a.node,nextAriaLabel:o.a.string,nextRel:o.a.string,breakLabel:o.a.oneOfType([o.a.string,o.a.node]),hrefBuilder:o.a.func,onPageChange:o.a.func,initialPage:o.a.number,forcePage:o.a.number,disableInitialCallback:o.a.bool,containerClassName:o.a.string,pageClassName:o.a.string,pageLinkClassName:o.a.string,activeClassName:o.a.string,activeLinkClassName:o.a.string,previousClassName:o.a.string,nextClassName:o.a.string,previousLinkClassName:o.a.string,nextLinkClassName:o.a.string,disabledClassName:o.a.string,breakClassName:o.a.string,breakLinkClassName:o.a.string,extraAriaContext:o.a.string,ariaLabelBuilder:o.a.func,eventListener:o.a.string}),O(N,"defaultProps",{pageCount:10,pageRangeDisplayed:2,marginPagesDisplayed:3,activeClassName:"selected",previousLabel:"Previous",previousClassName:"previous",previousAriaLabel:"Previous page",prevRel:"prev",nextLabel:"Next",nextClassName:"next",nextAriaLabel:"Next page",nextRel:"next",breakLabel:"...",disabledClassName:"disabled",disableInitialCallback:!1,eventListener:"onClick"}),function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(e){var r=void 0!==a?a:t;if(r)if("function"!=typeof r){for(var n in r)if(Object.prototype.hasOwnProperty.call(r,n)){var s=void 0;try{s=r[n]}catch(e){continue}e.register(s,n,"/home/adele/workspace/react-paginate/react_components/PaginationBoxView.js")}}else e.register(r,"module.exports","/home/adele/workspace/react-paginate/react_components/PaginationBoxView.js")}}(),a.default=N,function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(e){var r=void 0!==a?a:t;if(r)if("function"!=typeof r){for(var n in r)if(Object.prototype.hasOwnProperty.call(r,n)){var s=void 0;try{s=r[n]}catch(e){continue}e.register(s,n,"/home/adele/workspace/react-paginate/react_components/index.js")}}else e.register(r,"module.exports","/home/adele/workspace/react-paginate/react_components/index.js")}}()}]))}).call(this,a(18))}}]);
//# sourceMappingURL=125.023223ec.chunk.js.map