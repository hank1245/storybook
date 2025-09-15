import{j as n}from"./jsx-runtime-DF2Pcvd1.js";import{l as S,d as g,m as y}from"./styled-components.browser.esm-DWIjLzHK.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";function $({text:e,speed:a=12,center:b=!0,className:T}){const o=Math.max(0,(e==null?void 0:e.length)??0),w=Math.max(.1,o/Math.max(1e-6,a));return n.jsx(C,{$center:b,className:T,children:n.jsx(E,{"aria-label":e,$sizeCh:o,$durationSec:w,children:e},`${e}-${a}`)})}const x=y`
  from { width: 0 }
`,v=y`
  50% { border-color: transparent }
`,C=g.div`
  ${e=>e.$center&&S`
      height: 100vh;
      display: grid;
      place-items: center;
      text-align: center;
    `}
`,E=g.div`
  /* Default to dark-mode friendly (white) */
  color: #fff;
  :root[data-sb-theme='light'] & {
    color: #000;
  }
  :root[data-sb-theme='dark'] & {
    color: #fff;
  }
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid;
  border-right-color: currentColor;
  font-family: monospace;
  font-size: 2em;
  width: ${e=>e.$sizeCh}ch;
  animation: ${x} ${e=>e.$durationSec}s
      steps(${e=>Math.max(e.$sizeCh,1)}),
    ${v} 0.5s step-end infinite alternate;

  @media (prefers-color-scheme: light) {
    color: #000; /* 시스템 라이트 모드 기본값 */
  }
`;$.__docgenInfo={description:"타이핑 애니메이션 컴포넌트\n- `speed`(초당 글자수)로 타이핑 속도를 조절합니다.",methods:[],displayName:"TypingEffect",props:{text:{required:!0,tsType:{name:"string"},description:"표시할 텍스트"},speed:{required:!1,tsType:{name:"number"},description:"속도: 초당 글자수 (기본값 12)",defaultValue:{value:"12",computed:!1}},center:{required:!1,tsType:{name:"boolean"},description:"래퍼 중앙정렬 컨테이너 사용 여부 (기본값 true)",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"래퍼에 추가할 클래스"}}};const M={title:"Components/TypingEffect",component:$,args:{text:"This is a typing demo.",speed:12,center:!0},parameters:{layout:"centered"}},r={},t={args:{speed:22}},s={args:{speed:6}};var i,c,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(d=(c=r.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var p,m,l;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    speed: 22
  }
}`,...(l=(m=t.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var u,f,h;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    speed: 6
  }
}`,...(h=(f=s.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};const _=["Default","Fast","Slow"];export{r as Default,t as Fast,s as Slow,_ as __namedExportsOrder,M as default};
