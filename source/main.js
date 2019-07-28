define([
	'cubeView'
],function(cubeView){
	function main(){
		console.log("test2");
		this.iso = new cubeView();
		this.test();
		//this.iso.test((180)+'deg',0,0,0);
		for(var x=0;x<20;x++){
			for(var y=0;y<20;y++){
				var tint = (x+y)*20%360
				this.iso.test((tint)+'deg',x,y,0);
			}
		};
	};
	main.prototype = {
		test: function(){console.log("asdfasdf");}
	}
	return main;
});
