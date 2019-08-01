define([
	'cubeView'
],function(cubeView){
	function main(){
		console.log("test2");
		this.iso = new cubeView();
		this.test();
		//this.iso.test((180)+'deg',0,0,0);
//		this.iso.addCube(this.iso.newBlock('100deg'),0,0,0);
//		this.iso.addCube(this.iso.newBlock('0deg'),2,2,0);
//		this.iso.addCube(this.iso.newBlock('200deg'),4,4,1);
		for(var z=1;z<3;z++){
			for(var x=0;x<20/z;x++){
				for(var y=0;y<20/z;y++){
					var tint = (x+y)*20%360
					this.iso.addCube(this.iso.newBlock((tint)+'deg'),x,y,z);
				}
			}
		};
		this.iso.drawAll();
	};
	main.prototype = {
		test: function(){console.log("asdfasdf");}
	}
	return main;
});
