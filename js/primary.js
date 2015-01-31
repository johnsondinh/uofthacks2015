$.ajax({
	url: 'xml/events.xml',
	dataType: 'xml',
	success: function(data) {
		$(data).find('viewentry').each(function() {

			var entry = $(this).find('entrydata[name = EventName]').text();

			$('.events ul').append(
				$('<li />', {
					text: entry
				})
			);
		});
	},
	error: function() {
		$('.events').text('Failed to get data!');
	}
});