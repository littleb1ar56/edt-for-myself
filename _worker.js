/*
 本项目仅作为学习使用，请勿用于非法用途。
*/
const V='3.1.6';
const U='aaa6b096-1165-4bbe-935c-99f4ec902d02';
const P='txt@kr.william.dwb.cc.cd';
const S5='';
const GS5=false;
const D=false;
const SUB='sub.glimmer.hidns.vip';
const UID='ikun';
const K={to:6000,ui:5000,ed:8*1024,tc:64,ct:60*60*1000};

if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(U))throw new Error('Invalid UUID');

const z=new Uint8Array(0),te=new TextEncoder(),td=new TextDecoder(),ub=Uint8Array.from(U.replace(/-/g,'').match(/../g).map(x=>parseInt(x,16)));
const tc=new Map(),tp=new Map();
const mU=d=>ub.every((x,i)=>d[i+1]===x);

export default{async fetch(r){
  try{
    const u=new URL(r.url);
    if(UID&&u.pathname==='/'+UID){
      const s=u.searchParams.get('sub')||SUB;
      return s?Response.redirect(`https://${s}/sub?uuid=${U}&host=${u.hostname}`,302):new Response('Missing sub param',{status:400});
    }
    if(r.headers.get('Upgrade')?.toLowerCase()!=='websocket')return u.pathname==='/'?new Response(`mini v${V}`,{status:200}):new Response(null,{status:404});
    const px=qP(u,'p')||P,s5=qP(u,'s5')||S5,gm=qP(u,'gs5');
    return ws(r,px,s5,gm!==null?(gm==='1'||gm.toLowerCase()==='true'):GS5);
  }catch(e){return new Response('Error: '+(e?.message||'unknown'),{status:502})}
}};

const rc=(p,ms=K.to)=>{let t;return Promise.race([p,new Promise((_,r)=>{t=setTimeout(()=>r(new Error('timeout')),ms)})]).finally(()=>clearTimeout(t))};
const u8=x=>x instanceof Uint8Array?x:x instanceof ArrayBuffer?new Uint8Array(x):ArrayBuffer.isView(x)?new Uint8Array(x.buffer,x.byteOffset,x.byteLength):z;
const b64=s=>{if(!s)return null;try{let x=s.replace(/-/g,'+').replace(/_/g,'/');while(x.length%4)x+='=';return Uint8Array.from(atob(x),c=>c.charCodeAt(0))}catch{return null}};
const cat=(...a)=>{const l=a.map(u8),o=new Uint8Array(l.reduce((n,x)=>n+x.length,0));let p=0;for(const x of l){o.set(x,p);p+=x.length}return o};
const dbg=(s,x='')=>D&&console.log(`${s}${x?' '+x:''}`),dbe=(s,e)=>D&&console.error(s,e?.stack||e?.message||e||'');
const eM=e=>e?.errors?.[0]?.message||e?.message||e||'failed';
const qE=e=>/cancel|closed|aborted|network connection lost/i.test(e?.message||e||'');
const rel=x=>{try{x?.releaseLock?.()}catch{}};
const xC=async(...a)=>{
  const p=[],go=x=>{
    if(!x)return;if(x.sock||x.w||x.r)return go(x.r),go(x.w),go(x.sock);
    p.push(Promise.resolve().then(()=>x.cancel?x.cancel('closed'):x.abort?x.abort('closed'):x.close?.()).catch(()=>{}).finally(()=>rel(x)));
  };
  a.forEach(go);await Promise.allSettled(p);
};
const qP=(u,k)=>{
  for(const p of (u.pathname.slice(1)+(u.search?'&'+u.search.slice(1):'')).split('&')){
    const i=p.indexOf('='),a=i<0?p:p.slice(0,i),v=i<0?'':p.slice(i+1);
    try{if(decodeURIComponent(a)===k)return decodeURIComponent(v)}catch{if(a===k)return v}
  }
  return null;
};

