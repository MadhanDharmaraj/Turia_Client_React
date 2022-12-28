(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[148],{1615:function(e,s,r){"use strict";r.r(s);var a=r(1),c=r(90),n=r(255),t=r.n(n),l=r(504),i=r(496),o=r(12),d=function(){return Object(o.jsxs)("div",{className:"demo-vertical-spacing",children:[Object(o.jsxs)("div",{children:[Object(o.jsx)("span",{children:"Reticulating splines\u2026 0%"}),Object(o.jsx)(c.ib,{})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("span",{children:"Reticulating splines\u2026 25%"}),Object(o.jsx)(c.ib,{value:"25"})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("span",{children:"Reticulating splines\u2026 50%"}),Object(o.jsx)(c.ib,{value:50})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("span",{children:"Reticulating splines\u2026 75%"}),Object(o.jsx)(c.ib,{value:75})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("span",{children:"Reticulating splines\u2026 100%"}),Object(o.jsx)(c.ib,{value:"100"})]})]})},j=function(){return Object(o.jsxs)("div",{className:"demo-vertical-spacing",children:[Object(o.jsx)(c.ib,{value:25}),Object(o.jsx)(c.ib,{className:"progress-bar-secondary",value:35}),Object(o.jsx)(c.ib,{className:"progress-bar-success",value:45}),Object(o.jsx)(c.ib,{className:"progress-bar-danger",value:55}),Object(o.jsx)(c.ib,{className:"progress-bar-warning",value:65}),Object(o.jsx)(c.ib,{className:"progress-bar-info",value:75}),Object(o.jsx)(c.ib,{className:"progress-bar-dark",value:85})]})},b=function(){return Object(o.jsxs)("div",{className:"demo-vertical-spacing",children:[Object(o.jsx)(c.ib,{value:"25",children:"25%"}),Object(o.jsx)(c.ib,{value:"35",className:"progress-bar-secondary",children:"35%"}),Object(o.jsx)(c.ib,{value:"45",className:"progress-bar-success",children:"45%"}),Object(o.jsx)(c.ib,{value:"55",className:"progress-bar-danger",children:"55%"}),Object(o.jsx)(c.ib,{className:"progress-bar-warning",value:"65",children:"65%"}),Object(o.jsx)(c.ib,{className:"progress-bar-info",value:"75",children:"75%"}),Object(o.jsx)(c.ib,{className:"progress-bar-dark",value:"85",children:"85%"})]})},g=function(){return Object(o.jsxs)("div",{className:"demo-vertical-spacing",children:[Object(o.jsx)(c.ib,{striped:!0,value:20}),Object(o.jsx)(c.ib,{striped:!0,className:"progress-bar-success",value:40}),Object(o.jsx)(c.ib,{striped:!0,className:"progress-bar-danger",value:60}),Object(o.jsx)(c.ib,{striped:!0,className:"progress-bar-warning",value:80}),Object(o.jsx)(c.ib,{striped:!0,className:"progress-bar-info",value:100})]})},p=function(){return Object(o.jsxs)("div",{className:"demo-vertical-spacing",children:[Object(o.jsx)(c.ib,{animated:!0,striped:!0,value:20}),Object(o.jsx)(c.ib,{animated:!0,striped:!0,className:"progress-bar-success",value:40}),Object(o.jsx)(c.ib,{animated:!0,striped:!0,className:"progress-bar-danger",value:60}),Object(o.jsx)(c.ib,{animated:!0,striped:!0,className:"progress-bar-warning",value:80}),Object(o.jsx)(c.ib,{animated:!0,striped:!0,className:"progress-bar-info",value:100})]})},u=function(){return Object(o.jsxs)(c.ib,{multi:!0,children:[Object(o.jsx)(c.ib,{bar:!0,color:"danger",value:"15",children:"15%"}),Object(o.jsx)(c.ib,{bar:!0,color:"warning",value:"50",children:"50%"}),Object(o.jsx)(c.ib,{bar:!0,color:"primary",value:"10",children:"10%"})]})},m=Object(o.jsx)("pre",{children:Object(o.jsx)("code",{className:"language-jsx",children:"\n\nimport { Progress } from 'reactstrap'\nconst ProgressBasic = () => {\n  return (\n    <div className='demo-vertical-spacing'>\n      <div>\n        <span>Reticulating splines\u2026 0%</span>\n        <Progress />\n      </div>\n      <div>\n        <span>Reticulating splines\u2026 25%</span>\n        <Progress value='25' />\n      </div>\n      <div>\n        <span>Reticulating splines\u2026 50%</span>\n        <Progress value={50} />\n      </div>\n      <div>\n        <span>Reticulating splines\u2026 75%</span>\n        <Progress value={75} />\n      </div>\n      <div>\n        <span>Reticulating splines\u2026 100%</span>\n        <Progress value='100' />\n      </div>\n    </div>\n  )\n}\nexport default ProgressBasic\n"})}),x=Object(o.jsx)("pre",{children:Object(o.jsx)("code",{className:"language-jsx",children:"\n\nimport { Progress } from 'reactstrap'\n\nconst ProgressColored = () => {\n  return (\n    <React.Fragment>\n      <Progress value={25} />\n      <Progress className='progress-bar-secondary' value={35} />\n      <Progress className='progress-bar-success' value={45} />\n      <Progress className='progress-bar-danger' value={55} />\n      <Progress className='progress-bar-warning' value={65} />\n      <Progress className='progress-bar-info' value={75} />\n      <Progress className='progress-bar-dark' value={85} />\n    </React.Fragment>\n  )\n}\nexport default ProgressColored\n"})}),O=Object(o.jsx)("pre",{children:Object(o.jsx)("code",{className:"language-jsx",children:"\n\nimport { Progress } from 'reactstrap'\n\nconst ProgressMultipleStacked = () => {\n  return (\n     <Progress multi>\n        <Progress bar color='danger' value='15'>\n          15%\n        </Progress>\n        <Progress bar color='warning' value='50'>\n          50%\n        </Progress>\n        <Progress bar color='primary' value='10'>\n          10%\n        </Progress>\n    </Progress>\n  )\n}\nexport default ProgressMultipleStacked\n"})}),h=Object(o.jsx)("pre",{children:Object(o.jsx)("code",{className:"language-jsx",children:"\n\nimport { Progress } from 'reactstrap'\n\nconst ProgressLabeled = () => {\n  return (\n    <div className='demo-vertical-spacing'>\n      <Progress value='25'>25%</Progress>\n      <Progress value='35' className='progress-bar-secondary'>\n        35%\n      </Progress>\n      <Progress value='45' className='progress-bar-success'>\n        45%\n      </Progress>\n      <Progress value='55' className='progress-bar-danger'>\n        55%\n      </Progress>\n      <Progress className='progress-bar-warning' value='65'>\n        65%\n      </Progress>\n      <Progress className='progress-bar-info' value='75'>\n        75%\n      </Progress>\n      <Progress className='progress-bar-dark' value='85'>\n        85%\n      </Progress>\n    </div>\n  )\n}\nexport default ProgressLabeled\n"})}),v=Object(o.jsx)("pre",{children:Object(o.jsx)("code",{className:"language-jsx",children:"\n\nimport { Progress } from 'reactstrap'\nconst ProgressStriped = () => {\n  return (\n    <React.Fragment>\n      <Progress striped value={20} />\n      <Progress striped className='progress-bar-success' value={40} />\n      <Progress striped className='progress-bar-danger' value={60} />\n      <Progress striped className='progress-bar-warning' value={80} />\n      <Progress striped className='progress-bar-info' value={100} />\n    </React.Fragment>\n  )\n}\nexport default ProgressStriped\n"})}),N=Object(o.jsx)("pre",{children:Object(o.jsx)("code",{className:"language-jsx",children:"\n\nimport { Progress } from 'reactstrap'\n\nconst ProgressAnimated = () => {\n  return (\n    <React.Fragment>\n      <Progress striped value={20} />\n      <Progress striped className='progress-bar-success' value={40} />\n      <Progress striped className='progress-bar-danger' value={60} />\n      <Progress striped className='progress-bar-warning' value={80} />\n      <Progress striped className='progress-bar-info' value={100} />\n    </React.Fragment>\n  )\n}\nexport default ProgressAnimated\n"})});s.default=function(){return Object(a.useEffect)((function(){t.a.highlightAll()}),[]),Object(o.jsxs)(a.Fragment,{children:[Object(o.jsx)(i.a,{title:"Progress",data:[{title:"Components"},{title:"Progress"}]}),Object(o.jsxs)(c.jb,{children:[Object(o.jsx)(c.B,{lg:"12",children:Object(o.jsx)(l.a,{title:"Basic Progress",code:m,children:Object(o.jsx)(d,{})})}),Object(o.jsx)(c.B,{lg:"12",children:Object(o.jsxs)(l.a,{title:"Colored Progress",code:x,children:[Object(o.jsxs)(c.u,{children:["Use ",Object(o.jsx)("code",{children:"progress-bar-[color]"})," class with progress to change progress color."]}),Object(o.jsx)(j,{})]})}),Object(o.jsx)(c.B,{lg:"12",children:Object(o.jsxs)(l.a,{title:"Labeled Progress",code:h,children:[Object(o.jsx)(c.u,{children:"Add text between progress tag to create a labeled progress bar."}),Object(o.jsx)(b,{})]})}),Object(o.jsx)(c.B,{lg:"12",children:Object(o.jsxs)(l.a,{title:"Multiple Stacked",code:O,children:[Object(o.jsxs)(c.u,{children:["To create a multi colored progress wrap all of your progresses in with ",Object(o.jsx)("code",{children:"multi"})," prop."]}),Object(o.jsx)(u,{})]})}),Object(o.jsx)(c.B,{lg:"12",children:Object(o.jsxs)(l.a,{title:"Striped Progress",code:v,children:[Object(o.jsxs)(c.u,{children:["Use ",Object(o.jsx)("code",{children:"striped"})," prop with progress to create a striped progress bar."]}),Object(o.jsx)(g,{})]})}),Object(o.jsx)(c.B,{lg:"12",children:Object(o.jsxs)(l.a,{title:"Animated Progress",code:N,children:[Object(o.jsxs)(c.u,{children:["Use ",Object(o.jsx)("code",{children:"animated"})," prop with progress to animate progress bar."]}),Object(o.jsx)(p,{})]})})]})]})}},496:function(e,s,r){"use strict";var a=r(16),c=r(1),n=r(131),t=r(5),l=r.n(t),i=r(902),o=r(858),d=r(832),j=r(830),b=r(831),g=r(90),p=r(12);s.a=function(e){var s=e.data,r=e.title;return Object(p.jsxs)("div",{className:"content-header row",children:[Object(p.jsx)("div",{className:"content-header-left col-md-9 col-12 mb-2",children:Object(p.jsx)("div",{className:"row breadcrumbs-top",children:Object(p.jsxs)("div",{className:"col-12",children:[r?Object(p.jsx)("h2",{className:"content-header-title float-start mb-0",children:r}):"",Object(p.jsx)("div",{className:"breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12",children:Object(p.jsxs)(g.g,{children:[Object(p.jsx)(g.h,{tag:"li",children:Object(p.jsx)(n.b,{to:"/",children:"Home"})}),s.map((function(e,r){var t=e.link?n.b:c.Fragment,i=s.length-1===r;return Object(p.jsx)(g.h,{tag:"li",active:!i,className:l()({"text-primary":!i}),children:Object(p.jsx)(t,Object(a.a)(Object(a.a)({},e.link?{to:e.link}:{}),{},{children:e.title}))},r)}))]})})]})})}),Object(p.jsx)("div",{className:"content-header-right text-md-end col-md-3 col-12 d-md-block d-none",children:Object(p.jsx)("div",{className:"breadcrumb-right dropdown",children:Object(p.jsxs)(g.ub,{children:[Object(p.jsx)(g.G,{color:"primary",className:"btn-icon btn-round dropdown-toggle",children:Object(p.jsx)(i.a,{size:14})}),Object(p.jsxs)(g.F,{tag:"ul",end:!0,children:[Object(p.jsxs)(g.E,{tag:n.b,to:"/apps/todo",children:[Object(p.jsx)(o.a,{className:"me-1",size:14}),Object(p.jsx)("span",{className:"align-middle",children:"Todo"})]}),Object(p.jsxs)(g.E,{tag:n.b,to:"/apps/chat",children:[Object(p.jsx)(d.a,{className:"me-1",size:14}),Object(p.jsx)("span",{className:"align-middle",children:"Chat"})]}),Object(p.jsxs)(g.E,{tag:n.b,to:"/apps/email",children:[Object(p.jsx)(j.a,{className:"me-1",size:14}),Object(p.jsx)("span",{className:"align-middle",children:"Email"})]}),Object(p.jsxs)(g.E,{tag:n.b,to:"/apps/calendar",children:[Object(p.jsx)(b.a,{className:"me-1",size:14}),Object(p.jsx)("span",{className:"align-middle",children:"Calendar"})]})]})]})})})]})}},504:function(e,s,r){"use strict";var a=r(17),c=r(1),n=r(871),t=r(90),l=r(12);s.a=function(e){var s=e.title,r=e.children,i=e.noBody,o=e.code,d=e.iconCode,j=Object(c.useState)(!1),b=Object(a.a)(j,2),g=b[0],p=b[1],u=d||Object(l.jsx)(n.a,{size:15}),m=i?c.Fragment:t.m;return Object(l.jsxs)(t.l,{className:"card-snippet",children:[Object(l.jsxs)(t.p,{children:[Object(l.jsx)(t.v,{tag:"h4",children:s}),Object(l.jsx)("div",{className:"views cursor-pointer",onClick:function(){return p(!g)},children:u})]}),Object(l.jsx)(m,{children:r}),Object(l.jsx)(t.C,{isOpen:g,children:Object(l.jsx)(t.m,{children:o})})]})}}}]);
//# sourceMappingURL=148.5eef4aa8.chunk.js.map