// Vue.config.devtools = true;

// Vue.component('card', {
//   template: `
//     <div class="card-wrap"
//       @mousemove="handleMouseMove"
//       @mouseenter="handleMouseEnter"
//       @mouseleave="handleMouseLeave"
//       ref="card">
//       <div class="card"
//         :style="cardStyle">
//         <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
//         <div class="card-info">
//           <slot name="header"></slot>
//           <slot name="content"></slot>
//         </div>
//       </div>
//     </div>`,
//   mounted() {
//     this.width = this.$refs.card.offsetWidth;
//     this.height = this.$refs.card.offsetHeight;
//   },
//   props: ['dataImage'],
//   data: () => ({
//     width: 0,
//     height: 0,
//     mouseX: 0,
//     mouseY: 0,
//     mouseLeaveDelay: null
//   }),
//   computed: {
//     mousePX() {
//       return this.mouseX / this.width;
//     },
//     mousePY() {
//       return this.mouseY / this.height;
//     },
//     cardStyle() {
//       const rX = this.mousePX * 30;
//       const rY = this.mousePY * -30;
//       return {
//         transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
//       };
//     },
//     cardBgTransform() {
//       const tX = this.mousePX * -40;
//       const tY = this.mousePY * -40;
//       return {
//         transform: `translateX(${tX}px) translateY(${tY}px)`
//       }
//     },
//     cardBgImage() {
//       return {
//         backgroundImage: `url(${this.dataImage})`
//       }
//     }
//   },
//   methods: {
//     handleMouseMove(e) {
//       this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width/2;
//       this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height/2;
//     },
//     handleMouseEnter() {
//       clearTimeout(this.mouseLeaveDelay);
//     },
//     handleMouseLeave() {
//       this.mouseLeaveDelay = setTimeout(()=>{
//         this.mouseX = 0;
//         this.mouseY = 0;
//       }, 1000);
//     }
//   }
// });

// const app = new Vue({
//   el: '#app'
// });
const slides = document.querySelectorAll('.vg-slide');
const prevBtn = document.querySelector('.vg-prev');
const nextBtn = document.querySelector('.vg-next');
let currentIndex = 0;

function showSlide(index) {
  if(index < 0) index = slides.length - 1;
  if(index >= slides.length) index = 0;
  const offset = -index * 100;
  document.querySelector('.vg-carousel').style.transform = `translateX(${offset}%)`;
  currentIndex = index;
}

prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

// Optional: Auto slide every 5 seconds
// setInterval(() => showSlide(currentIndex + 1), 5000);

// about me section tabs

  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 0.9s ease";
    observer.observe(el);
  });

// welcome section scroll effect
  const welcomeSection = document.querySelector('.welcome-section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 120) {
      welcomeSection.classList.add('shrink');
    } else {
      welcomeSection.classList.remove('shrink');
    }
  });

  //made for you section scroll effect

  const reveals_mf = document.querySelectorAll('.reveal_mf');

  const revealOnScroll = () => {
    reveals_mf.forEach(el => {
      const top = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (top < windowHeight - 120) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();




  // ================= VG CAROUSEL CONTROLLER =================

const vgCarouselTrack = document.querySelector('.vg-carousel');
const vgSlides = document.querySelectorAll('.vg-slide');
const vgNavDots = document.querySelectorAll('.vg-mobile-nav button');
const vgPrevArrow = document.querySelector('.vg-prev');
const vgNextArrow = document.querySelector('.vg-next');

let vgCurrentIndex = 0;
const vgTotalSlides = vgSlides.length;

// ---------------- Slide Change Core ----------------
function vgGoToSlide(index) {
  if (index < 0) index = vgTotalSlides - 1;
  if (index >= vgTotalSlides) index = 0;

  // Move carousel
  vgCarouselTrack.style.transform = `translateX(-${index * 100}%)`;

  // Update nav dots
  vgNavDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  // 🔑 Mark active gallery (for mobile 3-image rule)
  vgSlides.forEach((slide, i) => {
    const gallery = slide.querySelector('.vg-gallery');
    if (gallery) {
      gallery.classList.toggle('active-slide', i === index);
    }
  });

  vgCurrentIndex = index;
}

// ---------------- Mobile Nav Dots ----------------
vgNavDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    vgGoToSlide(i);
  });
});

// ---------------- Arrow Navigation (Desktop) ----------------
vgPrevArrow.addEventListener('click', () => {
  vgGoToSlide(vgCurrentIndex - 1);
});

vgNextArrow.addEventListener('click', () => {
  vgGoToSlide(vgCurrentIndex + 1);
});

// ---------------- Swipe Support (Mobile) ----------------
let vgStartX = 0;

vgCarouselTrack.addEventListener('touchstart', (e) => {
  vgStartX = e.touches[0].clientX;
});

vgCarouselTrack.addEventListener('touchend', (e) => {
  const vgEndX = e.changedTouches[0].clientX;
  const diff = vgStartX - vgEndX;

  if (Math.abs(diff) > 50) {
    diff > 0
      ? vgGoToSlide(vgCurrentIndex + 1)
      : vgGoToSlide(vgCurrentIndex - 1);
  }
});

// ---------------- Init ----------------
vgGoToSlide(0);
