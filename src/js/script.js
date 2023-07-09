jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  // * hamburger and drawer
  $(".js-hamburger , .js-drawer-menu").click(function () {
    $(".js-hamburger").toggleClass("is-active"); //.is-activeクラスをtoggleする
    $(".js-drawer-menu").fadeToggle(); //ドロワー（マスク）をfadeIn/Outする
  });

  // * Swiper01
  const swiper01 = new Swiper(".swiper01", {
    direction: "horizontal",
    loop: true,
    effect: "fade",
    speed: 3000,
    allowTouchMove: false,
    autoplay: {
      delay: 3000,
    },
  });

  const swiper02 = new Swiper(".swiper02", {
    // loop: true,
    slidesPerView: "auto",
    spaceBetween: 24,
    grabCursor: true,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper02 .swiper-button-next",
      prevEl: ".swiper02 .swiper-button-prev",
    },

    breakpoints: {
      768: {
        spaceBetween: 40,
      },
    },
  });

  // * END
});
