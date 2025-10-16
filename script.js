// ==================== انتظار تحميل الصفحة بالكامل ====================
document.addEventListener('DOMContentLoaded', function() {
  // ==================== تعريف المتغيرات الأساسية ====================
  const header = document.getElementById('header');
  const overlay = document.getElementById('overlay');
  const courseDetails = document.getElementById('courseDetails');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  // ==================== قائمة الموبايل (الهامبرجر) ====================
  // فتح/إغلاق القائمة عند الضغط على زر الهامبرجر
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // ==================== إغلاق القائمة عند اختيار رابط ====================
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // ==================== إغلاق القائمة عند الضغط خارجها ====================
  document.addEventListener('click', function(e) {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
  
  // ==================== تأثير السكرول على الـ Header ====================
  // إضافة كلاس "scrolled" عند السكرول لأسفل
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==================== بيانات الكورسات (جميع الفئات) ====================
  const coursesData = {
    // كورسات تطوير الويب
    web: [
      { id: 1, title: "JavaScript - الدليل الشامل", image: "js", color: "#F7DF1E", rating: 4.8, price: "199 ر.س", description: "تعلم JavaScript من الصفر إلى الاحتراف. يشمل ES6+, الوحدات البنائية، DOM، APIs وغيرها الكثير.", features: ["مقدمة شاملة لجافاسكريبت", "التعامل مع DOM والأحداث", "ES6+ والميزات الحديثة", "التفاعل مع APIs", "مشاريع عملية وتطبيقات"], duration: "40 ساعة", level: "مبتدئ إلى متقدم" },
      { id: 2, title: "تطوير الواجهات الأمامية مع React", image: "react", color: "#61DAFB", rating: 4.8, price: "229 ر.س", description: "أتقن React.js لبناء تطبيقات ويب تفاعلية. يشمل Hooks، Context API، Router، وإدارة الحالة.", features: ["مقدمة إلى React والمفاهيم الأساسية", "المكونات والخصائص (Props)", "الحالة (State) و Hooks", "التوجيه (Routing)", "أفضل الممارسات وأداء التطبيقات"], duration: "45 ساعة", level: "متوسط" },
      { id: 3, title: "تطوير الويب الكامل مع Node.js", image: "node-js", color: "#339933", rating: 4.6, price: "219 ر.س", description: "تعلم تطوير تطبيقات الويب الكاملة باستخدام Node.js، Express، وقواعد البيانات.", features: ["مقدمة إلى Node.js وبيئته", "إطار Express.js", "قواعد البيانات و MongoDB", "المصادقة والصلاحيات", "نشر التطبيقات والخوادم"], duration: "55 ساعة", level: "متوسط إلى متقدم" },
      { id: 4, title: "HTML5 و CSS3 المتقدم", image: "html5", color: "#E34F26", rating: 4.7, price: "149 ر.س", description: "أتقن أحدث تقنيات HTML5 و CSS3 لإنشاء مواقع ويب تفاعلية وجذابة.", features: ["HTML5 الجديد", "CSS3 المتقدم", "التصميم المتجاوب", "Animations و Transitions", "مشاريع عملية"], duration: "30 ساعة", level: "مبتدئ" },
      { id: 5, title: "Vue.js - الإطار المتقدم", image: "vuejs", color: "#4FC08D", rating: 4.8, price: "239 ر.س", description: "تعلم Vue.js لإطار عمل JavaScript متقدم لبناء تطبيقات ويب معقدة.", features: ["أساسيات Vue.js", "المكونات والبيانات", "التوجيه والحالة", "Vuex لإدارة الحالة", "مشاريع متقدمة"], duration: "50 ساعة", level: "متوسط" }
    ],
    // كورسات تطوير التطبيقات
    apps: [
      { id: 6, title: "تطوير تطبيقات iOS مع Swift", image: "swift", color: "#F05138", rating: 4.7, price: "249 ر.س", description: "أنشئ تطبيقات iOS احترافية باستخدام Swift وSwiftUI. يشمل واجهات المستخدم، APIs، ونشر التطبيقات.", features: ["أساسيات لغة Swift", "واجهات المستخدم مع SwiftUI", "التفاعل مع APIs", "تخزين البيانات محلياً", "نشر التطبيقات على App Store"], duration: "50 ساعة", level: "متوسط" },
      { id: 7, title: "تطوير تطبيقات Android مع Kotlin", image: "android", color: "#3DDC84", rating: 4.7, price: "259 ر.س", description: "أنشئ تطبيقات Android احترافية باستخدام Kotlin. يشمل واجهات المستخدم، قواعد البيانات، ونشر التطبيقات.", features: ["مقدمة إلى Kotlin", "واجهات المستخدم مع XML", "التفاعل مع APIs", "قواعد البيانات المحلية", "نشر التطبيقات على Play Store"], duration: "55 ساعة", level: "متوسط" },
      { id: 8, title: "تطوير التطبيقات الهجينة مع Flutter", image: "js", color: "#02569B", rating: 4.8, price: "269 ر.س", description: "أنشئ تطبيقات للجوال والويب وسطح المكتب باستخدام Flutter وإطار عمل Dart.", features: ["مقدمة إلى لغة Dart", "إطار Flutter للمنصات المتعددة", "واجهات مستخدم تفاعلية", "التكامل مع APIs", "نشر التطبيقات على مختلف المنصات"], duration: "60 ساعة", level: "متوسط" },
      { id: 9, title: "React Native للتطبيقات المحمولة", image: "react", color: "#61DAFB", rating: 4.7, price: "249 ر.س", description: "استخدم React Native لبناء تطبيقات محمولة عالية الجودة لنظامي iOS و Android.", features: ["أساسيات React Native", "المكونات المحمولة", "التكامل مع APIs المحلية", "نشر التطبيقات", "أفضل الممارسات"], duration: "55 ساعة", level: "متوسط" },
      { id: 10, title: "تطوير ألعاب الموبايل مع Unity", image: "unity", color: "#000000", rating: 4.6, price: "279 ر.س", description: "تعلم تطوير ألعاب الموبايل باستخدام محرك Unity الشهير ولغة C#.", features: ["مقدمة إلى Unity", "البرمجة بلغة C#", "الفيزياء والمحركات", "نشر الألعاب على المتاجر", "مشاريع ألعاب عملية"], duration: "65 ساعة", level: "متوسط" }
    ],
    // كورسات الذكاء الاصطناعي
    ai: [
      { id: 11, title: "تعلم Machine Learning مع Python", image: "python", color: "#FF6F00", rating: 4.9, price: "299 ر.س", description: "أدخل عالم الذكاء الاصطناعي وتعلم خوارزميات Machine Learning باستخدام Python ومكتباتها.", features: ["مقدمة في التعلم الآلي", "المكتبات الأساسية (NumPy, Pandas)", "خوارزميات التعلم الآلي", "معالجة البيانات والتنبؤ", "مشاريع عملية وتطبيقات حقيقية"], duration: "60 ساعة", level: "متقدم" },
      { id: 12, title: "الذكاء الاصطناعي المتقدم", image: "brain", color: "#FF6B6B", rating: 4.9, price: "399 ر.س", description: "تعمق في عالم الذكاء الاصطناعي. استكشاف الشبكات العصبية، الرؤية الحاسوبية، ومعالجة اللغات الطبيعية.", features: ["الشبكات العصبية العميقة", "الرؤية الحاسوبية", "معالجة اللغات الطبيعية", "التعلم المعزز", "التطبيقات الصناعية والحقيقية"], duration: "80 ساعة", level: "متقدم" },
      { id: 13, title: "تحليل البيانات مع Python", image: "python", color: "#3776AB", rating: 4.7, price: "229 ر.س", description: "تعلم تحليل البيانات باستخدام Python ومكتباتها المتخصصة في التحليل والإحصاء.", features: ["مقدمة في تحليل البيانات", "مكتبات التحليل (Pandas, NumPy)", "التصور البياني للبيانات", "التنبؤ والتحليل الإحصائي", "مشاريع عملية في التحليل"], duration: "45 ساعة", level: "متوسط" },
      { id: 14, title: "التعلم العميق Deep Learning", image: "brain", color: "#FF6B6B", rating: 4.8, price: "349 ر.س", description: "استكشاف عالم التعلم العميق والشبكات العصبية المتقدمة لتطبيقات الذكاء الاصطناعي المعقدة.", features: ["الشبكات العصبية العميقة", "الشبكات التلافيفية CNN", "الشبكات المتكررة RNN", "التعلم غير المشرفى", "مشاريع متقدمة"], duration: "70 ساعة", level: "متقدم" },
      { id: 15, title: "معالجة اللغات الطبيعية NLP", image: "python", color: "#4A90E2", rating: 4.7, price: "319 ر.س", description: "تعلم تقنيات معالجة اللغات الطبيعية لفهم وتحليل النصوص واللغات البشرية.", features: ["أساسيات NLP", "نمذجة اللغة", "تحليل المشاعر", "الترجمة الآلية", "التطبيقات العملية"], duration: "55 ساعة", level: "متوسط إلى متقدم" }
    ],
    // كورسات قواعد البيانات
    database: [
      { id: 16, title: "SQL وقواعد البيانات العلائقية", image: "database", color: "#3366CC", rating: 4.6, price: "189 ر.س", description: "أتقن لغة SQL وإدارة قواعد البيانات العلائقية مثل MySQL و PostgreSQL.", features: ["أساسيات قواعد البيانات", "لغة SQL المتقدمة", "التصميم والتحسين", "الإدارة والأمان", "مشاريع عملية"], duration: "35 ساعة", level: "مبتدئ إلى متوسط" },
      { id: 17, title: "MongoDB وقواعد البيانات NoSQL", image: "database", color: "#47A248", rating: 4.7, price: "209 ر.س", description: "تعلم العمل مع قواعد البيانات NoSQL باستخدام MongoDB للتطبيقات الحديثة.", features: ["مقدمة إلى NoSQL", "MongoDB الأساسي والمتقدم", "التجميع والاستعلامات", "الأداء والتحسين", "التكامل مع التطبيقات"], duration: "40 ساعة", level: "متوسط" },
      { id: 18, title: "إدارة قواعد البيانات المتقدمة", image: "database", color: "#3366CC", rating: 4.8, price: "279 ر.س", description: "تعلم إدارة قواعد البيانات المتقدمة بما في ذلك النسخ الاحتياطي، الاستعادة، والأمان.", features: ["الإدارة المتقدمة", "النسخ الاحتياطي", "الأمان والصلاحيات", "مراقبة الأداء", "استكشاف الأخطاء"], duration: "50 ساعة", level: "متقدم" },
      { id: 19, title: "Oracle Database للمحترفين", image: "database", color: "#F80000", rating: 4.7, price: "329 ر.س", description: "أتقن إدارة قواعد بيانات Oracle المتقدمة للمؤسسات الكبيرة.", features: ["أساسيات Oracle", "SQL المتقدم", "PL/SQL البرمجة", "الإدارة والأمان", "التطبيقات المؤسسية"], duration: "65 ساعة", level: "متقدم" },
      { id: 20, title: "Redis وقواعد البيانات في الذاكرة", image: "database", color: "#DC382D", rating: 4.6, price: "199 ر.س", description: "تعلم استخدام Redis لقواعد البيانات في الذاكرة للتطبيقات عالية الأداء.", features: ["مقدمة إلى Redis", "هياكل البيانات", "الإعداد والإدارة", "التكامل مع التطبيقات", "تحسين الأداء"], duration: "30 ساعة", level: "متوسط" }
    ],
    // كورسات الأمن السيبراني
    security: [
      { id: 21, title: "أمن المعلومات الأساسي", image: "user-secret", color: "#00FF00", rating: 4.7, price: "249 ر.س", description: "تعلم أساسيات أمن المعلومات والمفاهيم الأساسية لحماية الأنظمة والشبكات.", features: ["مقدمة في الأمن السيبراني", "تهديدات الأمن", "أدوات الحماية", "السياسات والإجراءات", "التطبيقات العملية"], duration: "40 ساعة", level: "مبتدئ" },
      { id: 22, title: "الاختراق الأخلاقي", image: "user-secret", color: "#00FF00", rating: 4.9, price: "349 ر.س", description: "تعلم تقنيات الاختراق الأخلاقي لاكتشاف الثغرات الأمنية وحماية الأنظمة منها.", features: ["مقدمة في الاختراق الأخلاقي", "جمع المعلومات", "اختبار الاختراق", "تقرير الثغرات", "أدوات الأمن"], duration: "60 ساعة", level: "متوسط إلى متقدم" },
      { id: 23, title: "أمن تطبيقات الويب", image: "shield-alt", color: "#FF6B6B", rating: 4.8, price: "299 ر.س", description: "تعلم كيفية حماية تطبيقات الويب من الهجمات والثغرات الأمنية الشائعة.", features: ["ثغرات الويب الشائعة", "حماية التطبيقات", "اختبار الاختراق", "أدوات الأمن", "أفضل الممارسات"], duration: "45 ساعة", level: "متوسط" },
      { id: 24, title: "التشفير وأمن الشبكات", image: "lock", color: "#4A90E2", rating: 4.7, price: "279 ر.س", description: "أتقن تقنيات التشفير وأمن الشبكات لحماية البيانات والاتصالات.", features: ["أساسيات التشفير", "بروتوكولات الأمن", "أمن الشبكات", "VPN والشبكات الخاصة", "التطبيقات العملية"], duration: "50 ساعة", level: "متوسط إلى متقدم" },
      { id: 25, title: "التحقيق في الجرائم الإلكترونية", image: "search", color: "#8B0000", rating: 4.8, price: "379 ر.س", description: "تعلم تقنيات التحقيق في الجرائم الإلكترونية وجمع الأدلة الرقمية.", features: ["أساسيات التحقيق الرقمي", "جمع الأدلة", "تحليل البيانات", "التقارير القانونية", "دراسات حالة"], duration: "55 ساعة", level: "متقدم" }
    ]
  };
  
  // ==================== دالة إظهار الإشعار في منتصف الشاشة ====================
  function showNotification(message) {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px 50px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      font-size: 1.2rem;
      font-weight: 600;
      text-align: center;
      animation: popIn 0.5s ease forwards;
      max-width: 90%;
      backdrop-filter: blur(10px);
    `;
    
    // إضافة أيقونة وانيميشن CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes popIn {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
      }
      @keyframes popOut {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    // إضافة أيقونة ساعة رملية
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 15px; justify-content: center;">
        <i class="fas fa-hourglass-half" style="font-size: 2rem; animation: spin 2s linear infinite;"></i>
        <div>${message}</div>
      </div>
    `;
    
    // إضافة أنيميشن دوران للأيقونة
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(spinStyle);
    
    // إضافة الإشعار للصفحة
    document.body.appendChild(notification);
    
    // إخفاء الإشعار بعد 3 ثواني
    setTimeout(() => {
      notification.style.animation = 'popOut 0.4s ease forwards';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 400);
    }, 3000);
  }
  
  // ==================== إنشاء كروت الكورسات ====================
  function createCourseCards() {
    // المرور على جميع الفئات
    for (const category in coursesData) {
      const track = document.getElementById(`${category}Track`);
      const courses = coursesData[category];
      
      // إنشاء كارت لكل كورس
      courses.forEach((course, index) => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.dataset.id = course.id;
        card.dataset.category = category;
        card.style.animationDelay = `${0.1 * index}s`;
        
        // إنشاء النجوم بناءً على التقييم
        const stars = Math.floor(course.rating);
        let starsHTML = '';
        for (let i = 0; i < 5; i++) {
          starsHTML += i < stars ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
        }
        
        // محتوى الكارت
        card.innerHTML = `
          <div class="course-image" style="background: ${course.color}">
            <i class="fab fa-${course.image}"></i>
          </div>
          <h3 class="course-title">${course.title}</h3>
          <div class="course-info">
            <div class="course-rating">
              <span class="rating-value">${course.rating}</span>
              <div class="stars">${starsHTML}</div>
            </div>
            <div class="course-price">${course.price}</div>
          </div>
          <button class="buy-btn">
            <span>اشتري الآن</span>
            <i class="fas fa-shopping-cart"></i>
          </button>
        `;
        
        track.appendChild(card);
      });
    }
    
    // ==================== إضافة الأحداث للكروت ====================
    document.querySelectorAll('.course-card').forEach(card => {
      // عند الضغط على الكارت (عدا زر الشراء) - فتح التفاصيل
      card.addEventListener('click', function(e) {
        if (!e.target.closest('.buy-btn')) {
          const courseId = this.dataset.id;
          const category = this.dataset.category;
          showCourseDetails(courseId, category);
        }
      });
      
      // ==================== زر الشراء - إظهار الإشعار ====================
      card.querySelector('.buy-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        showNotification('سوف يتم التجهيز قريباً إن شاء الله');
      });
    });
  }
  
  // ==================== تعطيل أزرار التقليب (تم إلغاء الوظيفة) ====================
  // هذه الدالة معطلة ولا تفعل شيء - الكروت تعمل بالسوايب فقط
  function setupNavigation() {
    // تم إلغاء وظيفة أزرار التقليب
    // الكروت الآن تعمل بالسوايب اليدوي فقط
  }
  
  // ==================== إظهار تفاصيل الكورس ====================
  function showCourseDetails(courseId, category) {
    const course = coursesData[category].find(c => c.id == courseId);
    
    // إنشاء النجوم
    const stars = Math.floor(course.rating);
    let starsHTML = '';
    for (let i = 0; i < 5; i++) {
      starsHTML += i < stars ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    }
    
    // إنشاء قائمة المميزات
    let featuresHTML = '';
    course.features.forEach(feature => {
      featuresHTML += `
        <div class="feature">
          <i class="fas fa-check-circle"></i>
          <span>${feature}</span>
        </div>
      `;
    });
    
    // محتوى نافذة التفاصيل
    courseDetails.innerHTML = `
      <button class="close-details" id="closeDetails">
        <i class="fas fa-times"></i>
      </button>
      <div class="details-header">
        <div class="details-image" style="background: ${course.color}">
          <i class="fab fa-${course.image}"></i>
        </div>
        <div>
          <h2 class="details-title">${course.title}</h2>
          <div class="details-info">
            <div class="details-rating">
              <span>${course.rating}</span>
              <div class="stars">${starsHTML}</div>
            </div>
            <div class="details-price">${course.price}</div>
          </div>
          <div class="details-info">
            <div><strong>المدة:</strong> ${course.duration}</div>
            <div><strong>المستوى:</strong> ${course.level}</div>
          </div>
        </div>
      </div>
      <p class="details-description">${course.description}</p>
      <div class="details-features">
        ${featuresHTML}
      </div>
      <div class="details-actions">
        <button class="details-btn primary-btn" id="buyNowDetails">
          <i class="fas fa-shopping-cart"></i> اشتري الآن
        </button>
        <button class="details-btn secondary-btn" id="closeDetailsBtn">
          <i class="fas fa-times"></i> إغلاق
        </button>
      </div>
    `;
    
    // إظهار النافذة والتعتيم
    courseDetails.classList.add('active');
    overlay.classList.add('active');
    
    // أحداث الإغلاق
    document.getElementById('closeDetails').addEventListener('click', closeDetails);
    document.getElementById('closeDetailsBtn').addEventListener('click', closeDetails);
    overlay.addEventListener('click', closeDetails);
    
    // ==================== زر الشراء في التفاصيل - إظهار الإشعار ====================
    document.getElementById('buyNowDetails').addEventListener('click', function() {
      showNotification('سوف يتم التجهيز قريباً إن شاء الله');
      closeDetails();
    });
  }
  
  // ==================== إغلاق نافذة التفاصيل ====================
  function closeDetails() {
    courseDetails.classList.remove('active');
    overlay.classList.remove('active');
  }
  
  // ==================== التمرير السلس عند الضغط على روابط القائمة ====================
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      // التمرير السلس للقسم المطلوب
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    });
  });
  
  // ==================== إضافة حدث لزر "اشترك الآن" - إظهار الإشعار ====================
  const subscribeButton = document.querySelector('.learn-more');
  if (subscribeButton) {
    subscribeButton.addEventListener('click', function(e) {
      e.preventDefault();
      showNotification('سوف يتم التجهيز قريباً إن شاء الله');
    });
  }
  
  // ==================== تشغيل الدوال الأساسية ====================
  createCourseCards();
  setupNavigation(); // معطلة - لا تفعل شيء
});

// ==================== تفعيل الوضع الداكن/الفاتح ====================
const themeSwitch = document.querySelector('.switch input');

// ==================== الحصول على الثيم المحفوظ أو استخدام الفاتح كافتراضي ====================
const currentTheme = localStorage.getItem('theme') || 'light';

// ==================== تطبيق الثيم المحفوظ عند تحميل الصفحة ====================
document.documentElement.setAttribute('data-theme', currentTheme);

// ==================== وضع علامة على الزر إذا كان الوضع داكن ====================
if (currentTheme === 'dark') {
  themeSwitch.checked = true;
}

// ==================== عند تغيير حالة الزر ====================
themeSwitch.addEventListener('change', function() {
  if (this.checked) {
    // تفعيل الوضع الداكن
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    // تفعيل الوضع الفاتح
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});