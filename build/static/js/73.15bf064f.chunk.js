(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[73],{1659:function(e,c,a){"use strict";a.r(c);var s=a(16),t=a(131),n=a(5),l=a.n(n),i=a(1),r=a(90),j=a(12),d=["Client","Service","Sales","Task","Team","Setting","Digital Signature","Attendance","Leave"],m=function(){return Object(j.jsx)(i.Fragment,{children:Object(j.jsx)(r.l,{children:Object(j.jsx)(r.m,{className:"p-0",children:Object(j.jsx)(r.jb,{children:Object(j.jsxs)(r.B,{xs:12,children:[Object(j.jsx)("h4",{className:"mt-2 pt-50",children:"Role Permissions"}),Object(j.jsx)(r.nb,{className:"table-flush-spacing",responsive:!0,children:Object(j.jsx)("tbody",{children:d.map((function(e,c){return Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{className:"text-nowrap fw-bolder",children:e}),Object(j.jsx)("td",{children:Object(j.jsxs)("div",{className:"d-flex",children:[Object(j.jsxs)("div",{className:"form-check me-3 me-lg-5",children:[Object(j.jsx)(r.L,{type:"checkbox",id:"read-".concat(e)}),Object(j.jsx)(r.O,{className:"form-check-label",for:"read-".concat(e),children:"Read"})]}),Object(j.jsxs)("div",{className:"form-check me-3 me-lg-5",children:[Object(j.jsx)(r.L,{type:"checkbox",id:"write-".concat(e)}),Object(j.jsx)(r.O,{className:"form-check-label",for:"write-".concat(e),children:"Write"})]}),Object(j.jsxs)("div",{className:"form-check me-3 me-lg-5",children:[Object(j.jsx)(r.L,{type:"checkbox",id:"delete-".concat(e)}),Object(j.jsx)(r.O,{className:"form-check-label",for:"delete-".concat(e),children:"Delete"})]}),Object(j.jsxs)("div",{className:"form-check me-3 me-lg-5",children:[Object(j.jsx)(r.L,{type:"checkbox",id:"import-".concat(e)}),Object(j.jsx)(r.O,{className:"form-check-label",for:"import-".concat(e),children:"import"})]}),Object(j.jsxs)("div",{className:"form-check",children:[Object(j.jsx)(r.L,{type:"checkbox",id:"export-".concat(e)}),Object(j.jsx)(r.O,{className:"form-check-label",for:"export-".concat(e),children:"Export"})]})]})})]},c)}))})})]})})})})})},o=a(500),b=a(498),O=a(510),x=a(511),h=(a(514),a(502),a(499),a(503),[{value:"uk",label:"UK"},{value:"usa",label:"USA"},{value:"france",label:"France"},{value:"russia",label:"Russia"},{value:"canada",label:"Canada"}]),f=function(){var e,c,a,n=O.f().shape({first_name:O.h().required("Please Enter a First Name"),last_name:O.h().required("Please Enter a Last Name"),contact_no:O.h().required("Please Enter a Conatct No").max(10).min(10,"Invalid Contact No"),email:O.h().email("Please Enter valid Email").required("Please Enter valid Email"),designation_id:O.h().required("Please Select Designation"),role_id:O.h().required("Please Select Role"),department_id:O.h().required("Please Select Department")}),i=Object(b.f)({resolver:Object(x.a)(n),defaultValues:{first_name:"",last_name:"",contact_no:"",email:"",designation_id:"",role_id:"",department_id:"",permissions:[]}}),d=i.handleSubmit,f=i.control,u=i.formState.errors;return Object(j.jsxs)("form",{onSubmit:d((function(e){return console.log(e)})),children:[Object(j.jsxs)(r.l,{className:"invoice-preview-card",children:[Object(j.jsxs)(r.m,{className:"pb-0",children:[Object(j.jsxs)(r.jb,{children:[Object(j.jsx)(r.B,{md:"6",className:"mb-1",children:Object(j.jsxs)(r.jb,{className:"mb-1",children:[Object(j.jsx)(r.O,{sm:"3",size:"lg",className:"form-label",for:"first_name",children:"First Name"}),Object(j.jsxs)(r.B,{sm:"9",children:[Object(j.jsx)(b.a,{id:"first_name",name:"first_name",control:f,render:function(e){var c=e.field;return Object(j.jsx)(r.L,Object(s.a)({invalid:u.first_name&&!0},c))}}),u.first_name&&Object(j.jsx)(r.I,{children:u.first_name.message})]})]})}),Object(j.jsx)(r.B,{md:"6",className:"mb-1",children:Object(j.jsxs)(r.jb,{className:"mb-1",children:[Object(j.jsx)(r.O,{sm:"3",size:"lg",className:"form-label",for:"last_name",children:"Last Name"}),Object(j.jsxs)(r.B,{sm:"9",children:[Object(j.jsx)(b.a,{control:f,id:"last_name",name:"last_name",render:function(e){var c=e.field;return Object(j.jsx)(r.L,Object(s.a)({type:"text",invalid:u.last_name&&!0},c))}}),u.last_name&&Object(j.jsx)(r.I,{children:u.last_name.message})]})]})})]}),Object(j.jsxs)(r.jb,{children:[Object(j.jsx)(r.B,{md:"6",className:"mb-1",children:Object(j.jsxs)(r.jb,{className:"mb-1",children:[Object(j.jsx)(r.O,{sm:"3",size:"lg",className:"form-label",for:"contact_no",children:"Conatct No"}),Object(j.jsxs)(r.B,{sm:"9",children:[Object(j.jsx)(b.a,{id:"contact_no",name:"contact_no",control:f,render:function(e){var c=e.field;return Object(j.jsx)(r.L,Object(s.a)({invalid:u.contact_no&&!0},c))}}),u.contact_no&&Object(j.jsx)(r.I,{children:u.contact_no.message})]})]})}),Object(j.jsx)(r.B,{md:"6",className:"mb-1",children:Object(j.jsxs)(r.jb,{className:"mb-1",children:[Object(j.jsx)(r.O,{sm:"3",size:"lg",className:"form-label",for:"email",children:"Email"}),Object(j.jsxs)(r.B,{sm:"9",children:[Object(j.jsx)(b.a,{control:f,id:"email",name:"email",render:function(e){var c=e.field;return Object(j.jsx)(r.L,Object(s.a)({type:"email",invalid:u.email&&!0},c))}}),u.email&&Object(j.jsx)(r.I,{children:u.email.message})]})]})})]}),Object(j.jsxs)(r.jb,{children:[Object(j.jsx)(r.B,{md:"6",className:"mb-1",children:Object(j.jsxs)(r.jb,{className:"mb-1",children:[Object(j.jsx)(r.O,{sm:"3",size:"lg",className:"form-label",for:"designation_id",children:"Designation"}),Object(j.jsxs)(r.B,{sm:"9",children:[Object(j.jsx)(b.a,{control:f,name:"designation_id",id:"designation_id",render:function(e){var c=e.field,a=e.value,t=e.ref;return Object(j.jsx)(o.a,Object(s.a)(Object(s.a)(Object(s.a)({},c),{},{inputRef:t,className:l()("react-select",{"is-invalid":u.designation_id})},c),{},{classNamePrefix:"select",options:h,value:h.find((function(e){return e.value===a})),onChange:function(e){return c.onChange(e.value)}}))}}),u.designation_id&&Object(j.jsx)(r.I,{className:"text-danger",children:null===(e=u.designation_id)||void 0===e?void 0:e.message})]})]})}),Object(j.jsx)(r.B,{md:"6",className:"mb-1",children:Object(j.jsxs)(r.jb,{className:"mb-1",children:[Object(j.jsx)(r.O,{sm:"3",size:"lg",className:"form-label",for:"role_id",children:"Role"}),Object(j.jsxs)(r.B,{sm:"9",children:[Object(j.jsx)(b.a,{control:f,name:"role_id",id:"role_id",render:function(e){var c=e.field,a=e.value,t=e.ref;return Object(j.jsx)(o.a,Object(s.a)(Object(s.a)(Object(s.a)({},c),{},{inputRef:t,className:l()("react-select",{"is-invalid":u.role_id})},c),{},{classNamePrefix:"select",options:h,value:h.find((function(e){return e.value===a})),onChange:function(e){return c.onChange(e.value)}}))}}),u.role_id&&Object(j.jsx)(r.I,{className:"text-danger",children:null===(c=u.role_id)||void 0===c?void 0:c.message})]})]})})]}),Object(j.jsx)(r.jb,{children:Object(j.jsx)(r.B,{md:"6",className:"mb-1",children:Object(j.jsxs)(r.jb,{className:"mb-1",children:[Object(j.jsx)(r.O,{sm:"3",size:"lg",className:"form-label",for:"department_id",children:"Department"}),Object(j.jsxs)(r.B,{sm:"9",children:[Object(j.jsx)(b.a,{control:f,name:"department_id",id:"department_id",render:function(e){var c=e.field,a=e.value,t=e.ref;return Object(j.jsx)(o.a,Object(s.a)(Object(s.a)(Object(s.a)({},c),{},{inputRef:t,className:l()("react-select",{"is-invalid":u.department_id})},c),{},{classNamePrefix:"select",options:h,value:h.find((function(e){return e.value===a})),onChange:function(e){return c.onChange(e.value)}}))}}),u.department_id&&Object(j.jsx)(r.I,{className:"text-danger",children:null===(a=u.department_id)||void 0===a?void 0:a.message})]})]})})})]}),Object(j.jsx)(r.m,{className:"invoice-padding",children:Object(j.jsx)(m,{})})]}),Object(j.jsx)(r.l,{children:Object(j.jsx)(r.m,{children:Object(j.jsxs)("div",{className:"modal-footer border-0",children:[Object(j.jsx)(r.i,{color:"warning",outline:!0,tag:t.b,to:"/team/list",children:"Cancel"}),Object(j.jsx)(r.i,{color:"primary",type:"submit",children:"Save"})]})})})]})};c.default=function(){return Object(j.jsx)("div",{className:"invoice-add-wrapper",children:Object(j.jsx)(r.jb,{className:"invoice-add",children:Object(j.jsx)(r.B,{xl:12,md:12,sm:12,children:Object(j.jsx)(f,{})})})})}},499:function(e,c,a){},503:function(e,c,a){},514:function(e,c,a){}}]);
//# sourceMappingURL=73.15bf064f.chunk.js.map