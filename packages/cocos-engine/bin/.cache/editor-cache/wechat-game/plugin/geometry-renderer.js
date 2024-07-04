System.register(["./index-92d00b49.js","./pipeline-state-manager-45d8faaf.js","./buffer-barrier-a7de2d9a.js"],(function(e){"use strict";var t,i,r,n,a,s,d,o,h,v,f,u,y,l,c,w,x;return{setters:[function(e){t=e.o,i=e.l,r=e.B,n=e.q,a=e.d,s=e.t,d=e.N},function(e){o=e.P,h=e.S},function(e){v=e.aq,f=e.aP,u=e.b,y=e.ab,l=e.a9,c=e.d,w=e.f,x=e.as}],execute:function(){var _,g=new t,L=new t,M=new t,m=new t,z=new t,A=new t,p=new t,T=new t,b=new t,E=new t;!function(e){e[e.LINE=0]="LINE",e[e.DASHED_LINE=1]="DASHED_LINE",e[e.TRIANGLE=2]="TRIANGLE"}(_||(_={}));var C=function(){function e(){this._maxVertices=0,this._vertexCount=0,this._stride=0,this._vertices=void 0,this._buffer=void 0,this._inputAssembler=void 0}var t=e.prototype;return t.init=function(e,t,i,r){this._maxVertices=t,this._vertexCount=0,this._stride=i,this._vertices=new Float32Array(t*i/Float32Array.BYTES_PER_ELEMENT),this._buffer=e.createBuffer(new l(c.VERTEX|c.TRANSFER_DST,w.DEVICE,t*i,i)),this._inputAssembler=e.createInputAssembler(new x(r,[this._buffer],null))},t.getCount=function(){return Math.min(this._vertexCount,this._maxVertices)},t.empty=function(){return 0===this._vertexCount},t.reset=function(){this._vertexCount=0},t.update=function(){if(!this.empty()){var e=this.getCount()*this._stride;this._buffer.update(this._vertices,e)}},t.destroy=function(){this._inputAssembler&&this._inputAssembler.destroy(),this._buffer&&this._buffer.destroy()},e}(),I=function(){this.lines=[],this.dashedLines=[],this.triangles=[];for(var e=0;e<2;e++)this.lines[e]=new C,this.dashedLines[e]=new C,this.triangles[e]=new C},R=e("GeometryRenderer",function(){function e(){this._device=null,this._buffers=void 0,this._buffers=new I}var i=e.prototype;return i.activate=function(e,i){this._device=e;for(var a=[new v(f.ATTR_POSITION,u.RGB32F),new v(f.ATTR_COLOR,u.RGBA32F)],s=[new v(f.ATTR_POSITION,u.RGB32F),new v(f.ATTR_NORMAL,u.RGBA32F),new v(f.ATTR_COLOR,u.RGBA32F)],d=i?i.maxLines:3e4,o=i?i.maxDashedLines:1e4,h=i?i.maxTriangles:1e4,y=Float32Array.BYTES_PER_ELEMENT*(t.length+r.length),l=Float32Array.BYTES_PER_ELEMENT*(t.length+n.length+r.length),c=0;c<2;c++)this._buffers.lines[c].init(this._device,2*d,y,a),this._buffers.dashedLines[c].init(this._device,2*o,y,a),this._buffers.triangles[c].init(this._device,3*h,l,s)},i.render=function(e,t,i){for(var r=i.geometryRendererPasses,n=i.geometryRendererShaders,a=0,s=[1,2],d=0;d<2;d++){var v=this._buffers.lines[d];if(!v.empty()){var f=new y;f.vertexCount=v.getCount();for(var u=0;u<s[d];u++){var l=r[a+u],c=n[a+u],w=o.getOrCreatePipelineState(this._device,l,c,e,v._inputAssembler);t.bindPipelineState(w),t.bindDescriptorSet(h.MATERIAL,l.descriptorSet),t.bindInputAssembler(v._inputAssembler),t.draw(f)}}a+=s[d]}for(var x=0;x<2;x++){var _=this._buffers.dashedLines[x];if(!_.empty()){var g=new y;g.vertexCount=_.getCount();for(var L=0;L<s[x];L++){var M=r[a+L],m=n[a+L],z=o.getOrCreatePipelineState(this._device,M,m,e,_._inputAssembler);t.bindPipelineState(z),t.bindDescriptorSet(h.MATERIAL,M.descriptorSet),t.bindInputAssembler(_._inputAssembler),t.draw(g)}}a+=s[x]}for(var A=0;A<2;A++){var p=this._buffers.triangles[A];if(!p.empty()){var T=new y;T.vertexCount=p.getCount();for(var b=0;b<s[A];b++){var E=r[a+b],C=n[a+b],I=o.getOrCreatePipelineState(this._device,E,C,e,p._inputAssembler);t.bindPipelineState(I),t.bindDescriptorSet(h.MATERIAL,E.descriptorSet),t.bindInputAssembler(p._inputAssembler),t.draw(T)}}a+=s[A]}this.reset()},i.destroy=function(){for(var e=0;e<2;e++)this._buffers.lines[e].destroy(),this._buffers.dashedLines[e].destroy(),this._buffers.triangles[e].destroy()},i.empty=function(){for(var e=0;e<2;e++)if(!this._buffers.lines[e].empty()||!this._buffers.dashedLines[e].empty()||!this._buffers.triangles[e].empty())return!1;return!0},i.update=function(){for(var e=0;e<2;e++)this._buffers.lines[e].update(),this._buffers.dashedLines[e].update(),this._buffers.triangles[e].update()},i.reset=function(){for(var e=0;e<2;e++)this._buffers.lines[e].reset(),this._buffers.dashedLines[e].reset(),this._buffers.triangles[e].reset()},i.addDashedLine=function(e,i,n,s){void 0===s&&(s=!0);var d=this._buffers.dashedLines[s?1:0];if(d._vertexCount+2>d._maxVertices)a(12008);else{var o=d._vertexCount*(t.length+r.length);t.toArray(d._vertices,e,o),o+=t.length,r.toArray(d._vertices,n,o),o+=r.length,t.toArray(d._vertices,i,o),o+=t.length,r.toArray(d._vertices,n,o),d._vertexCount+=2}},i.addLine=function(e,i,n,s){void 0===s&&(s=!0);var d=this._buffers.lines[s?1:0];if(d._vertexCount+2>d._maxVertices)a(12008);else{var o=d._vertexCount*(t.length+r.length);t.toArray(d._vertices,e,o),o+=t.length,r.toArray(d._vertices,n,o),o+=r.length,t.toArray(d._vertices,i,o),o+=t.length,r.toArray(d._vertices,n,o),d._vertexCount+=2}},i.addTriangle=function(e,i,s,d,o,h,v){if(void 0===o&&(o=!0),void 0===h&&(h=!0),void 0===v&&(v=!1),o)return this.addLine(e,i,d,h),this.addLine(i,s,d,h),void this.addLine(s,e,d,h);var f=this._buffers.triangles[h?1:0];if(f._vertexCount+3>f._maxVertices)a(12009);else{var u=new n(n.ZERO);if(!v){var y=new t(i.x-e.x,i.y-e.y,i.z-e.z),l=new t(s.x-e.x,s.y-e.y,s.z-e.z),c=new t;t.normalize(c,t.cross(c,y,l)),u.set(c.x,c.y,c.z,1)}var w=f._vertexCount*(t.length+n.length+r.length);t.toArray(f._vertices,e,w),w+=t.length,n.toArray(f._vertices,u,w),w+=n.length,r.toArray(f._vertices,d,w),w+=r.length,t.toArray(f._vertices,i,w),w+=t.length,n.toArray(f._vertices,u,w),w+=n.length,r.toArray(f._vertices,d,w),w+=r.length,t.toArray(f._vertices,s,w),w+=t.length,n.toArray(f._vertices,u,w),w+=n.length,r.toArray(f._vertices,d,w),f._vertexCount+=3}},i.addQuad=function(e,t,i,r,n,a,s,d){void 0===a&&(a=!0),void 0===s&&(s=!0),void 0===d&&(d=!1),a?(this.addLine(e,t,n,s),this.addLine(t,i,n,s),this.addLine(i,r,n,s),this.addLine(r,e,n,s)):(this.addTriangle(e,t,i,n,a,s,d),this.addTriangle(e,i,r,n,a,s,d))},i.addBoundingBox=function(e,i,r,n,a,d,o){void 0===r&&(r=!0),void 0===n&&(n=!0),void 0===a&&(a=!1),void 0===d&&(d=!1),void 0===o&&(o=new s),g.set(e.center.x-e.halfExtents.x,e.center.y-e.halfExtents.y,e.center.z-e.halfExtents.z),L.set(e.center.x+e.halfExtents.x,e.center.y+e.halfExtents.y,e.center.z+e.halfExtents.z),M.set(g.x,g.y,g.z),m.set(L.x,g.y,g.z),z.set(g.x,L.y,g.z),A.set(L.x,L.y,g.z),p.set(g.x,g.y,L.z),T.set(L.x,g.y,L.z),b.set(g.x,L.y,L.z),E.set(L.x,L.y,L.z),d&&(t.transformMat4(M,M,o),t.transformMat4(m,m,o),t.transformMat4(z,z,o),t.transformMat4(A,A,o),t.transformMat4(p,p,o),t.transformMat4(T,T,o),t.transformMat4(b,b,o),t.transformMat4(E,E,o)),r?(this.addLine(b,E,i,n),this.addLine(E,A,i,n),this.addLine(A,z,i,n),this.addLine(z,b,i,n),this.addLine(p,T,i,n),this.addLine(T,m,i,n),this.addLine(m,M,i,n),this.addLine(M,p,i,n),this.addLine(b,p,i,n),this.addLine(E,T,i,n),this.addLine(A,m,i,n),this.addLine(z,M,i,n)):(this.addQuad(p,T,E,b,i,r,n,a),this.addQuad(T,m,A,E,i,r,n,a),this.addQuad(m,M,z,A,i,r,n,a),this.addQuad(M,p,b,z,i,r,n,a),this.addQuad(b,E,A,z,i,r,n,a),this.addQuad(M,m,T,p,i,r,n,a))},i.addCross=function(e,i,r,n){void 0===n&&(n=!0);var a=.5*i,s=new t(e.x-a,e.y,e.z),d=new t(e.x+a,e.y,e.z);this.addLine(s,d,r,n),s.set(e.x,e.y-a,e.z),d.set(e.x,e.y+a,e.z),this.addLine(s,d,r,n),s.set(e.x,e.y,e.z-a),d.set(e.x,e.y,e.z+a),this.addLine(s,d,r,n)},i.addFrustum=function(e,t,i){void 0===i&&(i=!0);var r=e.vertices;this.addLine(r[0],r[1],t,i),this.addLine(r[1],r[2],t,i),this.addLine(r[2],r[3],t,i),this.addLine(r[3],r[0],t,i),this.addLine(r[4],r[5],t,i),this.addLine(r[5],r[6],t,i),this.addLine(r[6],r[7],t,i),this.addLine(r[7],r[4],t,i),this.addLine(r[0],r[4],t,i),this.addLine(r[1],r[5],t,i),this.addLine(r[2],r[6],t,i),this.addLine(r[3],r[7],t,i)},i.addCapsule=function(e,i,r,n,a,d,o,h,v,f,u){void 0===a&&(a=32),void 0===d&&(d=8),void 0===o&&(o=!0),void 0===h&&(h=!0),void 0===v&&(v=!1),void 0===f&&(f=!1),void 0===u&&(u=new s);for(var y=2*Math.PI/a,l=Math.PI/2/d,c=new t(e.x,e.y-r/2,e.z),w=new t(e.x,e.y+r/2,e.z),x=new Array,_=new Array,g=0;g<d+1;g++){for(var L=new Array,M=new Array,m=g*l,z=Math.sin(m),A=Math.cos(m),p=0;p<a+1;p++){var T=p*y,b=Math.sin(T),E=Math.cos(T),C=new t(i*z*E,i*A,i*z*b),I=new t(c.x+C.x,c.y-C.y,c.z+C.z),R=new t(w.x+C.x,w.y+C.y,w.z+C.z);L.push(I),M.push(R)}x.push(L),_.push(M)}if(f)for(var S=0;S<d+1;S++)for(var P=0;P<a+1;P++)t.transformMat4(x[S][P],x[S][P],u),t.transformMat4(_[S][P],_[S][P],u);for(var N=0;N<d;N++)for(var O=0;O<a;O++)this.addTriangle(x[N+1][O],x[N][O+1],x[N][O],n,o,h,v),this.addTriangle(x[N+1][O],x[N+1][O+1],x[N][O+1],n,o,h,v),this.addTriangle(_[N][O],_[N+1][O+1],_[N+1][O],n,o,h,v),this.addTriangle(_[N][O],_[N][O+1],_[N+1][O+1],n,o,h,v);for(var B=x[d],D=_[d],F=0;F<a;F++)this.addTriangle(D[F],B[F+1],B[F],n,o,h,v),this.addTriangle(D[F],D[F+1],B[F+1],n,o,h,v)},i.addCylinder=function(e,i,r,n,a,d,o,h,v,f){void 0===a&&(a=32),void 0===d&&(d=!0),void 0===o&&(o=!0),void 0===h&&(h=!1),void 0===v&&(v=!1),void 0===f&&(f=new s);for(var u=2*Math.PI/a,y=new t(e.x,e.y-r/2,e.z),l=new t(e.x,e.y+r/2,e.z),c=new Array,w=new Array,x=0;x<a+1;x++){var _=x*u,g=new t(i*Math.cos(_),0,i*Math.sin(_)),L=new t(g.x+y.x,g.y+y.y,g.z+y.z),M=new t(g.x+l.x,g.y+l.y,g.z+l.z);c.push(L),w.push(M)}if(v){t.transformMat4(y,y,f),t.transformMat4(l,l,f);for(var m=0;m<a+1;m++)t.transformMat4(c[m],c[m],f),t.transformMat4(w[m],w[m],f)}for(var z=0;z<a;z++)this.addTriangle(l,w[z+1],w[z],n,d,o,h),this.addTriangle(y,c[z],c[z+1],n,d,o,h),this.addTriangle(w[z],c[z+1],c[z],n,d,o,h),this.addTriangle(w[z],w[z+1],c[z+1],n,d,o,h)},i.addCone=function(e,i,r,n,a,d,o,h,v,f){void 0===a&&(a=32),void 0===d&&(d=!0),void 0===o&&(o=!0),void 0===h&&(h=!1),void 0===v&&(v=!1),void 0===f&&(f=new s);for(var u=2*Math.PI/a,y=new t(e.x,e.y-r/2,e.z),l=new t(e.x,e.y+r/2,e.z),c=new Array,w=0;w<a+1;w++){var x=new t(i*Math.cos(w*u),0,i*Math.sin(w*u)),_=new t(x.x+y.x,x.y+y.y,x.z+y.z);c.push(_)}if(v){t.transformMat4(y,y,f),t.transformMat4(l,l,f);for(var g=0;g<a+1;g++)t.transformMat4(c[g],c[g],f)}for(var L=0;L<a;L++)this.addTriangle(l,c[L+1],c[L],n,d,o,h),this.addTriangle(y,c[L],c[L+1],n,d,o,h)},i.addCircle=function(e,i,r,n,a,d,o){void 0===n&&(n=32),void 0===a&&(a=!0),void 0===d&&(d=!1),void 0===o&&(o=new s);for(var h=2*Math.PI/n,v=new Array,f=0;f<n+1;f++){var u=new t(i*Math.cos(f*h),0,i*Math.sin(f*h)),y=new t(u.x+e.x,u.y+e.y,u.z+e.z);v.push(y)}if(d)for(var l=0;l<n+1;l++)t.transformMat4(v[l],v[l],o);for(var c=0;c<n;c++)this.addLine(v[c],v[c+1],r,a)},i.addArc=function(e,i,r,n,a,o,h,v,f){void 0===o&&(o=32),void 0===h&&(h=!0),void 0===v&&(v=!1),void 0===f&&(f=new s);for(var u=d(n),y=(d(a)-u)/o,l=new Array,c=0;c<o+1;c++){var w=new t(i*Math.cos(c*y+u),0,i*Math.sin(c*y+u)),x=new t(w.x+e.x,w.y+e.y,w.z+e.z);l.push(x)}if(v)for(var _=0;_<o+1;_++)t.transformMat4(l[_],l[_],f);for(var g=0;g<o;g++)this.addLine(l[g],l[g+1],r,h)},i.addPolygon=function(e,t,i,r,n,a,d,o,h){void 0===r&&(r=6),void 0===n&&(n=!0),void 0===a&&(a=!0),void 0===d&&(d=!1),void 0===o&&(o=!1),void 0===h&&(h=new s),n?this.addCircle(e,t,i,r,a,o,h):this.addDisc(e,t,i,r,n,a,d,o,h)},i.addDisc=function(e,i,r,n,a,d,o,h,v){void 0===n&&(n=32),void 0===a&&(a=!0),void 0===d&&(d=!0),void 0===o&&(o=!1),void 0===h&&(h=!1),void 0===v&&(v=new s);for(var f=2*Math.PI/n,u=new Array,y=new t(e),l=0;l<n+1;l++){var c=new t(i*Math.cos(l*f),0,i*Math.sin(l*f)),w=new t(c.x+y.x,c.y+y.y,c.z+y.z);u.push(w)}if(h){t.transformMat4(y,y,v);for(var x=0;x<n+1;x++)t.transformMat4(u[x],u[x],v)}for(var _=0;_<n;_++)this.addTriangle(y,u[_],u[_+1],r,a,d,o);if(!a)for(var g=0;g<n;g++)this.addTriangle(y,u[g+1],u[g],r,a,d,o)},i.addSector=function(e,i,r,n,a,o,h,v,f,u,y){void 0===o&&(o=32),void 0===h&&(h=!0),void 0===v&&(v=!0),void 0===f&&(f=!1),void 0===u&&(u=!1),void 0===y&&(y=new s);for(var l=d(n),c=(d(a)-l)/o,w=new Array,x=new t(e),_=0;_<o+1;_++){var g=new t(i*Math.cos(_*c),0,i*Math.sin(_*c)),L=new t(g.x+x.x,g.y+x.y,g.z+x.z);w.push(L)}if(u){t.transformMat4(x,x,y);for(var M=0;M<o+1;M++)t.transformMat4(w[M],w[M],y)}for(var m=0;m<o;m++)this.addTriangle(x,w[m],w[m+1],r,h,v,f);if(!h)for(var z=0;z<o;z++)this.addTriangle(x,w[z+1],w[z],r,h,v,f)},i.addSphere=function(e,i,r,n,a,d,o,h,v,f){void 0===n&&(n=32),void 0===a&&(a=16),void 0===d&&(d=!0),void 0===o&&(o=!0),void 0===h&&(h=!1),void 0===v&&(v=!1),void 0===f&&(f=new s);for(var u=2*Math.PI/n,y=Math.PI/a,l=new Array,c=0;c<a+1;c++){for(var w=new Array,x=c*y,_=Math.sin(x),g=Math.cos(x),L=0;L<n+1;L++){var M=L*u,m=Math.sin(M),z=Math.cos(M),A=new t(i*_*z,i*g,i*_*m),p=new t(e.x+A.x,e.y+A.y,e.z+A.z);w.push(p)}l.push(w)}if(v)for(var T=0;T<a+1;T++)for(var b=0;b<n+1;b++)t.transformMat4(l[T][b],l[T][b],f);for(var E=0;E<a;E++)for(var C=0;C<n;C++)this.addTriangle(l[E][C],l[E+1][C+1],l[E+1][C],r,d,o,h),this.addTriangle(l[E][C],l[E][C+1],l[E+1][C+1],r,d,o,h)},i.addTorus=function(e,i,r,n,a,d,o,h,v,f,u){void 0===a&&(a=32),void 0===d&&(d=16),void 0===o&&(o=!0),void 0===h&&(h=!0),void 0===v&&(v=!1),void 0===f&&(f=!1),void 0===u&&(u=new s);for(var y=2*Math.PI/a,l=2*Math.PI/d,c=new Array,w=0;w<a+1;w++){for(var x=new Array,_=w*y,g=Math.sin(_),L=Math.cos(_),M=0;M<d+1;M++){var m=M*l,z=Math.sin(m),A=Math.cos(m),p=new t((i+r*A)*L,r*z,(i+r*A)*g),T=new t(e.x+p.x,e.y+p.y,e.z+p.z);x.push(T)}c.push(x)}if(f)for(var b=0;b<a+1;b++)for(var E=0;E<d+1;E++)t.transformMat4(c[b][E],c[b][E],u);for(var C=0;C<a;C++)for(var I=0;I<d;I++)this.addTriangle(c[C][I+1],c[C+1][I],c[C][I],n,o,h,v),this.addTriangle(c[C][I+1],c[C+1][I+1],c[C+1][I],n,o,h,v)},i.addOctahedron=function(e,i,r,n,a,d,o,h){void 0===n&&(n=!0),void 0===a&&(a=!0),void 0===d&&(d=!1),void 0===o&&(o=!1),void 0===h&&(h=new s);var v=new Array;if(v.push(new t(i+e.x,e.y,e.z)),v.push(new t(e.x,e.y,e.z-i)),v.push(new t(-i+e.x,e.y,e.z)),v.push(new t(e.x,e.y,e.z+i)),v.push(new t(e.x,e.y+i,e.z)),v.push(new t(e.x,e.y-i,e.z)),o)for(var f=0;f<v.length;f++)t.transformMat4(v[f],v[f],h);n?(this.addLine(v[0],v[1],r,a),this.addLine(v[1],v[2],r,a),this.addLine(v[2],v[3],r,a),this.addLine(v[3],v[0],r,a),this.addLine(v[0],v[4],r,a),this.addLine(v[1],v[4],r,a),this.addLine(v[2],v[4],r,a),this.addLine(v[3],v[4],r,a),this.addLine(v[0],v[5],r,a),this.addLine(v[1],v[5],r,a),this.addLine(v[2],v[5],r,a),this.addLine(v[3],v[5],r,a)):(this.addTriangle(v[0],v[1],v[4],r,n,a,d),this.addTriangle(v[1],v[2],v[4],r,n,a,d),this.addTriangle(v[2],v[3],v[4],r,n,a,d),this.addTriangle(v[3],v[0],v[4],r,n,a,d),this.addTriangle(v[0],v[3],v[5],r,n,a,d),this.addTriangle(v[3],v[2],v[5],r,n,a,d),this.addTriangle(v[2],v[1],v[5],r,n,a,d),this.addTriangle(v[1],v[0],v[5],r,n,a,d))},i.addBezier=function(e,i,r,n,a,d,o,h,v){void 0===d&&(d=32),void 0===o&&(o=!0),void 0===h&&(h=!1),void 0===v&&(v=new s);var f=1/d,u=new Array,y=new t(e),l=new t(i),c=new t(r),w=new t(n);h&&(t.transformMat4(y,y,v),t.transformMat4(l,l,v),t.transformMat4(c,c,v),t.transformMat4(w,w,v));for(var x=0;x<d+1;x++){var _=x*f,g=(1-_)*(1-_)*(1-_),L=3*_*(1-_)*(1-_),M=3*_*_*(1-_),m=_*_*_,z=new t(g*y.x+L*l.x+M*c.x+m*w.x,g*y.y+L*l.y+M*c.y+m*w.y,g*y.z+L*l.z+M*c.z+m*w.z);u.push(z)}for(var A=0;A<d;A++)this.addLine(u[A],u[A+1],a,o)},i.addSpline=function(e,t,i,n,a,s){void 0===i&&(i=4294967295),void 0===n&&(n=.5),void 0===a&&(a=32),void 0===s&&(s=!0);for(var d=a+1,o=e.getPoints(d,i),h=0;h<a;h++)this.addLine(o[h],o[h+1],t,s);if(n>0&&4294967295===i)for(var v=new r(255-t.r,255-t.g,255-t.b,t.a),f=e.getKnotCount(),u=e.knots,y=0;y<f;y++)this.addCross(u[y],n,v,s)},i.addMesh=function(e,i,r,n,a,d){void 0===n&&(n=!0),void 0===a&&(a=!1),void 0===d&&(d=new s);for(var o=0;o<i.length;o+=3){var h=new t(e.x+i[o].x,e.y+i[o].y,e.z+i[o].z),v=new t(e.x+i[o+1].x,e.y+i[o+1].y,e.z+i[o+1].z),f=new t(e.x+i[o+2].x,e.y+i[o+2].y,e.z+i[o+2].z);a&&(t.transformMat4(h,h,d),t.transformMat4(v,v,d),t.transformMat4(f,f,d)),this.addLine(h,v,r,n),this.addLine(v,f,r,n),this.addLine(f,h,r,n)}},i.addIndexedMesh=function(e,i,r,n,a,d,o){void 0===a&&(a=!0),void 0===d&&(d=!1),void 0===o&&(o=new s);for(var h=0;h<r.length;h+=3){var v=new t(e.x+i[r[h]].x,e.y+i[r[h]].y,e.z+i[r[h]].z),f=new t(e.x+i[r[h+1]].x,e.y+i[r[h+1]].y,e.z+i[r[h+1]].z),u=new t(e.x+i[r[h+2]].x,e.y+i[r[h+2]].y,e.z+i[r[h+2]].z);d&&(t.transformMat4(v,v,o),t.transformMat4(f,f,o),t.transformMat4(u,u,o)),this.addLine(v,f,n,a),this.addLine(f,u,n,a),this.addLine(u,v,n,a)}},e}());i.internal.GeometryRenderer=R}}}));
