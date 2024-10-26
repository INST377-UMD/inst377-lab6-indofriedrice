function createMap() {
    var map = L.map('map').setView([38.7946, -106.5348], 3);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const markerPins = displayMarkerResults();

    const pin1 = L.marker([markerPins.marker1Coordinates.lat, markerPins.marker1Coordinates.long]).addTo(map);
    const pin2 = L.marker([markerPins.marker2Coordinates.lat, markerPins.marker2Coordinates.long]).addTo(map);
    const pin3 = L.marker([markerPins.marker3Coordinates.lat, markerPins.marker3Coordinates.long]).addTo(map);

    pin1.bindPopup(`Marker 1: Latitude: ${markerPins.marker1Coordinates.lat}, Longitude: ${markerPins.marker1Coordinates.long}`);
    pin2.bindPopup(`Marker 2: Latitude: ${markerPins.marker2Coordinates.lat}, Longitude: ${markerPins.marker2Coordinates.long}`);
    pin3.bindPopup(`Marker 3: Latitude: ${markerPins.marker3Coordinates.lat}, Longitude: ${markerPins.marker3Coordinates.long}`);

    populateMarker([
        markerPins.marker1Coordinates,
        markerPins.marker2Coordinates,
        markerPins.marker3Coordinates
    ]);
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
    // Range for Latitude and Longitude:
    // Latitude Coordinates: getRandomInRange(30, 35, 3);
    // Longitude Coordinates: getRandomInRange(-90, -100, 3);
}

function displayMarkerResults() {
    console.log("Function is working...");

    const marker1Coordinates = { lat: getRandomInRange(30, 35, 3), long: getRandomInRange(-90, -100, 3) };
    const marker2Coordinates = { lat: getRandomInRange(30, 35, 3), long: getRandomInRange(-90, -100, 3) };
    const marker3Coordinates = { lat: getRandomInRange(30, 35, 3), long: getRandomInRange(-90, -100, 3) };

    const marker1 = document.getElementById('m1');
    const marker2 = document.getElementById('m2');
    const marker3 = document.getElementById('m3');

    marker1.innerText = `Marker 1: Latitude: ${marker1Coordinates.lat}, Longitude: ${marker1Coordinates.long}`;
    marker2.innerText = `Marker 2: Latitude: ${marker2Coordinates.lat}, Longitude: ${marker2Coordinates.long}`;
    marker3.innerText = `Marker 3: Latitude: ${marker3Coordinates.lat}, Longitude: ${marker3Coordinates.long}`;

    return {
        marker1Coordinates,
        marker2Coordinates,
        marker3Coordinates
    };
}

function populateMarker(markerPins) {
    console.log("Function is working... 2.0")
    // Loop through each marker pin!!!!
    for (let i = 0; i < markerPins.length; i++) {
        const {lat, long} = markerPins[i];

        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
            .then((res) => res.json())
            .then((resJson) => {

                const locality = resJson.locality;

                const updateLocality = document.getElementById(`l${i + 1}`); 
                updateLocality.innerText = `Locality: ${locality}`;
            })
    }
}

    window.onload = createMap;