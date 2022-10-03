(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[73],{1662:function(e,s,c){"use strict";c.r(s);var l=c(14),a=c(485),r=c(129),t=c(483),i=c(521),n=c(522),o=c(88),d=(c(505),c(487),c(486),c(490),c(10)),j=[{value:"1",label:"Chocolate"},{value:"2",label:"Strawberry"},{value:"3",label:"Vanilla"}],m=function(){var e,s,c,m,b,x=i.d().shape({categoryId:i.f().required("Please select a Category"),name:i.f().required("Please Enter Name"),taxGroupId:i.f().required("Please Select Tax Rate"),professionalFee:i.f().required("Please Enter Professional Fee"),sacCode:i.f().required("Please Enter SAC Code")}),u=Object(t.f)({resolver:Object(n.a)(x),defaultValues:{categoryId:"",name:"",professionalFee:"",sacCode:"",taxGroupId:"",description:""}}),O=u.register,g=u.handleSubmit,f=u.control,h=u.formState.errors;return Object(d.jsxs)("form",{onSubmit:g((function(e){console.log(e)})),children:[Object(d.jsx)(o.l,{className:"invoice-preview-card",children:Object(d.jsxs)(o.m,{className:"pb-0",children:[Object(d.jsx)(o.ib,{className:"row-bill-to invoice-spacing",children:Object(d.jsxs)(o.B,{className:"my-lg-0 my-1",lg:"6",sm:"12",children:[Object(d.jsxs)("div",{className:"d-lg-flex",children:[Object(d.jsx)(o.N,{className:"col-lg-3 col-sm-12",children:"Category"}),Object(d.jsx)(t.a,{control:f,name:"categoryId",render:function(e){var s=e.field,c=e.value,r=e.ref;return Object(d.jsx)(a.a,Object(l.a)(Object(l.a)({},O("categoryId")),{},{inputRef:r,className:"react-select col-lg-9 col-sm-12",classNamePrefix:"addl-class",options:j,value:j.find((function(e){return e.value===c})),onChange:function(e){return s.onChange(e.value)}}))}})]}),Object(d.jsx)("p",{className:"text-danger",children:null===(e=h.categoryId)||void 0===e?void 0:e.message})]})}),Object(d.jsx)(o.ib,{className:"row-bill-to invoice-spacing",children:Object(d.jsxs)(o.B,{className:"my-lg-0 my-1",lg:"6",sm:"12",children:[Object(d.jsxs)("div",{className:"d-lg-flex",children:[Object(d.jsx)(o.N,{className:"col-lg-3 col-sm-12",children:"Name"}),Object(d.jsx)("input",Object(l.a)({size:"md",type:"text",className:"form-control"},O("name",{required:"Please Enter Service Names"})))]}),Object(d.jsx)("p",{className:"text-danger",children:null===(s=h.name)||void 0===s?void 0:s.message})]})}),Object(d.jsx)(o.ib,{className:"row-bill-to invoice-spacing",children:Object(d.jsxs)(o.B,{className:"my-lg-0 my-1",lg:"6",sm:"12",children:[Object(d.jsxs)("div",{className:"d-lg-flex",children:[Object(d.jsx)(o.N,{className:"col-lg-3 col-sm-12",children:"SAC Code"}),Object(d.jsx)("input",Object(l.a)({className:"form-control",size:"md",type:"number"},O("sacCode")))]}),Object(d.jsx)("p",{className:"text-danger",children:null===(c=h.sacCode)||void 0===c?void 0:c.message})]})}),Object(d.jsx)(o.ib,{className:"row-bill-to invoice-spacing",children:Object(d.jsxs)(o.B,{className:"my-lg-0 my-1",lg:"6",sm:"12",children:[Object(d.jsxs)("div",{className:"d-lg-flex",children:[Object(d.jsx)(o.N,{className:"col-lg-3 col-sm-12",children:"Professional Fee"}),Object(d.jsx)("input",Object(l.a)({className:"form-control",size:"md",type:"number"},O("professionalFee",{required:"Please Enter Professional Fee"})))]}),Object(d.jsx)("p",{className:"text-danger",children:null===(m=h.professionalFee)||void 0===m?void 0:m.message})]})}),Object(d.jsx)(o.ib,{className:"row-bill-to invoice-spacing",children:Object(d.jsxs)(o.B,{className:"my-lg-0 my-1",lg:"6",sm:"12",children:[Object(d.jsxs)("div",{className:"d-lg-flex",children:[Object(d.jsx)(o.N,{className:"col-lg-3 col-sm-12",children:"Tax Rate"}),Object(d.jsx)(t.a,{control:f,name:"taxGroupId",render:function(e){var s=e.field,c=e.value,r=e.ref;return Object(d.jsx)(a.a,Object(l.a)(Object(l.a)({},O("taxGroupId")),{},{inputRef:r,className:"react-select col-lg-9 col-sm-12",classNamePrefix:"addl-class",options:j,value:j.find((function(e){return e.value===c})),onChange:function(e){return s.onChange(e.value)}}))}})]}),Object(d.jsx)("p",{className:"text-danger",children:null===(b=h.taxGroupId)||void 0===b?void 0:b.message})]})}),Object(d.jsx)(o.ib,{className:"row-bill-to invoice-spacing",children:Object(d.jsx)(o.B,{className:"my-lg-0 my-1",lg:"6",sm:"12",children:Object(d.jsxs)("div",{className:"d-lg-flex",children:[Object(d.jsx)(o.N,{className:"col-lg-3 col-sm-12",children:"Description"}),Object(d.jsx)("textarea",Object(l.a)({className:"form-control ".concat(h.description?"is-invalid":""),size:"md",type:"text"},O("description",{required:"Please Enter Professional Fee"})))]})})})]})}),Object(d.jsx)(o.l,{children:Object(d.jsx)(o.m,{children:Object(d.jsxs)("div",{className:"modal-footer border-0",children:[Object(d.jsx)(o.i,{color:"warning",outline:!0,tag:r.b,to:"/service/list",children:"Cancel"}),Object(d.jsx)(o.i,{color:"primary",type:"submit",children:"Save"})]})})})]})};s.default=function(){return Object(d.jsx)("div",{className:"invoice-add-wrapper",children:Object(d.jsx)(o.ib,{className:"invoice-add",children:Object(d.jsx)(o.B,{xl:12,md:12,sm:12,children:Object(d.jsx)(m,{})})})})}},486:function(e,s,c){},490:function(e,s,c){},505:function(e,s,c){}}]);
//# sourceMappingURL=73.ee7b8b03.chunk.js.map