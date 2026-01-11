import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Sparkles, Star, ShoppingBag, X } from 'lucide-react';
import { products, categories } from '../data/products';
import { useLanguage } from '../contexts/LanguageContext';

export const Products = () => {
  const { language, dir } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  
  const selectedCategory = searchParams.get('category') || 'all';
  const isAr = language === 'ar' || language === 'eg';

  // --- منطق الفلترة المطور (إصلاح توافق الـ Types والسيرش) ---
  const displayProducts = useMemo(() => {
    const filtered = products.filter((p) => {
      // 1. فلترة التصنيف
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      
      // 2. فلترة البحث
      const query = searchQuery.toLowerCase().trim();
      if (query === '') return matchesCategory;

      const nameAr = (p.name || '').toLowerCase();
      const nameEn = (p.nameEn || '').toLowerCase();
      // ملاحظة: تم تغيير descriptionAr إلى description بناءً على الـ Interface الخاص بك
      const description = (isAr ? p.description : (p.descriptionEn || p.description)) || '';
      
      const matchesSearch = 
        nameAr.includes(query) || 
        nameEn.includes(query) || 
        description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) return [];

    // تكرار النتائج لملء الصفحة (UX)
    return Array(filtered.length > 0 ? 5 : 0).fill(filtered).flat().map((item, idx) => ({
      ...item,
      uniqueKey: `${item.id}-${idx}-${searchQuery}` 
    }));
  }, [selectedCategory, searchQuery, isAr]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="premium-shop-container" dir={dir}>
      <div className="bg-glow-blob"></div>
      <div className="bg-glow-blob secondary"></div>

      <div className="shop-inner-content">
        <header className="shop-header-section">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="collection-label">
              <Sparkles size={14} className="sparkle-icon" /> 
              {isAr ? 'كولكشن نيمورا 2026' : 'NEMORA 2026 COLLECTION'}
            </div>
            <h1 className="main-shop-title">
              {isAr ? 'المتجر' : 'THE SHOP'}<span>.</span>
            </h1>
          </motion.div>

          <div className="search-wrapper">
            <input 
              type="text" 
              placeholder={isAr ? "ابحث عن موديل، لون، أو نوع..." : "Search by model, color, or type..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="premium-search-input"
            />
            <div className="search-icon-fixed">
              {searchQuery ? (
                <X size={20} onClick={() => setSearchQuery('')} style={{ cursor: 'pointer', color: 'var(--primary-blue)' }} />
              ) : (
                <Search size={20} />
              )}
            </div>
          </div>
        </header>

        <nav className="premium-categories-bar no-scrollbar">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setSearchParams({ category: cat.id })}
              className={`cat-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            >
              {isAr ? cat.name : cat.nameEn}
            </button>
          ))}
        </nav>

        <AnimatePresence mode="popLayout">
          <motion.div 
            key={`${selectedCategory}-${searchQuery}`}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="premium-grid-layout"
          >
            {displayProducts.map((product) => (
              <motion.div 
                key={product.uniqueKey}
                variants={itemVariants}
                layout
                className="luxury-card"
              >
                <div className="card-media">
                  <Link to={`/products/${product.id}`} className="add-to-cart-float">
                    <Plus size={24} />
                  </Link>
                  
                  <Link to={`/products/${product.id}`} className="image-link">
                    <img src={product.image} alt={product.name} loading="lazy" />
                  </Link>

                  <div className="card-badge">
                    {product.price} EGP
                  </div>
                </div>

                <div className="card-content">
                  <div className="card-top-info">
                    <span className="cat-tag">{product.category}</span>
                    <div className="rating">
                      <Star size={10} fill="var(--primary-blue)" stroke="none" />
                      <span>4.9</span>
                    </div>
                  </div>
                  <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className="product-title-text">
                      {isAr ? product.name : (product.nameEn || product.name)}
                    </h3>
                  </Link>
                  <div className="card-footer">
                      <span className="stock-status">{isAr ? 'متوفر' : 'In Stock'}</span>
                      <ShoppingBag size={14} className="bag-icon" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {displayProducts.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="empty-state">
            <div className="no-results-icon">
               <Search size={60} style={{ opacity: 0.2 }} />
            </div>
            <h3>{isAr ? 'لا توجد نتائج مطابقة' : 'No matching results'}</h3>
            <p>{isAr ? 'جرب البحث بكلمات أخرى أو تغيير القسم' : 'Try different keywords or change category'}</p>
            <button onClick={() => {setSearchQuery(''); setSearchParams({category: 'all'})}} className="btn-reset">
              {isAr ? 'إعادة ضبط' : 'Reset Filters'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};