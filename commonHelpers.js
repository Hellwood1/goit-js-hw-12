import{S as d,i as u}from"./assets/vendor-46aac873.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerpolicy&&(t.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?t.credentials="include":r.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(r){if(r.ep)return;r.ep=!0;const t=a(r);fetch(r.href,t)}})();const f="https://pixabay.com/api/?",m="41881692-6f4b64110761e7ecb64cd986a",h=document.querySelector(".form"),l=document.querySelector(".gallery"),p=document.querySelector(".loader"),c={key:m,q:"query",image_type:"photo",orientation:"horizontal",safesearch:!0},g=new d(".gallery a",{captionsData:"alt",captionDelay:250,close:!0,enableKeyboard:!0,docClose:!0}),i=o=>{p.style.display=o?"block":"none"},y=o=>{o.preventDefault();const e=o.target.elements.search.value.trim();if(!e){console.error("Please enter a valid search query.");return}w(),i(!0),c.q=encodeURIComponent(e);const a=new URLSearchParams(c),s=`${f}${a}`;b(s),o.currentTarget.reset()},b=o=>{i(!0),fetch(o).then(e=>{if(!e.ok)throw new Error("Something went wrong. Please try again later.");return e.json()}).then(({hits:e})=>{e.length===0?v():(L(e),g.refresh())}).catch(e=>{console.error(e.message)}).finally(()=>{i(!1)})},v=()=>{u.error({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#EF4040",messageColor:"#FFFFFF",maxWidth:300,timeout:2e3,progressBar:!1,position:"topRight",transitionIn:"bounceInRight",transitionOut:"fadeOutLeft",messageSize:12})},L=o=>{l.innerHTML=o.map(e=>`
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
      </li>`).join("")},w=()=>{l.innerHTML=""};h.addEventListener("submit",y);
//# sourceMappingURL=commonHelpers.js.map
