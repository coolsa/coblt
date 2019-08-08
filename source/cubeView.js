define([
	'crafty',
	'jquery',
	'cubeList'
],function(Crafty,$,cubeList){
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
		Crafty.background('#eeeeee');
		this.isoGrid = Crafty.isometric.size(32,16);//Crafty.diamondIso.init(32,16,20,20);
		this.isoGrid.cubes = new cubeList();
	};
	cubeView.prototype = {
		newBlock: function(hue='0deg'){
			var that = this;
			return Crafty.e('2D', 'Canvas','DOM','Mouse','Sprite','empty')
			.areaMap(16,0, 0,8, 0,24, 16,32, 32,24, 32,8)
			.css('image-rendering','crisp-edges')
			.css('image-rendering','pixelated')
			.attach(
				Crafty.e('2D','DOM','Sprite','solid')
					.css('filter','hue-rotate('+hue+')')
					.css('image-rendering','crisp-edges')
					.css('image-rendering','pixelated'),
				Crafty.e('2D','DOM','Sprite','empty')
					.css('image-rendering','crisp-edges')
					.css('image-rendering','pixelated'),
				Crafty.e('2D','DOM','Sprite','empty')
					.css('image-rendering','crisp-edges')
					.css('image-rendering','pixelated'),
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
				this._cube._list.pop(this._cube);
				this.destroy();
			});
		},
		addCube: function(ent, x, y, z){
			this.isoGrid.cubes.newCube(ent,{x:x,y:y,z:z});
		},
		place: function(ent, x, y, z){
			//this is going to be a fun one, manually recoding placing to work better, for all cases! wowzers.
			var pos = this.pos2px(x,y,z);
			ent.x = pos.x;
			ent.y = pos.y/2 - (ent._h - 2*this.isoGrid._tile.height)-this.isoGrid._tile.height*z;
			ent.z = (x+y+z)*4;
			ent._children[1].z=ent.z+1;
			ent._children[2].z=ent.z+2;
			ent._children[3].z=ent.z+3;
			//console.log(ent._globalZ);
			ent._children[1].css('z-index',(ent._globalZ+1).toString);
			ent._children[2].css('z-index',(ent._globalZ+2).toString);
			ent._children[3].css('z-index',(ent._globalZ+3).toString);
			//console.log(ent._globalZ);
		},
		pos2px: function(x,y,z){
			return {
				x:((x-y-1)*this.isoGrid._tile.width/2),
				y:((x+y)*this.isoGrid._tile.width/2),
				z:(x+y+z)*3
			};
			//take these x,y,z values and convert them into useful values for the grid.
		},
		drawAll: function(order = this.isoGrid.cubes._order){
			var windowPos = {x:Crafty.viewport._x,y:Crafty.viewport._y};
			var that = this;
			this.isoGrid.centerAt(0,0);
			Crafty.viewport.reset();
			//this.isoGrid.cubes.mergeSort(order);
			this.isoGrid.cubes.forEach(function(cube,list){
				//if(!cube._ent._children[0]){
				//	list.pop(cube);
				//	return;
				//}
				that.place(cube._ent,cube._pos[order[1]]*order[4],cube._pos[order[2]]*order[5],cube._pos[order[0]]*order[3])
				if(cube._direction[0]==1){
					if(cube._direction[3]==true)
						cube._ent._children[3].sprite('pos_x_cond');
					else cube._ent._children[3].sprite('pos_x_norm');
				}
				else if(cube._direction[0]==-1){
					if(cube._direction[3]==true)
						cube._ent._children[3].sprite('neg_x_cond');
					else cube._ent._children[3].sprite('neg_x_norm');
				}
				else if(cube._direction[1]==1){
					if(cube._direction[3]==true)
						cube._ent._children[3].sprite('pos_y_cond');
					else cube._ent._children[3].sprite('pos_y_norm');
				}
				else if(cube._direction[1]==-1){
					if(cube._direction[3]==true)
						cube._ent._children[3].sprite('neg_y_cond');
					else cube._ent._children[3].sprite('neg_y_norm');
				}
				else if(cube._direction[2]==1){
					if(cube._direction[3]==true)
						cube._ent._children[3].sprite('pos_z_cond');
					else cube._ent._children[3].sprite('pos_z_norm');
				}
				else if(cube._direction[2]==-1){
					if(cube._direction[3]==true)
						cube._ent._children[3].sprite('neg_z_cond');
					else cube._ent._children[3].sprite('neg_z_norm');
				}
				else cube._ent._children[3].sprite('empty');
				cube._ent.draw();
			})
			Crafty.viewport.x = windowPos.x;
			Crafty.viewport.y = windowPos.y;
		},
		rotate: function(axis,direction=1){ //rotates in 90 deg chunks around axis.
			//this assumes that the x direction is towards the bottom-right, y is towards bottom-left, and z is towards top. ALWAYS.
			//z = 0, y = 1, x = 2
			if(!axis){
				this.drawAll(['z','y','x',1,1,1]);
				return;
			}
			var swaps = []
			var oldOrder = this.isoGrid.cubes._order;
			if(axis == 'x') swaps = [0,1];
			if(axis == 'y') {swaps = [0,2]; direction *= -1;}; //basically right hand rule, point thumb in direction of axis, curl fingers, thats the rotation direction
			if(axis == 'z') swaps = [1,2];
			if(direction == -1) swaps = [swaps[1],swaps[0]];
			var temp = oldOrder[swaps[0]+3];
			oldOrder[swaps[0]+3] = oldOrder[swaps[1]+3];
			oldOrder[swaps[1]+3] = temp * -1;
			temp = oldOrder[swaps[0]];
			oldOrder[swaps[0]]=oldOrder[swaps[1]]
			oldOrder[swaps[1]]=temp;
			this.isoGrid.cubes.forEach(function(cube){
				temp = cube._direction[swaps[0]];
				cube._direction[swaps[0]] = cube._direction[swaps[1]]*-1;
				cube._direction[swaps[1]] = temp;
			});
			this.drawAll(oldOrder);
		}
	}
	return cubeView;
});
