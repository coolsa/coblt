define([]),function(){
	function cubeList(start=null,end=null){
		this._start = start;
		this._end=end;
		this.length = 0;
	};
	cubeList.prototype = {
		push: function(cube,ent,pos){
			if(!this._start&&!this._end){
				this._start = this._end = cube;
			}
			if(!cube)
				cube = this._end;
			if(cube == this._end){
				cube._next = node(ent,pos,null,cube);
				this._end = cube._next;
			};
			else{
				cube._next._prev = node(ent,pos,cube._next,cube);
				cube._next = cube._next._prev;
			};
			this.length++;
		},
		pop: function(cube){
			if(!cube._next && !cube._prev)
				throw("Cannot delete last cube in list");
			if(cube == this._start)
				this._start = cube._next;
			if(cube == this._end)
				this._end = cube._prev;
			if(!cube._next){
				cube._prev._next = null;
			}
			else if(!cube._prev){
				cube._next._prev = null;
			}
			else{
				cube._next._prev = cube._prev;
				cube._prev._next = cube._next;
			}
			this.length--;
		},
		sort: function(list=null){
			if(this.length<=1) return; //end if its only 1.
			
			left = cubeList();
			right = cubeList();
		},
		merge: function(left, right){
			left._end._next = right._start;
			right._start._prev = left._end;
			left._end = right._end;
		},
		copy: function(cube){
			return node(cube._ent,cube._pos);
		}
	};
	function node(ent,pos = {x: null, y: null, z: null}, next = null, prev = null){
		this._ent = ent;
		this._pos = pos;
		this._command = null; //this is going to cointain the line that defines this block.
		//i guess since if its drawing, it goes in order of lowest z to lowest y to lowest x,
		//it can act sort of like a line???
		//1d is easy to deal with, as in this case i only really need a start.
		//and then i can easily sort it as well.
		//and even easier, drawing!
		this._next = next;
		this._prev = prev;
	};
	return cubeList;
});
