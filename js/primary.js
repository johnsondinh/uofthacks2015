$(document).ready(function() {
	$("#submit1").on('click', function(event) {
		var x, budget, date;
		var count = 1;
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
						$(".events ul").append('<h4>' + count + '</h4>');
						
						var intersectionInfo = $(this).find('entrydata[name = Intersection]').text().trim();

						count++;
						
						/*if(intersectionInfo != 'and') {
							str += '<li id=\'li' + i + '\'>' + array[i] + '</li>';

							var str1 = '<button type = \'button\' class = \'btn btn-info\' data-toggle = \'collapse\' data-target = \'#' + count + '\'>Show Map</button>';
							var str2 = '<div id = \'li' + count + '\' class = \'collapse\'>Hello, world!</div>'; // Insert the Google Map here.

							$(".events ul").append(str1);
							$(".events ul").append(str2);

							count++;
						}*/
					}
				});
			},
			error: function() {
				$('.events').text('Failed to get data!');
			}
		});
	});

	

