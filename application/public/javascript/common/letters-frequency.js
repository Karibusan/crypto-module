let alphabet = [
	'A', 'B', 'C', 'D', 'E', 'F',
	'G', 'H', 'I', 'J', 'K', 'L',
	'M', 'N', 'O', 'P', 'Q', 'R',
	'S', 'T', 'U', 'V', 'W', 'X',
	'Y', 'Z'];

$('#letter-frequency-block').hide();

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
		data.addColumn ('number', 'Ciphertext Letter Frequency');
		data.addColumn ('number', 'English Letter Frequency');
		data.addRows ([
			['A', countCharacters['A'], 8.4966], ['B', countCharacters['B'], 2.0720], ['C', countCharacters['C'], 4.5388],
			['D', countCharacters['D'], 3.3844], ['E', countCharacters['E'], 11.1607], ['F', countCharacters['F'], 1.8121],
			['G', countCharacters['G'], 2.4705], ['H', countCharacters['H'], 3.0034], ['I', countCharacters['I'], 7.5448],
			['J', countCharacters['J'], 0.1965], ['K', countCharacters['K'], 1.1016], ['L', countCharacters['L'], 5.4893],
			['M', countCharacters['M'], 3.0129], ['N', countCharacters['N'], 6.6544], ['O', countCharacters['O'], 7.1635],
			['P', countCharacters['P'], 3.1671], ['Q', countCharacters['Q'], 0.1962], ['R', countCharacters['R'], 7.5809],
			['S', countCharacters['S'], 5.7351], ['T', countCharacters['T'], 6.9509], ['U', countCharacters['U'], 3.6308],
			['V', countCharacters['V'], 1.0074], ['W', countCharacters['W'], 1.2899], ['X', countCharacters['X'], 0.2902],
			['Y', countCharacters['Y'], 1.7779], ['Z', countCharacters['Z'], 0.2722],
		]);
		let options = {
			title: 'Letter Frequency Analysis',
			width: "auto",
			height: "400",
			//bar: {groupWidth: "95%"},
			legend: {position: "top"},
			hAxis: {
				title: 'Letter',
			},
			vAxis: {
				title: 'Frequency'
			},
			animation: {
				startup: true,
				easing: 'inAndOut'
			},
		};
		$('#letter-frequency-block').show();
		let chart = new google.visualization.ColumnChart (
			document.getElementById ('letters-frequency-chart'));
		chart.draw (data, options);
		linkToCaesar (countCharacters)
	}
	
	function linkToCaesar (countCharacters) {
		if ($ ("#caesar-key").length) {
			let highestChar = '';
			let tmpCount = -1;
			for (let key in countCharacters) {
				if (countCharacters[key] > tmpCount) {
					tmpCount = countCharacters[key];
					highestChar = key;
				}
			}
			let ECharCode = "E".charCodeAt (0);
			let highestCharCode = highestChar.charCodeAt (0);
			let shift = highestCharCode - ECharCode;
			$ ("#caesar-key").val (-shift);
			$ ("#caesar-key-btn").click ();
		}
	}
}