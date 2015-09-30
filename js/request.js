function RequestConstuctor(key){

	this.key = (typeof key === 'undefined') ? "7b5b57e062f9a3e69e3ab82924245684:7:73058569" : key;

	this.url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json';

	this.get = function get(inputQuery){

		var def,
			dataToSend = { 
				'api-key': this.key,
				'sort': 'newest'
			};

		if( typeof inputQuery === 'string' && inputQuery.length > 0 ){
			dataToSend.q = inputQuery;
		}		

		def = $.ajax({
			type: 'GET',
			url: this.url,
			data: dataToSend
		});

		return def.promise();

	}

}