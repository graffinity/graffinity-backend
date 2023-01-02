import { Graffiti } from "@prisma/client";



const EARTH_RADIUS_KM = 6371; // Earth's radius in kilometers

// Calculate the distance between two coordinates in kilometers using the Haversine formula
const calculateDistance = async(lat1: number, lon1: number, lat2: number, lon2: number): Promise<number> =>{
    let grafiti: Graffiti[] = await this.prisma.graffiti.findMany();
  const latDiff = toRadians(lat2 - lat1);
  const lonDiff = toRadians(lon2 - lon1);
  const a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

// Convert degrees to radians
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Find the nearest neighbor graffiti to the given coordinates
async function findNearestNeighbor(graffitiList: Graffiti[], lat: number, lon: number): Promise<Graffiti[]> {
  // Initialize the nearest neighbors array with the first graffiti in the list
  let nearestNeighbors: Graffiti[] = [graffitiList[0]];

  // Loop through the rest of the graffiti list and compare distances
  for (let i = 1; i < graffitiList.length; i++) {
    const graffiti = graffitiList[i];
    const distance = calculateDistance(graffiti.latitude, graffiti.longitude, lat, lon);
    if (await distance >= 1) {
      // If the current graffiti is equally close, add it to the nearest neighbors array
      nearestNeighbors.push(graffiti);
    }
  }

  return nearestNeighbors;
}