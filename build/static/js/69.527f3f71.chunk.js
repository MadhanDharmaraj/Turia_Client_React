(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[69],{1477:function(e,t,n){},1541:function(e,t,n){"use strict";n.r(t);var r=n(17),c=n(1),o=n(5),a=n.n(o),s=n(135),i=n(495),l=n(859),u=n(836),d=n(799),p=n(497),b=n(496),f=n(90),j=(n(1477),n(12));t.default=function(){var e=[],t=Object(c.useState)([]),n=Object(r.a)(t,2),o=n[0],m=n[1],h=Object(c.useState)([]),O=Object(r.a)(h,2),y=O[0],x=O[1],g=Object(c.useState)(null),v=Object(r.a)(g,2),w=v[0],C=v[1];for(var N in i)e.push(N);return Object(j.jsxs)(c.Fragment,{children:[Object(j.jsx)(b.a,{title:"Feather Icons",data:[{title:"UI"},{title:"Feather Icons"}]}),Object(j.jsx)(f.jb,{children:Object(j.jsx)(f.B,{sm:"12",children:Object(j.jsx)("div",{className:"icon-search-wrapper my-3 mx-auto",children:Object(j.jsxs)(f.M,{className:"input-group-merge mb-1",children:[Object(j.jsx)(f.N,{children:Object(j.jsx)(u.a,{size:14})}),Object(j.jsx)(f.L,{placeholder:"Search icons...",onChange:function(t){!function(t){var n=[];t.length&&e.filter((function(e){e.toLowerCase().includes(t.toLowerCase())&&n.push(e)})),x([].concat(n))}(t.target.value),m(t.target.value)}})]})})})}),Object(j.jsx)("div",{className:"d-flex flex-wrap",id:"icons-container",children:function(){var t=o.length?y:e;return t.length?t.map((function(e){var t=i[e];return Object(j.jsxs)(c.Fragment,{children:[Object(j.jsx)(d.CopyToClipboard,{text:"<".concat(e," />"),children:Object(j.jsx)(f.l,{id:e,className:a()("icon-card cursor-pointer text-center mb-2 mx-50",{active:w===e}),onClick:function(){return function(e){C(e),Object(s.b)((function(){return Object(j.jsxs)("div",{className:"d-flex",children:[Object(j.jsx)("div",{className:"me-1",children:Object(j.jsx)(p.a,{size:"sm",color:"success",icon:Object(j.jsx)(l.a,{size:12})})}),Object(j.jsxs)("div",{className:"d-flex flex-column",children:[Object(j.jsx)("h6",{className:"toast-title",children:"Icon Name Copied! \ud83d\udccb"}),Object(j.jsx)("span",{role:"img","aria-label":"toast-text",children:e})]})]})}))}(e)},children:Object(j.jsxs)(f.m,{children:[Object(j.jsx)("div",{className:"icon-wrapper",children:Object(j.jsx)(t,{})}),Object(j.jsx)("p",{className:"icon-name text-truncate mb-0 mt-1",children:e})]})})}),Object(j.jsx)(f.zb,{placement:"top",target:e,children:e.replace(/([A-Z])/g," $1").trim()})]},e)})):Object(j.jsx)("div",{className:"d-flex align-items-center justify-content-center w-100",children:Object(j.jsx)("h4",{className:"mb-0",children:"No Icons Found!"})})}()})]})}},496:function(e,t,n){"use strict";var r=n(16),c=n(1),o=n(131),a=n(5),s=n.n(a),i=n(902),l=n(858),u=n(832),d=n(830),p=n(831),b=n(90),f=n(12);t.a=function(e){var t=e.data,n=e.title;return Object(f.jsxs)("div",{className:"content-header row",children:[Object(f.jsx)("div",{className:"content-header-left col-md-9 col-12 mb-2",children:Object(f.jsx)("div",{className:"row breadcrumbs-top",children:Object(f.jsxs)("div",{className:"col-12",children:[n?Object(f.jsx)("h2",{className:"content-header-title float-start mb-0",children:n}):"",Object(f.jsx)("div",{className:"breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12",children:Object(f.jsxs)(b.g,{children:[Object(f.jsx)(b.h,{tag:"li",children:Object(f.jsx)(o.b,{to:"/",children:"Home"})}),t.map((function(e,n){var a=e.link?o.b:c.Fragment,i=t.length-1===n;return Object(f.jsx)(b.h,{tag:"li",active:!i,className:s()({"text-primary":!i}),children:Object(f.jsx)(a,Object(r.a)(Object(r.a)({},e.link?{to:e.link}:{}),{},{children:e.title}))},n)}))]})})]})})}),Object(f.jsx)("div",{className:"content-header-right text-md-end col-md-3 col-12 d-md-block d-none",children:Object(f.jsx)("div",{className:"breadcrumb-right dropdown",children:Object(f.jsxs)(b.ub,{children:[Object(f.jsx)(b.G,{color:"primary",className:"btn-icon btn-round dropdown-toggle",children:Object(f.jsx)(i.a,{size:14})}),Object(f.jsxs)(b.F,{tag:"ul",end:!0,children:[Object(f.jsxs)(b.E,{tag:o.b,to:"/apps/todo",children:[Object(f.jsx)(l.a,{className:"me-1",size:14}),Object(f.jsx)("span",{className:"align-middle",children:"Todo"})]}),Object(f.jsxs)(b.E,{tag:o.b,to:"/apps/chat",children:[Object(f.jsx)(u.a,{className:"me-1",size:14}),Object(f.jsx)("span",{className:"align-middle",children:"Chat"})]}),Object(f.jsxs)(b.E,{tag:o.b,to:"/apps/email",children:[Object(f.jsx)(d.a,{className:"me-1",size:14}),Object(f.jsx)("span",{className:"align-middle",children:"Email"})]}),Object(f.jsxs)(b.E,{tag:o.b,to:"/apps/calendar",children:[Object(f.jsx)(p.a,{className:"me-1",size:14}),Object(f.jsx)("span",{className:"align-middle",children:"Calendar"})]})]})]})})})]})}},799:function(e,t,n){"use strict";var r=n(800).CopyToClipboard;r.CopyToClipboard=r,e.exports=r},800:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CopyToClipboard=void 0;var r=o(n(1)),c=o(n(801));function o(e){return e&&e.__esModule?e:{default:e}}function a(e){return a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e,t){if(null==e)return{};var n,r,c=function(e,t){if(null==e)return{};var n,r,c={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,t){return!t||"object"!==a(t)&&"function"!==typeof t?b(e):t}function p(e){return p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},p(e)}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function f(e,t){return f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},f(e,t)}function j(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=function(e){function t(){var e,n;l(this,t);for(var o=arguments.length,a=new Array(o),s=0;s<o;s++)a[s]=arguments[s];return j(b(n=d(this,(e=p(t)).call.apply(e,[this].concat(a)))),"onClick",(function(e){var t=n.props,o=t.text,a=t.onCopy,s=t.children,i=t.options,l=r.default.Children.only(s),u=(0,c.default)(o,i);a&&a(o,u),l&&l.props&&"function"===typeof l.props.onClick&&l.props.onClick(e)})),n}var n,o,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(t,e),n=t,o=[{key:"render",value:function(){var e=this.props,t=(e.text,e.onCopy,e.options,e.children),n=i(e,["text","onCopy","options","children"]),c=r.default.Children.only(t);return r.default.cloneElement(c,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(n,!0).forEach((function(t){j(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n,{onClick:this.onClick}))}}],o&&u(n.prototype,o),a&&u(n,a),t}(r.default.PureComponent);t.CopyToClipboard=m,j(m,"defaultProps",{onCopy:void 0,options:void 0})},801:function(e,t,n){"use strict";var r=n(802),c={"text/plain":"Text","text/html":"Url",default:"Text"};e.exports=function(e,t){var n,o,a,s,i,l,u=!1;t||(t={}),n=t.debug||!1;try{if(a=r(),s=document.createRange(),i=document.getSelection(),(l=document.createElement("span")).textContent=e,l.style.all="unset",l.style.position="fixed",l.style.top=0,l.style.clip="rect(0, 0, 0, 0)",l.style.whiteSpace="pre",l.style.webkitUserSelect="text",l.style.MozUserSelect="text",l.style.msUserSelect="text",l.style.userSelect="text",l.addEventListener("copy",(function(r){if(r.stopPropagation(),t.format)if(r.preventDefault(),"undefined"===typeof r.clipboardData){n&&console.warn("unable to use e.clipboardData"),n&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var o=c[t.format]||c.default;window.clipboardData.setData(o,e)}else r.clipboardData.clearData(),r.clipboardData.setData(t.format,e);t.onCopy&&(r.preventDefault(),t.onCopy(r.clipboardData))})),document.body.appendChild(l),s.selectNodeContents(l),i.addRange(s),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");u=!0}catch(d){n&&console.error("unable to copy using execCommand: ",d),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),u=!0}catch(d){n&&console.error("unable to copy using clipboardData: ",d),n&&console.error("falling back to prompt"),o=function(e){var t=(/mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}("message"in t?t.message:"Copy to clipboard: #{key}, Enter"),window.prompt(o,e)}}finally{i&&("function"==typeof i.removeRange?i.removeRange(s):i.removeAllRanges()),l&&document.body.removeChild(l),a()}return u}},802:function(e,t){e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,n=[],r=0;r<e.rangeCount;r++)n.push(e.getRangeAt(r));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||n.forEach((function(t){e.addRange(t)})),t&&t.focus()}}}}]);
//# sourceMappingURL=69.527f3f71.chunk.js.map