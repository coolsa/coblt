define([
	'crafty',
	'jquery'
],function(Crafty,$){
	function cubeView(){
		this.value=5;
			Crafty.init(1000,1000,$("#iso-view")[0]);
			Crafty.pixelart(true);
			Crafty.sprite(32,"images/sprites.png",{
				pos_x_norm: [0,0],
				neg_x_norm: [1,0],
				pos_y_norm: [0,2],
				neg_y_norm: [1,2],
				pos_z_norm: [0,1],
				neg_z_norm: [1,1],
				pos_x_cond: [2,0],
				neg_x_cond: [3,0],
				pos_y_cond: [2,2],
				neg_y_cond: [3,2],
				pos_z_cond: [2,1],
				neg_z_cond: [3,1],
				solid: [0,3],
				transparent: [1,3],
				special: [2,3],
				select: [3,3],
				empty: [-1,-1]
			})
			this.isoGrid = Crafty.diamondIso.init(32,32,20,20);

	};
	cubeView.prototype = {
		test: function(){
			console.log("Test");
		}
	}
	return cubeView;
});
