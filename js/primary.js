$(document).ready(function() {
	$("#submit1").on('click', function(event) {
		var x, budget, date;
		x = document.getElementById("form1");
		budget = x.elements["budget"].value;
		date = x.elements["date"].value;
		document.getElementById("displayBudget").innerHTML = '$' + budget + '.00';
		document.getElementById("displayDate").innerHTML = date;
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
					var priceCheck;
					if (checks){	
						if (parseCost[0] == ""){
							priceCheck = 1;
						}
						else if (parseCost.length == 1){  //check if it's one number or a range
							if(budget <= parseCost[0]){
								priceCheck = 1;
							}
							else{
								priceCheck = 0;
							}
						}
						else{
							if (parseCost[0] <= budget && budget <= parseCost[1]){
								priceCheck = 1;
							}
							else{
								priceCheck = 0;
							}
						}
						
					}
					if (checks && priceCheck){
						$('.events ul').append($('<li/>', {text: name + cost}));
					}
					
				});
			},
			error: function() {
				$('.events').text('Failed to get data!');
			}
		});
	});		
});
