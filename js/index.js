$('.slider').owlCarousel({
	addClassActive: true,
	singleItem: true,
	navigation: true,
	navigationText: ['<button class="btn btn-primary btn-circle"><span class="fa fa-chevron-left"></span></button>', '<button class="btn btn-primary btn-circle"><span class="fa fa-chevron-right"></span></button>']
});

var buyBtn 		= $('.cat-item').find('.btn'),
	 overlayBg 	= $('.overlay-bg'),
	 overlay 	= $('.overlay-wrap');

overlayBg.hide();
overlay.hide();

buyBtn.on('click', function(e){
	e.preventDefault();
	overlayBg.show().addClass('active');
	overlay.show().addClass('active');
})