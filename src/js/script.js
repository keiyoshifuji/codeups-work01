jQuery(function ($) {
  // ! 「jQuery(function ($) {}」内であればWordpressでも「$」が使用可能になる
  // console.log()

  // ! function  // function myFunction(arg1, arg2) {}
  function headerDown(linkAnchor, durationTime, easeType, a) {
    $("html, body").animate(
      {
        scrollTop: $("#" + linkAnchor).offset().top - headerHeightDefault * a,
      },
      durationTime,
      easeType
    );
  }

  // ! 共通
  // * 画面幅
  const windowWidthDefault = $(window).width();
  let windowWidth = $(window).width();
  $(window).on("resize", function () {
    windowWidth = $(this).width();
  });

  // * ヘッダー高さ
  const headerHeightDefault = $("header").height();

  // * URLにアンカーがある場合はローディング後にヘッダー高さ分を下げる
  $("a").on("click", function (e) {
    let targetHref = $(this).attr("href");
    if (targetHref && targetHref.includes("#")) {
      // アンカーが同一ページにあるとき
      let linkAnchor = $(this).attr("href").split("#")[1];
      if ($("#" + linkAnchor).offset().top) {
        headerDown(linkAnchor, 100, "linear", 1.1);
      }
    }
  });
  // 遷移先にアンカーがあるときは読み込み後に移動
  $(window).on("load", function () {
    let targetHref = window.location.href;
    if (targetHref && targetHref.includes("#")) {
      let linkAnchor = window.location.href.split("#")[1];
      headerDown(linkAnchor, 100, "linear", 1.1);
    }
  });

  // ! 個別動作

  // * hamburger and drawer
  $(".js-hamburger , .js-drawer-menu").click(function () {
    $(".js-hamburger").toggleClass("is-active");
    $(".js-drawer-menu").fadeToggle();

    if ($(".js-hamburger").hasClass("is-active")) {
      $("body").css({ overflow: "hidden" });
    } else {
      $("body").css({ overflow: "" });
    }
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
  // 参考：https://design-remarks.com/image-after-color/
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

  // * スクロールトップにアニメーションで移動する
  $(".js-scroll-top-button").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "normal");
    return false;
  });

  // * ページネーションをactiveにする
  $(".js-pagination-number").click(function () {
    $(".js-pagination-number").removeClass("is-active");
    $(this).addClass("is-active");
  });

  // * About us モーダル
  const modal = $(".js-modal");
  const open = $(".js-modal-open");
  const close = $(".js-modal-close");
  const specifiedWidth = 768;
  // 開くボタンをクリックしたらモーダルを表示する
  open.on("click", function () {
    if (windowWidth >= specifiedWidth) {
      let imageSrc = $(this).children("img").attr("src");
      let imageAlt = $(this).children("img").attr("alt");
      let newImg = $("<img>", {
        class: "modal__img js-modal-img",
        src: imageSrc,
        alt: imageAlt,
      });
      $(".js-modal-imgBox").append(newImg);
      modal.fadeIn(500, function () {
        $("body").css({ overflow: "hidden" });
      });
    }
  });
  // 閉じるボタンをクリックしたらモーダルを閉じる
  close.add(modal).on("click", function () {
    modal.fadeOut(500, function () {
      $(".js-modal-img").remove();
      $("body").css({ overflow: "" });
    });
  });

  // * カテゴリータグをactiveにする & Information記事を切り替える
  const categoryButton = $(".js-category-button");
  const categoryContent = $(".js-category-content");
  categoryButton.on("click", function () {
    let index = categoryButton.index(this);
    categoryButton.removeClass("is-active");
    categoryContent.removeClass("is-active");
    $(this).addClass("is-active");
    categoryContent.eq(index).addClass("is-active");
  });
  // *　target-id付リンクを踏んだ時にリンク先のInformation記事を切り替える
  $(function () {
    let linkId = new URL(window.location.href).searchParams.get("id");
    if (linkId) {
      // console.log(new URL(window.location.href))
      // console.log(linkId)
      categoryButton.removeClass("is-active");
      categoryContent.removeClass("is-active");
      let button = $("[data-target='" + linkId + "']");
      let content = $("#" + linkId);
      button.addClass("is-active");
      content.addClass("is-active");
    }
  });

  // * アーカイブ年をクリックしたときにアコーディオンする
  const archiveButtonActive = $(".js-archive-button.is-active");
  const archiveButton = $(".js-archive-button");
  archiveButtonActive.next().css({ display: "block" });
  archiveButton.on("click", function () {
    $(this).toggleClass("is-active");
    $(this).next().slideToggle(300);
  });

  // * FAQのQをクリックしたときにアコーディオンする
  const faqQuestion = $(".page-faq__question");
  const faqAnswer = $(".page-faq__answer");
  faqQuestion.addClass("is-open");
  faqAnswer.css("display", "block");
  faqQuestion.on("click", function () {
    $(this).toggleClass("is-open");
    $(this).next().slideToggle(300);
  });

  // * END

  // ! 今回は利用しない

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
});
