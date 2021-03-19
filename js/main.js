const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

//윈도우 객체 ==  하나의 창 == 우리가 보고있는 화면 자체
window.addEventListener('scroll', _.throttle(function () {
   console.log(window.scrollY);
   if (window.scrollY > 500) {
    // 배지 숨기기
    //badgeEl.style.display = 'none'; 단순히 CSS로 작업 했을시 부자연스럽게 요소가 사라진다 이떄 gsap사용.
    //gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none' //숫자는 그냥 문자는 꼭 따옴표로 묵자 gsap라이브러리 특징!!! 
      // display: none으로 한 이유는 단순히 opcaity만 0으로 주면 눈에만 안 보일뿐이고 
      //기능적으로는 남아있으니 스크롤을 내렸을떄 사용자가 의도치 않게 클릭 할 상황을 없앨 수 있다.
    });

    // 버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0,
    });
   } else {
    // 배지 보이기
    //badgeEl.style.display = 'block';
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });

    //버튼 숨기기! 
    gsap.to(toTopEl, .2, {
      x: 100,
    });
   }
}, 300)); // 300 == 0.3초 단위는 1000이고 만약 3000이면 3초겠죠??
// 개속 스크롤하면 함수 수십개가 한번에 실행되는데(나중에 프로젝트가 커질시) 
// 이거를 0.3초 단위로 부화를 줘서 함수가 우르르 실행된느걸 방지하는 함수를 throttle이고
// 이것을 lodash.cdn 라이브러리 안에 있다.
// 참고로 _.throttle은 스크롤 작업을 할 떄 굉장히 많이 사용됨
// _.throttle(함수, 시간)

// to-top 을 누르면 위로 올라가는 코드
toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, { /* 윈도우는 말그대로 우리가 보고있는 창 */
    scrollTo: 0 /* 앞서 index.html파일에 ScrollToPlugin.min.js가 상단에 있어야지만 scrollTo를 사용할 수 있다.*/
  });
});

// badge 이미지를 순차적으로 나타나게 하는 코드
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) { // index는 0부터
  //gsap.to(요소, 지속시간, 옵션);
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, // 0.7, 1.4, 2.1, 2.8 
    opacity: 1
  });
});

//swiperjs 라이브러리
// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', // 수직 스와이퍼
  autoplay: true, // 자동으로 재생
  loop: true // 반복 재생!! 마지막 슬라이더 > 첫번째 슬라이더
});
new Swiper('.promotion .swiper-container', {
  // direction: 'horizontal', 원래 direction의 기본값이 horizontal이라서 따로 명시할 필요가 없다.
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true, // 반복 재생
  autoplay: { // 자동 슬라이드 
    delay: 5000 // 5초마다
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자 이다.
    clickable: true // 사용자의 페이지 번호 요소 제어 기능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev', // .promotion클래스 안에 들어 있는 스와퍼 할당
    nextEl: '.promotion .swiper-next'
  }
});
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

/* 한가지 팁! 많은경우  클래스만 간다한게 추가하고 나머지 작업은 CSS를 통해서 작업을 많이한다. */
/* 예를들어 gsap, Swiper같은 경우는 CSS로만 가지고는 작업이 한계가 있으니까 JS로 라이브러리를 이용한다 구분이 됬쬬?? */
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion // ! 는 뒤에있는 값을 반대가 되게 만들어 주세요라는 뜻
  if (isHidePromotion) {
    // 숨김 처리!
    promotionEl.classList.add('hide'); 
  } else {
    // 보임 처리!
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    { // 옵션
      y: size,
      repeat: -1, // 반복  !! -1은 무한반복 !!
      yoyo: true, // 한번 재생된 요소를 위로 다시 올라가게 말그대로 요요
      ease: Power1.easeInOut, // gsap easing 검색 ㄱ
      delay: random(0, delay)
    }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy'); // 뒤에 s가 붙었으니 복수다 그래서 forEach를 써야겠죠!! 
spyEls.forEach(function (spyEl) {
  new ScrollMagic   // 메소드를 체이닝 형태로 만들고 가독성을 위해서 한줄씩 엔터
    .Scene({        // 여기서 Scene()메소드는 ScrollMagic이라는 JS라이브러리를 통해서 특정한 요소를 감시하는 옵션을 지정하는 메소드이다.
      triggerElement: spyEl, // triggerElement에 감시하고있는 하나의 section 엘리먼트를 지정한다. == 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 클라이언트가 현재 보고있는 뷰포트의 시작을 0이라고하면 1이 현재보고있는 끝이다. 이때 0.8은지점에 훅을 걸어서 훅에 걸리면 setClassToggle()메소드가 실행된다.
    })      
    .setClassToggle(spyEl, 'show') 
    .addTo(new ScrollMagic.Controller());  
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); // 2021