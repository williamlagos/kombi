import{B as a,T as s}from"./p-65d8e78f.js";const t="localhost"===(window&&window.location&&window.location.hostname)?"http://localhost:3000":"https://api.shipping.net",e=e=>async c=>{a.setDomain(t);const i=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(window.atob(i))._id,o=await(await a.getReadyOrders({xAccessToken:e})).json(),w=o.map((a=>a.pictures)).flat(),r=await(await a.getPictures({xAccessToken:e,ids:w.flat()})).json(),d=o.map((async s=>{if(s.bids.length>0){const t=(await(await a.getOrderBids({xAccessToken:e,order:s._id})).json()).filter((a=>n===a.user._id));s.placed=t.length>0}for(let a=0;a<r.length;a++){const t=s.pictures.indexOf(r[a]._id);-1!==t&&(s.pictures[t]=r[a])}return s})),p=await Promise.all(d);return c({type:s.SHOW_ORDER,orders:p})},c=e=>async c=>{a.setDomain(t);const i=await(await a.getOrders({xAccessToken:e})).json();return c({type:s.MERCHANT_ORDERS,orders:i})},i=(e,c)=>async i=>(a.setDomain(t),await a.acceptOrder({xAccessToken:c,id:e}),i({type:s.SELECT_ORDER})),n=(e,c,i)=>async n=>(a.setDomain(t),await await a.placeBid({xAccessToken:i,bid:e,order:c}),n({type:s.PLACE_ORDER,orderId:c})),o=(e,c,i)=>async n=>(a.setDomain(t),await a.rateOrder({xAccessToken:i,id:e,rate:c}),n({type:s.RATE_ORDER})),w=(e,c)=>async i=>(a.setDomain(t),await a.startOrder({xAccessToken:c,id:e}),i({type:s.START_ORDER})),r=(e,c)=>async i=>(a.setDomain(t),await a.finishOrder({xAccessToken:c,id:e}),i({type:s.FINISH_ORDER})),d=(e,c)=>async i=>(a.setDomain(t),await a.cancelOrder({xAccessToken:c,id:e}),i({type:s.CANCEL_ORDER}));export{e as a,i as b,d as c,w as d,r as f,n as p,o as r,c as s}