import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, ChevronLeft, Star, Heart, AlertCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { products } from '../data/products';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { language, dir } = useLanguage();
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [showError, setShowError] = useState(false);

  const product = products.find((p) => p.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!product) return null;
  const isAr = language === 'ar' || language === 'eg';

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowError(true);
      // اهتزاز خفيف للتنبيه
      window.navigator.vibrate?.(100);
      return;
    }
    addToCart(product, selectedSize, '');
    setShowError(false);
  };

  return (
    <div className="premium-shop-container" dir={dir}>
      <div className="bg-glow-blob"></div>
      
      <div className="detail-inner-content">
        <button onClick={() => navigate(-1)} className="mobile-back-btn">
          <ChevronLeft size={24} />
        </button>

        <div className="product-detail-grid">
          
          {/* الصورة - تم تحسينها للموبايل */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="detail-image-section"
          >
            <div className="luxury-image-wrapper">
              <img src={product.image} alt={product.nameEn} />
              <div className="image-overlay-gradient"></div>
            </div>
          </motion.div>

          {/* معلومات المنتج */}
          <div className="detail-info-section">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="collection-label">
                <Star size={12} fill="var(--primary-blue)" color="none" /> 
                {isAr ? 'إصدار محدود' : 'LIMITED EDITION'}
              </div>
              <h1 className="detail-title">{isAr ? product.name : product.nameEn}</h1>
              <div className="detail-price-tag">{product.price} <small>EGP</small></div>
            </motion.div>

            <p className="detail-description">
              {isAr ? product.description : product.descriptionEn}
            </p>

            {/* قسم اختيار المقاس - مع التنبيه */}
            <div className={`selection-group ${showError && !selectedSize ? 'error-pulse' : ''}`}>
              <div className="label-row">
                <label className="group-label">{isAr ? 'المقاس المتاح' : 'Available Size'}</label>
                <AnimatePresence>
                  {showError && !selectedSize && (
                    <motion.span 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="error-text"
                    >
                      <AlertCircle size={14} /> {isAr ? 'برجاء اختيار المقاس أولاً' : 'Please select a size'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="size-grid">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setShowError(false);
                    }}
                    className={`size-option ${selectedSize === size ? 'active' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* أزرار التحكم - Sticky في الموبايل */}
            <div className="mobile-fixed-actions">
              <div className="action-container-inner">
                <div className="detail-quantity-stepper">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={18}/></button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}><Plus size={18}/></button>
                </div>

                <button 
                  className={`detail-add-btn ${!selectedSize ? 'needs-size' : ''}`}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} />
                  <span>{isAr ? 'إضافة للطلب' : 'Add to Order'}</span>
                </button>
              </div>
            </div>

            <div className="trust-badges mobile-hide">
              <div className="badge-item">✨ {isAr ? 'خامات ممتازة' : 'Premium Materials'}</div>
              <div className="badge-item">🔄 {isAr ? 'تبديل سهل' : 'Easy Exchange'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};