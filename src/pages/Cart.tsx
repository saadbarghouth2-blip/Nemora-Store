import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

export const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { language, t, dir } = useLanguage();
  
  const total = getTotalPrice();
  const shipping = total > 1000 ? 0 : 50; 
  const isAr = language === 'ar' || language === 'eg';

  const handleClearCart = () => {
    if (window.confirm(isAr ? 'هل أنت متأكد من مسح السلة؟' : 'Are you sure you want to clear the cart?')) {
      clearCart();
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="empty-cart-container" dir={dir}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="empty-content">
          <div className="empty-icon-wrapper">
             <ShoppingBag size={60} strokeWidth={1} />
             <div className="icon-glow" />
          </div>
          <h2 className="empty-title">{isAr ? 'حقيبة التسوق فارغة' : 'YOUR BAG IS EMPTY'}</h2>
          <button onClick={() => navigate('/products')} className="shop-now-btn">
            {t('browseProductsCart')}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper" dir={dir}>
      <div className="cart-container">
        <header className="cart-page-header">
          <div className="header-info">
            <span className="overline"><Zap size={14} fill="currentColor" /> {isAr ? 'مراجعة المنتجات' : 'REVIEW ITEMS'}</span>
            <h1 className="cart-title">{t('shoppingCart')}</h1>
          </div>
          {/* تأكد أن اسم الدالة clearCart مطابق لما في الـ Context */}
          <button onClick={handleClearCart} className="clear-all-btn">
            <Trash2 size={16} /> {t('clearCart')}
          </button>
        </header>

        <div className="cart-main-grid">
          <div className="cart-items-column">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => {
                const name = isAr ? item.name : (item.nameEn || item.name);
                // التعديل الجوهري: نستخدم cartItemId حصراً للعمليات
                const uId = item.cartItemId; 

                return (
                  <motion.div 
                    layout
                    key={uId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="cart-item-luxury"
                  >
                    <div className="item-img-container">
                      <img src={item.image} alt={name} />
                    </div>

                    <div className="item-details-flex">
                      <div className="item-info-top">
                        <div className="text-group">
                          <h3>{name}</h3>
                          <p className="item-specs">
                            {item.selectedSize} <span>•</span> {item.selectedColor}
                          </p>
                        </div>
                        <span className="item-price-tag">{item.price * item.quantity} EGP</span>
                      </div>

                      <div className="item-controls-bottom">
                        <div className="qty-picker">
                          <button onClick={() => updateQuantity(uId, item.quantity - 1)} disabled={item.quantity <= 1}>
                            <Minus size={14} />
                          </button>
                          <span className="qty-num">{item.quantity}</span>
                          <button onClick={() => updateQuantity(uId, item.quantity + 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(uId)} className="delete-item-btn">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <aside className="cart-summary-card">
            <div className="summary-inner">
              <h2 className="summary-headline">{t('orderSummary')}</h2>
              
              <div className="price-rows">
                <div className="p-row">
                  <span>{t('subtotal')}</span>
                  <span>{total} EGP</span>
                </div>
                <div className="p-row">
                  <span>{t('shipping')}</span>
                  <span className={shipping === 0 ? "free-text" : ""}>
                    {shipping === 0 ? t('free') : `${shipping} EGP`}
                  </span>
                </div>
              </div>

              <div className="final-total-area">
                <div className="total-label-group">
                  <span className="label">{t('total')}</span>
                </div>
                <span className="total-amount-display">{total + shipping} <small>EGP</small></span>
              </div>

              <button onClick={() => navigate('/checkout')} className="checkout-action-btn">
                {t('proceedToCheckout')}
                <ArrowRight size={20} />
              </button>

              <div className="security-badges">
                <p><ShieldCheck size={14} /> Secure Payment</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};