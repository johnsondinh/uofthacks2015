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
					var name = $(this).find('entrydata[name = EventName]').text();
					var cost = $(this).find('entrydata[name = Admission]').text();

					$('.events ul').append($('<li/>', {text: name}));
				});
			},
			error: function() {
				$('.events').text('Failed to get data!');
			}
		});
	});		
});