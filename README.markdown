What is JSONimal?
=================

JSONimal provides elegant DOM construction with jQuery 

JSONimal turns this:

	[
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
	]

into this:

<h1>JSONimal!</h1><table style="border: 1px solid black;"><thead><tr style="background-color: red;"><th>one</th><th>two</th><th>three</th></tr></thead><tbody><tr><td><u>a</u></td><td>b</td><td>c</td></tr><tr><td><a href="http://www.google.ca">Google</a></td><td>b</td><td>c</td></tr><tr><td>a</td><td>b</td><td>c</td></tr></tbody></table>

jQuery.mktag
============

I got tired for doing stuff like this:

	$(document.createElement("div")).attr({id:'foo', class: 'bar'});

and wasn't a fan of doing this:
	
	$("<div id='foo' class='bar'></div>");

What I really wanted was haml-esque syntax like this:

	$.mktag("#foo.bar");

And that's what jQuery.mktag does.

Syntax
------
The following examples have the standard jQuery version on the first line
and the $.mktag version on the second line

Simple element creation

	$("<span></span>");
	$.mktag("span");

Attaching an id to an element

	$("<span></span>").attr('id','foo');
	$.mktag("span#foo");

Attaching an id and a class

	$("<div id='foo' class='bar'></div>").appendTo('body');
	$.mktag("#foo.bar").appendTo('body');

Multiple classes

	$("<div id='foo' class='bar baz'></div>");
	$.mktag("#foo.bar.baz");

Attributes
	
	$("<a></a>").attr('href','foo.html'});
	$.mktag("a",{href: 'foo.html'});

All at once

	$("<span></span>").attr('id', 'foo').addClass('foo').addClass('bar').css('color','red');
	$.mktag("span#foo.bar.baz",{style: 'color: red'});

jQuery.build
============

jQuery.mktag is great if you're only creating one element - but what about a whole structure? jQuery.build will build the entire structure for you, and it'll look nice in your code too.

Syntax
------

While $.build actually returns a jQuery object, for the sake of simplicity, the output will be shown in terms of HTML.
	
Building a list

	$.build(
		["ul",[
			["li",{text:'one'}],
			["li",{text:'two'}],
			["li",{text:'three'}]
		]]
	).appendTo('body');

	<ul>
		<li>one</li>
		<li>two</li>
		<li>three</li>
	</ul>

Building nested divs

	$.build(
		["#outer.red", {style:'border: 1px solid black'}, [
			["#middle.green", [
				["#inner.blue", [
					["p", {text: "Awesome."}]	
				]]
			]]
		]]
	).appendTo('body');

	<div id='outer' class='red' style='border: 1px solid black'>
		<div id='middle' class='green'>
			<div id='inner' class='blue'>
				<p>Awesome.</p>
			</div>
		</div>
	</div>

Including other jQuery elements

	$ps = $("<p></p><p></p><p></p>");
	$.build(
		["#container", [
			$ps
		]]
	).appendTo('body');

	<div id='container'>
		<p></p>
		<p></p>
		<p></p>
	</div>

Multiple top level elements

	$.build([
		["#one"],
		["#two"],
		["#three"]
	]);

	<div id='one'></div>
	<div id='two'></div>
	<div id='three'></div>

.jsonimal
=========

This is just a shortcut for `.append($.build(args));`

Example:

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
	});
