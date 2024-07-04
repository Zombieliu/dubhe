System.register(["./index-92d00b49.js","./pipeline-state-manager-45d8faaf.js","./buffer-barrier-a7de2d9a.js","./director-44a98d9f.js","./mesh-4be1d55f.js"],(function(e){"use strict";var t,n,a,r,s,i,u,o,f,l,h,v,c;return{setters:[function(e){t=e.i,n=e.o},function(){},function(e){a=e.aP,r=e.aQ,s=e.b,i=e.aq,u=e.v},function(e){o=e.bE,f=e.bF},function(e){l=e.M,h=e.d,v=e.i,c=e.B}],execute:function(){var d;e({_:T,r:function(e,n){void 0===n&&(n=0);for(var a,i={positions:[]},u=new DataView(e.data.buffer,e.data.byteOffset,e.data.byteLength),f=e.struct,l=f.primitives[n],h=t(l.vertexBundelIndices);!(a=h()).done;)for(var v,c=a.value,m=f.vertexBundles[c],b=m.view.offset,T=m.view,g=T.length,R=T.stride,A=t(m.attributes);!(v=A()).done;){var M=v.value,x=d[M.name];x&&(i[x]=(i[x]||[]).concat(o(u,M.format,b,g,R))),b+=r[M.format].size}var p=l.indexView;return i.indices=o(u,s["R"+8*p.stride+"UI"],p.offset,p.length),i}}),function(e){e[e.positions=a.ATTR_POSITION]="positions",e[e.normals=a.ATTR_NORMAL]="normals",e[e.uvs=a.ATTR_TEX_COORD]="uvs",e[e.colors=a.ATTR_COLOR]="colors"}(d||(d={}));var m=[new i(a.ATTR_POSITION,s.RGB32F),new i(a.ATTR_NORMAL,s.RGB32F),new i(a.ATTR_TEX_COORD,s.RG32F),new i(a.ATTR_TANGENT,s.RGBA32F),new i(a.ATTR_COLOR,s.RGBA32F)],b=new n;function T(e,i,o){o=o||{};var h,v=[],d=0,T=[],g=0,R=e.positions.slice();if(R.length>0){if(h=null,e.attributes)for(var A,M=t(e.attributes);!(A=M()).done;){var x=A.value;if(x.name===a.ATTR_POSITION){h=x;break}}h||(h=m[0]),v.push(h);var p=r[h.format];g=Math.max(g,Math.floor(R.length/p.count)),T.push({offset:d,data:R,attribute:h}),d+=p.size}if(e.normals&&e.normals.length>0){if(h=null,e.attributes)for(var w,O=t(e.attributes);!(w=O()).done;){var _=w.value;if(_.name===a.ATTR_NORMAL){h=_;break}}h||(h=m[1]);var B=r[h.format];v.push(h),g=Math.max(g,Math.floor(e.normals.length/B.count)),T.push({offset:d,data:e.normals,attribute:h}),d+=B.size}if(e.uvs&&e.uvs.length>0){if(h=null,e.attributes)for(var I,S=t(e.attributes);!(I=S()).done;){var N=I.value;if(N.name===a.ATTR_TEX_COORD){h=N;break}}h||(h=m[2]);var L=r[h.format];v.push(h),g=Math.max(g,Math.floor(e.uvs.length/L.count)),T.push({offset:d,data:e.uvs,attribute:h}),d+=L.size}if(e.tangents&&e.tangents.length>0){if(h=null,e.attributes)for(var G,y=t(e.attributes);!(G=y()).done;){var z=G.value;if(z.name===a.ATTR_TANGENT){h=z;break}}h||(h=m[3]);var F=r[h.format];v.push(h),g=Math.max(g,Math.floor(e.tangents.length/F.count)),T.push({offset:d,data:e.tangents,attribute:h}),d+=F.size}if(e.colors&&e.colors.length>0){if(h=null,e.attributes)for(var E,V=t(e.attributes);!(E=V()).done;){var C=E.value;if(C.name===a.ATTR_COLOR){h=C;break}}h||(h=m[4]);var P=r[h.format];v.push(h),g=Math.max(g,Math.floor(e.colors.length/P.count)),T.push({offset:d,data:e.colors,attribute:h}),d+=P.size}if(e.customAttributes)for(var D=0;D<e.customAttributes.length;D++){var j=e.customAttributes[D],k=r[j.attr.format];v.push(j.attr),g=Math.max(g,Math.floor(j.values.length/k.count)),T.push({offset:d,data:j.values,attribute:j.attr}),d+=k.size}for(var U=new c,X=new ArrayBuffer(g*d),q=new DataView(X),Q=0,H=T;Q<H.length;Q++){var J=H[Q];f(q,J.data,J.attribute.format,J.offset,d)}U.setNextAlignment(0);var K={attributes:v,view:{offset:U.getLength(),length:X.byteLength,count:g,stride:d}};U.addBuffer(X);var W=null,Y=0;if(e.indices){var Z=e.indices;Y=Z.length,W=new ArrayBuffer(2*Y);var $=new DataView(W);f($,Z,s.R16UI)}var ee={primitiveMode:e.primitiveMode||u.TRIANGLE_LIST,vertexBundelIndices:[0]};W&&(U.setNextAlignment(2),ee.indexView={offset:U.getLength(),length:W.byteLength,count:Y,stride:2},U.addBuffer(W));var te=e.minPos;if(!te&&o.calculateBounds){te=n.set(new n,1/0,1/0,1/0);for(var ne=0;ne<g;++ne)n.set(b,R[3*ne+0],R[3*ne+1],R[3*ne+2]),n.min(te,te,b)}var ae=e.maxPos;if(!ae&&o.calculateBounds){ae=n.set(new n,-1/0,-1/0,-1/0);for(var re=0;re<g;++re)n.set(b,R[3*re+0],R[3*re+1],R[3*re+2]),n.max(ae,ae,b)}var se={vertexBundles:[K],primitives:[ee]};return te&&(se.minPosition=new n(te.x,te.y,te.z)),ae&&(se.maxPosition=new n(ae.x,ae.y,ae.z)),i||(i=new l),i.reset({struct:se,data:new Uint8Array(U.getCombined())}),i}function g(e,t){if(t>0){var n=e%t;if(0!==n)return t-n}return 0}e("M",function(){function e(){}return e.createMesh=function(e,t,n){return T(e,t,n)},e.createDynamicMesh=function(e,n,o,f){return function(e,n,o,f){f=f||{maxSubMeshes:1,maxSubMeshVertices:1024,maxSubMeshIndices:1024};var h=[],v=0;if(n.positions.length>0&&h.push(new i(a.ATTR_POSITION,s.RGB32F,!1,v++,!1,0)),n.normals&&n.normals.length>0&&h.push(new i(a.ATTR_NORMAL,s.RGB32F,!1,v++,!1,0)),n.uvs&&n.uvs.length>0&&h.push(new i(a.ATTR_TEX_COORD,s.RG32F,!1,v++,!1,0)),n.tangents&&n.tangents.length>0&&h.push(new i(a.ATTR_TANGENT,s.RGBA32F,!1,v++,!1,0)),n.colors&&n.colors.length>0&&h.push(new i(a.ATTR_COLOR,s.RGBA32F,!1,v++,!1,0)),n.customAttributes)for(var c=0;c<n.customAttributes.length;c++){var d=n.customAttributes[c],m=new i;m.copy(d.attr),m.stream=v++,h.push(m)}for(var b=[],T=[],R=0,A=0;A<f.maxSubMeshes;A++){for(var M,x={vertexBundelIndices:[],primitiveMode:n.primitiveMode||u.TRIANGLE_LIST},p=t(h);!(M=p()).done;){var w=M.value,O=r[w.format],_=f.maxSubMeshVertices*O.size,B={view:{offset:R,length:_,count:0,stride:O.size},attributes:[w]},I=b.length;x.vertexBundelIndices.push(I),b.push(B),R+=_}var S=0;if(n.indices16&&n.indices16.length>0?S=2:n.indices32&&n.indices32.length>0&&(S=4),S>0){R+=g(R,S);var N=f.maxSubMeshIndices*S,L={offset:R,length:N,count:0,stride:S};x.indexView=L,R+=N}T.push(x)}var G={info:{maxSubMeshes:f.maxSubMeshes,maxSubMeshVertices:f.maxSubMeshVertices,maxSubMeshIndices:f.maxSubMeshIndices},bounds:[]};G.bounds.length=f.maxSubMeshes;var y={struct:{vertexBundles:b,primitives:T,dynamic:G},data:new Uint8Array(R)};return o||(o=new l),o.reset(y),o.initialize(),o.updateSubMesh(e,n),o}(e,n,o,f)},e.decodeMesh=function(e){return h(e)},e.inflateMesh=function(e){return v(e)},e}())}}}));
