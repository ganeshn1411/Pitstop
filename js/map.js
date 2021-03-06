

window.onload = getMyLocation;

var map;

function getMyLocation() {
	
if (navigator.geolocation) {

		
navigator.geolocation.getCurrentPosition(
displayLocation);

	}

else {

		alert("Oops, no geolocation support");

	}

}

function displayLocation(position) {

	var latitude = position.coords.latitude;

	var longitude = position.coords.longitude;

/*
	var div = document.getElementById("location");

	div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;
    div.innerHTML +="(with" + position.coords.accuracy + "meters accuracy)" ; 
  */
    showMap(position.coords);


}

function showMap(coords){
    var googleLatAndLong= new google.maps.LatLng(coords.latitude,coords.longitude);

    var googleLatAndLong2= new google.maps.LatLng(12.928464,77.631043);
    
    var googleLatAndLong3=new google.maps.LatLng(12.930221,77.629734);

    var googleLatAndLong4= new google.maps.LatLng(12.925641,77.629241);

    var googleLatAndLong5= new google.maps.LatLng(12.92744,77.634627);

    var mapOptions={
        zoom : 16,
        center : googleLatAndLong,
        mapTypeId : google.maps.MapTypeId.ROADMAP
    };
    
    var mapDiv = document.getElementById("map");
    
    map = new google.maps.Map(mapDiv,mapOptions);
    
    var title ="my home" ;
    var content =" you are here ";
    
    addMarker1(map,googleLatAndLong,title,content);
	addMarker(map,googleLatAndLong2,"2","4 out of 10 slots free",googleLatAndLong);
	addMarker(map,googleLatAndLong3,"3","3 out of 3 slots free",googleLatAndLong);
        addMarker(map,googleLatAndLong4,"4","1 out of 5 slots free",googleLatAndLong);
	addMarker(map,googleLatAndLong5,"5"," no slots free !! sorry !!",googleLatAndLong);
}


/*centre place */
function addMarker1(map,latlong,title,content,start){
    
    var markerOptions={
        position : latlong,
        map : map ,
        title : title ,
        clickable : true,
        animation:google.maps.Animation.BOUNCE
    };
    
    var marker = new google.maps.Marker(markerOptions);
    
    var infoWindowOptions = {
        content : content ,
        position : latlong 
    };
    
    var infoWindow= new google.maps.InfoWindow(infoWindowOptions);
    
    google.maps.event.addListener(marker,"click",function(){
        infoWindow.open(map);
})
}


/*other places*/

function addMarker(map,latlong,title,content,start){
    
    var markerOptions={
        position : latlong,
        map : map ,
        title : title ,
        clickable : true
    };
    
    var marker = new google.maps.Marker(markerOptions);
    
    var infoWindowOptions = {
        content : content ,
        position : latlong 
    };
    
    var infoWindow= new google.maps.InfoWindow(infoWindowOptions);
    
    google.maps.event.addListener(marker,"click",function(){
        infoWindow.open(map);
      window.setTimeout(function() {
      infoWindow.close(map);
    }, 10000);



    })
    
    google.maps.event.addListener(marker,"click",function(){road(start, latlong)});
}

var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
function road(start, latlong){

 request = {
  origin:start,
  destination:latlong,
  travelMode: google.maps.TravelMode.DRIVING
 };

 directionsService.route(request, function(result, status) {
  if (status == google.maps.DirectionsStatus.OK) {
   directionsDisplay.setDirections(result);



  directionsDisplay.setMap(map);
  };
 /*Set the directions on the map*/
})
}



