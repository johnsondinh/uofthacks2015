$(document).ready(function() {
	$("#submit1").on('click', function(event) {
		var x, budget, date;
		x = document.getElementById("form1");
		budget = x.elements["budget"].value;
		budget = budget.replace(/\$/g, '');
		budget = parseInt(budget, 10);
		date = x.elements["date"].value;
		document.getElementById("displayBudget").innerHTML = '$' + budget + '.00';
		document.getElementById("displayDate").innerHTML = date;
		document.getElementById("events").innerHTML = '';
		event.preventDefault();

		$.ajax({
			url: 'xml/events.xml',
			dataType: 'xml',
			success: function(data) {
				$(data).find('viewentry').each(function() {
					var checks = 1;
					var name = $(this).find('entrydata[name = EventName]').text();
					var date_start = $(this).find('entrydata[name = DateBeginShow]').text();
					var date_end = $(this).find('entrydata[name = DateEndShow]').text();

					var date_start1 = new Date(date_start);
					var date_start2 = new Date(date_end);
					var userDate = new Date(date);

					if (!((userDate.getTime() >= date_start1.getTime()) && (userDate.getTime() <= date_start2.getTime()))){
						checks = 0;
					}

					var cost = $(this).find('entrydata[name = Admission]').text();
					var parseCost = cost.split('-');
					var priceCheck = 1;					

					if (checks) {	
						if (cost == "") {
							priceCheck = 1;
						}

						else{
							var lowerBound = parseCost[0].replace(/\$/g, '');
							lowerBound = lowerBound.replace(/\+/g, '');
							lowerBound = parseInt(lowerBound, 10);

							if(lowerBound > budget) {
								priceCheck = 0;
							}
						}
					}

					if (checks && priceCheck) {
						var desc = $(this).find('entrydata[name = LongDesc]').text();
						var organization = $(this).find('entrydata[name = PresentedByOrgName]').text();

						$(".events ul").append('<h3>' + name + ', hosted by: ' + organization + '</h3>');
						$(".events ul").append('<h4>' + cost + '</h4>');
						$(".events ul").append('<h4>' + desc + '</h4>');
						$(".events ul").append('<div id = "' + name + '"</div>');
						
						var intersectionInfo = $(this).find('entrydata[name = Intersection]').text().trim();
						
						if(intersectionInfo != 'and') {
							var map;
							var latlng;
							var address2 = intersectionInfo;
							var location2;
							var geocoder;

							function initialize() {
								geocoder = new google.maps.Geocoder();
								if (geocoder) {
								   geocoder.geocode({'address': address2}, function(results, status) {
									  if (status == google.maps.GeocoderStatus.OK){
										 location2 = results[0].geometry.location;
										 showmap();
									  }
								   });
								}
							}

							function showmap() {
								var mapOptions = {
									zoom: 12
								};

								map = new google.maps.Map(document.getElementById(name), mapOptions);

								// Try HTML5 geolocation
								if(navigator.geolocation) {
									navigator.geolocation.getCurrentPosition(function(position) { 
									var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
									latlng = new google.maps.LatLng((position.coords.latitude+location2.lat())/2,(position.coords.longitude+location2.lng())/2);

									var infowindow = new google.maps.InfoWindow({
										map: map,
										position: pos,
										content: 'You are here!'
									});

									map.setCenter(latlng);

									var marker=new google.maps.Marker({
										position:location2,
									});
									
									marker.setMap(map);

									directionsService = new google.maps.DirectionsService();
									directionsDisplay = new google.maps.DirectionsRenderer({
										suppressMarkers: true,
										suppressInfoWindows: true
									});

									directionsDisplay.setMap(map);
									
									var request = {
										origin:pos,
										destination:location2,
										travelMode: google.maps.DirectionsTravelMode.DRIVING
									};

									directionsService.route(request, function(response, status){
										if(status == google.maps.DirectionsStatus.OK) {
											directionsDisplay.setDirections(response);
											distance = "The distance between the two points on the chosen route is: "+response.routes[0].legs[0].distance.text;
											distance += "The aproximative driving time is: "+response.routes[0].legs[0].duration.text;
											document.getElementById("distance_road").innerHTML = distance;
										}
									});

									var line = new google.maps.Polyline({
									map: map,
									path: [pos, location2],
									strokeWeight: 7,
									strokeOpacity: 0,
									strokeColor: "#FFAA00"
									});

									var R = 6371;
									var dLat = toRad(location2.lat()-pos.lat());
									var dLon = toRad(location2.lng()-pos.lng());
									var dLat1 = toRad(pos.lat());
									var dLat2 = toRad(location2.lat());
									var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
									Math.cos(dLat1) * Math.cos(dLat1) *
									Math.sin(dLon/2) * Math.sin(dLon/2);
									var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
									var d = R * c;
									document.getElementById("distance_direct").innerHTML = "The distance between the two points (in a straight line) is: "+d;

									}, function() {handleNoGeolocation(true);});
								} 
								else {
									// Browser doesn't support Geolocation
									handleNoGeolocation(false);
								}
							}
							
							google.maps.event.addDomListener(window, 'load', initialize);

							// $(".events ul").append('<button type = "button" class = "btn btn-info" data-toggle = "collapse" data-target = "#1">Show Map</button>');
							// $(".events ul").append('<div id = "1" class = "collapse">Hello, world!</div>');
						}
					}
				});
			},
			error: function() {
				$('.events').text('Failed to get data!');
			}
		});
	});		
});
