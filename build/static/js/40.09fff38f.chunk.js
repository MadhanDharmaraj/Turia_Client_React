(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[40],{1523:function(e,t,s){"use strict";s.r(t);var a=s(1),i=s(892),c=s(482),n=s(519),l=s(501),r=s(484),o=s(138),j=s(88),d=s(1494),b=s(758),m=s(759),h=s(760),u=s(761),A=s(762),x=s(763),O=s(789),p=s(764),g=s(29),f=(s(622),s(10));t.default=function(){var e=Object(a.useContext)(o.a).colors,t=[{imgWidth:33,imgHeight:33,title:"Billy Hopkins",placement:"bottom",img:s(29).default},{imgWidth:33,imgHeight:33,title:"Amy Carson",placement:"bottom",img:s(89).default},{imgWidth:33,imgHeight:33,title:"Brandon Miles",placement:"bottom",img:s(57).default},{imgWidth:33,imgHeight:33,title:"Daisy Weber",placement:"bottom",img:s(65).default},{imgWidth:33,imgHeight:33,title:"Jenny Looper",placement:"bottom",img:s(520).default}],v=[{title:"12 Invoices have been paid",content:"Invoices have been paid to the company.",meta:"",metaClassName:"me-1",customContent:Object(f.jsxs)("div",{className:"d-flex align-items-center",children:[Object(f.jsx)("img",{className:"me-1",src:p.a,alt:"data.json",height:"23"}),Object(f.jsx)("span",{children:"data.json"})]})},{title:"Client Meeting",content:"Project meeting with john @10:15am.",meta:"",metaClassName:"me-1",color:"warning",customContent:Object(f.jsxs)("div",{className:"d-flex align-items-center",children:[Object(f.jsx)(c.a,{img:g.default}),Object(f.jsxs)("div",{className:"ms-50",children:[Object(f.jsx)("h6",{className:"mb-0",children:"John Doe (Client)"}),Object(f.jsx)("span",{children:"CEO of Infibeam"})]})]})},{title:"Create a new project for client",content:"Add files to new design folder",color:"info",meta:"",metaClassName:"me-1",customContent:Object(f.jsx)(l.a,{data:t})},{title:"Create a new project for client",content:"Add files to new design folder",color:"danger",meta:"",metaClassName:"me-1"}];return Object(f.jsxs)("div",{id:"dashboard-analytics",children:[Object(f.jsxs)(j.ib,{className:"match-height",children:[Object(f.jsx)(j.B,{lg:"6",sm:"12",children:Object(f.jsx)(O.a,{})}),Object(f.jsx)(j.B,{lg:"3",sm:"6",children:Object(f.jsx)(x.a,{kFormatter:r.h})}),Object(f.jsx)(j.B,{lg:"3",sm:"6",children:Object(f.jsx)(A.a,{kFormatter:r.h,warning:e.warning.main})})]}),Object(f.jsxs)(j.ib,{className:"match-height",children:[Object(f.jsx)(j.B,{lg:"6",xs:"12",children:Object(f.jsx)(m.a,{primary:e.primary.main})}),Object(f.jsx)(j.B,{lg:"6",xs:"12",children:Object(f.jsx)(u.a,{primary:e.primary.main,danger:e.danger.main})})]}),Object(f.jsxs)(j.ib,{className:"match-height",children:[Object(f.jsx)(j.B,{lg:"4",xs:"12",children:Object(f.jsxs)(j.l,{className:"card-user-timeline",children:[Object(f.jsx)(j.p,{children:Object(f.jsxs)("div",{className:"d-flex align-items-center",children:[Object(f.jsx)(i.a,{className:"user-timeline-title-icon"}),Object(f.jsx)(j.v,{tag:"h4",children:"User Timeline"})]})}),Object(f.jsx)(j.m,{children:Object(f.jsx)(n.a,{className:"ms-50 mb-0",data:v})})]})}),Object(f.jsx)(j.B,{lg:"4",md:"6",xs:"12",children:Object(f.jsx)(b.a,{primary:e.primary.main,info:e.info.main})}),Object(f.jsx)(j.B,{lg:"4",md:"6",xs:"12",children:Object(f.jsx)(h.a,{})})]}),Object(f.jsx)(j.ib,{className:"match-height",children:Object(f.jsx)(j.B,{xs:"12",children:Object(f.jsx)(d.default,{})})})]})}},501:function(e,t,s){"use strict";var a=s(14),i=s(28),c=s(1),n=s(2),l=s.n(n),r=s(88),o=s(482),j=s(10);t.a=function(e){var t=e.data,s=e.tag,n=e.className,d=s||"div";return Object(j.jsx)(d,{className:l()("avatar-group",Object(i.a)({},n,n)),children:t.map((function(e,t){var s=e.tag?e.tag:"div";return Object(j.jsxs)(c.Fragment,{children:[e.title?Object(j.jsx)(r.yb,{placement:e.placement,target:e.title.split(" ").join("-"),children:e.title}):null,e.meta?null:Object(j.jsx)(o.a,Object(a.a)(Object(a.a)(Object(a.a)({tag:s,className:l()("pull-up",Object(i.a)({},e.className,e.className))},e.title?{id:e.title.split(" ").join("-")}:{}),e),{},{title:void 0,meta:void 0})),e.meta?Object(j.jsx)(s,{className:"d-flex align-items-center ps-1",children:e.meta}):null]},t)}))})}},519:function(e,t,s){"use strict";var a=s(28),i=s(2),c=s.n(i),n=s(10);t.a=function(e){var t=e.data,s=e.tag,i=e.className,l=s||"ul";return Object(n.jsx)(l,{className:c()("timeline",Object(a.a)({},i,i)),children:t.map((function(e,s){var l,r=e.tag?e.tag:"li";return Object(n.jsxs)(r,{className:c()("timeline-item",Object(a.a)({},e.className,i)),children:[Object(n.jsx)("span",{className:c()("timeline-point",(l={},Object(a.a)(l,"timeline-point-".concat(e.color),e.color),Object(a.a)(l,"timeline-point-indicator",!e.icon),l)),children:e.icon?e.icon:null}),Object(n.jsxs)("div",{className:"timeline-event",children:[Object(n.jsxs)("div",{className:c()("d-flex justify-content-between flex-sm-row flex-column",{"mb-sm-0 mb-1":e.meta}),children:[Object(n.jsx)("h6",{children:e.title}),e.meta?Object(n.jsx)("span",{className:c()("timeline-event-time",Object(a.a)({},e.metaClassName,e.metaClassName)),children:e.meta}):null]}),Object(n.jsx)("p",{className:c()({"mb-0":s===t.length-1&&!e.customContent}),children:e.content}),e.customContent?e.customContent:null]})]},s)}))})}},520:function(e,t,s){"use strict";s.r(t),t.default=s.p+"static/media/avatar-s-20.40d668f5.jpg"},622:function(e,t,s){},625:function(e,t,s){"use strict";var a=s(14),i=s(28),c=s(130),n=s(482),l=s(2),r=s.n(l),o=s(497),j=s.n(o),d=s(88),b=s(694),m=s(10),h=["icon","color","stats","statTitle","series","options","type","height","className"],u=function(e){var t=e.icon,s=e.color,l=e.stats,o=e.statTitle,b=e.series,u=e.options,A=e.type,x=e.height,O=e.className,p=Object(c.a)(e,h);return Object(m.jsxs)(d.l,Object(a.a)(Object(a.a)({},p),{},{children:[Object(m.jsxs)(d.m,{className:r()("pb-0",Object(i.a)({},O,O)),children:[Object(m.jsx)(n.a,{className:"avatar-stats p-50 m-0",color:"light-".concat(s),icon:t}),Object(m.jsx)("h2",{className:"fw-bolder mt-1",children:l}),Object(m.jsx)("p",{className:"card-text",children:o})]}),Object(m.jsx)(j.a,{options:u,series:b,type:A,height:x||100})]}))};t.a=u,u.defaultProps={color:"primary",options:b.a}},694:function(e,t,s){"use strict";s.d(t,"a",(function(){return a})),s.d(t,"b",(function(){return i}));var a={chart:{toolbar:{show:!1},sparkline:{enabled:!0}},grid:{show:!1},colors:["#7367F0"],dataLabels:{enabled:!1},stroke:{curve:"smooth",width:2.5},fill:{type:"gradient",gradient:{shadeIntensity:.9,opacityFrom:.7,opacityTo:.5,stops:[0,80,100]}},xaxis:{labels:{show:!1},axisBorder:{show:!1}},yaxis:{labels:{show:!1}},tooltip:{x:{show:!1}}},i={chart:{toolbar:{show:!1},sparkline:{enabled:!0},dropShadow:{enabled:!0,top:5,left:0,blur:4,opacity:.1}},grid:{show:!1},colors:["#7367F0"],dataLabels:{enabled:!1},stroke:{curve:"smooth",width:5},fill:{type:"gradient",gradient:{shadeIntensity:1,gradientToColors:["#A9A2F6"],opacityFrom:1,opacityTo:1,stops:[0,100,100,100]}},xaxis:{labels:{show:!1},axisBorder:{show:!1}},yaxis:{labels:{show:!1}},tooltip:{x:{show:!1}}}},758:function(e,t,s){"use strict";var a=s(497),i=s.n(a),c=s(903),n=s(844),l=s(88),r=s(10);t.a=function(e){var t={chart:{height:300,type:"radar",dropShadow:{enabled:!0,blur:8,left:1,top:1,opacity:.2},toolbar:{show:!1},offsetY:5},stroke:{width:0},dataLabels:{background:{foreColor:["#ebe9f1"]}},legend:{show:!1},colors:[e.primary,e.info],plotOptions:{radar:{polygons:{strokeColors:["#ebe9f1","transparent","transparent","transparent","transparent","transparent"],connectorColors:"transparent"}}},fill:{type:"gradient",gradient:{shade:"dark",gradientToColors:[e.primary,e.info],shadeIntensity:1,type:"horizontal",opacityFrom:1,opacityTo:1,stops:[0,100,100,100]}},labels:["Jan","Feb","Mar","Apr","May","Jun"],markers:{size:0},yaxis:{show:!1},grid:{show:!1,padding:{bottom:-27}}};return Object(r.jsxs)(l.l,{children:[Object(r.jsxs)(l.p,{className:"d-flex justify-content-between align-items-start pb-1",children:[Object(r.jsxs)("div",{children:[Object(r.jsx)(l.v,{className:"mb-25",tag:"h4",children:"Sales"}),Object(r.jsx)(l.u,{children:"Last 6 months"})]}),Object(r.jsxs)(l.wb,{className:"chart-dropdown",children:[Object(r.jsx)(l.G,{color:"",className:"bg-transparent btn-sm border-0 p-50",children:Object(r.jsx)(c.a,{size:18,className:"cursor-pointer"})}),Object(r.jsxs)(l.F,{end:!0,children:[Object(r.jsx)(l.E,{className:"w-100",children:"Last 28 Days"}),Object(r.jsx)(l.E,{className:"w-100",children:"Last Month"}),Object(r.jsx)(l.E,{className:"w-100",children:"Last Year"})]})]})]}),Object(r.jsxs)(l.m,{children:[Object(r.jsx)("div",{className:"d-inline-block me-1",children:Object(r.jsxs)("div",{className:"d-flex align-items-center",children:[Object(r.jsx)(n.a,{size:13,className:"text-primary me-50"}),Object(r.jsx)("h6",{className:"mb-0",children:"Sales"})]})}),Object(r.jsx)("div",{className:"d-inline-block",children:Object(r.jsxs)("div",{className:"d-flex align-items-center",children:[Object(r.jsx)(n.a,{size:13,className:"text-info me-50"}),Object(r.jsx)("h6",{className:"mb-0",children:"Visits"})]})}),Object(r.jsx)(i.a,{options:t,series:[{name:"Sales",data:[90,50,86,40,100,20]},{name:"Visit",data:[70,75,70,76,20,85]}],type:"radar",height:300})]})]})}},759:function(e,t,s){"use strict";var a=s(15),i=s(1),c=s(5),n=s.n(c),l=s(497),r=s.n(l),o=s(484),j=s(88),d=s(10);t.a=function(e){var t=Object(i.useState)(null),s=Object(a.a)(t,2),c=s[0],l=s[1];Object(i.useEffect)((function(){return n.a.get("/card/card-analytics/avg-sessions").then((function(e){return l(e.data)})),function(){return l(null)}}),[]);var b={chart:{sparkline:{enabled:!0},toolbar:{show:!1}},grid:{show:!1,padding:{left:0,right:0}},states:{hover:{filter:"none"}},colors:["#ebf0f7","#ebf0f7",e.primary,"#ebf0f7","#ebf0f7","#ebf0f7"],plotOptions:{bar:{columnWidth:"45%",distributed:!0,borderRadius:[10]}},tooltip:{x:{show:!1}},xaxis:{type:"numeric"}};return null!==c?Object(d.jsx)(j.l,{children:Object(d.jsxs)(j.m,{children:[Object(d.jsxs)(j.ib,{className:"pb-50",children:[Object(d.jsxs)(j.B,{sm:{size:6,order:1},xs:{order:2},className:"d-flex justify-content-between flex-column mt-lg-0 mt-2",children:[Object(d.jsxs)("div",{className:"session-info mb-1 mb-lg-0",children:[Object(d.jsx)("h2",{className:"fw-bold mb-25",children:Object(o.h)(c.sessions)}),Object(d.jsx)(j.u,{className:"fw-bold mb-2",children:"Avg Sessions"}),Object(d.jsxs)("h5",{className:"font-medium-2",children:[Object(d.jsx)("span",{className:"text-success me-50",children:c.growth}),Object(d.jsx)("span",{className:"fw-normal",children:"vs last 7 days"})]})]}),Object(d.jsx)(j.i,{color:"primary",children:"View Details"})]}),Object(d.jsxs)(j.B,{sm:{size:6,order:2},xs:{order:1},className:"d-flex justify-content-between flex-column text-end",children:[Object(d.jsxs)(j.wb,{className:"chart-dropdown",children:[Object(d.jsx)(j.G,{color:"",className:"bg-transparent btn-sm border-0 p-50",children:"Last 7 days"}),Object(d.jsx)(j.F,{end:!0,children:c.last_days.map((function(e){return Object(d.jsx)(j.E,{className:"w-100",children:e},e)}))})]}),Object(d.jsx)(r.a,{options:b,series:[{name:"Sessions",data:[75,125,225,175,125,75,25]}],type:"bar",height:200})]})]}),Object(d.jsx)("hr",{}),Object(d.jsxs)(j.ib,{className:"pt-50",children:[Object(d.jsxs)(j.B,{className:"mb-2",md:"6",sm:"12",children:[Object(d.jsxs)("p",{className:"mb-50",children:["Goal: $",c.goal]}),Object(d.jsx)(j.hb,{className:"avg-session-progress mt-25",value:"50"})]}),Object(d.jsxs)(j.B,{className:"mb-2",md:"6",sm:"12",children:[Object(d.jsxs)("p",{className:"mb-50",children:["Users: ",Object(o.h)(c.users)]}),Object(d.jsx)(j.hb,{className:"avg-session-progress progress-bar-warning mt-25",value:"60"})]}),Object(d.jsxs)(j.B,{md:"6",sm:"12",children:[Object(d.jsxs)("p",{className:"mb-50",children:["Retention: ",c.retention,"%"]}),Object(d.jsx)(j.hb,{className:"avg-session-progress progress-bar-danger mt-25",value:"70"})]}),Object(d.jsxs)(j.B,{md:"6",sm:"12",children:[Object(d.jsxs)("p",{className:"mb-50",children:["Duration: ",c.duration,"yr"]}),Object(d.jsx)(j.hb,{className:"avg-session-progress progress-bar-success mt-25",value:"80"})]})]})]})}):null}},760:function(e,t,s){"use strict";var a=s(14),i=s(2),c=s.n(i),n=s(482),l=s(88),r=s(10);t.a=function(){var e=[{img:s(29).default,imgHeight:34,imgWidth:34},{content:"PI",color:"light-danger"},{img:s(247).default,imgHeight:34,imgWidth:34},{img:s(65).default,imgHeight:34,imgWidth:34},{content:"AL",color:"light-secondary"}];return Object(r.jsx)(l.l,{className:"card-app-design",children:Object(r.jsxs)(l.m,{children:[Object(r.jsx)(l.f,{color:"light-primary",children:"03 Sep, 20"}),Object(r.jsx)(l.v,{className:"mt-1 mb-75",children:"App design"}),Object(r.jsx)(l.u,{className:"font-small-2 mb-2",children:"You can Find Only Post and Quotes Related to IOS like ipad app design, iphone app design"}),Object(r.jsxs)("div",{className:"design-group mb-2 pt-50",children:[Object(r.jsx)("h6",{className:"section-label",children:"Team"}),Object(r.jsx)(l.f,{className:"me-1",color:"light-warning",children:"Figma"}),Object(r.jsx)(l.f,{color:"light-primary",children:"Wireframe"})]}),Object(r.jsxs)("div",{className:"design-group pt-25",children:[Object(r.jsx)("h6",{className:"section-label",children:"Members"}),e.map((function(t,s){return Object(r.jsx)(n.a,Object(a.a)({className:c()({"me-75":s!==e.length-1})},t),s)}))]}),Object(r.jsx)("div",{className:"design-planning-wrapper mb-2 py-75",children:[{title:"Due Date",subtitle:"12 Apr, 21"},{title:"Budget",subtitle:"$49251.91"},{title:"Cost",subtitle:"$840.99"}].map((function(e){return Object(r.jsxs)("div",{className:"design-planning",children:[Object(r.jsx)(l.u,{className:"mb-25",children:e.title}),Object(r.jsx)("h6",{className:"mb-0",children:e.subtitle})]},e.title)}))}),Object(r.jsx)("div",{className:"d-grid",children:Object(r.jsx)(l.i,{color:"primary",children:"Join Team"})})]})})}},761:function(e,t,s){"use strict";var a=s(15),i=s(1),c=s(5),n=s.n(c),l=s(497),r=s.n(l),o=s(88),j=s(10);t.a=function(e){var t=Object(i.useState)(null),s=Object(a.a)(t,2),c=s[0],l=s[1];Object(i.useEffect)((function(){return n.a.get("/card/card-analytics/support-tracker").then((function(e){return l(e.data)})),function(){return l(null)}}),[]);var d={plotOptions:{radialBar:{size:150,offsetY:20,startAngle:-150,endAngle:150,hollow:{size:"65%"},track:{background:"#fff",strokeWidth:"100%"},dataLabels:{name:{offsetY:-5,fontFamily:"Montserrat",fontSize:"1rem"},value:{offsetY:15,fontFamily:"Montserrat",fontSize:"1.714rem"}}}},colors:[e.danger],fill:{type:"gradient",gradient:{shade:"dark",type:"horizontal",shadeIntensity:.5,gradientToColors:[e.primary],inverseColors:!0,opacityFrom:1,opacityTo:1,stops:[0,100]}},stroke:{dashArray:8},labels:["Completed Tickets"]};return null!==c?Object(j.jsxs)(o.l,{children:[Object(j.jsxs)(o.p,{className:"pb-0",children:[Object(j.jsx)(o.v,{tag:"h4",children:c.title}),Object(j.jsxs)(o.wb,{className:"chart-dropdown",children:[Object(j.jsx)(o.G,{color:"",className:"bg-transparent btn-sm border-0 p-50",children:"Last 7 days"}),Object(j.jsx)(o.F,{end:!0,children:c.last_days.map((function(e){return Object(j.jsx)(o.E,{className:"w-100",children:e},e)}))})]})]}),Object(j.jsxs)(o.m,{children:[Object(j.jsxs)(o.ib,{children:[Object(j.jsxs)(o.B,{sm:"2",className:"d-flex flex-column flex-wrap text-center",children:[Object(j.jsx)("h1",{className:"font-large-2 fw-bolder mt-2 mb-0",children:c.totalTicket}),Object(j.jsx)(o.u,{children:"Tickets"})]}),Object(j.jsx)(o.B,{sm:"10",className:"d-flex justify-content-center",children:Object(j.jsx)(r.a,{options:d,series:[83],type:"radialBar",height:270,id:"support-tracker-card"})})]}),Object(j.jsxs)("div",{className:"d-flex justify-content-between mt-1",children:[Object(j.jsxs)("div",{className:"text-center",children:[Object(j.jsx)(o.u,{className:"mb-50",children:"New Tickets"}),Object(j.jsx)("span",{className:"font-large-1 fw-bold",children:c.newTicket})]}),Object(j.jsxs)("div",{className:"text-center",children:[Object(j.jsx)(o.u,{className:"mb-50",children:"Open Tickets"}),Object(j.jsx)("span",{className:"font-large-1 fw-bold",children:c.openTicket})]}),Object(j.jsxs)("div",{className:"text-center",children:[Object(j.jsx)(o.u,{className:"mb-50",children:"Response Time"}),Object(j.jsxs)("span",{className:"font-large-1 fw-bold",children:[c.responseTime,"d"]})]})]})]})]}):null}},762:function(e,t,s){"use strict";var a=s(15),i=s(1),c=s(5),n=s.n(c),l=s(904),r=s(625),o=s(10);t.a=function(e){var t=e.kFormatter,s=e.warning,c=Object(i.useState)(null),j=Object(a.a)(c,2),d=j[0],b=j[1],m={chart:{id:"revenue",toolbar:{show:!1},sparkline:{enabled:!0}},grid:{show:!1},colors:[s],dataLabels:{enabled:!1},stroke:{curve:"smooth",width:2.5},fill:{type:"gradient",gradient:{shadeIntensity:.9,opacityFrom:.7,opacityTo:.5,stops:[0,80,100]}},xaxis:{labels:{show:!1},axisBorder:{show:!1}},yaxis:{labels:{show:!1}},tooltip:{x:{show:!1}}};return Object(i.useEffect)((function(){return n.a.get("/card/card-statistics/orders").then((function(e){return b(e.data)})),function(){return b(null)}}),[]),null!==d?Object(o.jsx)(r.a,{icon:Object(o.jsx)(l.a,{size:21}),color:"warning",stats:t(d.analyticsData.orders),statTitle:"Orders Received",options:m,series:d.series,type:"area"}):null}},763:function(e,t,s){"use strict";var a=s(15),i=s(1),c=s(5),n=s.n(c),l=s(942),r=s(625),o=s(10);t.a=function(e){var t=e.kFormatter,s=Object(i.useState)(null),c=Object(a.a)(s,2),j=c[0],d=c[1];return Object(i.useEffect)((function(){return n.a.get("/card/card-statistics/subscribers").then((function(e){return d(e.data)})),function(){return d(null)}}),[]),null!==j?Object(o.jsx)(r.a,{icon:Object(o.jsx)(l.a,{size:21}),color:"primary",stats:t(j.analyticsData.subscribers),statTitle:"Subscribers Gained",series:j.series,type:"area"}):null}},764:function(e,t,s){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAkCAMAAAAw96PuAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIaADAAQAAAABAAAAJAAAAADeoA9wAAABcVBMVEUAAAD/qlX/qlX/n2D/qlX/n1D/pUv/qkf/oUP/pk3/qkn/okb/o0f/okT/n0j/oEn/n0b/pEn/oEf/okb/oUj/o0f/n0X/oUT/o0f/oEb/pEP/okb/n0T/okT/oEb/n0T/oEX/o0b/n0P/oUP/okb/oUT/n0b/oUX/oET/oUb/n0X/oET/oUP/oEX/okT/oEP/oUX/oUP/oET/oUX/oEX/n0T/oEX/oET/oEX/n0T/oET/n0P/oEX/n0P/oUT/n0T/oEX/oUT/oET/oEP/oET/oUT/oEP/oEP/oET/oEP/oEP/oET/n0T/oET/oEP/n0T/oET/n0T/n0T/oET/n0T/n0P/oET/n0P/oET/n0T/oEP/oET/oET/n0T/n0T/oEP/oEP/n0P/oET/n0P/n0T/n0T/n0P/oEP/n0T/oEP/n0P/oET/n0T/oEP/oET/n0T/oET/oEP/n0T/oEP/oET/n0P/oEP/oET/n0T/oEP/n0NWaDR5AAAAenRSTlMAAwYICRAREhMUFRYZHiAjKCorLC4vMDEyMzU3ODw+QENFSExNT1BRU1RVVldZWltcX2Zna21zdHZ4e31+hYeIkZKTlJmam5yen6OkpaanqKmtsLG4ury9v8DBw8fIytHU1dfY2t3g5OXn6Onq6+zt7u/w8/n6+/z9/jLTlDYAAAE3SURBVDjL7dRHUwIxFMDxZ0OsIAoqtijqYhcVCxZQZO0iWLAXYC0IsqIivE/vRh2GLLs5evJ/yLyZ/CaHzCQAAAbxAZmezMBUfoPqEk2McGFpz5Zi4VPtyjllSTYXiYBKRCYpSbVwBIx/UmLlCBij5MXGETCaVYZ0G0fAMCVyO0eA80MZX+0cAQIlmVaOgAFK5rREbOq3sJ5g+hcaQvweTyOYCPjjiMf+c2XZyeP+PSsER6rW2ruNQzWDlW4ksIlVB2pxBnuIR3CCqxAjlvo3Y4nITgCRlsve8RZCxGP2NgRZ0S8gXpuc6xDFEFyRhWBdI3NGdM2wKC1tmEbSxr5dmz1H5vMdwIhw13TmTuh2JzHu6pmV0bOFl46Lv71TH0/M6P0OhTp1fphChz8Po1p81N6XVioAvgBZgp3AxW+3KgAAAABJRU5ErkJggg=="},789:function(e,t,s){"use strict";var a=s(828),i=s(482),c=s(88),n=s(10);t.a=function(){return Object(n.jsx)(c.l,{className:"card-congratulations",children:Object(n.jsxs)(c.m,{className:"text-center",children:[Object(n.jsx)("img",{className:"congratulations-img-left",src:"data:image/png;base64,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",alt:"decor-left"}),Object(n.jsx)("img",{className:"congratulations-img-right",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMUAAABTCAMAAAAY2TOcAAABAlBMVEUAAADtj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj50b0aftj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj53tj50b0acb0acb0aftj53tj53tj53tj53/vAEb0af/vAEb0aftj50b0acb0acb0af/vAEb0af/vAEb0af/vAEb0acb0af/vAH/vAH/vAH/vAH/vAH/vAEb0af/vAEb0af4qz7/vAHtj50b0af/vAFW6jjPAAAAU3RSTlMAAvcI/RXta/IF3tfCWUnStU8sIOF86L2ml4LNuHE3EAySU5wpKCQbsY5hRfnIq6Iy5NaxnYiFdz708uBkQQtbTph5IBT56MXw4puXSEY9IpIxHhHzkVEAAAVwSURBVHja7dtpV9pAGAXgmz00gOyL7CKyKWC12s1q7b4vL/3/f6U0CBPizICVWNLj88GPntzhvZkJJ4DsSgShR0SlKsKOJvRiDeGm0x+5GELNpqn8HkLMpitqVkNo2TTn9BFWNnkUDISTTV6mpSCMbFp0MEIIZchHb9QROhm65nAHYZMhjkQa4ZIhHvV0Q4+Ir14+e/Ps0095CsZ5jA30+cmvP558WZKCGRoIELlwM98mIVzvX2GBQ0JmT8HMZqT4+GvmJTzi2CIxPYuZzUjxYZ7iGWaUZIkkKTLZ8s78w9iMFL/m3swyxCYBhCnUQl/BAT2wNExtRAr/ZxHpOUTCFCWrhokhEZnb05JvRIrFXmhWhkiUwmyMMJWdfizFFrAZKbz3qHolR1dyKPkKnY+xGYrRlN5ZunlcHr+4gxRsv6hlTZpLILpQ6O00PEY0dyAv+sV4/HA36BRs7/5xYpPHtieFOoj7rrROzKTodYjsPh2Px0/PcTfaXZsWJOcptio1XHO4WJgTQdFfPxy72FQFKF1Uyac9TWEXR+CJ0iK1mQLH0djFpio4reE++eXcC42yQvs06ZrEGWegHs5ivEOgUgWdrksAhe09CJ0SRykWgc+L47Hr7WsEqNohrm3I7RBXpnKt6Oduv4McqMdlEtiBXIoEzEdtzlRdIDDxKAmlIafpJLI/TPmn6hIB0OKNApIlEjNXeJ6VKPcRsFalrBJZOHsguwwskyepUgyBqe00p2uo1gCtq5PICZYpkpTZHCEISvU0Or/swvQGtSUrt1yFJB7sFCd/ulUFa2XECjnyOIMrklXF5ZaLk5BZiVwdeg8bZ+sKEnl8UtJ9a6XMW3IgLLdciwT0ogHAYKMVj+C20r2BTddkMadYtqDcchFBqcopuDzDag6TGv6a1u86xKO3F4ImyO8RluPe4pw4rnTJyx7E6n93Q02oJJDAopjJLbdcmTOIFhueJPmonV4NN1FPFv0rJb9Io8Art1yDfPa7NTB1nbOrly0DK3tEUjlO3ZKHnHJLWbRo4DsBHxCPHrXakDFS8d5poxB1CrB0Ylab+lqR5vJgVrzVls7gc0IiB6dpf4PT1aS13eyUDvfnA7gHJG0SawkOuA6LuYI0MTnO97Z9kjhxFy7Vj1W6hbxjih4NqjkSiUJAe6SvXm4obNlO6rz/ppKIainAUJXu/tp0qRwS6EFoND3n7mEVDk0V0jc8L26l3ALkSCI5G/Q8cdl1iEVOVSJTwSo60yGvQiBLfA3taoIl5U2wKxoSTxNSe9Hl5Wb7WiYmTlwlnlxc9uzOqj2nbBNHFXKKlcVKLLKlL4hEbN4iG5hTOiSwDa/e/vWhxLqcNduQSvBrzdQeyKrN9G3yqeDOVDi1XjRSZdVmUoe+Q4CBOzPi1NrHklabaW+R1wB3RzF9teYoSKvN1MvkEccdGizWmqfuSKvNRJo0l1Fwh6yFWvOlbHm1mawnZ3CeH73Aopan1kKxJdVmYiq59DQC85zz9f4huboaJIpLqs08Nv3P0+sPMfH0AguGrNZiWmlJtZmWu8HEEJjLsesSXj0i6hhYIm3SqiNvHBCZGoJz8XQ88RxebVZrmeSyajNahxoI0u7DWQhmkLrZI3YSyyiNFAL14ug5/k4kOqt2qLVzbrVD/S74RF93qx122Um1Q/w6+xWlTEmEn1HEvXv37v2P+vmw/lLHw9LJ2cgYu8dHWFGkSBNOG5vm659X3M6xEiNPrjzWp5qP47bO393kvbAEuaLrG6nWYB1HuuPx1DFWYTg00YxgXRo6TWRxS6/fTl80vFhxpLZIr6z1cD2hF28/UpMMR1+xKoNN8TpoDlEnhds7+r6Lfyce3bhftf8GxgHAIi+xyUgAAAAASUVORK5CYII=",alt:"decor-right"}),Object(n.jsx)(i.a,{icon:Object(n.jsx)(a.a,{size:28}),className:"shadow",color:"primary",size:"xl"}),Object(n.jsxs)("div",{className:"text-center",children:[Object(n.jsx)("h1",{className:"mb-1 text-white",children:"Congratulations John,"}),Object(n.jsxs)(c.u,{className:"m-auto w-75",children:["You have done ",Object(n.jsx)("strong",{children:"57.6%"})," more sales today. Check your new badge in your profile."]})]})]})})}}}]);
//# sourceMappingURL=40.09fff38f.chunk.js.map