requirejs.config({
	baseUrl: './source',
	paths:{
		crafty : '../bower_components/crafty/dist/crafty',
		domReady: '../bower_components/domReady/domReady',
		jquery: '../bower_components/jquery/dist/jquery',
		jqueryui: '../bower_components/jquery-ui/jquery-ui'
	},
	packages:[{
		name:'codemirror',
		location:'../bower_components/codemirror',
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
