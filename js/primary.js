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
	}$.ajax({
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


$('#submit').on('click', function(e) {
	var budget, date;
	budget = document.getElementById("form1").elements["budget"].value;
	date = document.getElementById("form2").elements["date"].value;

	document.getElementById("display").innerHTML = budget + " is your budget.";
};
});

$(document.ready(function() {
	$('#submit').click(function() {
		alert(1);
	})
}))

		/*
		<script>
			function nothing() {
				var budget, date;
				budget = document.getElementById("form1").elements["budget"].value;
				date = document.getElementById("form2").elements["date"].value;
				alert(1);
			}
		</script>*/
