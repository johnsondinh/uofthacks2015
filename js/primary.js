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
					//var name = $(this).find('entrydata[name = EventName]').text();
					//var cost = $(this).find('entrydata[name = Admission]').text();
					var date_start = $(this).find('entrydata[name = DateBeginShow]');
					var date_end = $(this).find('entrydata[name = DateEndShow]');
					var date_start1 = new Date(date_start);
					var date_start2 = new Date(date_start);
					if (date >= date_start1 && date <= date_start2){
						$('.events ul').append($('<li/>', {text: name + cost}));
					}
					//$('.events ul').append($('<li/>', {text: name + cost}));
				});
			},
			error: function() {
				$('.events').text('Failed to get data!');
			}
		});
	});		
});