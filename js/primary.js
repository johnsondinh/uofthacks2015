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
			type: 'GET',
			url: 'http://wx.toronto.ca/festevents.nsf/tpaview?readviewentries',
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
						
						var mapInfo = $(this).find('entrydata[name = MapAddress]').text().replace('[', '').replace(']', '').trim();
						
						$(".events ul").append(mapInfo);
					}
				});
			},
			error: function() {
				$('.events').text('Failed to get data!');
			}
		});
	});		
});
