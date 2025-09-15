import{j as z}from"./jsx-runtime-DF2Pcvd1.js";import{r as d}from"./index-B2-qRKKC.js";import{m as k,d as G}from"./styled-components.browser.esm-DWIjLzHK.js";import"./_commonjsHelpers-Cpj98o6Y.js";const c=(e,t)=>e==null?t:typeof e=="number"?`${e}px`:e,_=(e=20,t=100)=>Array.from({length:e},(p,r)=>{const a=Math.floor(Math.random()*t),i=Math.floor(Math.random()*t);return`${Math.round(r/e*100)}% { clip: rect(${a}px, 9999px, ${i}px, 0); }`}).join(`
`),u=(e,t)=>k`${_(e,t)}`;function w({text:e,fontSize:t="100px",width:p="400px",steps:r=20,maxClip:a=100,speed1:i=2,speed2:l=3,color:S,className:v}){const q=d.useMemo(()=>u(r,a),[r,a]),C=d.useMemo(()=>u(r,a),[r,a]),M=c(t,"100px"),V=c(p,"400px");return z.jsx(j,{className:v,"data-text":e,$fontSize:M,$width:V,$noise1:q,$noise2:C,$speed1:i,$speed2:l,$color:S,children:e})}const j=G.div`
  position: relative;
  margin: 0 auto;
  font-family: "Varela", ui-sans-serif, system-ui, -apple-system, Segoe UI,
    Roboto, Ubuntu, Cantarell, "Noto Sans", Arial, sans-serif;
  /* Default to dark-mode friendly (white) */
  color: ${({$color:e})=>e??"#fff"};
  :root[data-sb-theme='light'] & {
    color: ${({$color:e})=>e??"#000"};
  }
  :root[data-sb-theme='dark'] & {
    color: ${({$color:e})=>e??"#fff"};
  }
  font-size: ${({$fontSize:e})=>e};
  width: ${({$width:e})=>e};

  &::after,
  &::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    color: inherit;
    /* Match visible bands to the Storybook-selected background (or transparent) */
    background: var(--glitch-band-bg, transparent);
    overflow: hidden;
  }

  &::after {
    left: 2px;
    text-shadow: -1px 0 red;
    animation: ${({$noise1:e})=>e} ${({$speed1:e})=>e}s infinite
      linear alternate-reverse;
  }

  &::before {
    left: -2px;
    text-shadow: 1px 0 blue;
    animation: ${({$noise2:e})=>e} ${({$speed2:e})=>e}s infinite
      linear alternate-reverse;
  }
`;w.__docgenInfo={description:"",methods:[],displayName:"GlitchText",props:{text:{required:!0,tsType:{name:"string"},description:""},fontSize:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"",defaultValue:{value:'"100px"',computed:!1}},width:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"",defaultValue:{value:'"400px"',computed:!1}},steps:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"20",computed:!1}},maxClip:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},speed1:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"2",computed:!1}},speed2:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"3",computed:!1}},color:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const A={title:"Components/GlitchText",component:w,args:{text:"GLITCH",fontSize:"96px",width:"420px",steps:20,maxClip:100,speed1:2,speed2:3},parameters:{layout:"centered"}},o={},s={args:{speed1:1.2,speed2:1.6}},n={args:{color:"#ff00aa"}};var m,f,x;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(x=(f=o.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var g,h,b;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    speed1: 1.2,
    speed2: 1.6
  }
}`,...(b=(h=s.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var $,y,T;n.parameters={...n.parameters,docs:{...($=n.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    color: '#ff00aa'
  }
}`,...(T=(y=n.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};const F=["Default","Fast","CustomColor"];export{n as CustomColor,o as Default,s as Fast,F as __namedExportsOrder,A as default};
