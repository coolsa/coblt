define([],function(){
	function cubeList(){
		this._start = null;
		this.length = 0;
	};
	cubeList.prototype = {
		push: function(cube,spot){
			if(this.length==0)
				this._start = cube;
			else if(spot){
				cube._next = spot._next;
				spot._next = cube;
			}
			else{
				var pos = this._start;
				if(pos)while(pos._next!=null) pos = pos._next;
				pos._next=cube;
			}
			this.length++;
		},
		pop: function(cube){
			if(this.length==0)
				throw("No nodes left to pop");
			if(cube==this._start){
				if(!cube._next){
					this._start=null;
					this.length=0;
					return cube;
				}
				this._start = cube._next;
			}
			else{
				var pos = this._start;
				while(pos._next=!cube)
					pos=pos._next;
				if(cube)
					pos._next=cube._next;
				else pos._next = null;
			}
			this.length--;
			return cube;
		},
		mergeSort: function(){
			if(this.length<=1) return; //end if its only 1.
			var left = new cubeList(),
				right = new cubeList(),
				pos = this._start;
			for(i=0;i<this.length;i++){
				if(i<this.length/2)
					left.push(copy(pos));
				else
					right.push(copy(pos));
				pos=pos._next;
			};
			left.mergeSort();
			right.mergeSort();
			this._start = mergeList(left,right)._start;
		},
		forEach: function(execute){
			var pos = this._start;
			while(pos){
				execute(pos);
				pos=pos._next;
			}
		},
		newCube: function(ent,pos){
			this.push(new cubeNode(ent,pos));
		}
	};
	function mergeList(left, right){
		var list = new cubeList();
		while(left._start && right._start){
			if(left._start._pos.z<right._start._pos.z){
				list.push(copy(left._start));
				left.pop(left._start);
			}
			else if(left._start._pos.z==right._start._pos.z){
				if(left._start._pos.x<right._start._pos.x){
					list.push(copy(left._start));
					left.pop(left._start);
				}
				else if(left._start._pos.x==right._start._pos.x){
					if(left._start._pos.y<right._start._pos.y){
						list.push(copy(left._start));
						left.pop(left._start);
					}
					else if(left._start._pos.y==right._start._pos.y){
						throw("Two cubes are in the same space.");
					}
					else{
						list.push(copy(right._start));
						right.pop(right._start);
					}
				}
				else{
					list.push(copy(right._start));
					right.pop(right._start);
				}

			}
			else{
				list.push(copy(right._start));
				right.pop(right._start);
			}
		}
		while(left._start){
			list.push(copy(left._start));
			left.pop(left._start);
		}
		while(right._start){
			list.push(copy(right._start));
			right.pop(right._start);
		}
		return list;
	}
	function cubeNode(ent=null,pos = {x: null, y: null, z: null},next=null){
		this._ent = ent;
		this._pos = pos;
		this._command = null; //this is going to cointain the line that defines this block.
		//i guess since if its drawing, it goes in order of lowest z to lowest y to lowest x,
		//it can act sort of like a line???
		//1d is easy to deal with, as in this case i only really need a start.
		//and then i can easily sort it as well.
		//and even easier, drawing!
		this._next = next;
	};
	function copy(cube){
		return new cubeNode(cube._ent,cube._pos);
	};
	return cubeList;
});
