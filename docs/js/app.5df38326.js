(function(e){function t(t){for(var s,r,o=t[0],d=t[1],c=t[2],h=0,f=[];h<o.length;h++)r=o[h],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&f.push(n[r][0]),n[r]=0;for(s in d)Object.prototype.hasOwnProperty.call(d,s)&&(e[s]=d[s]);l&&l(t);while(f.length)f.shift()();return a.push.apply(a,c||[]),i()}function i(){for(var e,t=0;t<a.length;t++){for(var i=a[t],s=!0,o=1;o<i.length;o++){var d=i[o];0!==n[d]&&(s=!1)}s&&(a.splice(t--,1),e=r(r.s=i[0]))}return e}var s={},n={app:0},a=[];function r(t){if(s[t])return s[t].exports;var i=s[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=s,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(i,s,function(t){return e[t]}.bind(null,s));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],d=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var l=d;a.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},"341f":function(e,t,i){},"56d7":function(e,t,i){"use strict";i.r(t);var s=i("7a23");function n(e,t,i,n,a,r){const o=Object(s["k"])("Panel"),d=Object(s["k"])("Field");return Object(s["h"])(),Object(s["c"])(s["a"],null,[Object(s["e"])(o),Object(s["e"])(d)],64)}var a=i("df84"),r=i.n(a);const o={class:"score"},d={class:"current"},c={class:"best"},l={class:"controls"},h=Object(s["d"])("img",{src:r.a,alt:""},null,-1),f=[h];function u(e,t,i,n,a,r){return Object(s["h"])(),Object(s["c"])("nav",null,[Object(s["d"])("section",o,[Object(s["d"])("div",d,"Current: "+Object(s["l"])(e.allScore.score),1),Object(s["d"])("div",c,"Best: "+Object(s["l"])(e.allScore.bestScore),1)]),Object(s["d"])("section",l,[Object(s["d"])("div",{class:Object(s["g"])(["controls-btn play",{disabled:e.isStarted}]),onClick:t[0]||(t[0]=(...t)=>e.start&&e.start(...t))},f,2)])])}var y=i("5502"),k={name:"Panel",computed:{...Object(y["c"])(["allScore","isStarted"])},methods:{...Object(y["b"])(["start"])}},A=(i("b23b"),i("6b0d")),b=i.n(A);const p=b()(k,[["render",u]]);var S=p;function m(e,t,i,n,a,r){return Object(s["h"])(),Object(s["c"])("main",null,[(Object(s["h"])(!0),Object(s["c"])(s["a"],null,Object(s["j"])(a.field,(e,t)=>(Object(s["h"])(),Object(s["c"])("div",{class:"row",key:"r-"+t},[(Object(s["h"])(!0),Object(s["c"])(s["a"],null,Object(s["j"])(e,(e,i)=>(Object(s["h"])(),Object(s["c"])("div",{class:Object(s["g"])(["block",{"snake-head":1===e,"snake-body":2===e,point:3===e}]),key:"r-c-"+i,ref_for:!0,ref:`block-${i}-${t}`},null,2))),128))]))),128))])}i("caad");var O={name:"Field",data(){return{field:[],snakeHead:{x:0,y:0},snakeBody:[],points:[],allowedKeys:[87,65,83,68],direction:null,fieldSize:16,pointsLimit:4,gameTimer:null,fps:6}},computed:{...Object(y["c"])(["isStarted"])},created(){this.field=Array.from(Array(this.fieldSize),()=>new Array(this.fieldSize).fill(0)),window.addEventListener("keyup",this.initLogic)},watch:{isStarted(e){e&&this.startGame()}},methods:{...Object(y["b"])(["addScore","resetScore","reset"]),getRandomInt(e,t){const i=e+Math.random()*(t+1-e);return Math.floor(i)},startGame(){this.snakeHead=this.getRandomPoint(),this.drawResolutedBlock(this.snakeHead,1),this.gameTimer=requestAnimationFrame(this.gameTick)},resetGame(){this.field=Array.from(Array(this.fieldSize),()=>new Array(this.fieldSize).fill(0)),this.snakeHead={x:0,y:0},this.snakeBody=[],this.points=[],this.direction=null,cancelAnimationFrame(this.gameTimer),this.gameTimer=null,this.reset()},initLogic(e){this.isStarted&&this.allowedKeys.includes(e.keyCode)&&(87===this.direction&&83===e.keyCode||83===this.direction&&87===e.keyCode||65===this.direction&&68===e.keyCode||68===this.direction&&65===e.keyCode||(this.direction=e.keyCode))},getRandomPoint(){return{x:this.getRandomInt(0,this.fieldSize-2),y:this.getRandomInt(0,this.fieldSize-2)}},collidePoints(e,t){const i=e.x===t.x||e.x===t.x+1||e.x+1===t.x||e.x+1===t.x+1,s=e.y===t.y||e.y===t.y+1||e.y+1===t.y||e.y+1===t.y+1;return i&&s},headCollide(e){let t=!1,i=!1;return 87===this.direction&&(t=this.snakeHead.x===e.x||this.snakeHead.x+1===e.x||this.snakeHead.x===e.x+1||this.snakeHead.x+1===e.x+1,i=this.snakeHead.y===e.y||this.snakeHead.y===e.y+1),65===this.direction&&(t=this.snakeHead.x===e.x||this.snakeHead.x===e.x+1,i=this.snakeHead.y===e.y||this.snakeHead.y+1===e.y||this.snakeHead.y===e.y+1||this.snakeHead.y+1===e.y+1),83===this.direction&&(t=this.snakeHead.x===e.x||this.snakeHead.x+1===e.x||this.snakeHead.x===e.x+1||this.snakeHead.x+1===e.x+1,i=this.snakeHead.y+1===e.y||this.snakeHead.y+1===e.y+1),68===this.direction&&(t=this.snakeHead.x+1===e.x||this.snakeHead.x+1===e.x+1,i=this.snakeHead.y===e.y||this.snakeHead.y+1===e.y||this.snakeHead.y===e.y+1||this.snakeHead.y+1===e.y+1),t&&i},gameTick(){if(!this.isStarted)return;const e={...this.snakeHead},t=this.snakeBody.length?{...this.snakeBody[this.snakeBody.length-1]}:null;87===this.direction&&this.snakeHead.y--,65===this.direction&&this.snakeHead.x--,83===this.direction&&this.snakeHead.y++,68===this.direction&&this.snakeHead.x++;const i=this.snakeHead.x>this.fieldSize-2||this.snakeHead.x<0||this.snakeHead.y>this.fieldSize-2||this.snakeHead.y<0,s=this.snakeBody.some(e=>this.headCollide(e));if(i||s)return this.resetScore(),void setTimeout(this.resetGame,500);if(this.snakeBody.length){for(let e=this.snakeBody.length-1;e>0;e--)this.snakeBody[e]={...this.snakeBody[e-1]};this.snakeBody[0]=e}const n=this.getRandomInt(0,100);if(n>75&&this.points.length<this.pointsLimit){let e=this.getRandomPoint();!this.collidePoints(e,this.snakeHead)&&this.snakeBody.every(t=>!this.collidePoints(e,t))&&this.points.every(t=>!this.collidePoints(e,t))&&this.points.push(e)}for(const a in this.points)this.collidePoints(this.points[a],this.snakeHead)&&(this.addScore(),this.points.splice(a,1),this.snakeBody.push(t||e));this.render(),setTimeout(()=>{this.gameTimer=requestAnimationFrame(this.gameTick)},1e3/this.fps)},render(){this.field=Array.from(Array(this.fieldSize),()=>new Array(this.fieldSize).fill(0)),this.drawResolutedBlock(this.snakeHead,1);for(const e of this.snakeBody)this.drawResolutedBlock(e,2);for(const e of this.points)this.drawResolutedBlock(e,3)},drawResolutedBlock(e,t){this.field[e.y][e.x]=1===this.field[e.y][e.x]?1:t,this.field[e.y+1][e.x]=1===this.field[e.y+1][e.x]?1:t,this.field[e.y][e.x+1]=1===this.field[e.y][e.x+1]?1:t,this.field[e.y+1][e.x+1]=1===this.field[e.y+1][e.x+1]?1:t}}};i("6ed1");const x=b()(O,[["render",m]]);var g=x,j={name:"App",components:{Panel:S,Field:g}};i("ec1c");const H=b()(j,[["render",n]]);var v=H,w=Object(y["a"])({state:{score:0,bestScore:0,isStarted:!1},mutations:{ADD_SCORE(e){e.score++},RESET_SCORE(e){e.bestScore=Math.max(e.bestScore,e.score),e.score=0},SET_IS_STARTED(e,t){e.isStarted=t}},getters:{allScore(e){return{score:e.score,bestScore:e.bestScore}},isStarted(e){return e.isStarted}},actions:{addScore({commit:e}){e("ADD_SCORE")},resetScore({commit:e}){e("RESET_SCORE")},start({commit:e,state:t}){t.isStarted||e("SET_IS_STARTED",!0)},reset({commit:e,state:t}){t.isStarted&&e("SET_IS_STARTED",!1)}}});Object(s["b"])(v).use(w).mount("#app")},"6ed1":function(e,t,i){"use strict";i("fd95")},9624:function(e,t,i){},b23b:function(e,t,i){"use strict";i("341f")},df84:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAC0ElEQVR4nO2bS2gVZxhAzyepraCS0oQKSrGI0KbVTaDQhVTMogtXLro03TUN0gdk0WVb2kXd2S4UdypdNauufMQiYkARIk1aqqEIodkopo9FIKClp4vLUKUa7tyZufNwznr+73HuP3funfkGWlpaWlpanloiy2J1K7ATeADcjoj7uVRVddRh9bS65n/8oX6pbim7vkJRd6jLPpll9VDZdRaGOrNO8w/zvfpS2fXmivpal80nrKpT6kDZteeCOp5SQMK8+mbZ9T+ODSmPf6HHPHuBWfW4OthjjEJIKyDLZXMDMAncVMczxMmVtALyYBtwWr2kvlJC/kcoQ0DCfuCG+pn6bFlFlCkAYBPwKfCTOlZGAWULSNgNzKhn1OF+Jq6KAOh8wR4GFtX31Ez/U7qlSgISngdOApfVkaKTVVFAwj7gR/Ur9bmiklRZAMAzwCfAz+rbRSSouoCEXcA59Tv1xTwD10VAwjvALfUjNZfa6yYAYBA4BlxXR7MGq6OAhFHgmvq1urnXIHUWADAAfAgsqPt6CVB3AQkvAxfVg2kXNkUAwEbglClvyjZJAMAQnStF1zRNAHTuPnVNEwWkookC5tMc3DQBK8B0mgVNEnAfGI+I1TSLmiJgCRiLiLNpF9ZdwN/AN8CeiJjtJUCdH1nNARMRMZclSB13wF/Ax8AbWZuH+u2AaeCDiLibV8C6CLgNHImI83kHrvop8AA4CrxeRPNQ7R1wBXg/In4pMkkVd8CfwATwVtHNQ7V2gMC3wFRE3OtX0qoI+BWYjIgf+p247FNgDficzi+5vjcP5e6AS3Q+9cUSayhlB9wB3o2IA2U3D+kFmCHXP8AJ4NWIOJMhTq6kPQV+7zHPAp1r+tUe11cDdSTlfGCzBiUB1AtdNt+8UVkAdbv62zqNN3tYGkAd8v/j8ivqF9ZsXD7rCxOb6QwvrAFLT80LEy0tLS0tLc3gX8RFMx0oFldfAAAAAElFTkSuQmCC"},ec1c:function(e,t,i){"use strict";i("9624")},fd95:function(e,t,i){}});
//# sourceMappingURL=app.5df38326.js.map