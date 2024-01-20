import{S as g,i as p,a as w}from"./assets/vendor-bad0427b.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const b="https://pixabay.com/api/?",v="41881692-6f4b64110761e7ecb64cd986a",L=new g(".gallery a",{captionsData:"alt",captionDelay:250,close:!0,enableKeyboard:!0,docClose:!0});let f=1,d="",y=0;const S=document.querySelector(".form"),n=document.querySelector(".gallery"),q=document.querySelector(".loader"),u=document.querySelector(".load-more"),i={key:v,q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,page:1,per_page:40},h=(e,t,s)=>{p.show({message:e,backgroundColor:t,messageColor:"#FFFFFF",maxWidth:300,timeout:2e3,progressBar:!1,position:"topRight",transitionIn:"bounceInRight",transitionOut:"fadeOutLeft",messageSize:s})},F=()=>{n.innerHTML=""},l=e=>{q.style.display=e?"block":"none"},E=()=>{const e=n.querySelector(".gallery-item");if(e){const t=e.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}},H=e=>`
  <li class='gallery-item'>
    <a href="${e.largeImageURL}">
      <img src="${e.webformatURL}" alt="${e.tags}" />
    </a>
    <div class='info-container'>
      <div>
        <h3 class='card-title'>Likes</h3>
        <p class='card-info'>${e.likes}</p>
      </div>
      <div>
        <h3 class='card-title'>Views</h3>
        <p class='card-info'>${e.views}</p>
      </div>
      <div>
        <h3 class='card-title'>Comments</h3>
        <p class='card-info'>${e.comments}</p>
      </div>
      <div>
        <h3 class='card-title'>Downloads</h3>
        <p class='card-info'>${e.downloads}</p>
      </div>
    </div>
  </li>`,P=async e=>{try{const t=await w.get(`${b}${new URLSearchParams(e)}`);if(t.status!==200)throw new Error("Something went wrong. Please try again later.");const{hits:s,totalHits:a}=t.data;return{hits:s,newTotalHits:a}}catch(t){return console.error(t.message),{hits:[],newTotalHits:0}}},m=async e=>{l(!0);const{hits:t,newTotalHits:s}=await P(e);l(!1),t.length===0?h("Sorry, there are no images matching your search query. Please try again!","#EF4040",12):(t.forEach(a=>{n.innerHTML+=H(a)}),L.refresh(),y=s,n.children.length>=y?(u.style.display="none",h("We're sorry, but you've reached the end of search results.","#4e75ff",14)):(u.style.display="block",E()))},$=async e=>{if(e.preventDefault(),d=e.target.elements.search.value.trim(),!d){h("Please enter a valid search query!","#EF4040",12);return}f=1,F(),i.q=d,m(i)},R=async()=>{i.page=f,m(i)};u.addEventListener("click",async()=>{l(!0),f+=1,await R(),l(!1)});S.addEventListener("submit",$);
//# sourceMappingURL=commonHelpers.js.map
