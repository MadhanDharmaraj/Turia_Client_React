(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[74],{1665:function(e,s,l){"use strict";l.r(s);var t=l(14),c=l(15),i=l(1),n=l(130),a=l(3),d=l.n(a),o=l(498),r=l.n(o),m=l(803),j=l(810),u=l(489),b=l(487),v=l(511),x=l(512),O=l(89),_=(l(502),l(491),l(488),l(493),l(5)),p=l.n(_),h=l(10),f=function(){var e,s=v.e().shape({client_id:v.g().required("Please select a Client"),dsc_lists:v.a().of(v.e().shape({name:v.g().required("Please Enter Name"),email:v.g().email().required("Please Enter Email"),contact_no:v.g().matches(/^[0-9\- ]{10,10}$/,{message:"Phone number is not valid",excludeEmptyString:!0}),issued_date:v.c("Please Enter Valid Date").nullable().required("Please Enter Issued Date"),expiry_date:v.c("Please Enter Valid Date").nullable().required("Please Enter Expiry Date"),password:v.g().min(5,"Password length should be 5 or above.")}))}),l=Object(b.f)({resolver:Object(x.a)(s),defaultValues:{client_id:"",dsc_lists:[]}}),a=l.register,o=l.handleSubmit,_=l.formState.errors,f=l.control,g=Object(i.useState)([]),N=Object(c.a)(g,2),y=N[0],w=N[1],E=Object(b.e)({name:"dsc_lists",control:f}),B=E.fields,C=E.append,P=E.remove;Object(i.useEffect)((function(){p.a.get("/api/client/dropdown").then((function(e){var s=e.data;w(s)}))}),[]);var I=function(){C({name:"",email:"",contact_no:"",issued_date:"",expiry_date:"",password:""})},D=function(e){P(),e.preventDefault(),e.target.closest(".repeater-wrapper").remove()};return Object(i.useEffect)((function(){I()}),[]),Object(h.jsxs)("form",{onSubmit:o((function(e){return console.log(e)})),children:[Object(h.jsxs)(O.l,{className:"invoice-preview-card",children:[Object(h.jsx)(O.m,{className:"pb-0",children:Object(h.jsx)(O.ib,{children:Object(h.jsx)(O.B,{md:"6",className:"mb-1",children:Object(h.jsxs)(O.ib,{className:"mb-1",children:[Object(h.jsx)(O.N,{sm:"3",size:"lg",className:"form-label",for:"client_id",children:"Client"}),Object(h.jsxs)(O.B,{sm:"9",children:[Object(h.jsx)(b.a,{control:f,name:"client_id",id:"client_id",render:function(e){var s=e.field,l=e.value,c=e.ref;return Object(h.jsx)(u.a,Object(t.a)(Object(t.a)(Object(t.a)({},s),{},{inputRef:c,className:d()("react-select",{"is-invalid":_.client_id})},s),{},{classNamePrefix:"select",options:y,value:y.find((function(e){return e.value===l})),onChange:function(e){return s.onChange(e.value)}}))}}),_.client_id&&Object(h.jsx)(O.I,{className:"text-danger",children:null===(e=_.client_id)||void 0===e?void 0:e.message})]})]})})})}),Object(h.jsxs)(O.m,{className:"invoice-padding invoice-product-details",children:[B.map((function(e,s){var l,c,i,n,o,j,u,v,x,p,g,N,y,w,E,B,C,P,I,S,q,k,z,K;return Object(h.jsx)("div",{className:"repeater-wrapper",children:Object(h.jsx)(O.ib,{children:Object(h.jsxs)(O.B,{className:"d-lg-flex product-details-border position-relative pe-0",sm:"12",children:[Object(h.jsxs)(O.ib,{className:"w-100 pe-lg-0 pe-1 py-2",children:[Object(h.jsxs)(O.B,{className:"mb-lg-0 mb-2 mt-lg-0 mt-2 col-lg-2 col-sm-12",children:[Object(h.jsx)(O.u,{className:"col-title mb-md-50 mb-0",children:"Name"}),Object(h.jsx)(b.a,{control:f,id:"dsc_list_name",name:"dsc_lists.".concat(s,".name"),render:function(e){var l,c,i=e.field;return Object(h.jsx)(O.K,Object(t.a)(Object(t.a)({type:"text"},a("dsc_lists.".concat(s,".name"))),{},{invalid:(null===(l=_.dsc_lists)||void 0===l||null===(c=l[s])||void 0===c?void 0:c.name)&&!0},i))}}),(null===(l=_.dsc_lists)||void 0===l||null===(c=l[s])||void 0===c?void 0:c.name)&&Object(h.jsx)(O.I,{children:null===(i=_.dsc_lists)||void 0===i||null===(n=i[s])||void 0===n?void 0:n.name.message})]}),Object(h.jsxs)(O.B,{className:"my-lg-0 my-2 col-lg-2 col-sm-12",children:[Object(h.jsx)(O.u,{className:"col-title mb-md-50 mb-0",children:"Email"}),Object(h.jsx)(b.a,{control:f,id:"dsc_list_email",name:"dsc_lists.".concat(s,".email"),render:function(e){var l,c,i=e.field;return Object(h.jsx)(O.K,Object(t.a)(Object(t.a)({type:"email"},a("dsc_lists.".concat(s,".email"))),{},{invalid:(null===(l=_.dsc_lists)||void 0===l||null===(c=l[s])||void 0===c?void 0:c.email)&&!0},i))}}),(null===(o=_.dsc_lists)||void 0===o||null===(j=o[s])||void 0===j?void 0:j.email)&&Object(h.jsx)(O.I,{children:null===(u=_.dsc_lists)||void 0===u||null===(v=u[s])||void 0===v?void 0:v.email.message})]}),Object(h.jsxs)(O.B,{className:"my-lg-0 my-2",lg:"2",sm:"12",children:[Object(h.jsx)(O.u,{className:"col-title mb-md-50 mb-0",children:"Mobile"}),Object(h.jsx)(b.a,{control:f,id:"dsc_list_contact_no",name:"dsc_lists.".concat(s,".contact_no"),render:function(e){var l,c,i=e.field;return Object(h.jsx)(O.K,Object(t.a)(Object(t.a)({type:"number"},a("dsc_lists.".concat(s,".conatct_no"))),{},{invalid:(null===(l=_.dsc_lists)||void 0===l||null===(c=l[s])||void 0===c?void 0:c.contact_no)&&!0},i))}}),(null===(x=_.dsc_lists)||void 0===x||null===(p=x[s])||void 0===p?void 0:p.contact_no)&&Object(h.jsx)(O.I,{children:null===(g=_.dsc_lists)||void 0===g||null===(N=g[s])||void 0===N?void 0:N.contact_no.message})]}),Object(h.jsxs)(O.B,{className:"my-lg-0 mt-2",lg:"2",sm:"12",children:[Object(h.jsx)(O.u,{className:"col-title mb-md-50 mb-0",children:"Issued Date"}),Object(h.jsx)(b.a,{control:f,id:"dsc_list_issued_date",name:"dsc_lists.".concat(s,".issued_date"),render:function(e){var l,c,i=e.field,n=e.value;return Object(h.jsx)(r.a,Object(t.a)({className:d()("form-control",{"is-invalid":null===(l=_.dsc_lists)||void 0===l||null===(c=l[s])||void 0===c?void 0:c.issued_date}),options:{dateFormat:"d-m-Y"},onChange:function(e){return i.onChange(e)},value:n},i))}}),(null===(y=_.dsc_lists)||void 0===y||null===(w=y[s])||void 0===w?void 0:w.issued_date)&&Object(h.jsx)(O.I,{children:null===(E=_.dsc_lists)||void 0===E||null===(B=E[s])||void 0===B?void 0:B.issued_date.message})]}),Object(h.jsxs)(O.B,{className:"my-lg-0 mt-2",lg:"2",sm:"12",children:[Object(h.jsx)(O.u,{className:"col-title mb-md-50 mb-0",children:"Expiry Date"}),Object(h.jsx)(b.a,{control:f,id:"dsc_list_expiry_date",name:"dsc_lists.".concat(s,".expiry_date"),render:function(e){var l,c,i=e.field,n=e.value;return Object(h.jsx)(r.a,Object(t.a)({className:d()("form-control",{"is-invalid":null===(l=_.dsc_lists)||void 0===l||null===(c=l[s])||void 0===c?void 0:c.expiry_date}),options:{dateFormat:"d-m-Y"},onChange:function(e){return i.onChange(e)},value:n},i))}}),(null===(C=_.dsc_lists)||void 0===C||null===(P=C[s])||void 0===P?void 0:P.expiry_date)&&Object(h.jsx)(O.I,{children:null===(I=_.dsc_lists)||void 0===I||null===(S=I[s])||void 0===S?void 0:S.expiry_date.message})]}),Object(h.jsxs)(O.B,{className:"my-lg-0 mt-2",lg:"2",sm:"12",children:[Object(h.jsx)(O.u,{className:"col-title mb-md-50 mb-0",children:"Password"}),Object(h.jsx)(b.a,{control:f,id:"dsc_list_password",name:"dsc_lists.".concat(s,".password"),render:function(e){var l,c,i=e.field;return Object(h.jsx)(O.K,Object(t.a)(Object(t.a)({type:"text"},a("dsc_lists.".concat(s,".password"))),{},{invalid:(null===(l=_.dsc_lists)||void 0===l||null===(c=l[s])||void 0===c?void 0:c.password)&&!0},i))}}),(null===(q=_.dsc_lists)||void 0===q||null===(k=q[s])||void 0===k?void 0:k.password)&&Object(h.jsx)(O.I,{children:null===(z=_.dsc_lists)||void 0===z||null===(K=z[s])||void 0===K?void 0:K.password.message})]})]}),Object(h.jsx)("div",{className:"d-lg-flex justify-content-center border-start invoice-product-actions py-50 px-25",children:Object(h.jsx)(m.a,{size:18,className:"cursor-pointer",onClick:D})})]})})},s)})),Object(h.jsx)(O.ib,{className:"mt-1",children:Object(h.jsx)(O.B,{sm:"12",className:"px-0",children:Object(h.jsxs)(O.i,{color:"primary",size:"sm",className:"btn-add-new",onClick:function(){return I()},children:[Object(h.jsx)(j.a,{size:14,className:"me-25"})," ",Object(h.jsx)("span",{className:"align-middle",children:"Add Item"})]})})})]})]}),Object(h.jsx)(O.l,{children:Object(h.jsx)(O.m,{children:Object(h.jsxs)("div",{className:"modal-footer border-0",children:[Object(h.jsx)(O.i,{color:"warning",outline:!0,tag:n.b,to:"/digital-signature/list",children:"Cancel"}),Object(h.jsx)(O.i,{color:"primary",type:"submit",children:"Save"})]})})})]})};s.default=function(){return Object(h.jsx)("div",{className:"invoice-add-wrapper",children:Object(h.jsx)(O.ib,{className:"invoice-add",children:Object(h.jsx)(O.B,{xl:12,md:12,sm:12,children:Object(h.jsx)(f,{})})})})}},488:function(e,s,l){},493:function(e,s,l){},502:function(e,s,l){}}]);
//# sourceMappingURL=74.586294f7.chunk.js.map