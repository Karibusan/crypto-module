let longestWordText = null;
let pattern = '';
let words = [];
let matches = [];

$(function () {
    $('#longest-word-ta-btn').prop('disabled', true);
});

$('#longest-word-ta-btn').on('click', function () {
    longestWordText = $('#longest-word-ta').val();
    removePunctuation();
    longestWord();
});

$('#longest-word-ta').bind('paste keydown', function (e) {
    reset();
    let eventType = e.type;
    if (eventType === 'paste') {
        longestWordText = e.originalEvent.clipboardData.getData('text');
    } else {
        longestWordText = $('#longest-word-ta').val();
    }
    if (longestWordText.length > 1) {
        $('#longest-word-ta-btn').prop('disabled', false);

    } else {
        $('#longest-word-ta-btn').prop('disabled', true);
    }
});

function removePunctuation() {
    let punctuationless = longestWordText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    longestWordText = punctuationless.replace(/\s{2,}/g, " ");
}

function longestWord() {
    let str = longestWordText.split(" ");
    let longest = 0;
    let maxLength = 0;
    str.forEach(function (str) {
        if (longest < str.length) {
            longest = str.length;
            maxLength = longest;
        }
    });
    str.forEach(function (str) {
        if (maxLength === str.length) {
            words.push(str);
        }
    });
    //console.log(words);
    getPattern();
    searchObj();
    populateResults();
    populateMatches();
    reset();
    //  console.log('MATCHES' , matches);
}

function reset() {
    longestWordText = null;
    pattern = '';
    words = [];
    matches = [];
}

function getPattern() {
    for (let key in words) {
        //  let pattern = [];
        let lastCharacterUsedIndex = 0;
        let word = words[key];
        let reconstruct = '';
        //  console.log('WORD' , word);

        for (let i = 0; i < word.length; i++) {
            if (reconstruct.indexOf(word.charAt(i)) > -1) {
                var characterPosition = reconstruct.indexOf(word.charAt(i));
                //  console.log('characterPosition' , characterPosition);
                var character = pattern.charAt(characterPosition);
                //  console.log('character' , character);
                pattern += character;
            } else {
                pattern += String.fromCharCode(lastCharacterUsedIndex + 65);
                lastCharacterUsedIndex += 1;
            }
            reconstruct += word.charAt(i);
            // console.log('patternString' , pattern);
            //  console.log('RECONSTRUCT' , reconstruct);
        }
    }

}

function searchObj() {
    for (var key in dictionary) {
        var value = dictionary[key];
        if (typeof value === 'object') {
            searchObj(value, pattern);
        }
        if (value === pattern) {
            matches[key] = value;
        }
    }
}


function populateResults() {
    $("#words-table-content").empty();
    // console.log('WORDS' , words);
    for (var key in words) {
        var word = words[key];
        // console.log(word);
        let tr;
        tr = $('<tr/>');
        tr.append("<td>" + word + "</td>");
        tr.append("<td>" + word.length + "</td>");
        tr.append("<td>" + pattern + "</td>");
        $('#words-table').append(tr);
    }
}

function populateMatches() {
    $("#matches-table-content").empty();
    // console.log('MATCHES' , matches);
    for (var key in matches) {
        var pattern = matches[key];
        var wordMatched = key;
        // console.log(wordMatched);
        let tr;
        tr = $('<tr/>');
        tr.append("<td>" + pattern + "</td>");
        tr.append("<td>" + wordMatched + "</td>");
        $('#matches-table').append(tr);
    }
}