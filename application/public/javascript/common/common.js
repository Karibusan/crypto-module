$ (function () {
	$ ('#text-cipher-btn').prop ('disabled', true);
});


$ ('#text-cipher').bind ('paste keydown', function (e) {
	reset ();
	let eventType = e.type;
	if (eventType === 'paste') {
		textToDecrypt = e.originalEvent.clipboardData.getData ('text');
	} else {
		textToDecrypt = $ ('#text-cipher').val ();
	}
	if (textToDecrypt.length > 1) {
		$ ('#text-cipher-btn').prop ('disabled', false);
		
	} else {
		$ ('#text-cipher-btn').prop ('disabled', true);
	}
});


function reset () {
	textToDecrypt = null;
	patterns = [];
	words = [];
	matches = [];
}