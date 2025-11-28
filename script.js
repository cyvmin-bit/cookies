/* -------------------------------------------------
   PRODUCT DATA
--------------------------------------------------*/
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

/* -------------------------------------------------
   SCROLL
--------------------------------------------------*/
function scrollToSection(id){
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: "smooth" });
}

/* -------------------------------------------------
   PRODUCT RENDERING (Products Page Only)
--------------------------------------------------*/
function renderProducts(){
  const grid = document.getElementById("product-grid");
  if (!grid) return; // Page doesn't have product grid

  grid.innerHTML = products
    .map(
      p => `
        <div class="card fade-in">
          <img class="thumb" src="${p.img}" alt="${p.name}">
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
      `
    )
    .join("");
}

/* -------------------------------------------------
   PRODUCT DETAILS (Products Page Only)
--------------------------------------------------*/
function viewProduct(id){
  const box = document.getElementById("detail-area");
  const area = document.getElementById("product-detail");
  if (!box || !area) return;

  const p = products.find(x => x.id === id);
  box.style.display = "block";

  area.innerHTML = `
    <div class="left fade-in">
      <img src="${p.img}" style="width:100%;border-radius:10px;height:360px;object-fit:cover">
      <h2 style="margin-top:12px">${p.name}</h2>
      <p class="muted" style="margin-top:8px">${p.desc}</p>
    </div>

    <div class="right fade-in">
      <div style="font-size:1.2rem;font-weight:800">RM ${p.price.toFixed(2)}</div>
      <div class="muted">(${p.qty} pcs)</div>

      <div style="margin-top:12px">
        <button class="btn" onclick="addToCart(${p.id})">Add to cart</button>
      </div>
    </div>
  `;
}

/* -------------------------------------------------
   CART STORAGE CONTROL
--------------------------------------------------*/
function getCart(){
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(c){
  localStorage.setItem("cart", JSON.stringify(c));
}

/* -------------------------------------------------
   ADD TO CART
--------------------------------------------------*/
function addToCart(id){
  const product = products.find(p => p.id === id);
  const cart = getCart();
  const existing = cart.find(x => x.id === id);

  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });

  saveCart(cart);
  renderCart();
  showToast("Added to cart");
}

/* -------------------------------------------------
   CART PAGE
--------------------------------------------------*/
function renderCart(){
  const list = document.getElementById("cart-list");
  if (!list) return; // Not on cart page

  const cart = getCart();

  if (cart.length === 0){
    list.innerHTML = `<p class="muted">Your cart is empty</p>`;
    return;
  }

  list.innerHTML = cart
    .map(
      (i, idx) => `
      <div class="cart-item fade-in">
        <img src="${i.img}">
        <div style="flex:1">
          <div style="font-weight:700">${i.name}</div>
          <div class="muted">
            RM ${i.price} • Qty: 
            <input type="number" min="1" value="${i.qty}" data-idx="${idx}" style="width:60px">
          </div>
        </div>

        <div>
          RM ${(i.qty * i.price).toFixed(2)}
          <br>
          <button onclick="removeItem(${idx})">Remove</button>
        </div>
      </div>
    `
    )
    .join("");

  document.querySelectorAll("#cart-list input").forEach(input => {
    input.onchange = e => {
      const cart = getCart();
      cart[e.target.dataset.idx].qty = Number(e.target.value);
      saveCart(cart);
      renderCart();
    };
  });

  renderOrderSummary();
}

/* REMOVE ITEM */
function removeItem(i){
  const cart = getCart();
  cart.splice(i, 1);
  saveCart(cart);
  renderCart();
  showToast("Item removed");
}

/* -------------------------------------------------
   CHECKOUT SUMMARY
--------------------------------------------------*/
function renderOrderSummary(){
  const box = document.getElementById("order-summary");
  if (!box) return;

  const cart = getCart();
  let total = 0;

  box.innerHTML = cart
    .map(i => {
      total += i.qty * i.price;
      return `
        <div style="display:flex;justify-content:space-between">
          <div>${i.name} x${i.qty}</div>
          <div>RM ${(i.qty * i.price).toFixed(2)}</div>
        </div>
      `;
    })
    .join("") +
    `
    <hr>
    <div style="display:flex;justify-content:space-between;font-weight:800">
      <div>Total</div>
      <div>RM ${total.toFixed(2)}</div>
    </div>
    `;
}

/* -------------------------------------------------
   CHECKOUT PROCESS
--------------------------------------------------*/
function simulatePayment(){
  const form = document.getElementById("checkout-form");
  if (!form) return;

  if (!form.checkValidity()){
    alert("Fill all fields");
    return;
  }

  const cart = getCart();
  if (!cart.length){
    alert("Cart empty");
    return;
  }

  const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
  const id = Date.now();

  allOrders.push({
    id,
    items: cart,
    name: form.name.value,
    phone: form.phone.value,
    address: form.address.value,
  });

  localStorage.setItem("orders", JSON.stringify(allOrders));
  localStorage.removeItem("cart");

  renderCart();
  renderOrderSummary();
  showToast("Order placed successfully!");
}

/* -------------------------------------------------
   ADMIN PAGE
--------------------------------------------------*/
function renderOrders(){
  const box = document.getElementById("orders-list");
  if (!box) return;

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  if (!orders.length){
    box.innerHTML = "No orders yet";
    return;
  }

  box.innerHTML = orders
    .map(
      o => `
      <div style="padding:8px;background:#faf6f3;border-radius:8px;margin-bottom:8px">
        <div style="font-weight:700">Order ${o.id}</div>
        <div>Name: ${o.name}</div>
        <div>Items: ${o.items.map(i => i.name + " x" + i.qty).join(", ")}</div>
      </div>
    `
    )
    .join("");
}

/* ADMIN - Add Product */
document.addEventListener("submit", e => {
  if (e.target.id === "admin-add-form"){
    e.preventDefault();

    const f = e.target;

    const newProduct = {
      id: products.length + 1,
      name: f.name.value,
      price: Number(f.price.value),
      qty: Number(f.qty.value),
      desc: f.desc.value,
      img: f.img.value || "default.jpg"
    };

    products.push(newProduct);
    renderProducts();
    f.reset();
    showToast("Product added!");
  }
});

/* -------------------------------------------------
   TOAST SYSTEM
--------------------------------------------------*/
function showToast(msg){
  let t = document.createElement("div");
  t.className = "toast show";
  t.innerText = msg;
  document.body.appendChild(t);

  setTimeout(() => {
    t.style.opacity = "0";
    setTimeout(() => t.remove(), 300);
  }, 1800);
}

/* -------------------------------------------------
   AUTO INITIALIZE BASED ON PAGE
--------------------------------------------------*/
window.onload = () => {
  renderProducts();
  renderCart();
  renderOrders();
};
