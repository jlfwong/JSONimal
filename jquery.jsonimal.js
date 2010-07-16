/*
    JSONimal - elegant DOM construction with jQuery

    Copyright (C) 2010  Jamie Wong

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

jQuery.mktag = (function($) {
	return function(tagName, properties) {
		if (typeof tagName !== 'string') {
			console.log('Error', tagName);
		}
		var tagType = tagName.match(/^[^\.#]*/)[0];
		if (tagType === null || tagType.length == 0) {
			tagType = 'div';
		}
		var tag = $(document.createElement(tagType));
		var tagId = tagName.match(/#[^\.]*/);
		if (tagId !== null && typeof tagId[0] !== 'undefined') {
			tag.attr('id',tagId[0].substr(1));
		}

		var tagClasses = tagName.match(/\.[^\.#]*/g);
		if (tagClasses !== null) {
			for (x in tagClasses) {
				if (tagClasses[x] !== null && typeof tagClasses[x] !== 'undefined') {
					tag.addClass(tagClasses[x].substr(1));
				}
			}
		}

		if (typeof properties !== 'undefined') {
			for (prop in properties) {
				if (prop == "text") {
					tag.text(properties[prop]);
				} else if (prop == "html") {
					tag.html(properties[prop]);
				} else {
					tag.attr(prop,properties[prop]);
				}
			}
		}
		return $(tag);
	}
})(jQuery);

jQuery.build = (function($) {
	return function(buildData) {
		if ($.isArray(buildData) && buildData.length == 0) return $();

		if (buildData instanceof jQuery) {
			// $.build(jQuery Object)
			// Example:
			// $.build($("<b>"));
			return buildData;

		} else if (typeof buildData === "string") {
			// $.build(String)
			// Example:
			// $.build("#id1.class1.class2")
			return $.mktag(buildData);

		} else if ($.isArray(buildData[0]) || buildData[0] instanceof jQuery) {
			// $.build(Array of Arrays)
			// Example:
			// $.build([
			//	['b'],['b'],['b']
			// ])

			// TODO: Fix this to not abuse childrel
			var tags = $.mktag("div.temp");
			for (var i in buildData) {
				tags.append($.build(buildData[i]));
			}
			var $children = tags.children();
			tags.remove();
			return $children;
		} else {
			var tagName = buildData[0];
			var tagAttrs = {};
			var tagChildren = [];

			if (buildData.length == 2) {
				if ($.isArray(buildData[1])) {
					// $.build([string, Array of children])
					// Example:
					// $.build(
					//		['span', [
					//			['b']
					//		]]
					// );
					tagChildren = buildData[1];
				} else {
					// $.build([string, attributes])
					// Example:
					// $.build(['a', { href: 'http://www.google.ca'}]);
					tagAttrs = buildData[1];
				}
			} else if (buildData.length == 3) {
				// $.build([string, attributes, children])
				// Example:
				// $.build(
				//	['a', {href: 'http://www.google.ca}, [
				//   ['b', {text: 'Hello World'}]
				//  ]]
				// );
				tagAttrs = buildData[1];
				tagChildren = buildData[2];
			}
			return $.mktag(tagName, tagAttrs).append($.build(tagChildren));
		}
	}
})(jQuery);

jQuery.fn.jsonimal = (function($) {
	return function(buildData) {
		return $(this).append($.build(buildData));
	}
})(jQuery);
