(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{185:function(s,t,e){"use strict";e.d(t,"a",(function(){return i})),e.d(t,"b",(function(){return o}));const i=(s,t)=>{let e;return e="right"===s?6!==t?t+1:0:0!==t?t-1:6,e},o=(s,t,e)=>{"right"===t?(e.classList.add("js-position-left"),e.classList.remove("slideshow__slide--active"),s.classList.add("slideshow__slide--active")):(e.classList.remove("slideshow__slide--active"),s.classList.add("slideshow__slide--active"),s.classList.remove("js-position-left"))}},188:function(s,t,e){"use strict";e.r(t);var i=e(185);const o=document.querySelectorAll(".slideshow__slide");let a=document.querySelector(".slideshow__slide--active"),l=parseFloat(a.dataset.index);t.default=s=>{const t=s?s.target.dataset.direction:"right",e=Object(i.a)(t,l),c=o[e];Object(i.b)(c,t,a),(s=>{const t=Object(i.a)("right",s),e=Object(i.a)("left",s),a=o[t],l=o[e];a.className.includes("js-position-left")&&(a.classList.add("js-transition-off"),a.classList.remove("js-position-left")),l.className.includes("js-position-left")||(l.classList.add("js-transition-off"),l.classList.add("js-position-left")),setTimeout(()=>{a.classList.remove("js-transition-off"),l.classList.remove("js-transition-off")},100)})(e),l=parseFloat(c.dataset.index),a=c}}}]);