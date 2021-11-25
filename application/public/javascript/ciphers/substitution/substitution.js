let longestWordText = null;
let pattern = '';
let words = [];
let matches = [];
let alphabet = [
	'A', 'B', 'C', 'D', 'E', 'F',
	'G', 'H', 'I', 'J', 'K', 'L',
	'M', 'N', 'O', 'P', 'Q', 'R',
	'S', 'T', 'U', 'V', 'W', 'X',
	'Y', 'Z'];

$ (function () {
	$ ('#longest-word-ta-btn').prop ('disabled', true);
});

$ ('#longest-word-ta-btn').on ('click', function () {
	longestWordText = $ ('#longest-word-ta').val ();
	removePunctuation ();
	longestWord ();
});

$ ('#longest-word-ta').bind ('paste keydown', function (e) {
	reset ();
	let eventType = e.type;
	if (eventType === 'paste') {
		longestWordText = e.originalEvent.clipboardData.getData ('text');
	} else {
		longestWordText = $ ('#longest-word-ta').val ();
	}
	if (longestWordText.length > 1) {
		$ ('#longest-word-ta-btn').prop ('disabled', false);
		
	} else {
		$ ('#longest-word-ta-btn').prop ('disabled', true);
	}
});

function removePunctuation () {
	let punctuationless = longestWordText.replace (/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
	longestWordText = punctuationless.replace (/\s{2,}/g, " ");
}

function longestWord () {
	let str = longestWordText.split (" ");
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
	searchObj ();
	populateResults ();
	populateMatches ();
    frequencyAnalysis();
	reset ();
}

function reset () {
	longestWordText = null;
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

function searchObj () {
	for (var key in dictionary) {
		var value = dictionary[key];
		if (typeof value === 'object') {
			searchObj (value, pattern);
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
	for (var key in matches) {
		var pattern = matches[key];
		var wordMatched = key;
		let tr;
		tr = $ ('<tr/>');
		tr.append ("<td>" + pattern + "</td>");
		tr.append ("<td>" + wordMatched + "</td>");
		$ ('#matches-table').append (tr);
	}
}

function frequencyAnalysis () {
    let spaceOutString = longestWordText.replace(/\s/g, '');
    spaceOutString = spaceOutString.toUpperCase();
	let textlength = spaceOutString.length;
	let alphabetLength = alphabet.length;
    let countCharacters = {};
    for (let i = 0; i < textlength; i++) {
        let char = spaceOutString.charAt (i);
        if( char in countCharacters) {
            countCharacters[char] += 1;
        }
        else
        {
            countCharacters[char] = 1;
        }
    }
    
    for (var key in countCharacters) {
        var character = key;
        var count = countCharacters[key];
        var frequency = ( count / textlength)*100;
	    countCharacters[key] = frequency;
    }
	
	google.charts.load('current', {packages: ['corechart', 'bar']});
	google.charts.setOnLoadCallback(drawBasic);
	
	function drawBasic() {
		
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Letter');
		data.addColumn('number', 'Frequency');
		
		data.addRows([
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
		
		var chart = new google.visualization.ColumnChart(
			document.getElementById('letters-frequency-chart'));
		
		chart.draw(data, options);
	}
	
}