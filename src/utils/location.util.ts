const EARTH_RADIUS = 6371e3;
const EARTH_RADIUS_KM = 6371;

const LocationUtil = {
	toRadians: (degrees: number) => {
		return degrees * (Math.PI / 180);
	},

	calculateDistanceBetweenCoordinates: (
		userLatitude: number | string,
		userLongitude: number | string,
		graffitiLatitude: number | string,
		graffitiLongitude: number | string,
	) => {
		let latitude1 = Number(userLatitude);
		let longitude1 = Number(userLongitude);
		let latitude2 = Number(graffitiLatitude);
		let longitude2 = Number(graffitiLongitude);

		let latitudeDiff = toRadians(latitude2 - latitude1);
		let longitudeDiff = toRadians(longitude2 - longitude1);
		const a =
			Math.pow(Math.sin(latitudeDiff / 2), 2) +
			Math.pow(Math.sin(longitudeDiff / 2), 2) *
				Math.cos(latitude1) *
				Math.cos(latitude2);
		let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		let distance = EARTH_RADIUS_KM * c;
		return distance;
	},
};

export default LocationUtil;

export const toRadians = (degrees: number) => {
	return degrees * (Math.PI / 180);
};
// Math.sin(latitudeDiff / 2) * Math.sin(latitudeDiff / 2) +
// Math.cos(this.toRadians(latitude1)) *
// 	Math.cos(this.toRadians(latitude2)) *
// 	Math.sin(longitudeDiff / 2) *
// 	Math.sin(longitudeDiff / 2);
