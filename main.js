// element creation, I/O

function createElement(name, attrs){
	var elem = document.createElement(name);
	for(var i in attrs){
		elem[i] = attrs[i];
	}
	return elem;
}

function insertBefore(elem, anchor){
	anchor.parentNode.insertBefore(elem, anchor);
}

// Example: start new script-based I/O (e.g., JSONP):
// document.documentElement.appendChild(createElement("script", {src: url}));


// templating

function replace(tmpl, map){
	return tmpl.replace(/\{([^\}]+)\}/g, function(_, k){ return map[k]; });
}

// Example: build URL strings from dynamic components
// var url1 = replace("/api/items/{0}?type={1}", [42, "json"]);
//     url2 = replace("/api/items/{item}?type={type}", {item: 42, type: "json"});


// parameter parsing

function splitPairs(pairs, params){
	// warning: this version do not support duplicate keys intentionally!
	params = params || {};
	for(var i = 0; i < pairs.length; ++i){
		var pair = pairs[i].split("=");
		params[decodeURIComponent(pair[0])] = decodeURIComponent(pair.slice(1).join("=")); 
	}
	return params;
}

function parseQuery(query, params){
	// requires splitPairs() above
	return splitPairs(query ? query.substr(1).split("&") : [], params);
}

function parseCookies(params){
	// requires splitPairs() above
	return splitPairs(document.cookie.split("; "), params);
}

// Example: inspect cookies, the query string, and the hash to set a top-level CSS class
// var cookies = parseCookies();
// var query = parseQuery(document.location.search);
// var hash = parseQuery(decodeURIComponent(document.location.hash));
// document.documentElement.className = "theme-" +
//     (hash.theme || query.theme || cookies.theme || "default");

// Example: collect settings from cookies, query, and hash (in this order overriding previous)
// var options = parseCookies({theme: "default"});
// parseQuery(document.location.search, options);
// parseQuery(decodeURIComponent(document.location.hash), options);
// document.documentElement.className = "theme-" + options.theme;

