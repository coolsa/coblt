define([
	'crafty',
	'jquery'
],function(Crafty,$){
	function cubeView(){
		Crafty.init(1000,500,$("#iso-view")[0]);
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
			empty:[5,5]
		})
		Crafty.addEvent(this, Crafty.stage.elem, "mousedown", function(e){
			if(e.button>1) return;
			var base = {x: e.clientX, y: e.clientY};
			function scroll(e){
				var dx = base.x - e.clientX,
					dy = base.y - e.clientY ;
					base = {x: e.clientX, y: e.clientY};
				Crafty.viewport.x-=dx/Crafty.viewport._scale;
				Crafty.viewport.y-=dy/Crafty.viewport._scale;
			};
			Crafty.addEvent(this, Crafty.stage.elem, "mousemove", scroll);
			Crafty.addEvent(this, Crafty.stage.elem, "mouseup", function(){
				Crafty.removeEvent(this, Crafty.stage.elem, "mousemove",scroll);
			});
		});
		Crafty.bind("MouseWheelScroll",function(e){
			asdf = e;
			var zoom = 1+e.direction/20,
				pos = {
					x: (e.realX+Crafty.viewport.x)*Crafty.viewport._scale,
					y: (e.realY+Crafty.viewport.y)*Crafty.viewport._scale
				};
			if((Crafty.viewport._scale>20&&zoom>1)||(Crafty.viewport._scale<0.1&&zoom<1)) return;
			Crafty.viewport.scale(zoom*Crafty.viewport._scale);
			var mousePos ={x: (1-e.clientX)/Crafty.viewport._scale, y: (1-e.clientY)/Crafty.viewport._scale}
			Crafty.viewport.x=(pos.x)/Crafty.viewport._scale-e.realX;
			Crafty.viewport.y=(pos.y)/Crafty.viewport._scale-e.realY;
		});
		this.isoGrid = Crafty.diamondIso.init(32,16,20,20);
	};
	cubeView.prototype = {
		test: function(hue='-90deg',x=4,y=0,z=0){
			ent = Crafty.e('2D', 'Canvas','DOM','Mouse','Sprite','empty')
			.areaMap(16,0, 0,8, 0,24, 16,32, 32,24, 32,8)
			.attach(
				Crafty.e('2D','DOM','Sprite','transparent')
					.css('filter','hue-rotate('+hue+')')
					.css('image-rendering','crisp-edges')
					.css('image-rendering','pixelated'),
				Crafty.e('2D','DOM','Sprite','empty')
					.css('image-rendering','crisp-edges')
					.css('image-rendering','pixelated')

			)
			.bind('MouseOver',function(e){
				this._children[2].sprite('select');
				this._children[2].draw();
				this.bind('MouseOut',function(e){
					this._children[2].sprite('empty');
					this._children[2].draw();
					this.unbind('MouseOut');
				});
			})
			.bind('Click',function(e){
				this.destroy();
			});
			this.isoGrid.place(ent,x,y,z);
			ent.draw();
		}
	}
	return cubeView;
});
