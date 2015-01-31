$.ajax({
	url: 'xml/events.xml',
	dataType: 'xml',
	success: function(data) {
		$(data).find('viewentries viewentry').each(function() {
			// Do nothing.
		}		
	},
	error: function() {
		$('.events').text('Failed to get data!');
	}
});


function nothing() {
	var budget, date;
	budget = document.getElementById("form1").elements["budget"].value;
	date = document.getElementById("form2").elements["date"].value;

	document.getElementById("display").innerHTML = budget + " is your budget.";
};