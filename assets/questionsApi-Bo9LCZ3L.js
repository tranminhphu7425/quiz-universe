import{c as a}from"./index-evee428R.js";/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],u=a("circle-check",r),e="http://localhost:8080/api";async function h(c,o){const t=await fetch(`${e}/questions/subject/${c}`,{signal:o});if(!t.ok){const n=await t.text().catch(()=>"");throw new Error(n||`HTTP ${t.status}`)}const s=await t.json();return Array.isArray(s)?s:[]}async function f(c){const o=await fetch(`${e}/questions/count`,{signal:c});if(!o.ok){const s=await o.text().catch(()=>"");throw new Error(s||`HTTP ${o.status}`)}const t=await o.json();return typeof t=="number"?t:0}async function w(c,o){const t=await fetch(`${e}/questions/${c}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!t.ok){const s=await t.text().catch(()=>"");throw new Error(s||`HTTP ${t.status}`)}return await t.json()}export{u as C,h as a,f,w as u};
