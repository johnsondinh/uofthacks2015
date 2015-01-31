<<<<<<< HEAD
=======
$.ajax({
	url: 'xml/events.xml',
	dataType: 'xml',
	success: function(data) {
		$(data).find('viewentries viewentry').each(function() {

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
>>>>>>> 7e91f23c4dd2255f8c0412c99054658db76d2c8d
