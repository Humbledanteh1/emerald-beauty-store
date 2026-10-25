"use client";

import { useMemo, useState } from "react";
import { Heart, Search, ShoppingBag, Menu, X, ArrowRight, Leaf, Star } from "lucide-react";

type Product = { id: number; name: string; brand: string; price: number; category: string; image: string; tag: string };
const products: Product[] = [
  { id: 1, name: "Dew Drops Hydrating Serum", brand: "ÉCLAT BOTANICALS", price: 38, category: "Skincare", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85", tag: "BESTSELLER" },
  { id: 2, name: "Cloud Nine Moisturizer", brand: "SOFT THEORY", price: 32, category: "Skincare", image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85", tag: "LOVED" },
  { id: 3, name: "Nourish Hair Elixir", brand: "ROOT & RITUAL", price: 26, category: "Haircare", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85", tag: "CLEAN BEAUTY" },
  { id: 4, name: "Sculpt & Glow Tint", brand: "FORME STUDIO", price: 29, category: "Makeup", image: "https://images.unsplash.com/photo-1631214540242-9a5e3e2e4c5f?auto=format&fit=crop&w=900&q=85", tag: "NEW" },
  { id: 5, name: "Rosewater Reset Mist", brand: "ÉCLAT BOTANICALS", price: 21, category: "Skincare", image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85", tag: "DAILY RITUAL" },
  { id: 6, name: "Silk Finish Lip Oil", brand: "FORME STUDIO", price: 18, category: "Makeup", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85", tag: "STAFF PICK" },
  { id: 7, name: "Body Polish Ritual", brand: "ROOT & RITUAL", price: 24, category: "Bodycare", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85", tag: "SPA AT HOME" },
  { id: 8, name: "Overnight Repair Cream", brand: "SOFT THEORY", price: 44, category: "Skincare", image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=900&q=85", tag: "NIGHT CARE" },
];
const categories = ["All", "Skincare", "Makeup", "Haircare", "Bodycare"];
const money = (amount: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);

export default function Home() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const filtered = useMemo(() => products.filter((p) => (filter === "All" || p.category === filter) && (p.name + p.brand + p.category).toLowerCase().includes(search.toLowerCase())), [filter, search]);
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const total = products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0);
  const add = (id: number) => setCart((previous) => ({ ...previous, [id]: (previous[id] || 0) + 1 }));
  const toggleFavorite = (id: number) => setFavorites((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]);

  return (
    <main className="storefront-root">
      <div className="announcement">A little something extra — complimentary shipping on orders over $75</div>
      <header className="header">
        <div className="container header-inner">
          <button className="icon-button mobile-menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          <a className="logo" href="#">emerald<span>.</span></a>
          <nav className={menuOpen ? "nav nav-open" : "nav"}><a href="#shop">Shop all</a><a href="#categories">Categories</a><a href="#story">Our philosophy</a></nav>
          <div className="header-actions">
            <button className="icon-button" aria-label="Search products" onClick={() => setSearchOpen(!searchOpen)}><Search size={19} /></button>
            <button className="icon-button" aria-label="Favorites" onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}><Heart size={19} /></button>
            <button className="icon-button bag-button" aria-label="Shopping bag" onClick={() => setCartOpen(!cartOpen)}><ShoppingBag size={19} /><span>{count}</span></button>
          </div>
        </div>
        {searchOpen && <div className="container search-row"><input aria-label="Search products" placeholder="Search your next favorite..." value={search} onChange={(event) => setSearch(event.target.value)} /></div>}
      </header>
      <section className="hero">
        <div className="hero-canvas-fallback" aria-hidden="true" />
        <div className="flower-world" aria-hidden="true">
          <div className="flower-orb"><i /><i /><i /><i /><i /><i /><i /><i /><b /></div>
          <div className="flower-stem" /><div className="flower-leaf leaf-one" /><div className="flower-leaf leaf-two" />
          <span className="flower-caption">BOTANICAL / IN MOTION</span>
        </div>
        <div className="container hero-content">
          <div className="liquid-bubble" onPointerMove={(event) => {
            if (event.pointerType === "touch") return;
            const box = event.currentTarget.getBoundingClientRect();
            const dx = event.clientX - (box.left + box.width / 2);
            const dy = event.clientY - (box.top + box.height / 2);
            if (Math.hypot(dx, dy) < 230) {
              event.currentTarget.style.setProperty("--bubble-x", `${-dx / 18}px`);
              event.currentTarget.style.setProperty("--bubble-y", `${-dy / 18}px`);
            }
          }} onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--bubble-x", "0px");
            event.currentTarget.style.setProperty("--bubble-y", "0px");
          }}>
            <p className="eyebrow"><Leaf size={15} /> BOTANICAL BEAUTY, THOUGHTFULLY CHOSEN</p>
            <h1>Your glow.<br /><em>Your rules.</em></h1>
            <p className="hero-copy">A living edit of skincare, color and self-care. Less noise. Better rituals. Beauty with a pulse.</p>
            <a className="button button-dark" href="#shop">Enter the ritual <ArrowRight size={17} /></a>
            <div className="hero-note"><span>✳</span> GOOD-FOR-YOU BEAUTY, EVERY DAY</div>
          </div>
        </div>
      </section>
      <section className="container category-section" id="categories">
        <div className="section-heading"><div><p className="eyebrow">FIND YOUR FEEL-GOOD</p><h2>A little ritual for <em>every you.</em></h2></div></div>
        <div className="category-pills">{categories.map((category) => <button key={category} className={filter === category ? "category-pill active" : "category-pill"} onClick={() => { setFilter(category); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>{category}</button>)}</div>
      </section>
      <section className="container products-section" id="shop">
        <div className="section-heading"><div><p className="eyebrow">THE GOOD STUFF</p><h2>Meet your new <em>favorites.</em></h2></div><span className="product-count">{filtered.length} products</span></div>
        <div className="product-grid">
          {filtered.map((product) => <article className="product-card" key={product.id}>
            <div className="product-image-wrap"><img className="product-image" src={product.image} alt={product.name} /><span className="product-tag">{product.tag}</span><button className={favorites.includes(product.id) ? "favorite-button favorited" : "favorite-button"} aria-label="Toggle favorite" onClick={() => toggleFavorite(product.id)}><Heart size={18} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button><button className="quick-add" onClick={() => add(product.id)}>Add to bag <span>+</span></button></div>
            <div className="product-info"><p className="product-brand">{product.brand}</p><h3>{product.name}</h3><div className="product-bottom"><span>{money(product.price)}</span><span className="rating"><Star size={13} fill="currentColor" /> 4.9</span></div></div>
          </article>)}
        </div>
        {filtered.length === 0 && <p className="empty-state">No products found. Try another search.</p>}
      </section>
      <section className="story-section" id="story"><div className="container story-inner"><p className="eyebrow"><Leaf size={15} /> A SOFTER KIND OF BEAUTY</p><h2>Good ingredients.<br /><em>Good intentions.</em></h2><p>Beauty should feel like care, not a chore. We bring together thoughtful essentials for the little rituals that make you feel more like yourself.</p><a href="#shop" className="text-link">Find your ritual <ArrowRight size={16} /></a></div></section>
      <footer className="footer"><div className="container footer-inner"><a className="logo" href="#">emerald<span>.</span></a><p>Thoughtful beauty for everyday rituals.</p><span>© {new Date().getFullYear()} Emerald Beauty. Prices in USD.</span></div></footer>
      {cartOpen && <div className="cart-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="cart-header"><h2>Your bag ({count})</h2><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><X size={20} /></button></div>{count === 0 ? <p className="empty-state">Your bag is waiting for something lovely.</p> : <><div className="cart-items">{products.filter((p) => cart[p.id]).map((p) => <div className="cart-item" key={p.id}><img src={p.image} alt="" /><div><strong>{p.name}</strong><p>{money(p.price)} × {cart[p.id]}</p><button onClick={() => setCart((previous) => ({ ...previous, [p.id]: Math.max(0, (previous[p.id] || 0) - 1) }))}>Remove one</button></div></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>{money(total)}</strong></div><p className="checkout-note">Checkout will be enabled when payment setup is added.</p></>}</aside></div>}
    </main>
  );
}
