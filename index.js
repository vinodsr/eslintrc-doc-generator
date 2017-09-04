
const request = require("request");
const Handlebars = require('handlebars')
const getRuleURI = require('eslint-rule-documentation');
const async = require('async')

var response = "";

fs = require('fs')
var eslint = fs.readFileSync('./eslintrc.json', 'utf8');
var templatesource = fs.readFileSync('./template.input', 'utf8');
eslint = JSON.parse(eslint)
//var eslint = require("./eslintrc.json");
// Find out the eslint template for


var template = Handlebars.compile(templatesource);

var templatedata = {
	rules : []
}
console.log('Generating...')
async.forEachOf(eslint.rules,function (key,value,callback) {
	status = getRuleURI(value);
	if(status.found == true) {
		if(status.url.startsWith("http://eslint.org/")) {
			//replace the url with the github one.
			status.url = status.url.replace("http://eslint.org/","https://raw.githubusercontent.com/eslint/eslint/master/") + ".md";
		} else if (status.url.endsWith("md") && status.url.startsWith("https://github.com")) {
			status.url = status.url.replace("https://github.com/","https://raw.githubusercontent.com/");
		}
		if(status.url.endsWith(".md")) {
		request(status.url,function (error, response, body)  {
			//console.log(body)
			//console.log()
			//response += body;
			//response +="\n";
			templatedata.rules.push({
				rule: value,
				ruledefinition: body
			})
			callback()
			
		})
		
	}
		//console.log("rule:",rule," " , status.url);
	} else {
		console.err(rule," not found");
		process.exit(-1)
	}
},function (err) {
console.log('Completed',err)
var result = template(templatedata);
fs.writeFileSync('out.md',result)
})


