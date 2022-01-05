$ ('#caesar-key-btn').on ('click', function () {
	crackItJulius ();
});

function crackItJulius () {
	$ ('#caesar-result').val ('');
	
	let text = $ ('#text-cipher').val ();
	let decipheredText = text;
	let textLength = text.length;
	let key = parseInt ($ ('#caesar-key').val ());
	let absoluteKey = Math.abs (key);
	
	for (i = 0; i < textLength; i++) {
		let char = text.charAt (i);
		let charCode = parseInt (char.charCodeAt (0));
		let newCharCode = '';
		if(key < 0) {
			if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
				if ((charCode >= 65 && charCode <= 90) && (charCode - absoluteKey) < 65) {
					let testTemp = absoluteKey - (charCode - 64);
					newCharCode = 90 - testTemp;
				} else if ((charCode >= 97 && charCode <= 122) && (charCode - absoluteKey) < 97) {
					let testTemp = absoluteKey - (charCode - 96);
					newCharCode = 122 - testTemp;
				} else {
					newCharCode = charCode + key;
					//console.log ('crackItJulius', absoluteKey, charCode, newCharCode);
				}
				let newChar = String.fromCharCode (newCharCode);
				decipheredText = decipheredText.substring (0, i) + newChar + decipheredText.substring (i + 1);
			}
		}
		else
		{
			if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
				if ((charCode >= 65 && charCode <= 90) && (charCode + absoluteKey) > 90) {
					let newCharCode = 65 + ((absoluteKey + charCode) - 91);
				} else if ((charCode >= 97 && charCode <= 122) && (charCode + absoluteKey) > 122) {
					let newCharCode = 97 + ((absoluteKey + charCode) - 123);
				} else {
					newCharCode = charCode + key;
				}
				let newChar = String.fromCharCode (newCharCode);
				decipheredText = decipheredText.substring (0, i) + newChar + decipheredText.substring (i + 1);
			}
		}
	}
	$ ('#caesar-result').val (decipheredText);
}

