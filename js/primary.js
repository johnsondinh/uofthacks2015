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

$(function() {
	$("button#submit").click(function(){
	   	$.ajax({
		   	var budget = document.getElementById("form1").elements["budget"].value;
		   	var date = document.getElementById("form2").elements["date"].value;
		   	alert(1);
	});
});