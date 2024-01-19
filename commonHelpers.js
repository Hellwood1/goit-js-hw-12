import{S as d,i as u}from"./assets/vendor-46aac873.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const m="https://pixabay.com/api/?",f="41881692-6f4b64110761e7ecb64cd986a",h=new d(".gallery a",{captionsData:"alt",captionDelay:250,close:!0,enableKeyboard:!0,docClose:!0}),y=async t=>{t.preventDefault();const s=document.querySelector(".form");document.querySelector(".gallery"),document.querySelector(".loader");const o={key:f,q:"query",image_type:"photo",orientation:"horizontal",safesearch:!0},n=t.target.elements.search.value.trim();if(!n){i("Please enter a valid search query!");return}const e={...o,q:encodeURIComponent(n)};g(),l(!0);const r=`${m}${new URLSearchParams(e)}`;try{const a=await fetch(r);if(!a.ok)throw new Error("Something went wrong. Please try again later.");const{hits:c}=await a.json();c.length===0?i("Sorry, there are no images matching your search query. Please try again!"):(p(c),h.refresh())}catch(a){console.error(a.message)}finally{l(!1),s.reset()}},i=t=>{u.error({message:t,backgroundColor:"#EF4040",messageColor:"#FFFFFF",maxWidth:300,timeout:2e3,progressBar:!1,position:"topRight",transitionIn:"bounceInRight",transitionOut:"fadeOutLeft",messageSize:12})},p=t=>{const s=document.querySelector(".gallery");s.innerHTML=t.map(o=>`
    <li class='gallery-item'>
        <a href="${o.largeImageURL}">
        <img src="${o.webformatURL}" alt="${o.tags}" />
        </a>
        <div class='info-container'>
          <div>
            <h3 class='card-title'>Likes</h3>
            <p class='card-info'>${o.likes}</p>
          </div>
          <div>
            <h3 class='card-title'>Views</h3>
            <p class='card-info'>${o.views}</p>
          </div>
          <div>
            <h3 class='card-title'>Comments</h3>
            <p class='card-info'>${o.comments}</p>
          </div>
          <div>
            <h3 class='card-title'>Downloads</h3>
            <p class='card-info'>${o.downloads}</p>
          </div>
        </div>
      </li>`).join("")},g=()=>{const t=document.querySelector(".gallery");t.innerHTML=""},l=t=>{const s=document.querySelector(".loader");s.style.display=t?"block":"none"},v=document.querySelector(".form");v.addEventListener("submit",y);
//# sourceMappingURL=commonHelpers.js.map
