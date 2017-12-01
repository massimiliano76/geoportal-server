﻿define(["dojo/_base/declare","dojo/_base/lang","esri/layers/PixelBlock"],function(n,t){"use strict";var i;return n(null,{StretchType:0,Min:0,Max:255,NumberOfStandardDeviations:2,Statistics:[],DRA:!1,MinPercent:.25,MaxPercent:.5,UseGamma:!1,Gamma:null,Raster:null,outputPixelType:"U8",BandIDs:null,constructor:function(n){t.mixin(this,n);i=this},filter:function(n){var o,f,l;if(n!==null&&n.pixelBlock!==null&&n.pixelBlock.pixels!==null){var a=new Date,u=n.pixelBlock,e=u.pixels,k=u.mask,v=u.width*u.height,r=e.length,t,f,s=i.StretchType===6||i.StretchType===3&&i.DRA;if(s&&i._calculateStatisticsHistograms(n),i.DRA)if(s)i._Statistics=u.statistics,i._histograms=u.histograms;else for(o=u.statistics,i._Statistics=new Array(r),t=0;t<r;t++)i._Statistics[t]=[o[t].minValue,o[t].maxValue,0,0];else i._Statistics=i.Statistics;if(i._createLUT(n),i.LUT===undefined||i.LUT===null)return i._filterNoLUT(n);var d=new Array(r),g=new Array(r),nt=new Array(r),tt=new Array(r),it=new Float32Array(r),y=i.LUT,p=i.LUTOffset,h,w=i.Max,b=i.Min,rt=i.Gamma,c,ut=w-b;for(t=0;t<r;t++)for(c=y[t],f=0;f<v;f++)h=e[t][f],e[t][f]=c[h+p];return n.pixelBlock.pixelType="U8",l=new Date,console.log(l-a),n}},_calculateStatisticsHistograms:function(n){for(var r=n.pixelBlock,it=r.pixelType,y=r.pixels,p=r.mask,ft=r.width*r.height,rt=y.length,o,h,w,i,ut=function(n){this.min=-.5;this.max=255.5;this.size=256;t.mixin(this,n);this.counts=this.counts||new Uint32Array(this.size)},b=[],u,e,c,l,s,f=0;f<rt;f++){if(u=new ut,e=u.counts,l=y[f],it==="U8")if(p)for(i=0;i<r.width*r.height;i++)p[i]&&e[l[i]]++;else for(i=0;i<r.width*r.height;i++)e[l[i]]++;else{for(o=r.statistics[f].minValue,h=r.statistics[f].maxValue,u.min=o,u.max=h,w=(h-o)/256,c=new Uint32Array(257),i=0;i<r.width*r.height;i++)c[Math.floor((l[i]-o)/w)]++;for(i=0;i<255;i++)e[i]=c[i];e[255]=c[255]+c[256]}b.push(u);s=[];o=r.statistics[f].minValue;h=r.statistics[f].maxValue;var a=0,k=0,d,g,nt=0,v,tt;for(i=0;i<u.size;i++)a+=e[i],k+=i*e[i];for(v=k/a,i=0;i<u.size;i++)nt+=e[i]*Math.pow(i-v,2);tt=Math.sqrt(nt/(a-1));d=(v+.5)*(u.max-u.min)/u.size+u.min;g=tt*(u.max-u.min)/u.size;s.push(o);s.push(h);s.push(d);s.push(g);r.statistics[f]=s}r.histograms=b},_createLUT:function(n){var c=n.pixelBlock,w=c.pixelType,ft=w==="U8"||w==="U16"||w==="S8"||w==="S16",a,p,h,it,r;if(ft){var st=new Date,et=c.pixels,ht=c.mask,ct=c.width*c.height,f=et.length,ot=new Array(f),d=new Array(f),e=new Array(f),s=new Array(f),rt=new Float32Array(f),t,r,u,g,nt=i.Max,v=i.Min,l=i.Gamma,b=nt-v,o,y,ut,k,tt=new Array(f);switch(i.StretchType){case 5:for(t=0;t<f;t++)e[t]=i._Statistics[t][0],s[t]=i._Statistics[t][1];break;case 3:for(t=0;t<f;t++)e[t]=i._Statistics[t][2]-i.NumberOfStandardDeviations*i._Statistics[t][3],s[t]=i._Statistics[t][2]+i.NumberOfStandardDeviations*i._Statistics[t][3],e[t]<i._Statistics[t][0]&&(e[t]=i._Statistics[t][0]),s[t]>i._Statistics[t][1]&&(s[t]=i._Statistics[t][1]);break;case 6:for(t=0;t<f;t++){for(o=i._histograms[t],k=new Uint32Array(o.size),ut=o.counts,y=0,r=0;r<o.size;r++)y+=ut[r],k[r]=y;for(u=i.MinPercent*y/100,r=1;r<o.size;r++)if(k[r]>u){e[t]=o.min+(o.max-o.min)/o.size*(r-.5);break}for(u=(1-i.MaxPercent/100)*y,r=o.size-2;r>=0;r--)if(k[r]<u){s[t]=o.min+(o.max-o.min)/o.size*(r+.5);break}}break;default:for(t=0;t<f;t++)e[t]=0,s[t]=255}for(a=0,p=256,c.pixelType==="S8"?a=127:c.pixelType==="S16"&&(a=-32767),(c.pixelType==="U16"||c.pixelType==="S16")&&(a=65536),t=0;t<f;t++)d[t]=s[t]-e[t],ot[t]=b/(s[t]-e[t]);if(i.UseGamma&&l!=null&&l.length===f)for(t=0;t<f;t++)rt[t]=l[t]>1?l[t]>2?6.5+Math.pow(l[t]-2,2.5):6.5+100*Math.pow(2-l[t],4):1;if(i.UseGamma)for(t=0;t<f;t++){for(h=new Array(p),r=0;r<p;r++)u=r-a,it=(u-e[t])/d[t],g=1,l[t]>1&&(g-=Math.pow(1/b,it*rt[t])),u<s[t]&&u>e[t]?h[r]=Math.floor(g*b*Math.pow(it,1/l[t]))+v:u>s[t]?h[r]=nt:u<e[t]&&(h[r]=v);tt[t]=h}else for(t=0;t<f;t++){for(h=new Array(p),r=0;r<p;r++)u=r-a,u<s[t]&&u>e[t]?h[r]=Math.floor((u-e[t])/d[t]*b)+v:u>s[t]?h[r]=nt:u<e[t]&&(h[r]=v);tt[t]=h}i.LUT=tt;i.LUTOffset=a}},_filterNoLUT:function(n){var y,r,g;if(n!==null&&n.pixelBlock!==null&&n.pixelBlock.pixels!==null){var nt=new Date,b=n.pixelBlock,e=b.pixels,a=b.mask,k=b.width*b.height,o=e.length,tt=new Array(o),p=new Array(o),f=new Array(o),s=new Array(o),d=new Float32Array(o),t,r,u,v,w=i.Max,c=i.Min,h=i.Gamma,l=w-c;switch(i.StretchType){case 5:for(t=0;t<o;t++)f[t]=i._Statistics[t][0],s[t]=i._Statistics[t][1];break;case 3:for(t=0;t<o;t++)f[t]=i._Statistics[t][2]-i.NumberOfStandardDeviations*i._Statistics[t][3],s[t]=i._Statistics[t][2]+i.NumberOfStandardDeviations*i._Statistics[t][3],f[t]<i._Statistics[t][0]&&(f[t]=i._Statistics[t][0]),s[t]>i._Statistics[t][1]&&(s[t]=i._Statistics[t][1]);break;default:for(t=0;t<o;t++)f[t]=0,s[t]=255}for(t=0;t<o;t++)p[t]=s[t]-f[t],tt[t]=l/(s[t]-f[t]);if(i.UseGamma&&h!=null&&h.length===o)for(t=0;t<o;t++)d[t]=h[t]>1?h[t]>2?6.5+Math.pow(h[t]-2,2.5):6.5+100*Math.pow(2-h[t],4):1;if(i.UseGamma)if(a!==undefined&&a!==null){for(r=0;r<k;r++)if(a[r])for(t=0;t<o;t++)u=e[t][r],y=(u-f[t])/p[t],v=1,h[t]>1&&(v-=Math.pow(1/l,y*d[t])),u<s[t]&&u>f[t]?e[t][r]=Math.floor(v*l*Math.pow(y,1/h[t]))+c:u>s[t]?e[t][r]=w:u<f[t]&&(e[t][r]=c)}else for(r=0;r<k;r++)for(t=0;t<o;t++)u=e[t][r],y=(u-f[t])/p[t],v=1,h[t]>1&&(v-=Math.pow(1/l,y*d[t])),u<s[t]&&u>f[t]?e[t][r]=Math.floor(v*l*Math.pow(y,1/h[t]))+c:u>s[t]?e[t][r]=w:u<f[t]&&(e[t][r]=c);else if(a!==undefined&&a!==null){for(r=0;r<k;r++)if(a[r])for(t=0;t<o;t++)u=e[t][r],u<s[t]&&u>f[t]?e[t][r]=Math.floor((u-f[t])/p[t]*l)+c:u>s[t]?e[t][r]=w:u<f[t]&&(e[t][r]=c)}else for(r=0;r<k;r++)for(t=0;t<o;t++)u=e[t][r],u<s[t]&&u>f[t]?e[t][r]=Math.floor((u-f[t])/p[t]*l)+c:u>s[t]?e[t][r]=w:u<f[t]&&(e[t][r]=c);return n.pixelBlock.pixelType="U8",g=new Date,console.log(g-nt),n}}})});
//# sourceMappingURL=StretchFilter.min.js.map