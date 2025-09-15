import{j as o}from"./jsx-runtime-DF2Pcvd1.js";import{r}from"./index-B2-qRKKC.js";import{d as n,m}from"./styled-components.browser.esm-DWIjLzHK.js";import"./_commonjsHelpers-Cpj98o6Y.js";const V=m`
  17% {
    border-bottom-right-radius: 3px;
  }
  25% {
    transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    transform: translateY(18px) scale(1, .9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }
  75% {
    transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    transform: translateY(0) rotate(90deg);
  }
`,j=m`
  0%, 100% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1);
  }
`,C=n.div`
  background: ${e=>e.$bg};
  overflow: hidden;
  height: ${e=>e.$full?"100vh":"auto"};
  width: ${e=>e.$full?"100vw":"100%"};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${e=>e.$full?0:"24px"};
`,L=n.div`
  width: ${e=>e.$size}px;
  height: ${e=>e.$size}px;
  margin: 20px auto;
  position: relative;

  &::before {
    content: "";
    width: ${e=>e.$size}px;
    height: 5px;
    background: #000;
    opacity: 0.1;
    position: absolute;
    top: calc(${e=>e.$size}px + 9px);
    left: 0;
    border-radius: 50%;
    animation: ${j} ${e=>e.$duration}s linear infinite;
  }

  &::after {
    content: "";
    width: ${e=>e.$size}px;
    height: ${e=>e.$size}px;
    background: ${e=>e.$color};
    animation: ${V} ${e=>e.$duration}s linear infinite;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
  }
`,M=n.div`
  font-family: "Comic Sans MS", "Arial Rounded MT Bold", cursive;
  font-size: ${e=>e.$fontSize};
  font-weight: bold;
  color: ${e=>e.$color};
  margin-top: 12px;
  text-align: center;
`,x=({background:e="#f9f9f9",boxSize:$=50,color:g="#6136ca",duration:b=.5,text:s="Loading..",textColor:h="#6136ca",fontSize:a="18px",fullScreen:y=!0,className:v,dotSteps:i=3,dotIntervalMs:l=400})=>{const T=typeof a=="number"?`${a}px`:a,[u,z]=r.useState(1);r.useEffect(()=>{const d=Math.max(1,Math.floor(i)),w=window.setInterval(()=>{z(q=>q%d+1)},Math.max(100,l));return()=>window.clearInterval(w)},[i,l]);const S=r.useMemo(()=>`${(s??"").replace(/[.]+$/,"")}${".".repeat(u)}`,[s,u]);return o.jsxs(C,{$bg:e,$full:y,className:v,children:[o.jsx(L,{$size:$,$color:g,$duration:b}),o.jsx(M,{$color:h,$fontSize:T,children:S})]})};x.__docgenInfo={description:"",methods:[],displayName:"BoxLoading",props:{background:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"#f9f9f9"',computed:!1}},boxSize:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"50",computed:!1}},color:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"#6136ca"',computed:!1}},duration:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0.5",computed:!1}},text:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Loading.."',computed:!1}},textColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"#6136ca"',computed:!1}},fontSize:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"",defaultValue:{value:'"18px"',computed:!1}},fullScreen:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},dotSteps:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"3",computed:!1}},dotIntervalMs:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"400",computed:!1}}}};const _={title:"Components/BoxLoading",component:x,args:{background:"#f9f9f9",boxSize:50,color:"#1a6844",duration:.5,text:"Loading..",textColor:"#6136ca",fontSize:"18px",fullScreen:!0},argTypes:{boxSize:{control:{type:"range",min:20,max:120,step:1}},duration:{control:{type:"range",min:.2,max:2,step:.1}},fullScreen:{control:"boolean"}},parameters:{layout:"fullscreen"}},t={};var p,c,f;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(f=(c=t.parameters)==null?void 0:c.docs)==null?void 0:f.source}}};const D=["Default"];export{t as Default,D as __namedExportsOrder,_ as default};
