phantom.injectJs("../lib/casperjs/casper.js");

var casper = new phantom.Casper();

casper.start("grid.html", function(self){
	self.test.assertEval(function(){
		return document.querySelector("#grid") ? true : false;
	}, "Expecting a table with id as 'grid'.");
});

casper.then(function(self){
	self.test.assertEvalEquals(function(){
		return document.querySelectorAll("#grid td").length;
	}, 100, "Expecting 100 cells");
});

casper.then(function(self){
	self.test.assertEvalEquals(function(){
		return document.querySelectorAll("#grid td.alive").length;
	}, 4, "Expecting 4 living cells");
});

casper.then(function(self){
	self.test.assertEval(function(){
		return Grid.isCellAlive(document.querySelector("#grid tr:nth-child(2) td:nth-child(3)"));
	}, "Expecting Living cell");
});

casper.run(function(self){
	self.exit();
});