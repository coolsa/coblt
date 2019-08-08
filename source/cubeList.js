define([],function(){
	function cubeList(){
		this._start = null;
		this.length = 0;
		this._range = {x:[0,0],y:[0,0],z:[0,0]};
		this._order = ['z','x','y',1,1,1]; //z draws over every other lower z, then x draws over every lower x, but not higher z, then y draws over lower y, but none others...
	};
	cubeList.prototype = {
		push: function(cube,spot){
			if(!cube) return;
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
			var axis = ['x','y','z']; //shoutouts to my 4d pals, gotta make this a variable.
			for(var i=0; i<axis.length;i++){
				if(cube._pos[axis[i]]<this._range[axis[i]][0]) this._range[axis[i]][0]=cube._pos[axis[i]]
				else if(cube._pos[axis[i]]>this._range[axis[i]][1]) this._range[axis[i]][1]=cube._pos[axis[i]]
			}
			cube._list = this;
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
				this._start = this._start._next;
			}
			else{
				var pos = this._start;
				while(pos._next!=cube)
					pos=pos._next;
				if(cube)
					pos._next=cube._next;
				else pos._next = null;
			}
			this.length--;
			return cube;
		},
		mergeSort: function(order = this._order){
			this._order = order; //if someone sets it, I GOTTA KNOW.
			if(this.length<=1) return; //end if its only 1.
			var left = new cubeList(),
				right = new cubeList(),
				pos = this._start;
			for(i=0;i<this.length&&pos;i++){
				if(i<this.length/2)
					left.push(copy(pos));
				else
					right.push(copy(pos));
				pos=pos._next;
			};
			left.mergeSort(order);
			right.mergeSort(order);
			this._start = mergeList(left,right,this._order)._start;
	  	},
		forEach: function(execute){
			var pos = this._start;
			while(pos){
				execute(pos,this);
				pos=pos._next;
			}
		},
		newCube: function(ent,pos,list=this){
			this.push(new cubeNode(ent,pos,list));
		}
	};
	function mergeList(left, right, order = ['z','x','y',1,1,1]){
		var list = new cubeList();
		while(left._start && right._start){
			for(i=0;i<order.length/2;i++){
				if(left._start._pos[order[i]]*order[i+3]<right._start._pos[order[i]]*order[i+3]){
					list.push(copy(left._start));
					left.pop(left._start);
					i=3;
				}
				else if(left._start._pos[order[i]]*order[i+3]==right._start._pos[order[i]]*order[i+3]){
					if(i==2)	throw(["Two cubes are in the same space.",left._start,right._start]);
				}
				else{
					list.push(copy(right._start));
					right.pop(right._start);
					i=3;
				}
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
	function cubeNode(ent=null,pos = {x: null, y: null, z: null},list=null,direction = [0,0,0,false], command = null,next=null){
		this._ent = ent;
		this._pos = pos;
		this._list = list;
		this._direction = direction;//basically the direction its pointing in. if it has stuff, it poitns. if not, it doesnt point.
		if(this._ent) this._ent._cube = this;
		this._command = command; //this is going to cointain the line that defines this block.
		//i guess since if its drawing, it goes in order of lowest z to lowest y to lowest x,
		//it can act sort of like a line???
		//1d is easy to deal with, as in this case i only really need a start.
		//and then i can easily sort it as well.
		//and even easier, drawing!
		this._next = next;
	};
	function copy(cube){
		if(cube)
			return new cubeNode(cube._ent,cube._pos,cube._list);
		else return null;
	};
	return cubeList;
});
