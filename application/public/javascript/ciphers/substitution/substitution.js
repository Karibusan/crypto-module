let textToDecrypt = null;
let patterns = [];
let words = [];
let matches = [];
let dictionaryWordApplied = [];

let mapping = {};

$ (function () {
	$ ('#text-cipher-btn').prop ('disabled', true);
});

$ ('#text-cipher-btn').on ('click', function () {
	textToDecrypt = $ ('#text-cipher').val ();
	checkCipherText ();
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


function checkCipherText () {
	let punctuationless = textToDecrypt.replace (/[.,\/#!$%\^&\*;?:{}=\-\—_`~()]/g, "   ");
	let longestWordTextNoPunctuation = punctuationless.replace (/\s{2,}/g, " ");
	let str = longestWordTextNoPunctuation.split (" ");
	let longest = 0;
	let maxLength = 0;
	let areYouChunked = isTextChunked(longestWordTextNoPunctuation);
	if(areYouChunked === false) {
		str.forEach (function (str) {
			if (longest < str.length) {
				longest = str.length;
				maxLength = longest;
			}
		});
		str.forEach (function (str) {
			if (maxLength === str.length) {
				words.push (str);
			}
		});
	}
	else
	{
		longest = longestPattern(punctuationless.replace (/\s/g, ""));
		if(longest.length > 0 )
		{
			words.push (longest);
		}
	}
	getPatterns ();
	searchInDictionary ();
	populateResults ();
	crackItBoy ();
	populateMatches ();
	reset ();
}

function reset () {
	textToDecrypt = null;
	patterns = [];
	words = [];
	matches = [];
}

function getPatterns () {
	for (let key in words) {
		let lastCharacterUsedIndex = 0;
		let word = words[key];
		let reconstruct = '';
		let pattern = '';
		for (let i = 0; i < word.length; i++) {
			if (reconstruct.indexOf (word.charAt (i)) > -1) {
				var characterPosition = reconstruct.indexOf (word.charAt (i));
				var character = pattern.charAt (characterPosition);
				pattern += character;
			} else {
				pattern += String.fromCharCode (lastCharacterUsedIndex + 65);
				lastCharacterUsedIndex += 1;
			}
			reconstruct += word.charAt (i);
		}
		patterns.push(pattern);
	}
	
}

function searchInDictionary () {
	for (var patternKey in patterns) {
		let pattern = patterns[patternKey];
		let match = [];
		for (var key in dictionary) {
			var value = dictionary[key];
			if (value === pattern) {
				match.push(key);
			}
		}
		matches[pattern] = match;
	}
}

function populateResults () {
	$ ("#words-table-content").empty ();
	for (var key in words) {
		var word = words[key];
		let tr;
		tr = $ ('<tr/>');
		tr.append ("<td>" + word + "</td>");
		tr.append ("<td>" + word.length + "</td>");
		tr.append ("<td>" + patterns[key] + "</td>");
		$ ('#words-table').append (tr);
	}
}

function populateMatches () {
	$ ("#matches-table-content").empty ();
	for (let key in matches) {
		let pattern = matches[key];
		let wordMatched = key;
		let tr;
		let match = matches[key];
		
		for(let dictionaryMatch in match){
			let decryptWord = match[dictionaryMatch];
			let decryptedText = dictionaryWordApplied[decryptWord];
			tr = $ ('<tr/>');
			tr.addClass ('table-info');
			tr.append ("<td>" + key + "</td>");
			tr.append ("<td>" + decryptWord + "</td>");
			tr.append ("<td>" + decryptedText + "</td>");
			$ ('#matches-table').append (tr);
		}
	}
}

function crackItBoy () {
	let combinations = matches;
	let decryptedText = '';
	for (let key in combinations) {
		let combination = combinations[key];
		if(combination.length > 0) {
			for(let combinationKey in combination) {
				let decryptedText = textToDecrypt;
				let encryptionKey = combination[combinationKey];
				for (i = 0; i < encryptionKey.length; i++) {
					let originalWord = words[i];
					mapIt (originalWord, encryptionKey);
					for (i = 0; i < textToDecrypt.length; i++) {
						decryptedText = substituteChar (decryptedText, i);
					}
					dictionaryWordApplied[encryptionKey] = decryptedText;
				}
			}
		}
	}
}

function substituteChar (text, index) {
	let finalText = text;
	let encryptedTextChar = text.charAt (index);
	let substitutionChar = mapping[encryptedTextChar];
	if (substitutionChar === undefined) {
		substitutionChar = mapping[encryptedTextChar.toUpperCase ()];
		if (substitutionChar !== undefined)
			substitutionChar = substitutionChar.toLowerCase ();
	}
	if (substitutionChar !== undefined)
		finalText = text.substring (0, index) + substitutionChar + text.substring (index + 1);
	return finalText;
}

function isTextChunked(text) {
	let explodedString = text.split(' ');
	let arrayLength = explodedString.length;
	let chunkSize = explodedString[0].length;
	let areYouChunked = true;
	for(i = 0; i < arrayLength -1; i++)
	{
		let chunk = explodedString[i];
		let chunkLength = chunk.length;
		if(chunkLength !== chunkSize)
			areYouChunked = false;
	}
	return areYouChunked;
}

function mapIt (encryptedWord, dictionaryWord) {
	encryptedWord = encryptedWord.toUpperCase ();
	dictionaryWord = dictionaryWord.toUpperCase ();
	for (i = 0; i < encryptedWord.length; i++) {
		mapping[encryptedWord.charAt (i)] = dictionaryWord.charAt (i);
	}
}

function longestPattern(text)
{
	text = text.split(' ').join();
	let textLength = text.length;
	let longestPattern = '';
	for(i = 0; i < textLength; i++)
	{
		for(j = i+1; j < textLength -1; j++)
		{
			let x = largestCommonPrefix(text.substr(i), text.substr(j))
			if(x.length > longestPattern.length){
				longestPattern = x;
			}
		}
	}
	return longestPattern;
}

function largestCommonPrefix (str, text) {
	let delta = (str.length < text.length) ? str.length : text.length;
	for(k = 0; k < delta; k++)
	{
		if(str[k] !== text[k]){
			return str.substr(0, k);
		}
	}
	return str.substr(0, delta);
}
