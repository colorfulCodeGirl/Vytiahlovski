(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{186:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return a}));const r=document.querySelector(".menu"),c=document.querySelector(".menu-toggler");let i=!1;const o=e=>{if(i)i=!1;else{e.preventDefault(),c.classList.toggle("menu-toggler--close"),c.classList.toggle("menu-toggler--active"),r.classList.toggle("menu--active"),(()=>{const e=r.querySelectorAll("a"),t=document.querySelector(".l-content").querySelectorAll("a, button, input"),n=(e,t)=>{e.forEach(e=>{e.setAttribute("tabindex",t)})};"true"===r.getAttribute("aria-hidden")?(n(t,-1),r.setAttribute("aria-hidden","false"),n(e,0)):(n(t,0),r.setAttribute("aria-hidden","true"),n(e,-1))})(),"nav"===e.target.dataset.type&&(i=!0,r.addEventListener("transitionend",()=>{e.target.click()},{once:!0}))}};function a(){r.addEventListener("click",o),c.addEventListener("click",o)}}}]);