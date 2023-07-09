jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  // * hamburger and drawer
  $(".js-hamburger , .js-drawer-menu").click(function () {
    $(".js-hamburger").toggleClass("is-active"); //.is-activeクラスをtoggleする
    $(".js-drawer-menu").fadeToggle(); //ドロワー（マスク）をfadeIn/Outする
  });

  // * Swiper
  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    effect: "fade",
    speed: 3000,
    allowTouchMove: false,
    autoplay: {
      delay: 3000,
    },
  });

  // * END
});
