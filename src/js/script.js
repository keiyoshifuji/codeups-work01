jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  // * hamburger and drawer
  $(".js-hamburger , .js-drawer-menu").click(function () {
    $(".js-hamburger").toggleClass("is-active"); //.is-activeクラスをtoggleする
    $(".js-drawer-menu").fadeToggle(); //ドロワー（マスク）をfadeIn/Outする
  });

  // * Main-view-swiper
  const mainViewSwiper = new Swiper(".js-main-view-swiper .swiper", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 1,
    effect: "fade",
    speed: 3000,
    allowTouchMove: false,
    autoplay: {
      delay: 3000,
    },
  });

  // * Campaign-swiper
  const campaignSwiper = new Swiper(".js-campaign-swiper .swiper", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 24,
    grabCursor: true,
    breakpoints: {
      768: {
        spaceBetween: 16,
        slidesPerView: 3,
      },
      1024: {
        spaceBetween: 40,
        slidesPerView: 3,
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: ".js-campaign-swiper .swiper-button-next",
      prevEl: ".js-campaign-swiper .swiper-button-prev",
    },
  });

  // * 横から背景画像→imageとなるアニメーション
  //参考：https://design-remarks.com/image-after-color/
  //.js-colorboxの付いた全ての要素に対して下記の処理を行う
  $(".js-colorbox").each(function () {
    $(this).append('<div class="is-color"></div>');
    let color = $(this).find($(".is-color"));
    let image = $(this).find("img");
    let counter = 0;
    let speed = 400;

    color.css("width", "0%");
    image.css("opacity", "0");
    //inviewを使って背景色が画面に現れたら処理をする
    color.on("inview", function () {
      if (counter == 0) {
        $(this)
          .delay(50)
          .animate({ width: "100%" }, speed, function () {
            image.css("opacity", "1");
            $(this).css({ left: "0", right: "auto" });
            $(this).animate({ width: "0%" }, speed);
          });
        counter = 1;
      }
    });
  });

  // * ～px or 100vh後にscroll-top-buttonを表示させる
  // $(window).scroll(function () {
  //   // let scrollThreshold = $(this).height(); //=100vh
  //   let scrollThreshold = 700;
  //   let scrollPosition = $(this).scrollTop();
  //   if (scrollPosition > scrollThreshold) {
  //     $(".js-scroll-top-button").fadeIn();
  //   } else {
  //     $(".js-scroll-top-button").fadeOut();
  //   }
  // });

  // * スクロールトップにアニメーションで移動する
  $(".js-scroll-top-button").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "normal");
    return false;
  });

  // * ナビゲーションクリック時にスーッと移動する
  // const headerHeight = $(".js-header").height();
  // $('a[href^="#"]').click(function () {
  //   const speed = 600;
  //   let href = $(this).attr("href");
  //   let target = $(href == "#" || href == "" ? "html" : href);

  //   //移動先のpadding-topを取得
  //   let paddingValue = parseInt(target.css("padding-top"), 10);

  //   // ヘッダーの高さ分下げる
  //   let position = target.offset().top - headerHeight + paddingValue;
  //   $("body,html").animate({ scrollTop: position }, speed, "swing");
  //   return false;
  // });

  // * END
});
