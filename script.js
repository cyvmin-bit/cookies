// ===============================
// PRODUCT DATA
// ===============================
const products = [
  { id:1, slug:"biskut-mazola", name:"Biskut Mazola", price:25, qty:25, desc:"Traditional Biskut Mazola — crunchy and rich.", img:"Biskut Mazola.jpg" },
  { id:2, slug:"cornflakes-cookies", name:"Cornflakes Cookies", price:25, qty:33, desc:"Crunchy and sweet.", img:"Cornflakes Cookies.jpg" },
  { id:3, slug:"chocolate-chips", name:"Chocolate Chips", price:25, qty:20, desc:"Classic chocolate chip cookies.", img:"Chocolate Chips.jpg" },
  { id:4, slug:"london-almond", name:"London Almond", price:28, qty:30, desc:"Premium almond cookies.", img:"London Almond.jpg" },
  { id:5, slug:"red-velvet", name:"Red Velvet", price:28, qty:28, desc:"Soft red velvet cookies.", img:"Red Velvet.jpg" },
  { id:6, slug:"suji-badam", name:"Suji Badam", price:20, qty:40, desc:"Traditional suji almond cookies.", img:"Suji Badam.jpg" },
  { id:7, slug:"tart-nenas", name:"Tart Nenas", price:22, qty:50, desc:"Pineapple tart cookies.", img:"Tart Nenas.jpg" },
  { id:8, slug:"bright-eyed-susan", name:"Bright Eyed Susan", price:25, qty:20, desc:"Unique and buttery.", img:"Bright Eyed Susan.jpg" }
];


// ===============================
// SMOOTH SCROLL
// ===============================
function scrollToSection(id){
  document.getElementById(id).scrollIntoView({ behavior:'smooth' });
}


// ===============================
// RENDER PRODUCTS (with fade-in animation + img fallback)
// ===============================
function renderProducts(){
  const grid = document.getElementById('product-grid');

  grid.innerHTML = products.map(p => `
    <div class="card fade-in">
      <img class="thumb" src="${p.img}" alt="${p.name}"
        onerror="this.src='default.jpg'">
      <div class="card-body">
        <div class="card-title">${p.name}</div>
        <div class="price">RM ${p.price.toFixed(2)}</div>
        <div class="meta">(${p.qty} pcs)</div>
        <div style="margin-top:8px">
          <button class="pill" onclick="viewProduct(${p.id})">View</button>
          <button class="pill" onclick="addToCart(${p.id})">Add</button>
        </div>
      </div>
    </div>
  `).join('');
}


// ===============================
// PRODUCT DETAIL
// ===============================
function viewProduct(id){
  const p = products.find(x => x.id === id);
  const detail = document.getElementById('detail-area');

  detail.style.display = 'block';
  detail.scrollIntoView({ behavior: "smooth" });

  document.getElementById('product-detail').innerHTML = `
    <div class="left">
      <img src="${p.img}" 
           onerror="this.src='default.jpg'"
           style="width:100%;border-radius:10px;height:360px;object-fit:cover">
      <h2 style="margin-top:12px">${p.name}</h2>
      <p class="muted" style="margin-top:8px">${p.desc}</p>
    </div>
    <div class="right">
      <div style="font-size:1.2rem;font-weight:800">RM ${p.price.toFixed(2)}</div>
      <div class="muted">(${p.qty} pcs)</div>
      <div style="margin-top:12px"><button class="btn" onclick="addToCart(${p.id})">Add to cart</button></div>
    </div>`;
}


// ===============================
// CART FUNCTIONS
// ===============================
function getCart(){ return JSON.parse(localStorage.getItem('cart') || '[]'); }
function saveCart(c){ localStorage.setItem('cart', JSON.stringify(c)); }

function updateCartBadge(){
  const badge = document.getElementById("cart-count");
  const count = getCart().reduce((a,b)=>a+b.qty,0);
  if(badge) badge.innerText = count;
}

