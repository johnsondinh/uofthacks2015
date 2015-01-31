$.ajax({
	url: 'xml/events.xml',
	dataType: 'xml',
	success: function() {

	},
	error: function() {
		$('.title').text('Failed to get data!');
	}
});