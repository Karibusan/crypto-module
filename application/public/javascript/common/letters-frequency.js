let alphabet = [
	'A', 'B', 'C', 'D', 'E', 'F',
	'G', 'H', 'I', 'J', 'K', 'L',
	'M', 'N', 'O', 'P', 'Q', 'R',
	'S', 'T', 'U', 'V', 'W', 'X',
	'Y', 'Z'];

$ ('#text-cipher-btn').on ('click', function () {
	frequencyAnalysis ();
});

function frequencyAnalysis () {
	let text = $ ('#text-cipher').val ();
	text = text.replace (/[.,\/#!$%\^&\*;?:{}=\-\—_`~()]/g, "   ");
	text = text.replace (/\s{2,}/g, " ");
	text = text.replace (/\s/g, '');
	text = text.toUpperCase ();
	let textlength = text.length;
	let alphabetLength = alphabet.length;
	let countCharacters = {};
	for (let i = 0; i < textlength; i++) {
		let char = text.charAt (i);
		if (char in countCharacters) {
			countCharacters[char] += 1;
		} else {
			countCharacters[char] = 1;
		}
	}
	
	for (let key in countCharacters) {
		let character = key;
		let count = countCharacters[key];
		let frequency = (count / textlength) * 100;
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
		
		let options = {
			title: 'Letter Frequency Analysis',
			hAxis: {
				title: 'Letter',
			},
			vAxis: {
				title: 'Frequency'
			}
		};
		
		let chart = new google.visualization.ColumnChart (
			document.getElementById ('letters-frequency-chart'));
		
		chart.draw (data, options);
	}
}