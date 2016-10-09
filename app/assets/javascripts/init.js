// app/assets/javascripts/init.js

if (window.PokemonApp === undefined){
	// window comes in the browser by default, where all global variables are kept
	window.PokemonApp = {};
}

PokemonApp.init = function() {
	// 3rd party code
	console.log("PokemonApp ONLINE!");
};

$(document).on("ready", function(){
	PokemonApp.init();
});