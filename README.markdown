What is JSONimal?
=================

JSONimal turns this:

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

into this:

<h1>JSONimal!</h1><table style="border: 1px solid black;"><thead><tr style="background-color: red;"><th>one</th><th>two</th><th>three</th></tr></thead><tbody><tr><td><u>a</u></td><td>b</td><td>c</td></tr><tr><td><a href="http://www.google.ca">Google</a></td><td>b</td><td>c</td></tr><tr><td>a</td><td>b</td><td>c</td></tr></tbody></table>

