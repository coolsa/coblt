define([
	'cubeView'
],function(cubeView){
	function main(){
		console.log("test2");
		this.iso = new cubeView();
		this.test();
	};
	main.prototype = {
		test: function(){console.log("asdfasdf");}
	}
	return main;
});
