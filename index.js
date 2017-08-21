var eslint = require("./a.json");
var request = require("request");
const getRuleURI = require('eslint-rule-documentation');

var response = "";

for(rule in eslint.rules) {
	status = getRuleURI(rule);
	if(status.found == true) {
		if(status.url.startsWith("http://eslint.org/")) {
			//replace the url with the github one.
			status.url = status.url.replace("http://eslint.org/","https://raw.githubusercontent.com/eslint/eslint/master/") + ".md";
		} else if (status.url.endsWith("md") && status.url.startsWith("https://github.com")) {
			status.url = status.url.replace("https://github.com/","https://raw.githubusercontent.com/");
		}
		if(status.url.endsWith(".md")) {
		request(status.url,function (error, response, body)  {
			console.log(body)
			console.log()
			response += body;
			response +="\n";
			
		})
		
	}
		console.log("rule:",rule," " , status.url);
	} else {
		console.err(rule," not found");
		process.exit(-1)
	}
	
	
}