const pH=(s,d=443)=>{
  if(!s)return[null,d];s=String(s).trim();
  if(s[0]==='['){const i=s.indexOf(']');if(i>0)return[s.slice(1,i),s[i+1]===':'?Number(s.slice(i+2)):d]}
  const i=s.lastIndexOf(':');return i>0&&s.indexOf(':')===i?[s.slice(0,i),Number(s.slice(i+1))]:[s,d];
};

const iV=h=>/^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(h);
const v6=s=>{
  if(!s||s.includes('.'))return null;const p=s.split('::');if(p.length>2)return null;
  const a=p[0]?p[0].split(':'):[],b=p.length===2&&p[1]?p[1].split(':'):[],n=p.length===2?8-a.length-b.length:0;
  if(p.length===1&&a.length!==8)return null;if(p.length===2&&n<1)return null;
  const f=[...a,...Array(n).fill('0'),...b];if(f.length!==8)return null;
  const o=new Uint8Array(16);for(let i=0;i<8;i++){if(!/^[0-9a-f]{1,4}$/i.test(f[i]))return null;const x=parseInt(f[i],16);o[i*2]=x>>8;o[i*2+1]=x&255}
  return o;
};
const bV6=(b,o)=>{const d=new DataView(b,o,16),a=[];for(let i=0;i<8;i++)a.push(d.getUint16(i*2).toString(16));return a.join(':')};
const sA=h=>{if(iV(h))return new Uint8Array([1,...h.split('.').map(Number)]);const x=v6(h);if(x){const o=new Uint8Array(17);o[0]=4;o.set(x,1);return o}const d=te.encode(h);if(d.length>255)throw new Error('Domain too long');const o=new Uint8Array(2+d.length);o[0]=3;o[1]=d.length;o.set(d,2);return o};

