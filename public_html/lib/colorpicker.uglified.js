!function(t,e,i){function o(e){if(t.event&&t.event.contentOverflow!==i)return{x:t.event.offsetX,y:t.event.offsetY};if(e.offsetX!==i&&e.offsetY!==i)return{x:e.offsetX,y:e.offsetY};var o=e.target.parentNode.parentNode;return{x:e.layerX-o.offsetLeft,y:e.layerY-o.offsetTop}}function s(t,i,o){t=e.createElementNS(y,t);for(var s in i)t.setAttribute(s,i[s]);"[object Array]"!=Object.prototype.toString.call(o)&&(o=[o]);for(var r=0,n=o[0]&&o.length||0;r<n;r++)t.appendChild(o[r]);return t}function r(t){var e,i,o,s,r,n=t.h%360/60;r=t.v*t.s,s=r*(1-Math.abs(n%2-1)),e=i=o=t.v-r,n=~~n,e+=[r,s,0,0,s,r][n],i+=[s,r,r,s,0,0][n],o+=[0,0,s,r,r,s][n];var l=Math.floor(255*e),a=Math.floor(255*i),c=Math.floor(255*o);return{r:l,g:a,b:c,hex:"#"+(16777216|c|a<<8|l<<16).toString(16).slice(1)}}function n(t){var e=t.r,i=t.g,o=t.b;(t.r>1||t.g>1||t.b>1)&&(e/=255,i/=255,o/=255);var s,r,n,l;return n=Math.max(e,i,o),l=n-Math.min(e,i,o),s=0==l?null:n==e?(i-o)/l+(i<o?6:0):n==i?(o-e)/l+2:(e-i)/l+4,s=s%6*60,r=0==l?0:l/n,{h:s,s:r,v:n}}function l(e,s,n){return function(l){l=l||t.event;var a=o(l);e.h=a.y/s.offsetHeight*360+g;var c=r({h:e.h,s:1,v:1}),f=r({h:e.h,s:e.s,v:e.v});n.style.backgroundColor=c.hex,e.callback&&e.callback(f.hex,{h:e.h-g,s:e.s,v:e.v},{r:f.r,g:f.g,b:f.b},i,a)}}function a(e,i){return function(s){s=s||t.event;var n=o(s),l=i.offsetWidth,a=i.offsetHeight;e.s=n.x/l,e.v=(a-n.y)/a;var c=r(e);e.callback&&e.callback(c.hex,{h:e.h-g,s:e.s,v:e.v},{r:c.r,g:c.g,b:c.b},n)}}function c(t,e,i){if(!(this instanceof c))return new c(t,e,i);if(this.h=0,this.s=1,this.v=1,i)this.callback=i,this.pickerElement=e,this.slideElement=t;else{var o=t;o.innerHTML=m,this.slideElement=o.getElementsByClassName("slide")[0],this.pickerElement=o.getElementsByClassName("picker")[0];var s=o.getElementsByClassName("slide-indicator")[0],r=o.getElementsByClassName("picker-indicator")[0];c.fixIndicators(s,r),this.callback=function(t,i,o,n,l){c.positionIndicators(s,r,l,n),e(t,i,o)}}if("SVG"==u){var n=v.cloneNode(!0),p=d.cloneNode(!0),g=n.getElementById("gradient-hsv"),y=n.getElementsByTagName("rect")[0];g.id="gradient-hsv-"+b,y.setAttribute("fill","url(#"+g.id+")");var x=[p.getElementById("gradient-black"),p.getElementById("gradient-white")],w=p.getElementsByTagName("rect");x[0].id="gradient-black-"+b,x[1].id="gradient-white-"+b,w[0].setAttribute("fill","url(#"+x[1].id+")"),w[1].setAttribute("fill","url(#"+x[0].id+")"),this.slideElement.appendChild(n),this.pickerElement.appendChild(p),b++}else this.slideElement.innerHTML=v,this.pickerElement.innerHTML=d;f(this.slideElement,"click",l(this,this.slideElement,this.pickerElement)),f(this.pickerElement,"click",a(this,this.pickerElement)),h(this,this.slideElement,l(this,this.slideElement,this.pickerElement)),h(this,this.pickerElement,a(this,this.pickerElement))}function f(t,e,i){t.attachEvent?t.attachEvent("on"+e,i):t.addEventListener&&t.addEventListener(e,i,!1)}function h(t,e,i){var o=!1;f(e,"mousedown",function(t){o=!0}),f(e,"mouseup",function(t){o=!1}),f(e,"mouseout",function(t){o=!1}),f(e,"mousemove",function(t){o&&i(t)})}function p(t,e,i,o){t.h=e.h%360,t.s=e.s,t.v=e.v;var s=r(t),n={y:t.h*t.slideElement.offsetHeight/360,x:0},l=t.pickerElement.offsetHeight,a={x:t.s*t.pickerElement.offsetWidth,y:l-t.v*l};return t.pickerElement.style.backgroundColor=r({h:t.h,s:1,v:1}).hex,t.callback&&t.callback(o||s.hex,{h:t.h,s:t.s,v:t.v},i||{r:s.r,g:s.g,b:s.b},a,n),t}var d,v,u=t.SVGAngle||e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML",g=15,y="http://www.w3.org/2000/svg",m=['<div class="picker-wrapper">','<div class="picker"></div>','<div class="picker-indicator"></div>',"</div>",'<div class="slide-wrapper">','<div class="slide"></div>','<div class="slide-indicator"></div>',"</div>"].join("");"SVG"==u?(v=s("svg",{xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"100%",height:"100%"},[s("defs",{},s("linearGradient",{id:"gradient-hsv",x1:"0%",y1:"100%",x2:"0%",y2:"0%"},[s("stop",{offset:"0%","stop-color":"#FF0000","stop-opacity":"1"}),s("stop",{offset:"13%","stop-color":"#FF00FF","stop-opacity":"1"}),s("stop",{offset:"25%","stop-color":"#8000FF","stop-opacity":"1"}),s("stop",{offset:"38%","stop-color":"#0040FF","stop-opacity":"1"}),s("stop",{offset:"50%","stop-color":"#00FFFF","stop-opacity":"1"}),s("stop",{offset:"63%","stop-color":"#00FF40","stop-opacity":"1"}),s("stop",{offset:"75%","stop-color":"#0BED00","stop-opacity":"1"}),s("stop",{offset:"88%","stop-color":"#FFFF00","stop-opacity":"1"}),s("stop",{offset:"100%","stop-color":"#FF0000","stop-opacity":"1"})])),s("rect",{x:"0",y:"0",width:"100%",height:"100%",fill:"url(#gradient-hsv)"})]),d=s("svg",{xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"100%",height:"100%"},[s("defs",{},[s("linearGradient",{id:"gradient-black",x1:"0%",y1:"100%",x2:"0%",y2:"0%"},[s("stop",{offset:"0%","stop-color":"#000000","stop-opacity":"1"}),s("stop",{offset:"100%","stop-color":"#CC9A81","stop-opacity":"0"})]),s("linearGradient",{id:"gradient-white",x1:"0%",y1:"100%",x2:"100%",y2:"100%"},[s("stop",{offset:"0%","stop-color":"#FFFFFF","stop-opacity":"1"}),s("stop",{offset:"100%","stop-color":"#CC9A81","stop-opacity":"0"})])]),s("rect",{x:"0",y:"0",width:"100%",height:"100%",fill:"url(#gradient-white)"}),s("rect",{x:"0",y:"0",width:"100%",height:"100%",fill:"url(#gradient-black)"})])):"VML"==u&&(v=['<DIV style="position: relative; width: 100%; height: 100%">','<v:rect style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" stroked="f" filled="t">','<v:fill type="gradient" method="none" angle="0" color="red" color2="red" colors="8519f fuchsia;.25 #8000ff;24903f #0040ff;.5 aqua;41287f #00ff40;.75 #0bed00;57671f yellow"></v:fill>',"</v:rect>","</DIV>"].join(""),d=['<DIV style="position: relative; width: 100%; height: 100%">','<v:rect style="position: absolute; left: -1px; top: -1px; width: 101%; height: 101%" stroked="f" filled="t">','<v:fill type="gradient" method="none" angle="270" color="#FFFFFF" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>',"</v:rect>",'<v:rect style="position: absolute; left: 0px; top: 0px; width: 100%; height: 101%" stroked="f" filled="t">','<v:fill type="gradient" method="none" angle="0" color="#000000" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>',"</v:rect>","</DIV>"].join(""),e.namespaces.v||e.namespaces.add("v","urn:schemas-microsoft-com:vml","#default#VML"));var b=0;c.hsv2rgb=function(t){var e=r(t);return delete e.hex,e},c.hsv2hex=function(t){return r(t).hex},c.rgb2hsv=n,c.rgb2hex=function(t){return r(n(t)).hex},c.hex2hsv=function(t){return n(c.hex2rgb(t))},c.hex2rgb=function(t){return{r:parseInt(t.substr(1,2),16),g:parseInt(t.substr(3,2),16),b:parseInt(t.substr(5,2),16)}},c.prototype.setHsv=function(t){return p(this,t)},c.prototype.setRgb=function(t){return p(this,n(t),t)},c.prototype.setHex=function(t){return p(this,c.hex2hsv(t),i,t)},c.positionIndicators=function(t,e,i,o){i&&(t.style.top=i.y-t.offsetHeight/2+"px"),o&&(e.style.top=o.y-e.offsetHeight/2+"px",e.style.left=o.x-e.offsetWidth/2+"px")},c.fixIndicators=function(t,e){e.style.pointerEvents="none",t.style.pointerEvents="none"},t.ColorPicker=c}(window,window.document);