function addToCart(id){
  const p = products.find(x => x.id === id);
  const c = getCart();
  const ex = c.find(i => i.id === id);

  if(ex) ex.qty++;
  else c.push({...p, qty: 1});

  saveCart(c);
  updateCartBadge();
  renderCart();

  // prettier alert UI
  showToast(`${p.name} added to cart`);
}

function renderCart(){
  const c = getCart();
  const el = document.getElementById('cart-list');

  if(c.length === 0){
    el.innerHTML = '<p class="muted">Your cart is empty</p>';
    updateCartBadge();
    return;
  }

  el.innerHTML = c.map((i, idx) => `
    <div class="cart-item fade-in">
      <img src="${i.img}" onerror="this.src='default.jpg'">
      <div style="flex:1">
        <div style="font-weight:700">${i.name}</div>
        <div class="muted">
          RM ${i.price} • Qty:
          <input type="number" min="1" value="${i.qty}" data-idx="${idx}" style="width:60px">
        </div>
      </div>
      <div>
        RM ${(i.price * i.qty).toFixed(2)}
        <br><button onclick="removeItem(${idx})">Remove</button>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('#cart-list input').forEach(n => {
    n.onchange = e => {
      const c = getCart();
      c[e.target.dataset.idx].qty = Number(e.target.value);
      saveCart(c);
      renderCart();
    }
  });

  updateCartBadge();
}

function removeItem(i){
  const c = getCart();
  c.splice(i,1);
  saveCart(c);
  renderCart();
}


// ===============================
// CHECKOUT
// ===============================
function goToCheckout(){
  document.getElementById('checkout').style.display = 'block';
  renderOrderSummary();
}

function renderOrderSummary(){
  const c = getCart();
  const el = document.getElementById('order-summary');
  let t = 0;

  el.innerHTML = c.map(i => {
    t += i.qty * i.price;
    return `
      <div style="display:flex;justify-content:space-between">
        <div>${i.name} x${i.qty}</div>
        <div>RM ${(i.qty*i.price).toFixed(2)}</div>
      </div>
    `;
  }).join('') +
  `<hr><div style="display:flex;justify-content:space-between;font-weight:800">
    <div>Total</div><div>RM ${t.toFixed(2)}</div>
  </div>`;
}


// ===============================
// ORDER PAYMENT
// ===============================
function simulatePayment(){
  const f = document.getElementById('checkout-form');

  if (!f.checkValidity()) return alert('Fill all fields');

  const c = getCart();
  if (!c.length) return alert('Cart empty');

  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const id = Date.now();

  orders.push({
    id,
    items: c,
    name: f.name.value,
    phone: f.phone.value,
    address: f.address.value
  });

  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.removeItem('cart');

  showToast("Order placed successfully! ✓");

  renderOrders();
  renderCart();
}


// ===============================
// RENDER ORDERS
// ===============================
function renderOrders(){
  const o = JSON.parse(localStorage.getItem('orders') || '[]');
  const el = document.getElementById('orders-list');

  if(!o.length){
    el.innerHTML = 'No orders yet';
    return;
  }

  el.innerHTML = o.map(x => `
    <div class="fade-in" style="padding:8px;background:#faf6f3;border-radius:8px;margin-bottom:8px">
      <div style="font-weight:700">Order ${x.id}</div>
      <div>Name: ${x.name}</div>
      <div>Items: ${x.items.map(i => i.name + ' x' + i.qty).join(', ')}</div>
    </div>
  `).join('');
}


// ===============================
// NICE TOAST ALERT
// ===============================
function showToast(msg){
  const t = document.createElement("div");
  t.className = "toast";
  t.innerText = msg;
  document.body.appendChild(t);
  setTimeout(()=> t.classList.add("show"), 10);
  setTimeout(()=> t.remove(), 3500);
}


// ===============================
// INIT
// ===============================
renderProducts();
renderCart();
renderOrders();
updateCartBadge();