const tH=s=>/^txt@/i.test(s||'')?String(s).slice(4).trim():'';
const eT=s=>s.replace(/^"|"$/g,'').replace(/"\s*"/g,'').replace(/\\010/g,',').replace(/\\,/g,',').replace(/\r?\n/g,',');
const vE=s=>{const[h,p]=pH(s,443);return h&&(iV(h)||/^[a-z0-9.-]+$/i.test(h)||h.includes(':'))&&p>0&&p<65536?{h,p}:null};
async function fT(u,i){const a=new AbortController(),t=setTimeout(()=>a.abort(),K.to);try{return await fetch(u,{...i,signal:a.signal})}finally{clearTimeout(t)}}
async function qT(d){
  try{
    const r=await fT(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(d)}&type=TXT`,{headers:{accept:'application/dns-json'}});
    if(!r.ok)return null;const j=await r.json();return j.Answer?.filter(x=>x.type===16).map(x=>x.data)||null;
  }catch{return null}
}
async function pT(d){
  const n=Date.now();for(const[k,v]of tc)if(v.exp<=n)tc.delete(k);
  const c=tc.get(d);if(c&&n<c.exp){tc.delete(d);tc.set(d,c);return c.v}
  if(tp.has(d))return tp.get(d);
  const p=(async()=>{const r=await qT(d);if(!r?.length)return null;const v=r.flatMap(x=>eT(x).split(',')).map(x=>x.trim()).filter(Boolean).map(vE).filter(Boolean);if(!v.length)return null;tc.set(d,{v,exp:Date.now()+K.ct});while(tc.size>K.tc)tc.delete(tc.keys().next().value);return v})();
  tp.set(d,p);try{return await p}finally{tp.delete(d)}
}

function ws(r,px,s5,gs5){
  const eh=r.headers.get('sec-websocket-protocol')||'',dc=r.fetcher?.connect?.bind(r.fetcher);if(!dc)throw new Error('connect unavailable');
  let lp='';
  const lg=(a,b='')=>dbg(lp?`${lp} ${a}`:a,b),er=(a,e)=>dbe(lp?`${lp} ${a}`:a,e);
  const[a,w]=Object.values(new WebSocketPair());w.binaryType='arraybuffer';w.accept({allowHalfOpen:true});
  const pd=tH(px);pd&&pT(pd).catch(e=>{if(!qE(e))er('txt warmup failed',e)});
  let c=null,dw=null,off=false,wt=null,wk=null,ut=0;
  const sc=(x,p=false)=>{
    if(off){void xC(x);return 0}
    c=x;
    if(p){if(!wt)wt=new Promise(r=>{wk=r});return 1}
    if(wk){const r=wk;wt=null;wk=null;r()}
    return 1;
  };
  const ed=async why=>{
    if(off)return;if(why!=='client'&&why!=='remote')lg('end',why||'done');off=true;
    clearTimeout(ut);ut=0;
    if(wk){const r=wk;wt=null;wk=null;r()}
    const tdw=dw,tc=c;dw=null;c=null;
    await xC(tdw,tc);try{if(w.readyState===WebSocket.OPEN)w.close(1000)}catch(e){if(!qE(e))er('ws close failed',e)}
  };
  const st=why=>{ed(why).catch(e=>{if(!qE(e))er('end failed',e)})};
  const ui=()=>{clearTimeout(ut);ut=setTimeout(()=>st('udp idle'),K.ui)};
  const op=async d=>{
    const p=pV(d);if(!p)throw new Error('Invalid VLESS request');
    const v=new Uint8Array([p.ver,0]),f=d.subarray(p.idx);
    lp=`[${p.addr}:${p.port}--${Math.random()} ${p.isUDP?'udp':'tcp'}]`;
    lg('open',`first=${f.byteLength}`);
    if(p.isUDP){
      if(p.port!==53)throw new Error('Invalid UDP port');
      dw=hU(w,v,ui,lg);if(f.byteLength)await dw.write(f);return;
    }
    const n=await cn(dc,p.addr,p.port,f,px,s5,gs5,w,lg);
    if(!sc(n))return;
    rl(n,w,v,ed,sc,er,lg).catch(e=>{if(!qE(e))er('rl failed',e);st('remote error')});
  };
  mR(w,eh).pipeTo(new WritableStream({
    async write(ch){
      try{
        if(wt)await wt;
        if(off)return;
        const d=u8(ch);if(!d.length)return;
        if(dw){clearTimeout(ut);ut=0;await dw.write(d);return}
        if(c){c.w||=c.sock.writable.getWriter();await c.w.write(d);return}
        await op(d);
      }catch(e){if(!qE(e))lg('pump error',e?.message||'error');await ed('pump')}
    },
    close(){return ed('client')},
    abort(){return ed('client error')}
  })).catch(e=>{if(!qE(e))er('ws pipe failed',e);st('pipe')});
  w.addEventListener('close',()=>st('client'));w.addEventListener('error',()=>st('client error'));
  return new Response(null,{status:101,webSocket:a,headers:{'Sec-WebSocket-Extensions':''}});
}

async function cn(dc,h,p,data,px,s5,gs5,w,lg=dbg){
  data||=z;
  const g=s5?pS(s5):null,fb=()=>g?g.isHttp?hC(dc,h,p,g):sC(dc,h,p,g):pC(dc,px,p,lg);
  const use=async c=>{try{if(w.readyState!==WebSocket.OPEN)throw new Error('closed');c.w||=c.sock.writable.getWriter();if(data.length)await c.w.write(data);return c}catch(e){await xC(c);throw e}};
  const uf=async()=>{try{if(g)lg('fallback proxy',`${g.h}:${g.pt}`);return await use(await fb())}catch(e){if(g)lg('proxy failed',`${g.h}:${g.pt} ${eM(e)}`);throw e}};
  if(gs5&&g)return uf();
  try{const c=await use(await dC(dc,h,p));c.retry=uf;return c}catch(e){if(w.readyState!==WebSocket.OPEN)throw e;lg('direct failed',`${h}:${p} ${eM(e)}`);return uf()}
}

async function dC(dc,h,p){const sock=dc({hostname:h,port:p});try{await rc(sock.opened);return{sock}}catch(e){await xC(sock);throw e}}
async function pC(dc,px,p,lg=dbg){
  const d=tH(px);
  const go=(h,p)=>{lg('fallback proxy',`${h}:${p}`);return dC(dc,h,p).catch(e=>{lg('proxy failed',`${h}:${p} ${eM(e)}`);throw e})};
  if(d){const l=await pT(d);if(l?.length){const x=l[Math.floor(Math.random()*l.length)];return go(x.h,x.p)}const[h,q]=pH(d,p);lg('txt fallback',`${h}:${q}`);return go(h,q)}
  const[h,q]=pH(px,p);return go(h,q);
}
async function rl(c,w,vh,end,sc,er=dbe,lg=dbg){
  let h=vh,ok=false,err=null;
  const send=d=>{
    d=u8(d);if(!d.length)return;
    if(w.readyState!==WebSocket.OPEN)throw new Error('ws closed');
    ok=true;
    if(h){w.send(cat(h,d));h=null}else w.send(d);
  };
  try{
    if(c.tail?.length){send(c.tail);c.tail=z}
    await c.sock.readable.pipeTo(new WritableStream({
      write(ch){send(ch)},
      abort(r){err=r||new Error('remote abort')}
    }));
  }catch(e){err=e}
  if(!ok&&c.retry&&w.readyState===WebSocket.OPEN){
    lg('retry fallback','no remote data');
    const o=c;if(!sc(null,true)){await xC(o);return}await xC(o);
    try{const nc=await o.retry();if(!sc(nc))return;return rl(nc,w,vh,end,sc,er,lg)}catch(e){err=e}
  }
  if(err&&!qE(err))er('remoteSocketToWS has exception',err);
  await end('remote');
}

async function hC(dc,h,p,c){
  const x=await dC(dc,c.h,c.pt);let r=null;
  try{
    const hh=h.includes(':')?`[${h}]`:h,auth=c.u&&c.p?`Proxy-Authorization: Basic ${btoa(c.u+':'+c.p)}\r\n`:'';
    x.w=x.sock.writable.getWriter();await x.w.write(te.encode(`CONNECT ${hh}:${p} HTTP/1.1\r\nHost: ${hh}:${p}\r\n${auth}Connection: Keep-Alive\r\n\r\n`));
    r=x.sock.readable.getReader();let b=z;
    for(;;){const{value,done}=await rc(r.read());if(done)throw new Error('Proxy closed');b=b.length?cat(b,value):u8(value);let i=0;for(;i+3<b.length&&!(b[i]===13&&b[i+1]===10&&b[i+2]===13&&b[i+3]===10);i++);if(i+3>=b.length)continue;const t=td.decode(b.slice(0,i+4));if(!t.startsWith('HTTP/1.1 200')&&!t.startsWith('HTTP/1.0 200'))throw new Error('Connect failed');const tail=b.slice(i+4);if(tail.length)x.tail=tail;rel(r);return x}
  }catch(e){await xC(r,x);throw e}
}

async function sC(dc,h,p,c){
  const x=await dC(dc,c.h,c.pt);let r=null;
  try{
    x.w=x.sock.writable.getWriter();r=x.sock.readable.getReader();
    await x.w.write(new Uint8Array([5,2,0,2]));let b=z,head;[head,b]=await rN(r,b,2);
    if(head[1]===0xff)throw new Error('No acceptable auth method');
    if(head[1]===2){if(!c.u||!c.p)throw new Error('Auth required');const u=te.encode(c.u),p=te.encode(c.p);await x.w.write(new Uint8Array([1,u.length,...u,p.length,...p]));[head,b]=await rN(r,b,2);if(head[1]!==0)throw new Error('Auth failed')}
    const a=sA(h),req=new Uint8Array(5+a.length);req[0]=5;req[1]=1;req[2]=0;req.set(a,3);req[3+a.length]=p>>8;req[4+a.length]=p&255;await x.w.write(req);
    [head,b]=await rN(r,b,4);if(head[1]!==0)throw new Error('Connect failed');
    if(head[3]===1)[,b]=await rN(r,b,6);else if(head[3]===4)[,b]=await rN(r,b,18);else if(head[3]===3){let l;[l,b]=await rN(r,b,1);[,b]=await rN(r,b,l[0]+2)}else throw new Error('Invalid atyp');
    if(b.length)x.tail=b;rel(r);return x;
  }catch(e){await xC(r,x);throw e}
}

async function rN(r,b,n){while(b.length<n){const{value,done}=await rc(r.read());if(done)throw new Error('Proxy closed');b=b.length?cat(b,value):u8(value)}return[b.slice(0,n),b.slice(n)]}
function hU(w,vh,done,lg=dbg){
  let ok=false,b=z,off=false;
  const as=new Set();
  const dq=async q=>{
    const a=new AbortController(),t=setTimeout(()=>a.abort(),K.to);as.add(a);
    try{return await fetch('https://cloudflare-dns.com/dns-query',{method:'POST',headers:{'content-type':'application/dns-message'},body:q,signal:a.signal})}
    finally{clearTimeout(t);as.delete(a)}
  };
  const send=async q=>{
    if(off)return;
    try{
      const r=await dq(q);
      if(!r.ok){lg('udp doh status',String(r.status));return}
      const d=new Uint8Array(await r.arrayBuffer()),l=new Uint8Array([d.length>>8,d.length&255]);
      if(off||w.readyState!==WebSocket.OPEN)return;
      w.send(ok?cat(l,d):cat(vh,l,d));ok=true;done?.();
    }catch(e){if(!off&&!qE(e))lg('udp doh error',e?.message||'error')}
  };
  const close=()=>{off=true;b=z;for(const a of as)a.abort();as.clear()};
  return{
    async write(ch){
      if(off)return;
      let d=u8(ch),i=0;if(b.length){d=cat(b,d);b=z}
      for(;i+2<=d.length;){const l=(d[i]<<8)|d[i+1];if(i+2+l>d.length)break;await send(d.slice(i+2,i+2+l));i+=2+l}
      if(i<d.length)b=d.slice(i);
      if(b.length>4096)b=z;
    },
    close,
    abort:close
  };
}

function mR(w,h){
  let off=false;
  return new ReadableStream({
    start(c){
      w.addEventListener('message',e=>{if(off)return;try{c.enqueue(e.data)}catch{off=true;try{w.close()}catch{}}});
      w.addEventListener('close',()=>{if(!off){off=true;try{c.close()}catch{}}});
      w.addEventListener('error',e=>{if(!off){off=true;try{c.error(e)}catch{}}});
      const d=h.length<=K.ed*4/3+4?b64(h):null;if(d&&d.byteLength<=K.ed&&!off)c.enqueue(d);
    },
    cancel(){off=true;try{w.close()}catch{}}
  });
}

function pV(d){
  d=u8(d);const n=d.byteLength;if(n<24)return null;
  const v=d[0];
  if(!mU(d))return null;
  const i=18+d[17];if(i+4>n)return null;const c=d[i];if(c!==1&&c!==2)return null;
  const p=(d[i+1]<<8)|d[i+2];let j=i+3,h='';const a=d[j++];
  if(a===1){if(j+4>n)return null;h=d.slice(j,j+4).join('.');j+=4}
  else if(a===2){if(j>=n)return null;const l=d[j++];if(!l||j+l>n)return null;h=td.decode(d.slice(j,j+l));j+=l}
  else if(a===3){if(j+16>n)return null;h=bV6(d.buffer,d.byteOffset+j);j+=16}
  else return null;
  return{addr:h,port:p,idx:j,ver:v,isUDP:c===2};
}

function pS(s){
  const iH=/^http:\/\//i.test(s);s=s.replace(/^(socks5?|http):\/\//i,'');
  const at=s.lastIndexOf('@'),hp=at!==-1?s.slice(at+1):s,[h,pt]=pH(hp);
  const up=at!==-1?s.slice(0,at):'',i=up.indexOf(':');
  return{u:i<0?'':up.slice(0,i),p:i<0?'':up.slice(i+1),h,pt,isHttp:iH};
}
