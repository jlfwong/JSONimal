module('jQuery.mktag')

function assertDiffCount(selector, change, block) {
	var $testarea = $("<div id='testarea'></div>").appendTo("body");
	var initial;

	if (jQuery.isPlainObject(selector)) {
		initial = {};
		for (var sel in selector) {
			initial[sel] = $testarea.find(sel).size();
		}
	} else {
		initial = $testarea.find(selector).size();
	}

	if (typeof change == "function") {
		block = change;
		change = 1;
	}

	block($testarea);
	if (jQuery.isPlainObject(selector)) {
		for (var sel in selector) {
			equal($testarea.find(sel).size(),parseInt((initial[sel]),10) + parseInt(selector[sel],10));
		}
	} else {
		equal($testarea.find(selector).size(), parseInt(initial,10) + parseInt(change,10));
	}

	$testarea.remove();
}

test('simple', function() {
	assertDiffCount('b', function(t) {
		t.append($.mktag("b"));
	});

	assertDiffCount('span', function(t) {
		t.append($.mktag("span"));
	});
});

test('with ids', function() {
	assertDiffCount('div#testid', function(t) {
		t.append($.mktag("div#testid"));
	});

	assertDiffCount('#testid', function(t) {
		t.append($.mktag("#testid"));
	});

	assertDiffCount('span#testid', function(t) {
		t.append($.mktag("span#testid"));
	});
});

test('with a class', function() {
	assertDiffCount('div.testclass', function(t) {
		t.append($.mktag("div.testclass"));
	});

	assertDiffCount('div.testclass', function(t) {
		t.append($.mktag(".testclass"));
	});

	assertDiffCount('span.testclass', function(t) {
		t.append($.mktag("span.testclass"));
	});
});

test('with multiple classes', function() {
	assertDiffCount('div.class1.class2', function(t) {
		t.append($.mktag("div.class1.class2"));
	});

	assertDiffCount('.c1.c2.c3.c4.c5.c6', function(t) {
		t.append($.mktag("div.c6.c5.c4.c3.c2.c1"));
	});

	assertDiffCount('div.class1.class2', function(t) {
		t.append($.mktag(".class1.class2"));
	});

	assertDiffCount('span.class1.class2', function(t) {
		t.append($.mktag("span.class1.class2"));
	});
});

test('with id and classes', function() {
	assertDiffCount('#testid.testclass', function(t) {
		t.append($.mktag("div#testid.testclass"));
	});

	assertDiffCount('div#testid.testclass', function(t) {
		t.append($.mktag("#testid.testclass"));
	});

	assertDiffCount('span#testid.testclass', function(t) {
		t.append($.mktag("span#testid.testclass"));
	});
});

test('with id and multiple classes', function() {

	assertDiffCount('div#testid.class1.class2', function(t) {
		t.append($.mktag("div#testid.class1.class2"));
	});

	assertDiffCount('div#testid.class1.class2', function(t) {
		t.append($.mktag("div#testid.class1.class2"));
	});

	assertDiffCount('div#testid.class1.class2', function(t) {
		t.append($.mktag("div#testid.class1.class2"));
	});

});

test('with attrs', function() {
	assertDiffCount('[href=123]', function(t) {
		t.append($.mktag("a",{href: '123'}));
	});

	assertDiffCount('[data-method=test]', function(t) {
		t.append($.mktag("a",{'data-method': 'test'}));
	});
});

test('complex', function() {
	assertDiffCount('span#id1.c1.c2.c3[data-method=test][data-num=123]', function(t) {
		t.append($.mktag("span#id1.c1.c2.c3",{
			'data-method': 'test', 'data-num': '123'
		}));
	});
});

// --------------------------------------------------------------------------------

module("jQuery.build");

test('string input', function() {
	assertDiffCount('b', function(t) {
		t.append($.build("b"));
	});

	assertDiffCount('#testid.c1.c2.c3', function(t) {
		t.append($.build("#testid.c1.c2.c3"));
	});

	assertDiffCount('span#testid.c1.c2.c3', function(t) {
		t.append($.build("span#testid.c1.c2.c3"));
	});
});

test('jquery input', function() {
	assertDiffCount({'p':1,'b':1}, function(t) {
		t.append($.build($("<b></b>").append($(document.createElement("p")))));
	});
});

test('simple json input', function() {
	assertDiffCount({
		'ul' : 1,
		'li' : 3,
	}, function(t) {
		t.append($.build(
			["ul",[
				["li"],
				["li"],
				["li"]
			]]
		));
	});
});

test('complex json input', function() {
	assertDiffCount({
		'.outer[data-x=1]'  : 1,
		'.outer > .middle'  : 1,
		'.middle > .inner'  : 1,
		'.inner > span#id1' : 1,
		'span#id1 > p'      : 3,
		'p:contains(hi)'    : 1,
		'p > b'             : 1
	}, function(t) {
		t.append($.build(
			[".outer", { "data-x" : "1" }, [
				[".middle", [
					[".inner", [
						["span#id1", [
							["p", { "text" : "hi world" }],
							["p", [
								"b"
							]],
							["p"]
						]]
					]]
				]]
			]]
		));
	});
});

test('simple array input', function() {
	assertDiffCount({'b': 3}, function(t) {
		t.append($.build([
			["b"],
			["b"],
			["b"]
		]));
	});
});

test('arbitrary depth array', function() {
	assertDiffCount({'b': 3}, function(t) {
		t.append($.build([[[[
			[[[["b"]]]],
			["b"],
			[["b"]]
		]]]]));
	});
});


module('$.jsonimal');

test('jsonimal', function() {
	assertDiffCount({
		'.outer[data-x=1]'  : 1,
		'.outer > .middle'  : 1,
		'.middle > .inner'  : 1,
		'.inner > span#id1' : 1,
		'span#id1 > p'      : 3,
		'p:contains(hi)'    : 1,
		'p > b'             : 1
	}, function(t) {
		t.jsonimal(
			[".outer", { "data-x" : "1" }, [
				[".middle", [
					[".inner", [
						["span#id1", [
							["p", { "text" : "hi world" }],
							["p", [
								"b"
							]],
							["p"]
						]]
					]]
				]]
			]]
		);
	});
});

$(function() {
	$.mktag("#demo").jsonimal([
		["h1", {text: "JSONimal!"}],
		["table",{style: 'border: 1px solid black'},[
			["thead",[
				["tr",{style: 'background-color: red'},[
					["th", {text: "one"}],
					["th", {text: "two"}],
					["th", {text: "three"}]
				]]
			]],
			["tbody", [
				["tr",[
					["td", {html: "<u>a</u>"}],
					["td", {text: "b"}],
					["td", {text: "c"}]
				]],
				["tr",[
					["td",[
						["a", {href: "http://www.google.ca", text: "Google"}]
					]],
					["td", {text: "b"}],
					["td", {text: "c"}]
				]],
				["tr",[
					["td", {text: "a"}],
					["td", {text: "b"}],
					["td", {text: "c"}]
				]]
			]]
		]]
	]).appendTo("body");
	console.log($("#demo").html());
});
