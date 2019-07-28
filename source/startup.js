requirejs.config({
	baseUrl: './source',
	paths:{
		crafty : '../node_modules/craftyjs/dist/crafty',
		domReady: '../node_modules/domready/ready',
		jquery: '../node_modules/jquery/dist/jquery',
		jqueryui: '../node_modules/jquery-ui/jquery-ui'
	},
	packages:[{
		name:'codemirror',
		location:'../node_modules/codemirror',
		main: 'lib/codemirror'
	}]
});
require([
	'domReady',
//	'crafty',
//	'jquery',
//	'jqueryui',
//	'codemirror',
//	'codemirror/mode/htmlmixed/htmlmixed', //needed for the editor i guess.
	'main'
	],
	function(domReady, main){
		console.log("test2");
		domReady(function(){
			console.log("test");
			window.run = new main();
		});
	}
);
