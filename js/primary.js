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

$(function() {
	$(".btn btn-info").click(function() {
		alert(1);
	});
});

/*
function nothing() {
	var budget, date;
	budget = document.getElementById("form1").elements["budget"].value;
	date = document.getElementById("form2").elements["date"].value;
	alert(1);
}*/