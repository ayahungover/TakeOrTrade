// listings.js
function filterByLocation(listings, userCoords, radiusKm) {
    return listings.filter(listing => {
      const distance = calculateDistance(
        userCoords.lat, 
        userCoords.lng,
        listing.location.lat,
        listing.location.lng
      );
      return distance <= radiusKm;
    });
  }