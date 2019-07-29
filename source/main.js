define([
	'cubeView'
],function(cubeView){
	function main(){
		console.log("test2");
		this.iso = new cubeView();
		this.test();
		//this.iso.test((180)+'deg',0,0,0);
		for(var z=0;z<4;z++){
			this.iso.addCube(this.iso.newBlock((z*90)+'deg'),0,0,z);
		};
		for(var x=1;x<4;x++){
			this.iso.addCube(this.iso.newBlock((0)+'deg'),x,0,0);
		}
		for(var y=2;y<4;y++){
			this.iso.addCube(this.iso.newBlock((90)+'deg'),0,y,0);
		}
		this.iso.drawAll();
	};
	main.prototype = {
		test: function(){console.log("asdfasdf");}
	}
	return main;
});
