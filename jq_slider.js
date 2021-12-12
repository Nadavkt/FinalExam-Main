
// JQuery Document
$(document).ready(function() {

	if( $('slider').length > 0 ) sliderInit();

});

(function($){

	//---------- sliders ----------
	sliderInit=function(){
		$('slider').each(function(){
			var slin=$(this).find('slidein'); var siW=slin.outerWidth();
			var slct=$(this).find('slidect');
			slct.find('scell').css({ width: siW });
			var ctW= slct.find('scell').length * siW; 
			slct.css({ width: ctW, opacity: 1 });
			
			if( $(this).attr('data-anim')!=undefined && $(this).find('onglets a').length > 1 ) sliderAnim({ elem : $(this) });
			
		});	  
	}
	slide=function(params){
		var params = params || {};
		var elem=params['elem'];
	  
		$(elem).closest('slider').find('onglets a').removeClass('in');
	  
		var pos=$(elem).closest('slider').find('#pos'); var slidect=$(elem).closest('slider').find('slidect'); var slidein=$(elem).closest('slider').find('slidein');
		var siW=slidein.outerWidth();
	  
		pos.val( params['pos'] ); var newPos= ( params['pos'] * siW );
		slidect.animate({ marginLeft: -newPos }, 1000);
		$(elem).addClass('in');
	} 
	sliderAnim=function(params){
		var params = params || {};
		var elem=params['elem'];
		
		setInterval(function(){ 
			var pos=$(elem).closest('slider').find('#pos');
			var nbSlide = $(elem).closest('slider').find('slidect scell').length;
			if( pos.val() >= (nbSlide - 1) ) var newPos=0;
			else var newPos= parseInt( pos.val() ) + 1;
			
			slide({ pos: newPos, elem: $(elem).find('a:nth-child('+(newPos+1)+')') });
		}, 8000 );
	}
  
})(jQuery)
