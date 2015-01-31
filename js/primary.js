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
					var entry = $(this).find('entrydata[name = EventName]').text();

					$('.events jumbotron ul').append($('<li/>', {text: entry}));
				});
			},
			error: function() {
				$('.events').text('Failed to get data!');
			}
		});
	});		
});

/*$.ajax({
	url: 'xml/events.xml',
	dataType: 'xml',
	success: function(data) {
		$(data).find('viewentries viewentry').each(function() {
			var entry = $(this).find('entrydata[name = EventName').text();

			$('.events ul').append($('<li/>', {text: entry}));
		});
	},
	error: function() {
		$('.events').text('Failed to get data!');
	}
});*/