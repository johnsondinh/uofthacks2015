$.ajax({
	url: 'xml/events.xml',
	dataType: 'xml',
	success: function(data) {
		$(data).find('viewentries viewentry').each(function() {
			var entry = $(this).find('viewentry[position = 1] > text').text();

			$('.events ul').append($('<li />', {
				text: entry
			}))

		});
	},
	error: function() {
		$('.events').text('Failed to get data!');
	}
});