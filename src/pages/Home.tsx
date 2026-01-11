import React, { useState, useEffect } from 'react';
import { motion, Variants, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Palette, Sparkles, ShieldCheck, ShoppingBag, Star, Zap } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { useLanguage } from '../contexts/LanguageContext';

// --- مكون العداد الرقمي (آمن وبسيط) ---
const Counter = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  return (
    <motion.span
      onViewportEnter={() => {
        const controls = animate(0, numericValue, {
          duration: 2,
          onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
        });
        return () => controls.stop();
      }}
    >
      {displayValue}{suffix}
    </motion.span>
  );
};

export const Home: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const featuredProducts = products.slice(0, 8);
  const isAr = language === 'ar' || language === 'eg';

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 15 } }
  };

  return (
    <div className="home-root" dir={dir} style={{ background: 'var(--bg-body)', overflowX: 'hidden' }}>
      <style>{`
        .hero-section {
          padding: 140px 7% 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          min-height: 80vh;
        }
        .hero-text { flex: 1.2; }
        .hero-text h1 {
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 20px;
          color: var(--text-main);
        }
        .hero-text h1 span {
          color: var(--primary);
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-img { flex: 0.8; display: flex; justify-content: center; }
        .img-holder {
          width: 100%;
          max-width: 450px;
          aspect-ratio: 1;
          border-radius: 30px;
          overflow: hidden;
          border: 5px solid var(--bg-card);
          box-shadow: var(--shadow-2xl);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          padding: 40px 7%;
        }
        .stat-item {
          background: var(--bg-card);
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          border: 1px solid var(--border);
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
          padding: 60px 7%;
        }
        .feat-card {
          background: var(--bg-card);
          padding: 40px;
          border-radius: 25px;
          text-align: center;
          border: 1px solid var(--border);
          transition: 0.3s;
        }
        .feat-card:hover { transform: translateY(-10px); border-color: var(--primary); }
        .feat-icon {
          width: 60px; height: 60px; background: var(--primary-soft); color: var(--primary);
          border-radius: 15px; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
        }
        @media (max-width: 900px) {
          .hero-section { flex-direction: column; text-align: center; padding-top: 100px; }
          .hero-text h1 { font-size: 3rem; }
        }
      `}</style>

      {/* Hero */}
      <section className="hero-section">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, x: isAr ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '15px' }}>
            <Zap size={18} style={{ display: 'inline', marginBottom: '4px' }} /> NEMORA EXCLUSIVE
          </div>
          <h1>
            {isAr ? 'صمم ' : 'CREATE '} <br/> <span>{t('heroTitle')}</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px', maxWidth: '600px' }}>
            {t('heroSubtitle')}
          </p>
          <Link to="/products" className="btn-primary" style={{
            padding: '18px 35px', borderRadius: '15px', background: 'var(--gradient-primary)',
            color: 'white', fontWeight: 'bold', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px'
          }}>
            {t('shopNow')} <ShoppingBag size={20} />
          </Link>
        </motion.div>

        <motion.div 
          className="hero-img"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="img-holder">
            <img src="/assets/images/Gemini_Generated_Image_j8n8etj8n8etj8n8.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>
      </section>

      {/* Stats - العدادات الشغالة */}
      <section className="stats-grid">
        {[
          { label: isAr ? 'عميل سعيد' : 'Happy Clients', value: '15000+' },
          { label: isAr ? 'تصميم' : 'Designs', value: '450+' },
          { label: isAr ? 'دقة' : 'Accuracy', value: '99%' },
          { label: isAr ? 'توصيل' : 'Delivery', value: '24h' },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)' }}>
              <Counter value={s.value} />
            </div>
            <div style={{ opacity: 0.6, fontSize: '0.9rem', fontWeight: 'bold' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <motion.section 
        className="features-grid"
        variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        {[
          { icon: <Truck />, title: t('freeShipping'), desc: t('freeShippingDesc') },
          { icon: <Palette />, title: t('customDesign'), desc: t('customDesignDesc') },
          { icon: <Sparkles />, title: t('highQuality'), desc: t('highQualityDesc') },
          { icon: <ShieldCheck />, title: t('securePayment'), desc: t('securePaymentDesc') }
        ].map((f, i) => (
          <motion.div key={i} className="feat-card" variants={itemVariants}>
            <div className="feat-icon">{f.icon}</div>
            <h3 style={{ marginBottom: '10px', fontWeight: '900' }}>{f.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{f.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Products */}
      <section style={{ padding: '0 7% 100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900' }}>{t('featuredProducts')}</h2>
          <Link to="/products" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>
            {t('viewAll')} <ArrowRight size={20} />
          </Link>
        </div>
        <motion.div 
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}
          variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          {featuredProducts.map((p) => (
            <motion.div key={p.id} variants={itemVariants}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};