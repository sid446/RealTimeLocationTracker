const socket=io()

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const {latitude,longitude}=position.coords;
        socket.emit("send-location",{latitude,longitude})
    },(error)=>{
        console.error(error)
    },{
        enableHighAccuracy:true,
        maximumAge:0,//no cache
        timeout:5000,

    }
)
}
//leaflet 
// Ensure the map element is targeted correctly by ID
const map = L.map("map").setView([0, 0], 10); // Initial coordinates and zoom

// Add the OpenStreetMap tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Sidhant Singh",
   
}).addTo(map);

const markers={}

socket.on("receive-location",(data)=>{
    const {id,longitude,latitude} = data
    map.setView([latitude,longitude])
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude])
    }
    else{
        markers[id]=L.marker([latitude,longitude]).addTo(map)
    }
})

socket.on("User-disconnect",(id)=>{
    if(markers[id]){
        map.removeLayer(makers[id]);
        delete markers[id]
    }

})
