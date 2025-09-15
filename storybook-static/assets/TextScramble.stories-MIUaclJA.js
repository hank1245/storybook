import{j as f}from"./jsx-runtime-DF2Pcvd1.js";import{r as n}from"./index-B2-qRKKC.js";import{d as C}from"./styled-components.browser.esm-DWIjLzHK.js";import"./_commonjsHelpers-Cpj98o6Y.js";const N=C.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* Storybook 배경과 어울리도록 선택된 배경을 따라가고, 기본은 원본 색 */
  background: var(--sb-background, #212121);
  font-family: "Roboto Mono", monospace;
`,V=C.div`
  font-weight: 100;
  font-size: ${e=>e.fontSize};
  /* Default to dark-mode friendly (white) */
  color: ${e=>e.$color??"#fff"};

  /* Storybook theme attribute overrides */
  :root[data-sb-theme='light'] & {
    color: ${e=>e.$color??"#000"};
  }
  :root[data-sb-theme='dark'] & {
    color: ${e=>e.$color??"#fff"};
  }


  .dud {
    color: #757575;
  }
`,B=()=>{const e="!<>-_\\/[]{}—=+*^?#________";return e[Math.floor(Math.random()*e.length)]};function L({phrases:e,color:A,interval:b=800,fontSize:F="28px",className:O}){const[T,w]=n.useState([]),u=n.useRef(),s=n.useRef([]),i=n.useRef(0),x=n.useRef(0),l=n.useRef(),D=r=>{const t=T.map(o=>typeof o=="string"?o:o.dud).join(""),d=Math.max(t.length,r.length);return new Promise(o=>{l.current=o,s.current=[];for(let a=0;a<d;a++){const y=t[a]||"",S=r[a]||"",m=Math.floor(Math.random()*40),c=m+Math.floor(Math.random()*40);s.current.push({from:y,to:S,start:m,end:c})}u.current&&cancelAnimationFrame(u.current),i.current=0,_()})},_=()=>{var d;let r=0;const t=[];for(let o=0;o<s.current.length;o++){let{from:a,to:y,start:S,end:m,char:c}=s.current[o];i.current>=m?(r++,t.push(y)):i.current>=S?((!c||Math.random()<.28)&&(c=B(),s.current[o].char=c),t.push({dud:c})):t.push(a)}w(t),r===s.current.length?(d=l.current)==null||d.call(l):(u.current=requestAnimationFrame(_),i.current++)};return n.useEffect(()=>{let r=!0;const t=()=>{r&&(D(e[x.current]).then(()=>{setTimeout(t,b)}),x.current=(x.current+1)%e.length)};return t(),()=>{r=!1,u.current&&cancelAnimationFrame(u.current)}},[e,b]),f.jsx(N,{className:O,children:f.jsx(V,{$color:A,fontSize:F,children:T.map((r,t)=>typeof r=="string"?f.jsx("span",{children:r},t):f.jsx("span",{className:"dud",children:r.dud},t))})})}L.__docgenInfo={description:"",methods:[],displayName:"TextScramble",props:{phrases:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},color:{required:!1,tsType:{name:"string"},description:""},interval:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"800",computed:!1}},fontSize:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"28px"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const X={title:"Components/TextScramble",component:L,args:{phrases:["HELLO","WELCOME","TEXT SCRAMBLE"],interval:800,fontSize:"28px"},parameters:{layout:"centered"}},p={},h={args:{interval:400}},g={args:{fontSize:"48px"}};var M,R,E;p.parameters={...p.parameters,docs:{...(M=p.parameters)==null?void 0:M.docs,source:{originalSource:"{}",...(E=(R=p.parameters)==null?void 0:R.docs)==null?void 0:E.source}}};var j,v,$;h.parameters={...h.parameters,docs:{...(j=h.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    interval: 400
  }
}`,...($=(v=h.parameters)==null?void 0:v.docs)==null?void 0:$.source}}};var q,k,z;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    fontSize: '48px'
  }
}`,...(z=(k=g.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};const G=["Default","Fast","Large"];export{p as Default,h as Fast,g as Large,G as __namedExportsOrder,X as default};
