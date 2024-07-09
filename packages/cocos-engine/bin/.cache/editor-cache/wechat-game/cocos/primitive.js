System.register(["./pipeline-state-manager-45d8faaf.js","./buffer-barrier-a7de2d9a.js","./capsule-8be47e5b.js","./index-92d00b49.js","./director-44a98d9f.js","./create-mesh-b322554e.js","./mesh-4be1d55f.js","./node-event-c62a1caf.js","./touch-df137fff.js","./wasm-minigame-c1b4b430.js","./deprecated-8cbcc834.js"],(function(n){"use strict";var i,o,t,r,e,s,a,u,v,f,c,d,h,p,m,l;return{setters:[function(){},function(n){i=n.v},function(n){o=n.c,t=n.a,r=n.b,e=n.p,s=n.d},function(n){a=n.o,u=n.ae,v=n.bE,f=n.bX,c=n.bF,d=n.bI,h=n.l,p=n.bj},function(){},function(n){m=n._},function(n){l=n.M},function(){},function(){},function(){},function(){}],execute:function(){var M,P,y,b,g,x,E,I,z=Object.freeze({__proto__:null,box:r,cone:function(n,i,t){return void 0===n&&(n=.5),void 0===i&&(i=1),void 0===t&&(t={}),o(0,n,i,t)},cylinder:o,plane:e,quad:function(n){var i=t(n),o={positions:[-.5,-.5,0,-.5,.5,0,.5,.5,0,.5,-.5,0],indices:[0,3,1,3,2,1],minPos:{x:-.5,y:-.5,z:0},maxPos:{x:.5,y:.5,z:0},boundingRadius:Math.sqrt(.5)};return!1!==i.includeNormal&&(o.normals=[0,0,1,0,0,1,0,0,1,0,0,1]),!1!==i.includeUV&&(o.uvs=[0,0,0,1,1,1,1,0]),o},sphere:function(n,i){void 0===n&&(n=.5),void 0===i&&(i={});for(var o=void 0!==i.segments?i.segments:32,t=[],r=[],e=[],s=[],u=new a(-n,-n,-n),v=new a(n,n,n),f=n,c=0;c<=o;++c)for(var d=c*Math.PI/o,h=Math.sin(d),p=-Math.cos(d),m=0;m<=o;++m){var l=2*m*Math.PI/o-Math.PI/2,M=Math.sin(l)*h,P=p,y=Math.cos(l)*h,b=m/o,g=c/o;if(t.push(M*n,P*n,y*n),r.push(M,P,y),e.push(b,g),c<o&&m<o){var x=o+1,E=x*c+m,I=x*(c+1)+m,z=x*(c+1)+m+1,L=x*c+m+1;s.push(E,L,I),s.push(L,z,I)}}return{positions:t,indices:s,normals:r,uvs:e,minPos:u,maxPos:v,boundingRadius:f}},torus:function(n,i,o){void 0===n&&(n=.4),void 0===i&&(i=.1),void 0===o&&(o={});for(var t=o.radialSegments||32,r=o.tubularSegments||32,e=o.arc||2*Math.PI,s=[],u=[],v=[],f=[],c=new a(-n-i,-i,-n-i),d=new a(n+i,i,n+i),h=n+i,p=0;p<=t;p++)for(var m=0;m<=r;m++){var l=m/r,M=p/t,P=l*e,y=M*Math.PI*2,b=(n+i*Math.cos(y))*Math.sin(P),g=i*Math.sin(y),x=(n+i*Math.cos(y))*Math.cos(P),E=Math.sin(P)*Math.cos(y),I=Math.sin(y),z=Math.cos(P)*Math.cos(y);if(s.push(b,g,x),u.push(E,I,z),v.push(l,M),m<r&&p<t){var L=r+1,R=L*p+m,j=L*(p+1)+m,A=L*(p+1)+m+1,N=L*p+m+1;f.push(R,N,j),f.push(N,A,j)}}return{positions:s,normals:u,uvs:v,indices:f,minPos:c,maxPos:d,boundingRadius:h}},capsule:s,circle:function(n){var o=function(n){return(n=t(n)).segments=64,n}(n).segments,r=new Array(3*(o+1));r[0]=0,r[1]=0,r[2]=0;var e=new Array(1+2*o);e[0]=0;for(var s=2*Math.PI/o,a=0;a<o;++a){var u=s*a,v=Math.cos(u),f=Math.sin(u),c=3*(a+1);r[c+0]=v,r[c+1]=f,r[c+2]=0;var d=2*a;e[1+d]=a+1,e[1+(d+1)]=a+2}return o>0&&(e[e.length-1]=1),{positions:r,indices:e,minPos:{x:1,y:1,z:0},maxPos:{x:-1,y:-1,z:0},boundingRadius:1,primitiveMode:i.TRIANGLE_FAN}},translate:function(n,i){for(var o=i.x||0,t=i.y||0,r=i.z||0,e=Math.floor(n.positions.length/3),s=0;s<e;++s){var a=3*s,u=3*s+1,v=3*s+2;n.positions[a]+=o,n.positions[u]+=t,n.positions[v]+=r}return n.minPos&&(n.minPos.x+=o,n.minPos.y+=t,n.minPos.z+=r),n.maxPos&&(n.maxPos.x+=o,n.maxPos.y+=t,n.maxPos.z+=r),n},scale:function(n,i){for(var o,t,r,e=null!==(o=i.x)&&void 0!==o?o:1,s=null!==(t=i.y)&&void 0!==t?t:1,a=null!==(r=i.z)&&void 0!==r?r:1,u=Math.floor(n.positions.length/3),v=0;v<u;++v){var f=3*v,c=3*v+1,d=3*v+2;n.positions[f]*=e,n.positions[c]*=s,n.positions[d]*=a}var h=n.minPos,p=n.maxPos;if(h&&(h.x*=e,h.y*=s,h.z*=a),p&&(p.x*=e,p.y*=s,p.z*=a),h&&p){if(e<0){var m=h.x;h.x=p.x,p.x=m}if(s<0){var l=h.y;h.y=p.y,p.y=l}if(a<0){var M=h.z;h.z=p.z,p.z=M}}return void 0!==n.boundingRadius&&(n.boundingRadius*=Math.max(Math.max(Math.abs(e),Math.abs(s)),Math.abs(a))),n},wireframed:function(n){var o=n.indices;if(!o)return n;if(n.primitiveMode&&n.primitiveMode!==i.TRIANGLE_LIST)return n;for(var t=[[0,1],[1,2],[2,0]],r=[],e={},s=0;s<o.length;s+=3)for(var a=0;a<3;++a){var u=o[s+t[a][0]],v=o[s+t[a][1]],f=u>v?v<<16|u:u<<16|v;void 0===e[f]&&(e[f]=0,r.push(u,v))}return n.indices=r,n.primitiveMode=i.LINE_LIST,n},wireframe:function(n){for(var i=[[0,1],[1,2],[2,0]],o=[],t={},r=0;r<n.length;r+=3)for(var e=0;e<3;++e){var s=n[r+i[e][0]],a=n[r+i[e][1]],u=s>a?a<<16|s:s<<16|a;void 0===t[u]&&(t[u]=0,o.push(s,a))}return o},invWinding:function(n){for(var i=[],o=0;o<n.length;o+=3)i.push(n[o],n[o+2],n[o+1]);return i},toWavefrontOBJ:function(n,o){if(void 0===o&&(o=1),!n.indices||!n.uvs||!n.normals||void 0!==n.primitiveMode&&n.primitiveMode!==i.TRIANGLE_LIST)return"";for(var t=n.positions,r=n.uvs,e=n.normals,s=n.indices,a=function(n){return s[n]+1+"/"+(s[n]+1)+"/"+(s[n]+1)},u="",v=0;v<t.length;v+=3)u+="v "+t[v]*o+" "+t[v+1]*o+" "+t[v+2]*o+"\n";for(var f=0;f<r.length;f+=2)u+="vt "+r[f]+" "+r[f+1]+"\n";for(var c=0;c<e.length;c+=3)u+="vn "+e[c]+" "+e[c+1]+" "+e[c+2]+"\n";for(var d=0;d<s.length;d+=3)u+="f "+a(d)+" "+a(d+1)+" "+a(d+2)+"\n";return u},normals:function(n,i,o){void 0===o&&(o=1);for(var t=new Array(2*n.length),r=0;r<n.length/3;++r){var e=3*r,s=6*r;t[s+0]=n[e+0],t[s+1]=n[e+1],t[s+2]=n[e+2],t[s+3]=n[e+0]+i[e+0]*o,t[s+4]=n[e+1]+i[e+1]*o,t[s+5]=n[e+2]+i[e+2]*o}return t},applyDefaultGeometryOptions:t});n("primitives",z),function(n){n[n.BOX=0]="BOX",n[n.SPHERE=1]="SPHERE",n[n.CYLINDER=2]="CYLINDER",n[n.CONE=3]="CONE",n[n.CAPSULE=4]="CAPSULE",n[n.TORUS=5]="TORUS",n[n.PLANE=6]="PLANE",n[n.QUAD=7]="QUAD"}(I||(I={})),u(I);var L=n("Primitive",(M=v("cc.Primitive"),P=f(I),M(((E=function(n){function i(i){var o;return void 0===i&&(i=I.BOX),(o=n.call(this)||this).type=g&&g(),o.info=x&&x(),o.type=i,o}return c(i,n),i.prototype.onLoaded=function(){m(z[I[this.type].toLowerCase()](this.info),this)},i}(l)).PrimitiveType=I,g=d((b=E).prototype,"type",[P],(function(){return I.BOX})),x=d(b.prototype,"info",[p],(function(){return{}})),y=b))||y));h.Primitive=L,h.primitives=z}}}));