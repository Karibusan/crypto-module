$ ('#caesar-key-btn').on ('click', function () {
	crackItJulius ();
});

function  crackItJulius()
{
	$ ('#caesar-result').val ();
	let text = $ ('#text-cipher').val ();
	let decipheredText = text;
	let textLength = text.length;
	let key = $ ('#caesar-key').val ();
	let absoluteKey = Math.abs(key);
	for(i = 0; i < textLength; i++)
	{
		let char = text.charAt(i);
		let charCode = parseInt(char.charCodeAt(0));
		if((charCode >(65 - absoluteKey) && charCode <= (90 + absoluteKey)) || (charCode >= (97 - absoluteKey) && charCode <= (122 + absoluteKey))) {
			let newCharCode = parseInt (charCode) + (parseInt (key));
			
			if(newCharCode < 65)
			{
				let position = 65 - newCharCode;
				newCharCode = 90 - position;
			}
			if(newCharCode < 97 && newCharCode > 89)
			{
				let position = 97 - newCharCode;
				newCharCode = 122 - position;
			}
			let newChar = String.fromCharCode (newCharCode);
			decipheredText = decipheredText.substring(0,i) + newChar + decipheredText.substring(i+1);
		}
	}
	$ ('#caesar-result').val (decipheredText);
}