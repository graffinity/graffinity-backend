import { geolocation } from '../package.json';
var geolocation = require('geolocation');

geolocation.getCurrentPosition(function (err, position) {
	if (err) throw err;
	console.log(position);
});
