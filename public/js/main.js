;(function () {

	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
	    	}
	    }
		});

	};


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');

	    	}
		});

		// Close offcanvas when clicking a link and re-enable scrolling
		$('#fh5co-offcanvas').on('click', 'a', function(e){
			var $this = $(this);
			var href = $this.attr('href');

			if (href && href.charAt(0) === '#') {
				e.preventDefault();
				var targetId = href.substring(1);
				if (window.location.pathname !== '/') {
					try {
						sessionStorage.setItem('pendingScrollTarget', targetId);
					} catch (err) {}
					window.location.href = '/';
					return;
				}

				var target = document.getElementById(targetId);
				if (target) {
					$('body').removeClass('offcanvas overflow');
					$('.js-fh5co-nav-toggle').removeClass('active');
					$('html, body').animate({
						scrollTop: $(target).offset().top
					}, 600, 'easeInOutExpo');
				}
			} else {
				$('body').removeClass('offcanvas overflow');
				$('.js-fh5co-nav-toggle').removeClass('active');
			}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});

				}, 100);

			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		// Check if owlCarousel is available before calling it
		if (owl.length > 0 && typeof owl.owlCarousel === 'function') {
			owl.owlCarousel({
				items: 1,
				loop: true,
				margin: 0,
				responsiveClass: true,
				nav: false,
				dots: true,
				smartSpeed: 800,
				autoHeight: true,
			});
		} else if (owl.length > 0) {
			console.warn('Owl Carousel plugin not loaded. Retrying in 500ms...');
			// Retry after a short delay if plugin isn't loaded yet
			setTimeout(function() {
				if (typeof owl.owlCarousel === 'function') {
					owl.owlCarousel({
						items: 1,
						loop: true,
						margin: 0,
						responsiveClass: true,
						nav: false,
						dots: true,
						smartSpeed: 800,
						autoHeight: true,
					});
				} else {
					console.error('Owl Carousel plugin failed to load');
				}
			}, 500);
		}
	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');

			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function() {
		var $counter = $('.js-counter');
		if ($counter.length > 0 && typeof $counter.countTo === 'function') {
			$counter.countTo({
				formatter: function (value, options) {
					return value.toFixed(options.decimals);
				},
			});
		}
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter').length > 0 ) {
			$('#fh5co-counter').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Parallax
	var parallax = function() {
		if (typeof $(window).stellar === 'function') {
			$(window).stellar();
		}
	};


	$(function(){
		// Ensure jQuery is loaded before executing
		if (typeof $ === 'undefined' || typeof jQuery === 'undefined') {
			console.error('jQuery is not loaded');
			return;
		}

		mobileMenuOutsideClick();
		parallax();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		testimonialCarousel();
		goToTop();
		loaderPage();
		counter();
		counterWayPoint();
	});


}());
