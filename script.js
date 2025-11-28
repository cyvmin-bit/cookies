const products = [
  {
    id: 1,
    slug: "biskut-mazola",
    name: "Biskut Mazola",
    price: 25,
    qty: 25,
    desc: "Traditional Biskut Mazola — crunchy and rich.",
    img: "Biskut Mazola.jpg"
  },
  {
    id: 2,
    slug: "cornflakes-cookies",
    name: "Cornflakes Cookies",
    price: 25,
    qty: 33,
    desc: "Crunchy and sweet.",
    img: "Cornflakes Cookies.jpg"
  },
  {
    id: 3,
    slug: "chocolate-chips",
    name: "Chocolate Chips",
    price: 25,
    qty: 20,
    desc: "Classic chocolate chip cookies.",
    img: "Chocolate Chips.jpg"
  },
  {
    id: 4,
    slug: "london-almond",
    name: "London Almond",
    price: 28,
    qty: 30,
    desc: "Premium almond cookies.",
    img: "London Almond.jpg"
  },
  {
    id: 5,
    slug: "red-velvet",
    name: "Red Velvet",
    price: 28,
    qty: 28,
    desc: "Soft red velvet cookies.",
    img: "Red Velvet.jpg"
  },
  {
    id: 6,
    slug: "suji-badam",
    name: "Suji Badam",
    price: 20,
    qty: 40,
    desc: "Traditional suji almond cookies.",
    img: "Suji Badam.jpg"
  },
  {
    id: 7,
    slug: "tart-nenas",
    name: "Tart Nenas",
    price: 22,
    qty: 50,
    desc: "Pineapple tart cookies.",
    img: "Tart Nenas.jpg"
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

function logout() {
  localStorage.removeItem('user');
  updateUI();
  alert('Logged out successfully');
}

function updateUI() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const loginNav = document.getElementById('login-nav');
  const userInfo = document.getElementById('user-info');
  const logoutBtn = document.getElementById('logout-btn');

  // find the Admin nav link (support multiple markup variations)
  const adminNav = document.querySelector('nav a.admin, nav a#admin, nav a[href="/admin"], nav a[href*="admin"]');

  const isLoggedIn = user && !!user.loggedIn;
  const isAdmin = isLoggedIn && (user.type === 'admin' || user.role === 'admin');

  // login / user info visibility
  if (loginNav) loginNav.style.display = isLoggedIn ? 'none' : '';
  if (userInfo) {
    userInfo.style.display = isLoggedIn ? 'inline-block' : 'none';
    userInfo.textContent = isLoggedIn ? `Welcome, ${user.email || user.name || 'customer'}` : '';
  }
  if (logoutBtn) logoutBtn.style.display = isLoggedIn ? '' : 'none';

  // hide admin link when not admin
  if (adminNav) {
    adminNav.style.display = isAdmin ? '' : 'none';
  }

  // add body classes so CSS fallback works too
  document.body.classList.toggle('customer', isLoggedIn && !isAdmin);
  document.body.classList.toggle('admin', isAdmin);
}

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
 const user = JSON.parse(localStorage.getItem('user') || '{}');
 if (!user.loggedIn) {
   alert('Please login first to add items to cart');
   window.location.href = 'login.html';
   return;
 }
 
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

function goToCheckout(){
 const user = JSON.parse(localStorage.getItem('user') || '{}');
 if (!user.loggedIn || user.type !== 'customer') {
   alert('Please login as customer to checkout');
   window.location.href = 'login.html';
   return;
 }
 document.getElementById('checkout').style.display='block';renderOrderSummary()
}

function renderOrderSummary(){
 const c=getCart();
 const el=document.getElementById('order-summary');
 let t=0;
 el.innerHTML=c.map(i=>{t+=i.qty*i.price;return `<div style='display:flex;justify-content:space-between'><div>${i.name} x${i.qty}</div><div>RM ${(i.qty*i.price).toFixed(2)}</div></div>`}).join('')+`<hr><div style='display:flex;justify-content:space-between;font-weight:800'><div>Total</div><div>RM ${t.toFixed(2)}</div></div>`;
}

function simulatePayment(){
 const user = JSON.parse(localStorage.getItem('user') || '{}');
 if (user.type !== 'customer') {
   alert('Please login as customer to make payment');
   return;
 }
 
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
 el.innerHTML=o.map((x,idx)=>`
   <div style='padding:12px;background:#faf6f3;border-radius:8px;margin-bottom:12px' id="order-${x.id}">
     <div style='display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px'>
       <div style='font-weight:700'>Order #${x.id}</div>
       <div style='display:flex;gap:8px'>
         <button class="pill" onclick="editOrder(${idx})" style="font-size:12px;padding:4px 8px">Edit</button>
         <button class="pill" onclick="deleteOrder(${idx})" style="font-size:12px;padding:4px 8px;background:#dc3545;color:white;border-color:#dc3545">Delete</button>
       </div>
     </div>
     <div><strong>Name:</strong> ${x.name}</div>
     <div><strong>Phone:</strong> ${x.phone}</div>
     <div><strong>Address:</strong> ${x.address}</div>
     <div style='margin-top:8px'><strong>Items:</strong> ${x.items.map(i=>i.name+' x'+i.qty).join(', ')}</div>
     <div style='margin-top:4px'><strong>Total:</strong> RM ${calculateOrderTotal(x.items).toFixed(2)}</div>
   </div>
 `).join('');
}

function calculateOrderTotal(items) {
  return items.reduce((total, item) => total + (item.price * item.qty), 0);
}

function deleteOrder(index) {
  if (!confirm('Are you sure you want to delete this order?')) {
    return;
  }
  
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.splice(index, 1);
  localStorage.setItem('orders', JSON.stringify(orders));
  renderOrders();
  alert('Order deleted successfully');
}

function editOrder(index) {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const order = orders[index];
  
  // Create edit form
  const orderElement = document.getElementById(`order-${order.id}`);
  orderElement.innerHTML = `
    <div style='margin-bottom:12px;font-weight:700'>Edit Order #${order.id}</div>
    <form id="edit-order-form-${order.id}">
      <div style='display:grid;gap:8px;margin-bottom:12px'>
        <div>
          <label style='font-size:12px;font-weight:600'>Customer Name</label>
          <input name="name" value="${order.name}" required style="padding:6px;font-size:14px">
        </div>
        <div>
          <label style='font-size:12px;font-weight:600'>Phone</label>
          <input name="phone" value="${order.phone}" required style="padding:6px;font-size:14px">
        </div>
        <div>
          <label style='font-size:12px;font-weight:600'>Address</label>
          <textarea name="address" rows="2" required style="padding:6px;font-size:14px">${order.address}</textarea>
        </div>
      </div>
      <div style='margin-bottom:12px'>
        <div style='font-weight:600;margin-bottom:8px;font-size:14px'>Order Items:</div>
        ${order.items.map((item, itemIndex) => `
          <div style='display:flex;gap:8px;align-items:center;margin-bottom:6px;padding:6px;background:white;border-radius:6px'>
            <div style='flex:1'>
              <div style='font-weight:600'>${item.name}</div>
              <div style='font-size:12px;color:#6b5f59'>RM ${item.price} each</div>
            </div>
            <div>
              <label style='font-size:12px'>Qty:</label>
              <input type="number" min="1" value="${item.qty}" name="item-qty-${itemIndex}" style="width:60px;padding:4px;font-size:14px">
            </div>
          </div>
        `).join('')}
      </div>
      <div style='display:flex;gap:8px;justify-content:flex-end'>
        <button type="button" class="pill" onclick="cancelEdit(${order.id})" style="padding:6px 12px">Cancel</button>
        <button type="submit" class="pill" style="padding:6px 12px;background:#28a745;color:white;border-color:#28a745">Save</button>
      </div>
    </form>
  `;
  
  // Add form submit handler
  document.getElementById(`edit-order-form-${order.id}`).addEventListener('submit', function(e) {
    e.preventDefault();
    saveOrderEdit(index, order.id);
  });
}

function cancelEdit(orderId) {
  renderOrders();
}

function saveOrderEdit(index, orderId) {
  const form = document.getElementById(`edit-order-form-${orderId}`);
  const formData = new FormData(form);
  
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const order = orders[index];
  
  // Update order details
  order.name = formData.get('name');
  order.phone = formData.get('phone');
  order.address = formData.get('address');
  
  // Update item quantities
  order.items.forEach((item, itemIndex) => {
    const newQty = parseInt(formData.get(`item-qty-${itemIndex}`));
    if (newQty > 0) {
      item.qty = newQty;
    }
  });
  
  localStorage.setItem('orders', JSON.stringify(orders));
  renderOrders();
  alert('Order updated successfully');
}

document.addEventListener('submit',e=>{
 if(e.target.id==='admin-add-form'){
   e.preventDefault();
   const user = JSON.parse(localStorage.getItem('user') || '{}');
   if (user.type !== 'admin') {
     alert('Admin access required');
     return;
   }
   
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

function onLoginSuccess(user) {
  // user should be like { email, type: 'customer' | 'admin' }
  const storedUser = {
    loggedIn: true,
    type: user.type || user.role || 'customer',
    email: user.email || user.username || ''
  };
  localStorage.setItem('user', JSON.stringify(storedUser));
  // keep UI in sync right away
  updateUI();
}

/* run at page load (fallback if page refreshes) */
document.addEventListener('DOMContentLoaded', () => {
  const heroImg = document.querySelector('.hero .right img') || document.querySelector('.hero img');
  if (heroImg) heroImg.src = 'mom.jpeg';
  // call updateUI to load stored user and hide admin if needed
  updateUI();

  // If you also use a userRole key for other scripts, keep it up to date
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.type) localStorage.setItem('userRole', user.type);
  } catch (e) { /* ignore */ }
});

// Initialize
document.getElementById('logout-btn').addEventListener('click', logout);
updateUI();
renderProducts();
renderCart();
renderOrders();
