System.register(["./index-92d00b49.js"],(function(n){"use strict";var e;return{setters:[function(n){e=n.o}],execute:function(){function s(n){return void 0===(n=n||{}).includeNormal&&(n.includeNormal=!0),void 0===n.includeUV&&(n.includeUV=!0),n}n({a:s,b:function(n){var s=(n=n||{}).widthSegments||1,c=n.heightSegments||1,l=n.lengthSegments||1,g=(n.width||1)/2,m=(n.height||1)/2,M=(n.length||1)/2,P=[e.set(i,-g,-m,M),e.set(o,g,-m,M),e.set(u,g,m,M),e.set(v,-g,m,M),e.set(p,g,-m,-M),e.set(d,-g,-m,-M),e.set(w,-g,m,-M),e.set(f,g,m,-M)],S=[[2,3,1],[4,5,7],[7,6,2],[1,0,4],[1,4,2],[5,0,6]],x=[[0,0,1],[0,0,-1],[0,1,0],[0,-1,0],[1,0,0],[-1,0,0]],y=[[-1,0,0,1],[-1,0,0,1],[-1,0,0,1],[-1,0,0,1],[0,0,-1,1],[0,0,1,1]],I=[],b=[],z=[],A=[],R=[],U=new e(-g,-m,-M),V=new e(g,m,M),q=Math.sqrt(g*g+m*m+M*M);function N(n,s,i){var o,u,v,p,d=I.length/3,w=S[n],f=x[n],c=y[n];for(p=0;p<=i;p++)for(v=0;v<=s;v++)if(o=v/s,u=p/i,e.lerp(t,P[w[0]],P[w[1]],o),e.lerp(r,P[w[0]],P[w[2]],u),e.subtract(a,r,P[w[0]]),e.add(h,t,a),I.push(h.x,h.y,h.z),b.push(f[0],f[1],f[2]),z.push(o,u),A.push(c[0],c[1],c[2],c[3]),v<s&&p<i){var l=s+1,g=v+p*l,m=v+(p+1)*l,M=v+1+(p+1)*l,U=v+1+p*l;R.push(d+g,d+U,d+m),R.push(d+m,d+U,d+M)}}return N(0,s,c),N(4,l,c),N(1,s,c),N(5,l,c),N(3,s,l),N(2,s,l),{positions:I,normals:b,uvs:z,tangents:A,indices:R,minPos:U,maxPos:V,boundingRadius:q}},c:function(n,s,t,r){void 0===n&&(n=.5),void 0===s&&(s=.5),void 0===t&&(t=2),void 0===r&&(r={});var a=.5*t,h=r.radialSegments||32,i=r.heightSegments||1,o=void 0===r.capped||r.capped,u=r.arc||2*Math.PI,v=0;o&&(n>0&&v++,s>0&&v++);var p=(h+1)*(i+1);o&&(p+=(h+1)*v+h*v);var d=h*i*6;o&&(d+=h*v*3);var w=new Array(d),f=new Array(3*p),g=new Array(3*p),m=new Array(2*p),M=Math.max(n,s),P=new e(-M,-a,-M),S=new e(M,a,M),x=Math.sqrt(M*M+a*a),y=0,I=0;return function(){for(var r=[],o=n-s,v=o*o/t*Math.sign(o),p=0;p<=i;p++){for(var d=[],M=p/i,P=M*o+s,S=0;S<=h;++S){var x=S/h,b=x*u,z=Math.sin(b),A=Math.cos(b);f[3*y]=P*z,f[3*y+1]=M*t-a,f[3*y+2]=P*A,e.normalize(c,e.set(l,z,-v,A)),g[3*y]=c.x,g[3*y+1]=c.y,g[3*y+2]=c.z,m[2*y]=2*(1-x)%1,m[2*y+1]=M,d.push(y),++y}r.push(d)}for(var R=0;R<i;++R)for(var U=0;U<h;++U){var V=r[R][U],q=r[R+1][U],N=r[R+1][U+1],j=r[R][U+1];w[I]=V,++I,w[I]=j,++I,w[I]=q,++I,w[I]=j,++I,w[I]=N,++I,w[I]=q,++I}}(),o&&(s>0&&b(!1),n>0&&b(!0)),{positions:f,normals:g,uvs:m,indices:w,minPos:P,maxPos:S,boundingRadius:x};function b(e){for(var t=e?n:s,r=e?1:-1,i=y,o=1;o<=h;++o)f[3*y]=0,f[3*y+1]=a*r,f[3*y+2]=0,g[3*y]=0,g[3*y+1]=r,g[3*y+2]=0,m[2*y]=.5,m[2*y+1]=.5,++y;for(var v=y,p=0;p<=h;++p){var d=p/h*u,c=Math.cos(d),l=Math.sin(d);f[3*y]=t*l,f[3*y+1]=a*r,f[3*y+2]=t*c,g[3*y]=0,g[3*y+1]=r,g[3*y+2]=0,m[2*y]=.5-.5*l*r,m[2*y+1]=.5+.5*c,++y}for(var M=0;M<h;++M){var P=i+M,S=v+M;e?(w[I]=S+1,++I,w[I]=P,++I,w[I]=S,++I):(w[I]=P,++I,w[I]=S+1,++I,w[I]=S,++I)}}},d:function(n,s,t,r){void 0===n&&(n=.5),void 0===s&&(s=.5),void 0===t&&(t=2),void 0===r&&(r={});var a=t-n-s,h=r.sides||32,i=r.heightSegments||32,o=s/t,u=a/t,v=n/t,p=Math.floor(i*o),d=Math.floor(i*v),w=Math.floor(i*u),f=a+s-t/2,c=s-t/2,l=s-t/2,g=r.arc||2*Math.PI,m=[],M=[],P=[],S=[],x=Math.max(n,s),y=new e(-x,-t/2,-x),z=new e(x,t/2,x),A=t/2,R=0,U=[];return function(){for(var n=0;n<=p;++n)for(var e=n*Math.PI/p/2,t=Math.sin(e),r=-Math.cos(e),a=0;a<=h;++a){var o=2*a*Math.PI/h-Math.PI/2,u=Math.sin(o)*t,v=r,d=Math.cos(o)*t,w=a/h,f=n/i;if(m.push(u*s,v*s+l,d*s),M.push(u,v,d),P.push(w,f),n<p&&a<h){var c=h+1,g=c*n+a,x=c*(n+1)+a,y=c*(n+1)+a+1,I=c*n+a+1;S.push(g,I,x),S.push(I,y,x)}++R}}(),function(){for(var t=(n-s)/a,r=0;r<=w;r++){for(var i=[],v=r/w,p=v*(n-s)+s,d=0;d<=h;++d){var f=d/h,l=v*u+o,x=f*g-g/4,y=Math.sin(x),z=Math.cos(x);m.push(p*y),m.push(v*a+c),m.push(p*z),e.normalize(I,e.set(b,y,-t,z)),M.push(I.x),M.push(I.y),M.push(I.z),P.push(f,l),i.push(R),++R}U.push(i)}for(var A=0;A<w;++A)for(var V=0;V<h;++V){var q=U[A][V],N=U[A+1][V],j=U[A+1][V+1],k=U[A][V+1];S.push(q),S.push(k),S.push(N),S.push(k),S.push(j),S.push(N)}}(),function(){for(var e=0;e<=d;++e)for(var s=e*Math.PI/d/2+Math.PI/2,t=Math.sin(s),r=-Math.cos(s),a=0;a<=h;++a){var o=2*a*Math.PI/h-Math.PI/2,u=Math.sin(o)*t,p=r,c=Math.cos(o)*t,l=a/h,g=e/i+(1-v);if(m.push(u*n,p*n+f,c*n),M.push(u,p,c),P.push(l,g),e<d&&a<h){var x=h+1,y=x*e+a+U[w][h]+1,I=x*(e+1)+a+U[w][h]+1,b=x*(e+1)+a+1+U[w][h]+1,z=x*e+a+1+U[w][h]+1;S.push(y,z,I),S.push(z,b,I)}}}(),{positions:m,normals:M,uvs:P,indices:S,minPos:y,maxPos:z,boundingRadius:A}},p:function(n){var t=function(n){return(n=s(n)).width=n.width||10,n.length=n.length||10,n.widthSegments=n.widthSegments||10,n.lengthSegments=n.lengthSegments||10,n}(n),r=t.width,a=t.length,h=t.widthSegments,i=t.lengthSegments,o=.5*r,u=.5*a,v=[],p=[],d=[],w=new e(-o,0,-u),f=new e(o,0,u),c=Math.sqrt(r*r+a*a);e.set(S,-o,0,u),e.set(x,o,0,u),e.set(y,-o,0,-u);for(var l=0;l<=i;l++)for(var I=0;I<=h;I++){var b=I/h,z=l/i;if(e.lerp(g,S,x,b),e.lerp(m,S,y,z),e.subtract(M,m,S),e.add(P,g,M),v.push(P.x,P.y,P.z),t.includeUV&&p.push(b,z),I<h&&l<i){var A=h+1,R=I+l*A,U=I+(l+1)*A,V=I+1+(l+1)*A,q=I+1+l*A;d.push(R,q,U),d.push(q,V,U)}}var N={positions:v,indices:d,minPos:w,maxPos:f,boundingRadius:c};if(t.includeNormal){var j=(i+1)*(h+1),k=new Array(3*j);N.normals=k;for(var B=0;B<j;++B)k[3*B+0]=0,k[3*B+1]=1,k[3*B+2]=0}return t.includeUV&&(N.uvs=p),N}});var t=new e,r=new e,a=new e,h=new e,i=new e,o=new e,u=new e,v=new e,p=new e,d=new e,w=new e,f=new e,c=new e(0,0,0),l=new e(0,0,0),g=new e(0,0,0),m=new e(0,0,0),M=new e(0,0,0),P=new e(0,0,0),S=new e(0,0,0),x=new e(0,0,0),y=new e(0,0,0),I=new e(0,0,0),b=new e(0,0,0)}}}));
