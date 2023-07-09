jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  // * hamburger and drawer
  $(".js-hamburger , .js-drawer-menu").click(function () {
    $(".js-hamburger").toggleClass("is-active"); //.is-activeクラスをtoggleする
    $(".js-drawer-menu").fadeToggle(); //ドロワー（マスク）をfadeIn/Outする
  });
});
