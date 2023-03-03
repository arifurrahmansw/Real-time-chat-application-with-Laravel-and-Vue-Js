$(document).ready(function(){
    // Aos Animation
    AOS.init({
        offset: 300,
        delay: 0,
        duration: 800,
        easing: 'ease',
        once: true,
    });

    // Sticky Header
    window.onscroll = function () { scrollFunction() };
    function scrollFunction() {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            $('.header_menu').addClass('fixed-top');
        } else {
            $('.header_menu').removeClass('fixed-top');
        }
    }

    // // Category carousel
    // $('.category_carousel').owlCarousel({
    //     loop: false,
    //     autoplay: false,
    //     autoplayTimeout: 2000,
    //     autoplayHoverPause: true,
    //     dots: false,
    //     touchDrag : false,
    //     mouseDrag : false ,
    //     nav:true,
    //     items:6,
    //     stagePadding: 0,
    //     margin:10,
    //     navText:['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    //     responsive: {
    //         0: {
    //             items: 1,
    //         },
    //         380: {
    //             items: 2,
    //         },
    //         576: {
    //             items: 2,
    //         },
    //         768: {
    //             items: 3,
    //         },
    //         992: {
    //             items: 4,
    //         },
    //         1200: {
    //             items: 5,
    //         },
    //         1400: {
    //             items: 6,
    //         },
    //     },
    // });

    // // Category carousel
    // $('.review_carousel').owlCarousel({
    //     loop: true,
    //     autoplay: true,
    //     autoplayTimeout: 3000,
    //     autoplayHoverPause: true,
    //     dots: false,
    //     nav:true,
    //     stagePadding: 0,
    //     margin:10,
    //     navText:['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    //     responsive: {
    //         0: {
    //             items: 1,
    //         },
    //         576: {
    //             items: 2,
    //         },
    //         768: {
    //             items: 2,
    //         },
    //         992: {
    //             items: 3,
    //         },
    //         1200: {
    //             items: 4,
    //         }
    //     },
    // });



    // quantity
    (function() {
        window.inputNumber = function(el) {
          var min = el.attr('min') || false;
          var max = el.attr('max') || false;
          var els = {};
          els.dec = el.prev();
          els.inc = el.next();
          el.each(function() {
            init($(this));
          });

          function init(el) {
            els.dec.on('click', decrement);
            els.inc.on('click', increment);
            function decrement() {
              var value = el[0].value;
              value--;
              if(!min || value >= min) {
                el[0].value = value;
              }
            }
            function increment() {
              var value = el[0].value;
              value++;
              if(!max || value <= max) {
                el[0].value = value++;
              }
            }
          }
        }
      })();

      inputNumber($('#qtyNumber'));

    // tooltip
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    // add account form
    // $('.add_account_btn').on('click', function () {
    //     $('.user_account_list').addClass('d-none')
    //     $('.title1').addClass('d-none')
    //     $('.back_account').removeClass('d-none')
    //     $('.title2').removeClass('d-none')
    //     $('.add_account_form').removeClass('d-none')
    // });

    // account list
    // $('.back_account').on('click', function () {
    //     $('.user_account_list').removeClass('d-none')
    //     $('.title1').removeClass('d-none')
    //     $('.back_account').addClass('d-none')
    //     $('.title2').addClass('d-none')
    //     $('.add_account_form').addClass('d-none')
    // });


})  // end document
