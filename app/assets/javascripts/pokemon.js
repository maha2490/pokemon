//app/assets/javascripts/pokemon.js


PokemonApp.Pokemon = class {
	constructor (pokemonUri){
		this.id = PokemonApp.idFromUri(pokemonUri);
	}

	render (){
		console.log("Rendering pokemon: # " + this.id);


//_______________DISPLAY POKE INFO IN MODAL_____________________________________________________
		
		$.ajax({
			type: "GET", 
			url: "/api/pokemon/" + this.id,
			success: function(response){
				console.log(response); // keep to see poke obj structure
				$(".js-pkmn-types").empty();

				var pkmn_types = response.types
				// join instead of for each???
				pkmn_types.forEach(function(type){
					var availableTypes = 
					` 
						${type.name + "  "}
						`;

					$(".js-pkmn-types").prepend(availableTypes);
				});

				$(".js-pkmn-name").text(response.name);
				$(".js-pkmn-number").text(response.pkdx_id);
				$(".js-pkmn-height").text(response.height);
				$(".js-pkmn-weight").text(response.weight);
				$(".js-pkmn-hp").text(response.hp);
				$(".js-pkmn-attack").text(response.attack);
				$(".js-pkmn-defense").text(response.defense);
				$(".js-pkmn-sp_atk").text(response.sp_atk);
				$(".js-pkmn-sp_def").text(response.sp_def);
				$(".js-pkmn-speed").text(response.speed);


				$(".js-pokemon-modal").modal("show");

				

//_______________DISPLAY SPRITE___________________________________________________________
				
				var pokeSprite = response.sprites[0].resource_uri;

				$.ajax({
					type: "GET", 
					url: pokeSprite,
					success: function(url){
						$(".js-sprite").empty();
						var sprite = `
							<img src="http://pokeapi.co/${url.image}"  
								class="result_img" alt="pic" height="130" width="100">
							`;
						$(".js-sprite").prepend(sprite);
					}
				});

//_______________DISPLAY DESCRIPTION_____________________________________________________

				var pokeDescription = response.descriptions.reverse();
				var latestDescription = pokeDescription[0].resource_uri;
				$.ajax({
					type: "GET",
					url: latestDescription,
					success: function(response){
						$(".js-pkmn-description").empty();
						console.log(response);
						var description = `
							${response.description}
							`;
						$(".js-pkmn-description").prepend(description);

						PokemonApp.evolutionsArray = response.evolutions;
					}
				}); // Ajax 3


//_______________EVOLUTIONS_____________________________________________________________
				
				$('.js-pkmn-evolutions').on('click', getEvolutions);
				
				function getEvolutions(event){
					$.ajax({
					type: "GET", 
					url: "/api/pokemon/" + this.id,
					success: function(response){
						console.log(response); // keep to see poke obj structure
						$(".js-pkmn-types").empty();




						$(".js-pokemon-evolutions").modal("show");
					}

					});
				}
			
				// name, sprite on modal

				

			} //first success end, error function would follow

		}); // Ajax 1

	} // render
}
//_______________GETTING POKE ID ______________________________________________________________

												   // uri similar to Spotify artist ID
PokemonApp.idFromUri = function (pokemonUri){  //     0      1        2       3     4
	var uriSegments = pokemonUri.split("/");   // [ "api", "v1", "pokemon", "160", ""]
	var secondLast = uriSegments.length - 2;   // length = 5
	return uriSegments[secondLast];			   // second last
}


//_______________EVENTS________________________________________________________________________

$(document).on("ready", function(){
	$('.js-show-button').on('click', function(event){
		var $button = $(event.currentTarget);			
		var pokemonUri = $button.data("pokemon-uri");  
														
		var pokemon = new PokemonApp.Pokemon(pokemonUri);  
		pokemon.render();
	});
});	
	
