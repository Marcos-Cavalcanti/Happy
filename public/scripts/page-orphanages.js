//create map
const map = L.map('mapid', {
    center: [-8.0510352,-34.92580],
    zoom: 13
});

//create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

function addMarker({id, name, lat, lng}) {

    //create popup overlay
    const popup = L.popup({
        closeButton: false,
        className: 'map-popup',
        minWidth: 240,
        minHight: 240
    }).setContent(`${name} <a href="/orphanage?id=${id}"><img src="/images/arrow-white.svg"></a>`)


    L.marker([lat, lng], {icon})
    .addTo(map)
    .bindPopup(popup)
}

const orphanagesSpan = document.querySelectorAll('.orphanages span')
console.log(orphanagesSpan)
orphanagesSpan.forEach( span => {
    const orphanage = {
        id: span.dataset.id,
        name: span.dataset.name,
        lat: span.dataset.lat,
        lng: span.dataset.lng
        }
    
    addMarker(orphanage)
})