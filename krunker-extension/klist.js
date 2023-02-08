document.getElementById('request-links').onclick = function(){

	function createAnchor(title, url) {     // Create anchor element.
    let a = document.createElement('a');     // Create the text node for anchor element.
    let link = document.createTextNode(title);     // Append the text node to anchor element.
    a.appendChild(link);     // Set the title.
    a.title = title;     // Set the href property.
    a.href = url;
    return a;
}
	
    fetch('https://matchmaker.krunker.io/game-list?hostname=krunker.io', {})
	.then(response => response.json())
	.then(data => {
		document.getElementById('result').innerHTML = "";
		let gamesArray=[]
		let url= "https://krunker.io/?game="

		gamesArray= data.games.filter((game) => {
			return (game[1]=="de-fra" && (game[3]-game[2])>5 && game[2]>0 && game[4].c==0)
		})

		gamesArray.sort();

		for (var i = 0; i < gamesArray.length; i++){
			game= gamesArray[i]
			parameters= game[4]
			mappa= parameters.i
			let title = "Mappa: "+ mappa
			let link=  url + game[0];
			let anchor= '<a href="'+link+'">'+mappa+'</a>'
			document.getElementById('result').innerHTML += '<li>'+anchor+'</li>';

		}

		
		// for (let i = 0; i < jsonArray.length; i++) {
		// 	//console.log(data[i]);
		// 	const jsonString = JSON.stringify(jsonArray[i]);
		// 	console.log(jsonString);
		// 	document.getElementById('result').innerHTML = jsonString;
			
		//   }
		// const jsonString = JSON.stringify(jsonArray);
		// console.log(jsonString);
		// document.getElementById('result').innerHTML = jsonString;
	})
	.catch(error => {
		console.error('Error fetching data:', error);
	});
}