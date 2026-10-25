"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownRight, ArrowRight, Check, ChevronDown, Heart, Menu, Search, ShoppingBag, Sparkles, Truck, Leaf, ShieldCheck, X } from "lucide-react";

type Product = { id: number; name: string; brand: string; price: number; category: string; tag: string; rating: string; image: string; description: string };
const products: Product[] = [
  { id: 1, name: "Dew Drops Hydrating Serum", brand: "ÉCLAT BOTANICALS", price: 38, category: "Skincare", tag: "BESTSELLER", rating: "4.9", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85", description: "A lightweight daily serum for a dewy, comfortable glow." },
  { id: 2, name: "Cloud Nine Moisturizer", brand: "SOFT THEORY", price: 32, category: "Skincare", tag: "LOVED", rating: "4.8", image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85", description: "A cushion-soft moisturizer to help replenish your skin barrier." },
  { id: 3, name: "Nourish Hair Elixir", brand: "ROOT & RITUAL", price: 26, category: "Haircare", tag: "CLEAN BEAUTY", rating: "4.9", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85", description: "A silky botanical blend for soft, glossy-looking lengths." },
  { id: 4, name: "Sculpt & Glow Tint", brand: "FORME STUDIO", price: 29, category: "Makeup", tag: "NEW", rating: "4.7", image: "https://images.unsplash.com/photo-1631214540242-9a5e3e2e4c5f?auto=format&fit=crop&w=900&q=85", description: "A breathable skin tint with a naturally radiant finish." },
  { id: 5, name: "Rosewater Reset Mist", brand: "ÉCLAT BOTANICALS", price: 21, category: "Skincare", tag: "DAILY RITUAL", rating: "4.8", image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85", description: "A refreshing facial mist for a little midday reset." },
  { id: 6, name: "Silk Finish Lip Oil", brand: "FORME STUDIO", price: 18, category: "Makeup", tag: "STAFF PICK", rating: "4.9", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85", description: "A glossy, conditioning lip oil with a soft wash of color." },
  { id: 7, name: "Body Polish Ritual", brand: "ROOT & RITUAL", price: 24, category: "Bodycare", tag: "SPA AT HOME", rating: "4.8", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85", description: "A gentle body polish to leave skin feeling smooth and renewed." },
  { id: 8, name: "Overnight Repair Cream", brand: "SOFT THEORY", price: 44, category: "Skincare", tag: "NIGHT CARE", rating: "4.9", image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=900&q=85", description: "A rich night cream made for your slow-down evening ritual." },
];
const categories = [
  { name: "Skincare", count: "18 products", label: "SKIN, BUT SOFTER" },
  { name: "Makeup", count: "24 products", label: "YOUR KIND OF GLOW" },
  { name: "Haircare", count: "12 products", label: "GOOD HAIR DAYS" },
  { name: "Bodycare", count: "16 products", label: "SLOW DOWN & SOAK" },
];

function EmeraldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let raf = 0;
    let width = 0, height = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth; height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr)); canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      frame += reduce ? 0 : 0.0026;
      ctx.clearRect(0, 0, width, height);
      const base = ctx.createLinearGradient(0, 0, width, height);
      base.addColorStop(0, "#F0FBEF"); base.addColorStop(.35, "#8FE3B0"); base.addColorStop(.68, "#22C79A"); base.addColorStop(1, "#0B5F51");
      ctx.fillStyle = base; ctx.fillRect(0, 0, width, height);
      const blobs = [
        { x: .18 + Math.sin(frame * 1.3) * .12, y: .12 + Math.cos(frame) * .10, r: .48, c: "rgba(240,251,239,.9)" },
        { x: .57 + Math.cos(frame * .9) * .13, y: .42 + Math.sin(frame * 1.2) * .15, r: .56, c: "rgba(143,227,176,.75)" },
        { x: .91 + Math.sin(frame) * .09, y: .78 + Math.cos(frame * .8) * .12, r: .62, c: "rgba(11,95,81,.78)" },
        { x: .43 + Math.sin(frame * .7) * .11, y: .91 + Math.cos(frame * 1.4) * .08, r: .40, c: "rgba(34,199,154,.55)" },
      ];
      for (const b of blobs) {
        const g = ctx.createRadialGradient(b.x * width, b.y * height, 0, b.x * width, b.y * height, Math.max(width, height) * b.r);
        g.addColorStop(0, b.c); g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, width, height);
      }
      if (!reduce) {
        const grain = ctx.createImageData(Math.max(1, Math.floor(width / 5)), Math.max(1, Math.floor(height / 5)));
        for (let i = 0; i < grain.data.length; i += 4) {
          const n = Math.random() * 255; grain.data[i] = n; grain.data[i + 1] = n; grain.data[i + 2] = n; grain.data[i + 3] = 8;
        }
        const noise = document.createElement("canvas"); noise.width = grain.width; noise.height = grain.height;
        const nc = noise.getContext("2d"); if (nc) { nc.putImageData(grain, 0, 0); ctx.globalAlpha = .18; ctx.drawImage(noise, 0, 0, width, height); ctx.globalAlpha = 1; }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}

export default function Home() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const filtered = useMemo(() => products.filter(p => (filter === "All" || p.category === filter) && (p.name + p.brand + p.category).toLowerCase().includes(search.toLowerCase())), [filter, search]);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0);
  const add = (id: number) => { setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 })); setToast("Added to your bag"); window.setTimeout(() => setToast(""), 2200); };
  const money = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
  const scrollToProducts = (category?: string) => { if (category) setFilter(category); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  return <>
    <div className="announcement">A little something extra — complimentary shipping on orders over $75</div>
    <header className="header">
      <div className="container header-inner">
        <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
        <a className="logo" href="#" aria-label="Emerald home">emerald<span>.</span></a>
        <nav className="nav"><a href="#shop">Shop all</a><a href="#categories">Categories</a><a href="#story">Our philosophy</a><a href="#newsletter">The glow letter</a></nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Search products" onClick={() => setSearchOpen(!searchOpen)}><Search size={19}/></button>
          <button className="icon-button" aria-label="View favorites" onClick={() => { setToast(favorites.length ? `You saved ${favorites.length} favorite item(s)` : "Tap a heart to save your favorites"); window.setTimeout(() => setToast(""), 2200); }}><Heart size={19}/></button>
          <button className="icon-button" aria-label="Open shopping bag" onClick={() => setCartOpen(true)}><ShoppingBag size={20}/>{count > 0 && <span className="cart-count">{count}</span>}</button>
        </div>
      </div>
      {menuOpen && <div className="container" style={{paddingBottom:18,display:"grid",gap:15,fontSize:13}}><a href="#shop" onClick={()=>setMenuOpen(false)}>Shop all</a><a href="#categories" onClick={()=>setMenuOpen(false)}>Categories</a><a href="#story" onClick={()=>setMenuOpen(false)}>Our philosophy</a><a href="#newsletter" onClick={()=>setMenuOpen(false)}>The glow letter</a></div>}
      {searchOpen && <div className="container" style={{padding:"0 0 18px"}}><div style={{display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid #c9d9ce",padding:"10px 0"}}><Search size={17}/><input autoFocus value={search} onChange={e=>{setSearch(e.target.value);document.getElementById("shop")?.scrollIntoView({behavior:"smooth"});}} placeholder="Search skincare, serums, moisturizers…" style={{flex:1,border:0,outline:0,background:"transparent",fontSize:13}}/><button className="icon-button" onClick={()=>{setSearchOpen(false);setSearch("");}}><X size={17}/></button></div></div>}
    </header>
    <main>
      <section className="hero"><EmeraldCanvas/><div className="container hero-inner">
        <div className="hero-copy"><div className="eyebrow">Your feel-good beauty edit</div><h1>Good skin.<br/>Good mood.<br/><em>Great energy.</em></h1><p>Thoughtfully picked beauty essentials for the skin you’re in, the rituals you love, and the glow that’s all yours.</p><div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap",marginTop:26}}><button className="button-primary" onClick={()=>scrollToProducts()}>Shop the collection <ArrowRight size={15}/></button><span style={{fontSize:10,color:"#315e4d"}}>Feel good in your skin.</span></div></div>
        <div className="hero-visual"><div className="hero-orbit"><div className="hero-product"/></div><div className="floating-note">YOUR NEW DAILY RITUAL<strong>Glow, naturally.</strong></div></div>
      </div></section>
      <div className="container trust-row"><div className="trust-item"><Leaf size={20}/><span>Thoughtfully selected</span></div><div className="trust-item"><Sparkles size={20}/><span>Feel-good formulas</span></div><div className="trust-item"><Truck size={20}/><span>Free shipping over $75</span></div><div className="trust-item"><ShieldCheck size={20}/><span>Secure checkout experience</span></div></div>
      <section className="section" id="categories"><div className="container"><div className="section-heading"><div><div className="eyebrow" style={{color:"#159c78"}}>Find your ritual</div><h2>A little category therapy.</h2></div><p>Whatever your routine looks like, there’s a little something here to make it feel like you.</p></div>
        <div className="category-grid">{categories.map((c)=><button key={c.name} className="category-card" onClick={()=>scrollToProducts(c.name)}><div className="eyebrow">{c.label}</div><h3>{c.name}</h3><span>{c.count} <ArrowDownRight size={13} style={{verticalAlign:"middle"}}/></span><span className="category-art" aria-hidden="true"/></button>)}</div>
      </div></section>
      <section className="section" id="shop" style={{paddingTop:20}}><div className="container"><div className="section-heading"><div><div className="eyebrow" style={{color:"#159c78"}}>The good stuff</div><h2>Meet your new favorites.</h2></div><p>Everyday essentials, little luxuries, and feel-good finds worth making room for.</p></div>
        <div className="product-toolbar">{["All","Skincare","Makeup","Haircare","Bodycare"].map(f=><button key={f} onClick={()=>setFilter(f)} className={`filter-chip ${filter===f?"active":""}`}>{f}</button>)}<span style={{marginLeft:"auto",fontSize:11,color:"#7a8b80",alignSelf:"center"}}>{filtered.length} products</span></div>
        {filtered.length ? <div className="product-grid">{filtered.map(p=><article className="product-card" key={p.id}><div className="product-image"><span className="badge">{p.tag}</span><img src={p.image} alt={p.name} loading="lazy"/><button className="icon-button" aria-label={favorites.includes(p.id)?"Remove from favorites":"Add to favorites"} onClick={()=>setFavorites(prev=>prev.includes(p.id)?prev.filter(x=>x!==p.id):[...prev,p.id])} style={{position:"absolute",right:9,top:8,background:"#fffdf5e8",borderRadius:"50%"}}><Heart size={16} fill={favorites.includes(p.id)?"#0b5f51":"none"}/></button><button className="quick-add" onClick={()=>add(p.id)}>Quick add to bag +</button></div><div className="product-meta"><div><h3 className="product-name">{p.name}</h3><div className="product-brand">{p.brand}</div><div className="stars">★★★★★ <span style={{color:"#829187"}}>({p.rating})</span></div></div><div className="product-price">{money(p.price)}</div></div><p style={{fontSize:11,color:"#7a8b80",lineHeight:1.6,margin:"8px 0 0"}}>{p.description}</p></article>)}</div> : <div style={{padding:"50px 0",textAlign:"center",color:"#74847c"}}>No products found. Try another search.</div>}
        <div style={{textAlign:"center",marginTop:36}}><button className="button-outline" onClick={()=>{setFilter("All");setSearch("");}}>Explore all beauty <ArrowRight size={14} style={{verticalAlign:"middle",marginLeft:12}}/></button></div>
      </div></section>
      <section className="story" id="story"><div className="container story-inner"><div className="story-art" role="img" aria-label="Botanical-inspired skincare still life"/><div className="story-copy"><div className="eyebrow" style={{color:"#159c78"}}>Beauty, with a little more heart</div><h2>Less pressure.<br/>More feel-good.</h2><p>We believe beauty should feel like a ritual, not a rulebook. That’s why we bring together thoughtful finds that fit real routines, real skin, and all the beautifully different ways of being you.</p><button className="button-primary" onClick={()=>scrollToProducts()}>Find your feel-good <ArrowRight size={15}/></button></div></div></section>
      <section className="section"><div className="container" style={{textAlign:"center",maxWidth:700}}><div className="eyebrow" style={{color:"#159c78"}}>Little rituals, big love</div><h2 style={{font:"500 clamp(32px,4vw,44px)/1.1 Georgia,serif",letterSpacing:"-.045em",margin:"13px 0 12px"}}>Your routine, your rules.</h2><p style={{color:"#74847c",fontSize:13,lineHeight:1.9}}>Start with what feels good. Keep what works. Let your beauty routine be a moment that belongs to you.</p><div style={{display:"flex",justifyContent:"center",gap:30,flexWrap:"wrap",marginTop:30}}><span style={{fontSize:11}}><Check size={14} style={{verticalAlign:"middle",color:"#159c78",marginRight:6}}/>Curated essentials</span><span style={{fontSize:11}}><Check size={14} style={{verticalAlign:"middle",color:"#159c78",marginRight:6}}/>Everyday-friendly finds</span><span style={{fontSize:11}}><Check size={14} style={{verticalAlign:"middle",color:"#159c78",marginRight:6}}/>A glow that feels like you</span></div></div></section>
      <section className="newsletter" id="newsletter"><div className="container newsletter-inner"><div><div className="eyebrow" style={{color:"#b6ebce"}}>A good thing in your inbox</div><h2>The glow letter.</h2><p>Fresh finds, little rituals, and 10% off your first order.</p></div><form className="newsletter-form" onSubmit={e=>{e.preventDefault();if(email.includes("@"))setSubscribed(true);}}><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email address"/><button type="submit">{subscribed?"YOU’RE IN ✓":"COUNT ME IN →"}</button></form></div></section>
    </main>
    <footer className="footer"><div className="container"><div className="footer-top"><div><a className="logo" href="#">emerald<span>.</span></a><p>Beauty essentials for the skin you’re in and the glow that’s all yours.</p></div><div className="footer-links"><div><h4>Explore</h4><a href="#shop">Shop all</a><a href="#categories">Categories</a><a href="#story">Our philosophy</a></div><div><h4>Need a hand?</h4><a href="mailto:hello@emeraldbeauty.example">Contact us</a><a href="#newsletter">Get updates</a><a href="#shop">Shipping info</a></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Emerald Beauty. Made for your feel-good.</span><span>Prices shown in USD ($) · Privacy · Terms</span></div></div></footer>
    {cartOpen && <div role="dialog" aria-modal="true" aria-label="Shopping bag" style={{position:"fixed",inset:0,zIndex:60,background:"#102e2466",display:"flex",justifyContent:"flex-end"}} onClick={()=>setCartOpen(false)}><aside onClick={e=>e.stopPropagation()} style={{width:"min(420px,100%)",height:"100%",background:"#fbfcf8",padding:24,display:"flex",flexDirection:"column",boxShadow:"-20px 0 50px #102e2420"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #e7eee9",paddingBottom:20}}><div><div className="eyebrow" style={{color:"#159c78"}}>Your feel-good finds</div><h2 style={{font:"30px Georgia,serif",margin:"8px 0 0"}}>Your bag ({count})</h2></div><button className="icon-button" onClick={()=>setCartOpen(false)} aria-label="Close bag"><X/></button></div><div style={{overflowY:"auto",flex:1}}>{count===0?<div style={{textAlign:"center",padding:"70px 10px",color:"#74847c"}}><ShoppingBag size={32} style={{margin:"0 auto 18px"}}/><p>Your bag is waiting for something lovely.</p><button className="button-primary" onClick={()=>setCartOpen(false)}>Keep exploring</button></div>:products.filter(p=>cart[p.id]).map(p=><div key={p.id} style={{display:"flex",gap:14,padding:"18px 0",borderBottom:"1px solid #e7eee9"}}><img src={p.image} alt="" style={{width:82,height:92,objectFit:"cover",background:"#eff2eb"}}/><div style={{flex:1}}><div style={{font:"16px Georgia,serif"}}>{p.name}</div><div style={{fontSize:10,color:"#74847c",marginTop:5}}>{p.brand}</div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:14}}><div style={{fontSize:12,fontWeight:700}}>{money(p.price * cart[p.id])}</div><div style={{display:"flex",alignItems:"center",gap:10}}><button className="button-outline" style={{padding:"4px 9px"}} onClick={()=>setCart(prev=>({...prev,[p.id]:Math.max(0,(prev[p.id]||0)-1)}))}>−</button><span style={{fontSize:12}}>{cart[p.id]}</span><button className="button-outline" style={{padding:"4px 9px"}} onClick={()=>add(p.id)}>+</button></div></div></div></div>)}</div>{count>0&&<div style={{borderTop:"1px solid #dfe8e1",paddingTop:20}}><div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:8}}><span>Subtotal</span><strong>{money(total)}</strong></div><p style={{fontSize:10,color:"#74847c"}}>{total>=75?"You unlocked complimentary shipping.":"You’re "+money(75-total)+" away from complimentary shipping."}</p><button className="button-primary" style={{width:"100%",justifyContent:"center",marginTop:10}} onClick={()=>{setToast("Checkout setup coming next — connect your payment provider to accept orders.");window.setTimeout(()=>setToast(""),3500);}}>Continue to checkout <ArrowRight size={15}/></button><p style={{fontSize:10,color:"#74847c",textAlign:"center"}}>Secure checkout · Prices in USD</p></div>}</aside></div>}
    {toast && <div className="toast" role="status">{toast}</div>}
  </>;
}
