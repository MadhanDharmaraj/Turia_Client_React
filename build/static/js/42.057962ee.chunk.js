/*! For license information please see 42.057962ee.chunk.js.LICENSE.txt */
(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[42],{1654:function(e,t,n){"use strict";n.r(t);var c=n(15),s=n(1),i=n(9),r=n(129),a=n(5),o=n.n(a),l=n(88),d=n(494),j=n.n(d),u=n(513),m=n(514),b=n(882),h=n(799),p=n(806),f=(n(505),n(486),n(490),n(10)),x=function(e){var t=e.data,n=Object(s.useState)(1),i=Object(c.a)(n,2),r=i[0],a=i[1],o=Object(s.useState)(new Date(t.invoice.issuedDate)),d=Object(c.a)(o,2),x=d[0],O=d[1],v=Object(s.useState)(new Date(t.invoice.dueDate)),y=Object(c.a)(v,2),N=y[0],g=y[1],w=function(e){e.preventDefault(),e.target.closest(".repeater-wrapper").remove()};return Object(f.jsxs)(l.l,{className:"invoice-preview-card",children:[Object(f.jsx)(l.m,{className:"invoice-padding pb-0",children:Object(f.jsxs)("div",{className:"d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0",children:[Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{className:"logo-wrapper",children:[Object(f.jsxs)("svg",{viewBox:"0 0 139 95",version:"1.1",height:"24",children:[Object(f.jsxs)("defs",{children:[Object(f.jsxs)("linearGradient",{id:"invoice-linearGradient-1",x1:"100%",y1:"10.5120544%",x2:"50%",y2:"89.4879456%",children:[Object(f.jsx)("stop",{stopColor:"#000000",offset:"0%"}),Object(f.jsx)("stop",{stopColor:"#FFFFFF",offset:"100%"})]}),Object(f.jsxs)("linearGradient",{id:"invoice-linearGradient-2",x1:"64.0437835%",y1:"46.3276743%",x2:"37.373316%",y2:"100%",children:[Object(f.jsx)("stop",{stopColor:"#EEEEEE",stopOpacity:"0",offset:"0%"}),Object(f.jsx)("stop",{stopColor:"#FFFFFF",offset:"100%"})]})]}),Object(f.jsx)("g",{stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd",children:Object(f.jsx)("g",{transform:"translate(-400.000000, -178.000000)",children:Object(f.jsxs)("g",{transform:"translate(400.000000, 178.000000)",children:[Object(f.jsx)("path",{className:"text-primary",d:"M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z",style:{fill:"currentColor"}}),Object(f.jsx)("path",{d:"M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z",fill:"url(#invoice-linearGradient-1)",opacity:"0.2"}),Object(f.jsx)("polygon",{fill:"#000000",opacity:"0.049999997",points:"69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"}),Object(f.jsx)("polygon",{fill:"#000000",opacity:"0.099999994",points:"69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"}),Object(f.jsx)("polygon",{fill:"url(#invoice-linearGradient-2)",opacity:"0.099999994",points:"101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"})]})})})]}),Object(f.jsx)("h3",{className:"text-primary invoice-logo",children:"Vuexy"})]}),Object(f.jsx)("p",{className:"card-text mb-25",children:"Office 149, 450 South Brand Brooklyn"}),Object(f.jsx)("p",{className:"card-text mb-25",children:"San Diego County, CA 91905, USA"}),Object(f.jsx)("p",{className:"card-text mb-0",children:"+1 (123) 456 7891, +44 (876) 543 2198"})]}),Object(f.jsxs)("div",{className:"invoice-number-date mt-md-0 mt-2",children:[Object(f.jsxs)("div",{className:"d-flex align-items-center justify-content-md-end mb-1",children:[Object(f.jsx)("h4",{className:"invoice-title",children:"Invoice"}),Object(f.jsxs)(l.L,{className:"input-group-merge invoice-edit-input-group disabled",children:[Object(f.jsx)(l.M,{children:Object(f.jsx)(b.a,{size:15})}),Object(f.jsx)(l.K,{type:"number",className:"invoice-edit-input",value:t.invoice.id,placeholder:"53634",disabled:!0})]})]}),Object(f.jsxs)("div",{className:"d-flex align-items-center mb-1",children:[Object(f.jsx)("span",{className:"title",children:"Date:"}),Object(f.jsx)(j.a,{value:x,onChange:function(e){return O(e)},className:"form-control invoice-edit-input date-picker"})]}),Object(f.jsxs)("div",{className:"d-flex align-items-center",children:[Object(f.jsx)("span",{className:"title",children:"Due Date:"}),Object(f.jsx)(j.a,{value:N,onChange:function(e){return g(e)},className:"form-control invoice-edit-input due-date-picker"})]})]})]})}),Object(f.jsx)("hr",{className:"invoice-spacing"}),Object(f.jsx)(l.m,{className:"invoice-padding pt-0",children:Object(f.jsxs)(l.ib,{className:"invoice-spacing",children:[Object(f.jsxs)(l.B,{className:"p-0",xl:"8",children:[Object(f.jsx)("h6",{className:"mb-2",children:"Invoice To:"}),Object(f.jsx)("h6",{className:"mb-25",children:t.invoice.client.name}),Object(f.jsx)(l.u,{className:"mb-25",children:t.invoice.client.company}),Object(f.jsx)(l.u,{className:"mb-25",children:t.invoice.client.address}),Object(f.jsx)(l.u,{className:"mb-25",children:t.invoice.client.contact}),Object(f.jsx)(l.u,{className:"mb-0",children:t.invoice.client.companyEmail})]}),Object(f.jsxs)(l.B,{className:"p-0 mt-xl-0 mt-2",xl:"4",children:[Object(f.jsx)("h6",{className:"mb-2",children:"Payment Details:"}),Object(f.jsx)("table",{children:Object(f.jsxs)("tbody",{children:[Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{className:"pe-1",children:"Total Due:"}),Object(f.jsx)("td",{children:Object(f.jsx)("span",{className:"fw-bolder",children:t.paymentDetails.totalDue})})]}),Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{className:"pe-1",children:"Bank name:"}),Object(f.jsx)("td",{children:t.paymentDetails.bankName})]}),Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{className:"pe-1",children:"Country:"}),Object(f.jsx)("td",{children:t.paymentDetails.country})]}),Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{className:"pe-1",children:"IBAN:"}),Object(f.jsx)("td",{children:t.paymentDetails.iban})]}),Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{className:"pe-1",children:"SWIFT code:"}),Object(f.jsx)("td",{children:t.paymentDetails.swiftCode})]})]})})]})]})}),Object(f.jsxs)(l.m,{className:"invoice-padding invoice-product-details",children:[Object(f.jsx)(u.a,{count:r,children:function(e){var t=0===e?"div":m.SlideDown;return Object(f.jsx)(t,{className:"repeater-wrapper",children:Object(f.jsx)(l.ib,{children:Object(f.jsxs)(l.B,{className:"d-flex product-details-border position-relative pe-0",sm:"12",children:[Object(f.jsxs)(l.ib,{className:"w-100 pe-lg-0 pe-1 py-2",children:[Object(f.jsxs)(l.B,{className:"mb-lg-0 mb-2 mt-lg-0 mt-2",lg:"5",sm:"12",children:[Object(f.jsx)(l.u,{className:"col-title mb-md-50 mb-0",children:"Item"}),Object(f.jsxs)(l.K,{type:"select",className:"item-details",children:[Object(f.jsx)("option",{children:"App Design"}),Object(f.jsx)("option",{children:"App Customization"}),Object(f.jsx)("option",{children:"ABC Template"}),Object(f.jsx)("option",{children:"App Development"})]}),Object(f.jsx)(l.K,{className:"mt-2",type:"textarea",rows:"1",defaultValue:"Customization & Bug Fixes"})]}),Object(f.jsxs)(l.B,{className:"my-lg-0 my-2",lg:"3",sm:"12",children:[Object(f.jsx)(l.u,{className:"col-title mb-md-2 mb-0",children:"Cost"}),Object(f.jsx)(l.K,{type:"number",defaultValue:"24",placeholder:"24"}),Object(f.jsxs)("div",{className:"mt-2",children:[Object(f.jsx)("span",{children:"Discount:"})," ",Object(f.jsx)("span",{children:"0%"})]})]}),Object(f.jsxs)(l.B,{className:"my-lg-0 my-2",lg:"2",sm:"12",children:[Object(f.jsx)(l.u,{className:"col-title mb-md-2 mb-0",children:"Qty"}),Object(f.jsx)(l.K,{type:"number",defaultValue:"1",placeholder:"1"})]}),Object(f.jsxs)(l.B,{className:"my-lg-0 mt-2",lg:"2",sm:"12",children:[Object(f.jsx)(l.u,{className:"col-title mb-md-50 mb-0",children:"Price"}),Object(f.jsx)(l.u,{className:"mb-0",children:"$24.00"})]})]}),Object(f.jsx)("div",{className:"d-flex justify-content-center border-start invoice-product-actions py-50 px-25",children:Object(f.jsx)(h.a,{size:18,className:"cursor-pointer",onClick:w})})]})})},e)}}),Object(f.jsx)(l.ib,{className:"mt-1",children:Object(f.jsx)(l.B,{sm:"12",className:"px-0",children:Object(f.jsxs)(l.i,{color:"primary",size:"sm",className:"btn-add-new",onClick:function(){return a(r+1)},children:[Object(f.jsx)(p.a,{size:14,className:"me-25"})," ",Object(f.jsx)("span",{className:"align-middle",children:"Add Item"})]})})})]}),Object(f.jsx)(l.m,{className:"invoice-padding",children:Object(f.jsxs)(l.ib,{className:"invoice-sales-total-wrapper",children:[Object(f.jsx)(l.B,{className:"mt-md-0 mt-3",md:{size:"6",order:1},xs:{size:12,order:2},children:Object(f.jsxs)("div",{className:"d-flex align-items-center mb-1",children:[Object(f.jsx)(l.N,{for:"salesperson",className:"form-label",children:"Salesperson:"}),Object(f.jsx)(l.K,{type:"text",className:"ms-50",id:"salesperson",placeholder:"Edward Crowley"})]})}),Object(f.jsx)(l.B,{className:"d-flex justify-content-end",md:{size:"6",order:2},xs:{size:12,order:1},children:Object(f.jsxs)("div",{className:"invoice-total-wrapper",children:[Object(f.jsxs)("div",{className:"invoice-total-item",children:[Object(f.jsx)("p",{className:"invoice-total-title",children:"Subtotal:"}),Object(f.jsx)("p",{className:"invoice-total-amount",children:"$1800"})]}),Object(f.jsxs)("div",{className:"invoice-total-item",children:[Object(f.jsx)("p",{className:"invoice-total-title",children:"Discount:"}),Object(f.jsx)("p",{className:"invoice-total-amount",children:"$28"})]}),Object(f.jsxs)("div",{className:"invoice-total-item",children:[Object(f.jsx)("p",{className:"invoice-total-title",children:"Tax:"}),Object(f.jsx)("p",{className:"invoice-total-amount",children:"21%"})]}),Object(f.jsx)("hr",{className:"my-50"}),Object(f.jsxs)("div",{className:"invoice-total-item",children:[Object(f.jsx)("p",{className:"invoice-total-title",children:"Total:"}),Object(f.jsx)("p",{className:"invoice-total-amount",children:"$1690"})]})]})})]})}),Object(f.jsx)("hr",{className:"invoice-spacing mt-0"}),Object(f.jsx)(l.m,{className:"invoice-padding py-0",children:Object(f.jsx)(l.ib,{children:Object(f.jsx)(l.B,{children:Object(f.jsxs)("div",{className:"mb-2",children:[Object(f.jsx)(l.N,{for:"note",className:"form-label fw-bold",children:"Note:"}),Object(f.jsx)(l.K,{type:"textarea",rows:"2",id:"note",defaultValue:"It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!"})]})})})})]})},O=function(e){var t=e.id,n=e.setSendSidebarOpen,c=e.setAddPaymentOpen;return Object(f.jsxs)(s.Fragment,{children:[Object(f.jsx)(l.l,{className:"invoice-action-wrapper",children:Object(f.jsxs)(l.m,{children:[Object(f.jsx)(l.i,{color:"primary",block:!0,className:"mb-75",onClick:function(){return n(!0)},children:"Send Invoice"}),Object(f.jsx)(l.i,{tag:r.b,to:"/apps/invoice/preview/".concat(t),color:"primary",block:!0,outline:!0,className:"mb-75",children:"Preview"}),Object(f.jsx)(l.i,{color:"primary",block:!0,outline:!0,className:"mb-75",children:"Save"}),Object(f.jsx)(l.i,{color:"success",block:!0,onClick:function(){return c(!0)},children:"Add Payment"})]})}),Object(f.jsxs)("div",{className:"mt-2",children:[Object(f.jsxs)("div",{className:"invoice-payment-option",children:[Object(f.jsx)("p",{className:"mb-50",children:"Accept payments via"}),Object(f.jsxs)(l.K,{type:"select",id:"payment-select",children:[Object(f.jsx)("option",{children:"Debit Card"}),Object(f.jsx)("option",{children:"Credit Card"}),Object(f.jsx)("option",{children:"Paypal"}),Object(f.jsx)("option",{children:"Internet Banking"}),Object(f.jsx)("option",{children:"UPI Transfer"})]})]}),Object(f.jsxs)("div",{className:"invoice-terms mt-1",children:[Object(f.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(f.jsx)("label",{className:"cursor-pointer mb-0",htmlFor:"payment-terms",children:"Payment Terms"}),Object(f.jsx)("div",{className:"form-switch",children:Object(f.jsx)(l.K,{type:"switch",id:"payment-terms",defaultChecked:!0})})]}),Object(f.jsxs)("div",{className:"d-flex justify-content-between py-1",children:[Object(f.jsx)("label",{className:"cursor-pointer mb-0",htmlFor:"client-notes",children:"Client Notes"}),Object(f.jsx)("div",{className:"form-switch",children:Object(f.jsx)(l.K,{type:"switch",id:"client-notes",defaultChecked:!0})})]}),Object(f.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(f.jsx)("label",{className:"cursor-pointer mb-0",htmlFor:"payment-stub",children:"Payment Stub"}),Object(f.jsx)("div",{className:"form-switch",children:Object(f.jsx)(l.K,{type:"switch",id:"payment-stub"})})]})]})]})]})},v=n(733),y=n(734);t.default=function(){var e=Object(i.g)().id,t=Object(s.useState)(null),n=Object(c.a)(t,2),a=n[0],d=n[1],j=Object(s.useState)(!1),u=Object(c.a)(j,2),m=u[0],b=u[1],h=Object(s.useState)(!1),p=Object(c.a)(h,2),N=p[0],g=p[1];return Object(s.useEffect)((function(){o.a.get("/api/invoice/invoices/".concat(e)).then((function(e){d(e.data)}))}),[]),null!==a&&void 0!==a.invoice?Object(f.jsxs)("div",{className:"invoice-edit-wrapper",children:[Object(f.jsxs)(l.ib,{className:"invoice-edit",children:[Object(f.jsx)(l.B,{xl:9,md:8,sm:12,children:Object(f.jsx)(x,{data:a})}),Object(f.jsx)(l.B,{xl:3,md:4,sm:12,children:Object(f.jsx)(O,{id:e,setSendSidebarOpen:b,setAddPaymentOpen:g})})]}),Object(f.jsx)(v.a,{toggleSidebar:function(){return b(!m)},open:m}),Object(f.jsx)(y.a,{toggleSidebar:function(){return g(!N)},open:N})]}):Object(f.jsxs)(l.e,{color:"danger",children:[Object(f.jsx)("h4",{className:"alert-heading",children:"Invoice not found"}),Object(f.jsxs)("div",{className:"alert-body",children:["Invoice with id: ",e," doesn't exist. Check list of all invoices:"," ",Object(f.jsx)(r.b,{to:"/apps/invoice/list",children:"Invoice List"})]})]})}},486:function(e,t,n){},490:function(e,t,n){},505:function(e,t,n){},513:function(e,t,n){"use strict";var c=n(14),s=n(130),i=n(10),r=["count","tag","children"],a=function(e){for(var t=e.count,n=e.tag,a=e.children,o=Object(s.a)(e,r),l=n,d=[],j=0;j<t;j++)d.push(a(j));return Object(i.jsx)(l,Object(c.a)(Object(c.a)({},o),{},{children:d}))};a.defaultProps={tag:"div"},t.a=a},514:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=n(515),s=c.__importStar(n(1)),i=function(e){function t(t){var n=e.call(this,t)||this;return n.outerRef=null,n.handleRef=function(e){if(n.outerRef=e,n.props.forwardedRef)if("function"===typeof n.props.forwardedRef)n.props.forwardedRef(e);else{if("object"!==typeof n.props.forwardedRef)throw new Error("Invalid forwardedRef "+n.props.forwardedRef);n.props.forwardedRef.current=e}},n.handleTransitionEnd=function(e){e.target===n.outerRef&&"height"===e.propertyName&&(n.state.childrenLeaving?n.setState({children:null,childrenLeaving:!1},(function(){return n.endTransition()})):n.endTransition())},n.state={children:t.children,childrenLeaving:!1},n}return c.__extends(t,e),t.prototype.componentDidMount=function(){this.outerRef&&(this.props.closed||!this.props.children?(this.outerRef.classList.add("closed"),this.outerRef.style.height="0px"):this.props.transitionOnAppear?this.startTransition("0px"):this.outerRef.style.height="auto")},t.prototype.getSnapshotBeforeUpdate=function(){return this.outerRef?this.outerRef.getBoundingClientRect().height+"px":null},t.getDerivedStateFromProps=function(e,t){return e.children?{children:e.children,childrenLeaving:!1}:t.children?{children:t.children,childrenLeaving:!0}:null},t.prototype.componentDidUpdate=function(e,t,n){this.outerRef&&this.startTransition(n)},t.prototype.startTransition=function(e){var t="0px";this.props.closed||this.state.childrenLeaving||!this.state.children||(this.outerRef.classList.remove("closed"),this.outerRef.style.height="auto",t=getComputedStyle(this.outerRef).height),parseFloat(t).toFixed(2)!==parseFloat(e).toFixed(2)&&(this.outerRef.classList.add("transitioning"),this.outerRef.style.height=e,this.outerRef.offsetHeight,this.outerRef.style.transitionProperty="height",this.outerRef.style.height=t)},t.prototype.endTransition=function(){this.outerRef.classList.remove("transitioning"),this.outerRef.style.transitionProperty="none",this.outerRef.style.height=this.props.closed?"0px":"auto",!this.props.closed&&this.state.children||this.outerRef.classList.add("closed")},t.prototype.render=function(){var e=this.props,t=e.as,n=void 0===t?"div":t,i=(e.children,e.className),r=(e.closed,e.transitionOnAppear,e.forwardedRef,c.__rest(e,["as","children","className","closed","transitionOnAppear","forwardedRef"])),a=i?"react-slidedown "+i:"react-slidedown";return s.default.createElement(n,c.__assign({ref:this.handleRef,className:a,onTransitionEnd:this.handleTransitionEnd},r),this.state.children)},t.defaultProps={transitionOnAppear:!0,closed:!1},t}(s.Component);t.SlideDown=s.forwardRef((function(e,t){return s.default.createElement(i,c.__assign({},e,{forwardedRef:t}))})),t.default=t.SlideDown},515:function(e,t,n){"use strict";n.r(t),n.d(t,"__extends",(function(){return s})),n.d(t,"__assign",(function(){return i})),n.d(t,"__rest",(function(){return r})),n.d(t,"__decorate",(function(){return a})),n.d(t,"__param",(function(){return o})),n.d(t,"__metadata",(function(){return l})),n.d(t,"__awaiter",(function(){return d})),n.d(t,"__generator",(function(){return j})),n.d(t,"__createBinding",(function(){return u})),n.d(t,"__exportStar",(function(){return m})),n.d(t,"__values",(function(){return b})),n.d(t,"__read",(function(){return h})),n.d(t,"__spread",(function(){return p})),n.d(t,"__spreadArrays",(function(){return f})),n.d(t,"__await",(function(){return x})),n.d(t,"__asyncGenerator",(function(){return O})),n.d(t,"__asyncDelegator",(function(){return v})),n.d(t,"__asyncValues",(function(){return y})),n.d(t,"__makeTemplateObject",(function(){return N})),n.d(t,"__importStar",(function(){return g})),n.d(t,"__importDefault",(function(){return w})),n.d(t,"__classPrivateFieldGet",(function(){return _})),n.d(t,"__classPrivateFieldSet",(function(){return C}));var c=function(e,t){return c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])},c(e,t)};function s(e,t){function n(){this.constructor=e}c(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var i=function(){return i=Object.assign||function(e){for(var t,n=1,c=arguments.length;n<c;n++)for(var s in t=arguments[n])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},i.apply(this,arguments)};function r(e,t){var n={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(n[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var s=0;for(c=Object.getOwnPropertySymbols(e);s<c.length;s++)t.indexOf(c[s])<0&&Object.prototype.propertyIsEnumerable.call(e,c[s])&&(n[c[s]]=e[c[s]])}return n}function a(e,t,n,c){var s,i=arguments.length,r=i<3?t:null===c?c=Object.getOwnPropertyDescriptor(t,n):c;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,n,c);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(r=(i<3?s(r):i>3?s(t,n,r):s(t,n))||r);return i>3&&r&&Object.defineProperty(t,n,r),r}function o(e,t){return function(n,c){t(n,c,e)}}function l(e,t){if("object"===typeof Reflect&&"function"===typeof Reflect.metadata)return Reflect.metadata(e,t)}function d(e,t,n,c){return new(n||(n=Promise))((function(s,i){function r(e){try{o(c.next(e))}catch(t){i(t)}}function a(e){try{o(c.throw(e))}catch(t){i(t)}}function o(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,a)}o((c=c.apply(e,t||[])).next())}))}function j(e,t){var n,c,s,i,r={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;r;)try{if(n=1,c&&(s=2&i[0]?c.return:i[0]?c.throw||((s=c.return)&&s.call(c),0):c.next)&&!(s=s.call(c,i[1])).done)return s;switch(c=0,s&&(i=[2&i[0],s.value]),i[0]){case 0:case 1:s=i;break;case 4:return r.label++,{value:i[1],done:!1};case 5:r.label++,c=i[1],i=[0];continue;case 7:i=r.ops.pop(),r.trys.pop();continue;default:if(!(s=(s=r.trys).length>0&&s[s.length-1])&&(6===i[0]||2===i[0])){r=0;continue}if(3===i[0]&&(!s||i[1]>s[0]&&i[1]<s[3])){r.label=i[1];break}if(6===i[0]&&r.label<s[1]){r.label=s[1],s=i;break}if(s&&r.label<s[2]){r.label=s[2],r.ops.push(i);break}s[2]&&r.ops.pop(),r.trys.pop();continue}i=t.call(e,r)}catch(a){i=[6,a],c=0}finally{n=s=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}function u(e,t,n,c){void 0===c&&(c=n),e[c]=t[n]}function m(e,t){for(var n in e)"default"===n||t.hasOwnProperty(n)||(t[n]=e[n])}function b(e){var t="function"===typeof Symbol&&Symbol.iterator,n=t&&e[t],c=0;if(n)return n.call(e);if(e&&"number"===typeof e.length)return{next:function(){return e&&c>=e.length&&(e=void 0),{value:e&&e[c++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function h(e,t){var n="function"===typeof Symbol&&e[Symbol.iterator];if(!n)return e;var c,s,i=n.call(e),r=[];try{for(;(void 0===t||t-- >0)&&!(c=i.next()).done;)r.push(c.value)}catch(a){s={error:a}}finally{try{c&&!c.done&&(n=i.return)&&n.call(i)}finally{if(s)throw s.error}}return r}function p(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(h(arguments[t]));return e}function f(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var c=Array(e),s=0;for(t=0;t<n;t++)for(var i=arguments[t],r=0,a=i.length;r<a;r++,s++)c[s]=i[r];return c}function x(e){return this instanceof x?(this.v=e,this):new x(e)}function O(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var c,s=n.apply(e,t||[]),i=[];return c={},r("next"),r("throw"),r("return"),c[Symbol.asyncIterator]=function(){return this},c;function r(e){s[e]&&(c[e]=function(t){return new Promise((function(n,c){i.push([e,t,n,c])>1||a(e,t)}))})}function a(e,t){try{(n=s[e](t)).value instanceof x?Promise.resolve(n.value.v).then(o,l):d(i[0][2],n)}catch(c){d(i[0][3],c)}var n}function o(e){a("next",e)}function l(e){a("throw",e)}function d(e,t){e(t),i.shift(),i.length&&a(i[0][0],i[0][1])}}function v(e){var t,n;return t={},c("next"),c("throw",(function(e){throw e})),c("return"),t[Symbol.iterator]=function(){return this},t;function c(c,s){t[c]=e[c]?function(t){return(n=!n)?{value:x(e[c](t)),done:"return"===c}:s?s(t):t}:s}}function y(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,n=e[Symbol.asyncIterator];return n?n.call(e):(e=b(e),t={},c("next"),c("throw"),c("return"),t[Symbol.asyncIterator]=function(){return this},t);function c(n){t[n]=e[n]&&function(t){return new Promise((function(c,s){(function(e,t,n,c){Promise.resolve(c).then((function(t){e({value:t,done:n})}),t)})(c,s,(t=e[n](t)).done,t.value)}))}}}function N(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}function g(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function w(e){return e&&e.__esModule?e:{default:e}}function _(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function C(e,t,n){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,n),n}},544:function(e,t,n){"use strict";var c=n(14),s=n(28),i=n(130),r=n(799),a=n(2),o=n.n(a),l=n(523),d=n.n(l),j=n(88),u=n(10),m=["open","size","title","width","children","closeBtn","className","toggleSidebar","bodyClassName","contentClassName","wrapperClassName","headerClassName"];t.a=function(e){var t,n=e.open,a=e.size,l=e.title,b=e.width,h=e.children,p=e.closeBtn,f=e.className,x=e.toggleSidebar,O=e.bodyClassName,v=e.contentClassName,y=e.wrapperClassName,N=e.headerClassName,g=Object(i.a)(e,m),w=p||Object(u.jsx)(r.a,{className:"cursor-pointer",size:15,onClick:x});return Object(u.jsxs)(j.Q,Object(c.a)(Object(c.a)(Object(c.a)({isOpen:n,toggle:x,contentClassName:o()("overflow-hidden",Object(s.a)({},v,v)),modalClassName:o()("modal-slide-in",Object(s.a)({},y,y)),className:o()((t={},Object(s.a)(t,f,f),Object(s.a)(t,"sidebar-lg","lg"===a),Object(s.a)(t,"sidebar-sm","sm"===a),t))},void 0!==b?{style:{width:String(b)+"px"}}:{}),g),{},{children:[Object(u.jsx)(j.T,{className:o()(Object(s.a)({},N,N)),toggle:x,close:w,tag:"div",children:Object(u.jsx)("h5",{className:"modal-title",children:Object(u.jsx)("span",{className:"align-middle",children:l})})}),Object(u.jsx)(d.a,{options:{wheelPropagation:!1},children:Object(u.jsx)(j.R,{className:o()("flex-grow-1",Object(s.a)({},O,O)),children:h})})]}))}},733:function(e,t,n){"use strict";var c=n(544),s=n(890),i=n(88),r=n(10);t.a=function(e){var t=e.open,n=e.toggleSidebar;return Object(r.jsx)(c.a,{size:"lg",open:t,title:"Send Invoice",headerClassName:"mb-1",contentClassName:"p-0",bodyClassName:"pb-sm-0 pb-3",toggleSidebar:n,children:Object(r.jsxs)(i.H,{children:[Object(r.jsxs)("div",{className:"mb-1",children:[Object(r.jsx)(i.N,{for:"invoice-from",className:"form-label",children:"From"}),Object(r.jsx)(i.K,{id:"invoice-from",defaultValue:"shelbyComapny@email.com",placeholder:"company@email.com"})]}),Object(r.jsxs)("div",{className:"mb-1",children:[Object(r.jsx)(i.N,{for:"invoice-to",className:"form-label",children:"To"}),Object(r.jsx)(i.K,{id:"invoice-to",defaultValue:"qConsolidated@email.com",placeholder:"company@email.com"})]}),Object(r.jsxs)("div",{className:"mb-1",children:[Object(r.jsx)(i.N,{for:"invoice-subject",className:"form-label",children:"Subject"}),Object(r.jsx)(i.K,{id:"invoice-subject",defaultValue:"Invoice of purchased Admin Templates",placeholder:"Invoice regarding goods"})]}),Object(r.jsxs)("div",{className:"mb-1",children:[Object(r.jsx)(i.N,{for:"invoice-message",className:"form-label",children:"Message"}),Object(r.jsx)(i.K,{type:"textarea",cols:"3",rows:"11",id:"invoice-message",defaultValue:"Dear Queen Consolidated,\n\nThank you for your business, always a pleasure to work with you!\n\nWe have generated a new invoice in the amount of $95.59\n\nWe would appreciate payment of this invoice by 05/11/2019"})]}),Object(r.jsx)("div",{className:"mb-1",children:Object(r.jsxs)(i.f,{color:"light-primary",children:[Object(r.jsx)(s.a,{className:"me-50",size:14}),Object(r.jsx)("span",{className:"align-middle",children:"Invoice Attached"})]})}),Object(r.jsxs)("div",{className:"d-flex flex-wrap mt-2",children:[Object(r.jsx)(i.i,{className:"me-1",color:"primary",onClick:n,children:"Send"}),Object(r.jsx)(i.i,{color:"secondary",outline:!0,onClick:n,children:"Cancel"})]})]})})}},734:function(e,t,n){"use strict";var c=n(15),s=n(1),i=n(494),r=n.n(i),a=n(88),o=n(544),l=(n(486),n(490),n(10));t.a=function(e){var t=e.open,n=e.toggleSidebar,i=Object(s.useState)(new Date),d=Object(c.a)(i,2),j=d[0],u=d[1];return Object(l.jsx)(o.a,{size:"lg",open:t,title:"Add Payment",headerClassName:"mb-1",contentClassName:"p-0",toggleSidebar:n,children:Object(l.jsxs)(a.H,{children:[Object(l.jsx)("div",{className:"mb-1",children:Object(l.jsx)(a.K,{id:"balance",defaultValue:"Invoice Balance: 5000.00",disabled:!0})}),Object(l.jsxs)("div",{className:"mb-1",children:[Object(l.jsx)(a.N,{for:"amount",className:"form-label",children:"Payment Amount"}),Object(l.jsx)(a.K,{type:"number",id:"amount",placeholder:"$1000"})]}),Object(l.jsxs)("div",{className:"mb-1",children:[Object(l.jsx)(a.N,{for:"payment-amount",className:"form-label",children:"Payment Date"}),Object(l.jsx)(r.a,{id:"payment-amount",value:j,onChange:function(e){return u(e)},className:"form-control"})]}),Object(l.jsxs)("div",{className:"mb-1",children:[Object(l.jsx)(a.N,{for:"payment-method",className:"form-label",children:"Payment Method"}),Object(l.jsxs)(a.K,{type:"select",id:"payment-method",defaultValue:"",children:[Object(l.jsx)("option",{value:"",disabled:!0,children:"Select payment method"}),Object(l.jsx)("option",{value:"Cash",children:"Cash"}),Object(l.jsx)("option",{value:"Bank Transfer",children:"Bank Transfer"}),Object(l.jsx)("option",{value:"Debit",children:"Debit"}),Object(l.jsx)("option",{value:"Credit",children:"Credit"}),Object(l.jsx)("option",{value:"Paypal",children:"Paypal"})]})]}),Object(l.jsxs)("div",{className:"mb-1",children:[Object(l.jsx)(a.N,{for:"payment-note",className:"form-label",children:"Internal Payment Note"}),Object(l.jsx)(a.K,{type:"textarea",rows:"5",id:"payment-note",placeholder:"Internal Payment Note"})]}),Object(l.jsxs)("div",{className:"d-flex flex-wrap mb-0",children:[Object(l.jsx)(a.i,{className:"me-1",color:"primary",onClick:n,children:"Send"}),Object(l.jsx)(a.i,{color:"secondary",outline:!0,onClick:n,children:"Cancel"})]})]})})}}}]);
//# sourceMappingURL=42.057962ee.chunk.js.map