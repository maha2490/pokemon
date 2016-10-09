//evolutions.js

PokemonApp.Evolution = class {
	constructor (){

	}

	render (){
		$('.js-pkmn-evolutions').on('click', getEvolutions);

		console.log("Rendering evolutions");

		$(".js-evolutions-list").empty();

		PokemonApp.evolutionsArray.forEach(function (theEvolution){
			$.ajax({
			type: "GET", 
			url: theEvolution.resource_uri,
			success: PokemonApp.showEvolutions,
			error: PokemonApp.handleError
			}); // ajax
		});	 	

		$(".js-pokemon-evolutions").modal("show");
		

	} // render

} // class 	

		function getEvolutions(event){
			$.ajax({
			type: "GET", 
			url: "/api/pokemon/" + this.id,
			success: function(response){
				console.log(response); // keep to see poke obj structure
				}
			});
		}



$(document).on("ready", function)
