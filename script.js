/* -------- PANEL NAVIGATION -------- */

function showPanel(panelID){
  document.querySelectorAll(".panel").forEach(p => p.classList.add("hidden"));
  document.getElementById(panelID).classList.remove("hidden");

  // hide product detail when leaving products page
  if(panelID !== "products"){
    hideDetail();
  }
}

function hideDetail(){
  document.getElementById("detail-area").style.display = "none";
}

/* -------- PRODUCTS -------- */

const products=[ /* (your same product list) */ ];

// Renders product cards
function renderProducts(){ ... }

// View details
function viewProduct(id){ ... }

/* -------- CART -------- */

function getCart(){ ... }
function saveCart(c){ ... }
function addToCart(id){ ... }
function renderCart(){ ... }
function removeItem(i){ ... }

function goToCheckout(){
  document.getElementById("checkout").classList.remove("hidden");
  renderOrderSummary();
}

function renderOrderSummary(){ ... }
function simulatePayment(){ ... }

/* -------- ADMIN -------- */

function renderOrders(){ ... }

document.addEventListener('submit',e=>{
  if(e.target.id==="admin-add-form"){
    e.preventDefault();
    const f=e.target;
    products.push({
      id:products.length+1,
      name:f.name.value,
      price:Number(f.price.value),
      qty:Number(f.qty.value),
      desc:f.desc.value,
      img:f.img.value
    });
    renderProducts();
    f.reset();
    alert("Product added!");
  }
});

/* INITIAL LOAD */
renderProducts();
renderCart();
renderOrders();
showPanel("home");   // default panel
