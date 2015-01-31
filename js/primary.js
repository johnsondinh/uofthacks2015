$.ajax({
	url: 'xml/events.xml',
	dataType: 'xml',
	success: function(data) {
		$(data).find('viewentries viewentry').each(function() {

			(data).find('viewentry[position = 1]').each(function(){
				var status = $(this).find('text').text();
				$('.timeline ul').append(
					$('<li />', {
						text: status
					})
				);
			}

			$('.events ul').append($('<li />', {
				text: entry
			}))

		});
	},
	error: function() {
		$('.events').text('Failed to get data!');
	}
});