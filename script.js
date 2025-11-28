const products = [
  {
    id: 1,
    slug: "biskut-mazola",
    name: "Biskut Mazola",
    price: 25,
    qty: 25,
    desc: "Traditional Biskut Mazola — crunchy and rich.",
    img: "biskut-mazola.jpg"
  },
  {
    id: 2,
    slug: "cornflakes-cookies",
    name: "Cornflakes Cookies",
    price: 25,
    qty: 33,
    desc: "Crunchy and sweet.",
    img: "cornflakes-cookies.jpg"
  },
  {
    id: 3,
    slug: "chocolate-chips",
    name: "Chocolate Chips",
    price: 25,
    qty: 20,
    desc: "Classic chocolate chip cookies.",
    img: "chocolate-chips.jpg"
  },
  {
    id: 4,
    slug: "london-almond",
    name: "London Almond",
    price: 28,
    qty: 30,
    desc: "Premium almond cookies.",
    img: "london-almond.jpg"
  },
  {
    id: 5,
    slug: "red-velvet",
    name: "Red Velvet",
    price: 28,
    qty: 28,
    desc: "Soft red velvet cookies.",
    img: "red-velvet.jpg"
  },
  {
    id: 6,
    slug: "suji-badam",
    name: "Suji Badam",
    price: 20,
    qty: 40,
    desc: "Traditional suji almond cookies.",
    img: "suji-badam.jpg"
  },
  {
    id: 7,
    slug: "tart-nenas",
    name: "Tart Nenas",
    price: 22,
    qty: 50,
    desc: "Pineapple tart cookies.",
    img: "tart-nenas.jpg"
  },
  {
    id: 8,
    slug: "bright-eyed-susan",
    name: "Bright Eyed Susan",
    price: 25,
    qty: 20,
    desc: "Unique and buttery.",
    img: "bright-eyed-susan.jpg"
  }
];

function scrollToSection(id){document.getElementById(id).scrollIntoView({behavior:'smooth'})}

function renderProducts(){
 document.getElementById('product-grid').innerHTML=products.map(p=>`
   <div class="card">
     <img class="thumb" src="${p.img}" alt="${p.name}">
     <div class="card-body">
       <div class="card-title">${p.name}</div>
       <div class="price">RM ${p.price.toFixed(2)}</div>
       <div class="meta">(${p.qty} pcs)</div>
       <div style="margin-top:8px"><button class="pill" onclick="viewProduct(${p.id})">View</button> <button class="pill" onclick="addToCart(${p.id})">Add</button></div>
     </div>
   </div>
 `).join('');
}

function viewProduct(id){
 const p=products.find(x=>x.id===id);
 document.getElementById('detail-area').style.display='block';
 document.getElementById('product-detail').innerHTML=`
   <div class="left">
     <img src="${p.img}" style="width:100%;border-radius:10px;height:360px;object-fit:cover">
     <h2 style="margin-top:12px">${p.name}</h2>
     <p class="muted" style="margin-top:8px">${p.desc}</p>
   </div>
   <div class="right">
     <div style="font-size:1.2rem;font-weight:800">RM ${p.price.toFixed(2)}</div>
     <div class="muted">(${p.qty} pcs)</div>
     <div style="margin-top:12px"><button class="btn" onclick="addToCart(${p.id})">Add to cart</button></div>
   </div>`;
}

function getCart(){return JSON.parse(localStorage.getItem('cart')||'[]')}
function saveCart(c){localStorage.setItem('cart',JSON.stringify(c))}

function addToCart(id){
 const p=products.find(x=>x.id===id);
 const c=getCart();
 const ex=c.find(i=>i.id===id);
 if(ex) ex.qty++; 
 else c.push({...p,qty:1});
 saveCart(c); renderCart(); alert('Added to cart');
}

function renderCart(){
 const c=getCart();
 const el=document.getElementById('cart-list');
 if(c.length===0){el.innerHTML='<p class="muted">Your cart is empty</p>';return}
 el.innerHTML=c.map((i,idx)=>`
   <div class="cart-item">
     <img src="${i.img}">
     <div style="flex:1">
       <div style="font-weight:700">${i.name}</div>
       <div class="muted">RM ${i.price} • Qty: <input type="number" min="1" value="${i.qty}" data-idx="${idx}" style="width:60px"></div>
     </div>
     <div>RM ${(i.price*i.qty).toFixed(2)}<br><button onclick="removeItem(${idx})">Remove</button></div>
   </div>`).join('');
 document.querySelectorAll('#cart-list input').forEach(n=>{
   n.onchange=e=>{const c=getCart();c[e.target.dataset.idx].qty=Number(e.target.value);saveCart(c);renderCart()}
 })
}

function removeItem(i){const c=getCart();c.splice(i,1);saveCart(c);renderCart()}

function goToCheckout(){document.getElementById('checkout').style.display='block';renderOrderSummary()}

function renderOrderSummary(){
 const c=getCart();
 const el=document.getElementById('order-summary');
 let t=0;
 el.innerHTML=c.map(i=>{t+=i.qty*i.price;return `<div style='display:flex;justify-content:space-between'><div>${i.name} x${i.qty}</div><div>RM ${(i.qty*i.price).toFixed(2)}</div></div>`}).join('')+`<hr><div style='display:flex;justify-content:space-between;font-weight:800'><div>Total</div><div>RM ${t.toFixed(2)}</div></div>`;
}

function simulatePayment(){
 const f=document.getElementById('checkout-form');
 if(!f.checkValidity()) return alert('Fill all fields');
 const c=getCart(); if(!c.length) return alert('Cart empty');
 const orders=JSON.parse(localStorage.getItem('orders')||'[]');
 const id=Date.now();
 orders.push({id,items:c,name:f.name.value,phone:f.phone.value,address:f.address.value});
 localStorage.setItem('orders',JSON.stringify(orders));
 localStorage.removeItem('cart');
 alert('Order placed: '+id);
 renderOrders();renderCart();
}

function renderOrders(){
 const o=JSON.parse(localStorage.getItem('orders')||'[]');
 const el=document.getElementById('orders-list');
 if(!o.length){el.innerHTML='No orders yet';return}
 el.innerHTML=o.map(x=>`<div style='padding:8px;background:#faf6f3;border-radius:8px;margin-bottom:8px'><div style='font-weight:700'>Order ${x.id}</div><div>Name: ${x.name}</div><div>Items: ${x.items.map(i=>i.name+' x'+i.qty).join(', ')}</div></div>`).join('');
}

document.addEventListener('submit',e=>{
 if(e.target.id==='admin-add-form'){
   e.preventDefault();
   const f=e.target;
   const obj={
     id:products.length+1,
     name:f.name.value,
     price:Number(f.price.value),
     qty:Number(f.qty.value),
     desc:f.desc.value,
     img:f.img.value||'default.jpg'
   };
   products.push(obj);
   renderProducts(); 
   f.reset(); 
   alert('Product added');
 }
})

renderProducts();
renderCart();
renderOrders();
