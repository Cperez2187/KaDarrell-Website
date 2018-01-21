$(window).load(function(){
	$('#preloader').fadeOut('slow',function(){$(this).remove();});
});


/******************************************************************************************************************************
Learn More Page Scroll
*******************************************************************************************************************************/
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

/******************************************************************************************************************************
Menu
*******************************************************************************************************************************/ 
(function() {

	var bodyEl = document.body,
		//content = document.querySelector( '.content-wrap' ),
		openbtn = document.getElementById( 'open-button' ),
		closebtn = document.getElementById( 'close-button' ),
		isOpen = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', toggleMenu );
		if( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}

		/* close the menu element if the target it´s not the menu element or one of its descendants..
		content.addEventListener( 'click', function(ev) {
			var target = ev.target;
			if( isOpen && target !== openbtn ) {
				toggleMenu();
			}
		} );
		*/
	}

	function toggleMenu() {
		if( isOpen ) {
			classie.remove( bodyEl, 'show-menu' );
		}
		else {
			classie.add( bodyEl, 'show-menu' );
		}
		isOpen = !isOpen;
	}

	init();

})();

// Contact form
$('#contact-form').submit(function (e) {
	var email 	= $('#email'),
			name = $('#name'),
			message = $('#message');

	console.log('email = ', email['0'].value);
	console.log('name = ', name['0'].value);
	console.log('message = ', message['0'].value);

	//if any field is empty
	if (!email['0'].value || !name['0'].value || !message['0'].value) {
		// Display error message
		$('#contact-form-div').append('<div class="alert alert-danger alert-dismissible" role="alert">' +
		'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + 
		'One or more fields are empty, try again.</div>');
		// Prevent browser from redirecting
		e.preventDefault();

	} else {
		// Make request to send email
		$.ajax({
			url: "https://formspree.io/anthonykadarrellthigpen@gmail.com", 
			method: "POST",
			data: $(this).serialize(),
			dataType: "json"
		}).then(function (data, textStatus) {
			console.log(textStatus);
			console.log('Success!');
			// Display success message
			$('#contact-form-div').append('<div class="alert alert-success alert-dismissible" role="alert">' +
				'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + 
				'<strong>Message sent</strong></div>');
		}, function (jqXHR, textStatus) {
			console.log(textStatus);
		});
		// Prevent browser from redirecting
		e.preventDefault();
		// Reset form fields
		$(this).get(0).reset();
		
	}
});


