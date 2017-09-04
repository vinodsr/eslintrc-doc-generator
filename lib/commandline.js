

let args = process.argv
args = args.slice(2)

let option=false
let options = {}
args.forEach(function (item) {
	if(item.startsWith('--')) {
		option=true
		optionKey=item.substring(2)
		options[optionKey] = true
	} else if (option === true) {
		options[optionKey] = item
	}
})

module.exports=options

