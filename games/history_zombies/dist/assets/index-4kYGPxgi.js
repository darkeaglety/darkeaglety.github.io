(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ma="175",gh=0,qa=1,_h=2,ga=1,xh=2,Ln=3,Kn=0,Ge=1,Ue=2,Xn=0,Wi=1,Ya=2,$a=3,Za=4,vh=5,fi=100,Mh=101,yh=102,Sh=103,Eh=104,wh=200,Th=201,bh=202,Ah=203,So=204,Eo=205,Ch=206,Rh=207,Ph=208,Lh=209,Dh=210,Ih=211,Uh=212,Nh=213,Fh=214,wo=0,To=1,bo=2,Yi=3,Ao=4,Co=5,Ro=6,Po=7,cl=0,Oh=1,zh=2,qn=0,Bh=1,kh=2,Hh=3,Gh=4,Vh=5,Wh=6,Xh=7,ll=300,$i=301,Zi=302,Lo=303,Do=304,Ar=306,xr=1e3,pi=1001,Io=1002,Ke=1003,qh=1004,Bs=1005,_n=1006,Fr=1007,mi=1008,Nn=1009,hl=1010,ul=1011,vs=1012,_a=1013,vi=1014,xn=1015,Cs=1016,xa=1017,va=1018,Ms=1020,fl=35902,dl=1021,pl=1022,hn=1023,ml=1024,gl=1025,ys=1026,Ss=1027,Ma=1028,ya=1029,_l=1030,Sa=1031,Ea=1033,hr=33776,ur=33777,fr=33778,dr=33779,Uo=35840,No=35841,Fo=35842,Oo=35843,zo=36196,Bo=37492,ko=37496,Ho=37808,Go=37809,Vo=37810,Wo=37811,Xo=37812,qo=37813,Yo=37814,$o=37815,Zo=37816,Ko=37817,Jo=37818,jo=37819,Qo=37820,ta=37821,pr=36492,ea=36494,na=36495,xl=36283,ia=36284,sa=36285,ra=36286,Yh=3200,$h=3201,vl=0,Zh=1,Wn="",$e="srgb",Ki="srgb-linear",vr="linear",oe="srgb",Ti=7680,Ka=519,Kh=512,Jh=513,jh=514,Ml=515,Qh=516,tu=517,eu=518,nu=519,Ja=35044,ja="300 es",Dn=2e3,Mr=2001;class Qi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const De=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Or=Math.PI/180,oa=180/Math.PI;function Rs(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(De[n&255]+De[n>>8&255]+De[n>>16&255]+De[n>>24&255]+"-"+De[t&255]+De[t>>8&255]+"-"+De[t>>16&15|64]+De[t>>24&255]+"-"+De[e&63|128]+De[e>>8&255]+"-"+De[e>>16&255]+De[e>>24&255]+De[i&255]+De[i>>8&255]+De[i>>16&255]+De[i>>24&255]).toLowerCase()}function Gt(n,t,e){return Math.max(t,Math.min(e,n))}function iu(n,t){return(n%t+t)%t}function zr(n,t,e){return(1-e)*n+e*t}function as(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function He(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class gt{constructor(t=0,e=0){gt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Gt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Gt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Nt{constructor(t,e,i,s,r,o,a,c,h){Nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,h)}set(t,e,i,s,r,o,a,c,h){const l=this.elements;return l[0]=t,l[1]=s,l[2]=a,l[3]=e,l[4]=r,l[5]=c,l[6]=i,l[7]=o,l[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],h=i[1],l=i[4],u=i[7],p=i[2],d=i[5],_=i[8],x=s[0],m=s[3],f=s[6],E=s[1],w=s[4],M=s[7],P=s[2],A=s[5],b=s[8];return r[0]=o*x+a*E+c*P,r[3]=o*m+a*w+c*A,r[6]=o*f+a*M+c*b,r[1]=h*x+l*E+u*P,r[4]=h*m+l*w+u*A,r[7]=h*f+l*M+u*b,r[2]=p*x+d*E+_*P,r[5]=p*m+d*w+_*A,r[8]=p*f+d*M+_*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],h=t[7],l=t[8];return e*o*l-e*a*h-i*r*l+i*a*c+s*r*h-s*o*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],h=t[7],l=t[8],u=l*o-a*h,p=a*c-l*r,d=h*r-o*c,_=e*u+i*p+s*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return t[0]=u*x,t[1]=(s*h-l*i)*x,t[2]=(a*i-s*o)*x,t[3]=p*x,t[4]=(l*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=d*x,t[7]=(i*c-h*e)*x,t[8]=(o*e-i*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const c=Math.cos(r),h=Math.sin(r);return this.set(i*c,i*h,-i*(c*o+h*a)+o+t,-s*h,s*c,-s*(-h*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Br.makeScale(t,e)),this}rotate(t){return this.premultiply(Br.makeRotation(-t)),this}translate(t,e){return this.premultiply(Br.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Br=new Nt;function yl(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function yr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function su(){const n=yr("canvas");return n.style.display="block",n}const Qa={};function mr(n){n in Qa||(Qa[n]=!0,console.warn(n))}function ru(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function ou(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function au(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const tc=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ec=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function cu(){const n={enabled:!0,workingColorSpace:Ki,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===oe&&(s.r=In(s.r),s.g=In(s.g),s.b=In(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===oe&&(s.r=Xi(s.r),s.g=Xi(s.g),s.b=Xi(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Wn?vr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ki]:{primaries:t,whitePoint:i,transfer:vr,toXYZ:tc,fromXYZ:ec,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:$e},outputColorSpaceConfig:{drawingBufferColorSpace:$e}},[$e]:{primaries:t,whitePoint:i,transfer:oe,toXYZ:tc,fromXYZ:ec,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:$e}}}),n}const te=cu();function In(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Xi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let bi;class lu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{bi===void 0&&(bi=yr("canvas")),bi.width=t.width,bi.height=t.height;const s=bi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=bi}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=yr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=In(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(In(e[i]/255)*255):e[i]=In(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let hu=0;class wa{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=Rs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(kr(s[o].image)):r.push(kr(s[o]))}else r=kr(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function kr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?lu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let uu=0;class Ne extends Qi{constructor(t=Ne.DEFAULT_IMAGE,e=Ne.DEFAULT_MAPPING,i=pi,s=pi,r=_n,o=mi,a=hn,c=Nn,h=Ne.DEFAULT_ANISOTROPY,l=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=Rs(),this.name="",this.source=new wa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=h,this.format=a,this.internalFormat=null,this.type=c,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=l,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ll)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case xr:t.x=t.x-Math.floor(t.x);break;case pi:t.x=t.x<0?0:1;break;case Io:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case xr:t.y=t.y-Math.floor(t.y);break;case pi:t.y=t.y<0?0:1;break;case Io:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ne.DEFAULT_IMAGE=null;Ne.DEFAULT_MAPPING=ll;Ne.DEFAULT_ANISOTROPY=1;class Se{constructor(t=0,e=0,i=0,s=1){Se.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,h=c[0],l=c[4],u=c[8],p=c[1],d=c[5],_=c[9],x=c[2],m=c[6],f=c[10];if(Math.abs(l-p)<.01&&Math.abs(u-x)<.01&&Math.abs(_-m)<.01){if(Math.abs(l+p)<.1&&Math.abs(u+x)<.1&&Math.abs(_+m)<.1&&Math.abs(h+d+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(h+1)/2,M=(d+1)/2,P=(f+1)/2,A=(l+p)/4,b=(u+x)/4,C=(_+m)/4;return w>M&&w>P?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=A/i,r=b/i):M>P?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=A/s,r=C/s):P<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),i=b/r,s=C/r),this.set(i,s,r,e),this}let E=Math.sqrt((m-_)*(m-_)+(u-x)*(u-x)+(p-l)*(p-l));return Math.abs(E)<.001&&(E=1),this.x=(m-_)/E,this.y=(u-x)/E,this.z=(p-l)/E,this.w=Math.acos((h+d+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this.w=Gt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this.w=Gt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Gt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class fu extends Qi{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Ne(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new wa(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mi extends fu{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Sl extends Ne{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class du extends Ne{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ps{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],h=i[s+1],l=i[s+2],u=i[s+3];const p=r[o+0],d=r[o+1],_=r[o+2],x=r[o+3];if(a===0){t[e+0]=c,t[e+1]=h,t[e+2]=l,t[e+3]=u;return}if(a===1){t[e+0]=p,t[e+1]=d,t[e+2]=_,t[e+3]=x;return}if(u!==x||c!==p||h!==d||l!==_){let m=1-a;const f=c*p+h*d+l*_+u*x,E=f>=0?1:-1,w=1-f*f;if(w>Number.EPSILON){const P=Math.sqrt(w),A=Math.atan2(P,f*E);m=Math.sin(m*A)/P,a=Math.sin(a*A)/P}const M=a*E;if(c=c*m+p*M,h=h*m+d*M,l=l*m+_*M,u=u*m+x*M,m===1-a){const P=1/Math.sqrt(c*c+h*h+l*l+u*u);c*=P,h*=P,l*=P,u*=P}}t[e]=c,t[e+1]=h,t[e+2]=l,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],c=i[s+1],h=i[s+2],l=i[s+3],u=r[o],p=r[o+1],d=r[o+2],_=r[o+3];return t[e]=a*_+l*u+c*d-h*p,t[e+1]=c*_+l*p+h*u-a*d,t[e+2]=h*_+l*d+a*p-c*u,t[e+3]=l*_-a*u-c*p-h*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,h=a(i/2),l=a(s/2),u=a(r/2),p=c(i/2),d=c(s/2),_=c(r/2);switch(o){case"XYZ":this._x=p*l*u+h*d*_,this._y=h*d*u-p*l*_,this._z=h*l*_+p*d*u,this._w=h*l*u-p*d*_;break;case"YXZ":this._x=p*l*u+h*d*_,this._y=h*d*u-p*l*_,this._z=h*l*_-p*d*u,this._w=h*l*u+p*d*_;break;case"ZXY":this._x=p*l*u-h*d*_,this._y=h*d*u+p*l*_,this._z=h*l*_+p*d*u,this._w=h*l*u-p*d*_;break;case"ZYX":this._x=p*l*u-h*d*_,this._y=h*d*u+p*l*_,this._z=h*l*_-p*d*u,this._w=h*l*u+p*d*_;break;case"YZX":this._x=p*l*u+h*d*_,this._y=h*d*u+p*l*_,this._z=h*l*_-p*d*u,this._w=h*l*u-p*d*_;break;case"XZY":this._x=p*l*u-h*d*_,this._y=h*d*u-p*l*_,this._z=h*l*_+p*d*u,this._w=h*l*u+p*d*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],h=e[2],l=e[6],u=e[10],p=i+a+u;if(p>0){const d=.5/Math.sqrt(p+1);this._w=.25/d,this._x=(l-c)*d,this._y=(r-h)*d,this._z=(o-s)*d}else if(i>a&&i>u){const d=2*Math.sqrt(1+i-a-u);this._w=(l-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+h)/d}else if(a>u){const d=2*Math.sqrt(1+a-i-u);this._w=(r-h)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+l)/d}else{const d=2*Math.sqrt(1+u-i-a);this._w=(o-s)/d,this._x=(r+h)/d,this._y=(c+l)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Gt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,h=e._z,l=e._w;return this._x=i*l+o*a+s*h-r*c,this._y=s*l+o*c+r*a-i*h,this._z=r*l+o*h+i*c-s*a,this._w=o*l-i*a-s*c-r*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const h=Math.sqrt(c),l=Math.atan2(h,a),u=Math.sin((1-e)*l)/h,p=Math.sin(e*l)/h;return this._w=o*u+this._w*p,this._x=i*u+this._x*p,this._y=s*u+this._y*p,this._z=r*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,i=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(nc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(nc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,h=2*(o*s-a*i),l=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+c*h+o*u-a*l,this.y=i+c*l+a*h-r*u,this.z=s+c*u+r*l-o*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Gt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Hr.copy(this).projectOnVector(t),this.sub(Hr)}reflect(t){return this.sub(Hr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Gt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Hr=new D,nc=new Ps;class yi{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(on.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(on.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=on.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,on):on.fromBufferAttribute(r,o),on.applyMatrix4(t.matrixWorld),this.expandByPoint(on);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ks.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ks.copy(i.boundingBox)),ks.applyMatrix4(t.matrixWorld),this.union(ks)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,on),on.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(cs),Hs.subVectors(this.max,cs),Ai.subVectors(t.a,cs),Ci.subVectors(t.b,cs),Ri.subVectors(t.c,cs),On.subVectors(Ci,Ai),zn.subVectors(Ri,Ci),si.subVectors(Ai,Ri);let e=[0,-On.z,On.y,0,-zn.z,zn.y,0,-si.z,si.y,On.z,0,-On.x,zn.z,0,-zn.x,si.z,0,-si.x,-On.y,On.x,0,-zn.y,zn.x,0,-si.y,si.x,0];return!Gr(e,Ai,Ci,Ri,Hs)||(e=[1,0,0,0,1,0,0,0,1],!Gr(e,Ai,Ci,Ri,Hs))?!1:(Gs.crossVectors(On,zn),e=[Gs.x,Gs.y,Gs.z],Gr(e,Ai,Ci,Ri,Hs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,on).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(on).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const bn=[new D,new D,new D,new D,new D,new D,new D,new D],on=new D,ks=new yi,Ai=new D,Ci=new D,Ri=new D,On=new D,zn=new D,si=new D,cs=new D,Hs=new D,Gs=new D,ri=new D;function Gr(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){ri.fromArray(n,r);const a=s.x*Math.abs(ri.x)+s.y*Math.abs(ri.y)+s.z*Math.abs(ri.z),c=t.dot(ri),h=e.dot(ri),l=i.dot(ri);if(Math.max(-Math.max(c,h,l),Math.min(c,h,l))>a)return!1}return!0}const pu=new yi,ls=new D,Vr=new D;class Ls{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):pu.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ls.subVectors(t,this.center);const e=ls.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(ls,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Vr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ls.copy(t.center).add(Vr)),this.expandByPoint(ls.copy(t.center).sub(Vr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const An=new D,Wr=new D,Vs=new D,Bn=new D,Xr=new D,Ws=new D,qr=new D;class El{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,An)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=An.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(An.copy(this.origin).addScaledVector(this.direction,e),An.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Wr.copy(t).add(e).multiplyScalar(.5),Vs.copy(e).sub(t).normalize(),Bn.copy(this.origin).sub(Wr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Vs),a=Bn.dot(this.direction),c=-Bn.dot(Vs),h=Bn.lengthSq(),l=Math.abs(1-o*o);let u,p,d,_;if(l>0)if(u=o*c-a,p=o*a-c,_=r*l,u>=0)if(p>=-_)if(p<=_){const x=1/l;u*=x,p*=x,d=u*(u+o*p+2*a)+p*(o*u+p+2*c)+h}else p=r,u=Math.max(0,-(o*p+a)),d=-u*u+p*(p+2*c)+h;else p=-r,u=Math.max(0,-(o*p+a)),d=-u*u+p*(p+2*c)+h;else p<=-_?(u=Math.max(0,-(-o*r+a)),p=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+p*(p+2*c)+h):p<=_?(u=0,p=Math.min(Math.max(-r,-c),r),d=p*(p+2*c)+h):(u=Math.max(0,-(o*r+a)),p=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+p*(p+2*c)+h);else p=o>0?-r:r,u=Math.max(0,-(o*p+a)),d=-u*u+p*(p+2*c)+h;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Wr).addScaledVector(Vs,p),d}intersectSphere(t,e){An.subVectors(t.center,this.origin);const i=An.dot(this.direction),s=An.dot(An)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c;const h=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,p=this.origin;return h>=0?(i=(t.min.x-p.x)*h,s=(t.max.x-p.x)*h):(i=(t.max.x-p.x)*h,s=(t.min.x-p.x)*h),l>=0?(r=(t.min.y-p.y)*l,o=(t.max.y-p.y)*l):(r=(t.max.y-p.y)*l,o=(t.min.y-p.y)*l),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-p.z)*u,c=(t.max.z-p.z)*u):(a=(t.max.z-p.z)*u,c=(t.min.z-p.z)*u),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,An)!==null}intersectTriangle(t,e,i,s,r){Xr.subVectors(e,t),Ws.subVectors(i,t),qr.crossVectors(Xr,Ws);let o=this.direction.dot(qr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Bn.subVectors(this.origin,t);const c=a*this.direction.dot(Ws.crossVectors(Bn,Ws));if(c<0)return null;const h=a*this.direction.dot(Xr.cross(Bn));if(h<0||c+h>o)return null;const l=-a*Bn.dot(qr);return l<0?null:this.at(l/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ce{constructor(t,e,i,s,r,o,a,c,h,l,u,p,d,_,x,m){ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,h,l,u,p,d,_,x,m)}set(t,e,i,s,r,o,a,c,h,l,u,p,d,_,x,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=h,f[6]=l,f[10]=u,f[14]=p,f[3]=d,f[7]=_,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ce().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Pi.setFromMatrixColumn(t,0).length(),r=1/Pi.setFromMatrixColumn(t,1).length(),o=1/Pi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),h=Math.sin(s),l=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const p=o*l,d=o*u,_=a*l,x=a*u;e[0]=c*l,e[4]=-c*u,e[8]=h,e[1]=d+_*h,e[5]=p-x*h,e[9]=-a*c,e[2]=x-p*h,e[6]=_+d*h,e[10]=o*c}else if(t.order==="YXZ"){const p=c*l,d=c*u,_=h*l,x=h*u;e[0]=p+x*a,e[4]=_*a-d,e[8]=o*h,e[1]=o*u,e[5]=o*l,e[9]=-a,e[2]=d*a-_,e[6]=x+p*a,e[10]=o*c}else if(t.order==="ZXY"){const p=c*l,d=c*u,_=h*l,x=h*u;e[0]=p-x*a,e[4]=-o*u,e[8]=_+d*a,e[1]=d+_*a,e[5]=o*l,e[9]=x-p*a,e[2]=-o*h,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const p=o*l,d=o*u,_=a*l,x=a*u;e[0]=c*l,e[4]=_*h-d,e[8]=p*h+x,e[1]=c*u,e[5]=x*h+p,e[9]=d*h-_,e[2]=-h,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const p=o*c,d=o*h,_=a*c,x=a*h;e[0]=c*l,e[4]=x-p*u,e[8]=_*u+d,e[1]=u,e[5]=o*l,e[9]=-a*l,e[2]=-h*l,e[6]=d*u+_,e[10]=p-x*u}else if(t.order==="XZY"){const p=o*c,d=o*h,_=a*c,x=a*h;e[0]=c*l,e[4]=-u,e[8]=h*l,e[1]=p*u+x,e[5]=o*l,e[9]=d*u-_,e[2]=_*u-d,e[6]=a*l,e[10]=x*u+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(mu,t,gu)}lookAt(t,e,i){const s=this.elements;return qe.subVectors(t,e),qe.lengthSq()===0&&(qe.z=1),qe.normalize(),kn.crossVectors(i,qe),kn.lengthSq()===0&&(Math.abs(i.z)===1?qe.x+=1e-4:qe.z+=1e-4,qe.normalize(),kn.crossVectors(i,qe)),kn.normalize(),Xs.crossVectors(qe,kn),s[0]=kn.x,s[4]=Xs.x,s[8]=qe.x,s[1]=kn.y,s[5]=Xs.y,s[9]=qe.y,s[2]=kn.z,s[6]=Xs.z,s[10]=qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],h=i[12],l=i[1],u=i[5],p=i[9],d=i[13],_=i[2],x=i[6],m=i[10],f=i[14],E=i[3],w=i[7],M=i[11],P=i[15],A=s[0],b=s[4],C=s[8],S=s[12],v=s[1],L=s[5],k=s[9],O=s[13],Y=s[2],K=s[6],q=s[10],j=s[14],V=s[3],st=s[7],dt=s[11],Et=s[15];return r[0]=o*A+a*v+c*Y+h*V,r[4]=o*b+a*L+c*K+h*st,r[8]=o*C+a*k+c*q+h*dt,r[12]=o*S+a*O+c*j+h*Et,r[1]=l*A+u*v+p*Y+d*V,r[5]=l*b+u*L+p*K+d*st,r[9]=l*C+u*k+p*q+d*dt,r[13]=l*S+u*O+p*j+d*Et,r[2]=_*A+x*v+m*Y+f*V,r[6]=_*b+x*L+m*K+f*st,r[10]=_*C+x*k+m*q+f*dt,r[14]=_*S+x*O+m*j+f*Et,r[3]=E*A+w*v+M*Y+P*V,r[7]=E*b+w*L+M*K+P*st,r[11]=E*C+w*k+M*q+P*dt,r[15]=E*S+w*O+M*j+P*Et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],h=t[13],l=t[2],u=t[6],p=t[10],d=t[14],_=t[3],x=t[7],m=t[11],f=t[15];return _*(+r*c*u-s*h*u-r*a*p+i*h*p+s*a*d-i*c*d)+x*(+e*c*d-e*h*p+r*o*p-s*o*d+s*h*l-r*c*l)+m*(+e*h*u-e*a*d-r*o*u+i*o*d+r*a*l-i*h*l)+f*(-s*a*l-e*c*u+e*a*p+s*o*u-i*o*p+i*c*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],h=t[7],l=t[8],u=t[9],p=t[10],d=t[11],_=t[12],x=t[13],m=t[14],f=t[15],E=u*m*h-x*p*h+x*c*d-a*m*d-u*c*f+a*p*f,w=_*p*h-l*m*h-_*c*d+o*m*d+l*c*f-o*p*f,M=l*x*h-_*u*h+_*a*d-o*x*d-l*a*f+o*u*f,P=_*u*c-l*x*c-_*a*p+o*x*p+l*a*m-o*u*m,A=e*E+i*w+s*M+r*P;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/A;return t[0]=E*b,t[1]=(x*p*r-u*m*r-x*s*d+i*m*d+u*s*f-i*p*f)*b,t[2]=(a*m*r-x*c*r+x*s*h-i*m*h-a*s*f+i*c*f)*b,t[3]=(u*c*r-a*p*r-u*s*h+i*p*h+a*s*d-i*c*d)*b,t[4]=w*b,t[5]=(l*m*r-_*p*r+_*s*d-e*m*d-l*s*f+e*p*f)*b,t[6]=(_*c*r-o*m*r-_*s*h+e*m*h+o*s*f-e*c*f)*b,t[7]=(o*p*r-l*c*r+l*s*h-e*p*h-o*s*d+e*c*d)*b,t[8]=M*b,t[9]=(_*u*r-l*x*r-_*i*d+e*x*d+l*i*f-e*u*f)*b,t[10]=(o*x*r-_*a*r+_*i*h-e*x*h-o*i*f+e*a*f)*b,t[11]=(l*a*r-o*u*r-l*i*h+e*u*h+o*i*d-e*a*d)*b,t[12]=P*b,t[13]=(l*x*s-_*u*s+_*i*p-e*x*p-l*i*m+e*u*m)*b,t[14]=(_*a*s-o*x*s-_*i*c+e*x*c+o*i*m-e*a*m)*b,t[15]=(o*u*s-l*a*s+l*i*c-e*u*c-o*i*p+e*a*p)*b,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,h=r*o,l=r*a;return this.set(h*o+i,h*a-s*c,h*c+s*a,0,h*a+s*c,l*a+i,l*c-s*o,0,h*c-s*a,l*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,h=r+r,l=o+o,u=a+a,p=r*h,d=r*l,_=r*u,x=o*l,m=o*u,f=a*u,E=c*h,w=c*l,M=c*u,P=i.x,A=i.y,b=i.z;return s[0]=(1-(x+f))*P,s[1]=(d+M)*P,s[2]=(_-w)*P,s[3]=0,s[4]=(d-M)*A,s[5]=(1-(p+f))*A,s[6]=(m+E)*A,s[7]=0,s[8]=(_+w)*b,s[9]=(m-E)*b,s[10]=(1-(p+x))*b,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=Pi.set(s[0],s[1],s[2]).length();const o=Pi.set(s[4],s[5],s[6]).length(),a=Pi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],an.copy(this);const h=1/r,l=1/o,u=1/a;return an.elements[0]*=h,an.elements[1]*=h,an.elements[2]*=h,an.elements[4]*=l,an.elements[5]*=l,an.elements[6]*=l,an.elements[8]*=u,an.elements[9]*=u,an.elements[10]*=u,e.setFromRotationMatrix(an),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=Dn){const c=this.elements,h=2*r/(e-t),l=2*r/(i-s),u=(e+t)/(e-t),p=(i+s)/(i-s);let d,_;if(a===Dn)d=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Mr)d=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=l,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=Dn){const c=this.elements,h=1/(e-t),l=1/(i-s),u=1/(o-r),p=(e+t)*h,d=(i+s)*l;let _,x;if(a===Dn)_=(o+r)*u,x=-2*u;else if(a===Mr)_=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*h,c[4]=0,c[8]=0,c[12]=-p,c[1]=0,c[5]=2*l,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=x,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Pi=new D,an=new ce,mu=new D(0,0,0),gu=new D(1,1,1),kn=new D,Xs=new D,qe=new D,ic=new ce,sc=new Ps;class yn{constructor(t=0,e=0,i=0,s=yn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],h=s[5],l=s[9],u=s[2],p=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-l,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(p,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Gt(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Gt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Gt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(Gt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-l,h),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,h),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-l,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return ic.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ic,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return sc.setFromEuler(this),this.setFromQuaternion(sc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yn.DEFAULT_ORDER="XYZ";class Ta{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let _u=0;const rc=new D,Li=new Ps,Cn=new ce,qs=new D,hs=new D,xu=new D,vu=new Ps,oc=new D(1,0,0),ac=new D(0,1,0),cc=new D(0,0,1),lc={type:"added"},Mu={type:"removed"},Di={type:"childadded",child:null},Yr={type:"childremoved",child:null};class Pe extends Qi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_u++}),this.uuid=Rs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pe.DEFAULT_UP.clone();const t=new D,e=new yn,i=new Ps,s=new D(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ce},normalMatrix:{value:new Nt}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=Pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ta,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.multiply(Li),this}rotateOnWorldAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.premultiply(Li),this}rotateX(t){return this.rotateOnAxis(oc,t)}rotateY(t){return this.rotateOnAxis(ac,t)}rotateZ(t){return this.rotateOnAxis(cc,t)}translateOnAxis(t,e){return rc.copy(t).applyQuaternion(this.quaternion),this.position.add(rc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(oc,t)}translateY(t){return this.translateOnAxis(ac,t)}translateZ(t){return this.translateOnAxis(cc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Cn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?qs.copy(t):qs.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),hs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Cn.lookAt(hs,qs,this.up):Cn.lookAt(qs,hs,this.up),this.quaternion.setFromRotationMatrix(Cn),s&&(Cn.extractRotation(s.matrixWorld),Li.setFromRotationMatrix(Cn),this.quaternion.premultiply(Li.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(lc),Di.child=t,this.dispatchEvent(Di),Di.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Mu),Yr.child=t,this.dispatchEvent(Yr),Yr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Cn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Cn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Cn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(lc),Di.child=t,this.dispatchEvent(Di),Di.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hs,t,xu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hs,vu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let h=0,l=c.length;h<l;h++){const u=c[h];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,h=this.material.length;c<h;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),h=o(t.textures),l=o(t.images),u=o(t.shapes),p=o(t.skeletons),d=o(t.animations),_=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),h.length>0&&(i.textures=h),l.length>0&&(i.images=l),u.length>0&&(i.shapes=u),p.length>0&&(i.skeletons=p),d.length>0&&(i.animations=d),_.length>0&&(i.nodes=_)}return i.object=s,i;function o(a){const c=[];for(const h in a){const l=a[h];delete l.metadata,c.push(l)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Pe.DEFAULT_UP=new D(0,1,0);Pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const cn=new D,Rn=new D,$r=new D,Pn=new D,Ii=new D,Ui=new D,hc=new D,Zr=new D,Kr=new D,Jr=new D,jr=new Se,Qr=new Se,to=new Se;class ln{constructor(t=new D,e=new D,i=new D){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),cn.subVectors(t,e),s.cross(cn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){cn.subVectors(s,e),Rn.subVectors(i,e),$r.subVectors(t,e);const o=cn.dot(cn),a=cn.dot(Rn),c=cn.dot($r),h=Rn.dot(Rn),l=Rn.dot($r),u=o*h-a*a;if(u===0)return r.set(0,0,0),null;const p=1/u,d=(h*c-a*l)*p,_=(o*l-a*c)*p;return r.set(1-d-_,_,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Pn)===null?!1:Pn.x>=0&&Pn.y>=0&&Pn.x+Pn.y<=1}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,Pn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Pn.x),c.addScaledVector(o,Pn.y),c.addScaledVector(a,Pn.z),c)}static getInterpolatedAttribute(t,e,i,s,r,o){return jr.setScalar(0),Qr.setScalar(0),to.setScalar(0),jr.fromBufferAttribute(t,e),Qr.fromBufferAttribute(t,i),to.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(jr,r.x),o.addScaledVector(Qr,r.y),o.addScaledVector(to,r.z),o}static isFrontFacing(t,e,i,s){return cn.subVectors(i,e),Rn.subVectors(t,e),cn.cross(Rn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return cn.subVectors(this.c,this.b),Rn.subVectors(this.a,this.b),cn.cross(Rn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ln.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ln.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return ln.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return ln.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ln.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;Ii.subVectors(s,i),Ui.subVectors(r,i),Zr.subVectors(t,i);const c=Ii.dot(Zr),h=Ui.dot(Zr);if(c<=0&&h<=0)return e.copy(i);Kr.subVectors(t,s);const l=Ii.dot(Kr),u=Ui.dot(Kr);if(l>=0&&u<=l)return e.copy(s);const p=c*u-l*h;if(p<=0&&c>=0&&l<=0)return o=c/(c-l),e.copy(i).addScaledVector(Ii,o);Jr.subVectors(t,r);const d=Ii.dot(Jr),_=Ui.dot(Jr);if(_>=0&&d<=_)return e.copy(r);const x=d*h-c*_;if(x<=0&&h>=0&&_<=0)return a=h/(h-_),e.copy(i).addScaledVector(Ui,a);const m=l*_-d*u;if(m<=0&&u-l>=0&&d-_>=0)return hc.subVectors(r,s),a=(u-l)/(u-l+(d-_)),e.copy(s).addScaledVector(hc,a);const f=1/(m+x+p);return o=x*f,a=p*f,e.copy(i).addScaledVector(Ii,o).addScaledVector(Ui,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const wl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hn={h:0,s:0,l:0},Ys={h:0,s:0,l:0};function eo(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Wt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=$e){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=te.workingColorSpace){return this.r=t,this.g=e,this.b=i,te.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=te.workingColorSpace){if(t=iu(t,1),e=Gt(e,0,1),i=Gt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=eo(o,r,t+1/3),this.g=eo(o,r,t),this.b=eo(o,r,t-1/3)}return te.toWorkingColorSpace(this,s),this}setStyle(t,e=$e){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=$e){const i=wl[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=In(t.r),this.g=In(t.g),this.b=In(t.b),this}copyLinearToSRGB(t){return this.r=Xi(t.r),this.g=Xi(t.g),this.b=Xi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=$e){return te.fromWorkingColorSpace(Ie.copy(this),t),Math.round(Gt(Ie.r*255,0,255))*65536+Math.round(Gt(Ie.g*255,0,255))*256+Math.round(Gt(Ie.b*255,0,255))}getHexString(t=$e){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.fromWorkingColorSpace(Ie.copy(this),e);const i=Ie.r,s=Ie.g,r=Ie.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,h;const l=(a+o)/2;if(a===o)c=0,h=0;else{const u=o-a;switch(h=l<=.5?u/(o+a):u/(2-o-a),o){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return t.h=c,t.s=h,t.l=l,t}getRGB(t,e=te.workingColorSpace){return te.fromWorkingColorSpace(Ie.copy(this),e),t.r=Ie.r,t.g=Ie.g,t.b=Ie.b,t}getStyle(t=$e){te.fromWorkingColorSpace(Ie.copy(this),t);const e=Ie.r,i=Ie.g,s=Ie.b;return t!==$e?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Hn),this.setHSL(Hn.h+t,Hn.s+e,Hn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Hn),t.getHSL(Ys);const i=zr(Hn.h,Ys.h,e),s=zr(Hn.s,Ys.s,e),r=zr(Hn.l,Ys.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ie=new Wt;Wt.NAMES=wl;let yu=0;class Ds extends Qi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yu++}),this.uuid=Rs(),this.name="",this.type="Material",this.blending=Wi,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=So,this.blendDst=Eo,this.blendEquation=fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=Yi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ka,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ti,this.stencilZFail=Ti,this.stencilZPass=Ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Wi&&(i.blending=this.blending),this.side!==Kn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==So&&(i.blendSrc=this.blendSrc),this.blendDst!==Eo&&(i.blendDst=this.blendDst),this.blendEquation!==fi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Yi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ka&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ti&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ti&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ti&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Fe extends Ds{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.combine=cl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const we=new D,$s=new gt;let Su=0;class un{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Su++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ja,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)$s.fromBufferAttribute(this,e),$s.applyMatrix3(t),this.setXY(e,$s.x,$s.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyMatrix3(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=as(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=He(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=as(e,this.array)),e}setX(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=as(e,this.array)),e}setY(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=as(e,this.array)),e}setZ(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=as(e,this.array)),e}setW(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=He(e,this.array),i=He(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=He(e,this.array),i=He(i,this.array),s=He(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=He(e,this.array),i=He(i,this.array),s=He(s,this.array),r=He(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ja&&(t.usage=this.usage),t}}class Tl extends un{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class bl extends un{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class le extends un{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Eu=0;const Qe=new ce,no=new Pe,Ni=new D,Ye=new yi,us=new yi,Ae=new D;class We extends Qi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Eu++}),this.uuid=Rs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yl(t)?bl:Tl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Nt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Qe.makeRotationFromQuaternion(t),this.applyMatrix4(Qe),this}rotateX(t){return Qe.makeRotationX(t),this.applyMatrix4(Qe),this}rotateY(t){return Qe.makeRotationY(t),this.applyMatrix4(Qe),this}rotateZ(t){return Qe.makeRotationZ(t),this.applyMatrix4(Qe),this}translate(t,e,i){return Qe.makeTranslation(t,e,i),this.applyMatrix4(Qe),this}scale(t,e,i){return Qe.makeScale(t,e,i),this.applyMatrix4(Qe),this}lookAt(t){return no.lookAt(t),no.updateMatrix(),this.applyMatrix4(no.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ni).negate(),this.translate(Ni.x,Ni.y,Ni.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new le(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];Ye.setFromBufferAttribute(r),this.morphTargetsRelative?(Ae.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Ae),Ae.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Ae)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ls);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const i=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];us.setFromBufferAttribute(a),this.morphTargetsRelative?(Ae.addVectors(Ye.min,us.min),Ye.expandByPoint(Ae),Ae.addVectors(Ye.max,us.max),Ye.expandByPoint(Ae)):(Ye.expandByPoint(us.min),Ye.expandByPoint(us.max))}Ye.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ae.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ae));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let h=0,l=a.count;h<l;h++)Ae.fromBufferAttribute(a,h),c&&(Ni.fromBufferAttribute(t,h),Ae.add(Ni)),s=Math.max(s,i.distanceToSquared(Ae))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new un(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let C=0;C<i.count;C++)a[C]=new D,c[C]=new D;const h=new D,l=new D,u=new D,p=new gt,d=new gt,_=new gt,x=new D,m=new D;function f(C,S,v){h.fromBufferAttribute(i,C),l.fromBufferAttribute(i,S),u.fromBufferAttribute(i,v),p.fromBufferAttribute(r,C),d.fromBufferAttribute(r,S),_.fromBufferAttribute(r,v),l.sub(h),u.sub(h),d.sub(p),_.sub(p);const L=1/(d.x*_.y-_.x*d.y);isFinite(L)&&(x.copy(l).multiplyScalar(_.y).addScaledVector(u,-d.y).multiplyScalar(L),m.copy(u).multiplyScalar(d.x).addScaledVector(l,-_.x).multiplyScalar(L),a[C].add(x),a[S].add(x),a[v].add(x),c[C].add(m),c[S].add(m),c[v].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let C=0,S=E.length;C<S;++C){const v=E[C],L=v.start,k=v.count;for(let O=L,Y=L+k;O<Y;O+=3)f(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const w=new D,M=new D,P=new D,A=new D;function b(C){P.fromBufferAttribute(s,C),A.copy(P);const S=a[C];w.copy(S),w.sub(P.multiplyScalar(P.dot(S))).normalize(),M.crossVectors(A,S);const L=M.dot(c[C])<0?-1:1;o.setXYZW(C,w.x,w.y,w.z,L)}for(let C=0,S=E.length;C<S;++C){const v=E[C],L=v.start,k=v.count;for(let O=L,Y=L+k;O<Y;O+=3)b(t.getX(O+0)),b(t.getX(O+1)),b(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new un(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let p=0,d=i.count;p<d;p++)i.setXYZ(p,0,0,0);const s=new D,r=new D,o=new D,a=new D,c=new D,h=new D,l=new D,u=new D;if(t)for(let p=0,d=t.count;p<d;p+=3){const _=t.getX(p+0),x=t.getX(p+1),m=t.getX(p+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),l.subVectors(o,r),u.subVectors(s,r),l.cross(u),a.fromBufferAttribute(i,_),c.fromBufferAttribute(i,x),h.fromBufferAttribute(i,m),a.add(l),c.add(l),h.add(l),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(m,h.x,h.y,h.z)}else for(let p=0,d=e.count;p<d;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),o.fromBufferAttribute(e,p+2),l.subVectors(o,r),u.subVectors(s,r),l.cross(u),i.setXYZ(p+0,l.x,l.y,l.z),i.setXYZ(p+1,l.x,l.y,l.z),i.setXYZ(p+2,l.x,l.y,l.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ae.fromBufferAttribute(t,e),Ae.normalize(),t.setXYZ(e,Ae.x,Ae.y,Ae.z)}toNonIndexed(){function t(a,c){const h=a.array,l=a.itemSize,u=a.normalized,p=new h.constructor(c.length*l);let d=0,_=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?d=c[x]*a.data.stride+a.offset:d=c[x]*l;for(let f=0;f<l;f++)p[_++]=h[d++]}return new un(p,l,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new We,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],h=t(c,i);e.setAttribute(a,h)}const r=this.morphAttributes;for(const a in r){const c=[],h=r[a];for(let l=0,u=h.length;l<u;l++){const p=h[l],d=t(p,i);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const h=o[a];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const h in c)c[h]!==void 0&&(t[h]=c[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const h=i[c];t.data.attributes[c]=h.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const h=this.morphAttributes[c],l=[];for(let u=0,p=h.length;u<p;u++){const d=h[u];l.push(d.toJSON(t.data))}l.length>0&&(s[c]=l,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const h in s){const l=s[h];this.setAttribute(h,l.clone(e))}const r=t.morphAttributes;for(const h in r){const l=[],u=r[h];for(let p=0,d=u.length;p<d;p++)l.push(u[p].clone(e));this.morphAttributes[h]=l}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let h=0,l=o.length;h<l;h++){const u=o[h];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const uc=new ce,oi=new El,Zs=new Ls,fc=new D,Ks=new D,Js=new D,js=new D,io=new D,Qs=new D,dc=new D,tr=new D;class W extends Pe{constructor(t=new We,e=new Fe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Qs.set(0,0,0);for(let c=0,h=r.length;c<h;c++){const l=a[c],u=r[c];l!==0&&(io.fromBufferAttribute(u,t),o?Qs.addScaledVector(io,l):Qs.addScaledVector(io.sub(e),l))}e.add(Qs)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Zs.copy(i.boundingSphere),Zs.applyMatrix4(r),oi.copy(t.ray).recast(t.near),!(Zs.containsPoint(oi.origin)===!1&&(oi.intersectSphere(Zs,fc)===null||oi.origin.distanceToSquared(fc)>(t.far-t.near)**2))&&(uc.copy(r).invert(),oi.copy(t.ray).applyMatrix4(uc),!(i.boundingBox!==null&&oi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,oi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,h=r.attributes.uv,l=r.attributes.uv1,u=r.attributes.normal,p=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,x=p.length;_<x;_++){const m=p[_],f=o[m.materialIndex],E=Math.max(m.start,d.start),w=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let M=E,P=w;M<P;M+=3){const A=a.getX(M),b=a.getX(M+1),C=a.getX(M+2);s=er(this,f,t,i,h,l,u,A,b,C),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const _=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let m=_,f=x;m<f;m+=3){const E=a.getX(m),w=a.getX(m+1),M=a.getX(m+2);s=er(this,o,t,i,h,l,u,E,w,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,x=p.length;_<x;_++){const m=p[_],f=o[m.materialIndex],E=Math.max(m.start,d.start),w=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let M=E,P=w;M<P;M+=3){const A=M,b=M+1,C=M+2;s=er(this,f,t,i,h,l,u,A,b,C),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const _=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let m=_,f=x;m<f;m+=3){const E=m,w=m+1,M=m+2;s=er(this,o,t,i,h,l,u,E,w,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function wu(n,t,e,i,s,r,o,a){let c;if(t.side===Ge?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===Kn,a),c===null)return null;tr.copy(a),tr.applyMatrix4(n.matrixWorld);const h=e.ray.origin.distanceTo(tr);return h<e.near||h>e.far?null:{distance:h,point:tr.clone(),object:n}}function er(n,t,e,i,s,r,o,a,c,h){n.getVertexPosition(a,Ks),n.getVertexPosition(c,Js),n.getVertexPosition(h,js);const l=wu(n,t,e,i,Ks,Js,js,dc);if(l){const u=new D;ln.getBarycoord(dc,Ks,Js,js,u),s&&(l.uv=ln.getInterpolatedAttribute(s,a,c,h,u,new gt)),r&&(l.uv1=ln.getInterpolatedAttribute(r,a,c,h,u,new gt)),o&&(l.normal=ln.getInterpolatedAttribute(o,a,c,h,u,new D),l.normal.dot(i.direction)>0&&l.normal.multiplyScalar(-1));const p={a,b:c,c:h,normal:new D,materialIndex:0};ln.getNormal(Ks,Js,js,p.normal),l.face=p,l.barycoord=u}return l}class ne extends We{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],h=[],l=[],u=[];let p=0,d=0;_("z","y","x",-1,-1,i,e,t,o,r,0),_("z","y","x",1,-1,i,e,-t,o,r,1),_("x","z","y",1,1,t,i,e,s,o,2),_("x","z","y",1,-1,t,i,-e,s,o,3),_("x","y","z",1,-1,t,e,i,s,r,4),_("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new le(h,3)),this.setAttribute("normal",new le(l,3)),this.setAttribute("uv",new le(u,2));function _(x,m,f,E,w,M,P,A,b,C,S){const v=M/b,L=P/C,k=M/2,O=P/2,Y=A/2,K=b+1,q=C+1;let j=0,V=0;const st=new D;for(let dt=0;dt<q;dt++){const Et=dt*L-O;for(let zt=0;zt<K;zt++){const ee=zt*v-k;st[x]=ee*E,st[m]=Et*w,st[f]=Y,h.push(st.x,st.y,st.z),st[x]=0,st[m]=0,st[f]=A>0?1:-1,l.push(st.x,st.y,st.z),u.push(zt/b),u.push(1-dt/C),j+=1}}for(let dt=0;dt<C;dt++)for(let Et=0;Et<b;Et++){const zt=p+Et+K*dt,ee=p+Et+K*(dt+1),$=p+(Et+1)+K*(dt+1),et=p+(Et+1)+K*dt;c.push(zt,ee,et),c.push(ee,$,et),V+=6}a.addGroup(d,V,S),d+=V,p+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ne(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ji(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function ze(n){const t={};for(let e=0;e<n.length;e++){const i=Ji(n[e]);for(const s in i)t[s]=i[s]}return t}function Tu(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Al(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}const bu={clone:Ji,merge:ze};var Au=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Jn extends Ds{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Au,this.fragmentShader=Cu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ji(t.uniforms),this.uniformsGroups=Tu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Cl extends Pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=Dn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Gn=new D,pc=new gt,mc=new gt;class nn extends Cl{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=oa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Or*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return oa*2*Math.atan(Math.tan(Or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Gn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Gn.x,Gn.y).multiplyScalar(-t/Gn.z),Gn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Gn.x,Gn.y).multiplyScalar(-t/Gn.z)}getViewSize(t,e){return this.getViewBounds(t,pc,mc),e.subVectors(mc,pc)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Or*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,h=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/h,s*=o.width/c,i*=o.height/h}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Fi=-90,Oi=1;class Ru extends Pe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new nn(Fi,Oi,t,e);s.layers=this.layers,this.add(s);const r=new nn(Fi,Oi,t,e);r.layers=this.layers,this.add(r);const o=new nn(Fi,Oi,t,e);o.layers=this.layers,this.add(o);const a=new nn(Fi,Oi,t,e);a.layers=this.layers,this.add(a);const c=new nn(Fi,Oi,t,e);c.layers=this.layers,this.add(c);const h=new nn(Fi,Oi,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(const h of e)this.remove(h);if(t===Dn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Mr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,h,l]=this.children,u=t.getRenderTarget(),p=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,c),t.setRenderTarget(i,4,s),t.render(e,h),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,s),t.render(e,l),t.setRenderTarget(u,p,d),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Rl extends Ne{constructor(t=[],e=$i,i,s,r,o,a,c,h,l){super(t,e,i,s,r,o,a,c,h,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Pu extends Mi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Rl(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:_n}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ne(5,5,5),r=new Jn({name:"CubemapFromEquirect",uniforms:Ji(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ge,blending:Xn});r.uniforms.tEquirect.value=e;const o=new W(s,r),a=e.minFilter;return e.minFilter===mi&&(e.minFilter=_n),new Ru(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}class xe extends Pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Lu={type:"move"};class so{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,i),f=this._getHandJoint(h,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const l=h.joints["index-finger-tip"],u=h.joints["thumb-tip"],p=l.position.distanceTo(u.position),d=.02,_=.005;h.inputState.pinching&&p>d+_?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&p<=d-_&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Lu)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),h!==null&&(h.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new xe;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class ba{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Wt(t),this.near=e,this.far=i}clone(){return new ba(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Du extends Pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yn,this.environmentIntensity=1,this.environmentRotation=new yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Iu extends Ne{constructor(t=null,e=1,i=1,s,r,o,a,c,h=Ke,l=Ke,u,p){super(null,o,a,c,h,l,s,r,u,p),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gc extends un{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const zi=new ce,_c=new ce,nr=[],xc=new yi,Uu=new ce,fs=new W,ds=new Ls;class vc extends W{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new gc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Uu)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new yi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,zi),xc.copy(t.boundingBox).applyMatrix4(zi),this.boundingBox.union(xc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ls),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,zi),ds.copy(t.boundingSphere).applyMatrix4(zi),this.boundingSphere.union(ds)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(fs.geometry=this.geometry,fs.material=this.material,fs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ds.copy(this.boundingSphere),ds.applyMatrix4(i),t.ray.intersectsSphere(ds)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,zi),_c.multiplyMatrices(i,zi),fs.matrixWorld=_c,fs.raycast(t,nr);for(let o=0,a=nr.length;o<a;o++){const c=nr[o];c.instanceId=r,c.object=this,e.push(c)}nr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new gc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Iu(new Float32Array(s*this.count),s,this.count,Ma,xn));const r=this.morphTexture.source.data.data;let o=0;for(let h=0;h<i.length;h++)o+=i[h];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(i,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ro=new D,Nu=new D,Fu=new Nt;class Vn{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=ro.subVectors(i,e).cross(Nu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(ro),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Fu.getNormalMatrix(t),s=this.coplanarPoint(ro).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ai=new Ls,ir=new D;class Aa{constructor(t=new Vn,e=new Vn,i=new Vn,s=new Vn,r=new Vn,o=new Vn){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Dn){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],h=s[4],l=s[5],u=s[6],p=s[7],d=s[8],_=s[9],x=s[10],m=s[11],f=s[12],E=s[13],w=s[14],M=s[15];if(i[0].setComponents(c-r,p-h,m-d,M-f).normalize(),i[1].setComponents(c+r,p+h,m+d,M+f).normalize(),i[2].setComponents(c+o,p+l,m+_,M+E).normalize(),i[3].setComponents(c-o,p-l,m-_,M-E).normalize(),i[4].setComponents(c-a,p-u,m-x,M-w).normalize(),e===Dn)i[5].setComponents(c+a,p+u,m+x,M+w).normalize();else if(e===Mr)i[5].setComponents(a,u,x,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ai.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ai.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ai)}intersectsSprite(t){return ai.center.set(0,0,0),ai.radius=.7071067811865476,ai.applyMatrix4(t.matrixWorld),this.intersectsSphere(ai)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(ir.x=s.normal.x>0?t.max.x:t.min.x,ir.y=s.normal.y>0?t.max.y:t.min.y,ir.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ir)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ou extends Ne{constructor(t,e,i,s,r,o,a,c,h){super(t,e,i,s,r,o,a,c,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Pl extends Ne{constructor(t,e,i=vi,s,r,o,a=Ke,c=Ke,h,l=ys){if(l!==ys&&l!==Ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super(null,s,r,o,a,c,l,i,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new wa(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class En{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let a=0,c=r-1,h;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),h=i[s]-o,h<0)a=s+1;else if(h>0)c=s-1;else{c=s;break}if(s=c,i[s]===o)return s/(r-1);const l=i[s],p=i[s+1]-l,d=(o-l)/p;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new gt:new D);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new D,s=[],r=[],o=[],a=new D,c=new ce;for(let d=0;d<=t;d++){const _=d/t;s[d]=this.getTangentAt(_,new D)}r[0]=new D,o[0]=new D;let h=Number.MAX_VALUE;const l=Math.abs(s[0].x),u=Math.abs(s[0].y),p=Math.abs(s[0].z);l<=h&&(h=l,i.set(1,0,0)),u<=h&&(h=u,i.set(0,1,0)),p<=h&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const _=Math.acos(Gt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,_))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Gt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let _=1;_<=t;_++)r[_].applyMatrix4(c.makeRotationAxis(s[_],d*_)),o[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ca extends En{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new gt){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),h=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const l=Math.cos(this.aRotation),u=Math.sin(this.aRotation),p=c-this.aX,d=h-this.aY;c=p*l-d*u+this.aX,h=p*u+d*l+this.aY}return i.set(c,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class zu extends Ca{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ra(){let n=0,t=0,e=0,i=0;function s(r,o,a,c){n=r,t=a,e=-3*r+3*o-2*a-c,i=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,h){s(o,a,h*(a-r),h*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,h,l,u){let p=(o-r)/h-(a-r)/(h+l)+(a-o)/l,d=(a-o)/l-(c-o)/(l+u)+(c-a)/u;p*=l,d*=l,s(o,a,p,d)},calc:function(r){const o=r*r,a=o*r;return n+t*r+e*o+i*a}}}const sr=new D,oo=new Ra,ao=new Ra,co=new Ra;class Bu extends En{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new D){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let h,l;this.closed||a>0?h=s[(a-1)%r]:(sr.subVectors(s[0],s[1]).add(s[0]),h=sr);const u=s[a%r],p=s[(a+1)%r];if(this.closed||a+2<r?l=s[(a+2)%r]:(sr.subVectors(s[r-1],s[r-2]).add(s[r-1]),l=sr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let _=Math.pow(h.distanceToSquared(u),d),x=Math.pow(u.distanceToSquared(p),d),m=Math.pow(p.distanceToSquared(l),d);x<1e-4&&(x=1),_<1e-4&&(_=x),m<1e-4&&(m=x),oo.initNonuniformCatmullRom(h.x,u.x,p.x,l.x,_,x,m),ao.initNonuniformCatmullRom(h.y,u.y,p.y,l.y,_,x,m),co.initNonuniformCatmullRom(h.z,u.z,p.z,l.z,_,x,m)}else this.curveType==="catmullrom"&&(oo.initCatmullRom(h.x,u.x,p.x,l.x,this.tension),ao.initCatmullRom(h.y,u.y,p.y,l.y,this.tension),co.initCatmullRom(h.z,u.z,p.z,l.z,this.tension));return i.set(oo.calc(c),ao.calc(c),co.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Mc(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,a=n*n,c=n*a;return(2*e-2*i+r+o)*c+(-3*e+3*i-2*r-o)*a+r*n+e}function ku(n,t){const e=1-n;return e*e*t}function Hu(n,t){return 2*(1-n)*n*t}function Gu(n,t){return n*n*t}function gs(n,t,e,i){return ku(n,t)+Hu(n,e)+Gu(n,i)}function Vu(n,t){const e=1-n;return e*e*e*t}function Wu(n,t){const e=1-n;return 3*e*e*n*t}function Xu(n,t){return 3*(1-n)*n*n*t}function qu(n,t){return n*n*n*t}function _s(n,t,e,i,s){return Vu(n,t)+Wu(n,e)+Xu(n,i)+qu(n,s)}class Ll extends En{constructor(t=new gt,e=new gt,i=new gt,s=new gt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new gt){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(_s(t,s.x,r.x,o.x,a.x),_s(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Yu extends En{constructor(t=new D,e=new D,i=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new D){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(_s(t,s.x,r.x,o.x,a.x),_s(t,s.y,r.y,o.y,a.y),_s(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Dl extends En{constructor(t=new gt,e=new gt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new gt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new gt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $u extends En{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Il extends En{constructor(t=new gt,e=new gt,i=new gt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new gt){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(gs(t,s.x,r.x,o.x),gs(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Zu extends En{constructor(t=new D,e=new D,i=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new D){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(gs(t,s.x,r.x,o.x),gs(t,s.y,r.y,o.y),gs(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ul extends En{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new gt){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],h=s[o],l=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return i.set(Mc(a,c.x,h.x,l.x,u.x),Mc(a,c.y,h.y,l.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new gt().fromArray(s))}return this}}var yc=Object.freeze({__proto__:null,ArcCurve:zu,CatmullRomCurve3:Bu,CubicBezierCurve:Ll,CubicBezierCurve3:Yu,EllipseCurve:Ca,LineCurve:Dl,LineCurve3:$u,QuadraticBezierCurve:Il,QuadraticBezierCurve3:Zu,SplineCurve:Ul});class Ku extends En{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new yc[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],c=a.getLength(),h=c===0?0:1-o/c;return a.getPointAt(h,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let h=0;h<c.length;h++){const l=c[h];i&&i.equals(l)||(e.push(l),i=l)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new yc[s.type]().fromJSON(s))}return this}}class Ju extends Ku{constructor(t){super(),this.type="Path",this.currentPoint=new gt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new Dl(this.currentPoint.clone(),new gt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new Il(this.currentPoint.clone(),new gt(t,e),new gt(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){const a=new Ll(this.currentPoint.clone(),new gt(t,e),new gt(i,s),new gt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new Ul(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,c){const h=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(t+h,e+l,i,s,r,o,a,c),this}absellipse(t,e,i,s,r,o,a,c){const h=new Ca(t,e,i,s,r,o,a,c);if(this.curves.length>0){const u=h.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(h);const l=h.getPoint(1);return this.currentPoint.copy(l),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Pa extends We{constructor(t=[new gt(0,-.5),new gt(.5,0),new gt(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=Gt(s,0,Math.PI*2);const r=[],o=[],a=[],c=[],h=[],l=1/e,u=new D,p=new gt,d=new D,_=new D,x=new D;let m=0,f=0;for(let E=0;E<=t.length-1;E++)switch(E){case 0:m=t[E+1].x-t[E].x,f=t[E+1].y-t[E].y,d.x=f*1,d.y=-m,d.z=f*0,x.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(x.x,x.y,x.z);break;default:m=t[E+1].x-t[E].x,f=t[E+1].y-t[E].y,d.x=f*1,d.y=-m,d.z=f*0,_.copy(d),d.x+=x.x,d.y+=x.y,d.z+=x.z,d.normalize(),c.push(d.x,d.y,d.z),x.copy(_)}for(let E=0;E<=e;E++){const w=i+E*l*s,M=Math.sin(w),P=Math.cos(w);for(let A=0;A<=t.length-1;A++){u.x=t[A].x*M,u.y=t[A].y,u.z=t[A].x*P,o.push(u.x,u.y,u.z),p.x=E/e,p.y=A/(t.length-1),a.push(p.x,p.y);const b=c[3*A+0]*M,C=c[3*A+1],S=c[3*A+0]*P;h.push(b,C,S)}}for(let E=0;E<e;E++)for(let w=0;w<t.length-1;w++){const M=w+E*t.length,P=M,A=M+t.length,b=M+t.length+1,C=M+1;r.push(P,A,C),r.push(b,C,A)}this.setIndex(r),this.setAttribute("position",new le(o,3)),this.setAttribute("uv",new le(a,2)),this.setAttribute("normal",new le(h,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pa(t.points,t.segments,t.phiStart,t.phiLength)}}class Sr extends Pa{constructor(t=1,e=1,i=4,s=8){const r=new Ju;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(i),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:i,radialSegments:s}}static fromJSON(t){return new Sr(t.radius,t.length,t.capSegments,t.radialSegments)}}class Is extends We{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],h=new D,l=new gt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,p=3;u<=e;u++,p+=3){const d=i+u/e*s;h.x=t*Math.cos(d),h.y=t*Math.sin(d),o.push(h.x,h.y,h.z),a.push(0,0,1),l.x=(o[p]/t+1)/2,l.y=(o[p+1]/t+1)/2,c.push(l.x,l.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new le(o,3)),this.setAttribute("normal",new le(a,3)),this.setAttribute("uv",new le(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Is(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Vt extends We{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const h=this;s=Math.floor(s),r=Math.floor(r);const l=[],u=[],p=[],d=[];let _=0;const x=[],m=i/2;let f=0;E(),o===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(l),this.setAttribute("position",new le(u,3)),this.setAttribute("normal",new le(p,3)),this.setAttribute("uv",new le(d,2));function E(){const M=new D,P=new D;let A=0;const b=(e-t)/i;for(let C=0;C<=r;C++){const S=[],v=C/r,L=v*(e-t)+t;for(let k=0;k<=s;k++){const O=k/s,Y=O*c+a,K=Math.sin(Y),q=Math.cos(Y);P.x=L*K,P.y=-v*i+m,P.z=L*q,u.push(P.x,P.y,P.z),M.set(K,b,q).normalize(),p.push(M.x,M.y,M.z),d.push(O,1-v),S.push(_++)}x.push(S)}for(let C=0;C<s;C++)for(let S=0;S<r;S++){const v=x[S][C],L=x[S+1][C],k=x[S+1][C+1],O=x[S][C+1];(t>0||S!==0)&&(l.push(v,L,O),A+=3),(e>0||S!==r-1)&&(l.push(L,k,O),A+=3)}h.addGroup(f,A,0),f+=A}function w(M){const P=_,A=new gt,b=new D;let C=0;const S=M===!0?t:e,v=M===!0?1:-1;for(let k=1;k<=s;k++)u.push(0,m*v,0),p.push(0,v,0),d.push(.5,.5),_++;const L=_;for(let k=0;k<=s;k++){const Y=k/s*c+a,K=Math.cos(Y),q=Math.sin(Y);b.x=S*q,b.y=m*v,b.z=S*K,u.push(b.x,b.y,b.z),p.push(0,v,0),A.x=K*.5+.5,A.y=q*.5*v+.5,d.push(A.x,A.y),_++}for(let k=0;k<s;k++){const O=P+k,Y=L+k;M===!0?l.push(Y,Y+1,O):l.push(Y+1,Y,O),C+=3}h.addGroup(f,C,M===!0?1:2),f+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Yn extends Vt{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Yn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class La extends We{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],o=[];a(s),h(i),l(),this.setAttribute("position",new le(r,3)),this.setAttribute("normal",new le(r.slice(),3)),this.setAttribute("uv",new le(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(E){const w=new D,M=new D,P=new D;for(let A=0;A<e.length;A+=3)d(e[A+0],w),d(e[A+1],M),d(e[A+2],P),c(w,M,P,E)}function c(E,w,M,P){const A=P+1,b=[];for(let C=0;C<=A;C++){b[C]=[];const S=E.clone().lerp(M,C/A),v=w.clone().lerp(M,C/A),L=A-C;for(let k=0;k<=L;k++)k===0&&C===A?b[C][k]=S:b[C][k]=S.clone().lerp(v,k/L)}for(let C=0;C<A;C++)for(let S=0;S<2*(A-C)-1;S++){const v=Math.floor(S/2);S%2===0?(p(b[C][v+1]),p(b[C+1][v]),p(b[C][v])):(p(b[C][v+1]),p(b[C+1][v+1]),p(b[C+1][v]))}}function h(E){const w=new D;for(let M=0;M<r.length;M+=3)w.x=r[M+0],w.y=r[M+1],w.z=r[M+2],w.normalize().multiplyScalar(E),r[M+0]=w.x,r[M+1]=w.y,r[M+2]=w.z}function l(){const E=new D;for(let w=0;w<r.length;w+=3){E.x=r[w+0],E.y=r[w+1],E.z=r[w+2];const M=m(E)/2/Math.PI+.5,P=f(E)/Math.PI+.5;o.push(M,1-P)}_(),u()}function u(){for(let E=0;E<o.length;E+=6){const w=o[E+0],M=o[E+2],P=o[E+4],A=Math.max(w,M,P),b=Math.min(w,M,P);A>.9&&b<.1&&(w<.2&&(o[E+0]+=1),M<.2&&(o[E+2]+=1),P<.2&&(o[E+4]+=1))}}function p(E){r.push(E.x,E.y,E.z)}function d(E,w){const M=E*3;w.x=t[M+0],w.y=t[M+1],w.z=t[M+2]}function _(){const E=new D,w=new D,M=new D,P=new D,A=new gt,b=new gt,C=new gt;for(let S=0,v=0;S<r.length;S+=9,v+=6){E.set(r[S+0],r[S+1],r[S+2]),w.set(r[S+3],r[S+4],r[S+5]),M.set(r[S+6],r[S+7],r[S+8]),A.set(o[v+0],o[v+1]),b.set(o[v+2],o[v+3]),C.set(o[v+4],o[v+5]),P.copy(E).add(w).add(M).divideScalar(3);const L=m(P);x(A,v+0,E,L),x(b,v+2,w,L),x(C,v+4,M,L)}}function x(E,w,M,P){P<0&&E.x===1&&(o[w]=E.x-1),M.x===0&&M.z===0&&(o[w]=P/2/Math.PI+.5)}function m(E){return Math.atan2(E.z,-E.x)}function f(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new La(t.vertices,t.indices,t.radius,t.details)}}class ti extends La{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ti(t.radius,t.detail)}}class $n extends We{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),h=a+1,l=c+1,u=t/a,p=e/c,d=[],_=[],x=[],m=[];for(let f=0;f<l;f++){const E=f*p-o;for(let w=0;w<h;w++){const M=w*u-r;_.push(M,-E,0),x.push(0,0,1),m.push(w/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let E=0;E<a;E++){const w=E+h*f,M=E+h*(f+1),P=E+1+h*(f+1),A=E+1+h*f;d.push(w,M,A),d.push(M,P,A)}this.setIndex(d),this.setAttribute("position",new le(_,3)),this.setAttribute("normal",new le(x,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $n(t.width,t.height,t.widthSegments,t.heightSegments)}}class ts extends We{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],c=[],h=[],l=[];let u=t;const p=(e-t)/s,d=new D,_=new gt;for(let x=0;x<=s;x++){for(let m=0;m<=i;m++){const f=r+m/i*o;d.x=u*Math.cos(f),d.y=u*Math.sin(f),c.push(d.x,d.y,d.z),h.push(0,0,1),_.x=(d.x/e+1)/2,_.y=(d.y/e+1)/2,l.push(_.x,_.y)}u+=p}for(let x=0;x<s;x++){const m=x*(i+1);for(let f=0;f<i;f++){const E=f+m,w=E,M=E+i+1,P=E+i+2,A=E+1;a.push(w,M,A),a.push(M,P,A)}}this.setIndex(a),this.setAttribute("position",new le(c,3)),this.setAttribute("normal",new le(h,3)),this.setAttribute("uv",new le(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ts(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ue extends We{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let h=0;const l=[],u=new D,p=new D,d=[],_=[],x=[],m=[];for(let f=0;f<=i;f++){const E=[],w=f/i;let M=0;f===0&&o===0?M=.5/e:f===i&&c===Math.PI&&(M=-.5/e);for(let P=0;P<=e;P++){const A=P/e;u.x=-t*Math.cos(s+A*r)*Math.sin(o+w*a),u.y=t*Math.cos(o+w*a),u.z=t*Math.sin(s+A*r)*Math.sin(o+w*a),_.push(u.x,u.y,u.z),p.copy(u).normalize(),x.push(p.x,p.y,p.z),m.push(A+M,1-w),E.push(h++)}l.push(E)}for(let f=0;f<i;f++)for(let E=0;E<e;E++){const w=l[f][E+1],M=l[f][E],P=l[f+1][E],A=l[f+1][E+1];(f!==0||o>0)&&d.push(w,M,A),(f!==i-1||c<Math.PI)&&d.push(M,P,A)}this.setIndex(d),this.setAttribute("position",new le(_,3)),this.setAttribute("normal",new le(x,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ue(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Un extends We{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],c=[],h=[],l=new D,u=new D,p=new D;for(let d=0;d<=i;d++)for(let _=0;_<=s;_++){const x=_/s*r,m=d/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(x),u.y=(t+e*Math.cos(m))*Math.sin(x),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),l.x=t*Math.cos(x),l.y=t*Math.sin(x),p.subVectors(u,l).normalize(),c.push(p.x,p.y,p.z),h.push(_/s),h.push(d/i)}for(let d=1;d<=i;d++)for(let _=1;_<=s;_++){const x=(s+1)*d+_-1,m=(s+1)*(d-1)+_-1,f=(s+1)*(d-1)+_,E=(s+1)*d+_;o.push(x,m,E),o.push(m,f,E)}this.setIndex(o),this.setAttribute("position",new le(a,3)),this.setAttribute("normal",new le(c,3)),this.setAttribute("uv",new le(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Un(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Sn extends Ds{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vl,this.normalScale=new gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ju extends Ds{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Qu extends Ds{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Da extends Pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class tf extends Da{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const lo=new ce,Sc=new D,Ec=new D;class ef{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new gt(512,512),this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Aa,this._frameExtents=new gt(1,1),this._viewportCount=1,this._viewports=[new Se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Sc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Sc),Ec.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ec),e.updateMatrixWorld(),lo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(lo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Nl extends Cl{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,o=r+h*this.view.width,a-=l*this.view.offsetY,c=a-l*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class nf extends ef{constructor(){super(new Nl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class sf extends Da{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.target=new Pe,this.shadow=new nf}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class rf extends Da{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class of extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t,this.index=0}}const wc=new ce;class af{constructor(t,e,i=0,s=1/0){this.ray=new El(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Ta,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return wc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(wc),this}intersectObject(t,e=!0,i=[]){return aa(t,this,i,e),i.sort(Tc),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)aa(t[s],this,i,e);return i.sort(Tc),i}}function Tc(n,t){return n.distance-t.distance}function aa(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)aa(r[o],t,e,!0)}}function bc(n,t,e,i){const s=cf(i);switch(e){case dl:return n*t;case ml:return n*t;case gl:return n*t*2;case Ma:return n*t/s.components*s.byteLength;case ya:return n*t/s.components*s.byteLength;case _l:return n*t*2/s.components*s.byteLength;case Sa:return n*t*2/s.components*s.byteLength;case pl:return n*t*3/s.components*s.byteLength;case hn:return n*t*4/s.components*s.byteLength;case Ea:return n*t*4/s.components*s.byteLength;case hr:case ur:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case fr:case dr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case No:case Oo:return Math.max(n,16)*Math.max(t,8)/4;case Uo:case Fo:return Math.max(n,8)*Math.max(t,8)/2;case zo:case Bo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ko:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ho:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Go:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Vo:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Wo:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Xo:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case qo:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Yo:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case $o:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Zo:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ko:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Jo:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case jo:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Qo:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case ta:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case pr:case ea:case na:return Math.ceil(n/4)*Math.ceil(t/4)*16;case xl:case ia:return Math.ceil(n/4)*Math.ceil(t/4)*8;case sa:case ra:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function cf(n){switch(n){case Nn:case hl:return{byteLength:1,components:1};case vs:case ul:case Cs:return{byteLength:2,components:1};case xa:case va:return{byteLength:2,components:4};case vi:case _a:case xn:return{byteLength:4,components:1};case fl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ma}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ma);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Fl(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function lf(n){const t=new WeakMap;function e(a,c){const h=a.array,l=a.usage,u=h.byteLength,p=n.createBuffer();n.bindBuffer(c,p),n.bufferData(c,h,l),a.onUploadCallback();let d;if(h instanceof Float32Array)d=n.FLOAT;else if(h instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)d=n.SHORT;else if(h instanceof Uint32Array)d=n.UNSIGNED_INT;else if(h instanceof Int32Array)d=n.INT;else if(h instanceof Int8Array)d=n.BYTE;else if(h instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:p,type:d,bytesPerElement:h.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,h){const l=c.array,u=c.updateRanges;if(n.bindBuffer(h,a),u.length===0)n.bufferSubData(h,0,l);else{u.sort((d,_)=>d.start-_.start);let p=0;for(let d=1;d<u.length;d++){const _=u[p],x=u[d];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++p,u[p]=x)}u.length=p+1;for(let d=0,_=u.length;d<_;d++){const x=u[d];n.bufferSubData(h,x.start*l.BYTES_PER_ELEMENT,l,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const l=t.get(a);(!l||l.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const h=t.get(a);if(h===void 0)t.set(a,e(a,c));else if(h.version<a.version){if(h.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(h.buffer,a,c),h.version=a.version}}return{get:s,remove:r,update:o}}var hf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ff=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,df=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,_f=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,vf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Mf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ef=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,wf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Tf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,bf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Af=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Pf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Lf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Df=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,If=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Uf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Nf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ff=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Of=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,kf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Hf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Vf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Wf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Xf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Yf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$f=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Kf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Qf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,td=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ed=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,nd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,id=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,od=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ad=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,cd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ld=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,hd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ud=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,md=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,gd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_d=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,vd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Md=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Sd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ed=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Td=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,bd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ad=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Cd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Rd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ld=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Dd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Id=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ud=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Nd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Fd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Od=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Bd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Hd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Gd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Vd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Wd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Xd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,qd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Yd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,$d=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Zd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Kd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Jd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Qd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ep=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,np=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ip=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,sp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,rp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,op=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ap=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,cp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,up=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,gp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,_p=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,xp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Mp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ep=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,wp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ap=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Cp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Pp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Lp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ip=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Up=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Np=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Op=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,zp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Hp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Gp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ot={alphahash_fragment:hf,alphahash_pars_fragment:uf,alphamap_fragment:ff,alphamap_pars_fragment:df,alphatest_fragment:pf,alphatest_pars_fragment:mf,aomap_fragment:gf,aomap_pars_fragment:_f,batching_pars_vertex:xf,batching_vertex:vf,begin_vertex:Mf,beginnormal_vertex:yf,bsdfs:Sf,iridescence_fragment:Ef,bumpmap_pars_fragment:wf,clipping_planes_fragment:Tf,clipping_planes_pars_fragment:bf,clipping_planes_pars_vertex:Af,clipping_planes_vertex:Cf,color_fragment:Rf,color_pars_fragment:Pf,color_pars_vertex:Lf,color_vertex:Df,common:If,cube_uv_reflection_fragment:Uf,defaultnormal_vertex:Nf,displacementmap_pars_vertex:Ff,displacementmap_vertex:Of,emissivemap_fragment:zf,emissivemap_pars_fragment:Bf,colorspace_fragment:kf,colorspace_pars_fragment:Hf,envmap_fragment:Gf,envmap_common_pars_fragment:Vf,envmap_pars_fragment:Wf,envmap_pars_vertex:Xf,envmap_physical_pars_fragment:nd,envmap_vertex:qf,fog_vertex:Yf,fog_pars_vertex:$f,fog_fragment:Zf,fog_pars_fragment:Kf,gradientmap_pars_fragment:Jf,lightmap_pars_fragment:jf,lights_lambert_fragment:Qf,lights_lambert_pars_fragment:td,lights_pars_begin:ed,lights_toon_fragment:id,lights_toon_pars_fragment:sd,lights_phong_fragment:rd,lights_phong_pars_fragment:od,lights_physical_fragment:ad,lights_physical_pars_fragment:cd,lights_fragment_begin:ld,lights_fragment_maps:hd,lights_fragment_end:ud,logdepthbuf_fragment:fd,logdepthbuf_pars_fragment:dd,logdepthbuf_pars_vertex:pd,logdepthbuf_vertex:md,map_fragment:gd,map_pars_fragment:_d,map_particle_fragment:xd,map_particle_pars_fragment:vd,metalnessmap_fragment:Md,metalnessmap_pars_fragment:yd,morphinstance_vertex:Sd,morphcolor_vertex:Ed,morphnormal_vertex:wd,morphtarget_pars_vertex:Td,morphtarget_vertex:bd,normal_fragment_begin:Ad,normal_fragment_maps:Cd,normal_pars_fragment:Rd,normal_pars_vertex:Pd,normal_vertex:Ld,normalmap_pars_fragment:Dd,clearcoat_normal_fragment_begin:Id,clearcoat_normal_fragment_maps:Ud,clearcoat_pars_fragment:Nd,iridescence_pars_fragment:Fd,opaque_fragment:Od,packing:zd,premultiplied_alpha_fragment:Bd,project_vertex:kd,dithering_fragment:Hd,dithering_pars_fragment:Gd,roughnessmap_fragment:Vd,roughnessmap_pars_fragment:Wd,shadowmap_pars_fragment:Xd,shadowmap_pars_vertex:qd,shadowmap_vertex:Yd,shadowmask_pars_fragment:$d,skinbase_vertex:Zd,skinning_pars_vertex:Kd,skinning_vertex:Jd,skinnormal_vertex:jd,specularmap_fragment:Qd,specularmap_pars_fragment:tp,tonemapping_fragment:ep,tonemapping_pars_fragment:np,transmission_fragment:ip,transmission_pars_fragment:sp,uv_pars_fragment:rp,uv_pars_vertex:op,uv_vertex:ap,worldpos_vertex:cp,background_vert:lp,background_frag:hp,backgroundCube_vert:up,backgroundCube_frag:fp,cube_vert:dp,cube_frag:pp,depth_vert:mp,depth_frag:gp,distanceRGBA_vert:_p,distanceRGBA_frag:xp,equirect_vert:vp,equirect_frag:Mp,linedashed_vert:yp,linedashed_frag:Sp,meshbasic_vert:Ep,meshbasic_frag:wp,meshlambert_vert:Tp,meshlambert_frag:bp,meshmatcap_vert:Ap,meshmatcap_frag:Cp,meshnormal_vert:Rp,meshnormal_frag:Pp,meshphong_vert:Lp,meshphong_frag:Dp,meshphysical_vert:Ip,meshphysical_frag:Up,meshtoon_vert:Np,meshtoon_frag:Fp,points_vert:Op,points_frag:zp,shadow_vert:Bp,shadow_frag:kp,sprite_vert:Hp,sprite_frag:Gp},rt={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},mn={basic:{uniforms:ze([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:ze([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:ze([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:ze([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:ze([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:ze([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:ze([rt.points,rt.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:ze([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:ze([rt.common,rt.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:ze([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:ze([rt.sprite,rt.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:Ot.backgroundCube_vert,fragmentShader:Ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:ze([rt.common,rt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:ze([rt.lights,rt.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};mn.physical={uniforms:ze([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};const rr={r:0,b:0,g:0},ci=new yn,Vp=new ce;function Wp(n,t,e,i,s,r,o){const a=new Wt(0);let c=r===!0?0:1,h,l,u=null,p=0,d=null;function _(w){let M=w.isScene===!0?w.background:null;return M&&M.isTexture&&(M=(w.backgroundBlurriness>0?e:t).get(M)),M}function x(w){let M=!1;const P=_(w);P===null?f(a,c):P&&P.isColor&&(f(P,1),M=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||M)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(w,M){const P=_(M);P&&(P.isCubeTexture||P.mapping===Ar)?(l===void 0&&(l=new W(new ne(1,1,1),new Jn({name:"BackgroundCubeMaterial",uniforms:Ji(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Ge,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,b,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(l)),ci.copy(M.backgroundRotation),ci.x*=-1,ci.y*=-1,ci.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(ci.y*=-1,ci.z*=-1),l.material.uniforms.envMap.value=P,l.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Vp.makeRotationFromEuler(ci)),l.material.toneMapped=te.getTransfer(P.colorSpace)!==oe,(u!==P||p!==P.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=P,p=P.version,d=n.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null)):P&&P.isTexture&&(h===void 0&&(h=new W(new $n(2,2),new Jn({name:"BackgroundMaterial",uniforms:Ji(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=P,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.toneMapped=te.getTransfer(P.colorSpace)!==oe,P.matrixAutoUpdate===!0&&P.updateMatrix(),h.material.uniforms.uvTransform.value.copy(P.matrix),(u!==P||p!==P.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=P,p=P.version,d=n.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null))}function f(w,M){w.getRGB(rr,Al(n)),i.buffers.color.setClear(rr.r,rr.g,rr.b,M,o)}function E(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,M=1){a.set(w),c=M,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(w){c=w,f(a,c)},render:x,addToRenderList:m,dispose:E}}function Xp(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=p(null);let r=s,o=!1;function a(v,L,k,O,Y){let K=!1;const q=u(O,k,L);r!==q&&(r=q,h(r.object)),K=d(v,O,k,Y),K&&_(v,O,k,Y),Y!==null&&t.update(Y,n.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,M(v,L,k,O),Y!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function c(){return n.createVertexArray()}function h(v){return n.bindVertexArray(v)}function l(v){return n.deleteVertexArray(v)}function u(v,L,k){const O=k.wireframe===!0;let Y=i[v.id];Y===void 0&&(Y={},i[v.id]=Y);let K=Y[L.id];K===void 0&&(K={},Y[L.id]=K);let q=K[O];return q===void 0&&(q=p(c()),K[O]=q),q}function p(v){const L=[],k=[],O=[];for(let Y=0;Y<e;Y++)L[Y]=0,k[Y]=0,O[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:k,attributeDivisors:O,object:v,attributes:{},index:null}}function d(v,L,k,O){const Y=r.attributes,K=L.attributes;let q=0;const j=k.getAttributes();for(const V in j)if(j[V].location>=0){const dt=Y[V];let Et=K[V];if(Et===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(Et=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(Et=v.instanceColor)),dt===void 0||dt.attribute!==Et||Et&&dt.data!==Et.data)return!0;q++}return r.attributesNum!==q||r.index!==O}function _(v,L,k,O){const Y={},K=L.attributes;let q=0;const j=k.getAttributes();for(const V in j)if(j[V].location>=0){let dt=K[V];dt===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(dt=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(dt=v.instanceColor));const Et={};Et.attribute=dt,dt&&dt.data&&(Et.data=dt.data),Y[V]=Et,q++}r.attributes=Y,r.attributesNum=q,r.index=O}function x(){const v=r.newAttributes;for(let L=0,k=v.length;L<k;L++)v[L]=0}function m(v){f(v,0)}function f(v,L){const k=r.newAttributes,O=r.enabledAttributes,Y=r.attributeDivisors;k[v]=1,O[v]===0&&(n.enableVertexAttribArray(v),O[v]=1),Y[v]!==L&&(n.vertexAttribDivisor(v,L),Y[v]=L)}function E(){const v=r.newAttributes,L=r.enabledAttributes;for(let k=0,O=L.length;k<O;k++)L[k]!==v[k]&&(n.disableVertexAttribArray(k),L[k]=0)}function w(v,L,k,O,Y,K,q){q===!0?n.vertexAttribIPointer(v,L,k,Y,K):n.vertexAttribPointer(v,L,k,O,Y,K)}function M(v,L,k,O){x();const Y=O.attributes,K=k.getAttributes(),q=L.defaultAttributeValues;for(const j in K){const V=K[j];if(V.location>=0){let st=Y[j];if(st===void 0&&(j==="instanceMatrix"&&v.instanceMatrix&&(st=v.instanceMatrix),j==="instanceColor"&&v.instanceColor&&(st=v.instanceColor)),st!==void 0){const dt=st.normalized,Et=st.itemSize,zt=t.get(st);if(zt===void 0)continue;const ee=zt.buffer,$=zt.type,et=zt.bytesPerElement,_t=$===n.INT||$===n.UNSIGNED_INT||st.gpuType===_a;if(st.isInterleavedBufferAttribute){const nt=st.data,wt=nt.stride,Xt=st.offset;if(nt.isInstancedInterleavedBuffer){for(let Rt=0;Rt<V.locationSize;Rt++)f(V.location+Rt,nt.meshPerAttribute);v.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let Rt=0;Rt<V.locationSize;Rt++)m(V.location+Rt);n.bindBuffer(n.ARRAY_BUFFER,ee);for(let Rt=0;Rt<V.locationSize;Rt++)w(V.location+Rt,Et/V.locationSize,$,dt,wt*et,(Xt+Et/V.locationSize*Rt)*et,_t)}else{if(st.isInstancedBufferAttribute){for(let nt=0;nt<V.locationSize;nt++)f(V.location+nt,st.meshPerAttribute);v.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let nt=0;nt<V.locationSize;nt++)m(V.location+nt);n.bindBuffer(n.ARRAY_BUFFER,ee);for(let nt=0;nt<V.locationSize;nt++)w(V.location+nt,Et/V.locationSize,$,dt,Et*et,Et/V.locationSize*nt*et,_t)}}else if(q!==void 0){const dt=q[j];if(dt!==void 0)switch(dt.length){case 2:n.vertexAttrib2fv(V.location,dt);break;case 3:n.vertexAttrib3fv(V.location,dt);break;case 4:n.vertexAttrib4fv(V.location,dt);break;default:n.vertexAttrib1fv(V.location,dt)}}}}E()}function P(){C();for(const v in i){const L=i[v];for(const k in L){const O=L[k];for(const Y in O)l(O[Y].object),delete O[Y];delete L[k]}delete i[v]}}function A(v){if(i[v.id]===void 0)return;const L=i[v.id];for(const k in L){const O=L[k];for(const Y in O)l(O[Y].object),delete O[Y];delete L[k]}delete i[v.id]}function b(v){for(const L in i){const k=i[L];if(k[v.id]===void 0)continue;const O=k[v.id];for(const Y in O)l(O[Y].object),delete O[Y];delete k[v.id]}}function C(){S(),o=!0,r!==s&&(r=s,h(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:S,dispose:P,releaseStatesOfGeometry:A,releaseStatesOfProgram:b,initAttributes:x,enableAttribute:m,disableUnusedAttributes:E}}function qp(n,t,e){let i;function s(h){i=h}function r(h,l){n.drawArrays(i,h,l),e.update(l,i,1)}function o(h,l,u){u!==0&&(n.drawArraysInstanced(i,h,l,u),e.update(l,i,u))}function a(h,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,l,0,u);let d=0;for(let _=0;_<u;_++)d+=l[_];e.update(d,i,1)}function c(h,l,u,p){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let _=0;_<h.length;_++)o(h[_],l[_],p[_]);else{d.multiDrawArraysInstancedWEBGL(i,h,0,l,0,p,0,u);let _=0;for(let x=0;x<u;x++)_+=l[x]*p[x];e.update(_,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Yp(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(b){return!(b!==hn&&i.convert(b)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){const C=b===Cs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==Nn&&i.convert(b)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==xn&&!C)}function c(b){if(b==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const l=c(h);l!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",l,"instead."),h=l);const u=e.logarithmicDepthBuffer===!0,p=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=_>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:h,logarithmicDepthBuffer:u,reverseDepthBuffer:p,maxTextures:d,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:E,maxVaryings:w,maxFragmentUniforms:M,vertexTextures:P,maxSamples:A}}function $p(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new Vn,a=new Nt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){const d=u.length!==0||p||i!==0||s;return s=p,i=u.length,d},this.beginShadows=function(){r=!0,l(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,p){e=l(u,p,0)},this.setState=function(u,p,d){const _=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,f=n.get(u);if(!s||_===null||_.length===0||r&&!m)r?l(null):h();else{const E=r?0:i,w=E*4;let M=f.clippingState||null;c.value=M,M=l(_,p,w,d);for(let P=0;P!==w;++P)M[P]=e[P];f.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=E}};function h(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function l(u,p,d,_){const x=u!==null?u.length:0;let m=null;if(x!==0){if(m=c.value,_!==!0||m===null){const f=d+x*4,E=p.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<f)&&(m=new Float32Array(f));for(let w=0,M=d;w!==x;++w,M+=4)o.copy(u[w]).applyMatrix4(E,a),o.normal.toArray(m,M),m[M+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function Zp(n){let t=new WeakMap;function e(o,a){return a===Lo?o.mapping=$i:a===Do&&(o.mapping=Zi),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Lo||a===Do)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const h=new Pu(c.height);return h.fromEquirectangularTexture(n,o),t.set(o,h),o.addEventListener("dispose",s),e(h.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}const ki=4,Ac=[.125,.215,.35,.446,.526,.582],di=20,ho=new Nl,Cc=new Wt;let uo=null,fo=0,po=0,mo=!1;const ui=(1+Math.sqrt(5))/2,Bi=1/ui,Rc=[new D(-ui,Bi,0),new D(ui,Bi,0),new D(-Bi,0,ui),new D(Bi,0,ui),new D(0,ui,-Bi),new D(0,ui,Bi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Kp=new D;class Pc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=Kp}=r;uo=this._renderer.getRenderTarget(),fo=this._renderer.getActiveCubeFace(),po=this._renderer.getActiveMipmapLevel(),mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ic(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(uo,fo,po),this._renderer.xr.enabled=mo,t.scissorTest=!1,or(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===$i||t.mapping===Zi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),uo=this._renderer.getRenderTarget(),fo=this._renderer.getActiveCubeFace(),po=this._renderer.getActiveMipmapLevel(),mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:Cs,format:hn,colorSpace:Ki,depthBuffer:!1},s=Lc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Lc(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Jp(r)),this._blurMaterial=jp(r,t,e)}return s}_compileMaterial(t){const e=new W(this._lodPlanes[0],t);this._renderer.compile(e,ho)}_sceneToCubeUV(t,e,i,s,r){const c=new nn(90,1,e,i),h=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,p=u.autoClear,d=u.toneMapping;u.getClearColor(Cc),u.toneMapping=qn,u.autoClear=!1;const _=new Fe({name:"PMREM.Background",side:Ge,depthWrite:!1,depthTest:!1}),x=new W(new ne,_);let m=!1;const f=t.background;f?f.isColor&&(_.color.copy(f),t.background=null,m=!0):(_.color.copy(Cc),m=!0);for(let E=0;E<6;E++){const w=E%3;w===0?(c.up.set(0,h[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+l[E],r.y,r.z)):w===1?(c.up.set(0,0,h[E]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+l[E],r.z)):(c.up.set(0,h[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+l[E]));const M=this._cubeSize;or(s,w*M,E>2?M:0,M,M),u.setRenderTarget(s),m&&u.render(x,c),u.render(t,c)}x.geometry.dispose(),x.material.dispose(),u.toneMapping=d,u.autoClear=p,t.background=f}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===$i||t.mapping===Zi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ic()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new W(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;or(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,ho)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Rc[(s-r-1)%Rc.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const c=this._renderer,h=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const l=3,u=new W(this._lodPlanes[s],h),p=h.uniforms,d=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*di-1),x=r/_,m=isFinite(r)?1+Math.floor(l*x):di;m>di&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${di}`);const f=[];let E=0;for(let b=0;b<di;++b){const C=b/x,S=Math.exp(-C*C/2);f.push(S),b===0?E+=S:b<m&&(E+=2*S)}for(let b=0;b<f.length;b++)f[b]=f[b]/E;p.envMap.value=t.texture,p.samples.value=m,p.weights.value=f,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:w}=this;p.dTheta.value=_,p.mipInt.value=w-i;const M=this._sizeLods[s],P=3*M*(s>w-ki?s-w+ki:0),A=4*(this._cubeSize-M);or(e,P,A,3*M,2*M),c.setRenderTarget(e),c.render(u,ho)}}function Jp(n){const t=[],e=[],i=[];let s=n;const r=n-ki+1+Ac.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>n-ki?c=Ac[o-n+ki-1]:o===0&&(c=0),i.push(c);const h=1/(a-2),l=-h,u=1+h,p=[l,l,u,l,u,u,l,l,u,u,l,u],d=6,_=6,x=3,m=2,f=1,E=new Float32Array(x*_*d),w=new Float32Array(m*_*d),M=new Float32Array(f*_*d);for(let A=0;A<d;A++){const b=A%3*2/3-1,C=A>2?0:-1,S=[b,C,0,b+2/3,C,0,b+2/3,C+1,0,b,C,0,b+2/3,C+1,0,b,C+1,0];E.set(S,x*_*A),w.set(p,m*_*A);const v=[A,A,A,A,A,A];M.set(v,f*_*A)}const P=new We;P.setAttribute("position",new un(E,x)),P.setAttribute("uv",new un(w,m)),P.setAttribute("faceIndex",new un(M,f)),t.push(P),s>ki&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Lc(n,t,e){const i=new Mi(n,t,e);return i.texture.mapping=Ar,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function or(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function jp(n,t,e){const i=new Float32Array(di),s=new D(0,1,0);return new Jn({name:"SphericalGaussianBlur",defines:{n:di,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ia(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Dc(){return new Jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ia(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Ic(){return new Jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ia(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Ia(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Qp(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const c=a.mapping,h=c===Lo||c===Do,l=c===$i||c===Zi;if(h||l){let u=t.get(a);const p=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return e===null&&(e=new Pc(n)),u=h?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return h&&d&&d.height>0||l&&d&&s(d)?(e===null&&(e=new Pc(n)),u=h?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const h=6;for(let l=0;l<h;l++)a[l]!==void 0&&c++;return c===h}function r(a){const c=a.target;c.removeEventListener("dispose",r);const h=t.get(c);h!==void 0&&(t.delete(c),h.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function tm(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&mr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function em(n,t,e,i){const s={},r=new WeakMap;function o(u){const p=u.target;p.index!==null&&t.remove(p.index);for(const _ in p.attributes)t.remove(p.attributes[_]);p.removeEventListener("dispose",o),delete s[p.id];const d=r.get(p);d&&(t.remove(d),r.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function a(u,p){return s[p.id]===!0||(p.addEventListener("dispose",o),s[p.id]=!0,e.memory.geometries++),p}function c(u){const p=u.attributes;for(const d in p)t.update(p[d],n.ARRAY_BUFFER)}function h(u){const p=[],d=u.index,_=u.attributes.position;let x=0;if(d!==null){const E=d.array;x=d.version;for(let w=0,M=E.length;w<M;w+=3){const P=E[w+0],A=E[w+1],b=E[w+2];p.push(P,A,A,b,b,P)}}else if(_!==void 0){const E=_.array;x=_.version;for(let w=0,M=E.length/3-1;w<M;w+=3){const P=w+0,A=w+1,b=w+2;p.push(P,A,A,b,b,P)}}else return;const m=new(yl(p)?bl:Tl)(p,1);m.version=x;const f=r.get(u);f&&t.remove(f),r.set(u,m)}function l(u){const p=r.get(u);if(p){const d=u.index;d!==null&&p.version<d.version&&h(u)}else h(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:l}}function nm(n,t,e){let i;function s(p){i=p}let r,o;function a(p){r=p.type,o=p.bytesPerElement}function c(p,d){n.drawElements(i,d,r,p*o),e.update(d,i,1)}function h(p,d,_){_!==0&&(n.drawElementsInstanced(i,d,r,p*o,_),e.update(d,i,_))}function l(p,d,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,p,0,_);let m=0;for(let f=0;f<_;f++)m+=d[f];e.update(m,i,1)}function u(p,d,_,x){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<p.length;f++)h(p[f]/o,d[f],x[f]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,r,p,0,x,0,_);let f=0;for(let E=0;E<_;E++)f+=d[E]*x[E];e.update(f,i,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=h,this.renderMultiDraw=l,this.renderMultiDrawInstances=u}function im(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function sm(n,t,e){const i=new WeakMap,s=new Se;function r(o,a,c){const h=o.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=l!==void 0?l.length:0;let p=i.get(a);if(p===void 0||p.count!==u){let v=function(){C.dispose(),i.delete(a),a.removeEventListener("dispose",v)};var d=v;p!==void 0&&p.texture.dispose();const _=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],w=a.morphAttributes.color||[];let M=0;_===!0&&(M=1),x===!0&&(M=2),m===!0&&(M=3);let P=a.attributes.position.count*M,A=1;P>t.maxTextureSize&&(A=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const b=new Float32Array(P*A*4*u),C=new Sl(b,P,A,u);C.type=xn,C.needsUpdate=!0;const S=M*4;for(let L=0;L<u;L++){const k=f[L],O=E[L],Y=w[L],K=P*A*4*L;for(let q=0;q<k.count;q++){const j=q*S;_===!0&&(s.fromBufferAttribute(k,q),b[K+j+0]=s.x,b[K+j+1]=s.y,b[K+j+2]=s.z,b[K+j+3]=0),x===!0&&(s.fromBufferAttribute(O,q),b[K+j+4]=s.x,b[K+j+5]=s.y,b[K+j+6]=s.z,b[K+j+7]=0),m===!0&&(s.fromBufferAttribute(Y,q),b[K+j+8]=s.x,b[K+j+9]=s.y,b[K+j+10]=s.z,b[K+j+11]=Y.itemSize===4?s.w:1)}}p={count:u,texture:C,size:new gt(P,A)},i.set(a,p),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let _=0;for(let m=0;m<h.length;m++)_+=h[m];const x=a.morphTargetsRelative?1:1-_;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",h)}c.getUniforms().setValue(n,"morphTargetsTexture",p.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}return{update:r}}function rm(n,t,e,i){let s=new WeakMap;function r(c){const h=i.render.frame,l=c.geometry,u=t.get(c,l);if(s.get(u)!==h&&(t.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==h&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==h&&(p.update(),s.set(p,h))}return u}function o(){s=new WeakMap}function a(c){const h=c.target;h.removeEventListener("dispose",a),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:r,dispose:o}}const Ol=new Ne,Uc=new Pl(1,1),zl=new Sl,Bl=new du,kl=new Rl,Nc=[],Fc=[],Oc=new Float32Array(16),zc=new Float32Array(9),Bc=new Float32Array(4);function es(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Nc[s];if(r===void 0&&(r=new Float32Array(s),Nc[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Te(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function be(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Cr(n,t){let e=Fc[t];e===void 0&&(e=new Int32Array(t),Fc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function om(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function am(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;n.uniform2fv(this.addr,t),be(e,t)}}function cm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;n.uniform3fv(this.addr,t),be(e,t)}}function lm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;n.uniform4fv(this.addr,t),be(e,t)}}function hm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Te(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(Te(e,i))return;Bc.set(i),n.uniformMatrix2fv(this.addr,!1,Bc),be(e,i)}}function um(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Te(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(Te(e,i))return;zc.set(i),n.uniformMatrix3fv(this.addr,!1,zc),be(e,i)}}function fm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Te(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(Te(e,i))return;Oc.set(i),n.uniformMatrix4fv(this.addr,!1,Oc),be(e,i)}}function dm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function pm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;n.uniform2iv(this.addr,t),be(e,t)}}function mm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;n.uniform3iv(this.addr,t),be(e,t)}}function gm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;n.uniform4iv(this.addr,t),be(e,t)}}function _m(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function xm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;n.uniform2uiv(this.addr,t),be(e,t)}}function vm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;n.uniform3uiv(this.addr,t),be(e,t)}}function Mm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;n.uniform4uiv(this.addr,t),be(e,t)}}function ym(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Uc.compareFunction=Ml,r=Uc):r=Ol,e.setTexture2D(t||r,s)}function Sm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Bl,s)}function Em(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||kl,s)}function wm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||zl,s)}function Tm(n){switch(n){case 5126:return om;case 35664:return am;case 35665:return cm;case 35666:return lm;case 35674:return hm;case 35675:return um;case 35676:return fm;case 5124:case 35670:return dm;case 35667:case 35671:return pm;case 35668:case 35672:return mm;case 35669:case 35673:return gm;case 5125:return _m;case 36294:return xm;case 36295:return vm;case 36296:return Mm;case 35678:case 36198:case 36298:case 36306:case 35682:return ym;case 35679:case 36299:case 36307:return Sm;case 35680:case 36300:case 36308:case 36293:return Em;case 36289:case 36303:case 36311:case 36292:return wm}}function bm(n,t){n.uniform1fv(this.addr,t)}function Am(n,t){const e=es(t,this.size,2);n.uniform2fv(this.addr,e)}function Cm(n,t){const e=es(t,this.size,3);n.uniform3fv(this.addr,e)}function Rm(n,t){const e=es(t,this.size,4);n.uniform4fv(this.addr,e)}function Pm(n,t){const e=es(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Lm(n,t){const e=es(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Dm(n,t){const e=es(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Im(n,t){n.uniform1iv(this.addr,t)}function Um(n,t){n.uniform2iv(this.addr,t)}function Nm(n,t){n.uniform3iv(this.addr,t)}function Fm(n,t){n.uniform4iv(this.addr,t)}function Om(n,t){n.uniform1uiv(this.addr,t)}function zm(n,t){n.uniform2uiv(this.addr,t)}function Bm(n,t){n.uniform3uiv(this.addr,t)}function km(n,t){n.uniform4uiv(this.addr,t)}function Hm(n,t,e){const i=this.cache,s=t.length,r=Cr(e,s);Te(i,r)||(n.uniform1iv(this.addr,r),be(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Ol,r[o])}function Gm(n,t,e){const i=this.cache,s=t.length,r=Cr(e,s);Te(i,r)||(n.uniform1iv(this.addr,r),be(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Bl,r[o])}function Vm(n,t,e){const i=this.cache,s=t.length,r=Cr(e,s);Te(i,r)||(n.uniform1iv(this.addr,r),be(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||kl,r[o])}function Wm(n,t,e){const i=this.cache,s=t.length,r=Cr(e,s);Te(i,r)||(n.uniform1iv(this.addr,r),be(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||zl,r[o])}function Xm(n){switch(n){case 5126:return bm;case 35664:return Am;case 35665:return Cm;case 35666:return Rm;case 35674:return Pm;case 35675:return Lm;case 35676:return Dm;case 5124:case 35670:return Im;case 35667:case 35671:return Um;case 35668:case 35672:return Nm;case 35669:case 35673:return Fm;case 5125:return Om;case 36294:return zm;case 36295:return Bm;case 36296:return km;case 35678:case 36198:case 36298:case 36306:case 35682:return Hm;case 35679:case 36299:case 36307:return Gm;case 35680:case 36300:case 36308:case 36293:return Vm;case 36289:case 36303:case 36311:case 36292:return Wm}}class qm{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Tm(e.type)}}class Ym{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Xm(e.type)}}class $m{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const go=/(\w+)(\])?(\[|\.)?/g;function kc(n,t){n.seq.push(t),n.map[t.id]=t}function Zm(n,t,e){const i=n.name,s=i.length;for(go.lastIndex=0;;){const r=go.exec(i),o=go.lastIndex;let a=r[1];const c=r[2]==="]",h=r[3];if(c&&(a=a|0),h===void 0||h==="["&&o+2===s){kc(e,h===void 0?new qm(a,n,t):new Ym(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new $m(a),kc(e,u)),e=u}}}class gr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Zm(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Hc(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Km=37297;let Jm=0;function jm(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Gc=new Nt;function Qm(n){te._getMatrix(Gc,te.workingColorSpace,n);const t=`mat3( ${Gc.elements.map(e=>e.toFixed(4))} )`;switch(te.getTransfer(n)){case vr:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Vc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+jm(n.getShaderSource(t),o)}else return s}function t0(n,t){const e=Qm(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function e0(n,t){let e;switch(t){case Bh:e="Linear";break;case kh:e="Reinhard";break;case Hh:e="Cineon";break;case Gh:e="ACESFilmic";break;case Wh:e="AgX";break;case Xh:e="Neutral";break;case Vh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ar=new D;function n0(){te.getLuminanceCoefficients(ar);const n=ar.x.toFixed(4),t=ar.y.toFixed(4),e=ar.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function i0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ms).join(`
`)}function s0(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function r0(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function ms(n){return n!==""}function Wc(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Xc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const o0=/^[ \t]*#include +<([\w\d./]+)>/gm;function ca(n){return n.replace(o0,c0)}const a0=new Map;function c0(n,t){let e=Ot[t];if(e===void 0){const i=a0.get(t);if(i!==void 0)e=Ot[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return ca(e)}const l0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qc(n){return n.replace(l0,h0)}function h0(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Yc(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function u0(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===ga?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===xh?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Ln&&(t="SHADOWMAP_TYPE_VSM"),t}function f0(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case $i:case Zi:t="ENVMAP_TYPE_CUBE";break;case Ar:t="ENVMAP_TYPE_CUBE_UV";break}return t}function d0(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Zi:t="ENVMAP_MODE_REFRACTION";break}return t}function p0(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case cl:t="ENVMAP_BLENDING_MULTIPLY";break;case Oh:t="ENVMAP_BLENDING_MIX";break;case zh:t="ENVMAP_BLENDING_ADD";break}return t}function m0(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function g0(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=u0(e),h=f0(e),l=d0(e),u=p0(e),p=m0(e),d=i0(e),_=s0(r),x=s.createProgram();let m,f,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ms).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ms).join(`
`),f.length>0&&(f+=`
`)):(m=[Yc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ms).join(`
`),f=[Yc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==qn?"#define TONE_MAPPING":"",e.toneMapping!==qn?Ot.tonemapping_pars_fragment:"",e.toneMapping!==qn?e0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.colorspace_pars_fragment,t0("linearToOutputTexel",e.outputColorSpace),n0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ms).join(`
`)),o=ca(o),o=Wc(o,e),o=Xc(o,e),a=ca(a),a=Wc(a,e),a=Xc(a,e),o=qc(o),a=qc(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===ja?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ja?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const w=E+m+o,M=E+f+a,P=Hc(s,s.VERTEX_SHADER,w),A=Hc(s,s.FRAGMENT_SHADER,M);s.attachShader(x,P),s.attachShader(x,A),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function b(L){if(n.debug.checkShaderErrors){const k=s.getProgramInfoLog(x).trim(),O=s.getShaderInfoLog(P).trim(),Y=s.getShaderInfoLog(A).trim();let K=!0,q=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,P,A);else{const j=Vc(s,P,"vertex"),V=Vc(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+k+`
`+j+`
`+V)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(O===""||Y==="")&&(q=!1);q&&(L.diagnostics={runnable:K,programLog:k,vertexShader:{log:O,prefix:m},fragmentShader:{log:Y,prefix:f}})}s.deleteShader(P),s.deleteShader(A),C=new gr(s,x),S=r0(s,x)}let C;this.getUniforms=function(){return C===void 0&&b(this),C};let S;this.getAttributes=function(){return S===void 0&&b(this),S};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(x,Km)),v},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Jm++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=P,this.fragmentShader=A,this}let _0=0;class x0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new v0(t),e.set(t,i)),i}}class v0{constructor(t){this.id=_0++,this.code=t,this.usedTimes=0}}function M0(n,t,e,i,s,r,o){const a=new Ta,c=new x0,h=new Set,l=[],u=s.logarithmicDepthBuffer,p=s.vertexTextures;let d=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return h.add(S),S===0?"uv":`uv${S}`}function m(S,v,L,k,O){const Y=k.fog,K=O.geometry,q=S.isMeshStandardMaterial?k.environment:null,j=(S.isMeshStandardMaterial?e:t).get(S.envMap||q),V=j&&j.mapping===Ar?j.image.height:null,st=_[S.type];S.precision!==null&&(d=s.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const dt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Et=dt!==void 0?dt.length:0;let zt=0;K.morphAttributes.position!==void 0&&(zt=1),K.morphAttributes.normal!==void 0&&(zt=2),K.morphAttributes.color!==void 0&&(zt=3);let ee,$,et,_t;if(st){const re=mn[st];ee=re.vertexShader,$=re.fragmentShader}else ee=S.vertexShader,$=S.fragmentShader,c.update(S),et=c.getVertexShaderID(S),_t=c.getFragmentShaderID(S);const nt=n.getRenderTarget(),wt=n.state.buffers.depth.getReversed(),Xt=O.isInstancedMesh===!0,Rt=O.isBatchedMesh===!0,_e=!!S.map,me=!!S.matcap,Bt=!!j,R=!!S.aoMap,Ce=!!S.lightMap,kt=!!S.bumpMap,Ht=!!S.normalMap,Mt=!!S.displacementMap,he=!!S.emissiveMap,yt=!!S.metalnessMap,T=!!S.roughnessMap,g=S.anisotropy>0,I=S.clearcoat>0,z=S.dispersion>0,Z=S.iridescence>0,G=S.sheen>0,ot=S.transmission>0,it=g&&!!S.anisotropyMap,ft=I&&!!S.clearcoatMap,qt=I&&!!S.clearcoatNormalMap,Q=I&&!!S.clearcoatRoughnessMap,pt=Z&&!!S.iridescenceMap,Ct=Z&&!!S.iridescenceThicknessMap,Pt=G&&!!S.sheenColorMap,xt=G&&!!S.sheenRoughnessMap,Kt=!!S.specularMap,Ft=!!S.specularColorMap,de=!!S.specularIntensityMap,U=ot&&!!S.transmissionMap,ct=ot&&!!S.thicknessMap,X=!!S.gradientMap,J=!!S.alphaMap,ut=S.alphaTest>0,lt=!!S.alphaHash,Ut=!!S.extensions;let ve=qn;S.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(ve=n.toneMapping);const Le={shaderID:st,shaderType:S.type,shaderName:S.name,vertexShader:ee,fragmentShader:$,defines:S.defines,customVertexShaderID:et,customFragmentShaderID:_t,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:Rt,batchingColor:Rt&&O._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&O.instanceColor!==null,instancingMorph:Xt&&O.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:nt===null?n.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Ki,alphaToCoverage:!!S.alphaToCoverage,map:_e,matcap:me,envMap:Bt,envMapMode:Bt&&j.mapping,envMapCubeUVHeight:V,aoMap:R,lightMap:Ce,bumpMap:kt,normalMap:Ht,displacementMap:p&&Mt,emissiveMap:he,normalMapObjectSpace:Ht&&S.normalMapType===Zh,normalMapTangentSpace:Ht&&S.normalMapType===vl,metalnessMap:yt,roughnessMap:T,anisotropy:g,anisotropyMap:it,clearcoat:I,clearcoatMap:ft,clearcoatNormalMap:qt,clearcoatRoughnessMap:Q,dispersion:z,iridescence:Z,iridescenceMap:pt,iridescenceThicknessMap:Ct,sheen:G,sheenColorMap:Pt,sheenRoughnessMap:xt,specularMap:Kt,specularColorMap:Ft,specularIntensityMap:de,transmission:ot,transmissionMap:U,thicknessMap:ct,gradientMap:X,opaque:S.transparent===!1&&S.blending===Wi&&S.alphaToCoverage===!1,alphaMap:J,alphaTest:ut,alphaHash:lt,combine:S.combine,mapUv:_e&&x(S.map.channel),aoMapUv:R&&x(S.aoMap.channel),lightMapUv:Ce&&x(S.lightMap.channel),bumpMapUv:kt&&x(S.bumpMap.channel),normalMapUv:Ht&&x(S.normalMap.channel),displacementMapUv:Mt&&x(S.displacementMap.channel),emissiveMapUv:he&&x(S.emissiveMap.channel),metalnessMapUv:yt&&x(S.metalnessMap.channel),roughnessMapUv:T&&x(S.roughnessMap.channel),anisotropyMapUv:it&&x(S.anisotropyMap.channel),clearcoatMapUv:ft&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:qt&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:pt&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ct&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:Pt&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:xt&&x(S.sheenRoughnessMap.channel),specularMapUv:Kt&&x(S.specularMap.channel),specularColorMapUv:Ft&&x(S.specularColorMap.channel),specularIntensityMapUv:de&&x(S.specularIntensityMap.channel),transmissionMapUv:U&&x(S.transmissionMap.channel),thicknessMapUv:ct&&x(S.thicknessMap.channel),alphaMapUv:J&&x(S.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(Ht||g),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!K.attributes.uv&&(_e||J),fog:!!Y,useFog:S.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:wt,skinning:O.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:Et,morphTextureStride:zt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:ve,decodeVideoTexture:_e&&S.map.isVideoTexture===!0&&te.getTransfer(S.map.colorSpace)===oe,decodeVideoTextureEmissive:he&&S.emissiveMap.isVideoTexture===!0&&te.getTransfer(S.emissiveMap.colorSpace)===oe,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ue,flipSided:S.side===Ge,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ut&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&S.extensions.multiDraw===!0||Rt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Le.vertexUv1s=h.has(1),Le.vertexUv2s=h.has(2),Le.vertexUv3s=h.has(3),h.clear(),Le}function f(S){const v=[];if(S.shaderID?v.push(S.shaderID):(v.push(S.customVertexShaderID),v.push(S.customFragmentShaderID)),S.defines!==void 0)for(const L in S.defines)v.push(L),v.push(S.defines[L]);return S.isRawShaderMaterial===!1&&(E(v,S),w(v,S),v.push(n.outputColorSpace)),v.push(S.customProgramCacheKey),v.join()}function E(S,v){S.push(v.precision),S.push(v.outputColorSpace),S.push(v.envMapMode),S.push(v.envMapCubeUVHeight),S.push(v.mapUv),S.push(v.alphaMapUv),S.push(v.lightMapUv),S.push(v.aoMapUv),S.push(v.bumpMapUv),S.push(v.normalMapUv),S.push(v.displacementMapUv),S.push(v.emissiveMapUv),S.push(v.metalnessMapUv),S.push(v.roughnessMapUv),S.push(v.anisotropyMapUv),S.push(v.clearcoatMapUv),S.push(v.clearcoatNormalMapUv),S.push(v.clearcoatRoughnessMapUv),S.push(v.iridescenceMapUv),S.push(v.iridescenceThicknessMapUv),S.push(v.sheenColorMapUv),S.push(v.sheenRoughnessMapUv),S.push(v.specularMapUv),S.push(v.specularColorMapUv),S.push(v.specularIntensityMapUv),S.push(v.transmissionMapUv),S.push(v.thicknessMapUv),S.push(v.combine),S.push(v.fogExp2),S.push(v.sizeAttenuation),S.push(v.morphTargetsCount),S.push(v.morphAttributeCount),S.push(v.numDirLights),S.push(v.numPointLights),S.push(v.numSpotLights),S.push(v.numSpotLightMaps),S.push(v.numHemiLights),S.push(v.numRectAreaLights),S.push(v.numDirLightShadows),S.push(v.numPointLightShadows),S.push(v.numSpotLightShadows),S.push(v.numSpotLightShadowsWithMaps),S.push(v.numLightProbes),S.push(v.shadowMapType),S.push(v.toneMapping),S.push(v.numClippingPlanes),S.push(v.numClipIntersection),S.push(v.depthPacking)}function w(S,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),S.push(a.mask)}function M(S){const v=_[S.type];let L;if(v){const k=mn[v];L=bu.clone(k.uniforms)}else L=S.uniforms;return L}function P(S,v){let L;for(let k=0,O=l.length;k<O;k++){const Y=l[k];if(Y.cacheKey===v){L=Y,++L.usedTimes;break}}return L===void 0&&(L=new g0(n,v,S,r),l.push(L)),L}function A(S){if(--S.usedTimes===0){const v=l.indexOf(S);l[v]=l[l.length-1],l.pop(),S.destroy()}}function b(S){c.remove(S)}function C(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:M,acquireProgram:P,releaseProgram:A,releaseShaderCache:b,programs:l,dispose:C}}function y0(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function S0(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function $c(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Zc(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,p,d,_,x,m){let f=n[t];return f===void 0?(f={id:u.id,object:u,geometry:p,material:d,groupOrder:_,renderOrder:u.renderOrder,z:x,group:m},n[t]=f):(f.id=u.id,f.object=u,f.geometry=p,f.material=d,f.groupOrder=_,f.renderOrder=u.renderOrder,f.z=x,f.group=m),t++,f}function a(u,p,d,_,x,m){const f=o(u,p,d,_,x,m);d.transmission>0?i.push(f):d.transparent===!0?s.push(f):e.push(f)}function c(u,p,d,_,x,m){const f=o(u,p,d,_,x,m);d.transmission>0?i.unshift(f):d.transparent===!0?s.unshift(f):e.unshift(f)}function h(u,p){e.length>1&&e.sort(u||S0),i.length>1&&i.sort(p||$c),s.length>1&&s.sort(p||$c)}function l(){for(let u=t,p=n.length;u<p;u++){const d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:c,finish:l,sort:h}}function E0(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Zc,n.set(i,[o])):s>=r.length?(o=new Zc,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function w0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Wt};break;case"SpotLight":e={position:new D,direction:new D,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new D,halfWidth:new D,halfHeight:new D};break}return n[t.id]=e,e}}}function T0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let b0=0;function A0(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function C0(n){const t=new w0,e=T0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new D);const s=new D,r=new ce,o=new ce;function a(h){let l=0,u=0,p=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let d=0,_=0,x=0,m=0,f=0,E=0,w=0,M=0,P=0,A=0,b=0;h.sort(A0);for(let S=0,v=h.length;S<v;S++){const L=h[S],k=L.color,O=L.intensity,Y=L.distance,K=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)l+=k.r*O,u+=k.g*O,p+=k.b*O;else if(L.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(L.sh.coefficients[q],O);b++}else if(L.isDirectionalLight){const q=t.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const j=L.shadow,V=e.get(L);V.shadowIntensity=j.intensity,V.shadowBias=j.bias,V.shadowNormalBias=j.normalBias,V.shadowRadius=j.radius,V.shadowMapSize=j.mapSize,i.directionalShadow[d]=V,i.directionalShadowMap[d]=K,i.directionalShadowMatrix[d]=L.shadow.matrix,E++}i.directional[d]=q,d++}else if(L.isSpotLight){const q=t.get(L);q.position.setFromMatrixPosition(L.matrixWorld),q.color.copy(k).multiplyScalar(O),q.distance=Y,q.coneCos=Math.cos(L.angle),q.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),q.decay=L.decay,i.spot[x]=q;const j=L.shadow;if(L.map&&(i.spotLightMap[P]=L.map,P++,j.updateMatrices(L),L.castShadow&&A++),i.spotLightMatrix[x]=j.matrix,L.castShadow){const V=e.get(L);V.shadowIntensity=j.intensity,V.shadowBias=j.bias,V.shadowNormalBias=j.normalBias,V.shadowRadius=j.radius,V.shadowMapSize=j.mapSize,i.spotShadow[x]=V,i.spotShadowMap[x]=K,M++}x++}else if(L.isRectAreaLight){const q=t.get(L);q.color.copy(k).multiplyScalar(O),q.halfWidth.set(L.width*.5,0,0),q.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=q,m++}else if(L.isPointLight){const q=t.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),q.distance=L.distance,q.decay=L.decay,L.castShadow){const j=L.shadow,V=e.get(L);V.shadowIntensity=j.intensity,V.shadowBias=j.bias,V.shadowNormalBias=j.normalBias,V.shadowRadius=j.radius,V.shadowMapSize=j.mapSize,V.shadowCameraNear=j.camera.near,V.shadowCameraFar=j.camera.far,i.pointShadow[_]=V,i.pointShadowMap[_]=K,i.pointShadowMatrix[_]=L.shadow.matrix,w++}i.point[_]=q,_++}else if(L.isHemisphereLight){const q=t.get(L);q.skyColor.copy(L.color).multiplyScalar(O),q.groundColor.copy(L.groundColor).multiplyScalar(O),i.hemi[f]=q,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=rt.LTC_FLOAT_1,i.rectAreaLTC2=rt.LTC_FLOAT_2):(i.rectAreaLTC1=rt.LTC_HALF_1,i.rectAreaLTC2=rt.LTC_HALF_2)),i.ambient[0]=l,i.ambient[1]=u,i.ambient[2]=p;const C=i.hash;(C.directionalLength!==d||C.pointLength!==_||C.spotLength!==x||C.rectAreaLength!==m||C.hemiLength!==f||C.numDirectionalShadows!==E||C.numPointShadows!==w||C.numSpotShadows!==M||C.numSpotMaps!==P||C.numLightProbes!==b)&&(i.directional.length=d,i.spot.length=x,i.rectArea.length=m,i.point.length=_,i.hemi.length=f,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=M+P-A,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=b,C.directionalLength=d,C.pointLength=_,C.spotLength=x,C.rectAreaLength=m,C.hemiLength=f,C.numDirectionalShadows=E,C.numPointShadows=w,C.numSpotShadows=M,C.numSpotMaps=P,C.numLightProbes=b,i.version=b0++)}function c(h,l){let u=0,p=0,d=0,_=0,x=0;const m=l.matrixWorldInverse;for(let f=0,E=h.length;f<E;f++){const w=h[f];if(w.isDirectionalLight){const M=i.directional[u];M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(w.isSpotLight){const M=i.spot[d];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(w.isRectAreaLight){const M=i.rectArea[_];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(w.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(w.width*.5,0,0),M.halfHeight.set(0,w.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),_++}else if(w.isPointLight){const M=i.point[p];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),p++}else if(w.isHemisphereLight){const M=i.hemi[x];M.direction.setFromMatrixPosition(w.matrixWorld),M.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:i}}function Kc(n){const t=new C0(n),e=[],i=[];function s(l){h.camera=l,e.length=0,i.length=0}function r(l){e.push(l)}function o(l){i.push(l)}function a(){t.setup(e)}function c(l){t.setupView(e,l)}const h={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:h,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function R0(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Kc(n),t.set(s,[a])):r>=o.length?(a=new Kc(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const P0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,L0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function D0(n,t,e){let i=new Aa;const s=new gt,r=new gt,o=new Se,a=new ju({depthPacking:$h}),c=new Qu,h={},l=e.maxTextureSize,u={[Kn]:Ge,[Ge]:Kn,[Ue]:Ue},p=new Jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:P0,fragmentShader:L0}),d=p.clone();d.defines.HORIZONTAL_PASS=1;const _=new We;_.setAttribute("position",new un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new W(_,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ga;let f=this.type;this.render=function(A,b,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const S=n.getRenderTarget(),v=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),k=n.state;k.setBlending(Xn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const O=f!==Ln&&this.type===Ln,Y=f===Ln&&this.type!==Ln;for(let K=0,q=A.length;K<q;K++){const j=A[K],V=j.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const st=V.getFrameExtents();if(s.multiply(st),r.copy(V.mapSize),(s.x>l||s.y>l)&&(s.x>l&&(r.x=Math.floor(l/st.x),s.x=r.x*st.x,V.mapSize.x=r.x),s.y>l&&(r.y=Math.floor(l/st.y),s.y=r.y*st.y,V.mapSize.y=r.y)),V.map===null||O===!0||Y===!0){const Et=this.type!==Ln?{minFilter:Ke,magFilter:Ke}:{};V.map!==null&&V.map.dispose(),V.map=new Mi(s.x,s.y,Et),V.map.texture.name=j.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const dt=V.getViewportCount();for(let Et=0;Et<dt;Et++){const zt=V.getViewport(Et);o.set(r.x*zt.x,r.y*zt.y,r.x*zt.z,r.y*zt.w),k.viewport(o),V.updateMatrices(j,Et),i=V.getFrustum(),M(b,C,V.camera,j,this.type)}V.isPointLightShadow!==!0&&this.type===Ln&&E(V,C),V.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(S,v,L)};function E(A,b){const C=t.update(x);p.defines.VSM_SAMPLES!==A.blurSamples&&(p.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,p.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Mi(s.x,s.y)),p.uniforms.shadow_pass.value=A.map.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(b,null,C,p,x,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(b,null,C,d,x,null)}function w(A,b,C,S){let v=null;const L=C.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)v=L;else if(v=C.isPointLight===!0?c:a,n.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const k=v.uuid,O=b.uuid;let Y=h[k];Y===void 0&&(Y={},h[k]=Y);let K=Y[O];K===void 0&&(K=v.clone(),Y[O]=K,b.addEventListener("dispose",P)),v=K}if(v.visible=b.visible,v.wireframe=b.wireframe,S===Ln?v.side=b.shadowSide!==null?b.shadowSide:b.side:v.side=b.shadowSide!==null?b.shadowSide:u[b.side],v.alphaMap=b.alphaMap,v.alphaTest=b.alphaTest,v.map=b.map,v.clipShadows=b.clipShadows,v.clippingPlanes=b.clippingPlanes,v.clipIntersection=b.clipIntersection,v.displacementMap=b.displacementMap,v.displacementScale=b.displacementScale,v.displacementBias=b.displacementBias,v.wireframeLinewidth=b.wireframeLinewidth,v.linewidth=b.linewidth,C.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const k=n.properties.get(v);k.light=C}return v}function M(A,b,C,S,v){if(A.visible===!1)return;if(A.layers.test(b.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&v===Ln)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,A.matrixWorld);const O=t.update(A),Y=A.material;if(Array.isArray(Y)){const K=O.groups;for(let q=0,j=K.length;q<j;q++){const V=K[q],st=Y[V.materialIndex];if(st&&st.visible){const dt=w(A,st,S,v);A.onBeforeShadow(n,A,b,C,O,dt,V),n.renderBufferDirect(C,null,O,dt,A,V),A.onAfterShadow(n,A,b,C,O,dt,V)}}}else if(Y.visible){const K=w(A,Y,S,v);A.onBeforeShadow(n,A,b,C,O,K,null),n.renderBufferDirect(C,null,O,K,A,null),A.onAfterShadow(n,A,b,C,O,K,null)}}const k=A.children;for(let O=0,Y=k.length;O<Y;O++)M(k[O],b,C,S,v)}function P(A){A.target.removeEventListener("dispose",P);for(const C in h){const S=h[C],v=A.target.uuid;v in S&&(S[v].dispose(),delete S[v])}}}const I0={[wo]:To,[bo]:Ro,[Ao]:Po,[Yi]:Co,[To]:wo,[Ro]:bo,[Po]:Ao,[Co]:Yi};function U0(n,t){function e(){let U=!1;const ct=new Se;let X=null;const J=new Se(0,0,0,0);return{setMask:function(ut){X!==ut&&!U&&(n.colorMask(ut,ut,ut,ut),X=ut)},setLocked:function(ut){U=ut},setClear:function(ut,lt,Ut,ve,Le){Le===!0&&(ut*=ve,lt*=ve,Ut*=ve),ct.set(ut,lt,Ut,ve),J.equals(ct)===!1&&(n.clearColor(ut,lt,Ut,ve),J.copy(ct))},reset:function(){U=!1,X=null,J.set(-1,0,0,0)}}}function i(){let U=!1,ct=!1,X=null,J=null,ut=null;return{setReversed:function(lt){if(ct!==lt){const Ut=t.get("EXT_clip_control");lt?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT),ct=lt;const ve=ut;ut=null,this.setClear(ve)}},getReversed:function(){return ct},setTest:function(lt){lt?nt(n.DEPTH_TEST):wt(n.DEPTH_TEST)},setMask:function(lt){X!==lt&&!U&&(n.depthMask(lt),X=lt)},setFunc:function(lt){if(ct&&(lt=I0[lt]),J!==lt){switch(lt){case wo:n.depthFunc(n.NEVER);break;case To:n.depthFunc(n.ALWAYS);break;case bo:n.depthFunc(n.LESS);break;case Yi:n.depthFunc(n.LEQUAL);break;case Ao:n.depthFunc(n.EQUAL);break;case Co:n.depthFunc(n.GEQUAL);break;case Ro:n.depthFunc(n.GREATER);break;case Po:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}J=lt}},setLocked:function(lt){U=lt},setClear:function(lt){ut!==lt&&(ct&&(lt=1-lt),n.clearDepth(lt),ut=lt)},reset:function(){U=!1,X=null,J=null,ut=null,ct=!1}}}function s(){let U=!1,ct=null,X=null,J=null,ut=null,lt=null,Ut=null,ve=null,Le=null;return{setTest:function(re){U||(re?nt(n.STENCIL_TEST):wt(n.STENCIL_TEST))},setMask:function(re){ct!==re&&!U&&(n.stencilMask(re),ct=re)},setFunc:function(re,sn,Tn){(X!==re||J!==sn||ut!==Tn)&&(n.stencilFunc(re,sn,Tn),X=re,J=sn,ut=Tn)},setOp:function(re,sn,Tn){(lt!==re||Ut!==sn||ve!==Tn)&&(n.stencilOp(re,sn,Tn),lt=re,Ut=sn,ve=Tn)},setLocked:function(re){U=re},setClear:function(re){Le!==re&&(n.clearStencil(re),Le=re)},reset:function(){U=!1,ct=null,X=null,J=null,ut=null,lt=null,Ut=null,ve=null,Le=null}}}const r=new e,o=new i,a=new s,c=new WeakMap,h=new WeakMap;let l={},u={},p=new WeakMap,d=[],_=null,x=!1,m=null,f=null,E=null,w=null,M=null,P=null,A=null,b=new Wt(0,0,0),C=0,S=!1,v=null,L=null,k=null,O=null,Y=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,j=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(V)[1]),q=j>=1):V.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),q=j>=2);let st=null,dt={};const Et=n.getParameter(n.SCISSOR_BOX),zt=n.getParameter(n.VIEWPORT),ee=new Se().fromArray(Et),$=new Se().fromArray(zt);function et(U,ct,X,J){const ut=new Uint8Array(4),lt=n.createTexture();n.bindTexture(U,lt),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ut=0;Ut<X;Ut++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(ct,0,n.RGBA,1,1,J,0,n.RGBA,n.UNSIGNED_BYTE,ut):n.texImage2D(ct+Ut,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ut);return lt}const _t={};_t[n.TEXTURE_2D]=et(n.TEXTURE_2D,n.TEXTURE_2D,1),_t[n.TEXTURE_CUBE_MAP]=et(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),_t[n.TEXTURE_2D_ARRAY]=et(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),_t[n.TEXTURE_3D]=et(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),nt(n.DEPTH_TEST),o.setFunc(Yi),kt(!1),Ht(qa),nt(n.CULL_FACE),R(Xn);function nt(U){l[U]!==!0&&(n.enable(U),l[U]=!0)}function wt(U){l[U]!==!1&&(n.disable(U),l[U]=!1)}function Xt(U,ct){return u[U]!==ct?(n.bindFramebuffer(U,ct),u[U]=ct,U===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ct),U===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ct),!0):!1}function Rt(U,ct){let X=d,J=!1;if(U){X=p.get(ct),X===void 0&&(X=[],p.set(ct,X));const ut=U.textures;if(X.length!==ut.length||X[0]!==n.COLOR_ATTACHMENT0){for(let lt=0,Ut=ut.length;lt<Ut;lt++)X[lt]=n.COLOR_ATTACHMENT0+lt;X.length=ut.length,J=!0}}else X[0]!==n.BACK&&(X[0]=n.BACK,J=!0);J&&n.drawBuffers(X)}function _e(U){return _!==U?(n.useProgram(U),_=U,!0):!1}const me={[fi]:n.FUNC_ADD,[Mh]:n.FUNC_SUBTRACT,[yh]:n.FUNC_REVERSE_SUBTRACT};me[Sh]=n.MIN,me[Eh]=n.MAX;const Bt={[wh]:n.ZERO,[Th]:n.ONE,[bh]:n.SRC_COLOR,[So]:n.SRC_ALPHA,[Dh]:n.SRC_ALPHA_SATURATE,[Ph]:n.DST_COLOR,[Ch]:n.DST_ALPHA,[Ah]:n.ONE_MINUS_SRC_COLOR,[Eo]:n.ONE_MINUS_SRC_ALPHA,[Lh]:n.ONE_MINUS_DST_COLOR,[Rh]:n.ONE_MINUS_DST_ALPHA,[Ih]:n.CONSTANT_COLOR,[Uh]:n.ONE_MINUS_CONSTANT_COLOR,[Nh]:n.CONSTANT_ALPHA,[Fh]:n.ONE_MINUS_CONSTANT_ALPHA};function R(U,ct,X,J,ut,lt,Ut,ve,Le,re){if(U===Xn){x===!0&&(wt(n.BLEND),x=!1);return}if(x===!1&&(nt(n.BLEND),x=!0),U!==vh){if(U!==m||re!==S){if((f!==fi||M!==fi)&&(n.blendEquation(n.FUNC_ADD),f=fi,M=fi),re)switch(U){case Wi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ya:n.blendFunc(n.ONE,n.ONE);break;case $a:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Za:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Wi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ya:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case $a:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Za:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}E=null,w=null,P=null,A=null,b.set(0,0,0),C=0,m=U,S=re}return}ut=ut||ct,lt=lt||X,Ut=Ut||J,(ct!==f||ut!==M)&&(n.blendEquationSeparate(me[ct],me[ut]),f=ct,M=ut),(X!==E||J!==w||lt!==P||Ut!==A)&&(n.blendFuncSeparate(Bt[X],Bt[J],Bt[lt],Bt[Ut]),E=X,w=J,P=lt,A=Ut),(ve.equals(b)===!1||Le!==C)&&(n.blendColor(ve.r,ve.g,ve.b,Le),b.copy(ve),C=Le),m=U,S=!1}function Ce(U,ct){U.side===Ue?wt(n.CULL_FACE):nt(n.CULL_FACE);let X=U.side===Ge;ct&&(X=!X),kt(X),U.blending===Wi&&U.transparent===!1?R(Xn):R(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);const J=U.stencilWrite;a.setTest(J),J&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),he(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?nt(n.SAMPLE_ALPHA_TO_COVERAGE):wt(n.SAMPLE_ALPHA_TO_COVERAGE)}function kt(U){v!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),v=U)}function Ht(U){U!==gh?(nt(n.CULL_FACE),U!==L&&(U===qa?n.cullFace(n.BACK):U===_h?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):wt(n.CULL_FACE),L=U}function Mt(U){U!==k&&(q&&n.lineWidth(U),k=U)}function he(U,ct,X){U?(nt(n.POLYGON_OFFSET_FILL),(O!==ct||Y!==X)&&(n.polygonOffset(ct,X),O=ct,Y=X)):wt(n.POLYGON_OFFSET_FILL)}function yt(U){U?nt(n.SCISSOR_TEST):wt(n.SCISSOR_TEST)}function T(U){U===void 0&&(U=n.TEXTURE0+K-1),st!==U&&(n.activeTexture(U),st=U)}function g(U,ct,X){X===void 0&&(st===null?X=n.TEXTURE0+K-1:X=st);let J=dt[X];J===void 0&&(J={type:void 0,texture:void 0},dt[X]=J),(J.type!==U||J.texture!==ct)&&(st!==X&&(n.activeTexture(X),st=X),n.bindTexture(U,ct||_t[U]),J.type=U,J.texture=ct)}function I(){const U=dt[st];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function z(){try{n.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Z(){try{n.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function G(){try{n.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ot(){try{n.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{n.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ft(){try{n.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function qt(){try{n.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{n.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pt(){try{n.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ct(){try{n.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Pt(U){ee.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),ee.copy(U))}function xt(U){$.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),$.copy(U))}function Kt(U,ct){let X=h.get(ct);X===void 0&&(X=new WeakMap,h.set(ct,X));let J=X.get(U);J===void 0&&(J=n.getUniformBlockIndex(ct,U.name),X.set(U,J))}function Ft(U,ct){const J=h.get(ct).get(U);c.get(ct)!==J&&(n.uniformBlockBinding(ct,J,U.__bindingPointIndex),c.set(ct,J))}function de(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),l={},st=null,dt={},u={},p=new WeakMap,d=[],_=null,x=!1,m=null,f=null,E=null,w=null,M=null,P=null,A=null,b=new Wt(0,0,0),C=0,S=!1,v=null,L=null,k=null,O=null,Y=null,ee.set(0,0,n.canvas.width,n.canvas.height),$.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:nt,disable:wt,bindFramebuffer:Xt,drawBuffers:Rt,useProgram:_e,setBlending:R,setMaterial:Ce,setFlipSided:kt,setCullFace:Ht,setLineWidth:Mt,setPolygonOffset:he,setScissorTest:yt,activeTexture:T,bindTexture:g,unbindTexture:I,compressedTexImage2D:z,compressedTexImage3D:Z,texImage2D:pt,texImage3D:Ct,updateUBOMapping:Kt,uniformBlockBinding:Ft,texStorage2D:qt,texStorage3D:Q,texSubImage2D:G,texSubImage3D:ot,compressedTexSubImage2D:it,compressedTexSubImage3D:ft,scissor:Pt,viewport:xt,reset:de}}function N0(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new gt,l=new WeakMap;let u;const p=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,g){return d?new OffscreenCanvas(T,g):yr("canvas")}function x(T,g,I){let z=1;const Z=yt(T);if((Z.width>I||Z.height>I)&&(z=I/Math.max(Z.width,Z.height)),z<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const G=Math.floor(z*Z.width),ot=Math.floor(z*Z.height);u===void 0&&(u=_(G,ot));const it=g?_(G,ot):u;return it.width=G,it.height=ot,it.getContext("2d").drawImage(T,0,0,G,ot),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+G+"x"+ot+")."),it}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),T;return T}function m(T){return T.generateMipmaps}function f(T){n.generateMipmap(T)}function E(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(T,g,I,z,Z=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let G=g;if(g===n.RED&&(I===n.FLOAT&&(G=n.R32F),I===n.HALF_FLOAT&&(G=n.R16F),I===n.UNSIGNED_BYTE&&(G=n.R8)),g===n.RED_INTEGER&&(I===n.UNSIGNED_BYTE&&(G=n.R8UI),I===n.UNSIGNED_SHORT&&(G=n.R16UI),I===n.UNSIGNED_INT&&(G=n.R32UI),I===n.BYTE&&(G=n.R8I),I===n.SHORT&&(G=n.R16I),I===n.INT&&(G=n.R32I)),g===n.RG&&(I===n.FLOAT&&(G=n.RG32F),I===n.HALF_FLOAT&&(G=n.RG16F),I===n.UNSIGNED_BYTE&&(G=n.RG8)),g===n.RG_INTEGER&&(I===n.UNSIGNED_BYTE&&(G=n.RG8UI),I===n.UNSIGNED_SHORT&&(G=n.RG16UI),I===n.UNSIGNED_INT&&(G=n.RG32UI),I===n.BYTE&&(G=n.RG8I),I===n.SHORT&&(G=n.RG16I),I===n.INT&&(G=n.RG32I)),g===n.RGB_INTEGER&&(I===n.UNSIGNED_BYTE&&(G=n.RGB8UI),I===n.UNSIGNED_SHORT&&(G=n.RGB16UI),I===n.UNSIGNED_INT&&(G=n.RGB32UI),I===n.BYTE&&(G=n.RGB8I),I===n.SHORT&&(G=n.RGB16I),I===n.INT&&(G=n.RGB32I)),g===n.RGBA_INTEGER&&(I===n.UNSIGNED_BYTE&&(G=n.RGBA8UI),I===n.UNSIGNED_SHORT&&(G=n.RGBA16UI),I===n.UNSIGNED_INT&&(G=n.RGBA32UI),I===n.BYTE&&(G=n.RGBA8I),I===n.SHORT&&(G=n.RGBA16I),I===n.INT&&(G=n.RGBA32I)),g===n.RGB&&I===n.UNSIGNED_INT_5_9_9_9_REV&&(G=n.RGB9_E5),g===n.RGBA){const ot=Z?vr:te.getTransfer(z);I===n.FLOAT&&(G=n.RGBA32F),I===n.HALF_FLOAT&&(G=n.RGBA16F),I===n.UNSIGNED_BYTE&&(G=ot===oe?n.SRGB8_ALPHA8:n.RGBA8),I===n.UNSIGNED_SHORT_4_4_4_4&&(G=n.RGBA4),I===n.UNSIGNED_SHORT_5_5_5_1&&(G=n.RGB5_A1)}return(G===n.R16F||G===n.R32F||G===n.RG16F||G===n.RG32F||G===n.RGBA16F||G===n.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function M(T,g){let I;return T?g===null||g===vi||g===Ms?I=n.DEPTH24_STENCIL8:g===xn?I=n.DEPTH32F_STENCIL8:g===vs&&(I=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===vi||g===Ms?I=n.DEPTH_COMPONENT24:g===xn?I=n.DEPTH_COMPONENT32F:g===vs&&(I=n.DEPTH_COMPONENT16),I}function P(T,g){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ke&&T.minFilter!==_n?Math.log2(Math.max(g.width,g.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?g.mipmaps.length:1}function A(T){const g=T.target;g.removeEventListener("dispose",A),C(g),g.isVideoTexture&&l.delete(g)}function b(T){const g=T.target;g.removeEventListener("dispose",b),v(g)}function C(T){const g=i.get(T);if(g.__webglInit===void 0)return;const I=T.source,z=p.get(I);if(z){const Z=z[g.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&S(T),Object.keys(z).length===0&&p.delete(I)}i.remove(T)}function S(T){const g=i.get(T);n.deleteTexture(g.__webglTexture);const I=T.source,z=p.get(I);delete z[g.__cacheKey],o.memory.textures--}function v(T){const g=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(g.__webglFramebuffer[z]))for(let Z=0;Z<g.__webglFramebuffer[z].length;Z++)n.deleteFramebuffer(g.__webglFramebuffer[z][Z]);else n.deleteFramebuffer(g.__webglFramebuffer[z]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[z])}else{if(Array.isArray(g.__webglFramebuffer))for(let z=0;z<g.__webglFramebuffer.length;z++)n.deleteFramebuffer(g.__webglFramebuffer[z]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let z=0;z<g.__webglColorRenderbuffer.length;z++)g.__webglColorRenderbuffer[z]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[z]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const I=T.textures;for(let z=0,Z=I.length;z<Z;z++){const G=i.get(I[z]);G.__webglTexture&&(n.deleteTexture(G.__webglTexture),o.memory.textures--),i.remove(I[z])}i.remove(T)}let L=0;function k(){L=0}function O(){const T=L;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),L+=1,T}function Y(T){const g=[];return g.push(T.wrapS),g.push(T.wrapT),g.push(T.wrapR||0),g.push(T.magFilter),g.push(T.minFilter),g.push(T.anisotropy),g.push(T.internalFormat),g.push(T.format),g.push(T.type),g.push(T.generateMipmaps),g.push(T.premultiplyAlpha),g.push(T.flipY),g.push(T.unpackAlignment),g.push(T.colorSpace),g.join()}function K(T,g){const I=i.get(T);if(T.isVideoTexture&&Mt(T),T.isRenderTargetTexture===!1&&T.version>0&&I.__version!==T.version){const z=T.image;if(z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(I,T,g);return}}e.bindTexture(n.TEXTURE_2D,I.__webglTexture,n.TEXTURE0+g)}function q(T,g){const I=i.get(T);if(T.version>0&&I.__version!==T.version){$(I,T,g);return}e.bindTexture(n.TEXTURE_2D_ARRAY,I.__webglTexture,n.TEXTURE0+g)}function j(T,g){const I=i.get(T);if(T.version>0&&I.__version!==T.version){$(I,T,g);return}e.bindTexture(n.TEXTURE_3D,I.__webglTexture,n.TEXTURE0+g)}function V(T,g){const I=i.get(T);if(T.version>0&&I.__version!==T.version){et(I,T,g);return}e.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+g)}const st={[xr]:n.REPEAT,[pi]:n.CLAMP_TO_EDGE,[Io]:n.MIRRORED_REPEAT},dt={[Ke]:n.NEAREST,[qh]:n.NEAREST_MIPMAP_NEAREST,[Bs]:n.NEAREST_MIPMAP_LINEAR,[_n]:n.LINEAR,[Fr]:n.LINEAR_MIPMAP_NEAREST,[mi]:n.LINEAR_MIPMAP_LINEAR},Et={[Kh]:n.NEVER,[nu]:n.ALWAYS,[Jh]:n.LESS,[Ml]:n.LEQUAL,[jh]:n.EQUAL,[eu]:n.GEQUAL,[Qh]:n.GREATER,[tu]:n.NOTEQUAL};function zt(T,g){if(g.type===xn&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===_n||g.magFilter===Fr||g.magFilter===Bs||g.magFilter===mi||g.minFilter===_n||g.minFilter===Fr||g.minFilter===Bs||g.minFilter===mi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,st[g.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,st[g.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,st[g.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,dt[g.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,dt[g.minFilter]),g.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,Et[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Ke||g.minFilter!==Bs&&g.minFilter!==mi||g.type===xn&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const I=t.get("EXT_texture_filter_anisotropic");n.texParameterf(T,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function ee(T,g){let I=!1;T.__webglInit===void 0&&(T.__webglInit=!0,g.addEventListener("dispose",A));const z=g.source;let Z=p.get(z);Z===void 0&&(Z={},p.set(z,Z));const G=Y(g);if(G!==T.__cacheKey){Z[G]===void 0&&(Z[G]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,I=!0),Z[G].usedTimes++;const ot=Z[T.__cacheKey];ot!==void 0&&(Z[T.__cacheKey].usedTimes--,ot.usedTimes===0&&S(g)),T.__cacheKey=G,T.__webglTexture=Z[G].texture}return I}function $(T,g,I){let z=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(z=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(z=n.TEXTURE_3D);const Z=ee(T,g),G=g.source;e.bindTexture(z,T.__webglTexture,n.TEXTURE0+I);const ot=i.get(G);if(G.version!==ot.__version||Z===!0){e.activeTexture(n.TEXTURE0+I);const it=te.getPrimaries(te.workingColorSpace),ft=g.colorSpace===Wn?null:te.getPrimaries(g.colorSpace),qt=g.colorSpace===Wn||it===ft?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,qt);let Q=x(g.image,!1,s.maxTextureSize);Q=he(g,Q);const pt=r.convert(g.format,g.colorSpace),Ct=r.convert(g.type);let Pt=w(g.internalFormat,pt,Ct,g.colorSpace,g.isVideoTexture);zt(z,g);let xt;const Kt=g.mipmaps,Ft=g.isVideoTexture!==!0,de=ot.__version===void 0||Z===!0,U=G.dataReady,ct=P(g,Q);if(g.isDepthTexture)Pt=M(g.format===Ss,g.type),de&&(Ft?e.texStorage2D(n.TEXTURE_2D,1,Pt,Q.width,Q.height):e.texImage2D(n.TEXTURE_2D,0,Pt,Q.width,Q.height,0,pt,Ct,null));else if(g.isDataTexture)if(Kt.length>0){Ft&&de&&e.texStorage2D(n.TEXTURE_2D,ct,Pt,Kt[0].width,Kt[0].height);for(let X=0,J=Kt.length;X<J;X++)xt=Kt[X],Ft?U&&e.texSubImage2D(n.TEXTURE_2D,X,0,0,xt.width,xt.height,pt,Ct,xt.data):e.texImage2D(n.TEXTURE_2D,X,Pt,xt.width,xt.height,0,pt,Ct,xt.data);g.generateMipmaps=!1}else Ft?(de&&e.texStorage2D(n.TEXTURE_2D,ct,Pt,Q.width,Q.height),U&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Q.width,Q.height,pt,Ct,Q.data)):e.texImage2D(n.TEXTURE_2D,0,Pt,Q.width,Q.height,0,pt,Ct,Q.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Ft&&de&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ct,Pt,Kt[0].width,Kt[0].height,Q.depth);for(let X=0,J=Kt.length;X<J;X++)if(xt=Kt[X],g.format!==hn)if(pt!==null)if(Ft){if(U)if(g.layerUpdates.size>0){const ut=bc(xt.width,xt.height,g.format,g.type);for(const lt of g.layerUpdates){const Ut=xt.data.subarray(lt*ut/xt.data.BYTES_PER_ELEMENT,(lt+1)*ut/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,lt,xt.width,xt.height,1,pt,Ut)}g.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,0,xt.width,xt.height,Q.depth,pt,xt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,X,Pt,xt.width,xt.height,Q.depth,0,xt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?U&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,0,xt.width,xt.height,Q.depth,pt,Ct,xt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,X,Pt,xt.width,xt.height,Q.depth,0,pt,Ct,xt.data)}else{Ft&&de&&e.texStorage2D(n.TEXTURE_2D,ct,Pt,Kt[0].width,Kt[0].height);for(let X=0,J=Kt.length;X<J;X++)xt=Kt[X],g.format!==hn?pt!==null?Ft?U&&e.compressedTexSubImage2D(n.TEXTURE_2D,X,0,0,xt.width,xt.height,pt,xt.data):e.compressedTexImage2D(n.TEXTURE_2D,X,Pt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?U&&e.texSubImage2D(n.TEXTURE_2D,X,0,0,xt.width,xt.height,pt,Ct,xt.data):e.texImage2D(n.TEXTURE_2D,X,Pt,xt.width,xt.height,0,pt,Ct,xt.data)}else if(g.isDataArrayTexture)if(Ft){if(de&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ct,Pt,Q.width,Q.height,Q.depth),U)if(g.layerUpdates.size>0){const X=bc(Q.width,Q.height,g.format,g.type);for(const J of g.layerUpdates){const ut=Q.data.subarray(J*X/Q.data.BYTES_PER_ELEMENT,(J+1)*X/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,J,Q.width,Q.height,1,pt,Ct,ut)}g.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,pt,Ct,Q.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Pt,Q.width,Q.height,Q.depth,0,pt,Ct,Q.data);else if(g.isData3DTexture)Ft?(de&&e.texStorage3D(n.TEXTURE_3D,ct,Pt,Q.width,Q.height,Q.depth),U&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,pt,Ct,Q.data)):e.texImage3D(n.TEXTURE_3D,0,Pt,Q.width,Q.height,Q.depth,0,pt,Ct,Q.data);else if(g.isFramebufferTexture){if(de)if(Ft)e.texStorage2D(n.TEXTURE_2D,ct,Pt,Q.width,Q.height);else{let X=Q.width,J=Q.height;for(let ut=0;ut<ct;ut++)e.texImage2D(n.TEXTURE_2D,ut,Pt,X,J,0,pt,Ct,null),X>>=1,J>>=1}}else if(Kt.length>0){if(Ft&&de){const X=yt(Kt[0]);e.texStorage2D(n.TEXTURE_2D,ct,Pt,X.width,X.height)}for(let X=0,J=Kt.length;X<J;X++)xt=Kt[X],Ft?U&&e.texSubImage2D(n.TEXTURE_2D,X,0,0,pt,Ct,xt):e.texImage2D(n.TEXTURE_2D,X,Pt,pt,Ct,xt);g.generateMipmaps=!1}else if(Ft){if(de){const X=yt(Q);e.texStorage2D(n.TEXTURE_2D,ct,Pt,X.width,X.height)}U&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,pt,Ct,Q)}else e.texImage2D(n.TEXTURE_2D,0,Pt,pt,Ct,Q);m(g)&&f(z),ot.__version=G.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function et(T,g,I){if(g.image.length!==6)return;const z=ee(T,g),Z=g.source;e.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+I);const G=i.get(Z);if(Z.version!==G.__version||z===!0){e.activeTexture(n.TEXTURE0+I);const ot=te.getPrimaries(te.workingColorSpace),it=g.colorSpace===Wn?null:te.getPrimaries(g.colorSpace),ft=g.colorSpace===Wn||ot===it?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);const qt=g.isCompressedTexture||g.image[0].isCompressedTexture,Q=g.image[0]&&g.image[0].isDataTexture,pt=[];for(let J=0;J<6;J++)!qt&&!Q?pt[J]=x(g.image[J],!0,s.maxCubemapSize):pt[J]=Q?g.image[J].image:g.image[J],pt[J]=he(g,pt[J]);const Ct=pt[0],Pt=r.convert(g.format,g.colorSpace),xt=r.convert(g.type),Kt=w(g.internalFormat,Pt,xt,g.colorSpace),Ft=g.isVideoTexture!==!0,de=G.__version===void 0||z===!0,U=Z.dataReady;let ct=P(g,Ct);zt(n.TEXTURE_CUBE_MAP,g);let X;if(qt){Ft&&de&&e.texStorage2D(n.TEXTURE_CUBE_MAP,ct,Kt,Ct.width,Ct.height);for(let J=0;J<6;J++){X=pt[J].mipmaps;for(let ut=0;ut<X.length;ut++){const lt=X[ut];g.format!==hn?Pt!==null?Ft?U&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut,0,0,lt.width,lt.height,Pt,lt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut,Kt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut,0,0,lt.width,lt.height,Pt,xt,lt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut,Kt,lt.width,lt.height,0,Pt,xt,lt.data)}}}else{if(X=g.mipmaps,Ft&&de){X.length>0&&ct++;const J=yt(pt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,ct,Kt,J.width,J.height)}for(let J=0;J<6;J++)if(Q){Ft?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,pt[J].width,pt[J].height,Pt,xt,pt[J].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Kt,pt[J].width,pt[J].height,0,Pt,xt,pt[J].data);for(let ut=0;ut<X.length;ut++){const Ut=X[ut].image[J].image;Ft?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut+1,0,0,Ut.width,Ut.height,Pt,xt,Ut.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut+1,Kt,Ut.width,Ut.height,0,Pt,xt,Ut.data)}}else{Ft?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Pt,xt,pt[J]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Kt,Pt,xt,pt[J]);for(let ut=0;ut<X.length;ut++){const lt=X[ut];Ft?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut+1,0,0,Pt,xt,lt.image[J]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut+1,Kt,Pt,xt,lt.image[J])}}}m(g)&&f(n.TEXTURE_CUBE_MAP),G.__version=Z.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function _t(T,g,I,z,Z,G){const ot=r.convert(I.format,I.colorSpace),it=r.convert(I.type),ft=w(I.internalFormat,ot,it,I.colorSpace),qt=i.get(g),Q=i.get(I);if(Q.__renderTarget=g,!qt.__hasExternalTextures){const pt=Math.max(1,g.width>>G),Ct=Math.max(1,g.height>>G);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?e.texImage3D(Z,G,ft,pt,Ct,g.depth,0,ot,it,null):e.texImage2D(Z,G,ft,pt,Ct,0,ot,it,null)}e.bindFramebuffer(n.FRAMEBUFFER,T),Ht(g)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,z,Z,Q.__webglTexture,0,kt(g)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,z,Z,Q.__webglTexture,G),e.bindFramebuffer(n.FRAMEBUFFER,null)}function nt(T,g,I){if(n.bindRenderbuffer(n.RENDERBUFFER,T),g.depthBuffer){const z=g.depthTexture,Z=z&&z.isDepthTexture?z.type:null,G=M(g.stencilBuffer,Z),ot=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,it=kt(g);Ht(g)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,it,G,g.width,g.height):I?n.renderbufferStorageMultisample(n.RENDERBUFFER,it,G,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,G,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ot,n.RENDERBUFFER,T)}else{const z=g.textures;for(let Z=0;Z<z.length;Z++){const G=z[Z],ot=r.convert(G.format,G.colorSpace),it=r.convert(G.type),ft=w(G.internalFormat,ot,it,G.colorSpace),qt=kt(g);I&&Ht(g)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,qt,ft,g.width,g.height):Ht(g)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,qt,ft,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,ft,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function wt(T,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,T),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const z=i.get(g.depthTexture);z.__renderTarget=g,(!z.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),K(g.depthTexture,0);const Z=z.__webglTexture,G=kt(g);if(g.depthTexture.format===ys)Ht(g)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0);else if(g.depthTexture.format===Ss)Ht(g)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Xt(T){const g=i.get(T),I=T.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==T.depthTexture){const z=T.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),z){const Z=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,z.removeEventListener("dispose",Z)};z.addEventListener("dispose",Z),g.__depthDisposeCallback=Z}g.__boundDepthTexture=z}if(T.depthTexture&&!g.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");wt(g.__webglFramebuffer,T)}else if(I){g.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(e.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[z]),g.__webglDepthbuffer[z]===void 0)g.__webglDepthbuffer[z]=n.createRenderbuffer(),nt(g.__webglDepthbuffer[z],T,!1);else{const Z=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=g.__webglDepthbuffer[z];n.bindRenderbuffer(n.RENDERBUFFER,G),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,G)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=n.createRenderbuffer(),nt(g.__webglDepthbuffer,T,!1);else{const z=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=g.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,z,n.RENDERBUFFER,Z)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Rt(T,g,I){const z=i.get(T);g!==void 0&&_t(z.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),I!==void 0&&Xt(T)}function _e(T){const g=T.texture,I=i.get(T),z=i.get(g);T.addEventListener("dispose",b);const Z=T.textures,G=T.isWebGLCubeRenderTarget===!0,ot=Z.length>1;if(ot||(z.__webglTexture===void 0&&(z.__webglTexture=n.createTexture()),z.__version=g.version,o.memory.textures++),G){I.__webglFramebuffer=[];for(let it=0;it<6;it++)if(g.mipmaps&&g.mipmaps.length>0){I.__webglFramebuffer[it]=[];for(let ft=0;ft<g.mipmaps.length;ft++)I.__webglFramebuffer[it][ft]=n.createFramebuffer()}else I.__webglFramebuffer[it]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){I.__webglFramebuffer=[];for(let it=0;it<g.mipmaps.length;it++)I.__webglFramebuffer[it]=n.createFramebuffer()}else I.__webglFramebuffer=n.createFramebuffer();if(ot)for(let it=0,ft=Z.length;it<ft;it++){const qt=i.get(Z[it]);qt.__webglTexture===void 0&&(qt.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&Ht(T)===!1){I.__webglMultisampledFramebuffer=n.createFramebuffer(),I.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let it=0;it<Z.length;it++){const ft=Z[it];I.__webglColorRenderbuffer[it]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,I.__webglColorRenderbuffer[it]);const qt=r.convert(ft.format,ft.colorSpace),Q=r.convert(ft.type),pt=w(ft.internalFormat,qt,Q,ft.colorSpace,T.isXRRenderTarget===!0),Ct=kt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ct,pt,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+it,n.RENDERBUFFER,I.__webglColorRenderbuffer[it])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(I.__webglDepthRenderbuffer=n.createRenderbuffer(),nt(I.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(G){e.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture),zt(n.TEXTURE_CUBE_MAP,g);for(let it=0;it<6;it++)if(g.mipmaps&&g.mipmaps.length>0)for(let ft=0;ft<g.mipmaps.length;ft++)_t(I.__webglFramebuffer[it][ft],T,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+it,ft);else _t(I.__webglFramebuffer[it],T,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);m(g)&&f(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ot){for(let it=0,ft=Z.length;it<ft;it++){const qt=Z[it],Q=i.get(qt);e.bindTexture(n.TEXTURE_2D,Q.__webglTexture),zt(n.TEXTURE_2D,qt),_t(I.__webglFramebuffer,T,qt,n.COLOR_ATTACHMENT0+it,n.TEXTURE_2D,0),m(qt)&&f(n.TEXTURE_2D)}e.unbindTexture()}else{let it=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(it=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(it,z.__webglTexture),zt(it,g),g.mipmaps&&g.mipmaps.length>0)for(let ft=0;ft<g.mipmaps.length;ft++)_t(I.__webglFramebuffer[ft],T,g,n.COLOR_ATTACHMENT0,it,ft);else _t(I.__webglFramebuffer,T,g,n.COLOR_ATTACHMENT0,it,0);m(g)&&f(it),e.unbindTexture()}T.depthBuffer&&Xt(T)}function me(T){const g=T.textures;for(let I=0,z=g.length;I<z;I++){const Z=g[I];if(m(Z)){const G=E(T),ot=i.get(Z).__webglTexture;e.bindTexture(G,ot),f(G),e.unbindTexture()}}}const Bt=[],R=[];function Ce(T){if(T.samples>0){if(Ht(T)===!1){const g=T.textures,I=T.width,z=T.height;let Z=n.COLOR_BUFFER_BIT;const G=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ot=i.get(T),it=g.length>1;if(it)for(let ft=0;ft<g.length;ft++)e.bindFramebuffer(n.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ot.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ot.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ot.__webglFramebuffer);for(let ft=0;ft<g.length;ft++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),it){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ot.__webglColorRenderbuffer[ft]);const qt=i.get(g[ft]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,qt,0)}n.blitFramebuffer(0,0,I,z,0,0,I,z,Z,n.NEAREST),c===!0&&(Bt.length=0,R.length=0,Bt.push(n.COLOR_ATTACHMENT0+ft),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Bt.push(G),R.push(G),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,R)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Bt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),it)for(let ft=0;ft<g.length;ft++){e.bindFramebuffer(n.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,ot.__webglColorRenderbuffer[ft]);const qt=i.get(g[ft]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ot.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.TEXTURE_2D,qt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ot.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const g=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function kt(T){return Math.min(s.maxSamples,T.samples)}function Ht(T){const g=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function Mt(T){const g=o.render.frame;l.get(T)!==g&&(l.set(T,g),T.update())}function he(T,g){const I=T.colorSpace,z=T.format,Z=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||I!==Ki&&I!==Wn&&(te.getTransfer(I)===oe?(z!==hn||Z!==Nn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),g}function yt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(h.width=T.naturalWidth||T.width,h.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(h.width=T.displayWidth,h.height=T.displayHeight):(h.width=T.width,h.height=T.height),h}this.allocateTextureUnit=O,this.resetTextureUnits=k,this.setTexture2D=K,this.setTexture2DArray=q,this.setTexture3D=j,this.setTextureCube=V,this.rebindTextures=Rt,this.setupRenderTarget=_e,this.updateRenderTargetMipmap=me,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=Xt,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=Ht}function F0(n,t){function e(i,s=Wn){let r;const o=te.getTransfer(s);if(i===Nn)return n.UNSIGNED_BYTE;if(i===xa)return n.UNSIGNED_SHORT_4_4_4_4;if(i===va)return n.UNSIGNED_SHORT_5_5_5_1;if(i===fl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===hl)return n.BYTE;if(i===ul)return n.SHORT;if(i===vs)return n.UNSIGNED_SHORT;if(i===_a)return n.INT;if(i===vi)return n.UNSIGNED_INT;if(i===xn)return n.FLOAT;if(i===Cs)return n.HALF_FLOAT;if(i===dl)return n.ALPHA;if(i===pl)return n.RGB;if(i===hn)return n.RGBA;if(i===ml)return n.LUMINANCE;if(i===gl)return n.LUMINANCE_ALPHA;if(i===ys)return n.DEPTH_COMPONENT;if(i===Ss)return n.DEPTH_STENCIL;if(i===Ma)return n.RED;if(i===ya)return n.RED_INTEGER;if(i===_l)return n.RG;if(i===Sa)return n.RG_INTEGER;if(i===Ea)return n.RGBA_INTEGER;if(i===hr||i===ur||i===fr||i===dr)if(o===oe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===hr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===hr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ur)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===fr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===dr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Uo||i===No||i===Fo||i===Oo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Uo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===No)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Fo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Oo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===zo||i===Bo||i===ko)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===zo||i===Bo)return o===oe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ko)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ho||i===Go||i===Vo||i===Wo||i===Xo||i===qo||i===Yo||i===$o||i===Zo||i===Ko||i===Jo||i===jo||i===Qo||i===ta)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ho)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Go)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Vo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Wo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Xo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===qo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Yo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===$o)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Zo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ko)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Jo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===jo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Qo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ta)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===pr||i===ea||i===na)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===pr)return o===oe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ea)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===na)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===xl||i===ia||i===sa||i===ra)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===pr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===ia)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===sa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ra)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ms?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const O0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,z0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class B0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Ne,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Jn({vertexShader:O0,fragmentShader:z0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new W(new $n(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class k0 extends Qi{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,h=null,l=null,u=null,p=null,d=null,_=null;const x=new B0,m=e.getContextAttributes();let f=null,E=null;const w=[],M=[],P=new gt;let A=null;const b=new nn;b.viewport=new Se;const C=new nn;C.viewport=new Se;const S=[b,C],v=new of;let L=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let et=w[$];return et===void 0&&(et=new so,w[$]=et),et.getTargetRaySpace()},this.getControllerGrip=function($){let et=w[$];return et===void 0&&(et=new so,w[$]=et),et.getGripSpace()},this.getHand=function($){let et=w[$];return et===void 0&&(et=new so,w[$]=et),et.getHandSpace()};function O($){const et=M.indexOf($.inputSource);if(et===-1)return;const _t=w[et];_t!==void 0&&(_t.update($.inputSource,$.frame,h||o),_t.dispatchEvent({type:$.type,data:$.inputSource}))}function Y(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",K);for(let $=0;$<w.length;$++){const et=M[$];et!==null&&(M[$]=null,w[$].disconnect(et))}L=null,k=null,x.reset(),t.setRenderTarget(f),d=null,p=null,u=null,s=null,E=null,ee.stop(),i.isPresenting=!1,t.setPixelRatio(A),t.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function($){h=$},this.getBaseLayer=function(){return p!==null?p:d},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(P),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let _t=null,nt=null,wt=null;m.depth&&(wt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,_t=m.stencil?Ss:ys,nt=m.stencil?Ms:vi);const Xt={colorFormat:e.RGBA8,depthFormat:wt,scaleFactor:r};u=new XRWebGLBinding(s,e),p=u.createProjectionLayer(Xt),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),E=new Mi(p.textureWidth,p.textureHeight,{format:hn,type:Nn,depthTexture:new Pl(p.textureWidth,p.textureHeight,nt,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const _t={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,_t),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),E=new Mi(d.framebufferWidth,d.framebufferHeight,{format:hn,type:Nn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),h=null,o=await s.requestReferenceSpace(a),ee.setContext(s),ee.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function K($){for(let et=0;et<$.removed.length;et++){const _t=$.removed[et],nt=M.indexOf(_t);nt>=0&&(M[nt]=null,w[nt].disconnect(_t))}for(let et=0;et<$.added.length;et++){const _t=$.added[et];let nt=M.indexOf(_t);if(nt===-1){for(let Xt=0;Xt<w.length;Xt++)if(Xt>=M.length){M.push(_t),nt=Xt;break}else if(M[Xt]===null){M[Xt]=_t,nt=Xt;break}if(nt===-1)break}const wt=w[nt];wt&&wt.connect(_t)}}const q=new D,j=new D;function V($,et,_t){q.setFromMatrixPosition(et.matrixWorld),j.setFromMatrixPosition(_t.matrixWorld);const nt=q.distanceTo(j),wt=et.projectionMatrix.elements,Xt=_t.projectionMatrix.elements,Rt=wt[14]/(wt[10]-1),_e=wt[14]/(wt[10]+1),me=(wt[9]+1)/wt[5],Bt=(wt[9]-1)/wt[5],R=(wt[8]-1)/wt[0],Ce=(Xt[8]+1)/Xt[0],kt=Rt*R,Ht=Rt*Ce,Mt=nt/(-R+Ce),he=Mt*-R;if(et.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(he),$.translateZ(Mt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),wt[10]===-1)$.projectionMatrix.copy(et.projectionMatrix),$.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const yt=Rt+Mt,T=_e+Mt,g=kt-he,I=Ht+(nt-he),z=me*_e/T*yt,Z=Bt*_e/T*yt;$.projectionMatrix.makePerspective(g,I,z,Z,yt,T),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function st($,et){et===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(et.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let et=$.near,_t=$.far;x.texture!==null&&(x.depthNear>0&&(et=x.depthNear),x.depthFar>0&&(_t=x.depthFar)),v.near=C.near=b.near=et,v.far=C.far=b.far=_t,(L!==v.near||k!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),L=v.near,k=v.far),b.layers.mask=$.layers.mask|2,C.layers.mask=$.layers.mask|4,v.layers.mask=b.layers.mask|C.layers.mask;const nt=$.parent,wt=v.cameras;st(v,nt);for(let Xt=0;Xt<wt.length;Xt++)st(wt[Xt],nt);wt.length===2?V(v,b,C):v.projectionMatrix.copy(b.projectionMatrix),dt($,v,nt)};function dt($,et,_t){_t===null?$.matrix.copy(et.matrixWorld):($.matrix.copy(_t.matrixWorld),$.matrix.invert(),$.matrix.multiply(et.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(et.projectionMatrix),$.projectionMatrixInverse.copy(et.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=oa*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(p===null&&d===null))return c},this.setFoveation=function($){c=$,p!==null&&(p.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(v)};let Et=null;function zt($,et){if(l=et.getViewerPose(h||o),_=et,l!==null){const _t=l.views;d!==null&&(t.setRenderTargetFramebuffer(E,d.framebuffer),t.setRenderTarget(E));let nt=!1;_t.length!==v.cameras.length&&(v.cameras.length=0,nt=!0);for(let Rt=0;Rt<_t.length;Rt++){const _e=_t[Rt];let me=null;if(d!==null)me=d.getViewport(_e);else{const R=u.getViewSubImage(p,_e);me=R.viewport,Rt===0&&(t.setRenderTargetTextures(E,R.colorTexture,R.depthStencilTexture),t.setRenderTarget(E))}let Bt=S[Rt];Bt===void 0&&(Bt=new nn,Bt.layers.enable(Rt),Bt.viewport=new Se,S[Rt]=Bt),Bt.matrix.fromArray(_e.transform.matrix),Bt.matrix.decompose(Bt.position,Bt.quaternion,Bt.scale),Bt.projectionMatrix.fromArray(_e.projectionMatrix),Bt.projectionMatrixInverse.copy(Bt.projectionMatrix).invert(),Bt.viewport.set(me.x,me.y,me.width,me.height),Rt===0&&(v.matrix.copy(Bt.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),nt===!0&&v.cameras.push(Bt)}const wt=s.enabledFeatures;if(wt&&wt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&u){const Rt=u.getDepthInformation(_t[0]);Rt&&Rt.isValid&&Rt.texture&&x.init(t,Rt,s.renderState)}}for(let _t=0;_t<w.length;_t++){const nt=M[_t],wt=w[_t];nt!==null&&wt!==void 0&&wt.update(nt,et,h||o)}Et&&Et($,et),et.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:et}),_=null}const ee=new Fl;ee.setAnimationLoop(zt),this.setAnimationLoop=function($){Et=$},this.dispose=function(){}}}const li=new yn,H0=new ce;function G0(n,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Al(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,E,w,M){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),l(m,f)):f.isMeshStandardMaterial?(r(m,f),p(m,f),f.isMeshPhysicalMaterial&&d(m,f,M)):f.isMeshMatcapMaterial?(r(m,f),_(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),x(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,E,w):f.isSpriteMaterial?h(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ge&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ge&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const E=t.get(f),w=E.envMap,M=E.envMapRotation;w&&(m.envMap.value=w,li.copy(M),li.x*=-1,li.y*=-1,li.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(li.y*=-1,li.z*=-1),m.envMapRotation.value.setFromMatrix4(H0.makeRotationFromEuler(li)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,E,w){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*E,m.scale.value=w*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function p(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function d(m,f,E){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ge&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){const E=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function V0(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,w){const M=w.program;i.uniformBlockBinding(E,M)}function h(E,w){let M=s[E.id];M===void 0&&(_(E),M=l(E),s[E.id]=M,E.addEventListener("dispose",m));const P=w.program;i.updateUBOMapping(E,P);const A=t.render.frame;r[E.id]!==A&&(p(E),r[E.id]=A)}function l(E){const w=u();E.__bindingPointIndex=w;const M=n.createBuffer(),P=E.__size,A=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,P,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,M),M}function u(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(E){const w=s[E.id],M=E.uniforms,P=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let A=0,b=M.length;A<b;A++){const C=Array.isArray(M[A])?M[A]:[M[A]];for(let S=0,v=C.length;S<v;S++){const L=C[S];if(d(L,A,S,P)===!0){const k=L.__offset,O=Array.isArray(L.value)?L.value:[L.value];let Y=0;for(let K=0;K<O.length;K++){const q=O[K],j=x(q);typeof q=="number"||typeof q=="boolean"?(L.__data[0]=q,n.bufferSubData(n.UNIFORM_BUFFER,k+Y,L.__data)):q.isMatrix3?(L.__data[0]=q.elements[0],L.__data[1]=q.elements[1],L.__data[2]=q.elements[2],L.__data[3]=0,L.__data[4]=q.elements[3],L.__data[5]=q.elements[4],L.__data[6]=q.elements[5],L.__data[7]=0,L.__data[8]=q.elements[6],L.__data[9]=q.elements[7],L.__data[10]=q.elements[8],L.__data[11]=0):(q.toArray(L.__data,Y),Y+=j.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(E,w,M,P){const A=E.value,b=w+"_"+M;if(P[b]===void 0)return typeof A=="number"||typeof A=="boolean"?P[b]=A:P[b]=A.clone(),!0;{const C=P[b];if(typeof A=="number"||typeof A=="boolean"){if(C!==A)return P[b]=A,!0}else if(C.equals(A)===!1)return C.copy(A),!0}return!1}function _(E){const w=E.uniforms;let M=0;const P=16;for(let b=0,C=w.length;b<C;b++){const S=Array.isArray(w[b])?w[b]:[w[b]];for(let v=0,L=S.length;v<L;v++){const k=S[v],O=Array.isArray(k.value)?k.value:[k.value];for(let Y=0,K=O.length;Y<K;Y++){const q=O[Y],j=x(q),V=M%P,st=V%j.boundary,dt=V+st;M+=st,dt!==0&&P-dt<j.storage&&(M+=P-dt),k.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=M,M+=j.storage}}}const A=M%P;return A>0&&(M+=P-A),E.__size=M,E.__cache={},this}function x(E){const w={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(w.boundary=4,w.storage=4):E.isVector2?(w.boundary=8,w.storage=8):E.isVector3||E.isColor?(w.boundary=16,w.storage=12):E.isVector4?(w.boundary=16,w.storage=16):E.isMatrix3?(w.boundary=48,w.storage=48):E.isMatrix4?(w.boundary=64,w.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),w}function m(E){const w=E.target;w.removeEventListener("dispose",m);const M=o.indexOf(w.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function f(){for(const E in s)n.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:c,update:h,dispose:f}}class W0{constructor(t={}){const{canvas:e=su(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:h=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:p=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const _=new Uint32Array(4),x=new Int32Array(4);let m=null,f=null;const E=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let P=!1;this._outputColorSpace=$e;let A=0,b=0,C=null,S=-1,v=null;const L=new Se,k=new Se;let O=null;const Y=new Wt(0);let K=0,q=e.width,j=e.height,V=1,st=null,dt=null;const Et=new Se(0,0,q,j),zt=new Se(0,0,q,j);let ee=!1;const $=new Aa;let et=!1,_t=!1;const nt=new ce,wt=new ce,Xt=new D,Rt=new Se,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let me=!1;function Bt(){return C===null?V:1}let R=i;function Ce(y,N){return e.getContext(y,N)}try{const y={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:h,powerPreference:l,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ma}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",ut,!1),e.addEventListener("webglcontextcreationerror",lt,!1),R===null){const N="webgl2";if(R=Ce(N,y),R===null)throw Ce(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let kt,Ht,Mt,he,yt,T,g,I,z,Z,G,ot,it,ft,qt,Q,pt,Ct,Pt,xt,Kt,Ft,de,U;function ct(){kt=new tm(R),kt.init(),Ft=new F0(R,kt),Ht=new Yp(R,kt,t,Ft),Mt=new U0(R,kt),Ht.reverseDepthBuffer&&p&&Mt.buffers.depth.setReversed(!0),he=new im(R),yt=new y0,T=new N0(R,kt,Mt,yt,Ht,Ft,he),g=new Zp(M),I=new Qp(M),z=new lf(R),de=new Xp(R,z),Z=new em(R,z,he,de),G=new rm(R,Z,z,he),Pt=new sm(R,Ht,T),Q=new $p(yt),ot=new M0(M,g,I,kt,Ht,de,Q),it=new G0(M,yt),ft=new E0,qt=new R0(kt),Ct=new Wp(M,g,I,Mt,G,d,c),pt=new D0(M,G,Ht),U=new V0(R,he,Ht,Mt),xt=new qp(R,kt,he),Kt=new nm(R,kt,he),he.programs=ot.programs,M.capabilities=Ht,M.extensions=kt,M.properties=yt,M.renderLists=ft,M.shadowMap=pt,M.state=Mt,M.info=he}ct();const X=new k0(M,R);this.xr=X,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const y=kt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=kt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(y){y!==void 0&&(V=y,this.setSize(q,j,!1))},this.getSize=function(y){return y.set(q,j)},this.setSize=function(y,N,B=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=y,j=N,e.width=Math.floor(y*V),e.height=Math.floor(N*V),B===!0&&(e.style.width=y+"px",e.style.height=N+"px"),this.setViewport(0,0,y,N)},this.getDrawingBufferSize=function(y){return y.set(q*V,j*V).floor()},this.setDrawingBufferSize=function(y,N,B){q=y,j=N,V=B,e.width=Math.floor(y*B),e.height=Math.floor(N*B),this.setViewport(0,0,y,N)},this.getCurrentViewport=function(y){return y.copy(L)},this.getViewport=function(y){return y.copy(Et)},this.setViewport=function(y,N,B,H){y.isVector4?Et.set(y.x,y.y,y.z,y.w):Et.set(y,N,B,H),Mt.viewport(L.copy(Et).multiplyScalar(V).round())},this.getScissor=function(y){return y.copy(zt)},this.setScissor=function(y,N,B,H){y.isVector4?zt.set(y.x,y.y,y.z,y.w):zt.set(y,N,B,H),Mt.scissor(k.copy(zt).multiplyScalar(V).round())},this.getScissorTest=function(){return ee},this.setScissorTest=function(y){Mt.setScissorTest(ee=y)},this.setOpaqueSort=function(y){st=y},this.setTransparentSort=function(y){dt=y},this.getClearColor=function(y){return y.copy(Ct.getClearColor())},this.setClearColor=function(){Ct.setClearColor(...arguments)},this.getClearAlpha=function(){return Ct.getClearAlpha()},this.setClearAlpha=function(){Ct.setClearAlpha(...arguments)},this.clear=function(y=!0,N=!0,B=!0){let H=0;if(y){let F=!1;if(C!==null){const tt=C.texture.format;F=tt===Ea||tt===Sa||tt===ya}if(F){const tt=C.texture.type,at=tt===Nn||tt===vi||tt===vs||tt===Ms||tt===xa||tt===va,mt=Ct.getClearColor(),vt=Ct.getClearAlpha(),Dt=mt.r,Lt=mt.g,Tt=mt.b;at?(_[0]=Dt,_[1]=Lt,_[2]=Tt,_[3]=vt,R.clearBufferuiv(R.COLOR,0,_)):(x[0]=Dt,x[1]=Lt,x[2]=Tt,x[3]=vt,R.clearBufferiv(R.COLOR,0,x))}else H|=R.COLOR_BUFFER_BIT}N&&(H|=R.DEPTH_BUFFER_BIT),B&&(H|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",lt,!1),Ct.dispose(),ft.dispose(),qt.dispose(),yt.dispose(),g.dispose(),I.dispose(),G.dispose(),de.dispose(),U.dispose(),ot.dispose(),X.dispose(),X.removeEventListener("sessionstart",Ba),X.removeEventListener("sessionend",ka),ni.stop()};function J(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function ut(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const y=he.autoReset,N=pt.enabled,B=pt.autoUpdate,H=pt.needsUpdate,F=pt.type;ct(),he.autoReset=y,pt.enabled=N,pt.autoUpdate=B,pt.needsUpdate=H,pt.type=F}function lt(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Ut(y){const N=y.target;N.removeEventListener("dispose",Ut),ve(N)}function ve(y){Le(y),yt.remove(y)}function Le(y){const N=yt.get(y).programs;N!==void 0&&(N.forEach(function(B){ot.releaseProgram(B)}),y.isShaderMaterial&&ot.releaseShaderCache(y))}this.renderBufferDirect=function(y,N,B,H,F,tt){N===null&&(N=_e);const at=F.isMesh&&F.matrixWorld.determinant()<0,mt=hh(y,N,B,H,F);Mt.setMaterial(H,at);let vt=B.index,Dt=1;if(H.wireframe===!0){if(vt=Z.getWireframeAttribute(B),vt===void 0)return;Dt=2}const Lt=B.drawRange,Tt=B.attributes.position;let Jt=Lt.start*Dt,ie=(Lt.start+Lt.count)*Dt;tt!==null&&(Jt=Math.max(Jt,tt.start*Dt),ie=Math.min(ie,(tt.start+tt.count)*Dt)),vt!==null?(Jt=Math.max(Jt,0),ie=Math.min(ie,vt.count)):Tt!=null&&(Jt=Math.max(Jt,0),ie=Math.min(ie,Tt.count));const Ee=ie-Jt;if(Ee<0||Ee===1/0)return;de.setup(F,H,mt,B,vt);let Me,Qt=xt;if(vt!==null&&(Me=z.get(vt),Qt=Kt,Qt.setIndex(Me)),F.isMesh)H.wireframe===!0?(Mt.setLineWidth(H.wireframeLinewidth*Bt()),Qt.setMode(R.LINES)):Qt.setMode(R.TRIANGLES);else if(F.isLine){let At=H.linewidth;At===void 0&&(At=1),Mt.setLineWidth(At*Bt()),F.isLineSegments?Qt.setMode(R.LINES):F.isLineLoop?Qt.setMode(R.LINE_LOOP):Qt.setMode(R.LINE_STRIP)}else F.isPoints?Qt.setMode(R.POINTS):F.isSprite&&Qt.setMode(R.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)mr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Qt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(kt.get("WEBGL_multi_draw"))Qt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const At=F._multiDrawStarts,Re=F._multiDrawCounts,se=F._multiDrawCount,rn=vt?z.get(vt).bytesPerElement:1,wi=yt.get(H).currentProgram.getUniforms();for(let Xe=0;Xe<se;Xe++)wi.setValue(R,"_gl_DrawID",Xe),Qt.render(At[Xe]/rn,Re[Xe])}else if(F.isInstancedMesh)Qt.renderInstances(Jt,Ee,F.count);else if(B.isInstancedBufferGeometry){const At=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Re=Math.min(B.instanceCount,At);Qt.renderInstances(Jt,Ee,Re)}else Qt.render(Jt,Ee)};function re(y,N,B){y.transparent===!0&&y.side===Ue&&y.forceSinglePass===!1?(y.side=Ge,y.needsUpdate=!0,zs(y,N,B),y.side=Kn,y.needsUpdate=!0,zs(y,N,B),y.side=Ue):zs(y,N,B)}this.compile=function(y,N,B=null){B===null&&(B=y),f=qt.get(B),f.init(N),w.push(f),B.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),y!==B&&y.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),f.setupLights();const H=new Set;return y.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const tt=F.material;if(tt)if(Array.isArray(tt))for(let at=0;at<tt.length;at++){const mt=tt[at];re(mt,B,F),H.add(mt)}else re(tt,B,F),H.add(tt)}),f=w.pop(),H},this.compileAsync=function(y,N,B=null){const H=this.compile(y,N,B);return new Promise(F=>{function tt(){if(H.forEach(function(at){yt.get(at).currentProgram.isReady()&&H.delete(at)}),H.size===0){F(y);return}setTimeout(tt,10)}kt.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let sn=null;function Tn(y){sn&&sn(y)}function Ba(){ni.stop()}function ka(){ni.start()}const ni=new Fl;ni.setAnimationLoop(Tn),typeof self<"u"&&ni.setContext(self),this.setAnimationLoop=function(y){sn=y,X.setAnimationLoop(y),y===null?ni.stop():ni.start()},X.addEventListener("sessionstart",Ba),X.addEventListener("sessionend",ka),this.render=function(y,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(N),N=X.getCamera()),y.isScene===!0&&y.onBeforeRender(M,y,N,C),f=qt.get(y,w.length),f.init(N),w.push(f),wt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),$.setFromProjectionMatrix(wt),_t=this.localClippingEnabled,et=Q.init(this.clippingPlanes,_t),m=ft.get(y,E.length),m.init(),E.push(m),X.enabled===!0&&X.isPresenting===!0){const tt=M.xr.getDepthSensingMesh();tt!==null&&Ur(tt,N,-1/0,M.sortObjects)}Ur(y,N,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(st,dt),me=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,me&&Ct.addToRenderList(m,y),this.info.render.frame++,et===!0&&Q.beginShadows();const B=f.state.shadowsArray;pt.render(B,y,N),et===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,F=m.transmissive;if(f.setupLights(),N.isArrayCamera){const tt=N.cameras;if(F.length>0)for(let at=0,mt=tt.length;at<mt;at++){const vt=tt[at];Ga(H,F,y,vt)}me&&Ct.render(y);for(let at=0,mt=tt.length;at<mt;at++){const vt=tt[at];Ha(m,y,vt,vt.viewport)}}else F.length>0&&Ga(H,F,y,N),me&&Ct.render(y),Ha(m,y,N);C!==null&&b===0&&(T.updateMultisampleRenderTarget(C),T.updateRenderTargetMipmap(C)),y.isScene===!0&&y.onAfterRender(M,y,N),de.resetDefaultState(),S=-1,v=null,w.pop(),w.length>0?(f=w[w.length-1],et===!0&&Q.setGlobalState(M.clippingPlanes,f.state.camera)):f=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function Ur(y,N,B,H){if(y.visible===!1)return;if(y.layers.test(N.layers)){if(y.isGroup)B=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(N);else if(y.isLight)f.pushLight(y),y.castShadow&&f.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||$.intersectsSprite(y)){H&&Rt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(wt);const at=G.update(y),mt=y.material;mt.visible&&m.push(y,at,mt,B,Rt.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||$.intersectsObject(y))){const at=G.update(y),mt=y.material;if(H&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Rt.copy(y.boundingSphere.center)):(at.boundingSphere===null&&at.computeBoundingSphere(),Rt.copy(at.boundingSphere.center)),Rt.applyMatrix4(y.matrixWorld).applyMatrix4(wt)),Array.isArray(mt)){const vt=at.groups;for(let Dt=0,Lt=vt.length;Dt<Lt;Dt++){const Tt=vt[Dt],Jt=mt[Tt.materialIndex];Jt&&Jt.visible&&m.push(y,at,Jt,B,Rt.z,Tt)}}else mt.visible&&m.push(y,at,mt,B,Rt.z,null)}}const tt=y.children;for(let at=0,mt=tt.length;at<mt;at++)Ur(tt[at],N,B,H)}function Ha(y,N,B,H){const F=y.opaque,tt=y.transmissive,at=y.transparent;f.setupLightsView(B),et===!0&&Q.setGlobalState(M.clippingPlanes,B),H&&Mt.viewport(L.copy(H)),F.length>0&&Os(F,N,B),tt.length>0&&Os(tt,N,B),at.length>0&&Os(at,N,B),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function Ga(y,N,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[H.id]===void 0&&(f.state.transmissionRenderTarget[H.id]=new Mi(1,1,{generateMipmaps:!0,type:kt.has("EXT_color_buffer_half_float")||kt.has("EXT_color_buffer_float")?Cs:Nn,minFilter:mi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:te.workingColorSpace}));const tt=f.state.transmissionRenderTarget[H.id],at=H.viewport||L;tt.setSize(at.z*M.transmissionResolutionScale,at.w*M.transmissionResolutionScale);const mt=M.getRenderTarget();M.setRenderTarget(tt),M.getClearColor(Y),K=M.getClearAlpha(),K<1&&M.setClearColor(16777215,.5),M.clear(),me&&Ct.render(B);const vt=M.toneMapping;M.toneMapping=qn;const Dt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),f.setupLightsView(H),et===!0&&Q.setGlobalState(M.clippingPlanes,H),Os(y,B,H),T.updateMultisampleRenderTarget(tt),T.updateRenderTargetMipmap(tt),kt.has("WEBGL_multisampled_render_to_texture")===!1){let Lt=!1;for(let Tt=0,Jt=N.length;Tt<Jt;Tt++){const ie=N[Tt],Ee=ie.object,Me=ie.geometry,Qt=ie.material,At=ie.group;if(Qt.side===Ue&&Ee.layers.test(H.layers)){const Re=Qt.side;Qt.side=Ge,Qt.needsUpdate=!0,Va(Ee,B,H,Me,Qt,At),Qt.side=Re,Qt.needsUpdate=!0,Lt=!0}}Lt===!0&&(T.updateMultisampleRenderTarget(tt),T.updateRenderTargetMipmap(tt))}M.setRenderTarget(mt),M.setClearColor(Y,K),Dt!==void 0&&(H.viewport=Dt),M.toneMapping=vt}function Os(y,N,B){const H=N.isScene===!0?N.overrideMaterial:null;for(let F=0,tt=y.length;F<tt;F++){const at=y[F],mt=at.object,vt=at.geometry,Dt=at.group;let Lt=at.material;Lt.allowOverride===!0&&H!==null&&(Lt=H),mt.layers.test(B.layers)&&Va(mt,N,B,vt,Lt,Dt)}}function Va(y,N,B,H,F,tt){y.onBeforeRender(M,N,B,H,F,tt),y.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),F.onBeforeRender(M,N,B,H,y,tt),F.transparent===!0&&F.side===Ue&&F.forceSinglePass===!1?(F.side=Ge,F.needsUpdate=!0,M.renderBufferDirect(B,N,H,F,y,tt),F.side=Kn,F.needsUpdate=!0,M.renderBufferDirect(B,N,H,F,y,tt),F.side=Ue):M.renderBufferDirect(B,N,H,F,y,tt),y.onAfterRender(M,N,B,H,F,tt)}function zs(y,N,B){N.isScene!==!0&&(N=_e);const H=yt.get(y),F=f.state.lights,tt=f.state.shadowsArray,at=F.state.version,mt=ot.getParameters(y,F.state,tt,N,B),vt=ot.getProgramCacheKey(mt);let Dt=H.programs;H.environment=y.isMeshStandardMaterial?N.environment:null,H.fog=N.fog,H.envMap=(y.isMeshStandardMaterial?I:g).get(y.envMap||H.environment),H.envMapRotation=H.environment!==null&&y.envMap===null?N.environmentRotation:y.envMapRotation,Dt===void 0&&(y.addEventListener("dispose",Ut),Dt=new Map,H.programs=Dt);let Lt=Dt.get(vt);if(Lt!==void 0){if(H.currentProgram===Lt&&H.lightsStateVersion===at)return Xa(y,mt),Lt}else mt.uniforms=ot.getUniforms(y),y.onBeforeCompile(mt,M),Lt=ot.acquireProgram(mt,vt),Dt.set(vt,Lt),H.uniforms=mt.uniforms;const Tt=H.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Tt.clippingPlanes=Q.uniform),Xa(y,mt),H.needsLights=fh(y),H.lightsStateVersion=at,H.needsLights&&(Tt.ambientLightColor.value=F.state.ambient,Tt.lightProbe.value=F.state.probe,Tt.directionalLights.value=F.state.directional,Tt.directionalLightShadows.value=F.state.directionalShadow,Tt.spotLights.value=F.state.spot,Tt.spotLightShadows.value=F.state.spotShadow,Tt.rectAreaLights.value=F.state.rectArea,Tt.ltc_1.value=F.state.rectAreaLTC1,Tt.ltc_2.value=F.state.rectAreaLTC2,Tt.pointLights.value=F.state.point,Tt.pointLightShadows.value=F.state.pointShadow,Tt.hemisphereLights.value=F.state.hemi,Tt.directionalShadowMap.value=F.state.directionalShadowMap,Tt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Tt.spotShadowMap.value=F.state.spotShadowMap,Tt.spotLightMatrix.value=F.state.spotLightMatrix,Tt.spotLightMap.value=F.state.spotLightMap,Tt.pointShadowMap.value=F.state.pointShadowMap,Tt.pointShadowMatrix.value=F.state.pointShadowMatrix),H.currentProgram=Lt,H.uniformsList=null,Lt}function Wa(y){if(y.uniformsList===null){const N=y.currentProgram.getUniforms();y.uniformsList=gr.seqWithValue(N.seq,y.uniforms)}return y.uniformsList}function Xa(y,N){const B=yt.get(y);B.outputColorSpace=N.outputColorSpace,B.batching=N.batching,B.batchingColor=N.batchingColor,B.instancing=N.instancing,B.instancingColor=N.instancingColor,B.instancingMorph=N.instancingMorph,B.skinning=N.skinning,B.morphTargets=N.morphTargets,B.morphNormals=N.morphNormals,B.morphColors=N.morphColors,B.morphTargetsCount=N.morphTargetsCount,B.numClippingPlanes=N.numClippingPlanes,B.numIntersection=N.numClipIntersection,B.vertexAlphas=N.vertexAlphas,B.vertexTangents=N.vertexTangents,B.toneMapping=N.toneMapping}function hh(y,N,B,H,F){N.isScene!==!0&&(N=_e),T.resetTextureUnits();const tt=N.fog,at=H.isMeshStandardMaterial?N.environment:null,mt=C===null?M.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Ki,vt=(H.isMeshStandardMaterial?I:g).get(H.envMap||at),Dt=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Lt=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Tt=!!B.morphAttributes.position,Jt=!!B.morphAttributes.normal,ie=!!B.morphAttributes.color;let Ee=qn;H.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Ee=M.toneMapping);const Me=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Qt=Me!==void 0?Me.length:0,At=yt.get(H),Re=f.state.lights;if(et===!0&&(_t===!0||y!==v)){const Oe=y===v&&H.id===S;Q.setState(H,y,Oe)}let se=!1;H.version===At.__version?(At.needsLights&&At.lightsStateVersion!==Re.state.version||At.outputColorSpace!==mt||F.isBatchedMesh&&At.batching===!1||!F.isBatchedMesh&&At.batching===!0||F.isBatchedMesh&&At.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&At.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&At.instancing===!1||!F.isInstancedMesh&&At.instancing===!0||F.isSkinnedMesh&&At.skinning===!1||!F.isSkinnedMesh&&At.skinning===!0||F.isInstancedMesh&&At.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&At.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&At.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&At.instancingMorph===!1&&F.morphTexture!==null||At.envMap!==vt||H.fog===!0&&At.fog!==tt||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==Q.numPlanes||At.numIntersection!==Q.numIntersection)||At.vertexAlphas!==Dt||At.vertexTangents!==Lt||At.morphTargets!==Tt||At.morphNormals!==Jt||At.morphColors!==ie||At.toneMapping!==Ee||At.morphTargetsCount!==Qt)&&(se=!0):(se=!0,At.__version=H.version);let rn=At.currentProgram;se===!0&&(rn=zs(H,N,F));let wi=!1,Xe=!1,os=!1;const ge=rn.getUniforms(),Je=At.uniforms;if(Mt.useProgram(rn.program)&&(wi=!0,Xe=!0,os=!0),H.id!==S&&(S=H.id,Xe=!0),wi||v!==y){Mt.buffers.depth.getReversed()?(nt.copy(y.projectionMatrix),ou(nt),au(nt),ge.setValue(R,"projectionMatrix",nt)):ge.setValue(R,"projectionMatrix",y.projectionMatrix),ge.setValue(R,"viewMatrix",y.matrixWorldInverse);const ke=ge.map.cameraPosition;ke!==void 0&&ke.setValue(R,Xt.setFromMatrixPosition(y.matrixWorld)),Ht.logarithmicDepthBuffer&&ge.setValue(R,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ge.setValue(R,"isOrthographic",y.isOrthographicCamera===!0),v!==y&&(v=y,Xe=!0,os=!0)}if(F.isSkinnedMesh){ge.setOptional(R,F,"bindMatrix"),ge.setOptional(R,F,"bindMatrixInverse");const Oe=F.skeleton;Oe&&(Oe.boneTexture===null&&Oe.computeBoneTexture(),ge.setValue(R,"boneTexture",Oe.boneTexture,T))}F.isBatchedMesh&&(ge.setOptional(R,F,"batchingTexture"),ge.setValue(R,"batchingTexture",F._matricesTexture,T),ge.setOptional(R,F,"batchingIdTexture"),ge.setValue(R,"batchingIdTexture",F._indirectTexture,T),ge.setOptional(R,F,"batchingColorTexture"),F._colorsTexture!==null&&ge.setValue(R,"batchingColorTexture",F._colorsTexture,T));const je=B.morphAttributes;if((je.position!==void 0||je.normal!==void 0||je.color!==void 0)&&Pt.update(F,B,rn),(Xe||At.receiveShadow!==F.receiveShadow)&&(At.receiveShadow=F.receiveShadow,ge.setValue(R,"receiveShadow",F.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Je.envMap.value=vt,Je.flipEnvMap.value=vt.isCubeTexture&&vt.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&N.environment!==null&&(Je.envMapIntensity.value=N.environmentIntensity),Xe&&(ge.setValue(R,"toneMappingExposure",M.toneMappingExposure),At.needsLights&&uh(Je,os),tt&&H.fog===!0&&it.refreshFogUniforms(Je,tt),it.refreshMaterialUniforms(Je,H,V,j,f.state.transmissionRenderTarget[y.id]),gr.upload(R,Wa(At),Je,T)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(gr.upload(R,Wa(At),Je,T),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ge.setValue(R,"center",F.center),ge.setValue(R,"modelViewMatrix",F.modelViewMatrix),ge.setValue(R,"normalMatrix",F.normalMatrix),ge.setValue(R,"modelMatrix",F.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Oe=H.uniformsGroups;for(let ke=0,Nr=Oe.length;ke<Nr;ke++){const ii=Oe[ke];U.update(ii,rn),U.bind(ii,rn)}}return rn}function uh(y,N){y.ambientLightColor.needsUpdate=N,y.lightProbe.needsUpdate=N,y.directionalLights.needsUpdate=N,y.directionalLightShadows.needsUpdate=N,y.pointLights.needsUpdate=N,y.pointLightShadows.needsUpdate=N,y.spotLights.needsUpdate=N,y.spotLightShadows.needsUpdate=N,y.rectAreaLights.needsUpdate=N,y.hemisphereLights.needsUpdate=N}function fh(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(y,N,B){const H=yt.get(y);H.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),yt.get(y.texture).__webglTexture=N,yt.get(y.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:B,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,N){const B=yt.get(y);B.__webglFramebuffer=N,B.__useDefaultFramebuffer=N===void 0};const dh=R.createFramebuffer();this.setRenderTarget=function(y,N=0,B=0){C=y,A=N,b=B;let H=!0,F=null,tt=!1,at=!1;if(y){const vt=yt.get(y);if(vt.__useDefaultFramebuffer!==void 0)Mt.bindFramebuffer(R.FRAMEBUFFER,null),H=!1;else if(vt.__webglFramebuffer===void 0)T.setupRenderTarget(y);else if(vt.__hasExternalTextures)T.rebindTextures(y,yt.get(y.texture).__webglTexture,yt.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Tt=y.depthTexture;if(vt.__boundDepthTexture!==Tt){if(Tt!==null&&yt.has(Tt)&&(y.width!==Tt.image.width||y.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(y)}}const Dt=y.texture;(Dt.isData3DTexture||Dt.isDataArrayTexture||Dt.isCompressedArrayTexture)&&(at=!0);const Lt=yt.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Lt[N])?F=Lt[N][B]:F=Lt[N],tt=!0):y.samples>0&&T.useMultisampledRTT(y)===!1?F=yt.get(y).__webglMultisampledFramebuffer:Array.isArray(Lt)?F=Lt[B]:F=Lt,L.copy(y.viewport),k.copy(y.scissor),O=y.scissorTest}else L.copy(Et).multiplyScalar(V).floor(),k.copy(zt).multiplyScalar(V).floor(),O=ee;if(B!==0&&(F=dh),Mt.bindFramebuffer(R.FRAMEBUFFER,F)&&H&&Mt.drawBuffers(y,F),Mt.viewport(L),Mt.scissor(k),Mt.setScissorTest(O),tt){const vt=yt.get(y.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+N,vt.__webglTexture,B)}else if(at){const vt=yt.get(y.texture),Dt=N;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,vt.__webglTexture,B,Dt)}else if(y!==null&&B!==0){const vt=yt.get(y.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,vt.__webglTexture,B)}S=-1},this.readRenderTargetPixels=function(y,N,B,H,F,tt,at){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let mt=yt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&at!==void 0&&(mt=mt[at]),mt){Mt.bindFramebuffer(R.FRAMEBUFFER,mt);try{const vt=y.texture,Dt=vt.format,Lt=vt.type;if(!Ht.textureFormatReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ht.textureTypeReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=y.width-H&&B>=0&&B<=y.height-F&&R.readPixels(N,B,H,F,Ft.convert(Dt),Ft.convert(Lt),tt)}finally{const vt=C!==null?yt.get(C).__webglFramebuffer:null;Mt.bindFramebuffer(R.FRAMEBUFFER,vt)}}},this.readRenderTargetPixelsAsync=async function(y,N,B,H,F,tt,at){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let mt=yt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&at!==void 0&&(mt=mt[at]),mt)if(N>=0&&N<=y.width-H&&B>=0&&B<=y.height-F){Mt.bindFramebuffer(R.FRAMEBUFFER,mt);const vt=y.texture,Dt=vt.format,Lt=vt.type;if(!Ht.textureFormatReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ht.textureTypeReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Tt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Tt),R.bufferData(R.PIXEL_PACK_BUFFER,tt.byteLength,R.STREAM_READ),R.readPixels(N,B,H,F,Ft.convert(Dt),Ft.convert(Lt),0);const Jt=C!==null?yt.get(C).__webglFramebuffer:null;Mt.bindFramebuffer(R.FRAMEBUFFER,Jt);const ie=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await ru(R,ie,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Tt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,tt),R.deleteBuffer(Tt),R.deleteSync(ie),tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,N=null,B=0){const H=Math.pow(2,-B),F=Math.floor(y.image.width*H),tt=Math.floor(y.image.height*H),at=N!==null?N.x:0,mt=N!==null?N.y:0;T.setTexture2D(y,0),R.copyTexSubImage2D(R.TEXTURE_2D,B,0,0,at,mt,F,tt),Mt.unbindTexture()};const ph=R.createFramebuffer(),mh=R.createFramebuffer();this.copyTextureToTexture=function(y,N,B=null,H=null,F=0,tt=null){tt===null&&(F!==0?(mr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),tt=F,F=0):tt=0);let at,mt,vt,Dt,Lt,Tt,Jt,ie,Ee;const Me=y.isCompressedTexture?y.mipmaps[tt]:y.image;if(B!==null)at=B.max.x-B.min.x,mt=B.max.y-B.min.y,vt=B.isBox3?B.max.z-B.min.z:1,Dt=B.min.x,Lt=B.min.y,Tt=B.isBox3?B.min.z:0;else{const je=Math.pow(2,-F);at=Math.floor(Me.width*je),mt=Math.floor(Me.height*je),y.isDataArrayTexture?vt=Me.depth:y.isData3DTexture?vt=Math.floor(Me.depth*je):vt=1,Dt=0,Lt=0,Tt=0}H!==null?(Jt=H.x,ie=H.y,Ee=H.z):(Jt=0,ie=0,Ee=0);const Qt=Ft.convert(N.format),At=Ft.convert(N.type);let Re;N.isData3DTexture?(T.setTexture3D(N,0),Re=R.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(T.setTexture2DArray(N,0),Re=R.TEXTURE_2D_ARRAY):(T.setTexture2D(N,0),Re=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,N.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,N.unpackAlignment);const se=R.getParameter(R.UNPACK_ROW_LENGTH),rn=R.getParameter(R.UNPACK_IMAGE_HEIGHT),wi=R.getParameter(R.UNPACK_SKIP_PIXELS),Xe=R.getParameter(R.UNPACK_SKIP_ROWS),os=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,Me.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Me.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Dt),R.pixelStorei(R.UNPACK_SKIP_ROWS,Lt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Tt);const ge=y.isDataArrayTexture||y.isData3DTexture,Je=N.isDataArrayTexture||N.isData3DTexture;if(y.isDepthTexture){const je=yt.get(y),Oe=yt.get(N),ke=yt.get(je.__renderTarget),Nr=yt.get(Oe.__renderTarget);Mt.bindFramebuffer(R.READ_FRAMEBUFFER,ke.__webglFramebuffer),Mt.bindFramebuffer(R.DRAW_FRAMEBUFFER,Nr.__webglFramebuffer);for(let ii=0;ii<vt;ii++)ge&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,yt.get(y).__webglTexture,F,Tt+ii),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,yt.get(N).__webglTexture,tt,Ee+ii)),R.blitFramebuffer(Dt,Lt,at,mt,Jt,ie,at,mt,R.DEPTH_BUFFER_BIT,R.NEAREST);Mt.bindFramebuffer(R.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(F!==0||y.isRenderTargetTexture||yt.has(y)){const je=yt.get(y),Oe=yt.get(N);Mt.bindFramebuffer(R.READ_FRAMEBUFFER,ph),Mt.bindFramebuffer(R.DRAW_FRAMEBUFFER,mh);for(let ke=0;ke<vt;ke++)ge?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,je.__webglTexture,F,Tt+ke):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,je.__webglTexture,F),Je?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Oe.__webglTexture,tt,Ee+ke):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Oe.__webglTexture,tt),F!==0?R.blitFramebuffer(Dt,Lt,at,mt,Jt,ie,at,mt,R.COLOR_BUFFER_BIT,R.NEAREST):Je?R.copyTexSubImage3D(Re,tt,Jt,ie,Ee+ke,Dt,Lt,at,mt):R.copyTexSubImage2D(Re,tt,Jt,ie,Dt,Lt,at,mt);Mt.bindFramebuffer(R.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else Je?y.isDataTexture||y.isData3DTexture?R.texSubImage3D(Re,tt,Jt,ie,Ee,at,mt,vt,Qt,At,Me.data):N.isCompressedArrayTexture?R.compressedTexSubImage3D(Re,tt,Jt,ie,Ee,at,mt,vt,Qt,Me.data):R.texSubImage3D(Re,tt,Jt,ie,Ee,at,mt,vt,Qt,At,Me):y.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,tt,Jt,ie,at,mt,Qt,At,Me.data):y.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,tt,Jt,ie,Me.width,Me.height,Qt,Me.data):R.texSubImage2D(R.TEXTURE_2D,tt,Jt,ie,at,mt,Qt,At,Me);R.pixelStorei(R.UNPACK_ROW_LENGTH,se),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,rn),R.pixelStorei(R.UNPACK_SKIP_PIXELS,wi),R.pixelStorei(R.UNPACK_SKIP_ROWS,Xe),R.pixelStorei(R.UNPACK_SKIP_IMAGES,os),tt===0&&N.generateMipmaps&&R.generateMipmap(Re),Mt.unbindTexture()},this.copyTextureToTexture3D=function(y,N,B=null,H=null,F=0){return mr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,N,B,H,F)},this.initRenderTarget=function(y){yt.get(y).__webglFramebuffer===void 0&&T.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?T.setTextureCube(y,0):y.isData3DTexture?T.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?T.setTexture2DArray(y,0):T.setTexture2D(y,0),Mt.unbindTexture()},this.resetState=function(){A=0,b=0,C=null,Mt.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=te._getDrawingBufferColorSpace(t),e.unpackColorSpace=te._getUnpackColorSpace()}}const Ua="history_zombies_save_v1",la=100,X0=9.5,q0=.6,ha=5,Es=35,ua=5,ji=[{id:"foam",name:"Foam Sword",desc:"Big squishy swings. Boop!",type:"melee",cost:0,upgradeBase:30,dmg:20,cd:.38,range:3,arc:.85,knock:5,color:16739229},{id:"noodle",name:"Pool Noodle",desc:"Wide sweeping whacks that send zombies flying.",type:"melee",cost:60,upgradeBase:45,dmg:15,cd:.55,range:4,arc:1.35,knock:9,color:5099745},{id:"confetti",name:"Confetti Cannon",desc:"Party pop! Blasts a spray of confetti.",type:"burst",cost:120,upgradeBase:60,dmg:9,cd:.65,range:12,pellets:7,spread:.75,knock:3,color:16767050},{id:"bubble",name:"Bubble Blaster",desc:"Giant bubbles that pop and make zombies dizzy.",type:"bubble",cost:200,upgradeBase:80,dmg:28,cd:.95,range:14,splash:3.3,stun:2.2,knock:4,color:8317183},{id:"star",name:"Star Wand",desc:"Sparkles jump from zombie to zombie.",type:"chain",cost:300,upgradeBase:110,dmg:24,cd:.8,range:13,chain:3,knock:3,color:16769354}],ws={shambler:{id:"shambler",name:"Shambler",icon:"🧟",scale:1,hp:40,speed:2.7,damage:6,coins:5,wave:1,skin:9428090,shirt:11889878,pants:4939151,gait:6,desc:"The classic lawn wanderer. Groans a lot, walks like his shoes are on the wrong feet.",tip:"Slow and simple. Perfect for practicing your swings."},wiggler:{id:"wiggler",name:"Wiggler",icon:"🐛",scale:.62,hp:12,speed:6.6,damage:3,coins:6,wave:3,skin:13037674,shirt:16748465,pants:4939151,gait:16,desc:"A teeny tiny zombie who is very, very wiggly. Zooms around in circles.",tip:"Barely any health, but they come in packs. Use wide swings."},sprinter:{id:"sprinter",name:"Sprinter",icon:"🏃",scale:.9,hp:26,speed:5.6,damage:5,coins:8,wave:2,skin:11987549,shirt:16747068,pants:3046763,gait:12,desc:"Trained for the zombie 100-yard dash. Arms flailing, no brakes.",tip:"Fast but fragile. One good bonk stops him."},tourist:{id:"tourist",name:"Tourist",icon:"📸",scale:1,hp:36,speed:3.5,damage:5,coins:7,wave:2,skin:10870911,shirt:16736162,pants:15260846,gait:8,hat:"sunhat",extra:"camera",desc:"Came to see the White House and got zombified. Still wants a selfie.",tip:"Medium speed. Cheap coins if you are in a hurry."},cone:{id:"cone",name:"Cone-Head",icon:"🚧",scale:1.05,hp:75,speed:2.5,damage:7,coins:11,wave:3,skin:10149510,shirt:15914571,pants:5592439,gait:6,hat:"cone",desc:"Found a traffic cone and refuses to take it off. Very proud of it.",tip:"Twice as sturdy as a Shambler. Keep swinging."},reporter:{id:"reporter",name:"Reporter",icon:"🎤",scale:1,hp:34,speed:4.6,damage:5,coins:9,wave:3,skin:10477695,shirt:16732013,pants:2371661,gait:10,extra:"mic",desc:'Sprints at you shouting "any comment?" Has never once waited for an answer.',tip:"Speedy, so hit him before he gets close."},gardener:{id:"gardener",name:"Gardener",icon:"🌻",scale:1.05,hp:55,speed:2.8,damage:6,coins:9,wave:3,skin:9887352,shirt:5025616,pants:9268835,gait:6,hat:"strawhat",desc:"Tends the rose garden. Upset that you keep stomping on the flowers.",tip:"A bit tougher than average. Nothing tricky."},intern:{id:"intern",name:"Intern",icon:"📋",scale:.95,hp:30,speed:4.3,damage:5,coins:8,wave:4,skin:9689487,shirt:15658734,pants:2764613,gait:9,extra:"tie",desc:"Very eager and very unpaid. Runs everywhere because he is late for a meeting.",tip:"Fast and fragile."},chef:{id:"chef",name:"Chef",icon:"👨‍🍳",scale:1.1,hp:65,speed:3,damage:7,coins:10,wave:4,skin:10870911,shirt:16777215,pants:3817308,gait:7,hat:"chefhat",desc:"The White House kitchen is closed and he is NOT happy about it. Big hat, bigger attitude.",tip:"Steady and sturdy. His tall hat makes him easy to spot."},jumper:{id:"jumper",name:"Bouncer",icon:"🦘",scale:1,hp:42,speed:2.4,damage:7,coins:12,wave:5,skin:11593824,shirt:16750592,pants:3030906,gait:8,hat:"headband",behavior:"hop",desc:"Cannot stop bouncing. Walks a little, then boing! Leaps a long way at once.",tip:"Watch the pattern: he zooms during a hop, then pauses. Hit him when he lands."},sleepy:{id:"sleepy",name:"Sleepyhead",icon:"😴",scale:1.05,hp:70,speed:2.6,damage:8,coins:12,wave:5,skin:10215562,shirt:11771355,pants:8280002,gait:6,hat:"nightcap",behavior:"sleepy",desc:"Fell asleep standing up on the lawn. Wakes up grumpy if you get close.",tip:"Sneak up and bonk him while he snoozes, or stay away and let him sleep."},pietosser:{id:"pietosser",name:"Goo Tosser",icon:"🫐",scale:1,hp:45,speed:2,damage:5,coins:14,wave:6,skin:10346618,shirt:4149685,pants:2635155,gait:6,hat:"cap",behavior:"thrower",desc:"Lobs blueberry goo from a distance. It is harmless but very sticky.",tip:"Goo puddles slow you down. Rush him or dodge around the puddles."},balloon:{id:"balloon",name:"Balloon Buddy",icon:"🎈",scale:.95,hp:22,speed:2.2,damage:4,coins:12,wave:7,skin:11135114,shirt:16766287,pants:15037299,gait:5,hat:"balloon",behavior:"float",desc:"Floats along holding a big pink balloon. Nobody knows why he is so happy.",tip:"Barely any health and pays well. Pop him!"},bruiser:{id:"bruiser",name:"Bruiser",icon:"💪",scale:1.55,hp:150,speed:1.9,damage:12,coins:22,wave:4,skin:7328416,shirt:3906249,pants:3489899,gait:4,desc:"Huge and slow. Every stomp shakes the ground and makes dust clouds.",tip:"Keep your distance when he stomps, then swarm him with big hits."},agent:{id:"agent",name:"Suit Agent",icon:"🕶️",scale:1.15,hp:95,speed:3.3,damage:9,coins:16,wave:8,skin:9428102,shirt:1381660,pants:1381660,gait:8,hat:"shades",extra:"tie",desc:"Wears sunglasses day and night. Talks into his sleeve. Cool under pressure.",tip:"Fast AND tough. Save your best gear for him."}},Jc=[{id:"george",name:"Zombie George Washington",icon:"👑",hint:"Bonk 35 zombies, then find him snoring behind the mansion.",desc:"The Founding Father of Funk. Throws blueberry pies, stomps, and calls his zombie pals. Deep down he is a big softie.",tip:"Wear him down to fill the cure meter, then bring him the glowing Liberty Tonic.",hp:450},{id:"abe",name:"Zombie Abe Lincoln",icon:"🎩",hint:"Bonk 100 zombies and he will stride onto the lawn.",desc:"Tall, dignified, and extremely good at throwing his stovepipe hat. It flies out like a boomerang and comes right back!",tip:"Dodge sideways when the hat leaves his head. While it is away he is hatless and slow to throw again.",hp:700}],Y0=100,$0=4,Z0=.32,K0=16;function J0(n){const t=[],e=(i,s)=>{for(let r=0;r<s;r++)t.push(i)};e("shambler",3+n),n>=2&&e("sprinter",Math.floor(n/2)+1),n>=2&&e("tourist",Math.floor(n/2)),n>=3&&e("cone",Math.floor((n-1)/2)),n>=3&&e("reporter",Math.floor(n/3)),n>=3&&e("gardener",Math.floor(n/3)),n>=3&&e("wiggler",2+Math.floor(n/2)),n>=4&&e("intern",Math.max(1,n-3)),n>=4&&e("chef",Math.floor((n-2)/2)),n>=4&&e("bruiser",Math.floor((n-2)/3)),n>=5&&e("jumper",Math.floor((n-3)/2)),n>=5&&e("sleepy",Math.floor((n-3)/2)),n>=6&&e("pietosser",Math.floor((n-4)/2)),n>=7&&e("balloon",Math.floor((n-5)/2)),n>=8&&e("agent",Math.floor((n-6)/2));for(let i=t.length-1;i>0;i--){const s=Math.floor(Math.random()*(i+1));[t[i],t[s]]=[t[s],t[i]]}return t.slice(0,36)}const cr=(n,t,e)=>Math.max(t,Math.min(e,n));function wn(n,t,e,i){for(const s of e)if(s.t==="c"){let r=n.x-s.x,o=n.z-s.z,a=Math.hypot(r,o);const c=s.r+t;a<c&&(a<1e-4&&(r=1,o=0,a=1),n.x=s.x+r/a*c,n.z=s.z+o/a*c)}else{const r=cr(n.x,s.x-s.hw,s.x+s.hw),o=cr(n.z,s.z-s.hd,s.z+s.hd),a=n.x-r,c=n.z-o,h=a*a+c*c;if(h<t*t)if(h>1e-8){const l=Math.sqrt(h);n.x=r+a/l*t,n.z=o+c/l*t}else{const l=s.hw-Math.abs(n.x-s.x),u=s.hd-Math.abs(n.z-s.z);l<u?n.x=s.x+(Math.sign(n.x-s.x)||1)*(s.hw+t):n.z=s.z+(Math.sign(n.z-s.z)||1)*(s.hd+t)}}n.x=cr(n.x,i.minX+t,i.maxX-t),n.z=cr(n.z,i.minZ+t,i.maxZ-t)}function _o(){return{coins:0,owned:{foam:0},current:"foam",roster:{},kills:0,armor:0,seen:{}}}function j0(){try{const n=localStorage.getItem(Ua);if(!n)return _o();const t={..._o(),...JSON.parse(n)};return t.seen||(t.seen={}),(!t.owned||typeof t.owned.foam!="number")&&(t.owned={foam:0,...t.owned||{}}),t}catch{return _o()}}function Fn(n){try{localStorage.setItem(Ua,JSON.stringify(n))}catch{}}function Q0(){try{localStorage.removeItem(Ua)}catch{}}const Na=n=>ji.find(t=>t.id===n)||ji[0],ns=(n,t)=>typeof n.owned[t]=="number";function Hl(n,t){const e=n.owned[t]??0;return Na(t).upgradeBase*(e+1)}function tg(n,t){const e=Na(t);return ns(n,t)||n.coins<e.cost?!1:(n.coins-=e.cost,n.owned[t]=0,n.current=t,Fn(n),!0)}function eg(n,t){if(!ns(n,t))return!1;const e=n.owned[t];if(e>=ha)return!1;const i=Hl(n,t);return n.coins<i?!1:(n.coins-=i,n.owned[t]=e+1,Fn(n),!0)}function Gl(n,t){return ns(n,t)?(n.current=t,Fn(n),!0):!1}const Vl=n=>50*((n.armor||0)+1);function ng(n){const t=n.armor||0;if(t>=ua)return!1;const e=Vl(n);return n.coins<e?!1:(n.coins-=e,n.armor=t+1,Fn(n),!0)}const ig=[16735882,16767050,6211839,8257418,12615167,16751164],jc=ig.map(n=>new Fe({color:n,side:Ue})),sg=new $n(.24,.15),rg=new ti(.16),og=new Fe({color:16769354}),ag=new ue(.2,6,6),cg=new ts(.88,1,40),pe={shake:0,freeze:0,group:null,camera:null,layer:null,flashEl:null,parts:[]},lg=420,lr=new D;function hg(n,t,e){pe.group=n.fxGroup,pe.camera=n.camera,pe.layer=t,pe.flashEl=e}function Us(n){var t;if(pe.parts.length>=lg){const e=pe.parts.shift();(t=e.mesh.parent)==null||t.remove(e.mesh),e.ownMat&&e.mesh.material.dispose()}pe.group.add(n.mesh),pe.parts.push(n)}function dn(n,t=18,e=6){for(let i=0;i<t;i++){const s=new W(sg,jc[i%jc.length]);s.position.set(n.x,(n.y||0)+1.2,n.z);const r=Math.random()*Math.PI*2,o=(.4+Math.random())*e;Us({mesh:s,vx:Math.cos(r)*o,vy:3+Math.random()*5,vz:Math.sin(r)*o,life:.9+Math.random()*.6,max:1.5,grav:11,spin:(Math.random()-.5)*18,shrink:!0})}}function jn(n,t=5){for(let e=0;e<t;e++){const i=new W(rg,og);i.position.set(n.x,(n.y||0)+1.5,n.z);const s=e/t*Math.PI*2+Math.random();Us({mesh:i,vx:Math.cos(s)*4,vy:2+Math.random()*3,vz:Math.sin(s)*4,life:.45,max:.45,grav:6,spin:10,shrink:!0})}}function Si(n,t=8){const e=new Fe({color:15985362,transparent:!0,opacity:.7});for(let i=0;i<t;i++){const s=new W(ag,e);s.position.set(n.x,.2,n.z);const r=Math.random()*Math.PI*2;Us({mesh:s,vx:Math.cos(r)*3.2,vy:1+Math.random(),vz:Math.sin(r)*3.2,life:.6,max:.6,grav:0,spin:0,shrink:!0})}}function Qn(n,t,e=16777215,i=.5){const s=new Fe({color:e,transparent:!0,opacity:.85,side:Ue,depthWrite:!1}),r=new W(cg,s);r.rotation.x=-Math.PI/2,r.position.set(n.x,.12,n.z),r.scale.setScalar(.1),Us({mesh:r,life:i,max:i,grow:t,fade:!0,ownMat:!0})}function Wl(n,t=.2,e=!1){Us({mesh:n,life:t,max:t,fade:!e,shrink:e,ownMat:!e})}function Ve(n){pe.shake=Math.max(pe.shake,n)}function Qc(n){pe.freeze=Math.max(pe.freeze,n/1e3)}function Zn(n,t,e="#fff"){if(!pe.layer||!pe.camera||(lr.set(n.x,(n.y||0)+2.6,n.z).project(pe.camera),lr.z>1))return;const i=(lr.x*.5+.5)*pe.layer.clientWidth,s=(-lr.y*.5+.5)*pe.layer.clientHeight,r=document.createElement("div");r.className="ftext",r.textContent=t,r.style.left=`${i}px`,r.style.top=`${s}px`,r.style.color=e,r.style.setProperty("--tilt",`${(Math.random()-.5)*24}deg`),pe.layer.appendChild(r),setTimeout(()=>r.remove(),800)}function ei(n="#ffffff",t=150){const e=pe.flashEl;e&&(e.style.background=n,e.style.transition="none",e.style.opacity="0.75",requestAnimationFrame(()=>{e.style.transition=`opacity ${t}ms ease-out`,e.style.opacity="0"}))}function ug(n){var e;pe.shake=Math.max(0,pe.shake-n*1.4);const t=[];for(const i of pe.parts){if(i.life-=n,i.life<=0){(e=i.mesh.parent)==null||e.remove(i.mesh),i.ownMat&&i.mesh.material.dispose();continue}const s=i.life/i.max;i.vx!==void 0&&(i.mesh.position.x+=i.vx*n,i.mesh.position.y+=i.vy*n,i.mesh.position.z+=i.vz*n,i.vy-=i.grav*n,i.mesh.position.y<.05&&(i.mesh.position.y=.05,i.vy=0,i.vx*=.9,i.vz*=.9),i.mesh.rotation.x+=i.spin*n,i.mesh.rotation.z+=i.spin*.7*n),i.grow&&i.mesh.scale.setScalar(.1+i.grow*(1-s)),i.fade?i.mesh.material.opacity=s*.85:i.shrink&&i.mesh.scale.setScalar(Math.max(.01,Math.min(1,s*2))*(i.grow,1)),t.push(i)}pe.parts=t}const ye=(n,t={})=>new Sn({color:n,roughness:.85,metalness:.02,...t});function fg(n){const t=new xe;n.add(t);const e={minX:-36,maxX:36,minZ:-32,maxZ:26},i=[],s=document.createElement("canvas");s.width=s.height=256;const r=s.getContext("2d");for(let g=0;g<8;g++)r.fillStyle=g%2?"#7fd06b":"#8bda76",r.fillRect(0,g*32,256,32);const o=new Ou(s);o.wrapS=o.wrapT=xr,o.repeat.set(30,30),o.colorSpace=$e;const a=new W(new $n(600,600),new Sn({map:o,roughness:1}));a.rotation.x=-Math.PI/2,a.receiveShadow=!0,t.add(a);const c=ye(15327172,{roughness:1}),h=new W(new $n(5,40),c);h.rotation.x=-Math.PI/2,h.position.set(0,.02,6),h.receiveShadow=!0,t.add(h);const l=new W(new ts(4.5,7.2,48),c);l.rotation.x=-Math.PI/2,l.position.set(0,.025,-2),l.receiveShadow=!0,t.add(l);const u=new W(new $n(60,3),c);u.rotation.x=-Math.PI/2,u.position.set(0,.02,12),t.add(u);const p=ye(16249832,{transparent:!0}),d=ye(10134445,{transparent:!0}),_=ye(8369896,{emissive:1914192,transparent:!0}),x=[p,d,_],m=new xe;t.add(m);const f=-18,E=new W(new ne(26,6,9),p);E.position.set(0,3,f),E.castShadow=E.receiveShadow=!0,m.add(E);const w=new W(new ne(26.6,.5,9.6),d);w.position.set(0,6.25,f),w.castShadow=!0,m.add(w);for(const g of[-1,1]){const I=new W(new ne(12,4,7),p);I.position.set(g*19,2,f+.5),I.castShadow=I.receiveShadow=!0,m.add(I);const z=new W(new ne(12.5,.4,7.5),d);z.position.set(g*19,4.2,f+.5),m.add(z),i.push({t:"b",x:g*19,z:f+.5,hw:6,hd:3.5})}i.push({t:"b",x:0,z:f,hw:13,hd:4.5});for(let g=-5;g<=5;g++)if(!(Math.abs(g)<2))for(const I of[1.8,4.4]){const z=new W(new ne(1.1,1.5,.1),_);z.position.set(g*2.2,I,f+4.55),m.add(z)}const M=new W(new Vt(6,6,.6,3),p);M.rotation.set(Math.PI/2,0,Math.PI/2),M.scale.set(1,1,.3),M.position.set(0,6.4,f+6.2),m.add(M);const P=new W(new ne(9,.8,3.4),p);P.position.set(0,5.4,f+6),P.castShadow=!0,m.add(P);for(let g=0;g<6;g++){const I=new W(new Vt(.3,.34,5,12),p);I.position.set(-3.75+g*1.5,2.5,f+7.3),I.castShadow=!0,m.add(I)}const A=new W(new ne(9.5,.3,3.6),ye(14472123));A.position.set(0,.15,f+6),m.add(A);const b=new W(new ne(1.6,2.6,.1),ye(4878245,{transparent:!0}));b.position.set(0,1.6,f+4.55),m.add(b),x.push(b.material);const C=new W(new Vt(.06,.06,4,6),ye(13421772));C.position.set(0,8.5,f),m.add(C);const S=new xe;[13843259,16777215,13843259,16777215].forEach((g,I)=>{const z=new W(new ne(1.6,.25,.04),ye(g));z.position.set(.85,-I*.25,0),S.add(z)});const L=new W(new ne(.7,.5,.05),ye(2969512));L.position.set(.35,-.12,.01),S.add(L),S.position.set(.05,10.2,f),m.add(S);const k=0,O=-2,Y=new W(new Vt(2.6,2.8,.7,24),ye(14144456));Y.position.set(k,.35,O),Y.castShadow=Y.receiveShadow=!0,t.add(Y);const K=new W(new Vt(2.3,2.3,.05,24),new Sn({color:6277375,emissive:1131622,roughness:.2}));K.position.set(k,.72,O),t.add(K);const q=new W(new Yn(.35,2.6,10),ye(11069695,{transparent:!0,opacity:.75,emissive:2263210}));q.position.set(k,1.9,O),t.add(q),i.push({t:"c",x:k,z:O,r:2.9});const j=ye(3120714,{roughness:1}),V=(g,I,z,Z)=>{const G=new W(new ne(z*2,1.3,Z*2),j);G.position.set(g,.65,I),G.castShadow=G.receiveShadow=!0,t.add(G),i.push({t:"b",x:g,z:I,hw:z,hd:Z})};V(-15,4,5,.9),V(15,4,5,.9),V(-24,-8,.9,4),V(24,-8,.9,4);const st=new W(new ne(6,.4,4),ye(7031343));st.position.set(-22,.2,12),st.receiveShadow=!0,t.add(st);const dt=[16735882,16767050,16777215,12615167];for(let g=0;g<18;g++){const I=new W(new ue(.22,8,8),ye(dt[g%4],{roughness:.6}));I.position.set(-24.5+g%6*1,.65,10.6+Math.floor(g/6)*1.3),t.add(I)}i.push({t:"b",x:-22,z:12,hw:3,hd:2});const Et=ye(8016432),zt=[ye(3054405),ye(4174678)],ee=(g,I,z=1)=>{const Z=new W(new Vt(.35*z,.5*z,3*z,8),Et);Z.position.set(g,1.5*z,I),Z.castShadow=!0,t.add(Z);for(let G=0;G<3;G++){const ot=new W(new ue((1.9-G*.3)*z,12,10),zt[G%2]);ot.position.set(g+(G-1)*.3*z,(3.6+G*.9)*z,I+G%2*.3),ot.castShadow=!0,t.add(ot)}i.push({t:"c",x:g,z:I,r:.7*z})};[[-30,18],[30,18],[-31,-4],[31,-4],[-10,-26],[10,-26],[-28,-24],[28,-24],[-12,20],[12,20],[-32,8],[32,8]].forEach(([g,I])=>ee(g,I,1+Math.abs(g*I%3)*.08)),ee(-6,-26,1.2),ee(6,-26,1.2);const $=[],et=(g,I,z,Z,G)=>{const ot=Math.hypot(z-g,Z-I),it=Math.floor(ot/1.6);for(let Q=0;Q<=it;Q++){const pt=Q/it,Ct=g+(z-g)*pt,Pt=I+(Z-I)*pt;G&&G(Ct,Pt)||$.push([Ct,Pt])}const ft=new W(new ne(Math.abs(z-g)||.1,.12,Math.abs(Z-I)||.1),ye(2237739));ft.position.set((g+z)/2,1.5,(I+Z)/2),t.add(ft);const qt=ft.clone();qt.position.y=.6,t.add(qt)},{minX:_t,maxX:nt,minZ:wt,maxZ:Xt}=e,Rt=g=>Math.abs(g)<4;et(_t,wt,nt,wt),et(_t,Xt,nt,Xt,g=>Rt(g)),et(_t,wt,_t,Xt),et(nt,wt,nt,Xt);const _e=new Vt(.08,.08,2,6),me=new Yn(.14,.3,6),Bt=new vc(_e,ye(2237739),$.length),R=new vc(me,ye(16765514,{metalness:.5,roughness:.4}),$.length),Ce=new ce;$.forEach(([g,I],z)=>{Ce.makeTranslation(g,1,I),Bt.setMatrixAt(z,Ce),Ce.makeTranslation(g,2.1,I),R.setMatrixAt(z,Ce)}),Bt.castShadow=!0,t.add(Bt,R);const kt=new xe,Ht=new W(new Vt(2.4,4.2,70,4),ye(16447728,{roughness:.6}));Ht.rotation.y=Math.PI/4,Ht.position.y=35,kt.add(Ht);const Mt=new W(new Yn(2.5,6,4),ye(16447728));Mt.rotation.y=Math.PI/4,Mt.position.y=73,kt.add(Mt),kt.position.set(-30,0,-135),t.add(kt);const he=new Fe({color:16777215,transparent:!0,opacity:.9,fog:!1}),yt=[];for(let g=0;g<9;g++){const I=new xe;for(let z=0;z<4;z++){const Z=new W(new ue(5+Math.random()*4,10,8),he);Z.position.set(z*6-9,Math.random()*2,Math.random()*3),Z.scale.y=.6,I.add(Z)}I.position.set(-140+g*36,55+g%3*10,-120-g%2*40),t.add(I),yt.push(I)}const T=[[-34,22],[34,22],[-34,0],[34,0],[-20,25],[20,25],[-33,-30],[33,-30],[0,-30]].map(([g,I])=>({x:g,z:I}));return{name:"The White House",bounds:e,obstacles:i,spawnPoints:T,playerStart:{x:0,z:18},bossSpawn:{x:0,z:-27},bossName:"Zombie George Washington",update(g,I,z){const G=g.z<f-3&&Math.abs(g.x)<28?.4:1;for(const ot of x)ot.opacity+=(G-ot.opacity)*Math.min(1,I*6),ot.transparent=ot.opacity<.99,ot.needsUpdate=!1;S.rotation.y=Math.sin(z*3)*.25,S.rotation.z=Math.sin(z*4.3)*.06,q.scale.y=1+Math.sin(z*6)*.12,yt.forEach((ot,it)=>{ot.position.x+=I*(1.2+it%3*.4),ot.position.x>190&&(ot.position.x=-190)})}}}const It=(n,t={})=>new Sn({color:n,roughness:.6,metalness:.05,...t});function Ns(n){const t=new xe,e=new xe;t.add(e);const i=It(n.skin),s=It(n.shirt),r=It(n.pants),o=It(2829107),a=new W(new Is(.75,20),new Fe({color:0,transparent:!0,opacity:.22,depthWrite:!1}));a.rotation.x=-Math.PI/2,a.position.y=.03,t.add(a);const c=b=>{const C=new xe;C.position.set(b,.8,0);const S=new W(new Vt(.15,.13,.72,10),r);S.position.y=-.36,S.castShadow=!0,C.add(S);const v=new W(new ue(.2,10,8),o);return v.scale.set(1,.6,1.4),v.position.set(0,-.74,.07),C.add(v),e.add(C),C},h=c(.2),l=c(-.2),u=new xe;u.position.y=1.2,e.add(u);const p=new W(new Vt(.4,.36,.8,12),s);p.castShadow=!0,u.add(p);const d=b=>{const C=new xe;C.position.set(b,1.5,0);const S=new W(new Vt(.11,.1,.68,8),s);S.position.y=-.34,S.castShadow=!0,C.add(S);const v=new W(new ue(.13,8,8),i);return v.position.y=-.72,C.add(v),e.add(C),C},_=d(.52),x=d(-.52),m=new xe;m.position.y=2,e.add(m);const f=new W(new ue(.44,16,14),i);f.castShadow=!0,m.add(f);const E=It(16777215,{roughness:.3}),w=It(1118481,{roughness:.3}),M=[];for(const b of[-1,1]){const C=new W(new ue(n.zombie?.14:.1,12,10),E);C.position.set(b*.17,.07,.34),m.add(C);const S=new W(new ue(n.zombie?.065:.055,8,8),w);S.position.set(0,0,n.zombie?.115:.085),C.add(S),M.push(S)}const P=new W(new ne(n.zombie?.26:.2,n.zombie?.1:.05,.06),It(4857130));if(P.position.set(0,-.17,.4),m.add(P),n.zombie){const b=new W(new ne(.06,.06,.05),E);b.position.set(.06,-.12,.43),m.add(b)}const A=Array.isArray(n.hat)?n.hat:n.hat?[n.hat]:[];for(const b of A)dg(m,b);return n.extra&&pg(u,n.extra),t.traverse(b=>{b.isMesh&&(b.castShadow=!!n.cast)}),t.scale.setScalar(n.scale||1),{root:t,rig:e,head:m,body:u,armL:_,armR:x,legL:h,legR:l,pupils:M,disc:a,skinMat:i,gait:n.gait||6,zombie:!!n.zombie,mouth:P}}function Xl(){const n=new xe;n.name="stovepipe";const t=It(1381659,{roughness:.4}),e=new W(new Vt(.36,.38,1,16),t);e.position.y=.55,e.castShadow=!0,n.add(e);const i=new W(new Vt(.65,.65,.07,20),t);i.position.y=.05,n.add(i);const s=new W(new Vt(.39,.39,.16,16),It(9055034));return s.position.y=.2,n.add(s),n.position.y=.4,n}function dg(n,t){if(t==="stovepipe")n.add(Xl());else if(t==="beard"){const e=new W(new ne(.46,.4,.22),It(1776411,{roughness:1}));e.position.set(0,-.34,.28),n.add(e)}else if(t==="chefhat"){const e=It(16777215,{roughness:.8}),i=new W(new Vt(.4,.4,.25,14),e);i.position.y=.48,n.add(i);for(const[s,r]of[[0,0],[.22,.05],[-.22,.05],[0,-.2]]){const o=new W(new ue(.3,10,8),e);o.position.set(s,.85,r),n.add(o)}}else if(t==="strawhat"){const e=new W(new Vt(.75,.75,.04,20),It(14267482));e.position.y=.36,n.add(e);const i=new W(new Vt(.34,.4,.3,14),It(14267482));i.position.y=.52,n.add(i);const s=new W(new Vt(.41,.41,.07,14),It(3903291));s.position.y=.42,n.add(s)}else if(t==="headband"){const e=new W(new Un(.44,.06,6,20),It(16723285));e.rotation.x=Math.PI/2,e.position.y=.2,n.add(e);const i=new W(new ue(.1,8,8),It(16723285));i.position.set(0,.2,-.46),n.add(i)}else if(t==="balloon"){const e=new W(new Vt(.015,.015,1.1,4),It(16777215));e.position.y=.95,n.add(e);const i=new W(new ue(.55,14,12),It(16735882,{roughness:.15,emissive:5574946}));i.scale.y=1.2,i.position.y=1.9,n.add(i)}else if(t==="cap"){const e=new W(new ue(.46,14,10,0,Math.PI*2,0,Math.PI/2),It(3111935));e.position.y=.1,n.add(e);const i=new W(new ne(.5,.05,.4),It(2053568));i.position.set(0,.17,.5),n.add(i)}else if(t==="nightcap"){const e=new W(new Yn(.42,.9,12),It(9795021));e.position.set(0,.6,-.1),e.rotation.x=-.35,n.add(e);const i=new W(new ue(.14,8,8),It(16777215));i.position.set(0,.95,-.42),n.add(i)}else if(t==="shades"){const e=new W(new ne(.62,.14,.1),It(0,{roughness:.2}));e.position.set(0,.08,.4),n.add(e)}else if(t==="cone"){const e=new W(new Yn(.34,.75,14),It(16742938));e.position.y=.72,e.castShadow=!0,n.add(e);const i=new W(new Un(.22,.045,6,16),It(16777215));i.rotation.x=Math.PI/2,i.position.y=.62,n.add(i);const s=new W(new Vt(.42,.42,.06,14),It(16742938));s.position.y=.37,n.add(s)}else if(t==="sunhat"){const e=new W(new Vt(.72,.72,.05,20),It(16179338));e.position.y=.36,n.add(e);const i=new W(new ue(.4,14,10,0,Math.PI*2,0,Math.PI/2),It(16179338));i.position.y=.36,n.add(i);const s=new W(new Un(.4,.04,6,16),It(16736162));s.rotation.x=Math.PI/2,s.position.y=.42,n.add(s)}else if(t==="wig"){const e=It(16447730,{roughness:.9}),i=new W(new ue(.5,14,12),e);i.position.set(0,.1,-.08),n.add(i);for(const r of[-1,1])for(let o=0;o<2;o++){const a=new W(new ue(.16,8,8),e);a.position.set(r*.46,-.05-o*.2,0),n.add(a)}const s=new W(new ue(.1,8,8),It(1118481));s.position.set(0,-.25,-.5),n.add(s)}else if(t==="tricorn"){const e=new W(new Vt(.66,.66,.16,3),It(1909568));e.position.y=.56,e.rotation.y=Math.PI/6,e.castShadow=!0,n.add(e);const i=new W(new Vt(.68,.68,.04,3),It(16765514));i.position.y=.5,i.rotation.y=Math.PI/6,n.add(i);const s=new W(new ue(.32,10,8),It(1909568));s.position.y=.55,n.add(s)}else if(t==="helmet"){const e=new W(new ue(.5,16,12,0,Math.PI*2,0,Math.PI/2),It(16765503,{roughness:.35}));e.position.y=.07,e.scale.set(1,.95,1.02),e.castShadow=!0,n.add(e);const i=new W(new ti(.13),It(16726876,{emissive:5574946}));i.position.set(0,.36,.34),n.add(i)}}function pg(n,t){if(t==="mic"){const e=new W(new Vt(.04,.04,.4,6),It(2236962));e.position.set(-.3,.1,.45),e.rotation.z=.3,n.add(e);const i=new W(new ue(.11,8,8),It(16732013,{emissive:5574946}));i.position.set(-.36,.34,.45),n.add(i)}else if(t==="camera"){const e=new W(new ne(.34,.24,.2),It(2236962));e.position.set(0,-.05,.42),n.add(e);const i=new W(new Vt(.07,.07,.1,10),It(8965375,{emissive:2245734}));i.rotation.x=Math.PI/2,i.position.set(0,-.05,.54),n.add(i)}else if(t==="tie"){const e=new W(new ne(.1,.5,.05),It(14039610));e.position.set(0,.05,.4),n.add(e)}else if(t==="cape"){const e=new W(new ne(.8,1,.06),It(16726876,{roughness:.5}));e.position.set(0,-.05,-.42),e.rotation.x=.12,e.castShadow=!0,n.add(e)}else if(t==="coat"){const e=new W(new ne(.12,.8,.05),It(16765514));e.position.set(0,0,.4),n.add(e);const i=new W(new ne(.7,.5,.08),It(2047375));i.position.set(0,-.5,-.32),n.add(i)}}function Ze(n,t,e){const i=t*n.gait,s=Math.sin(i);n.legL.rotation.x=s*.85*e,n.legR.rotation.x=-s*.85*e,n.zombie?(n.armL.rotation.x=-1.35+Math.sin(i*.5)*.2,n.armR.rotation.x=-1.35+Math.cos(i*.5)*.2,n.armL.rotation.z=.15,n.armR.rotation.z=-.15):(n.armL.rotation.x=-s*.8*e,n.armR.rotation.x=s*.8*e),n.rig.position.y=Math.abs(s)*.09*e,n.rig.rotation.z=Math.sin(i*.5)*.1*e,n.body.scale.y=1+Math.sin(t*2.3)*.02,n.head.rotation.z=Math.sin(i*.5)*.08*e;const r=Math.sin(t*3.7)*.03;n.pupils[0].position.x=r,n.pupils[1].position.x=-r*.6}const tn=(n,t={})=>new Sn({color:n,roughness:.5,metalness:.05,...t});function mg(n,t){const e=Na(n);return{...e,dmg:e.dmg*(1+.28*t),cd:e.cd*(1-.07*t),range:e.range*(1+.07*t),splash:e.splash?e.splash*(1+.05*t):0,pellets:e.pellets?e.pellets+Math.floor(t/2):0,chain:e.chain?e.chain+Math.floor(t/2):0}}function gg(n,t=0){const e=new xe,i=t*.12;if(n==="foam"){const s=new W(new Vt(.07,.07,.4,8),tn(9132587));s.rotation.x=Math.PI/2,s.position.z=.1,e.add(s);const r=new W(new ne(.5,.1,.12),tn(16765514));r.position.z=.3,e.add(r);const o=new W(new Sr(.11,1.2,4,10),tn(16739229,{emissive:16722544,emissiveIntensity:i}));o.rotation.x=Math.PI/2,o.position.z=1,e.add(o)}else if(n==="noodle"){const s=new W(new Sr(.12,2,4,10),tn(5099745,{emissive:47316,emissiveIntensity:i}));s.rotation.x=Math.PI/2,s.position.z=1.1,e.add(s);const r=new W(new Un(.09,.03,6,10),tn(1740704));r.position.z=2.2,e.add(r)}else if(n==="confetti"){const s=new W(new Vt(.2,.26,.9,12),tn(16735882));s.rotation.x=Math.PI/2,s.position.z=.5,e.add(s);const r=new W(new Yn(.42,.45,12,1,!0),tn(16767050,{side:Ue,emissive:16755200,emissiveIntensity:i}));r.rotation.x=-Math.PI/2,r.position.z=1.15,e.add(r);const o=new W(new Un(.25,.04,6,14),tn(6211839));o.position.z=.4,e.add(o)}else if(n==="bubble"){const s=new W(new ue(.3,12,10),tn(2872262));s.position.z=.3,e.add(s);const r=new W(new Un(.36,.05,8,20),tn(16777215,{emissive:6741503,emissiveIntensity:i+.2}));r.position.z=.9,e.add(r);const o=new W(new Is(.34,16),new Fe({color:10217727,transparent:!0,opacity:.4,side:Ue}));o.position.z=.9,e.add(o)}else{const s=new W(new Vt(.05,.06,1.3,8),tn(12615167));s.rotation.x=Math.PI/2,s.position.z=.6,e.add(s);const r=new W(new ti(.3),tn(16769354,{emissive:16761856,emissiveIntensity:.6+i}));r.position.z=1.35,r.scale.set(1,1,.5),e.add(r)}return e.scale.setScalar(1+t*.05),e}const ql=n=>new D(Math.sin(n),0,Math.cos(n));function _g(n,t,e,i){if(n.attackCd>0)return!1;const s=mg(t,e);return n.attackCd=s.cd,n.swingDur=Math.min(.32,s.cd*.8),n.swingT=n.swingDur,n.swingKind=s.type==="melee"?"melee":"recoil",s.type==="melee"?xg(n,s,i):s.type==="burst"?vg(n,s,i):s.type==="bubble"?Mg(n,s,i):yg(n,s,i),!0}function xg(n,t,e){const i=n.mesh.position,s=ql(n.yaw),r=n.yaw-Math.PI/2,o=new ts(.7,t.range,28,1,r-t.arc,t.arc*2),a=new W(o,new Fe({color:t.color,transparent:!0,opacity:.6,side:Ue,depthWrite:!1}));a.rotation.x=-Math.PI/2,a.position.set(i.x,.2,i.z),e.fxGroup.add(a),Wl(a,.22);const c=Math.cos(t.arc+.15);for(const h of e.targets()){if(!h.alive)continue;const l=h.mesh.position.x-i.x,u=h.mesh.position.z-i.z,p=Math.hypot(l,u);p-h.radius>t.range||(p<.001?1:(l*s.x+u*s.z)/p)<c&&p>h.radius+.6||e.hit(h,t.dmg,i,t.knock)}}function vg(n,t,e){const s=n.mesh.position,r=[16735882,16767050,6211839,8257418,12615167];for(let o=0;o<t.pellets;o++){const a=t.pellets===1?0:(o/(t.pellets-1)-.5)*t.spread,c=n.yaw+a+(Math.random()-.5)*.08,h=new W(new ne(.28,.06,.2),new Fe({color:r[o%r.length]}));h.position.set(s.x+Math.sin(c)*1.3,1.3,s.z+Math.cos(c)*1.3),e.fxGroup.add(h),e.projectiles.push({kind:"pellet",mesh:h,vx:Math.sin(c)*18,vz:Math.cos(c)*18,life:t.range/18,dmg:t.dmg,knock:t.knock,spin:20+Math.random()*10})}dn(new D(s.x+Math.sin(n.yaw)*1.4,0,s.z+Math.cos(n.yaw)*1.4),10,4)}function Mg(n,t,e){const i=n.mesh.position,s=9,r=new W(new ue(.6,16,14),new Sn({color:10217727,transparent:!0,opacity:.55,emissive:3854591,emissiveIntensity:.35,roughness:.1}));r.position.set(i.x+Math.sin(n.yaw)*1.3,1.4,i.z+Math.cos(n.yaw)*1.3),e.fxGroup.add(r),e.projectiles.push({kind:"bubble",mesh:r,vx:Math.sin(n.yaw)*s,vz:Math.cos(n.yaw)*s,life:t.range/s,dmg:t.dmg,knock:t.knock,splash:t.splash,stun:t.stun,age:0})}function yg(n,t,e){const i=n.mesh.position,s=ql(n.yaw),r=new D(i.x+s.x*1.2,1.4,i.z+s.z*1.2),o=e.targets().filter(d=>d.alive);let a=null,c=t.range;for(const d of o){const _=d.mesh.position.x-i.x,x=d.mesh.position.z-i.z,m=Math.hypot(_,x);m-d.radius>t.range||(_*s.x+x*s.z)/(m||1)<.35||m<c&&(c=m,a=d)}if(!a){const d=r.clone().addScaledVector(s,6);tl(r,d,e);return}const h=new Set([a]);let l=a,u=r,p=t.dmg;for(let d=0;d<=t.chain;d++){const _=l.mesh.position.clone();_.y=1.3,tl(u,_,e),e.hit(l,p,i,t.knock),jn(l.mesh.position,3),p*=.8,u=_;let x=null,m=5.5;for(const f of o){if(h.has(f)||!f.alive)continue;const E=f.mesh.position.distanceTo(l.mesh.position);E<m&&(m=E,x=f)}if(!x)break;h.add(x),l=x}}const Sg=new ti(.17);function tl(n,t,e){const i=n.distanceTo(t),s=Math.max(2,Math.floor(i/.6));for(let r=0;r<=s;r++){const o=new W(Sg,new Fe({color:r%2?16769354:16777215}));o.position.lerpVectors(n,t,r/s),o.position.x+=(Math.random()-.5)*.3,o.position.y+=(Math.random()-.5)*.3,o.position.z+=(Math.random()-.5)*.3,o.rotation.set(Math.random()*3,Math.random()*3,0),e.fxGroup.add(o),Wl(o,.22+r*.012)}}function Eg(n,t,e){var s,r,o;const i=[];for(const a of n){a.life-=e,a.mesh.position.x+=a.vx*e,a.mesh.position.z+=a.vz*e,a.kind==="pellet"?(a.mesh.rotation.x+=a.spin*e,a.mesh.rotation.z+=a.spin*e):(a.age+=e,a.mesh.position.y=1.4+Math.sin(a.age*6)*.15,a.mesh.scale.setScalar(1+Math.sin(a.age*9)*.06+a.age*.35));const c=a.kind==="bubble"?.9*a.mesh.scale.x:.55;let h=null;for(const l of t.targets()){if(!l.alive)continue;if(Math.hypot(l.mesh.position.x-a.mesh.position.x,l.mesh.position.z-a.mesh.position.z)<l.radius+c){h=l;break}}h||a.life<=0?(a.kind==="bubble"?wg(a,t):h&&(t.hit(h,a.dmg,a.mesh.position,a.knock),jn(a.mesh.position,2)),(s=a.mesh.parent)==null||s.remove(a.mesh),(o=(r=a.mesh.material).dispose)==null||o.call(r)):i.push(a)}n.length=0,n.push(...i)}function wg(n,t){const e=n.mesh.position.clone();Qn(e,n.splash*.9,10217727,.45),dn(e.clone().setY(0),14,5),Si(e,5);for(const i of t.targets()){if(!i.alive)continue;const s=Math.hypot(i.mesh.position.x-e.x,i.mesh.position.z-e.z);if(s<=n.splash+i.radius){const r=1-Math.min(1,s/(n.splash+i.radius))*.4;t.hit(i,n.dmg*r,e,n.knock,{stun:n.stun})}}}function Tg(n,t){const e=Ns({skin:16765608,shirt:3113215,pants:4013419,hat:"helmet",extra:"cape",scale:1.15,gait:11,cast:!0});e.root.position.set(t.x,0,t.z);const i=new W(new ts(.85,1.05,32),new Fe({color:3113215,transparent:!0,opacity:.8,depthWrite:!1,side:Ue}));i.rotation.x=-Math.PI/2,i.position.y=.06,e.root.add(i);const s=new xe;return s.position.set(-.55,1.35,.15),e.rig.add(s),n.add(e.root),{ch:e,mesh:e.root,pivot:s,weaponMesh:null,weaponId:"",hp:la,hpMax:la,yaw:0,attackCd:0,swingT:0,swingDur:.2,swingKind:"melee",invuln:0,moving:0,radius:.6}}function bg(n,t,e){n.weaponMesh&&n.pivot.remove(n.weaponMesh),n.weaponMesh=gg(t,e),n.pivot.add(n.weaponMesh),n.weaponId=t,n.weaponLevel=e}const el=n=>1-(1-n)*(1-n);function Fa(n,t,e){const i=n.ch;if(Ze(i,t,n.moving),i.armR.rotation.x=-1.3,i.armR.rotation.z=0,n.pivot.rotation.set(0,0,0),n.pivot.position.set(-.55,1.35,.15),n.swingT>0){n.swingT=Math.max(0,n.swingT-e);const s=1-n.swingT/n.swingDur;n.swingKind==="melee"?(n.pivot.rotation.y=-1.1+el(s)*2.7,i.rig.rotation.y=(.5-el(s))*.5,i.armR.rotation.y=n.pivot.rotation.y*.6):(n.pivot.position.z=.15-Math.sin(s*Math.PI)*.35,n.pivot.rotation.x=-Math.sin(s*Math.PI)*.3)}else i.rig.rotation.y=0,i.armR.rotation.y=0,n.pivot.rotation.y=-.15+Math.sin(t*2)*.03;i.root.visible=!(n.invuln>0&&Math.floor(t*20)%2===0),i.body.rotation.x=-n.moving*.12}const Ag=[11583173,9489145,16766287,16747109,13538264];function Cg(n,t){var a;const e=n.ch;for(const c of n.armorParts||[])(a=c.parent)==null||a.remove(c);if(n.armorParts=[],t<=0)return;const i=Ag[Math.min(t,5)-1],s=new Sn({color:i,roughness:.25,metalness:.6,emissive:i,emissiveIntensity:.12}),r=(c,h)=>{c.add(h),n.armorParts.push(h)},o=new W(new Vt(.45,.41,.55,12),s);if(o.position.y=.1,r(e.body,o),t>=2)for(const c of[e.armL,e.armR]){const h=new W(new ue(.22,10,8),s);h.position.y=.02,r(c,h)}if(t>=3)for(const c of[e.legL,e.legR]){const h=new W(new Vt(.19,.17,.3,10),s);h.position.y=-.5,r(c,h)}if(t>=4){const c=new W(new ti(.16),new Sn({color:16769354,emissive:16761856,emissiveIntensity:.8}));c.position.set(0,.15,.46),c.scale.z=.4,r(e.body,c)}if(t>=5){const c=new W(new Un(.5,.05,6,20),new Fe({color:16769354}));c.rotation.x=Math.PI/2,c.position.y=-.3,r(e.body,c)}}function Rg(n){const t=new Du,e=new Wt(10475775);t.background=e,t.fog=new ba(e,110,260);const i=new nn(50,1,.1,400),s=new W0({antialias:!1,powerPreference:"high-performance"});s.setPixelRatio(1),s.shadowMap.enabled=!0,s.shadowMap.type=ga,n.appendChild(s.domElement),t.add(new tf(16777215,9420666,1)),t.add(new rf(16777215,.35));const r=new sf(16774102,1.5);r.position.set(24,46,30),r.castShadow=!0,r.shadow.mapSize.set(1024,1024);const o=r.shadow.camera;o.left=-30,o.right=30,o.top=30,o.bottom=-30,o.near=1,o.far=140,r.shadow.bias=-6e-4,t.add(r),t.add(r.target);const a=new xe;t.add(a);const c=new xe;t.add(c);const h={focus:new D(0,0,16),zoom:1,zoomTarget:1,yaw:0,userZoom:1,offset:new D(0,27,10)};function l(){const u=n.clientWidth||window.innerWidth,p=n.clientHeight||window.innerHeight;i.aspect=u/Math.max(p,1),i.updateProjectionMatrix(),s.setSize(u,p,!1)}return l(),window.addEventListener("resize",l),{scene:t,camera:i,renderer:s,entities:a,fxGroup:c,cam:h,sun:r}}const ps=new D,Pg=new D(0,1,0);function Lg(n,t,e,i,s=5){const{cam:r,camera:o}=n,a=Math.min(1,e*s);r.focus.lerp(t,a),r.zoom+=(r.zoomTarget-r.zoom)*Math.min(1,e*3),ps.copy(r.offset).applyAxisAngle(Pg,r.yaw).multiplyScalar(r.zoom*r.userZoom).add(r.focus),n.sun.position.set(r.focus.x+24,46,r.focus.z+30),n.sun.target.position.set(r.focus.x,0,r.focus.z),i>.001&&(ps.x+=(Math.random()-.5)*i*2,ps.y+=(Math.random()-.5)*i*2,ps.z+=(Math.random()-.5)*i*2),o.position.copy(ps),o.lookAt(r.focus.x,1,r.focus.z)}const Yt=n=>document.getElementById(n),Yl={foam:"🗡️",noodle:"🍜",confetti:"🎉",bubble:"🫧",star:"🪄"};function Dg(){return{coins:Yt("stat-coins"),hp:Yt("stat-hp"),wave:Yt("stat-wave"),bonks:Yt("stat-bonks"),armor:Yt("stat-armor"),team:Yt("stat-team"),boss:Yt("boss"),bossName:Yt("boss-name"),bossHp:Yt("boss-hp").firstElementChild,bossCure:Yt("boss-cure").firstElementChild,toast:Yt("toast"),banner:Yt("banner"),titlecard:Yt("titlecard"),tc1:Yt("tc1"),tc2:Yt("tc2"),compass:Yt("compass"),compassArrow:Yt("compass-arrow"),compassDist:Yt("compass-dist"),hotbar:Yt("hotbar"),layer:Yt("hud"),flash:Yt("flash"),menu:Yt("menu-overlay"),shop:Yt("shop-overlay"),shopGrid:Yt("shop-grid"),shopCoins:Yt("shop-coins"),catalog:Yt("catalog-overlay"),catGrid:Yt("cat-grid"),catCount:Yt("cat-count"),btnCatalogClose:Yt("btn-catalog-close"),over:Yt("over-overlay"),win:Yt("win-overlay"),btnStart:Yt("btn-start"),btnReset:Yt("btn-reset"),btnShopClose:Yt("btn-shop-close"),btnRetry:Yt("btn-retry"),btnKeep:Yt("btn-keep")}}let nl=0,il=0;function pn(n,t,e=1800){n.banner.textContent=t,n.banner.classList.add("show"),clearTimeout(nl),nl=setTimeout(()=>n.banner.classList.remove("show"),e)}function Ei(n,t,e=3200){n.toast.textContent=t,n.toast.classList.add("show"),clearTimeout(il),il=setTimeout(()=>n.toast.classList.remove("show"),e)}function is(n,t,e,i){n.tc1.textContent=t,n.tc2.textContent=e,n.titlecard.classList.toggle("show",i),n.tc1.style.animation="none",n.tc1.offsetWidth,n.tc1.style.animation=""}function ss(n,t){n.classList.toggle("show",t)}function Ig(n,t,e,i,s){n.coins.textContent=String(t.coins),n.hp.style.width=`${Math.max(0,e.hp/e.hpMax*100)}%`,n.wave.textContent=String(i),n.bonks.textContent=s?"Done!":`${Math.min(t.kills,Es)}/${Es}`,n.armor.textContent=String(t.armor||0),n.team.textContent=s?"You + George":"You"}function Er(n,t,e=1,i=0,s=""){n.boss.classList.toggle("show",t),s&&(n.bossName.textContent=s),n.bossHp.style.width=`${Math.max(0,e*100)}%`,n.bossCure.style.width=`${Math.min(100,i*100)}%`}function Ug(n,t,e){n.hotbar.innerHTML="",ji.forEach((r,o)=>{const a=document.createElement("div"),c=ns(t,r.id);a.className=`slot${c?"":" locked"}${t.current===r.id?" active":""}`,a.innerHTML=`<span class="key">${o+1}</span><span class="ico">${Yl[r.id]}</span><span>${r.name.split(" ")[0]}</span>${c?`<span class="lv">Lv ${t.owned[r.id]}</span>`:""}`,a.addEventListener("click",()=>e(o)),n.hotbar.appendChild(a)});const i=document.createElement("button");i.type="button",i.className="big green",i.textContent="Catalog (C)",i.addEventListener("click",()=>e(-2)),n.hotbar.appendChild(i);const s=document.createElement("button");s.type="button",s.id="btn-shop",s.className="big blue",s.textContent="Workshop (B)",s.addEventListener("click",()=>e(-1)),n.hotbar.appendChild(s)}function $l(n,t,e){n.shopCoins.textContent=String(t.coins),n.shopGrid.innerHTML="";{const i=t.armor||0,s=document.createElement("div");s.className="item";const r=Array.from({length:ua},(c,h)=>`<i class="${h<i?"on":""}"></i>`).join("");s.innerHTML=`<h3><span>🛡️ Shiny Armor</span><span>Lv ${i}</span></h3><p>Take less damage and get extra hearts. Each level adds a new piece!</p><div class="pips">${r}</div>`;const o=document.createElement("div");o.className="row";const a=document.createElement("button");if(a.className="big",i>=ua)a.textContent="Maxed!",a.disabled=!0;else{const c=Vl(t);a.textContent=`Upgrade (${c})`,a.disabled=t.coins<c,a.addEventListener("click",()=>{ng(t)&&e()})}o.appendChild(a),s.appendChild(o),n.shopGrid.appendChild(s)}for(const i of ji){const s=ns(t,i.id),r=t.owned[i.id]??0,o=document.createElement("div");o.className=`item${t.current===i.id?" cur":""}`;const a=Array.from({length:ha},(h,l)=>`<i class="${s&&l<r?"on":""}"></i>`).join("");o.innerHTML=`<h3><span>${Yl[i.id]} ${i.name}</span><span>${s?`Lv ${r}`:""}</span></h3><p>${i.desc}</p><div class="pips">${a}</div>`;const c=document.createElement("div");if(c.className="row",s){const h=document.createElement("button");h.className="big blue",h.textContent=t.current===i.id?"Equipped":"Equip",h.disabled=t.current===i.id,h.addEventListener("click",()=>{Gl(t,i.id)&&e()}),c.appendChild(h);const l=document.createElement("button");if(l.className="big",r>=ha)l.textContent="Maxed!",l.disabled=!0;else{const u=Hl(t,i.id);l.textContent=`Upgrade (${u})`,l.disabled=t.coins<u,l.addEventListener("click",()=>{eg(t,i.id)&&e()})}c.appendChild(l)}else{const h=document.createElement("button");h.className="big green",h.textContent=`Buy (${i.cost})`,h.disabled=t.coins<i.cost,h.addEventListener("click",()=>{tg(t,i.id)&&e()}),c.appendChild(h)}o.appendChild(c),n.shopGrid.appendChild(o)}}const Ng=n=>`#${n.toString(16).padStart(6,"0")}`,Fg=n=>n<2.3?"Slow":n<3.6?"Medium":n<5?"Fast":"Zoomy",Og=n=>n<5?"Tiny bonk":n<8?"Small bonk":n<11?"Medium bonk":"Big bonk";function zg(n,t){const e=t.seen||{},i=[...Object.values(ws),...Jc],s=i.filter(r=>e[r.id]).length;n.catCount.textContent=`Discovered ${s} of ${i.length} zombies`,n.catGrid.innerHTML="";for(const r of Object.values(ws)){const o=document.createElement("div");e[r.id]?(o.className="zc",o.innerHTML=`<div class="face" style="background:${Ng(r.skin)}">${r.icon}</div><div><h4>${r.name}</h4>
        <div class="stats"><span>HP ${r.hp}</span><span>${Fg(r.speed)}</span><span>${Og(r.damage)}</span><span>+${r.coins} coins</span></div>
        <p>${r.desc}</p><p class="tip">Tip: ${r.tip}</p></div>`):(o.className="zc unseen",o.innerHTML=`<div class="face" style="background:#cfd6e8">?</div><div><h4>???</h4><p>You haven't met this zombie yet. It starts showing up around wave ${r.wave}.</p></div>`),n.catGrid.appendChild(o)}for(const r of Jc){const o=document.createElement("div");e[r.id]?(o.className="zc boss",o.innerHTML=`<div class="face" style="background:#a6dc8a">${r.icon}</div><div><h4>${r.name}</h4>
        <div class="stats"><span>Boss</span><span>HP ${r.hp}</span></div><p>${r.desc}</p><p class="tip">Tip: ${r.tip}</p></div>`):(o.className="zc unseen boss",o.innerHTML=`<div class="face" style="background:#cfd6e8">?</div><div><h4>??? (Boss)</h4><p>${r.hint}</p></div>`),n.catGrid.appendChild(o)}}const Hi=(n,t={})=>new Sn({color:n,roughness:.5,...t}),Zl={shirt:2052024,pants:15985362,hat:["wig","tricorn"],extra:"coat"},Bg=new Wt(10215562),Kl=new Wt(16765608);function kg(n,t){const e=Ns({skin:10215562,...Zl,scale:2,gait:4,zombie:!0,cast:!0});return e.root.position.set(t.x,0,t.z),e.root.rotation.y=0,n.add(e.root),{kind:"boss",mesh:e.root,ch:e,hp:450,hpMax:450,radius:1.35,alive:!1,state:"sleep",hitT:0,attackCd:1.5,pieCd:3,summonCd:9,stompCd:4,lunge:0,stateT:0,zzzT:0,hasTonic:!1,base:2}}const Hg=n=>1-n.hp/n.hpMax;function Gg(n,t,e,i){if(n.state!=="fight")return!1;n.hp=Math.max(0,n.hp-t),n.hitT=1;const s=n.mesh.position.x-e.x,r=n.mesh.position.z-e.z,o=Math.hypot(s,r)||1;return n.mesh.position.x+=s/o*i*.05,n.mesh.position.z+=r/o*i*.05,n.hp<=0}function fa(n,t,e,i){const s=n.mesh;n.stateT+=t,n.hitT=Math.max(0,n.hitT-t*5),n.lunge=Math.max(0,n.lunge-t*3);const r=i.player.x-s.position.x,o=i.player.z-s.position.z,a=Math.hypot(r,o)||1;if(n.state==="sleep"){Ze(n.ch,e,0),n.ch.rig.rotation.x=.35+Math.sin(e*1.5)*.04,n.ch.armL.rotation.x=.4,n.ch.armR.rotation.x=.4,n.ch.head.rotation.z=.35,n.ch.pupils.forEach(c=>c.position.y=-.03),n.zzzT+=t,a<13&&i.wake();return}if(n.ch.rig.rotation.x=0,n.ch.pupils.forEach(c=>c.position.y=0),n.state==="intro"){Ze(n.ch,e,0),s.rotation.y+=(Math.atan2(r,o)-s.rotation.y)*Math.min(1,t*4);const c=Math.min(1,n.stateT/1.2);n.ch.armL.rotation.x=-1.35-c*1.2,n.ch.armR.rotation.x=-1.35-c*1.2,n.ch.head.rotation.x=-.3*c;return}if(n.state==="fight"){const c=n.hp<n.hpMax*.5;n.attackCd-=t,n.pieCd-=t,n.summonCd-=t,n.stompCd-=t;const h=Math.atan2(r,o);let l=Math.atan2(Math.sin(h-s.rotation.y),Math.cos(h-s.rotation.y));s.rotation.y+=l*Math.min(1,t*6);const u=c?3.4:2.4,p=n.radius+1.1;let d=0;if(a>p*.85&&(s.position.x+=r/a*u*t,s.position.z+=o/a*u*t,d=1),a<p&&n.attackCd<=0&&(n.attackCd=c?1:1.4,n.lunge=1,i.bonk(14)),n.pieCd<=0&&a>4.5){n.pieCd=c?2.2:3.4,n.lunge=.8;const x=s.position.clone();x.y=3.5,i.throwPie(x,i.player)}n.summonCd<=0&&(n.summonCd=c?8:12,i.summon(s.position)),n.stompCd<=0&&(n.stompCd=3.5,i.stomp(n)),Ze(n.ch,e,d),n.ch.rig.position.z=n.lunge*.7;const _=n.hitT;s.scale.set(n.base*(1+.12*_),n.base*(1-.15*_),n.base*(1+.12*_)),wn(s.position,n.radius,i.map.obstacles,i.map.bounds);return}if(n.state==="weak"){Ze(n.ch,e,0),n.ch.rig.position.y=-.55,n.ch.legL.rotation.x=-1.4,n.ch.legR.rotation.x=-1.4,n.ch.armL.rotation.x=.2,n.ch.armR.rotation.x=.2,n.ch.head.rotation.z=Math.sin(e*3)*.3,n.ch.head.rotation.x=.25,n.ch.pupils[0].position.x=Math.sin(e*8)*.05,n.ch.pupils[1].position.x=-Math.sin(e*8)*.05,s.scale.setScalar(n.base);return}if(n.state==="curing"){const c=Math.min(1,n.stateT/3);s.rotation.y+=t*(4+c*16),s.position.y=Math.abs(Math.sin(n.stateT*5))*1.2*c,n.ch.skinMat.color.copy(Bg).lerp(Kl,c),Ze(n.ch,e,0),n.ch.armL.rotation.x=-2.6,n.ch.armR.rotation.x=-2.6;const h=n.base*(1+Math.sin(c*Math.PI)*.25);s.scale.setScalar(h)}}const Vg=new ue(.55,12,10),Wg=new Sn({color:4878312,roughness:.4,emissive:1714824,emissiveIntensity:.4});function Jl(n,t,e){const i=new W(Vg,Wg);i.position.copy(t),n.add(i);const s=Math.hypot(e.x-t.x,e.z-t.z);return{mesh:i,from:t.clone(),to:{x:e.x,z:e.z},t:0,dur:.5+s/22}}function Xg(n,t,e,i){var o,a;const s=[],r=[];for(const c of n){c.t+=t;const h=Math.min(1,c.t/c.dur);if(c.mesh.position.x=c.from.x+(c.to.x-c.from.x)*h,c.mesh.position.z=c.from.z+(c.to.z-c.from.z)*h,c.mesh.position.y=c.from.y*(1-h)+Math.sin(h*Math.PI)*5+.4,c.mesh.rotation.x+=t*8,h>=1){(o=c.mesh.parent)==null||o.remove(c.mesh);const l=new W(new Is(2.3,24),new Fe({color:5996031,transparent:!0,opacity:.55,depthWrite:!1}));l.rotation.x=-Math.PI/2,l.position.set(c.to.x,.07,c.to.z),e.add(l),i.push({mesh:l,x:c.to.x,z:c.to.z,r:2.3,life:6}),r.push(c.to)}else s.push(c)}n.length=0,n.push(...s);for(let c=i.length-1;c>=0;c--){const h=i[c];h.life-=t,h.mesh.material.opacity=Math.min(.55,h.life*.4),h.life<=0&&((a=h.mesh.parent)==null||a.remove(h.mesh),h.mesh.material.dispose(),i.splice(c,1))}return r}function qg(n,t){const e=new xe,i=new W(new Vt(.35,.4,.8,12),Hi(7268351,{transparent:!0,opacity:.8,emissive:2267596,emissiveIntensity:.7}));i.position.y=.4,e.add(i);const s=new W(new Vt(.14,.2,.35,10),Hi(7268351,{transparent:!0,opacity:.8,emissive:2267596}));s.position.y=.95,e.add(s);const r=new W(new Vt(.15,.15,.15,8),Hi(12159056));r.position.y=1.2,e.add(r);const o=new W(new ti(.22),Hi(16769354,{emissive:16761856,emissiveIntensity:.9}));o.position.y=.45,o.scale.z=.4,e.add(o);const a=new W(new Vt(.5,.5,14,12,1,!0),new Fe({color:9169407,transparent:!0,opacity:.22,side:Ue,depthWrite:!1}));return a.position.y=7,e.add(a),e.position.set(t.x,0,t.z),n.add(e),{mesh:e,star:o,x:t.x,z:t.z}}function Yg(n,t){n.mesh.position.y=.4+Math.sin(t*3)*.15,n.mesh.rotation.y=t*1.6,n.star.rotation.z=t*3}function $g(n){return n.ch.skinMat.color.copy(Kl),n.ch.zombie=!1,n.ch.mouth.scale.set(1,.5,1),n.ch.rig.position.y=0,n.ch.rig.rotation.set(0,0,0),n.mesh.position.y=0,n.mesh.scale.setScalar(1.4),jl(n.ch,n.mesh,1.4)}function Zg(n,t){const e=Ns({skin:16765608,...Zl,scale:1.4,gait:9});return e.root.position.set(t.x,0,t.z),n.add(e.root),jl(e,e.root,1.4)}function jl(n,t,e){const i=new xe;i.position.set(-.55,1.4,.2),n.rig.add(i);const s=new W(new Vt(.04,.04,2.2,6),Hi(14277081));s.rotation.x=Math.PI/2,s.position.z=.9,i.add(s);const r=new xe;return[13843259,16777215,13843259].forEach((o,a)=>{const c=new W(new ne(.04,.2,.7),Hi(o));c.position.set(0,-a*.2,0),r.add(c)}),r.position.set(0,.2,1.75),i.add(r),{kind:"ally",name:"George",mesh:t,ch:n,pivot:i,scale:e,attackCd:1,swingT:0,hitDone:!1,radius:.8}}function Kg(n,t,e,i,s,r){const o=n.mesh;n.attackCd-=i,o.rotation.x=0;let a=null,c=11;for(const m of e){if(!m.alive)continue;const f=Math.hypot(m.mesh.position.x-o.position.x,m.mesh.position.z-o.position.z);f<c&&(c=f,a=m)}let h=null,l=3.4;a?(h=a.mesh.position,l=2.2+a.radius):h={x:t.x-2.4,z:t.z+1.8};const u=h.x-o.position.x,p=h.z-o.position.z,d=Math.hypot(u,p)||1;let _=0;if(d>(a?l:1.2)){const m=a?7:d>8?12:8;o.position.x+=u/d*m*i,o.position.z+=p/d*m*i,_=1}if(a||d>1.5){const m=Math.atan2(u,p),f=Math.atan2(Math.sin(m-o.rotation.y),Math.cos(m-o.rotation.y));o.rotation.y+=f*Math.min(1,i*10)}if(wn(o.position,n.radius,r.map.obstacles,r.map.bounds),a&&c<=l+1.2&&n.attackCd<=0&&(n.attackCd=1.5,n.swingT=.4,n.hitDone=!1),Ze(n.ch,s,_),n.ch.armR.rotation.x=-1.3,n.pivot.rotation.set(0,-.1,0),n.swingT>0){n.swingT-=i;const m=1-Math.max(0,n.swingT)/.4;if(n.pivot.rotation.y=-1.4+m*3.2,!n.hitDone&&m>.4){n.hitDone=!0;const f=o.position.clone();r.ring(f,4,16765514),r.shake(.08);for(const E of e){if(!E.alive)continue;Math.hypot(E.mesh.position.x-f.x,E.mesh.position.z-f.z)<4+E.radius&&r.hit(E,26,f,8)}}}}const Jg=.38;function Oa(n,t,e){const i=ws[t],s=Ns({skin:i.skin,shirt:i.shirt,pants:i.pants,hat:i.hat,extra:i.extra,scale:i.scale,gait:i.gait,zombie:!0});return s.root.position.set(e.x,0,e.z),s.root.scale.setScalar(.01),n.add(s.root),{kind:"zombie",type:i,mesh:s.root,ch:s,hp:i.hp,hpMax:i.hp,radius:.62*i.scale,alive:!0,dying:0,gone:!1,stun:0,hitT:0,kx:0,kz:0,phase:Math.random()*10,attackCd:.5,stompT:Math.random()*2,lunge:0,spawnT:0,base:i.scale,coins:i.coins,behavior:i.behavior||"",woke:i.behavior!=="sleepy",hopT:Math.random()*1.6,throwCd:3+Math.random()*2,zzzT:Math.random()*2}}function jg(n,t,e,i,s=0){if(!n.alive)return!1;n.hp-=t,n.hitT=1,n.woke=!0;const r=n.mesh.position.x-e.x,o=n.mesh.position.z-e.z,a=Math.hypot(r,o)||1,c=i/Math.max(.8,n.base*.9);return n.kx+=r/a*c,n.kz+=o/a*c,s&&(n.stun=Math.max(n.stun,s)),n.hp<=0?(n.alive=!1,n.dying=1e-4,!0):!1}function Qg(n,t,e,i,s,r){var o,a,c,h;for(const l of n){const u=l.mesh;if(l.gone)continue;if(l.dying>0){l.dying+=e;const C=Math.min(1,l.dying/Jg);u.rotation.y+=14*e,u.scale.setScalar(l.base*(1+.35*Math.sin(C*Math.PI))*(1-C*C)),u.position.y=(l.behavior==="float"?1.4:0)+Math.sin(C*Math.PI)*1.2,C>=1&&(l.gone=!0,(o=u.parent)==null||o.remove(u));continue}if(l.spawnT<1){l.spawnT=Math.min(1,l.spawnT+e*3);const C=l.spawnT;u.scale.setScalar(l.base*(C<1?C*(1+Math.sin(C*Math.PI)*.3):1)),Ze(l.ch,i+l.phase,0);continue}l.attackCd=Math.max(0,l.attackCd-e),l.stun=Math.max(0,l.stun-e),l.hitT=Math.max(0,l.hitT-e*5),l.lunge=Math.max(0,l.lunge-e*3);const p=t.x-u.position.x,d=t.z-u.position.z,_=Math.hypot(p,d)||1,x=l.radius+.6+.45,m=l.stun>0?.2:1;let f=0;if(!l.woke)if(_<7)l.woke=!0,(a=r.wake)==null||a.call(r,l);else{l.zzzT-=e,l.zzzT<=0&&(l.zzzT=2.2,(c=r.zzz)==null||c.call(r,l)),Ze(l.ch,i+l.phase,0),l.ch.rig.rotation.x=.28,l.ch.head.rotation.z=.3,u.scale.set(l.base*(1+.22*l.hitT),l.base*(1-.25*l.hitT),l.base*(1+.22*l.hitT)),l.hitT=Math.max(0,l.hitT-e*5);continue}l.ch.rig.rotation.x=0;let E=1,w=!1;if(l.behavior==="hop"){l.hopT+=e;const C=l.hopT%1.7;C<.6?(E=3,u.position.y=Math.sin(C/.6*Math.PI)*1.4):(E=.1,u.position.y=0)}else l.behavior==="float"?(u.position.y=1.4+Math.sin(i*2+l.phase)*.25,l.ch.disc.position.y=-u.position.y/l.base+.03):l.behavior==="thrower"&&(l.throwCd-=e,_<9&&(w=!0),l.throwCd<=0&&_<15&&l.stun<=0&&(l.throwCd=4.5,l.lunge=1,(h=r.throwGoo)==null||h.call(r,l)));if(!w&&_>x*.8){const C=l.type.speed*m*E;u.position.x+=p/_*C*e,u.position.z+=d/_*C*e,f=m===1?1:.3}u.position.x+=l.kx*e,u.position.z+=l.kz*e;const M=Math.exp(-7*e);l.kx*=M,l.kz*=M;let A=Math.atan2(p,d)-u.rotation.y;A=Math.atan2(Math.sin(A),Math.cos(A)),u.rotation.y+=A*Math.min(1,e*10),_<x&&l.attackCd<=0&&l.stun<=0&&(l.attackCd=1.1,l.lunge=1,r.bonk(l)),l.type.id==="bruiser"&&(l.stompT+=e,l.stompT>2.3&&(l.stompT=0,r.stomp(l))),Ze(l.ch,i+l.phase,f),l.stun>0&&(l.ch.head.rotation.z=Math.sin(i*14)*.35,l.ch.pupils[0].position.x=Math.sin(i*12)*.05,l.ch.pupils[1].position.x=-Math.sin(i*12)*.05),l.ch.rig.position.z=l.lunge*.5;const b=l.hitT;u.scale.set(l.base*(1+.22*b),l.base*(1-.25*b),l.base*(1+.22*b)),wn(u.position,l.radius,s.obstacles,s.bounds)}for(let l=0;l<n.length;l++){const u=n[l];if(!(!u.alive||u.spawnT<1))for(let p=l+1;p<n.length;p++){const d=n[p];if(!d.alive||d.spawnT<1)continue;const _=d.mesh.position.x-u.mesh.position.x,x=d.mesh.position.z-u.mesh.position.z,m=(u.radius+d.radius)*.9,f=_*_+x*x;if(f<m*m&&f>1e-6){const E=Math.sqrt(f),w=(m-E)*.5;u.mesh.position.x-=_/E*w,u.mesh.position.z-=x/E*w,d.mesh.position.x+=_/E*w,d.mesh.position.z+=x/E*w}}}}function t_(n,t){const e=Ns({skin:10935434,shirt:1776420,pants:1776420,hat:["stovepipe","beard"],extra:"tie",scale:2.15,gait:4,zombie:!0,cast:!0});e.root.position.set(t.x,0,t.z),n.add(e.root);const i=e.head.getObjectByName("stovepipe");return{kind:"boss",id:"abe",mesh:e.root,ch:e,hatMesh:i,hasHat:!0,hp:700,hpMax:700,radius:1.3,alive:!1,state:"intro",stateT:0,hitT:0,hatCd:2,summonCd:12,lunge:0,base:2.15}}function Ql(n,t,e,i){var h;const s=n.mesh;n.stateT+=t,n.hitT=Math.max(0,n.hitT-t*5),n.lunge=Math.max(0,n.lunge-t*2.5);const r=i.player.x-s.position.x,o=i.player.z-s.position.z,a=Math.hypot(r,o)||1,c=()=>{const l=Math.atan2(r,o),u=Math.atan2(Math.sin(l-s.rotation.y),Math.cos(l-s.rotation.y));s.rotation.y+=u*Math.min(1,t*6)};if(n.state==="intro"){c(),Ze(n.ch,e,0);const l=Math.min(1,n.stateT/1.4);return n.ch.armR.rotation.x=-2.6*l,n.ch.head.rotation.x=.25*Math.sin(l*Math.PI),n.hatMesh&&(n.hatMesh.position.y=.4+Math.sin(l*Math.PI)*.3),!1}if(n.state==="fight"){n.hatMesh&&(n.hatMesh.position.y=.4);const l=n.hp<n.hpMax*.5;c(),n.hatCd-=t,n.summonCd-=t;let u=0;const p=l?3.6:2.8;a>10?(s.position.x+=r/a*p*t,s.position.z+=o/a*p*t,u=1):a<5.5&&(s.position.x-=r/a*p*.9*t,s.position.z-=o/a*p*.9*t,u=.7),n.hatCd<=0&&n.hasHat&&(n.hatCd=l?2.4:3.6,n.lunge=1,n.hasHat=!1,n.hatMesh&&(n.hatMesh.visible=!1),i.throwHat(n,0,!0),l&&(i.throwHat(n,.42,!1),i.throwHat(n,-.42,!1))),n.summonCd<=0&&(n.summonCd=l?11:16,i.summon(s.position)),Ze(n.ch,e,u),n.lunge>0&&(n.ch.armR.rotation.x=-1.2-n.lunge*1.6),n.ch.rig.position.z=n.lunge*.5;const d=n.hitT;return s.scale.set(n.base*(1+.1*d),n.base*(1-.14*d),n.base*(1+.1*d)),wn(s.position,n.radius,i.map.obstacles,i.map.bounds),!1}if(n.state==="leaving"){const l=Math.min(1,n.stateT/2.2);if(n.hatMesh&&(n.hatMesh.visible=!0,n.hatMesh.position.y=.4+Math.abs(Math.sin(n.stateT*8))*.4*(1-l)),n.ch.skinMat.color.lerp(new Wt(16765608),Math.min(1,t*2.5)),Ze(n.ch,e,0),n.ch.armR.rotation.x=-2.6,s.position.y=Math.abs(Math.sin(n.stateT*6))*.9,s.rotation.y+=t*(2+l*14),s.scale.setScalar(n.base*(l<.7?1:1-(l-.7)/.3)),l>=1)return(h=s.parent)==null||h.remove(s),!0}return!1}function e_(n,t,e,i,s){const r=Xl();r.position.set(t.mesh.position.x,3.6,t.mesh.position.z),r.scale.setScalar(t.base*.65),n.add(r);const o=Math.atan2(e.x-t.mesh.position.x,e.z-t.mesh.position.z)+i,a=Math.hypot(e.x-t.mesh.position.x,e.z-t.mesh.position.z);return{mesh:r,owner:t,primary:s,vx:Math.sin(o)*17,vz:Math.cos(o)*17,out:!0,travel:0,maxTravel:Math.min(24,a+7),hit:!1,y:3.6}}function n_(n,t,e){var s;const i=[];for(const r of n){const o=r.mesh.position;if(r.out)o.x+=r.vx*t,o.z+=r.vz*t,r.travel+=17*t,r.travel>=r.maxTravel&&(r.out=!1,r.hit=!1);else{const a=r.owner.mesh.position,c=a.x-o.x,h=a.z-o.z,l=Math.hypot(c,h)||1;if(o.x+=c/l*21*t,o.z+=h/l*21*t,l<1.6){(s=r.mesh.parent)==null||s.remove(r.mesh),r.primary&&(r.owner.hasHat=!0,r.owner.hatMesh&&(r.owner.hatMesh.visible=!0),r.owner.hatCd=Math.max(r.owner.hatCd,1.2));continue}}o.y=r.y=1.5+Math.sin(r.travel*.4)*.15+(r.out?Math.max(0,2-r.travel*.3):0),r.mesh.rotation.y+=t*20,r.mesh.rotation.x=.15,r.hit||Math.hypot(e.player.x-o.x,e.player.z-o.z)<1.2&&(r.hit=!0,e.bonk(12),e.sparkle(o)),i.push(r)}n.length=0,n.push(...i)}const rs=document.getElementById("canvas-host"),$t=Rg(rs),St=Dg();hg($t,St.layer,St.flash);const ae=fg($t.scene),Zt=j0(),ht=Tg($t.entities,ae.playerStart);ht.yaw=Math.PI;ht.mesh.rotation.y=Math.PI;let vn=[];const th=[],Rr=[],eh=[];let bt=null,Ts=null,gn=null;Zt.roster.george?Ts=Zg($t.entities,{x:ae.playerStart.x-2.5,z:ae.playerStart.z+2}):bt=kg($t.entities,ae.bossSpawn);let fn="menu",gi=!1,Gi=!1,fe=null;const wr=[];let jt=null,Be=0,qi=0,bs=!1,Fs=[],_r=0,xi=1.2,xo=0;const en=new Set;let _i=0;const Mn={x:0,y:0,down:!1},sl=new af,vo=new gt,i_=new Vn(new D(0,1,0),0),Mo=new D,yo=new D,rl=["BONK!","POW!","BOOF!","WHAP!","BOING!","ZAP!","POOF!"],ol=["#ffe066","#7ee8ff","#ff9ac0","#9dffb0","#ffb36b"],Vi=n=>n[Math.floor(Math.random()*n.length)];function nh(n=Zt.current){return Zt.owned[n]??0}function s_(){const n=Zt.armor||0,t=ht.hpMax;ht.hpMax=la+n*10,ht.hp=Math.min(ht.hpMax,ht.hp+(ht.hpMax-t)),Cg(ht,n)}function Pr(){bg(ht,Zt.current,nh()),(Zt.armor||0)!==ht.armorLevel&&(ht.armorLevel=Zt.armor||0,s_())}function Lr(){Ug(St,Zt,r_),gi&&$l(St,Zt,()=>{Pr(),Lr()})}function r_(n){if(n===-1)return br();if(n===-2)return Tr();ih(n)}function ih(n){var e;const t=(e=ji[n])==null?void 0:e.id;if(t){if(!ns(Zt,t)){Ei(St,"Locked! Buy it in the Workshop (B).");return}Gl(Zt,t),Pr(),Lr()}}function Tr(n){fn!=="play"||jt||gi||(Gi=n!==void 0?n:!Gi,ss(St.catalog,Gi),Gi&&zg(St,Zt))}function Dr(n,t){Zt.seen[n]||(Zt.seen[n]=!0,Fn(Zt),Ei(St,`New zombie in the Catalog: ${t}! (press C)`,3500))}function br(n){fn!=="play"||jt||Gi||(gi=n!==void 0?n:!gi,ss(St.shop,gi),gi&&$l(St,Zt,()=>{Pr(),Lr()}))}const sh=()=>!!bt&&bt.state!=="sleep",o_=()=>sh()||!!fe;let xs=null;const rh=()=>{if(xs)return xs;const n=vn.filter(t=>t.alive);return bt&&bt.alive&&n.push(bt),fe&&fe.alive&&n.push(fe),xs=n,n};function oh(n,t,e,i,s={}){if(!n.alive)return;const r=n.mesh.position;if(n.kind==="boss"){const a=Gg(n,t,e,i);jn(r,4),Zn(r,Vi(rl),Vi(ol)),Ve(.12),Qc(40),a&&(n===fe?v_():d_());return}const o=jg(n,t,e,i,s.stun||0);jn(r,o?6:3),(o||Math.random()<.45)&&Zn(r,Vi(rl),Vi(ol)),Ve(o?.14:.05),Qc(o?75:30),o&&(dn(r,26,7),Si(r,4),Zt.coins+=n.coins,Zt.kills+=1,bt&&bt.state==="sleep"&&Zt.kills===Es&&(pn(St,"35 bonks! Something is snoring...",3e3),Ei(St,"Follow the arrow to the sleepy zombie behind the mansion!",6e3)),Zn({x:r.x,y:.4,z:r.z},`+${n.coins}`,"#ffd24a"))}const ah={targets:rh,hit:oh,fxGroup:$t.fxGroup,projectiles:th};function As(n){if(ht.invuln>0||fn!=="play")return;const t=Math.max(1,Math.round(n*(1-.1*(Zt.armor||0))));ht.hp=Math.max(0,ht.hp-t),ht.invuln=.8,Ve(.25),ei("#ffffff",140),Zn(ht.mesh.position,"Oof!","#ffb3c6"),ht.hp<=0&&(fn="over",Zt.coins=0,Fn(Zt),ss(St.over,!0))}const a_={zzz(n){Math.hypot(n.mesh.position.x-ht.mesh.position.x,n.mesh.position.z-ht.mesh.position.z)<26&&Zn(n.mesh.position,"Zzz...","#ffffff")},wake(n){Zn(n.mesh.position,"Huh?!","#ffe066"),Ve(.05)},throwGoo(n){const t=n.mesh.position.clone();t.y=2.6,Rr.push(Jl($t.fxGroup,t,ht.mesh.position))},bonk(n){jn(ht.mesh.position,3),As(n.type.damage)},stomp(n){const t=n.mesh.position;Qn(t,5,16769200,.5),Si(t,8);const e=Math.hypot(t.x-ht.mesh.position.x,t.z-ht.mesh.position.z);Ve(Math.max(.06,.3-e*.015)),e<4.5&&As(6)}};function Ir(){var n;for(const t of vn)t.gone||(dn(t.mesh.position,8,4),(n=t.mesh.parent)==null||n.remove(t.mesh));vn=[]}function c_(){qi+=1,Fs=J0(qi),bs=!0,_r=0,pn(St,`Wave ${qi}`)}function l_(){const n=Fs.shift();let t=null;for(let e=0;e<6;e++){const i=Vi(ae.spawnPoints),s={x:i.x+(Math.random()-.5)*4,z:i.z+(Math.random()-.5)*4};if(Math.hypot(s.x-ht.mesh.position.x,s.z-ht.mesh.position.z)>14){t=s;break}}t||(t={x:ae.spawnPoints[0].x,z:ae.spawnPoints[0].z}),wn(t,.8,ae.obstacles,ae.bounds),vn.push(Oa($t.entities,n,t)),Dr(n,ws[n].name),Si(new D(t.x,0,t.z),4)}function h_(n){if(o_())return;const t=vn.reduce((e,i)=>e+(i.alive?1:0),0);if(Fs.length){_r-=n,_r<=0&&t<K0&&(l_(),_r=Z0);return}if(t===0)if(bs){bs=!1,xi=$0;const e=10+qi*5;Zt.coins+=e,pn(St,`Wave ${qi} cleared! +${e}`),dn(ht.mesh.position,40,8)}else xi-=n,xi<=0&&c_()}const da={player:ht.mesh.position,map:ae,wake:()=>{Zt.kills>=Es&&!fe&&u_()},bonk:n=>As(n),throwPie:(n,t)=>Rr.push(Jl($t.fxGroup,n,t)),summon:n=>{pn(St,"Zombie pals!",1200);for(let t=0;t<3;t++){const e=t/3*Math.PI*2+Math.random(),i={x:n.x+Math.cos(e)*4,z:n.z+Math.sin(e)*4};wn(i,.8,ae.obstacles,ae.bounds),vn.push(Oa($t.entities,"shambler",i)),dn(new D(i.x,0,i.z),6,4)}},stomp:n=>{const t=n.mesh.position;Qn(t,8,16769200,.6),Si(t,12),Ve(.4),Math.hypot(t.x-ht.mesh.position.x,t.z-ht.mesh.position.z)<6&&As(10)}};function u_(){!bt||bt.state!=="sleep"||(Dr("george","Zombie George Washington"),bt.state="intro",bt.stateT=0,Fs=[],bs=!1,xi=3,Ir(),jt={kind:"intro",t:0,dur:3.8},$t.cam.zoomTarget=.5,is(St,"ZOMBIE GEORGE WASHINGTON","The Founding Father of Funk",!0),ei("#ffe9a8",300),Ve(.5))}function f_(){jt=null,bt.state="fight",bt.stateT=0,bt.alive=!0,$t.cam.zoomTarget=1,is(St,"","",!1),pn(St,"Wear him down to charge the cure meter!",2600)}function d_(){bt.state="weak",bt.alive=!1,bt.stateT=0,Ir(),Rr.length=0,ei("#ffffff",250),Ve(.4),pn(St,"George is dizzy!",2200),Ei(St,"Grab the glowing Liberty Tonic!",5e3);const n=ht.mesh.position,t=Math.random()*Math.PI*2,e={x:n.x+Math.cos(t)*9,z:n.z+Math.sin(t)*9};wn(e,1.5,ae.obstacles,ae.bounds),gn=qg($t.entities,e)}function p_(){bt.state="curing",bt.stateT=0,jt={kind:"cure",t:0,dur:3.6,fx:0},$t.cam.zoomTarget=.55,is(St,"CURE TIME!","Liberty Tonic activated",!0),ei("#a8f0ff",300)}function m_(){const n=bt.mesh.position.clone();Ts=$g(bt),bt=null,jt=null,$t.cam.zoomTarget=1,is(St,"","",!1),Er(St,!1),dn(n,70,10),Qn(n,10,16765514,.8),ei("#ffffff",500),Zt.roster.george=!0,Zt.coins+=150,Fn(Zt),fn="win",ss(St.win,!0)}const ch={player:ht.mesh.position,map:ae,summon:n=>{pn(St,"Abe calls for backup!",1200);for(let t=0;t<2;t++){const e=Math.random()*Math.PI*2,i={x:n.x+Math.cos(e)*5,z:n.z+Math.sin(e)*5};wn(i,.8,ae.obstacles,ae.bounds),vn.push(Oa($t.entities,"agent",i)),dn(new D(i.x,0,i.z),6,4)}Dr("agent",ws.agent.name)},throwHat:(n,t,e)=>{wr.push(e_($t.fxGroup,n,ht.mesh.position,t,e)),e&&Zn(n.mesh.position,"HAT TOSS!","#ffe066")}},g_={player:ht.mesh.position,bonk:n=>As(n),sparkle:n=>jn(n,5)};function __(){let n=ae.spawnPoints[0],t=-1;for(const i of ae.spawnPoints){const s=Math.hypot(i.x-ht.mesh.position.x,i.z-ht.mesh.position.z);s>t&&s<40&&(t=s,n=i)}const e={x:n.x*.7,z:n.z*.7};wn(e,1.5,ae.obstacles,ae.bounds),fe=t_($t.entities,e),Dr("abe","Zombie Abe Lincoln"),Fs=[],bs=!1,xi=3,Ir(),jt={kind:"abe",t:0,dur:3.6},$t.cam.zoomTarget=.5,is(St,"ZOMBIE ABE LINCOLN","Four score and seven bonks ago...",!0),ei("#ffe9a8",300),Ve(.4)}function x_(){jt=null,fe.state="fight",fe.stateT=0,fe.alive=!0,$t.cam.zoomTarget=1,is(St,"","",!1),pn(St,"Dodge the flying hat!",2400)}function v_(){var n;fe.alive=!1,fe.state="leaving",fe.stateT=0,Ir();for(const t of wr)(n=t.mesh.parent)==null||n.remove(t.mesh);wr.length=0,Er(St,!1),ei("#ffffff",300),Ve(.4),dn(fe.mesh.position,60,9),Qn(fe.mesh.position,9,16765514,.8),Zt.coins+=250,Zt.roster.abe=!0,Fn(Zt),pn(St,"Abe Lincoln is cured!",2600),Ei(St,"Abe tips his hat and heads home. +250 coins!",5e3),xi=4}window.addEventListener("keydown",n=>{if(n.code==="KeyQ"&&(_i=-1),n.code==="KeyE"&&(_i=1),["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(n.code)&&n.preventDefault(),en.add(n.code),fn==="play"){if(n.code.startsWith("Digit")){const t=Number(n.code.slice(5))-1;t>=0&&t<ji.length&&ih(t)}n.code==="KeyB"&&br(),n.code==="KeyC"&&Tr(),n.code==="Escape"&&(br(!1),Tr(!1))}});window.addEventListener("keyup",n=>{en.delete(n.code),n.code==="KeyQ"&&_i<0&&(_i=0),n.code==="KeyE"&&_i>0&&(_i=0)});rs.addEventListener("contextmenu",n=>n.preventDefault());rs.addEventListener("wheel",n=>{n.preventDefault(),$t.cam.userZoom=Math.max(.55,Math.min(1.7,$t.cam.userZoom*(1+Math.sign(n.deltaY)*.08)))},{passive:!1});let za=!1,pa=0;window.addEventListener("pointermove",n=>{za&&($t.cam.yaw-=(n.clientX-pa)*.008,pa=n.clientX)});rs.addEventListener("pointerdown",n=>{n.button===2&&(za=!0,pa=n.clientX)});window.addEventListener("pointerup",n=>{n.button===2&&(za=!1)});rs.addEventListener("pointermove",n=>{Mn.x=n.clientX,Mn.y=n.clientY});rs.addEventListener("pointerdown",n=>{n.button===0&&(Mn.down=!0,Mn.x=n.clientX,Mn.y=n.clientY)});window.addEventListener("pointerup",()=>Mn.down=!1);window.addEventListener("blur",()=>{en.clear(),Mn.down=!1});St.btnStart.addEventListener("click",()=>{fn="play",ss(St.menu,!1),pn(St,ae.name,2200)});St.btnReset.addEventListener("click",()=>{Q0(),location.reload()});St.btnShopClose.addEventListener("click",()=>br(!1));St.btnCatalogClose.addEventListener("click",()=>Tr(!1));St.btnRetry.addEventListener("click",()=>location.reload());St.btnKeep.addEventListener("click",()=>{fn="play",ss(St.win,!1),xi=2,Ei(St,"George will fight alongside you. Keep earning coins!",4e3)});function M_(){const n=$t.renderer.domElement.getBoundingClientRect();if(!(n.width<=0)&&(vo.x=(Mn.x-n.left)/n.width*2-1,vo.y=-((Mn.y-n.top)/n.height)*2+1,sl.setFromCamera(vo,$t.camera),sl.ray.intersectPlane(i_,Mo))){const t=Mo.x-ht.mesh.position.x,e=Mo.z-ht.mesh.position.z;Math.hypot(t,e)>.3&&(ht.yaw=Math.atan2(t,e),ht.mesh.rotation.y=ht.yaw)}}function y_(n){ht.attackCd=Math.max(0,ht.attackCd-n),ht.invuln=Math.max(0,ht.invuln-n),M_();let t=0,e=0;(en.has("KeyW")||en.has("ArrowUp"))&&(e-=1),(en.has("KeyS")||en.has("ArrowDown"))&&(e+=1),(en.has("KeyA")||en.has("ArrowLeft"))&&(t-=1),(en.has("KeyD")||en.has("ArrowRight"))&&(t+=1);{const o=Math.cos($t.cam.yaw),a=Math.sin($t.cam.yaw),c=t*o+e*a,h=-t*a+e*o;t=c,e=h}const i=Math.hypot(t,e),s=ht.mesh.position,r=eh.some(o=>Math.hypot(o.x-s.x,o.z-s.z)<o.r);if(i>0){const o=X0*(r?.5:1);s.x+=t/i*o*n,s.z+=e/i*o*n}ht.moving+=((i>0?1:0)-ht.moving)*Math.min(1,n*12),wn(s,q0,ae.obstacles,ae.bounds),(Mn.down||en.has("Space"))&&ht.attackCd<=0&&_g(ht,Zt.current,nh(),ah),Fa(ht,Be,n)}function S_(n){xs=null,y_(n),Qg(vn,ht.mesh.position,n,Be,ae,a_),vn=vn.filter(e=>!e.gone),Eg(th,ah,n),bt&&(fa(bt,n,Be,da),bt.state==="sleep"&&(bt.zzzT+=0,Math.floor(Be*.7)!==Math.floor((Be-n)*.7)&&Zn(bt.mesh.position,"Zzz...","#ffffff")),(bt.state==="fight"||bt.state==="weak")&&Er(St,!0,bt.hp/bt.hpMax,Hg(bt),ae.bossName)),fe&&(Ql(fe,n,Be,ch)?fe=null:fe.state==="fight"&&Er(St,!0,fe.hp/fe.hpMax,1-fe.hp/fe.hpMax,"Zombie Abe Lincoln")),n_(wr,n,g_),!fe&&!Zt.roster.abe&&Zt.kills>=Y0&&!sh()&&!jt&&__();const t=Xg(Rr,n,$t.fxGroup,eh);for(const e of t)Qn({x:e.x,z:e.z},3,8363007,.4),Si(new D(e.x,0,e.z),6),Ve(.08);gn&&(Yg(gn,Be),Math.hypot(gn.x-ht.mesh.position.x,gn.z-ht.mesh.position.z)<1.8&&($t.entities.remove(gn.mesh),gn=null,bt.hasTonic=!0,dn(ht.mesh.position,30,7),ei("#a8f0ff",200),pn(St,"Got the Liberty Tonic!",1800),Ei(St,"Bring it to George!",4e3))),bt&&bt.state==="weak"&&bt.hasTonic&&Math.hypot(bt.mesh.position.x-ht.mesh.position.x,bt.mesh.position.z-ht.mesh.position.z)<4.5&&p_(),Ts&&Kg(Ts,ht.mesh.position,rh(),n,Be,{map:ae,hit:oh,ring:(e,i,s)=>Qn(e,i,s,.45),shake:Ve}),h_(n),xo+=n,xo>2.5&&(xo=0,Fn(Zt))}function E_(n){xs=null,jt.t+=n,ht.attackCd=0,ht.moving*=.8,Fa(ht,Be,n),jt.kind==="abe"?(Ql(fe,n,Be,ch),Math.floor(jt.t*3)!==Math.floor((jt.t-n)*3)&&jt.t>1.4&&(Ve(.15),jn(fe.mesh.position,3)),jt.t>=jt.dur&&x_()):jt.kind==="intro"?(fa(bt,n,Be,da),Math.floor(jt.t*3)!==Math.floor((jt.t-n)*3)&&jt.t>1.2&&(Ve(.2),Si(bt.mesh.position,5)),jt.t>=jt.dur&&f_()):(fa(bt,n,Be,da),jt.fx-=n,jt.fx<=0&&(jt.fx=.28,Qn(bt.mesh.position,4+jt.t*2,Vi([16765514,8317183,16751296,10354608]),.6),dn(bt.mesh.position,14,7),jn(bt.mesh.position,5)),jt.t>=jt.dur&&m_())}const hi=new D;function w_(){let n=null;if(fn==="play"&&!jt&&(bt&&bt.state==="sleep"&&Zt.kills>=Es?n=bt.mesh.position:bt&&bt.state==="weak"&&(n=gn?{x:gn.x,z:gn.z}:bt.mesh.position)),!n){St.compass.classList.remove("show");return}if(hi.set(n.x,1,n.z).project($t.camera),hi.z<1&&Math.abs(hi.x)<.88&&Math.abs(hi.y)<.8){St.compass.classList.remove("show");return}const e=St.layer.clientWidth,i=St.layer.clientHeight;let s=hi.x*(e/2),r=-hi.y*(i/2);hi.z>1&&(s=-s,r=-r);const o=Math.hypot(s,r)||1,a=Math.min(e,i)*.34;St.compass.style.left=`${e/2+s/o*a}px`,St.compass.style.top=`${i/2+r/o*a}px`,St.compassArrow.style.transform=`rotate(${Math.atan2(s,-r)}rad)`;const c=Math.hypot(n.x-ht.mesh.position.x,n.z-ht.mesh.position.z);St.compassDist.textContent=`${Math.round(c)} m`,St.compass.classList.add("show")}let al=performance.now();function lh(n){requestAnimationFrame(lh);const t=Math.min(.05,(n-al)/1e3);al=n;let e=t;pe.freeze>0&&(pe.freeze-=t,e=t*.06),ug(t),$t.cam.yaw+=_i*t*1.8,Be+=e,fn==="play"&&!gi&&!Gi?jt?E_(e):S_(e):fn==="menu"&&Fa(ht,Be,e),ae.update(ht.mesh.position,t,Be);const i=jt?jt.kind==="abe"?fe:bt:null;i?yo.set(i.mesh.position.x,0,i.mesh.position.z):yo.set(ht.mesh.position.x,0,ht.mesh.position.z),Lg($t,yo,t,pe.shake,jt?3:5),Ig(St,Zt,ht,qi,!!Ts),w_(),$t.renderer.render($t.scene,$t.camera)}Pr();Lr();$t.cam.focus.set(ht.mesh.position.x,0,ht.mesh.position.z);requestAnimationFrame(lh);console.info("[History Zombies] ready");
