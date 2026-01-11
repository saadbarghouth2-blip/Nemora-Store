import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'ar' | 'eg' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    productsNav: 'المنتجات',
    cart: 'السلة',
    checkout: 'الدفع',
    // Home Page
    heroTitle: 'ملابس مطبوعة مخصصة',
    heroSubtitle: 'صمم واطبع أسلوبك الفريد على قمصان وهديات عالية الجودة وغيرها. عبر عن نفسك بتصاميم مخصصة!',
    shopNow: 'تسوق الآن',
    freeShipping: 'شحن مجاني',
    freeShippingDesc: 'للطلبات أكثر من 500 جنيه',
    customDesign: 'تصميم مخصص',
    customDesignDesc: 'اطبع تصاميمك الفريدة',
    highQuality: 'جودة عالية',
    highQualityDesc: 'مواد وطباعة عالية الجودة',
    securePayment: 'دفع آمن',
    securePaymentDesc: 'دفع آمن ومشفر',
    featuredProducts: 'المنتجات المميزة',
    viewAll: 'عرض الكل',
    // Products Page
    ourProducts: 'منتجاتنا',
    browseProducts: 'تصفح مجموعتنا من الملابس القابلة للتخصيص',
    searchProducts: 'ابحث عن المنتجات...',
    categories: 'الفئات',
    allProducts: 'جميع المنتجات',
    tshirts: 'قمصان',
    hoodies: 'هوديات',
    tankTops: 'قمصان بدون أكمام',
    polos: 'قمصان بولو',
    sweatshirts: 'سويت شيرت',
    jackets: 'جاكيتات',
    showing: 'عرض',
    products: 'منتج',
    noProductsFound: 'لم يتم العثور على منتجات. جرب تعديل البحث أو الفلاتر.',
    // New pages
    about: 'عنا',
    contact: 'اتصل بنا',
    gallery: 'المعرض',
    services: 'الخدمات',
    aboutUs: 'عنا',
    ourStory: 'قصتنا',
    mission: 'مهمتنا',
    vision: 'رؤيتنا',
    getInTouch: 'تواصل معنا',
    sendMessage: 'أرسل رسالة',
    name: 'الاسم',
    message: 'الرسالة',
    send: 'أرسل',
    viewGallery: 'عرض المعرض',
    ourServices: 'خدماتنا',
    // Product Detail
    size: 'المقاس',
    color: 'اللون',
    customText: 'نص مخصص (اختياري)',
    customTextPlaceholder: 'أضف النص الخاص بك للطباعة...',
    customTextDesc: 'أضف النص الخاص بك ليتم طباعته على القطعة',
    quantity: 'الكمية',
    addToCart: 'أضف إلى السلة',
    outOfStock: 'هذا المنتج غير متوفر حالياً',
    productNotFound: 'المنتج غير موجود',
    backToProducts: 'العودة إلى المنتجات',
    pleaseSelectSize: 'الرجاء اختيار المقاس واللون',
    addedToCart: 'تمت الإضافة إلى السلة!',
    // Cart
    shoppingCart: '',
    clearCart: 'مسح السلة',
    yourCartIsEmpty: 'سلتك فارغة',
    emptyCartDesc: 'ابدأ بإضافة العناصر إلى سلتك لرؤيتها هنا.',
    browseProductsCart: 'تصفح المنتجات',
    orderSummary: 'ملخص الطلب',
    subtotal: 'المجموع الفرعي',
    shipping: 'الشحن',
    free: 'مجاني',
    total: 'الإجمالي',
    proceedToCheckout: 'المتابعة إلى الدفع',
    // Checkout
    shippingInformation: 'معلومات الشحن',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    address: 'العنوان',
    city: 'المدينة',
    state: 'الولاية',
    zipCode: 'الرمز البريدي',
    country: 'الدولة',
    paymentInformation: 'معلومات الدفع',
    paymentNote: 'هذا تجريبي. استخدم رقم البطاقة 4242 4242 4242 4242 مع أي تاريخ انتهاء صالح و CVC.',
    processing: 'جاري المعالجة...',
    paymentSuccessful: 'تم الدفع بنجاح! تم الطلب.',
    paymentFailed: 'فشل الدفع. يرجى المحاولة مرة أخرى.',
    // Footer
    footerDesc: 'وجهتك الموثوقة للملابس والإكسسوارات المطبوعة المخصصة.',
    quickLinks: 'روابط سريعة',
    customerService: 'خدمة العملاء',
    contactUs: 'اتصل بنا',
    shippingInfo: 'معلومات الشحن',
    returns: 'الإرجاع',
    followUs: 'تابعنا',
    allRightsReserved: 'جميع الحقوق محفوظة',
    // Additional
    sizeLabel: 'المقاس',
    colorLabel: 'اللون',
    customLabel: 'مخصص',
    qtyLabel: 'الكمية',
    // Products Page Additional
    discoverCollection: 'اكتشف المجموعة',
    shop: 'تسوق',
    searchPlaceholder: 'ابحث عن المنتجات...',
    filterByCategory: 'تصفية حسب الفئة',
    resultsFound: 'نتيجة',
    changeLanguage: 'تغيير اللغة',
  },
  en: {
    // Navigation
    home: 'Home',
    productsNav: 'Products',
    cart: 'Cart',
    checkout: 'Checkout',
    // Home Page
    heroTitle: 'Custom Printed Apparel',
    heroSubtitle: 'Design and print your unique style on high-quality t-shirts, hoodies, and more. Express yourself with custom designs!',
    shopNow: 'Shop Now',
    freeShipping: 'Free Shipping',
    freeShippingDesc: 'On orders over 500 EGP',
    customDesign: 'Custom Design',
    customDesignDesc: 'Print your unique designs',
    highQuality: 'High Quality',
    highQualityDesc: 'Premium materials & printing',
    securePayment: 'Secure Payment',
    securePaymentDesc: 'Safe & encrypted checkout',
    featuredProducts: 'Featured Products',
    viewAll: 'View All',
    // Products Page
    ourProducts: 'Our Products',
    browseProducts: 'Browse our collection of customizable apparel',
    searchProducts: 'Search products...',
    categories: 'Categories',
    allProducts: 'All Products',
    tshirts: 'T-Shirts',
    hoodies: 'Hoodies',
    tankTops: 'Tank Tops',
    polos: 'Polo Shirts',
    sweatshirts: 'Sweatshirts',
    jackets: 'Jackets',
    showing: 'Showing',
    products: 'product',
    noProductsFound: 'No products found. Try adjusting your search or filters.',
    // Product Detail
    size: 'Size',
    color: 'Color',
    customText: 'Custom Text (Optional)',
    customTextPlaceholder: 'Add custom text to print...',
    customTextDesc: 'Add your own text to be printed on the item',
    quantity: 'Quantity',
    addToCart: 'Add to Cart',
    outOfStock: 'This product is currently out of stock.',
    productNotFound: 'Product not found',
    backToProducts: 'Back to Products',
    pleaseSelectSize: 'Please select size and color',
    addedToCart: 'Added to cart!',
    // Cart
    shoppingCart: 'Shopping Cart',
    clearCart: 'Clear Cart',
    yourCartIsEmpty: 'Your cart is empty',
    emptyCartDesc: 'Start adding items to your cart to see them here.',
    browseProductsCart: 'Browse Products',
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    total: 'Total',
    proceedToCheckout: 'Proceed to Checkout',
    // Checkout
    shippingInformation: 'Shipping Information',
    fullName: 'Full Name',
    email: 'Email',
    address: 'Address',
    city: 'City',
    state: 'State',
    zipCode: 'ZIP Code',
    country: 'Country',
    paymentInformation: 'Payment Information',
    paymentNote: 'This is a demo. Use card number 4242 4242 4242 4242 with any future expiry date and CVC.',
    processing: 'Processing...',
    paymentSuccessful: 'Payment successful! Order placed.',
    paymentFailed: 'Payment failed. Please try again.',
    // Footer
    footerDesc: 'Your trusted destination for custom printed apparel and accessories.',
    quickLinks: 'Quick Links',
    customerService: 'Customer Service',
    contactUs: 'Contact Us',
    shippingInfo: 'Shipping Info',
    returns: 'Returns',
    followUs: 'Follow Us',
    allRightsReserved: 'All rights reserved',
    // Additional
    sizeLabel: 'Size',
    colorLabel: 'Color',
    customLabel: 'Custom',
    qtyLabel: 'Qty',
    // New pages
    about: 'About',
    contact: 'Contact',
    gallery: 'Gallery',
    services: 'Services',
    aboutUs: 'About Us',
    ourStory: 'Our Story',
    mission: 'Mission',
    vision: 'Vision',
    getInTouch: 'Get In Touch',
    sendMessage: 'Send Message',
    name: 'Name',
    message: 'Message',
    send: 'Send',
    viewGallery: 'View Gallery',
    ourServices: 'Our Services',
    // Products Page Additional
    discoverCollection: 'Discover Collection',
    shop: 'Shop',
    searchPlaceholder: 'Search products...',
    filterByCategory: 'Filter by Category',
    resultsFound: 'results',
    changeLanguage: 'Change Language',
  },
  eg: {
    // Navigation
    home: 'الرئيسية',
    productsNav: 'المنتجات',
    cart: 'السلة',
    checkout: 'الدفع',
    // Home Page
    heroTitle: 'ملابس مطبعة مخصصة',
    heroSubtitle: 'صمم واطبع ستايلك الفريد على تيشيرتات وهوديات عالية الجودة وكده. عبر عن نفسك بتصاميم مخصصة!',
    shopNow: 'تسوق دلوقتي',
    freeShipping: 'شحن مجاني',
    freeShippingDesc: 'للطلبات أكتر من 500 جنيه',
    customDesign: 'تصميم مخصص',
    customDesignDesc: 'اطبع تصاميمك الفريدة',
    highQuality: 'جودة عالية',
    highQualityDesc: 'خامات وطباعة عالية الجودة',
    securePayment: 'دفع آمن',
    securePaymentDesc: 'دفع آمن ومشفر',
    featuredProducts: 'المنتجات المميزة',
    viewAll: 'شوف الكل',
    // Products Page
    ourProducts: 'منتجاتنا',
    browseProducts: 'تصفح مجموعتنا من الملابس القابلة للتخصيص',
    searchProducts: 'دور على المنتجات...',
    categories: 'الفئات',
    allProducts: 'كل المنتجات',
    tshirts: 'تيشيرتات',
    hoodies: 'هوديات',
    tankTops: 'قمصان بدون أكمام',
    polos: 'قمصان بولو',
    sweatshirts: 'سويت شيرت',
    jackets: 'جاكيتات',
    showing: 'عرض',
    products: 'منتج',
    noProductsFound: 'مفيش منتجات اتلقت. جرب تعدل البحث أو الفلاتر.',
    // Product Detail
    size: 'المقاس',
    color: 'اللون',
    customText: 'نص مخصص (اختياري)',
    customTextPlaceholder: 'ضيف النص بتاعك للطباعة...',
    customTextDesc: 'ضيف النص بتاعك عشان يتطبع على القطعة',
    quantity: 'الكمية',
    addToCart: 'ضيف في السلة',
    outOfStock: 'المنتج ده مش متوفر دلوقتي.',
    productNotFound: 'المنتج مش موجود',
    backToProducts: 'ارجع للمنتجات',
    pleaseSelectSize: 'لو سمحت اختار المقاس واللون',
    addedToCart: 'اتضاف في السلة!',
    // Cart
    shoppingCart: '',
    clearCart: 'امسح السلة',
    yourCartIsEmpty: 'سلتك فاضية',
    emptyCartDesc: 'ابدا تضيف حاجات في سلتك عشان تشوفها هنا.',
    browseProductsCart: 'تصفح المنتجات',
    orderSummary: 'ملخص الطلب',
    subtotal: 'المجموع الفرعي',
    shipping: 'الشحن',
    free: 'مجاني',
    total: 'الإجمالي',
    proceedToCheckout: 'كمل للدفع',
    // Checkout
    shippingInformation: 'معلومات الشحن',
    fullName: 'الاسم الكامل',
    email: 'الإيميل',
    address: 'العنوان',
    city: 'المدينة',
    state: 'المحافظة',
    zipCode: 'الرمز البريدي',
    country: 'البلد',
    paymentInformation: 'معلومات الدفع',
    paymentNote: 'ده تجريبي. استخدم رقم الكارت 4242 4242 4242 4242 مع أي تاريخ انتهاء صالح و CVC.',
    processing: 'جاري المعالجة...',
    paymentSuccessful: 'الدفع نجح! الطلب تم.',
    paymentFailed: 'الدفع فشل. جرب تاني.',
    // Footer
    footerDesc: 'وجهتك الموثوقة للملابس والإكسسوارات المطبوعة المخصصة.',
    quickLinks: 'روابط سريعة',
    customerService: 'خدمة العملاء',
    contactUs: 'اتصل بنا',
    shippingInfo: 'معلومات الشحن',
    returns: 'الإرجاع',
    followUs: 'تابعنا',
    allRightsReserved: 'كل الحقوق محفوظة',
    // Additional
    sizeLabel: 'المقاس',
    colorLabel: 'اللون',
    customLabel: 'مخصص',
    qtyLabel: 'الكمية',
    // New pages
    about: 'عنا',
    contact: 'اتصل بنا',
    gallery: 'المعرض',
    services: 'الخدمات',
    aboutUs: 'عنا',
    ourStory: 'قصتنا',
    mission: 'مهمتنا',
    vision: 'رؤيتنا',
    getInTouch: 'تواصل معانا',
    sendMessage: 'ابعث رسالة',
    name: 'الاسم',
    message: 'الرسالة',
    send: 'ابعث',
    viewGallery: 'شوف المعرض',
    ourServices: 'خدماتنا',
    // Products Page Additional
    discoverCollection: 'اكتشف المجموعة',
    shop: 'تسوق',
    searchPlaceholder: 'دور على المنتجات...',
    filterByCategory: 'تصفية حسب الفئة',
    resultsFound: 'نتيجة',
    changeLanguage: 'تغيير اللغة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('ar');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang === 'en' ? 'en' : 'ar';
    document.documentElement.dir = (lang === 'ar' || lang === 'eg') ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    const langTranslations = translations[language] || translations.ar;
    return langTranslations[key as keyof typeof translations.ar] || key;
  };

  const dir = (language === 'ar' || language === 'eg') ? 'rtl' : 'ltr';

  // Set initial direction
  if (typeof document !== 'undefined') {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
