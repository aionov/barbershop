$(document).ready(function () {
  $(window).scroll(() => {
    $(this).scrollTop() > 0
      ? $(".header .container").css("background", "#000000")
      : $(".header .container").css("background", "none");
  });

  new WOW({
    animateClass: "animate__animated",
  }).init();

  new AirDatepicker("#order-input-date", {
    autoClose: true,
    dateFormat: "dd.M.yyyy",
    onSelect: function (fd) {
      $("#order-input-date").removeClass("wrong-input");
      $("#order-input-date-error").addClass("hidden");
    },
  });

  $("#order-input-phone").mask("+7 (999) 999-99-99");

  $.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  };

  $('input[type="tel"]').click(function () {
    $(this).setCursorPosition(4);
  });

  $("#menu").bind("click", () => {
    $("#menu").removeClass("open");
  });

  $("#burger").bind("click", function () {
    $("#menu").addClass("open");
  });

  const swiper = new Swiper(".barbers-swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 10,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1.5,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 2,
      },
      1100: {
        slidesPerView: 3,
      },
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  function updateSwiperBullets(index) {
    let bullets = $(".barbers-slider-controls").find(".barbers-page");
    bullets.each(function (idx, item) {
      $(item).removeClass("selected");
    });
    let bullet = $(".barbers-slider-controls").find(".barbers-page")[index];
    $(bullet).addClass("selected");
  }

  swiper.on("slideChange111", function () {
    updateSwiperBullets(this.realIndex);
  });

  let lastSliderIndex = -1;
  let lastSliderDirection = 0;
  swiper.on("realIndexChange", function (e) {
    let index = this.realIndex;
    let direction = swiper.touches.diff;
    if (lastSliderIndex == index && direction < 0) {
      // swipe to right
      index = swiper.slides.length - 1;
      swiper.slideTo(swiper.slides.length - 1);
    } else if (lastSliderIndex == index && direction > 0) {
      // swipe to left
      index = 0;
      swiper.slideTo(0);
    }
    lastSliderIndex = this.activeIndex;

    updateSwiperBullets(index);
  });

  swiper.slideTo(4);

  $(".barber-order").bind("click", function (e) {
    resetOrderForm();
    resetInputErrors();
    $(".popup__content").addClass("form");
    $(".popup__title").html("Заполинте данные <br>для оформления заявки");
    $(".popup__text").css("display", "none");
    $(".order-form").css("display", "flex");
    $(".popup").css("visibility", "visible");
  });

  $(".barbers-next").bind("click", function (e) {
    swiper.slideNext();
  });

  $(".barbers-page").bind("click", function (e) {
    let index = $(this).attr("id") - 1;
    updateSwiperBullets(index);
    swiper.slideTo(index);
  });

  $(".barbers-prev").bind("click", function (e) {
    swiper.slidePrev();
  });

  $(".popup__close").bind("click", function (e) {
    resetOrderForm();
    $(".popup__content").removeClass("form");
    $(".popup").css("visibility", "hidden");
    $(".order-form").css("display", "none");
  });

  $("#btn-discount").bind("click", function (e) {
    $(".popup__title").html("Спасибо что выбрали<br>Strong Club!");
    $(".popup__text").html(
      "Просто запишитесь в наш барбершоп и приходите – <br>скидку мы применим после осуществления услуги"
    );
    $(".popup__text").css("display", "flex");
    $(".popup__text").css("justify-content", "center");
    $(".order-form").css("display", "none");
    $(".popup").css("visibility", "visible");
  });

  function showThankYou() {
    $(".popup__title").html("Спасибо что выбрали<br>Strong Club!");
    $(".popup__text").html(
      "Наш администратор свяжется с вами в<br> течении 10 минут, для уточнения деталей."
    );
    $(".popup__content").removeClass("form");
    $(".popup__text").css("display", "flex");
    $(".popup__text").css("justify-content", "center");
    $(".order-form").css("display", "none");
    $(".popup").css("visibility", "visible");
  }

  function showError() {
    $(".popup__title").html("Спасибо что выбрали<br>Strong Club!");
    $(".popup__text").html(
      "Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ"
    );
    $(".popup__content").removeClass("form");
    $(".popup__text").css("display", "flex");
    $(".popup__text").css("justify-content", "center");
    $(".order-form").css("display", "none");
    $(".popup").css("visibility", "visible");
  }

  let order_date = $("#order-input-date");
  let order_time = $("#order-input-time");
  let order_service = $("#order-input-service");
  let order_name = $("#order-input-name");
  let order_phone = $("#order-input-phone");
  let order_barber = $("#order-input-barber");

  let controls = [
    "#order-input-name",
    "#order-input-phone",
    "#order-input-service",
    "#order-input-barber",
    "#order-input-date",
    "#order-input-time",
  ];

  function resetOrderForm() {
    for (let i = 0; i < controls.length; i++) {
      $(controls[i]).val("");
    }

    let buttons = $(".dropdown__wrapper").find(".dropdown__button");
    buttons.each(function (idx, btn) {
      $(btn).html($(btn).attr("default"));
    });

    resetInputErrors();
  }

  let buttons = $(".dropdown__wrapper").find(".dropdown__button");
  buttons.each(function (idx, btn) {
    $(btn).bind("click", (e) => {
      e.preventDefault();
      hideDropDownAll();
      if ($(this).parent().attr("id") == $(btn).parent().attr("id")) {
        let list = $(this).next();
        console.log("click lsit", $(list).text());
        if (list.hasClass("dropdown__wrapper-visible")) {
          // hideDropDown(list);
        } else {
          console.log("show list", $(list).children().text());
          showDropDown(list);
        }
      }
    });
  });

  function showDropDown(element) {
    element.removeClass("dropdown__wrapper-hidden");
    element.addClass("dropdown__wrapper-visible");
  }

  function hideDropDown(element) {
    element.addClass("dropdown__wrapper-hidden");
    element.removeClass("dropdown__wrapper-visible");
  }

  function hideDropDownAll() {
    $(".dropdown__list").addClass("dropdown__wrapper-hidden");
    $(".dropdown__list").removeClass("dropdown__wrapper-visible");
  }

  $(".dropdown__list-item").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    let button = $(this).parent().parent().children("button");
    let value = this.innerText; //this.dataset.value

    let input_id = button.attr("input_id");
    $("input[name='dropdown-input']").each(function (idx, item) {
      let id = $(item).attr("id");
      if (id == input_id) {
        $(item).val(value);
        button.text(value);
      }
    });
    hideDropDown($(this).parent());
    button.focus();
    checkInputErrors(false);
  });

  $(document).click((e) => {
    if (
      e.target.className !== "dropdown__button" &&
      e.target.className !== "dropdown__button wrong-input"
    ) {
      hideDropDownAll();
    }
  });

  $(document).bind("keydown", function (e) {
    if (e.key === "Tab" || e.key === "Escape") {
      hideDropDownAll();
    }
  });

  function resetInputErrors() {
    for (let i = 0; i < controls.length; i++) {
      $(controls[i]).removeClass("wrong-input");
      $(controls[i] + "-error").addClass("hidden");
    }
    $(".dropdown__button").each(function (idx, item) {
      $(item).removeClass("wrong-input");
    });
  }

  function checkInputErrors(validate) {
    resetInputErrors();

    if (validate) {
      for (let i = 0; i < controls.length; i++) {
        let val = $(controls[i]).val();
        if (!val || String(val).length < 1) {
          $(controls[i]).addClass("wrong-input");
          $(".dropdown__button").each(function (idx, item) {
            if ($(item).attr("input_id") == $(controls[i]).attr("id")) {
              $(item).addClass("wrong-input");
            }
          });
          $(controls[i] + "-error").removeClass("hidden");
          // console.log("Заполните все поля");
          return false;
        }
      }
    }
    return true;
  }

  $("#order-button").bind("click", function (e) {
    e.preventDefault();

    if (!checkInputErrors(true)) {
      return;
    }

    $(".loader").css("display", "flex");

    let url = "https://testologia.site/checkout";
    $.ajax({
      method: "POST",
      url: url,
      data: {
        service: order_service.val(),
        name: order_name.val(),
        phone: order_phone.val(),
        barber: order_barber.val(),
        date: order_date.val(),
        time: order_time.val(),
      },
    }).done(function (msg) {
      $(".loader").css("display", "none");
      if (msg.hasOwnProperty("success") && msg["success"] === 1) {
        showThankYou();
        resetOrderForm();

        const form = $("#order-form");
        setTimeout(() => {
          resetOrderForm();
        }, 3000);
      } else {
        showError();
      }
    });
  });
});
