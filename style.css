*{box-sizing:border-box;margin:0;padding:0;font-family:Inter,Arial,Helvetica,sans-serif}
body{
    background:#f3f2f0;color:#222}

.container{
    max-width:1100px;margin:0 auto;padding:20px}

header{
    display:flex;align-items:center;justify-content:space-between;padding:12px 0}

.logo{
    font-weight:800;font-size:1.4rem;color:#382e2a;text-decoration:none}

nav a{
    margin-left:12px;text-decoration:none;color:#4b463f;padding:8px 10px;border-radius:8px}

nav a:hover{
    background:#efeae7}
    
.hero{
    background:white;border-radius:12px;padding:20px;display:flex;gap:20px;align-items:center;margin-bottom:18px}

.hero .left{
    flex: 1 1 60%;   /* left now gets ~60% */
}

.hero h1{
    font-size:1.6rem;color:#2e2119}

.hero p{
    margin-top:8px;color:#5a5049}

.cta{
    margin-top:12px}

.btn{
    background:#a65b2a;color:white;padding:10px 14px;border-radius:10px;border:none;cursor:pointer}

.grid{
    display:grid;grid-template-columns:repeat(4,1fr);gap:16px}

.card{
    background:white;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.06)}

.thumb{
    width:100%;height:180px;object-fit:cover}

.card-body{
    padding:12px}

.card-title{
    font-weight:700;color:#2e2119}

.price{
    color:#b35b2b;font-weight:700;margin-top:6px}

.meta{
    font-size:0.9rem;color:#6b5f59;margin-top:6px}

.detail{
    display:flex;gap:20px;margin-top:20px}

.detail .left{
    flex:1}

.detail .right{
    width:320px;background:white;padding:16px;border-radius:12px}

.cart-item{
    display:flex;gap:12px;align-items:center;padding:10px;background:#fff;border-radius:10px;margin-bottom:10px}

.cart-item img{
    width:80px;height:60px;object-fit:cover;border-radius:8px}

.admin-wrap{
    display:flex;gap:20px}

.admin-side{
    width:220px;background:white;padding:12px;border-radius:10px}

.admin-main{
    flex:1}

input,textarea,select{
    width:100%;padding:10px;border-radius:8px;border:1px solid #ded6cf;margin-top:8px;
    margin-bottom:12px; /* add extra space below inputs so next label sits lower */
}

label{
    font-weight:600;color:#3f342f}

footer{
    margin-top:28px;padding:20px;text-align:center;color:#6b605a}

@media(max-width:900px){
    .grid{grid-template-columns:repeat(2,1fr)}.detail{flex-direction:column}.hero{flex-direction:column}
    .hero .left,.hero .right{flex:1 1 100%}
}

@media(max-width:480px){
.grid{
    grid-template-columns:repeat(1,1fr)}nav{display:none}}

.muted{
    color:#7a6f68;font-size:0.95rem}

.pill{
    background:#fff;padding:6px 8px;border-radius:999px;border:1px solid #efe6e1}
    
.pill.active{
    background:#a65b2a;color:white} /* Added this line for active pill state */

nav a.admin { /* mark the admin nav item */
  /* no changes needed, visible by default */
}

/* if body has 'customer' class hide it */
body.customer nav a.admin,
body.customer nav a#admin,
body.customer nav a[href="/admin"],
body.customer nav a[href*="admin"] {
  display: none !important;
}

.hero .right{
    /* make right panel a square based on width */
    flex: 0 0 30%;         /* change to your preferred width % */
    min-width: 180px;
    max-width: 360px;      /* limit absolute size so it doesn't grow too big */
    aspect-ratio: 1 / 1;   /* enforce square shape */
    overflow: hidden;      /* crop overflow so cover works */
    display:flex;
    align-items:center;
    justify-content:center;
    padding:10px;
    background:transparent;
    border-radius:12px;
}

.hero .right img{
    width:100%;
    height:100%;
    object-fit:cover;          /* cover will crop and fill the square */
    object-position:center 65%;/* shift crop focus downward to hide sky */
    display:block;
    border-radius:12px;
}
/* responsive: keep the square but full width on small screens */
@media (max-width:900px) {
  .hero{ flex-direction:column; gap:14px; }
  .hero .left, .hero .right{ flex: 1 1 100%; }
  .hero .right{ max-width:none; min-width:0; width:100%; aspect-ratio: 1 / 1; }
  .hero .right img{ object-position:center 55%; }
}

/* tweak at large widths */
@media (min-width:1100px){
  .hero .left { flex: 1 1 70%; } /* left side gets ~70% */
  .hero .right { flex: 0 0 30%; }
}

/* keep stacking for small screens */
@media(max-width:900px){
    .hero{flex-direction:column}
    .hero .left,.hero .right{flex:1 1 100%}
}
