System.register(["./index-92d00b49.js","./skeleton-9ce18925.js","./director-44a98d9f.js","./mesh-renderer-91d2bae2.js","./pipeline-state-manager-45d8faaf.js","./buffer-barrier-a7de2d9a.js","./deprecated-c8756aed.js","./deprecated-8cbcc834.js","./node-event-c62a1caf.js","./mesh-4be1d55f.js"],(function(t){"use strict";var e,i,r,n,o,s,a,u,l,f,h,d,c,p,_,m,v,T,g,y,b,x,M,w,I,A,k,B,N,E,S,R,P,j,C,O,D,F,U,J,H,z,G,L,W,V,K,X,Y,Z,q,Q,$,tt,et,it;return{setters:[function(t){e=t.l,i=t.t,r=t.Q,n=t.o,o=t.c8,s=t.bC,a=t.i,u=t.bF,l=t.d,f=t.bE,h=t.bX,d=t.bz,c=t.bI,p=t.bH,_=t.cy,m=t.bh,v=t.V,T=t.bj,g=t.az,y=t.cv},function(t){b=t.S},function(t){x=t.a3,M=t.aU,w=t.bH,I=t.b0,A=t.b1,k=t.M,B=t.ax,N=t.bI,E=t.bE,S=t.b4,R=t.bF,P=t.bG},function(t){j=t.a,C=t.M},function(t){O=t.X,D=t.U,F=t.Y,U=t.Z,J=t._,H=t.$},function(t){z=t.ag,G=t.l,L=t.m,W=t.b,V=t.j,K=t.aQ,X=t.a9,Y=t.d,Z=t.f,q=t.aq,Q=t.aP,$=t.a3,tt=t.T},function(t){et=t.T},function(){},function(){},function(t){it=t.M}],execute:function(){t({c:bt,d:xt,e:function(t,e){for(var i=t,r="";null!==i&&i!==e;)r=i.name+"/"+r,i=i.parent;return r.slice(0,-1)},f:st,g:yt});var rt=t("B",Symbol("BakeNodeCurves")),nt=t("h",function(){function t(){}return t.getOrExtract=function(i){var r=t.pool.get(i);if(!r||r.samples!==i.sample){r&&e.director.root.dataPoolManager.releaseAnimationClip(i);var n=Math.ceil(i.sample*i.duration)+1,o=i.sample;r=i[rt](0,o,n),t.pool.set(i,r)}return r},t.destroy=function(e){t.pool.delete(e)},t}());nt.pool=new Map;var ot=new i;function st(t,e,r){for(i.identity(r);t!==e;)i.fromRTS(ot,t.rotation,t.position,t.scale),i.multiply(r,ot,r),t=t.parent;return r}var at=new z(G.POINT,G.POINT,G.NONE,L.CLAMP,L.CLAMP,L.CLAMP),ut=function(t,e,i){t[e+0]=i.m00,t[e+1]=i.m01,t[e+2]=i.m02,t[e+3]=i.m12,t[e+4]=i.m04,t[e+5]=i.m05,t[e+6]=i.m06,t[e+7]=i.m13,t[e+8]=i.m08,t[e+9]=i.m09,t[e+10]=i.m10,t[e+11]=i.m14};function lt(t,e){var i=4/Math.sqrt(e);return 12*Math.ceil(Math.max(480*i,t)/12)}new r,new r,new n,new r,new n;var ft=new n,ht=new n,dt=new n,ct=new n,pt=new i,_t=new i,mt=new o,vt=Number.MAX_SAFE_INTEGER,Tt=(t("J",function(){function t(t){this._device=void 0,this._pool=void 0,this._textureBuffers=new Map,this._formatSize=void 0,this._pixelsPerJoint=void 0,this._customPool=void 0,this._chunkIdxMap=new Map,this._device=t;var e=function(t){return t.getFormatFeatures(W.RGBA32F)&V.SAMPLED_TEXTURE?W.RGBA32F:W.RGBA8}(this._device);this._formatSize=K[e].size,this._pixelsPerJoint=48/this._formatSize,this._pool=new et(t),this._pool.initialize({format:e,roundUpFn:lt}),this._customPool=new et(t),this._customPool.initialize({format:e,roundUpFn:lt})}var e=t.prototype;return e.clear=function(){this._pool.destroy(),this._textureBuffers.clear()},e.registerCustomTextureLayouts=function(t){for(var e=0;e<t.length;e++){var i=t[e],r=i.textureLength;this._device.getFormatFeatures(W.RGBA32F)&V.SAMPLED_TEXTURE||(r*=2);for(var n=this._customPool.createChunk(r),o=0;o<i.contents.length;o++){var s=i.contents[o],a=s.skeleton;this._chunkIdxMap.set(a,n);for(var u=0;u<s.clips.length;u++){var l=s.clips[u];this._chunkIdxMap.set(a^l,n)}}}},e.getDefaultPoseTexture=function(t,e,r){var s=0^t.hash,a=this._textureBuffers.get(s)||null;if(a&&a.bounds.has(e.hash))return a.refCount++,a;var u=t.joints,l=t.bindposes,f=null,h=!1,d=u.length;if(a)a.refCount++;else{var c=12*d,p=this._chunkIdxMap.get(s),_=void 0!==p?this._customPool.alloc(c*Float32Array.BYTES_PER_ELEMENT,p):this._pool.alloc(c*Float32Array.BYTES_PER_ELEMENT);if(!_)return a;a={pixelOffset:_.start/this._formatSize,refCount:1,bounds:new Map,skeletonHash:t.hash,clipHash:0,readyToBeDeleted:!1,handle:_},f=new Float32Array(c),h=!0}n.set(dt,vt,vt,vt),n.set(ct,-vt,-vt,-vt);for(var m=e.getBoneSpaceBounds(t),v=0,T=0;v<d;v++,T+=12){var g=r.getChildByPath(u[v]),y=g?st(g,r,pt):t.inverseBindposes[v],b=m[v];b&&(o.transform(mt,b,y),mt.getBoundary(ft,ht),n.min(dt,dt,ft),n.max(ct,ct,ht)),h&&(g&&i.multiply(y,y,l[v]),ut(f,T,g?y:i.IDENTITY))}var x=[new o];return a.bounds.set(e.hash,x),o.fromPoints(x[0],dt,ct),h&&(this._pool.update(a.handle,f.buffer),this._textureBuffers.set(s,a)),a},e.getSequencePoseTexture=function(t,e,r,s){var a=t.hash^e.hash,u=this._textureBuffers.get(a)||null;if(u&&u.bounds.has(r.hash))return u.refCount++,u;var l=t.joints,f=t.bindposes,h=nt.getOrExtract(e).frames,d=null,c=!1,p=l.length;if(u)u.refCount++;else{var _=12*p*h,m=this._chunkIdxMap.get(a),v=void 0!==m?this._customPool.alloc(_*Float32Array.BYTES_PER_ELEMENT,m):this._pool.alloc(_*Float32Array.BYTES_PER_ELEMENT);if(!v)return null;var T=this._createAnimInfos(t,e,s);u={pixelOffset:v.start/this._formatSize,refCount:1,bounds:new Map,skeletonHash:t.hash,clipHash:e.hash,readyToBeDeleted:!1,handle:v,animInfos:T},d=new Float32Array(_),c=!0}var g=r.getBoneSpaceBounds(t),y=[];u.bounds.set(r.hash,y);for(var b=0;b<h;b++)y.push(new o(vt,vt,vt,-vt,-vt,-vt));for(var x=0,M=0;x<h;x++){for(var w=y[x],I=0;I<p;I++,M+=12){var A=u.animInfos[I],k=A.curveData,B=A.downstream,N=A.bindposeIdx,E=A.bindposeCorrection,S=void 0,R=!0;k&&B?S=i.multiply(pt,k[x],B):k?S=k[x]:B?S=B:(S=t.inverseBindposes[N],R=!1);var P=g[I];if(P){var j=E?i.multiply(_t,S,E):S;o.transform(mt,P,j),mt.getBoundary(ft,ht),n.min(w.center,w.center,ft),n.max(w.halfExtents,w.halfExtents,ht)}c&&(R&&i.multiply(pt,S,f[N]),ut(d,M,R?pt:i.IDENTITY))}o.fromPoints(w,w.center,w.halfExtents)}return c&&(this._pool.update(u.handle,d.buffer),this._textureBuffers.set(a,u)),u},e.releaseHandle=function(t){if(t.refCount>0&&t.refCount--,!t.refCount&&t.readyToBeDeleted){var e=t.skeletonHash^t.clipHash;(void 0!==this._chunkIdxMap.get(e)?this._customPool:this._pool).free(t.handle),this._textureBuffers.get(e)===t&&this._textureBuffers.delete(e)}},e.releaseSkeleton=function(t){for(var e=this._textureBuffers.values(),i=e.next();!i.done;){var r=i.value;r.skeletonHash===t.hash&&(r.readyToBeDeleted=!0,r.refCount?this._textureBuffers.delete(r.skeletonHash^r.clipHash):this.releaseHandle(r)),i=e.next()}},e.releaseAnimationClip=function(t){for(var e=this._textureBuffers.values(),i=e.next();!i.done;){var r=i.value;r.clipHash===t.hash&&(r.readyToBeDeleted=!0,r.refCount?this._textureBuffers.delete(r.skeletonHash^r.clipHash):this.releaseHandle(r)),i=e.next()}},e._createAnimInfos=function(t,e,r){for(var n=[],o=t.joints,s=t.bindposes,a=o.length,u=nt.getOrExtract(e),l=0;l<a;l++){for(var f=o[l],h=u.joints[f],d=r.getChildByPath(f),c=void 0,p=void 0;!h;){var _=f.lastIndexOf("/");if(f=f.substring(0,_),h=u.joints[f],d?(c||(c=new i),i.fromRTS(pt,d.rotation,d.position,d.scale),i.multiply(c,pt,c),d=d.parent):p=f,_<0)break}var m=l,v=void 0;if(void 0!==p&&h){m=l-1;for(var T=0;T<a;T++)if(o[T]===p){m=T,v=new i,i.multiply(v,s[T],t.inverseBindposes[l]);break}}n.push({curveData:h&&h.transforms,downstream:c,bindposeIdx:m,bindposeCorrection:v})}return n},s(t,[{key:"pixelsPerJoint",get:function(){return this._pixelsPerJoint}}]),t}()),t("i",function(){function t(t){this._pool=new Map,this._device=void 0,this._device=t}var e=t.prototype;return e.getData=function(t){void 0===t&&(t="-1");var e=this._pool.get(t);if(e)return e;var i=this._device.createBuffer(new X(Y.UNIFORM|Y.TRANSFER_DST,Z.HOST|Z.DEVICE,O.SIZE,O.SIZE)),r=new Float32Array([0,0,0,0]);i.update(r);var n={buffer:i,data:r,dirty:!1,dirtyForJSB:new Uint8Array([0]),currentClip:null};return this._pool.set(t,n),n},e.destroy=function(t){var e=this._pool.get(t);e&&(e.buffer.destroy(),this._pool.delete(t))},e.switchClip=function(t,e){return t.currentClip=e,t.data[0]=0,t.buffer.update(t.data),t.dirty=!1,t},e.clear=function(){for(var t,e=a(this._pool.values());!(t=e()).done;)t.value.buffer.destroy();this._pool.clear()},t}()),[]),gt=new Map;function yt(t,e){for(var r=0,n=i.IDENTITY;t;){if(t.stamp===e||t.stamp+1===e&&!t.node.hasChangedFlags){n=t.world,t.stamp=e;break}t.stamp=e,Tt[r++]=t,t=t.parent}for(;r>0;){t=Tt[--r],Tt[r]=null;var o=t.node;i.fromRTS(t.local,o.rotation,o.position,o.scale),n=i.multiply(t.world,n,t.local)}return n}function bt(t,e){for(var r,n=null,o=0;t!==e;){var s=t.uuid;if(gt.has(s)){n=gt.get(s);break}n={node:t,local:new i,world:new i,stamp:-1,parent:null},gt.set(s,n),Tt[o++]=n,t=t.parent,n=null}for(;o>0;)r=Tt[--o],Tt[o]=null,r.parent=n,n=r;return n}function xt(t){for(var e=gt.get(t.uuid)||null;e;)gt.delete(e.node.uuid),e=e.parent}var Mt=[{name:"CC_USE_SKINNING",value:!0},{name:"CC_USE_REAL_TIME_JOINT_TEXTURE",value:!1}],wt=[{name:"CC_USE_SKINNING",value:!0},{name:"CC_USE_REAL_TIME_JOINT_TEXTURE",value:!0}];function It(t,e,i,r){for(var n=0;n<i.length;n++){for(var o=i[n],s=-1,a=0;a<o.length;a++)if(o[a]===r){s=a;break}s>=0&&(e.push(n),t.push(s))}}var At=new n,kt=new n,Bt=new n,Nt=new n,Et=new i,St=new o,Rt=function(){this._format=w.RGBA32F,this._textures=[],this._buffers=[]};Rt.WIDTH=256,Rt.HEIGHT=3;var Pt,jt,Ct,Ot,Dt,Ft,Ut,Jt,Ht,zt,Gt,Lt,Wt,Vt,Kt,Xt,Yt,Zt,qt,Qt,$t,te,ee,ie,re,ne,oe,se,ae,ue,le,fe,he=function(t){function e(){var e;return(e=t.call(this)||this)._buffers=[],e._dataArray=[],e._joints=[],e._bufferIndices=null,e._realTimeJointTexture=new Rt,e._realTimeTextureMode=!1,e.type=k.SKINNING,e}u(e,t);var r=e.prototype;return r.destroy=function(){if(this.bindSkeleton(),this._buffers.length){for(var e=0;e<this._buffers.length;e++)this._buffers[e].destroy();this._buffers.length=0}this._dataArray.length=0,this._realTimeJointTexture._textures.forEach((function(t){t.destroy()})),this._realTimeJointTexture._textures.length=0,this._realTimeJointTexture._buffers.length=0,t.prototype.destroy.call(this)},r.uploadAnimation=function(){},r.bindSkeleton=function(t,e,i){void 0===t&&(t=null),void 0===e&&(e=null),void 0===i&&(i=null);for(var r=0;r<this._joints.length;r++)xt(this._joints[r].target);if(this._bufferIndices=null,this._joints.length=0,t&&e&&i){this._realTimeTextureMode=!1,D.JOINT_UNIFORM_CAPACITY<t.joints.length&&(this._realTimeTextureMode=!0),this.transform=e;var n=i.getBoneSpaceBounds(t),o=i.struct.jointMaps;this._ensureEnoughBuffers(o&&o.length||1),this._bufferIndices=i.jointBufferIndices,this._initRealTimeJointTexture();for(var s=0;s<t.joints.length;s++){var a=n[s],u=e.getChildByPath(t.joints[s]);if(a&&u){var l=bt(u,e),f=t.bindposes[s],h=[],d=[];o?It(h,d,o,s):(h.push(s),d.push(0)),this._joints.push({indices:h,buffers:d,bound:a,target:u,bindpose:f,transform:l})}}}},r.updateTransform=function(t){var e=this.transform;(e.hasChangedFlags||e.isTransformDirty())&&(e.updateWorldTransform(),this._localDataUpdated=!0),n.set(At,1/0,1/0,1/0),n.set(kt,-1/0,-1/0,-1/0);for(var i=0;i<this._joints.length;i++){var r=this._joints[i],s=r.bound,a=yt(r.transform,t);o.transform(St,s,a),St.getBoundary(Bt,Nt),n.min(At,At,Bt),n.max(kt,kt,Nt)}var u=this._worldBounds;this._modelBounds&&u&&(o.fromPoints(this._modelBounds,At,kt),this._modelBounds.transform(e._mat,e._pos,e._rot,e._scale,this._worldBounds))},r.updateUBOs=function(e){t.prototype.updateUBOs.call(this,e);for(var r=0;r<this._joints.length;r++){var n=this._joints[r],o=n.indices,s=n.buffers,a=n.transform,u=n.bindpose;i.multiply(Et,a.world,u);for(var l=0;l<s.length;l++)ut(this._dataArray[s[l]],12*o[l],Et)}if(this._realTimeTextureMode)this._updateRealTimeJointTextureBuffer();else for(var f=0;f<this._buffers.length;f++)this._buffers[f].update(this._dataArray[f]);return!0},r.initSubModel=function(e,i,r){var n=i.vertexBuffers,o=i.iaInfo;o.vertexBuffers=i.jointMappedBuffers,t.prototype.initSubModel.call(this,e,i,r),o.vertexBuffers=n},r.getMacroPatches=function(e){var i=t.prototype.getMacroPatches.call(this,e),r=Mt;return this._realTimeTextureMode&&(r=wt),i?r.concat(i):r},r._updateLocalDescriptors=function(e,i){t.prototype._updateLocalDescriptors.call(this,e,i);var r=this._bufferIndices[e];if(this._realTimeTextureMode)this._bindRealTimeJointTexture(r,i);else{var n=this._buffers[r];n&&i.bindBuffer(D.BINDING,n)}},r._updateInstancedAttributes=function(e,i){i.passes[0].batchingScheme!==x.NONE&&l(3936,this.node.getPathInHierarchy()),t.prototype._updateInstancedAttributes.call(this,e,i)},r._ensureEnoughBuffers=function(t){if(this._buffers.length){for(var e=0;e<this._buffers.length;e++)this._buffers[e].destroy();this._buffers.length=0}if(this._dataArray.length&&(this._dataArray.length=0),this._realTimeTextureMode)for(var i=0;i<t;i++){var r=Rt.WIDTH;this._dataArray[i]=new Float32Array(12*r)}else for(var n=0;n<t;n++){this._buffers[n]=this._device.createBuffer(new X(Y.UNIFORM|Y.TRANSFER_DST,Z.HOST|Z.DEVICE,D.SIZE,D.SIZE));var o=D.JOINT_UNIFORM_CAPACITY;this._dataArray[n]=new Float32Array(12*o)}},r._initRealTimeJointTexture=function(){if(this._realTimeJointTexture._textures.length&&(this._realTimeJointTexture._textures.forEach((function(t){t.destroy()})),this._realTimeJointTexture._textures.length=0),this._realTimeJointTexture._buffers.length=0,this._realTimeTextureMode){var t=M.root.device,e=Rt.WIDTH,i=Rt.HEIGHT;0==(t.getFormatFeatures(W.RGBA32F)&V.SAMPLED_TEXTURE)&&(this._realTimeJointTexture._format=w.RGBA8888,e=4*Rt.WIDTH);for(var r=this._realTimeJointTexture._textures,n=this._realTimeJointTexture._buffers,o=this._realTimeJointTexture._format,s=0;s<this._dataArray.length;s++){n[s]=new Float32Array(4*Rt.HEIGHT*Rt.WIDTH);var a=n[s],u=o===w.RGBA32F?a:new Uint8Array(a.buffer),l=new I({width:e,height:i,_data:u,_compressed:!1,format:o}),f=new A;f.setFilters(A.Filter.NEAREST,A.Filter.NEAREST),f.setMipFilter(A.Filter.NONE),f.setWrapMode(A.WrapMode.CLAMP_TO_EDGE,A.WrapMode.CLAMP_TO_EDGE,A.WrapMode.CLAMP_TO_EDGE),f.image=l,r[s]=f}}},r._bindRealTimeJointTexture=function(t,e){if(this._realTimeTextureMode){var i=this._realTimeJointTexture._textures[t];if(i){var r=i.getGFXTexture(),n=i.getGFXSampler();e.bindTexture(F,r),e.bindSampler(F,n)}}},r._updateRealTimeJointTextureBuffer=function(){if(this._realTimeTextureMode)for(var t=this._realTimeJointTexture._textures,e=this._realTimeJointTexture._buffers,i=0;i<t.length;i++){for(var r=e[i],n=this._dataArray[i],o=n.length/12,s=0,a=0,u=0;u<o;u++)a=4*u,r[a++]=n[s++],r[a++]=n[s++],r[a++]=n[s++],r[a++]=n[s++],a=4*(u+Rt.WIDTH),r[a++]=n[s++],r[a++]=n[s++],r[a++]=n[s++],r[a++]=n[s++],a=4*(u+2*Rt.WIDTH),r[a++]=n[s++],r[a++]=n[s++],r[a++]=n[s++],r[a++]=n[s++];var l=this._realTimeJointTexture._format===w.RGBA32F?r:new Uint8Array(r.buffer);t[i].uploadData(l)}},e}(j),de=[{name:"CC_USE_SKINNING",value:!0},{name:"CC_USE_BAKED_ANIMATION",value:!0}],ce=function(t){function i(){var i;(i=t.call(this)||this).uploadedAnim=void 0,i._jointsMedium=void 0,i._skeleton=null,i._mesh=null,i._dataPoolManager=void 0,i._instAnimInfoIdx=-1,i.type=k.BAKED_SKINNING,i._dataPoolManager=e.director.root.dataPoolManager;var r=new Float32Array(4),n=i._dataPoolManager.jointAnimationInfo.getData();return i._jointsMedium={buffer:null,jointTextureInfo:r,animInfo:n,texture:null,boundsInfo:null},i}u(i,t);var r=i.prototype;return r.destroy=function(){this.uploadedAnim=void 0,this._jointsMedium.boundsInfo=null,this._jointsMedium.buffer&&(this._jointsMedium.buffer.destroy(),this._jointsMedium.buffer=null),this._applyJointTexture(),t.prototype.destroy.call(this)},r.bindSkeleton=function(t,e,i){if(void 0===t&&(t=null),void 0===e&&(e=null),void 0===i&&(i=null),this._skeleton=t,this._mesh=i,t&&e&&i){this.transform=e;var r=this._dataPoolManager;this._jointsMedium.animInfo=r.jointAnimationInfo.getData(e.uuid),this._jointsMedium.buffer||(this._jointsMedium.buffer=this._device.createBuffer(new X(Y.UNIFORM|Y.TRANSFER_DST,Z.DEVICE,U.SIZE,U.SIZE)))}},r.updateTransform=function(e){if(t.prototype.updateTransform.call(this,e),this.uploadedAnim){var i=this._jointsMedium,r=i.animInfo,n=i.boundsInfo[r.data[0]],o=this._worldBounds;if(o&&n){var s=this.transform;n.transform(s._mat,s._pos,s._rot,s._scale,o)}}},r.updateUBOs=function(e){t.prototype.updateUBOs.call(this,e);for(var i=this._jointsMedium.animInfo,r=!1,n=this._instAnimInfoIdx,o=0;o<this._subModels.length;o++){var s=this._subModels[o];n>=0?s.instancedAttributeBlock.views[n][0]=i.data[0]:r=!0}return r&&i.dirty&&(i.buffer.update(i.data),i.dirty=!1),!0},r.getMacroPatches=function(e){var i=t.prototype.getMacroPatches.call(this,e);return i?i.concat(de):de},r.uploadAnimation=function(t){if(this._skeleton&&this._mesh&&this.uploadedAnim!==t){this.uploadedAnim=t;var e=this._dataPoolManager,i=null;t?(i=e.jointTexturePool.getSequencePoseTexture(this._skeleton,t,this._mesh,this.transform),this._jointsMedium.boundsInfo=i&&i.bounds.get(this._mesh.hash),this._modelBounds=null):(i=e.jointTexturePool.getDefaultPoseTexture(this._skeleton,this._mesh,this.transform),this._jointsMedium.boundsInfo=null,this._modelBounds=i&&i.bounds.get(this._mesh.hash)[0]),this._applyJointTexture(i)}},r._applyJointTexture=function(t){void 0===t&&(t=null);var e=this._jointsMedium.texture;if(e&&e!==t&&this._dataPoolManager.jointTexturePool.releaseHandle(e),this._jointsMedium.texture=t,t){var i=this._jointsMedium,r=i.buffer,n=i.jointTextureInfo;n[0]=t.handle.texture.width,n[1]=this._skeleton.joints.length,n[2]=t.pixelOffset+.1,n[3]=1/n[0],this.updateInstancedJointTextureInfo(),r&&r.update(n);for(var o=t.handle.texture,s=0;s<this._subModels.length;++s)this._subModels[s].descriptorSet.bindTexture(J,o)}},r._updateLocalDescriptors=function(e,i){t.prototype._updateLocalDescriptors.call(this,e,i);var r=this._jointsMedium,n=r.buffer,o=r.texture,s=r.animInfo;if(i.bindBuffer(U.BINDING,n),i.bindBuffer(O.BINDING,s.buffer),o){var a=this._device.getSampler(at);i.bindTexture(J,o.handle.texture),i.bindSampler(J,a)}},r._updateInstancedAttributes=function(e,i){t.prototype._updateInstancedAttributes.call(this,e,i),this._instAnimInfoIdx=i.getInstancedAttributeIndex(H),this.updateInstancedJointTextureInfo()},r.updateInstancedJointTextureInfo=function(){for(var t=this._jointsMedium,e=t.jointTextureInfo,i=t.animInfo,r=this._instAnimInfoIdx,n=0;n<this._subModels.length;n++){var o=this._subModels[n].instancedAttributeBlock.views;if(r>=0&&o.length>0){var s=o[r];s[0]=i.data[0],s[1]=e[1],s[2]=e[2]}}},i}(j),pe=t("S",(Pt=f("cc.SkinnedMeshRenderer"),jt=_(100),Ct=h(b),Ot=h(B),Dt=h(b),Ft=h(B),Pt(Ut=jt((Jt=function(t){function i(){var e;return(e=t.call(this)||this)._skeleton=Ht&&Ht(),e._skinningRoot=zt&&zt(),e._clip=null,e.associatedAnimation=null,e._modelType=ce,e}u(i,t);var r=i.prototype;return r.onLoad=function(){t.prototype.onLoad.call(this),this._tryBindAnimation()},r.onDestroy=function(){this.associatedAnimation&&(this.associatedAnimation.notifySkinnedMeshRemoved(this),d(null===this.associatedAnimation)),t.prototype.onDestroy.call(this)},r.uploadAnimation=function(t){this._clip=t,this.model&&this.model.uploadAnimation&&this.model.uploadAnimation(t)},r.setUseBakedAnimation=function(t,i){void 0===t&&(t=!0),void 0===i&&(i=!1);var r=t?ce:he;(i||this._modelType!==r)&&(this._modelType=r,this._model&&(e.director.root.destroyModel(this._model),this._model=null,this._models.length=0,this._updateModels(),this._updateCastShadow(),this._updateReceiveShadow(),this._updateUseLightProbe(),this.enabledInHierarchy&&this._attachToScene()))},r.setSharedMaterial=function(e,i){t.prototype.setSharedMaterial.call(this,e,i),this._modelType===he&&this.getMaterialInstance(i)},r._updateModelParams=function(){this._update(),t.prototype._updateModelParams.call(this)},r._tryBindAnimation=function(){var t=this._skinningRoot;if(t){for(var e=!1,i=this.node;i;i=i.parent)if(i===t){e=!0;break}if(e){var r=t.getComponent("cc.SkeletalAnimation");r&&r.enabledInHierarchy?r.notifySkinnedMeshAdded(this):this.setUseBakedAnimation(!1)}}},r._update=function(){this.model&&(this.model.bindSkeleton(this._skeleton,this._skinningRoot,this._mesh),this.model.uploadAnimation&&this.model.uploadAnimation(this._clip))},s(i,[{key:"skeleton",get:function(){return this._skeleton},set:function(t){t!==this._skeleton&&(this._skeleton=t,this._update())}},{key:"skinningRoot",get:function(){return this._skinningRoot},set:function(t){t!==this._skinningRoot&&(this._skinningRoot=t,this._tryBindAnimation(),this._update())}},{key:"model",get:function(){return this._model}}]),i}(C),Ht=c(Jt.prototype,"_skeleton",[Ct],(function(){return null})),zt=c(Jt.prototype,"_skinningRoot",[Ot],(function(){return null})),p(Jt.prototype,"skeleton",[Dt],Object.getOwnPropertyDescriptor(Jt.prototype,"skeleton"),Jt.prototype),p(Jt.prototype,"skinningRoot",[Ft],Object.getOwnPropertyDescriptor(Jt.prototype,"skinningRoot"),Jt.prototype),Ut=Jt))||Ut)||Ut)),_e=new q(Q.ATTR_BATCH_ID,W.R32F),me=new q(Q.ATTR_BATCH_UV,W.RG32F),ve=K[_e.format].size+K[me.format].size,Te=t("b",(Gt=f("cc.SkinnedMeshUnit"),Lt=h(it),Wt=h(b),Vt=h(S),Kt=h(pe),Gt((Yt=function(){function t(){this.mesh=Zt&&Zt(),this.skeleton=qt&&qt(),this.material=Qt&&Qt(),this._localTransform=$t&&$t(),this._offset=te&&te(),this._size=ee&&ee()}return s(t,[{key:"offset",get:function(){return this._offset},set:function(t){v.copy(this._offset,t)}},{key:"size",get:function(){return this._size},set:function(t){v.copy(this._size,t)}},{key:"copyFrom",get:function(){return null},set:function(t){t&&(this.mesh=t.mesh,this.skeleton=t.skeleton,this.material=t.getSharedMaterial(0),t.skinningRoot&&st(t.node,t.skinningRoot,this._localTransform))}}]),t}(),Zt=c(Yt.prototype,"mesh",[Lt],(function(){return null})),qt=c(Yt.prototype,"skeleton",[Wt],(function(){return null})),Qt=c(Yt.prototype,"material",[Vt],(function(){return null})),$t=c(Yt.prototype,"_localTransform",[T],(function(){return new i})),te=c(Yt.prototype,"_offset",[T],(function(){return new v(0,0)})),ee=c(Yt.prototype,"_size",[T],(function(){return new v(1,1)})),p(Yt.prototype,"copyFrom",[Kt],Object.getOwnPropertyDescriptor(Yt.prototype,"copyFrom"),Yt.prototype),Xt=Yt))||Xt)),ge=new i;new i;var ye=new n,be=t("a",(ie=f("cc.SkinnedMeshBatchRenderer"),re=_(100),ne=h([g]),oe=h([Te]),ie(se=re((ae=function(t){function r(){for(var e,i=arguments.length,r=new Array(i),n=0;n<i;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))||this).atlasSize=ue&&ue(),e.batchableTextureNames=le&&le(),e.units=fe&&fe(),e._textures={},e._batchMaterial=null,e}u(r,t);var o=r.prototype;return o.onLoad=function(){t.prototype.onLoad.call(this),this.cook()},o.onDestroy=function(){for(var e in this._textures)this._textures[e].destroy();this._textures={},this._mesh&&(this._mesh.destroy(),this._mesh=null),t.prototype.onDestroy.call(this)},o._onMaterialModified=function(e){this.cookMaterials(),t.prototype._onMaterialModified.call(this,e,this.getMaterialInstance(e))},o.cook=function(){this.cookMaterials(),this.cookSkeletons(),this.cookMeshes()},o.cookMaterials=function(){var t=this;this._batchMaterial||(this._batchMaterial=this.getSharedMaterial(0));var e=this.getMaterialInstance(0);if(e&&this._batchMaterial&&this._batchMaterial.effectAsset){e.copy(this._batchMaterial),this.resizeAtlases();for(var i=e.effectAsset.techniques[e.technique],r=function(r){var n=i.passes[r];if(!n.properties)return 1;var o=function(i){if(n.properties[i].type>=tt.SAMPLER1D){var o=null;t.batchableTextureNames.find((function(t){return t===i}))?((o=t._textures[i])||(o=t.createTexture(i)),t.cookTextures(o,i,r)):t.units.some((function(t){return o=t.material&&t.material.getProperty(i,r)})),o&&e.setProperty(i,o,r)}else{for(var s=[],a=0;a<t.units.length;a++){var u=t.units[a];u.material&&s.push(u.material.getProperty(i.slice(0,-3),r))}e.setProperty(i,s,r)}};for(var s in n.properties)o(s)},n=0;n<i.passes.length;n++)r(n)}else console.warn("incomplete batch material!")},o.cookSkeletons=function(){if(this._skinningRoot){for(var t=[],e=[],r=0;r<this.units.length;r++){var n=this.units[r];if(n&&n.skeleton){var o=n.skeleton;i.invert(ge,n._localTransform);for(var s=function(){var r=o.joints[a];if(t.findIndex((function(t){return t===r}))>=0)return 1;t.push(r),e.push(i.multiply(new i,o.bindposes[a]||i.IDENTITY,ge))},a=0;a<o.joints.length;a++)s()}}var u=Array.from(Array(t.length).keys()).sort((function(e,i){return t[e]>t[i]?1:t[e]<t[i]?-1:0})),l=new b;l.joints=t.map((function(t,e,i){return i[u[e]]})),l.bindposes=e.map((function(t,e,i){return i[u[e]]})),this._skeleton&&this._skeleton.destroy(),this.skeleton=l}else console.warn("no skinning root specified!")},o.cookMeshes=function(){for(var t=this,e=!1,r=0;r<this.units.length;r++)if(this.units[r].mesh){e=!0;break}if(e&&this._skinningRoot){this._mesh?this._mesh.destroyRenderingMesh():this._mesh=new it;for(var o=0,s=W.UNKNOWN,a=0,u=W.UNKNOWN,l=0,f=W.UNKNOWN,h=0,d=W.UNKNOWN,c=0,p=W.UNKNOWN,_=new Array(this.units.length),m=this.units.length,v=0;v<m;v++){var T=this.units[v];T&&T.skeleton&&(_[v]=T.skeleton.joints.map((function(e){return t._skeleton.joints.findIndex((function(t){return e===t}))})))}for(var g=function(){var e=t.units[y];if(!e||!e.mesh||!e.mesh.data)return 1;var r=t._createUnitMesh(y,e.mesh),m=new DataView(r.data.buffer);i.invert(ge,e._localTransform),i.transpose(ge,ge);for(var v=e.offset,T=e.size,g=function(){var t=r.struct.vertexBundles[b];o=t.view.offset,s=W.UNKNOWN;for(var i=0;i<t.attributes.length;i++){var g=t.attributes[i];if(g.name===Q.ATTR_POSITION){s=g.format;break}o+=K[g.format].size}if(s){for(var x=E(m,s,o,t.view.length,t.view.stride),M=0;M<x.length;M+=3)n.fromArray(ye,x,M),n.transformMat4(ye,ye,e._localTransform),n.toArray(x,ye,M);R(m,x,s,o,t.view.stride)}a=t.view.offset,u=W.UNKNOWN;for(var w=0;w<t.attributes.length;w++){var I=t.attributes[w];if(I.name===Q.ATTR_NORMAL){u=I.format;break}a+=K[I.format].size}if(u){for(var A=E(m,u,a,t.view.length,t.view.stride),k=0;k<A.length;k+=3)n.fromArray(ye,A,k),n.transformMat4Normal(ye,ye,ge),n.toArray(A,ye,k);R(m,A,u,a,t.view.stride)}l=t.view.offset,f=W.UNKNOWN;for(var B=0;B<t.attributes.length;B++){var N=t.attributes[B];if(N.name===Q.ATTR_TANGENT){f=N.format;break}l+=K[N.format].size}if(f){for(var S=E(m,f,l,t.view.length,t.view.stride),j=0;j<S.length;j+=3)n.fromArray(ye,S,j),n.transformMat4Normal(ye,ye,ge),n.toArray(S,ye,j);R(m,S,f,l,t.view.stride)}h=t.view.offset,d=W.UNKNOWN;for(var C=0;C<t.attributes.length;C++){var O=t.attributes[C];if(O.name===Q.ATTR_BATCH_UV){d=O.format;break}h+=K[O.format].size}d&&P(m,(function(t,e){var i,r=0===e?"x":"y";return(t=(i=t)-Math.floor(i))*T[r]+v[r]}),d,h,t.view.length,t.view.stride,m);var D=_[y];if(!D)return 1;c=t.view.offset,p=W.UNKNOWN;for(var F=0;F<t.attributes.length;F++){var U=t.attributes[F];if(U.name===Q.ATTR_JOINTS){p=U.format;break}c+=K[U.format].size}p&&P(m,(function(t){return D[t]}),p,c,t.view.length,t.view.stride,m)},b=0;b<r.struct.vertexBundles.length;b++)g();t._mesh.merge(r)},y=0;y<m;y++)g();this._onMeshChanged(this._mesh),this._updateModels()}},o.cookTextures=function(t,i,r){for(var n=[],o=[],s=[],a=[],u=0;u<this.units.length;u++){var l=this.units[u];if(l.material){var f=l.material.getProperty(i,r);if(f&&f.image&&f.image.data){var h=new $;h.texOffset.x=l.offset.x*this.atlasSize,h.texOffset.y=l.offset.y*this.atlasSize,h.texExtent.width=l.size.x*this.atlasSize,h.texExtent.height=l.size.y*this.atlasSize;var d=f.image.data;ArrayBuffer.isView(d)?(s.push(d),a.push(h)):(n.push(d),o.push(h))}}}var c=t.getGFXTexture(),p=e.director.root.device;s.length>0&&p.copyBuffersToTexture(s,c,a),n.length>0&&p.copyTexImagesToTexture(n,c,o)},o.createTexture=function(t){var e=new A;return e.setFilters(N.LINEAR,N.LINEAR),e.setMipFilter(N.NEAREST),e.reset({width:this.atlasSize,height:this.atlasSize,format:w.RGBA8888}),this._textures[t]=e,e},o.resizeAtlases=function(){for(var t in this._textures)this._textures[t].reset({width:this.atlasSize,height:this.atlasSize,format:w.RGBA8888})},o._createUnitMesh=function(t,i){for(var r=JSON.parse(JSON.stringify(i.struct)),n={},o=0;o<i.struct.primitives.length;o++){for(var s=i.struct.primitives[o],a=0,u=W.UNKNOWN,l=0;l<s.vertexBundelIndices.length;l++){var f=i.struct.vertexBundles[s.vertexBundelIndices[l]];a=f.view.offset,u=W.UNKNOWN;for(var h=0;h<f.attributes.length;h++){var d=f.attributes[h];if(d.name===Q.ATTR_TEX_COORD){u=d.format;break}a+=K[d.format].size}if(u)break}if(void 0===n[l]){n[l]=[u,a];var c=r.vertexBundles[l];c.attributes.push(_e),c.attributes.push(me),c.view.offset=0,c.view.length+=c.view.count*ve,c.view.stride+=ve}}for(var p=0,_=0;_<r.vertexBundles.length;_++)p+=r.vertexBundles[_].view.length;for(var m=0;m<r.primitives.length;m++){var v=r.primitives[m];v.indexView&&(v.indexView.offset=p,p+=v.indexView.length)}var T=new Uint8Array(p),g=i.data,y=new DataView(T.buffer),b=new DataView(g.buffer),x=e.sys.isLittleEndian;for(var M in n)for(var w=r.vertexBundles[M],I=i.struct.vertexBundles[M],A=n[M],k=A[0],B=A[1],N=E(b,k,B,I.view.length,I.view.stride),S=I.view,R=w.view,P=S.stride,j=R.stride,C=S.offset,O=R.offset,D=0;D<R.count;D++){var F=g.subarray(C,C+P);T.set(F,O),y.setFloat32(O+P,t),y.setFloat32(O+P+4,N[2*D],x),y.setFloat32(O+P+8,N[2*D+1],x),O+=j,C+=P}for(var U=0;U<r.primitives.length;U++){var J=i.struct.primitives[U],H=r.primitives[U];if(J.indexView&&H.indexView)for(var z=J.indexView.stride,G=H.indexView.stride,L=J.indexView.offset,V=H.indexView.offset,X=0;X<H.indexView.count;X++){var Y=g.subarray(L,L+z);T.set(Y,V),V+=G,L+=z}}var Z=new it;return Z.reset({struct:r,data:T}),Z},s(r,[{key:"mesh",get:function(){return t.prototype.mesh},set:function(t){this.mesh=t}},{key:"skeleton",get:function(){return t.prototype.skeleton},set:function(t){this.skeleton=t}}]),r}(pe),ue=c(ae.prototype,"atlasSize",[T],(function(){return 1024})),le=c(ae.prototype,"batchableTextureNames",[ne,T],(function(){return[]})),fe=c(ae.prototype,"units",[oe,T],(function(){return[]})),p(ae.prototype,"mesh",[m],Object.getOwnPropertyDescriptor(ae.prototype,"mesh"),ae.prototype),p(ae.prototype,"skeleton",[m],Object.getOwnPropertyDescriptor(ae.prototype,"skeleton"),ae.prototype),se=ae))||se)||se));e.SkinningModelComponent=pe,y(pe,"cc.SkinningModelComponent"),e.SkinningModelUnit=Te,y(Te,"cc.SkinningModelUnit"),e.BatchedSkinningModelComponent=be,y(be,"cc.BatchedSkinningModelComponent")}}}));
