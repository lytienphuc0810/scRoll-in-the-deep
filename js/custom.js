$(document).ready(function(){

	// var $header = $('#row-header').height();
	// var $search = $('#row-search').height();
	
	
	// $(window).resize(function() {
	// 	var $winsize = $(window).width();
	// 	if($winsize<640){
	// 		$('.setting-drop').addClass('dropup');
	// 		//alert('123');
	// 	}else{
	// 		$('.setting-drop').removeClass('dropup');
	// 	}
	// $(window).trigger('resize');
	dropup = function() {
		$(".dropdown-toggle").each(function(){ 
			par=$(this).parents('.btn-group');
			dropl=par.find('ul');
			otop=$(this).offset().top+$(this).height()-$(window).scrollTop();
			ulh=dropl.height();
			obot=$(window).height()-$(this).height()-$(this).offset().top+$(window).scrollTop();

			if ((obot < ulh) && (otop > ulh)) {
				par.addClass('dropup');
			} else {
				par.removeClass('dropup');
			}

		});
	} 

	$(window).load(dropup);
	$(window).bind('resize scroll touchstart touchmove mousewheel', dropup);


	$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });

	$('.dropdown-toggle').click(function(e) {
		e.preventDefault();
		setTimeout($.proxy(function() {
			if ('ontouchstart' in document.documentElement) {
				$(this).siblings('.dropdown-backdrop').off().remove();
			}
		}, this), 0);
	});

	$( document.body ).on( 'click', '.dropdown-menu li', function( event ) {

		var $target = $( event.currentTarget );
		
	//MAP 1
	if($target.text()=="総武本線(千葉～銚子)"){
		$(".select-2 ul").empty();
		var options1 = [
		{href: "#", text:"稲　　毛"},
		{href: "#", text:"千　　葉"},
		{href: "#", text:"東千葉"},
		{href: "#", text:"都　　賀"},
		{href: "#", text:"四街道"},
		{href: "#", text:"佐　　倉"},

		{href: "#", text:"南酒々井"},
		{href: "#", text:"榎　　戸"},
		{href: "#", text:"八　　街"},
		{href: "#", text:"日　　向"},
		{href: "#", text:"成　　東"},
		{href: "#", text:"松　　尾"},		    

		{href: "#", text:"横　　芝"},
		{href: "#", text:"八日市場"},
		{href: "#", text:"干　　潟"},
		{href: "#", text:"旭"},
		{href: "#", text:"飯　　岡"},
		{href: "#", text:"猿　　田"},
		{href: "#", text:"松　　岸"},
		{href: "#", text:"銚　　子"}			    			    		    
		];

		$(".station-first").empty();
		$(".station-first").append(options1[0].text);

		for(var index = 0; index < options1.length; index++){
			$(".select-2 ul").append($("<li>", {}).append($("<a>",{ href: options1[index].href }).text(options1[index].text)));
		}

	}

	// MAP 2
	if($target.text()=="外房線(千葉～安房鴨川)"){
		$(".select-2 ul").empty();
		var options2 = [
		{href: "#", text:"稲　　毛"},
		{href: "#", text:"千　　葉"},
		{href: "#", text:"東千葉"},
		{href: "#", text:"本千葉"},
		{href: "#", text:"蘇　　我"},
		{href: "#", text:"鎌　　取"},


		{href: "#", text:"誉　　田"},
		{href: "#", text:"土　　気"},
		{href: "#", text:"大　　網"},
		{href: "#", text:"永　　田"},
		{href: "#", text:"本　　納"},
		{href: "#", text:"新茂原"},		    

		{href: "#", text:"茂　　原"},
		{href: "#", text:"八　　積"},
		{href: "#", text:"上総一宮"},
		{href: "#", text:"東浪見"},
		{href: "#", text:"太　　東"},
		{href: "#", text:"長者町"},		


		{href: "#", text:"大　　原"},
		{href: "#", text:"浪　　花"},
		{href: "#", text:"御　　宿"},
		{href: "#", text:"勝　　浦"},
		{href: "#", text:"鵜　　原"},
		{href: "#", text:"上総興津	"},		

		{href: "#", text:"安房小湊"},
		{href: "#", text:"安房天津"},
		{href: "#", text:"安房鴨川"}				    			    		    
		];

		$(".station-first").empty();
		$(".station-first").append(options2[0].text);

		for(var index = 0; index < options2.length; index++){
			$(".select-2 ul").append($("<li>", {}).append($("<a>",{ href: options2[index].href }).text(options2[index].text)));
		}
}

	// MAP 3
	if($target.text()=="内房線(千葉～安房鴨川)"){
		$(".select-2 ul").empty();
		var options = [
		{href: "#", text:"稲　　毛"},
		{href: "#", text:"千　　葉"},
		{href: "#", text:"東千葉"},
		{href: "#", text:"本千葉"},
		{href: "#", text:"蘇　　我"},
		{href: "#", text:"浜　　野"},	 
		{href: "#", text:"八幡宿"},
		{href: "#", text:"五　　井"},
		{href: "#", text:"姉ヶ崎"},
		{href: "#", text:"長　　浦"},
		{href: "#", text:"袖ヶ浦"},
		{href: "#", text:"巌　　根"},		    
		{href: "#", text:"木更津"},
		{href: "#", text:"君　　津"},
		{href: "#", text:"青　　堀"},
		{href: "#", text:"大　　貫"},
		{href: "#", text:"佐貫町"},
		{href: "#", text:"上総湊"},		
		{href: "#", text:"竹　　岡"},
		{href: "#", text:"浜金谷"},
		{href: "#", text:"保　　田"},
		{href: "#", text:"安房勝山"},
		{href: "#", text:"岩　　井"},
		{href: "#", text:"富　　浦	"},		
		{href: "#", text:"那古船形"},
		{href: "#", text:"館　　山"},
		{href: "#", text:"九　　重"},
		{href: "#", text:"千　　倉"},
		{href: "#", text:"南三原"},
		{href: "#", text:"和田浦"},		
		{href: "#", text:"江　　見"},
		{href: "#", text:"太　　海"},
		{href: "#", text:"安房鴨川"}			  
		];

		$(".station-first").empty();
		$(".station-first").append(options[0].text);

		for(var index = 0; index < options.length; index++){
			$(".select-2 ul").append($("<li>", {}).append($("<a>",{ href: options[index].href }).text(options[index].text)));
		}

		;
	}	

	// MAP 4
	if($target.text()=="京葉線(東京～蘇我)"){
		$(".select-2 ul").empty();
		var options = [
		{href: "#", text:"東　　京"},
		{href: "#", text:"八丁堀"},
		{href: "#", text:"越中島"},
		{href: "#", text:"潮　　見"},
		{href: "#", text:"新木場"},
		{href: "#", text:"葛西臨海公園"},
		{href: "#", text:"舞　　浜"},
		{href: "#", text:"新浦安"},
		{href: "#", text:"市川塩浜"},
		{href: "#", text:"二俣新町"},
		{href: "#", text:"西船橋"},
		{href: "#", text:"南船橋"},				    
		{href: "#", text:"新習志野"},
		{href: "#", text:"海浜幕張"},
		{href: "#", text:"検見川浜"},
		{href: "#", text:"稲毛海岸"},
		{href: "#", text:"千葉みなと"},
		{href: "#", text:"蘇我"}			    		    
		];		

		$(".station-first").empty();
		$(".station-first").append(options[0].text);

		for(var index = 0; index < options.length; index++){
			$(".select-2 ul").append($("<li>", {}).append($("<a>",{ href: options[index].href }).text(options[index].text)));
		}



	}		

	$target.closest( '.btn-group' )
	.find( '[data-bind="label"]' ).text( $target.text() )
	.end()
	.children( '.dropdown-toggle' ).dropdown( 'toggle' );

	return false;

});   

$('.select-1 ul.dropdown-menu li a').click(function(){

	var imgbg = $(this).attr('class');
		//console.log(imgbg);
		$('#train-map img').attr("src",imgbg);
		
	});



});