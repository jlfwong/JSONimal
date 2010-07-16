jQuery.mktag = (function($) {
	return function(tagName, properties) {
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

		} else if (typeof buildData == "string") {
			// $.build(String)
			// Example:
			// $.build("#id1.class1.class2")
			return $.mktag(buildData);

		} else if ($.isArray(buildData[0])) {
			// $.build(Array of Arrays)
			// Example:
			// $.build([
			//	['b'],['b'],['b']
			// ])
			var tags = $.mktag("div.temp");
			for (var i in buildData) {
				tags.append($.build(buildData[i]));
			}
			return tags.children();
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
