(function($){
    
    "use strict";
    
    //===== Prealoder
    
    $(window).on('load', function(event) {
        $('.preloader').delay(500).fadeOut(500);
    });
    
    
    //===== Mobile Menu 
    
    $(".navbar-toggler").on('click', function() {
        $(this).toggleClass('active');
    });
    
    $(".navbar-nav a").on('click', function() {
        $(".navbar-toggler").removeClass('active');
    });
    
    
    //===== close navbar-collapse when a  clicked
    
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });
    
    
    //===== Sticky
    
    $(window).on('scroll', function(event) {    
        var scroll = $(window).scrollTop();
        if (scroll < 10) {
            $(".navigation").removeClass("sticky");
        } else{
            $(".navigation").addClass("sticky");
        }
    });
    
    
    //===== Section Menu Active

    var scrollLink = $('.page-scroll');
        // Active link switching
        $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function() {

          var sectionOffset = $(this.hash).offset().top - 73;

          if ( sectionOffset <= scrollbarLocation ) {
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
          }
        });
    });
    
    
    
    // Parallaxmouse js
    
    function parallaxMouse() {
        if ($('#parallax').length) {
            var scene = document.getElementById('parallax');
            var parallax = new Parallax(scene);
        };
    };
    parallaxMouse();
    
    
    //===== Progress Bar
    
    if($('.progress-line').length){
        $('.progress-line').appear(function(){
            var el = $(this);
            var percent = el.data('width');
            $(el).css('width',percent+'%');
        },{accY: 0});
    }
    
    
    //===== Counter Up
    
    $('.counter').counterUp({
        delay: 10,
        time: 1600,
    });
    
    
    //===== Magnific Popup
    
    $('.image-popup').magnificPopup({
      type: 'image',
      gallery:{
        enabled:true
      }
    });
    
    
    //===== Back to top
    
    // Show or hide the sticky footer button
    $(window).on('scroll', function(event) {
        if($(this).scrollTop() > 600){
            $('.back-to-top').fadeIn(200)
        } else{
            $('.back-to-top').fadeOut(200)
        }
    });
    
    
    //Animate the scroll to yop
    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        
        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });
    

    
    //===== 
    
     
    
}(jQuery));


/*
###########################################
           GET IN TOUCH WITH US
###########################################
*/

(function ($) {
    'use strict';
  
    var form = $('.contact__form'),
        message = $('.contact__msg'),
        form_data;
  
    // Success function
    function done_func(response) {
    
       Swal.fire({
          type: 'success',
          title: 'Success',
          text: response
        });
      
      $('#sendmail')[0].reset();
      form.find('input:not([type="submit"]), textarea').val('');
      $('#submit').removeAttr("disabled");
    }
  
    // fail function
  function fail_func(data) {
    
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: data.responseText
      });
    
      $('#sendmail')[0].reset();
      form.find('input:not([type="submit"]), textarea').val('');
      $('#submit').removeAttr("disabled");
    }
  
      // loader function
      function load_func(data) {
        Swal.fire({
          onOpen: () => {
            swal.showLoading();
          },
          title: 'Sending...',
          text: "Please wait",
          icon: 'warning',
          timer:20000,
          showCancelButton: false,
          showConfirmButton: false,
          closeOnClickOutside: false,
          allowOutsideClick: false,
          closeOnEsc: false
        });
      }
    
    form.submit(function (e) {
      load_func();
      $('#submit').attr('disabled', 'disabled');
        e.preventDefault();
        form_data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form_data
        })
        .done(done_func)
        .fail(fail_func);
    });
  })(jQuery);
   
  /*
  ###########################################
          END OF GET IN TOUCH WITH US
  ###########################################
  */