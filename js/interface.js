var InterfaceConstructor = function(){
	
	this.showCards = function loadCards(inputQuery){
		var query = (typeof inputQuery === 'string') ? inputQuery : '',
			interfaceConstThis = this;

		$.when( requestToServer.get(query) ).then( function(data){

			var cardsData = data.response.docs,
				template = $.templates("#cardTemplate"),
				htmlOutput;

			console.log(cardsData);
			
			if( cardsData.length < 1 ){
				alert( 'Nothing found.' );
			} else {
				interfaceConstThis.pickUpBestCardImg(cardsData)

				htmlOutput = template.render(cardsData);

				$('.cards-container').html(htmlOutput);
			}

			$('.search-form__input').val('');

		}, function(data){

			$('.search-form__input').val('');
			alert('Connection error!');
			console.log(data);

		});

	}


	this.pickUpBestCardImg = function setCardImage(cardsData){

		var subtype = ['xlarge', 'large', /*'wide',*/ /*'thumbnail'*/ ], //order sets priority
			minWidth = 120,
			minHeight = 120,
			defaultImg = 'http://mediamemo.allthingsd.com/wp-content/blogs.dir/20/files//2008/11/new-york-times-building.jpg',
			imgDomain = 'http://www.nytimes.com/'; //with trailing slash

		if( typeof cardsData !== 'object' || cardsData.length < 1 ){
			console.log('internal error');
			return false;
		}

		cardsData.forEach( function(oneCard){

			var i, j;

			//console.log(oneCard.multimedia);

			//search for subtype
			for( i=0; i<subtype.length; i++ ){
				for( j=0; j<oneCard.multimedia.length; j++ ){
					if( oneCard.multimedia[j].subtype === subtype[i] ){
						oneCard.imgPickedByFunction = imgDomain + oneCard.multimedia[j].url;
						break;
					}
				}
				if(typeof oneCard.imgPickedByFunction !== 'undefined'){
					break;
				}
			}

			//search for size
			if(typeof oneCard.imgPickedByFunction === 'undefined'){
				for( j=0; j<oneCard.multimedia.length; j++ ){
					if( oneCard.multimedia[j].width > minWidth && oneCard.multimedia[j].height > minHeight ){
						oneCard.imgPickedByFunction = imgDomain + oneCard.multimedia[j].url;
						break;
					}
				}
			}

			//if nothing found - set default
			if(typeof oneCard.imgPickedByFunction === 'undefined'){
				oneCard.imgPickedByFunction = defaultImg;
			}

		});

	}
	
}


