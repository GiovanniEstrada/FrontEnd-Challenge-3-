const ip_result = document.getElementById("ip-r");
const location_result = document.getElementById("location-r");
const timezone_result = document.getElementById("timezone-r");
const isp_result = document.getElementById("isp-r");

// Create de map
var map = L.map("map", {
  center: [14.6202, -90.50562],
  zoom: 4,
});

L.tileLayer(
  "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=lPT5yI7dkv0hep3xglmh",
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(map);

// get data of input
const button = document.getElementById("submit");

button.addEventListener("click", () => {
  const ip = document.getElementById("ip").value;

  //API data
  const data =
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_4QjL7ti0jqfgYaNkdVTyXdu6RlDCZ&ipAddress=` +
    ip;

  //get locate data
  getData(data);
});

async function getData(data) {
  fetch(data)
    .then((result) => result.json())
    .then((db) => {
      ip_result.innerHTML = db.ip;
      location_result.innerHTML = `${db.location.city}, ${db.location.country} ${db.location.postalCode}`;
      timezone_result.innerHTML = db.location.timezone;
      isp_result.innerHTML = db.isp;
      localization(db.location.lat, db.location.lng);
    });
}

function localization(lat, lng) {
  map.flyTo([lat, lng], 16);
  L.marker([lat, lng]).addTo(map);
}
