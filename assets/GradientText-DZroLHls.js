import{r as c,j as e,m as f}from"./index-wlr8q-Dg.js";function u({children:n,root:i,amount:a=.2,margin:r="0px 0px -10% 0px",delay:s=0,y:t=16,once:o=!0,className:l}){const d=c.useRef(null);return e.jsx(f.div,{ref:d,initial:{opacity:0,y:t},whileInView:{opacity:1,y:0},transition:{delay:s,type:"spring",stiffness:160,damping:18},viewport:{root:i,margin:r,amount:a,once:o},className:l,children:n})}const p=`
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient {
  animation: gradient 8s linear infinite;
}
`;function m({children:n,className:i="",colors:a=["#4a2bffff","#ff4089ff","#ff8d02ff"],animationSpeed:r=8,showBorder:s=!1}){const t={backgroundImage:`linear-gradient(to right, ${a.join(", ")})`,backgroundSize:"300% 100%",animation:`gradient ${r}s linear infinite`};return e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:p}}),e.jsxs("div",{className:`relative flx max-w-fit flex-row items-center justify-center rounded-[1.25rem] backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer ${i}`,children:[s&&e.jsx("div",{className:"absolute inset-0 bg-cover z-0 pointer-events-none",style:t,children:e.jsx("div",{className:"absolute inset-0 bg-black rounded-[1.25rem] z-[-1]",style:{width:"calc(100% - 2px)",height:"calc(100% - 2px)",left:"50%",top:"50%",transform:"translate(-50%, -50%)"}})}),e.jsx("div",{className:"inline-block relative z-2 text-transparent bg-cover",style:{...t,backgroundClip:"text",WebkitBackgroundClip:"text"},children:n})]})]})}export{u as F,m as G};
