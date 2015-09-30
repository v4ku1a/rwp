
var requestToServer = new RequestConstuctor(),
	interfaceAction = new InterfaceConstructor();

interfaceAction.showCards();

$('.search-form').on('submit', function(e){	
	e.preventDefault();
	interfaceAction.showCards( $('.search-form__input').val() );
});

//close modal with Esc key
$(document).on('keydown', function(e){
	if( e.keyCode === 27 ){
		window.location.hash = 'close';
	}
});