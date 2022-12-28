(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[61],{1679:function(e,t,a){"use strict";a.r(t);var c=a(16),n=a(4),r=a(17),s=a(2),i=a.n(s),l=a(500),o=a(10),d=a(131),j=a(132),b=a(498),u=a(510),m=a(511),O=a(146),x=a(6),h=a(5),f=a.n(h),p=a(90),v=(a(514),a(502),a(499),a(503),a(1)),g=a(513),N=a(12),S=Object(g.b)(),I=function(){var e=Object(o.f)({}),t=Object(j.b)(),a=Object(v.useState)([]),s=Object(r.a)(a,2),h=s[0],g=s[1],I=Object(v.useState)(!0),y=Object(r.a)(I,2),w=y[0],B=y[1],C=Object(v.useState)([]),P=Object(r.a)(C,2),q=P[0],z=P[1],R=Object(v.useState)([]),A=Object(r.a)(R,2),T=A[0],E=A[1],J=u.f().shape({categoryId:u.h().required("Please select a Category"),categoryType:u.e().default(1),name:u.h().required("Please Enter Service Name"),organizationId:u.e().default(S),taxGroupId:u.h().required("Please Select Tax Rate"),sellingPrice:u.h().required("Please Enter Professional Fee"),isTaxApplicable:u.c().default(!0),exemptionReasonId:u.e().when(["isTaxApplicable"],{is:function(e){return!e},then:u.e().required("Please Select Exemption Reason")}).nullable(),sacCode:u.h().required("Please Enter SAC Code")}),k=Object(b.f)({resolver:Object(m.a)(J),defaultValues:J.cast()}),G=k.handleSubmit,L=k.control,V=k.formState.errors,F=k.setValue;Object(v.useEffect)((function(){x.a.post("/taxgroups/dropdown").then((function(e){var t=e.data;z(t.taxgroups)})),x.a.post("/categories/list").then((function(e){var t=e.data;g(t.categories)})),x.a.post("/exemptionreasons/dropdown").then((function(e){var t=e.data;E(t.exemptionreasons)}))}),[]);var D=function(){var a=Object(n.a)(i.a.mark((function a(c){var n,r;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t(Object(O.a)(c));case 2:n=a.sent,r=n.payload.id,e("/service/view/".concat(r));case 5:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}(),H=function(e){e.nontaxableflag?(B(!1),F("isTaxApplicable",!1)):(B(!0),F("exemptionReasonId",null),F("isTaxApplicable",!0))},K=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return Object(N.jsxs)(p.jb,{className:"mb-1",children:[Object(N.jsx)(p.O,{sm:"3",size:"lg",className:f()("form-label ".concat(a?"required":"")),for:t,children:e}),Object(N.jsxs)(p.B,{sm:"9",children:[Object(N.jsx)(b.a,{id:t,name:t,control:L,render:function(e){var a=e.field;return Object(N.jsx)(p.L,Object(c.a)({invalid:V[t]&&!0},a))}}),V[t]&&Object(N.jsx)(p.I,{children:V[t].message})]})]})},M=function(e,t,a){var n,r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return Object(N.jsxs)(p.jb,{className:"mb-1",children:[Object(N.jsx)(p.O,{sm:"3",size:"lg",className:f()("form-label ".concat(r?"required":"")),for:t,children:e}),Object(N.jsxs)(p.B,{sm:"9",children:[Object(N.jsx)(b.a,{control:L,name:t,id:t,render:function(e){var n=e.field,r=e.ref;return Object(N.jsx)(l.a,Object(c.a)(Object(c.a)({inputRef:r,className:f()("react-select",{"is-invalid":V[t]})},n),{},{classNamePrefix:"select",options:a,value:a.find((function(e){return e.id===n.value})),onChange:function(e){n.onChange(e.id),"taxGroupId"===t&&H(e)},getOptionLabel:function(e){return e.name},getOptionValue:function(e){return e.id}}))}}),V[t]&&Object(N.jsx)(p.I,{className:"text-danger",children:null===(n=V[t])||void 0===n?void 0:n.message})]})]})};return Object(N.jsxs)("form",{onSubmit:G(D),children:[Object(N.jsxs)(p.l,{className:"invoice-preview-card",children:[Object(N.jsx)(p.p,{children:Object(N.jsx)(p.v,{children:" Add Service"})}),Object(N.jsxs)(p.m,{className:"pb-0",children:[Object(N.jsx)(p.jb,{children:Object(N.jsx)(p.B,{md:"6",className:"mb-1",children:M("Category","categoryId",h,!0)})}),Object(N.jsx)(p.jb,{children:Object(N.jsx)(p.B,{md:"6",className:"mb-1",children:K("Name","name",!0)})}),Object(N.jsx)(p.jb,{children:Object(N.jsx)(p.B,{md:"6",className:"mb-1",children:K("SAC Code","sacCode",!0)})}),Object(N.jsx)(p.jb,{children:Object(N.jsx)(p.B,{md:"6",className:"mb-1",children:K("Professional Fee","sellingPrice",!0)})}),Object(N.jsx)(p.jb,{children:Object(N.jsx)(p.B,{md:"6",className:"mb-1",children:M("Tax Rate","taxGroupId",q,!0)})}),!w&&Object(N.jsx)(p.jb,{children:Object(N.jsx)(p.B,{md:"6",className:"mb-1",children:M("Exemption Reason","exemptionReasonId",T,!0)})}),Object(N.jsx)(p.jb,{children:Object(N.jsx)(p.B,{md:"6",className:"mb-1",children:Object(N.jsxs)(p.jb,{className:"mb-1",children:[Object(N.jsx)(p.O,{sm:"3",size:"lg",className:"form-label required",for:"description",children:"Description"}),Object(N.jsxs)(p.B,{sm:"9",children:[Object(N.jsx)(b.a,{id:"description",name:"description",control:L,render:function(e){var t=e.field;return Object(N.jsx)(p.L,Object(c.a)({type:"textarea",invalid:V.description&&!0},t))}}),V.description&&Object(N.jsx)(p.I,{children:V.description.message})]})]})})})]})]}),Object(N.jsx)(p.l,{children:Object(N.jsx)(p.m,{children:Object(N.jsxs)("div",{className:"modal-footer border-0",children:[Object(N.jsx)(p.i,{color:"warning",outline:!0,tag:d.b,to:"/service/list",children:"Cancel"}),Object(N.jsx)(p.i,{color:"primary",type:"submit",children:"Save"})]})})})]})};t.default=function(){return Object(N.jsx)("div",{className:"invoice-add-wrapper",children:Object(N.jsx)(p.jb,{className:"invoice-add",children:Object(N.jsx)(p.B,{xl:12,md:12,sm:12,children:Object(N.jsx)(I,{})})})})}},499:function(e,t,a){},503:function(e,t,a){},513:function(e,t,a){"use strict";a.d(t,"b",(function(){return c})),a.d(t,"a",(function(){return n}));var c=function(){return null===localStorage.getItem("activeOrganization")?null:JSON.parse(localStorage.getItem("activeOrganization")).id},n=function(){return null===localStorage.getItem("activeOrganization")?null:JSON.parse(localStorage.getItem("activeOrganization"))}},514:function(e,t,a){}}]);
//# sourceMappingURL=61.c4cd1f79.chunk.js.map