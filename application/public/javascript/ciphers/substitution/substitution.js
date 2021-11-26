let textToDecrypt = null;
let pattern = '';
let words = [];
let matches = [];
let dictionaryWordApplied = [];


let alphabet = [
	'A', 'B', 'C', 'D', 'E', 'F',
	'G', 'H', 'I', 'J', 'K', 'L',
	'M', 'N', 'O', 'P', 'Q', 'R',
	'S', 'T', 'U', 'V', 'W', 'X',
	'Y', 'Z'];

let mapping = {};

$ (function () {
	$ ('#longest-word-ta-btn').prop ('disabled', true);
});

$ ('#longest-word-ta-btn').on ('click', function () {
	textToDecrypt = $ ('#longest-word-ta').val ();
	longestWord ();
});

$ ('#longest-word-ta').bind ('paste keydown', function (e) {
	reset ();
	let eventType = e.type;
	if (eventType === 'paste') {
		textToDecrypt = e.originalEvent.clipboardData.getData ('text');
	} else {
		textToDecrypt = $ ('#longest-word-ta').val ();
	}
	if (textToDecrypt.length > 1) {
		$ ('#longest-word-ta-btn').prop ('disabled', false);
		
	} else {
		$ ('#longest-word-ta-btn').prop ('disabled', true);
	}
});


function longestWord () {
	let punctuationless = textToDecrypt.replace (/[.,\/#!$%\^&\*;?:{}=\-\—_`~()]/g, "");
	let longestWordTextNoPunctuation = punctuationless.replace (/\s{2,}/g, " ");
	let str = longestWordTextNoPunctuation.split (" ");
	let longest = 0;
	let maxLength = 0;
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
	getPattern ();
	searchInDictionary ();
	populateResults ();
	crackItBoy ();
	populateMatches ();
	frequencyAnalysis ();
	reset ();
}

function reset () {
	textToDecrypt = null;
	pattern = '';
	words = [];
	matches = [];
}

function getPattern () {
	for (let key in words) {
		let lastCharacterUsedIndex = 0;
		let word = words[key];
		let reconstruct = '';
		
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
	}
	
}

function searchInDictionary () {
	for (var key in dictionary) {
		var value = dictionary[key];
		if (typeof value === 'object') {
			searchInDictionary (value, pattern);
		}
		if (value === pattern) {
			matches[key] = value;
		}
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
		tr.append ("<td>" + pattern + "</td>");
		$ ('#words-table').append (tr);
	}
}

function populateMatches () {
	$ ("#matches-table-content").empty ();
	for (let key in matches) {
		let pattern = matches[key];
		let wordMatched = key;
		let tr;
		tr = $ ('<tr/>');
		tr.append ("<td>" + pattern + "</td>");
		tr.append ("<td>" + wordMatched + "</td>");
		$ ('#matches-table').append (tr);
		tr = $ ('<tr/>');
		tr.append ("<td colspan='3'>" + dictionaryWordApplied[key] + "</td>");
		$ ('#matches-table').append (tr);
	}
}

function frequencyAnalysis () {
	let spaceOutString = textToDecrypt.replace (/\s/g, '');
	spaceOutString = spaceOutString.toUpperCase ();
	let textlength = spaceOutString.length;
	let alphabetLength = alphabet.length;
	let countCharacters = {};
	for (let i = 0; i < textlength; i++) {
		let char = spaceOutString.charAt (i);
		if (char in countCharacters) {
			countCharacters[char] += 1;
		} else {
			countCharacters[char] = 1;
		}
	}
	
	for (var key in countCharacters) {
		var character = key;
		var count = countCharacters[key];
		var frequency = (count / textlength) * 100;
		countCharacters[key] = frequency;
	}
	
	google.charts.load ('current', {packages: ['corechart', 'bar']});
	google.charts.setOnLoadCallback (drawBasic);
	
	function drawBasic () {
		
		var data = new google.visualization.DataTable ();
		data.addColumn ('string', 'Letter');
		data.addColumn ('number', 'Frequency');
		
		data.addRows ([
			['A', countCharacters['A']], ['B', countCharacters['B']], ['C', countCharacters['C']],
			['D', countCharacters['D']], ['E', countCharacters['E']], ['F', countCharacters['F']],
			['G', countCharacters['G']], ['H', countCharacters['H']], ['I', countCharacters['I']],
			['J', countCharacters['J']], ['K', countCharacters['K']], ['L', countCharacters['L']],
			['M', countCharacters['M']], ['N', countCharacters['N']], ['O', countCharacters['O']],
			['P', countCharacters['P']], ['Q', countCharacters['Q']], ['R', countCharacters['R']],
			['S', countCharacters['S']], ['T', countCharacters['T']], ['U', countCharacters['U']],
			['V', countCharacters['V']], ['W', countCharacters['W']], ['X', countCharacters['X']],
			['Y', countCharacters['Y']], ['Z', countCharacters['Z']],
		]);
		
		var options = {
			title: 'Letter Frequency Analysis',
			hAxis: {
				title: 'Letter',
			},
			vAxis: {
				title: 'Frequency'
			}
		};
		
		var chart = new google.visualization.ColumnChart (
			document.getElementById ('letters-frequency-chart'));
		
		chart.draw (data, options);
	}
}

function crackItBoy () {
	let combinations = matches;
	let decryptedText = textToDecrypt;
	for (let key in combinations) {
		let combination = combinations[key];
		for (i = 0; i < combination.length; i++) {
			let originalWord = words[i];
			mapIt (originalWord, key);
			for (i = 0; i < textToDecrypt.length; i++) {
				decryptedText = substituteChar (decryptedText, i);
			}
		}
		dictionaryWordApplied[key] = decryptedText;
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

function mapIt (encryptedWord, dictionaryWord) {
	encryptedWord = encryptedWord.toUpperCase ();
	dictionaryWord = dictionaryWord.toUpperCase ();
	for (i = 0; i < encryptedWord.length; i++) {
		mapping[encryptedWord.charAt (i)] = dictionaryWord.charAt (i);
	}
}