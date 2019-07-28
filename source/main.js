define([
	'cubeView'
],function(cubeView){
	function main(){
		console.log("test2");
		this.iso = new cubeView();
		this.test();
		this.iso.test('120deg',0,0,0);
	};
	main.prototype = {
		test: function(){console.log("asdfasdf");}
	}
	return main;
});
