$ ('#text-cipher-btn').on ('click', function () {
	console.log('transposition');
	//document.getElementById('matches-results-ta').val('');
	getSquareRootOrClose ();
});

function getSquareRootOrClose()
{
	let text = $ ('#text-cipher').val ();
	let textlength = text.length;
	//let squareRoot = Math.ceil(Math.sqrt(textlength));
	//let squareRoot = Math.ceil(textlength / 3);
	const max_size = Math.ceil(textlength / 2);
	const min_size = 2;
	
	console.log('getSquareRootOrClose' , 'max_size' , max_size);
	console.log('getSquareRootOrClose' , 'min_size' , min_size);
	
	let count = max_size;
	while (count > min_size) {
		let splitSize = count;
		const yardstick = new RegExp (`.{${splitSize}}`, 'g'); // /.{10}/g;
		const pieces = text.match (yardstick);
		const accumulated = (pieces.length * splitSize);
		const modulo = text.length % accumulated;
		if (modulo) pieces.push (text.slice (accumulated));
		transposeIt (pieces);
		//console.log('getSquareRootOrClose' , 'max_size' , max_size);
		//console.log('getSquareRootOrClose' , 'yardstick' , yardstick);
		console.log('getSquareRootOrClose' , 'pieces' , pieces);
		//console.log('getSquareRootOrClose' , 'accumulated' , accumulated);
		//console.log('getSquareRootOrClose' , 'modulo' , modulo);
		count--;
	}

}

function transposeIt(pieces)
{
	let piecesCount = pieces.length;
	let pieceLength = pieces[0].length;
	let rows = [];
	let columns = [];
	for(let i = 0; i < piecesCount; i++)
	{
		let piece = pieces[i];
		rows[i] = piece.split('');
		let column = [];
		for(let j = 0; j < pieceLength; j++)
		{
			column.push(piece.charAt(j));
		}
		columns[i] = column;
	}
	//console.log('transposeit' , 'columns' , columns);
	//console.log('transposeit' , 'pieces' , pieces);
	//.log('transposeit' , 'pieces' , rows);
	displayArray(columns, rows);
}

function displayArray(columns, rows)
{
	let div0 = document.createElement("div");
	div0.classList.add('row');
	let div1 = document.createElement("div");
	div1.id = 'transposition-'+rows[0].length;
	div1.classList.add('col-12');
	let table = document.createElement('table');
	table.classList.add('display');
	table.classList.add('table');
	table.classList.add('table-borderless');
	table.classList.add('table-active');
	let tbody = document.createElement('tbody');
	table.appendChild(tbody);
	for(let i = 0; i < rows.length; i++)
	{
		let row = rows[i];
		let tr = document.createElement('tr');
		let rowLength = row.length;
		for(let j = 0; j < rowLength; j++) {
				let td = document.createElement ('td');
				td.innerHTML = row[j];
				tr.appendChild (td);
		}
				tbody.appendChild(tr);
				table.appendChild(tbody);
		
	}
	div1.appendChild(table);
	div0.appendChild(div1);
	document.getElementById('matches-results-ta').appendChild(div0);
}