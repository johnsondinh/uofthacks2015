$(document).ready(function() {
	$("#submit1").on('click', function(event) {
		var x, budget, date, y, budget2, month2, date2;
		x = document.getElementById("form1");
		budget = x.elements["budget"].value;
		date = x.elements["date"].value;
		document.getElementById("displayB").innerHTML = '$' + budget + '.00';
		document.getElementById("displayD").innerHTML = date;
		event.preventDefault();
	});		
});

$.ajax({
	url: 'xml/events.xml',
	dataType: 'xml',
	success: function(data) {
		$(data).find('viewentries viewentry').each(function() {
			// Empty.
		});
	},
	error: function() {
		$('.events').text('Failed to get data!');
	}
});