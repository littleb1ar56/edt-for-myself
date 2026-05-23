/*
 本项目仅作为学习使用，请勿用于非法用途。
*/
const V='3.1.5';
const U='aaa6b096-1165-4bbe-935c-99f4ec902d02';
const P='txt@kr.william.dwb.cc.cd';
const S5='';
const GS5=false;
const D=false;
const SUB='sub.glimmer.hidns.vip';
const UID='ikun';
const K={to:6000,ui:5000,ed:8*1024,tc:64,ct:60*60*1000};

if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(U))throw new Error('Invalid UUID');

const z=new Uint8Array(0),te=new TextEncoder(),td=new TextDecoder(),ub=new Uint8Array(16);
for(let i=0,p=0,c,h;i<16;i++){c=U.charCodeAt(p++);if(c===45)c=U.charCodeAt(p++);h=(c>64?c+9:c)&15;c=U.charCodeAt(p++);if(c===45)c=U.charCodeAt(p++);ub[i]=h<<4|((c>64?c+9:c)&15)}
const tc=new Map(),tp=new Map();
const mU=d=>{for(let i=0;i<16;i++)if(d[i+1]!==ub[i])return false;return true};

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

const race=(p,ms=K.to)=>{let t;return Promise.race([p,new Promise((_,r)=>{t=setTimeout(()=>r(new Error('timeout')),ms)})]).finally(()=>clearTimeout(t))};
const u8=x=>x instanceof Uint8Array?x:x instanceof ArrayBuffer?new Uint8Array(x):ArrayBuffer.isView(x)?new Uint8Array(x.buffer,x.byteOffset,x.byteLength):z;
const b64=s=>{if(!s)return null;try{let x=s.replace(/-/g,'+').replace(/_/g,'/');x=x.padEnd(Math.ceil(x.length/4)*4,'=');return Uint8Array.from(atob(x),c=>c.charCodeAt(0))}catch{return null}};
const cat=(...a)=>{const l=a.map(u8),o=new Uint8Array(l.reduce((n,x)=>n+x.length,0));let p=0;for(const x of l){o.set(x,p);p+=x.length}return o};
const dbg=(s,x='')=>{if(D)console.log(`${s}${x?' '+x:''}`)};
const dbe=(s,e)=>{if(D)console.error(s,e?.stack||e?.message||e||'')};
const mkL=r=>{const i=(r.headers.get('cf-ray')||Date.now().toString(36)).slice(0,8),s=Date.now();return[(a,b='')=>dbg(i+' '+a,b),(a,e)=>dbe(i+' '+a,e),()=>Date.now()-s]};
const quiet=e=>/cancel|closed|aborted|network connection lost/i.test(e?.message||e||'');
const rel=x=>{try{x?.releaseLock?.()}catch{}};
const closeAll=async(...a)=>{
  const p=[],add=x=>{
    if(!x)return;if(x.sock||x.w||x.r)return add(x.r),add(x.w),add(x.sock);
    const f=x.cancel?()=>x.cancel('closed'):x.abort?()=>x.abort('closed'):()=>x.close?.();
    p.push(Promise.resolve().then(f).catch(()=>{}).finally(()=>rel(x)));
  };
  a.forEach(add);await Promise.allSettled(p);
};
const qP=(u,k)=>{
  const q=u.pathname.slice(1)+(u.search?'&'+u.search.slice(1):'');
  for(const p of q.split('&')){
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
async function fTO(u,i){const a=new AbortController(),t=setTimeout(()=>a.abort(),K.to);try{return await fetch(u,{...i,signal:a.signal})}finally{clearTimeout(t)}}
async function qT(d){
  try{
    const r=await fTO(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(d)}&type=TXT`,{headers:{accept:'application/dns-json'}});
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
  const[lg,er,ms]=mkL(r);
  const[client,w]=Object.values(new WebSocketPair());w.binaryType='arraybuffer';w.accept({allowHalfOpen:true});
  const pd=tH(px);if(pd)pT(pd).catch(e=>{if(!quiet(e))er('txt warmup failed',e)});
  let c=null,dw=null,closed=false,hold=null,unhold=null,ut=0;
  const setC=(x,p=false)=>{
    if(closed){void closeAll(x);return 0}
    c=x;
    if(p){if(!hold)hold=new Promise(r=>{unhold=r});return 1}
    if(unhold){const r=unhold;hold=null;unhold=null;r()}
    return 1;
  };
  const end=async why=>{
    if(closed)return;lg('end',`${why||'done'} ms=${ms()}`);closed=true;
    if(ut)clearTimeout(ut);ut=0;
    if(unhold){const r=unhold;hold=null;unhold=null;r()}
    const tdw=dw,tc=c;dw=null;c=null;
    await closeAll(tdw,tc);try{if(w.readyState===WebSocket.OPEN)w.close(1000)}catch(e){if(!quiet(e))er('ws close failed',e)}
  };
  const stop=why=>{end(why).catch(e=>{if(!quiet(e))er('end failed',e)})};
  const udpIdle=()=>{if(ut)clearTimeout(ut);ut=setTimeout(()=>stop('udp idle'),K.ui)};
  const open=async d=>{
    const p=pV(d);if(!p)throw new Error('Invalid VLESS request');
    const vh=new Uint8Array([p.ver,0]),first=d.subarray(p.idx);
    lg('open',`${p.isUDP?'udp':'tcp'} ${p.addr}:${p.port} first=${first.byteLength}`);
    if(p.isUDP){
      if(p.port!==53)throw new Error('Invalid UDP port');
      dw=hU(w,vh,udpIdle,lg);if(first.byteLength)await dw.write(first);return;
    }
    const nc=await cn(dc,p.addr,p.port,first,px,s5,gs5,w,lg);
    if(!setC(nc))return;
    rl(nc,w,vh,end,setC,er,lg).catch(e=>{if(!quiet(e))er('rl failed',e);stop('remote error')});
  };
  mR(w,eh).pipeTo(new WritableStream({
    async write(ch){
      try{
        if(hold)await hold;
        if(closed)return;
        const d=u8(ch);if(!d.length)return;
        if(dw){if(ut)clearTimeout(ut);ut=0;await dw.write(d);return}
        if(c){c.w||=c.sock.writable.getWriter();await c.w.write(d);return}
        await open(d);
      }catch(e){if(!quiet(e))lg('pump error',e?.message||'error');await end('pump')}
    },
    close(){return end('client')},
    abort(){return end('client error')}
  })).catch(e=>{if(!quiet(e))er('ws pipe failed',e);stop('pipe')});
  w.addEventListener('close',()=>stop('client'));w.addEventListener('error',()=>stop('client error'));
  return new Response(null,{status:101,webSocket:client,headers:{'Sec-WebSocket-Extensions':''}});
}

async function cn(dc,addr,port,data,px,s5,gs5,w,lg=dbg){
  data=data||z;
  const cfg=s5?pS(s5):null,fb=()=>cfg?cfg.isHttp?hC(dc,addr,port,cfg):sC(dc,addr,port,cfg):pC(dc,px,port,lg);
  const use=async c=>{try{if(w.readyState!==WebSocket.OPEN)throw new Error('closed');c.w||=c.sock.writable.getWriter();if(data.length)await c.w.write(data);return c}catch(e){await closeAll(c);throw e}};
  if(gs5&&cfg)return use(await fb());
  try{const c=await use(await dC(dc,addr,port));c.retry=async()=>use(await fb());return c}catch(e){if(w.readyState!==WebSocket.OPEN)throw e;lg('tcp fallback',e?.message||'direct failed');return use(await fb())}
}

async function dC(dc,h,p){const sock=dc({hostname:h,port:p});try{await race(sock.opened);return{sock}}catch(e){await closeAll(sock);throw e}}
async function pC(dc,px,port,lg=dbg){
  const d=tH(px);
  if(d){const l=await pT(d);if(l?.length){const x=l[Math.floor(Math.random()*l.length)];return dC(dc,x.h,x.p)}const[h,p]=pH(d,port);lg('txt fallback',`${h}:${p}`);return dC(dc,h,p)}
  const[h,p]=pH(px,port);return dC(dc,h,p);
}
async function rl(c,w,vh,end,setC,er=dbe,lg=dbg){
  let hdr=vh,has=false,err=null;
  const send=d=>{
    d=u8(d);if(!d.length)return;
    if(w.readyState!==WebSocket.OPEN)throw new Error('ws closed');
    has=true;
    if(hdr){w.send(cat(hdr,d));hdr=null}else w.send(d);
  };
  try{
    if(c.tail?.length){send(c.tail);c.tail=z}
    await c.sock.readable.pipeTo(new WritableStream({
      write(ch){send(ch)},
      close(){lg('remote close',String(has))},
      abort(r){err=r||new Error('remote abort')}
    }));
  }catch(e){err=e}
  if(!has&&c.retry&&w.readyState===WebSocket.OPEN){
    const old=c;if(!setC(null,true)){await closeAll(old);return}await closeAll(old);
    try{const nc=await old.retry();if(!setC(nc))return;return rl(nc,w,vh,end,setC,er,lg)}catch(e){err=e}
  }
  if(err&&!quiet(err))er('remoteSocketToWS has exception',err);
  await end('remote');
}

async function hC(dc,h,pt,c){
  const x=await dC(dc,c.h,c.pt);let r=null;
  try{
    const hh=h.includes(':')?`[${h}]`:h,auth=c.u&&c.p?`Proxy-Authorization: Basic ${btoa(c.u+':'+c.p)}\r\n`:'';
    x.w=x.sock.writable.getWriter();await x.w.write(te.encode(`CONNECT ${hh}:${pt} HTTP/1.1\r\nHost: ${hh}:${pt}\r\n${auth}Connection: Keep-Alive\r\n\r\n`));
    r=x.sock.readable.getReader();let b=z;
    for(;;){const{value,done}=await race(r.read());if(done)throw new Error('Proxy closed');b=b.length?cat(b,value):u8(value);let i=0;for(;i+3<b.length&&!(b[i]===13&&b[i+1]===10&&b[i+2]===13&&b[i+3]===10);i++);if(i+3>=b.length)continue;const t=td.decode(b.slice(0,i+4));if(!t.startsWith('HTTP/1.1 200')&&!t.startsWith('HTTP/1.0 200'))throw new Error('Connect failed');const tail=b.slice(i+4);if(tail.length)x.tail=tail;rel(r);return x}
  }catch(e){await closeAll(r,x);throw e}
}

async function sC(dc,h,pt,c){
  const x=await dC(dc,c.h,c.pt);let r=null;
  try{
    x.w=x.sock.writable.getWriter();r=x.sock.readable.getReader();
    await x.w.write(new Uint8Array([5,2,0,2]));let b=z,head;[head,b]=await rN(r,b,2);
    if(head[1]===0xff)throw new Error('No acceptable auth method');
    if(head[1]===2){if(!c.u||!c.p)throw new Error('Auth required');const u=te.encode(c.u),p=te.encode(c.p);await x.w.write(new Uint8Array([1,u.length,...u,p.length,...p]));[head,b]=await rN(r,b,2);if(head[1]!==0)throw new Error('Auth failed')}
    const a=sA(h),req=new Uint8Array(5+a.length);req[0]=5;req[1]=1;req[2]=0;req.set(a,3);req[3+a.length]=pt>>8;req[4+a.length]=pt&255;await x.w.write(req);
    [head,b]=await rN(r,b,4);if(head[1]!==0)throw new Error('Connect failed');
    if(head[3]===1)[,b]=await rN(r,b,6);else if(head[3]===4)[,b]=await rN(r,b,18);else if(head[3]===3){let l;[l,b]=await rN(r,b,1);[,b]=await rN(r,b,l[0]+2)}else throw new Error('Invalid atyp');
    if(b.length)x.tail=b;rel(r);return x;
  }catch(e){await closeAll(r,x);throw e}
}

async function rN(r,b,n){while(b.length<n){const{value,done}=await race(r.read());if(done)throw new Error('Proxy closed');b=b.length?cat(b,value):u8(value)}return[b.slice(0,n),b.slice(n)]}
function hU(w,vh,done,lg=dbg){
  let sent=false,cache=z,closed=false;
  const acs=new Set();
  const doh=async q=>{
    const a=new AbortController(),t=setTimeout(()=>a.abort(),K.to);acs.add(a);
    try{return await fetch('https://cloudflare-dns.com/dns-query',{method:'POST',headers:{'content-type':'application/dns-message'},body:q,signal:a.signal})}
    finally{clearTimeout(t);acs.delete(a)}
  };
  const send=async q=>{
    if(closed)return;
    try{
      const r=await doh(q);
      if(!r.ok){lg('udp doh status',String(r.status));return}
      const d=new Uint8Array(await r.arrayBuffer()),l=new Uint8Array([d.length>>8,d.length&255]);
      if(closed||w.readyState!==WebSocket.OPEN)return;
      w.send(sent?cat(l,d):cat(vh,l,d));sent=true;done?.();
    }catch(e){if(!closed&&!quiet(e))lg('udp doh error',e?.message||'error')}
  };
  const close=()=>{closed=true;cache=z;for(const a of acs)a.abort();acs.clear()};
  return{
    async write(ch){
      if(closed)return;
      let d=u8(ch),i=0;if(cache.length){d=cat(cache,d);cache=z}
      for(;i+2<=d.length;){const l=(d[i]<<8)|d[i+1];if(i+2+l>d.length)break;await send(d.slice(i+2,i+2+l));i+=2+l}
      if(i<d.length)cache=d.slice(i);
      if(cache.length>4096)cache=z;
    },
    close,
    abort:close
  };
}

function mR(w,eh){
  let closed=false;
  return new ReadableStream({
    start(c){
      w.addEventListener('message',e=>{if(closed)return;try{c.enqueue(e.data)}catch{closed=true;try{w.close()}catch{}}});
      w.addEventListener('close',()=>{if(!closed){closed=true;try{c.close()}catch{}}});
      w.addEventListener('error',e=>{if(!closed){closed=true;try{c.error(e)}catch{}}});
      const d=eh.length<=K.ed*4/3+4?b64(eh):null;if(d&&d.byteLength<=K.ed&&!closed)c.enqueue(d);
    },
    cancel(){closed=true;try{w.close()}catch{}}
  });
}

function pV(d){
  d=u8(d);const n=d.byteLength;if(n<24)return null;
  const ver=d[0];
  if(!mU(d))return null;
  const ci=18+d[17];if(ci+4>n)return null;const cmd=d[ci];if(cmd!==1&&cmd!==2)return null;
  const port=(d[ci+1]<<8)|d[ci+2];let ai=ci+3,addr='';const at=d[ai++];
  if(at===1){if(ai+4>n)return null;addr=d.slice(ai,ai+4).join('.');ai+=4}
  else if(at===2){if(ai>=n)return null;const l=d[ai++];if(!l||ai+l>n)return null;addr=td.decode(d.slice(ai,ai+l));ai+=l}
  else if(at===3){if(ai+16>n)return null;addr=bV6(d.buffer,d.byteOffset+ai);ai+=16}
  else return null;
  return{addr,port,idx:ai,ver,isUDP:cmd===2};
}

function pS(s){
  const isHttp=/^http:\/\//i.test(s);s=s.replace(/^(socks5?|http):\/\//i,'');
  const at=s.lastIndexOf('@'),hp=at!==-1?s.slice(at+1):s,[h,pt]=pH(hp);
  const up=at!==-1?s.slice(0,at):'',i=up.indexOf(':');
  return{u:i<0?'':up.slice(0,i),p:i<0?'':up.slice(i+1),h,pt,isHttp};
}
