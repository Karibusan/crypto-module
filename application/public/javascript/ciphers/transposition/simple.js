$ ('#text-cipher-btn').on ('click', function () {
	console.log('transposition');
	getSquareRootOrClose ();
});

function getSquareRootOrClose()
{
	let text = $ ('#text-cipher').val ();
	let textlength = text.length;
	let chars = text.split('');
	//let squareRoot = Math.ceil(Math.sqrt(textlength));
	let squareRoot = Math.ceil(textlength / 2);
	console.log(squareRoot);
}

function transposeIt(text, length)
{
	for(i = 0; i < length; i++)
	{
	
	}

}