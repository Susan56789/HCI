//holds the language of the typing (the default is english)
var lang = "english";
//holds all the records to all the languages with the respective language and its record
var records = [
    ["english", 0],
    ["french", 0],
    ["german", 0],
    ["italian", 0],
    ["portuguese", 0],
    ["spanish", 0]
];
//called when the web application starts
function start() {
    startMenu();
}
//shows the start menu
function startMenu() {
    //creates the main container of this menu
    var container = createContainer("0%", "0%", "100%", "100%", "startMenu");
    document.body.appendChild(container);

    //creates the main title
    var title = document.createElement("h1");
    container.appendChild(title);

    //sets all the elements inside the container to align to the center
    container.style.textAlign = "center";
    //sets the main title of the page
    title.appendChild(document.createTextNode("TYPING SPEED"));
    //sets the color of the text
    title.style.color = "#02C902";
    //sets the position of the title
    title.style.marginTop = "30%";
    //sets the weight of the font
    title.style.fontWeight = "1000";

    //creates the start button
    var startButton = createButton("auto", "auto", "40%", "10%", "START");
    //sets the size of the text inside the button
    startButton.style.fontSize = "20px";
    //when the button is clicked
    startButton.addEventListener('click', function () {
        //remove this menu
        document.body.removeChild(document.getElementById("startMenu"));
        //loads the language menu
        languageMenu();
    });
    //append to the main container the button
    container.appendChild(startButton);
}
//shows the language menu
function languageMenu() {
    //creates the main container of this menu
    var container = createContainer("0%", "0%", "100%", "100%", "languageMenu");
    document.body.appendChild(container);

    //align all the text to the center
    container.style.textAlign = "center";

    //creates the main title
    var title = document.createElement("h1");
    container.appendChild(title);

    //sets the main title of the page
    title.appendChild(document.createTextNode("Choose Your Typing Language"));
    //sets the color of the text
    title.style.color = "#02C902";
    //sets the position of the title
    title.style.marginTop = "10%";
    //set the font size
    title.style.fontSize = "100%";
    //sets the weight of the font
    title.style.fontWeight = "1000";

    //create the england flag
    var english = createImage("20%", "30%", "15%", "15%", 0, container, false);
    container.appendChild(english);
    //create the france flag
    var french = createImage("40%", "30%", "15%", "15%", 1, container, false);
    container.appendChild(french);
    //create the germany flag
    var german = createImage("60%", "30%", "15%", "15%", 2, container, false);
    container.appendChild(german);
    //create the italy flag
    var italian = createImage("20%", "50%", "15%", "15%", 3, container, false);
    container.appendChild(italian);
    //create the portugal flag
    var portuguese = createImage("40%", "50%", "15%", "15%", 4, container, false);
    container.appendChild(portuguese);
    //create the spain flag
    var spanish = createImage("60%", "50%", "15%", "15%", 5, container, false);
    container.appendChild(spanish);
}
//shows the typing menu
function typingMenu() {
    //hols the app state
    var isPlaying = false;

    //creates the main container of this menu
    var container = createContainer("0%", "0%", "100%", "100%", "typingMenu");
    document.body.appendChild(container);
    //aligns all the elements inside this container to the center
    container.style.textAlign = "center";

    //creates the current word container and put it inside the main container
    var currentWordContainer = document.createElement("div");
    container.appendChild(currentWordContainer);
    //sets the dimension of the current word container
    currentWordContainer.style.width = "50%";
    currentWordContainer.style.height = "12%";
    //sets the postion of the current word container 
    currentWordContainer.style.margin = "0 auto 5% auto";
    currentWordContainer.style.backgroundColor = "#DFDFDF";
    currentWordContainer.style.color = "#02C902";
    currentWordContainer.style.fontSize = Math.ceil((26 * parseFloat(currentWordContainer.style.height)) / 16) + "px";
    //align all the words inside this container to the center
    currentWordContainer.style.textAlign = "center";

    //creates the previous word container and put it inside the main container
    var previousWordContainer = document.createElement("div");
    container.appendChild(previousWordContainer);
    //sets the dimension of the word container
    previousWordContainer.style.width = "25%";
    previousWordContainer.style.height = "10%";
    //sets the postion of the word container 
    previousWordContainer.style.position = "absolute";
    previousWordContainer.style.top = "0px";
    previousWordContainer.style.left = "0px";
    previousWordContainer.style.backgroundColor = "#DFDFDF";
    previousWordContainer.style.color = "#C90202";
    previousWordContainer.style.fontSize = "85%";
    //align all the words inside this container to the center
    previousWordContainer.style.textAlign = "center";

    //creates the previous word container and put it inside the main container
    var nextWordContainer = document.createElement("div");
    container.appendChild(nextWordContainer);
    //sets the dimension of the word container
    nextWordContainer.style.width = "25%";
    nextWordContainer.style.height = "10%";
    //sets the postion of the word container 
    nextWordContainer.style.position = "absolute";
    nextWordContainer.style.top = "0px";
    nextWordContainer.style.left = "75%";
    nextWordContainer.style.backgroundColor = "#DFDFDF";
    nextWordContainer.style.color = "#787878";
    nextWordContainer.style.fontSize = "85%";
    //align all the words inside this container to the center
    nextWordContainer.style.textAlign = "center";

    //assigns to the current word and next word variables a random word
    var currentWord = randomWord(lang);
    var nextWord = randomWord(lang);
    //updates the respective text
    currentWordContainer.innerHTML = currentWord;
    nextWordContainer.innerHTML = nextWord;

    //initializes the cpm counter to 0
    var cpm = 0;

    //creates the typing field
    var typer = document.createElement("input");
    container.appendChild(typer);
    typer.style.textAlign = "center";
    typer.style.color = "#02C902";
    typer.style.fontWeight = "bold";
    typer.style.fontSize = "20px";

    //enter a key text
    var enterKeyText = document.createElement("h1");
    container.appendChild(enterKeyText);
    enterKeyText.style.color = "#02C902";
    enterKeyText.style.fontSize = "80%";
    enterKeyText.innerHTML = 'Enter the first word to start the timer';

    //creates the cpm counter display text
    var cpmCounter = document.createElement("h1");
    container.appendChild(cpmCounter);
    cpmCounter.style.color = "#02C902";
    cpmCounter.style.fontSize = "100%";
    cpmCounter.innerHTML = 'CPM: ' + cpm;

    //add to the body the event of the enter key being presse
    document.body.addEventListener('keyup', function (e) {
        //if the Enter key was pressed
        if (e.keyCode == 13 || e.keyCode == 32) {
            //if the current word is well spelled
            if (typer.value.toLowerCase().trim() == currentWord) {
                //clean the typer
                typer.value = "";
                //get the number of characters in the word entered
                var chars = currentWord.length;
                //sum them to the cpm variable
                cpm += chars;
                //update the cpm counter text
                cpmCounter.innerHTML = 'CPM: ' + cpm;
                //set the color of the previous word to green (indicating the good spelling)
                previousWordContainer.style.color = "#02C902";
            }
            //otherwise (if the word is bad spelled)
            else {
                //count the first well spelled letter only and add them to the counter

                var c, numChars = currentWord.length, typedWord = typer.value.toString();
                //loop through all the characters entered
                for (c = 0; c < numChars; c++) {
                    //if the current character is equal to the respective character on the current word
                    if (currentWord.charAt(c) == typedWord.charAt(c).toLowerCase()) {
                        //increment the cpm counter
                        cpm++;
                    }
                    //else(if the current char is not equal to the respective char on the current word)
                    else
                        break;
                }
                //clean the typer
                typer.value = "";
                //update the cpm counter text
                cpmCounter.innerHTML = 'CPM: ' + cpm;
                //set the color of the previous word to red (indicating the bad spelling)
                previousWordContainer.style.color = "#C90202";
            }
            //set the text of the previous word to the current word value
            previousWordContainer.innerHTML = currentWord;
            //assign to the current word variable the next word value
            currentWord = nextWord;
            //assign to the next word variable a random word of this language
            nextWord = randomWord(lang);
            //set the text of the current word to the current word value
            currentWordContainer.innerHTML = currentWord;
            //set the text of the next word to the next word text
            nextWordContainer.innerHTML = nextWord;

            //if isnt started
            if (!isPlaying) {
                //create the timer text
                var timerText = document.createElement("h1");
                container.appendChild(timerText);
                timerText.style.color = "#02C902";
                timerText.style.fontSize = "100%";

                //create the variable holding the timer value
                var timerCounter = 60;

                timerText.innerHTML = 'TIMER: ' + timerCounter;

                //creates timing event that will be fired every second (1000 milliseconds)
                var time = setInterval(function () {
                    //decrease the timer value
                    timerCounter--;
                    //updates the timer text
                    timerText.innerHTML = 'TIMER: ' + timerCounter;
                    //if the timer is equals or less than zero
                    if (timerCounter <= 0) {
                        //stop this timing event
                        clearInterval(time);

                        //eliminate the main container of this menu
                        document.body.removeChild(document.getElementsByTagName("div")[0]);

                        //loads the try again menu
                        tryAgainMenu(cpm, lang);
                    }
                }, 1000);

                enterKeyText.innerHTML = 'Enter this word to activate the next';

                //set the variable (boolean) isPlaying to true
                isPlaying = true;
            }
        }
    });
}
//loads the try again menu given the cpms and the language of the previous game
function tryAgainMenu(cpm, lang) {
    //if the cpm obtained is higher than the previous record of this language
    if (cpm > languageRecord(lang))
        replaceRecord(cpm, lang);

    //creates the main container of this menu
    var container = createContainer("0%", "0%", "100%", "100%", "typingMenu");
    document.body.appendChild(container);
    //aligns all the elements inside this container to the center
    container.style.textAlign = "center";

    //shows the cpm scored in the previous game
    var cpmScored = document.createElement("h1");
    container.appendChild(cpmScored);
    cpmScored.style.color = "#02C902";
    cpmScored.style.fontSize = "100%";
    cpmScored.innerHTML = 'CPM: ' + cpm;

    //shows the cpm record on the language previously played
    var cpmLanguageRecord = document.createElement("h1");
    container.appendChild(cpmLanguageRecord);
    cpmLanguageRecord.style.color = "#02C902";
    cpmLanguageRecord.style.fontSize = "100%";
    cpmLanguageRecord.innerHTML = 'LANGUAGE RECORD: ' + languageRecord(lang) + ' CPM (' + lang + ')';

    //shows the all time cpm record and the language where it was obtained
    var cpmBestRecord = document.createElement("h1");
    container.appendChild(cpmBestRecord);
    cpmBestRecord.style.color = "#02C902";
    cpmBestRecord.style.fontSize = "100%";
    cpmBestRecord.innerHTML = 'CPM RECORD: ' + bestRecord() + ' (' + recordLanguage(bestRecord()) + ')';

    //shows a little author text xD
    var authorText = document.createElement("h1");
    container.appendChild(authorText);
    authorText.style.color = "#C9C9C9";
    authorText.style.fontSize = "80%";
    if (cpm >= 400)
        authorText.innerHTML = 'So... You expected something more here...';
    else if (cpm < 400 && cpm >= 380)
        authorText.innerHTML = 'Are you an alien? That was truly extraterrestrial!<br/>' +
            'I am sure that your alien race has more than two hands to type.<br />' +
            'Share in the comments your alien score.';
    else if (cpm < 380 && cpm >= 350)
        authorText.innerHTML = 'Do you still have fingers? I am pretty sure that your keyboard is on fire.<br/>' +
            'Share in the comments section how many fingers you have left!<br />' +
            'P.S. : If you want, you can share your score too...';
    else if (cpm < 350 && cpm >= 300)
        authorText.innerHTML = 'I am sure you are in the Guiness now. Congratulations, you are the best!<br/>' +
            'Show to the others, on the comments section, your incredible high score.';
    else if (cpm < 300 && cpm >= 250)
        authorText.innerHTML = 'That was really awesome ninja, I am sure you can type faster than everyone here.<br/>' +
            'Share in the comments section how many characters you can type Ninja!';
    else if (cpm < 250 && cpm >= 200)
        authorText.innerHTML = 'That was wonderful, I am sure you have beaten some personal record.<br/>' +
            'You really need to share in the comments section how high you scored in this language!';
    else if (cpm < 200 && cpm >= 180)
        authorText.innerHTML = 'I am very impressed, you scored way above the average.<br />' +
            'Share in the comments section how high you scored in this language!';
    else if (cpm < 180 && cpm >= 160)
        authorText.innerHTML = 'Good job you manage to do it above the average.<br />' +
            'Share in the comments section how high you scored in this language!';
    else if (cpm < 160 && cpm >= 140)
        authorText.innerHTML = 'You type like most of the people. Keep typing.<br />' +
            'Share in the comments section how high you scored in this language!';
    else if (cpm < 140 && cpm >= 100)
        authorText.innerHTML = 'That seemed a lot of effort. You are below the average person.<br />' +
            'Share in the comments section how high you scored in this language!';
    else if (cpm < 100)
        authorText.innerHTML = 'That was horrible. Did you sleep during the test?<br />' +
            'Share in the comments section if you have the courage, how high you scored in this language!';

    //creates the try again button
    var againButton = createButton("auto", "44%", "28%", "10%", "TRY AGAIN");
    container.appendChild(againButton);
    againButton.style.fontSize = "80%";
    againButton.addEventListener('click', function () {
        document.body.removeChild(document.getElementsByTagName("div")[0]);
        typingMenu();
    });

    //creates the return to menu button
    var menuButton = createButton("2%", "44%", "28%", "10%", "MENU");
    container.appendChild(menuButton);
    menuButton.style.fontSize = "80%";
    menuButton.addEventListener('click', function () {
        document.body.removeChild(document.getElementsByTagName("div")[0]);
        startMenu();
    });
}
//returns a random word given: language
function randomWord(language) {
    if (language == "english") {
        return english_Words[random(0, english_Words.length - 1)];
    }
    else if (language == "french") {
        return french_Words[random(0, french_Words.length - 1)];
    }
    else if (language == "german") {
        return german_Words[random(0, german_Words.length - 1)];
    }
    else if (language == "italian") {
        return italian_Words[random(0, italian_Words.length - 1)];
    }
    else if (language == "portuguese") {
        return portuguese_Words[random(0, portuguese_Words.length - 1)];
    }
    else if (language == "spanish") {
        return spanish_Words[random(0, spanish_Words.length - 1)];
    }
}
//returns a random number between a min and a max inclusive
function random(min, max) {
    return Math.floor((Math.random() * max) - min) + 1;
}
//creates the main container for a menu given: x, y, width, height and id
function createContainer(x, y, width, height, id) {
    //creates a DIV element
    var div = document.createElement("div");

    //sets the position of the div
    div.style.marginLeft = x;
    div.style.marginRight = "auto";
    div.style.marginTop = y;
    div.style.marginBottom = "auto";

    //set the dimension of the div
    div.style.width = width;
    div.style.height = height;

    //set the id of the div
    div.setAttribute("id", id);

    return div;
}
//creates a button given: x,y, width,height and text
function createButton(x, y, width, height, text) {
    //creates a BUTTON element
    var button = document.createElement("button");

    //sets the position of the button
    button.style.marginLeft = x;
    button.style.marginRight = "auto";
    button.style.marginTop = y;
    button.style.marginBottom = "auto";

    //sets the dimension of the button
    button.style.width = width;
    button.style.height = height;

    //remove the border of the button
    button.style.border = "0px";
    //remove the browser outlining
    button.style.outline = "none";
    //sets the background color of the button
    button.style.backgroundColor = "#008600";
    //sets the color of the text inside the button
    button.style.color = "#DCDCDC";

    //sets the text inside the button
    button.appendChild(document.createTextNode(text));

    //when the mouse is over the button
    button.addEventListener('mouseover', function () {
        //sets a border
        button.style.border = "5px solid #0000AA";
    });
    //when the mouse leaves the button, everything returns to the defaults
    button.addEventListener('mouseleave', function () {
        //remove the border of the button
        button.style.border = "0px";
    });

    return button;
}
//creates a image given: x,y,width,height,sourceNumber, the menu container
function createImage(x, y, width, height, sourceNumber, container) {
    //creates a IMG element
    var image = document.createElement("img");

    //sets the position of the image
    image.style.position = "absolute";
    image.style.left = x;
    image.style.top = y;

    //sets the dimensions of the image
    image.setAttribute("width", width);
    image.setAttribute("height", height);

    //set the source of the image
    image.setAttribute("src", flags[sourceNumber]);


    //sets the border of the image
    image.style.border = "5px solid #26AF26";

    //on mouse over
    image.addEventListener('mouseover', function () {
        //change the border
        image.style.border = "5px solid #2626AF";
    });
    //on mouse leave
    image.addEventListener('mouseleave', function () {
        //change the border
        image.style.border = "5px solid #26AF26";
    });
    //on mouse click
    image.addEventListener('mousedown', function () {
        //change the language to the language of the flag clicked
        switch (sourceNumber) {
            case 0:
                lang = "english";
                break;
            case 1:
                lang = "french";
                break;
            case 2:
                lang = "german";
                break;
            case 3:
                lang = "italian";
                break;
            case 4:
                lang = "portuguese";
                break;
            case 5:
                lang = "spanish";
                break;

        }
        //removes this menu
        document.body.removeChild(container);
        //loads the typing menu
        typingMenu();
    });

    return image;
}
//return a record of a given language
function languageRecord(language) {
    var i, numLanguages = records.length;
    for (i = 0; i < numLanguages; i++) {
        if (records[i][0] == language) {
            return records[i][1];
        }
    }
}
//return the language pf a given record
function recordLanguage(record) {
    var i, numLanguages = records.length;
    for (i = 0; i < numLanguages; i++) {
        if (records[i][1] == record) {
            return records[i][0];
        }
    }
}
//replace the record of a language given: the language and the new record
function replaceRecord(value, language) {
    var i, numLanguages = records.length;
    for (i = 0; i < numLanguages; i++) {
        if (records[i][0] == language) {
            records[i][1] = value;
        }
    }
}
//return the maximum cpm obtained ever
function bestRecord() {
    var i, numLanguages = records.length, max = records[0][1];
    for (i = 1; i < numLanguages; i++) {
        if (records[i][1] > max)
            max = records[i][1];
    }
    return max;
}


//contains the sources of the flags images
var flags = [
    "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1280px-Flag_of_the_United_Kingdom.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Civil_and_Naval_Ensign_of_France.svg/2000px-Civil_and_Naval_Ensign_of_France.svg.png",
    "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1280px-Flag_of_Germany.svg.png",
    "https://images-na.ssl-images-amazon.com/images/I/410xf8qcicL._SX300_.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/255px-Flag_of_Portugal.svg.png",
    "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1280px-Flag_of_Spain.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg"
];

//contais all the english words for the app
var english_Words = [
    "the", "of", "and", "to", "in", "is", "you", "are", "for",
    "that", "or", "it", "as", "be", "on", "your", "with", "can", "have",
    "this", "an", "by", "not", "but", "at", "from", "they", "more", "will",
    "if", "some", "there", "what", "about", "which", "when", "one", "their", "all",
    "also", "how", "many", "do", "has", "most", "people", "other", "time", "so",
    "was", "we", "these", "may", "like", "use", "into", "than", "up", "out",
    "who", "them", "make", "because", "such", "through", "get", "work", "even", "different",
    "no", "our", "new", "film", "just", "only", "see", "used", "good",
    "water", "been", "need", "should", "very", "any", "history", "often", "way", "well",
    "art", "know", "were", "then", "my", "first", "would", "money", "each", "over",
    "diligent", "eloquent", "empathy", "erudite", "fabricate", "forsake", "gluttony",
    "hypocrisy", "impeccable", "impertinent", "implacable", "incisive", "inept",
    "infamy", "inhibit", "innate", "insatiable", "intrepid", "jubilant", "maverick",
    "meticulous", "nominal", "novice", "nuance", "oblivious", "obtuse", "parody",
    "predilection", "repudiate", "salient", "superfluous", "taciturn", "venerable",
    "vociferous", "sad", "brief", "housing", "post", "purchase", "existing", "dark", "steel",
    "regarding", "shout", "remaining", "visual", "fairly", "chip", "violent", "silent", "suppose",
    "self", "bike", "tea", "perceive", "comparison", "settlement", "layer", "planning", "far",
    "description", "later", "slow", "slide", "widely", "wedding", "inform", "portion", "territory",
    "immediate", "opponent", "abandon", "link", "mass", "lake", "transform", "tension", "display",
    "leading", "bother", "consist", "alcohol", "enable", "bend", "gain", "desert", "shall", "error",
    "release", "double", "walk", "sand", "rule", "hit", "print", "preserve", "dictionary",
    "imagine", "stadium", "win", "lose", "science", "world", "angry", "wolf", "bird", "start",
    "go", "girl", "boy", "father", "mother", "child", "children", "lonely", "moon", "cat", "dog",
    "president", "call", "red", "blue", "yellow", "black", "white", "constant", "school",
    "close", "closed", "closet", "room", "green", "typing", "speed", "earth", "love",
    "found", "soul", "country", "sadness", "worry", "sport", "drink", "program", "programming",
    "skills", "job", "college", "hope", "dead", "alive", "life", "above", "average", "record",
    "language", "share", "comment", "section", "again", "manage", "keyboard", "chess", "play",
    "game", "television", "space", "galaxy", "neutron", "subatomic", "particle", "electron", "fiction",
    "monkey", "machine", "grass", "ball", "square", "logic", "computer", "absorb", "abstract", "accuracy",
    "acid", "entropy", "zygote", "kinetic", "eclipse", "twilight", "wizard", "witch", "broom", "corn", "popcorn",
    "movie", "careful", "aberration", "abject", "abnegation", "bashful"
];

//contais all the french words for the app
var french_Words = [
    "avoir", "je", "de", "ne", "pas", "le", "la", "tu", "vous", "tout",
    "il", "et", "un", "qui", "aller", "les", "en", "faire", "on", "que",
    "ce", "une", "mes", "pour", "se", "des", "dire", "pouvoir", "vouloir", "mais",
    "me", "nous", "dans", "elle", "savoir", "du", "bien", "voir", "plus", "non",
    "te", "mon", "au", "avec", "moi", "si", "quoi", "devoir", "oui", "ils",
    "comme", "venir", "sur", "toi", "ici", "rien", "lui", "bon", "suivre", "pourquoi",
    "parler", "prendre", "cette", "quand", "alors", "par", "son", "croire", "aimer", "falloir",
    "comment", "ou", "passer", "penser", "aussi", "jamais", "attendre", "trouver", "laisser", "petit",
    "merci", "sa", "ta", "autre", "arriver", "ces", "donner", "regarder", "encore", "appeler",
    "peu", "homme", "partir", "ma", "toujours", "jour", "femme", "temps", "maintenant", "notre",
    "blague", "avenir", "laisse", "course", "traverser", "soin", "hors", "cour", "gauche", "retenir", "liste", "remonter", "moquer", "installer", "courage", "bleu", "secours", "milieu",
    "proposer", "contact", "inspecteur", "mignon", "projet", "probablement", "risque", "action",
    "ange", "avance", "parmi", "langue", "emporter", "engager", "voleur", "cesser", "tort", "vacance", "machine", "signifier", "construire", "pain", "chier", "horrible"
];

//contais all the german words for the app
var german_Words = [
    "das", "ist", "du", "ich", "nicht", "die", "es", "und", "sie", "der",
    "was", "wir", "zu", "ein", "er", "in", "sie", "mir", "mit", "ja",
    "wie", "den", "auf", "mich", "dass", "so", "hier", "eine", "wenn", "hat",
    "all", "sind", "von", "dich", "war", "haben", "an", "habe", "da", "nein",
    "bin", "noch", "dir", "uns", "sich", "nur", "einen", "kann", "dem", "auch",
    "schon", "als", "dann", "ihn", "mal", "hast", "sein", "ihr", "aus", "um",
    "aber", "meine", "aber", "wird", "doch", "mein", "bist", "im", "keine", "gut",
    "oder", "jetzt", "man", "nach", "werden", "wo", "will", "also", "mehr", "immer",
    "muss", "warum", "bei", "etwas", "nichts", "bitte", "wieder", "machen", "diese", "vor",
    "hab", "zum", "gehen", "sehr", "geht", "sehen", "tun", "euch", "wer", "wirklich",
    "damals", "deshalb", "halt", "erwartet", "solche", "meisten", "bringe", "still",
    "umgebracht", "rede", "werdet", "konnten", "wartet", "hinten", "wen", "gerettet", "jemals",
    "geschehen"
];

//contais all the italian words for the app
var italian_Words = [
    "come", "io", "che", "lui", "era", "per", "su", "sono", "con", "essi",
    "essere", "uno", "avere", "questo", "da", "caldo", "parola", "ma", "cosa", "alcuni",
    "esso", "voi", "aveva", "il", "di", "un", "in", "noi", "lattina", "fuori",
    "altro", "erano", "fare", "loro", "tempo", "se", "come", "suddetto", "ogni", "dire",
    "fa", "set", "tre", "desiderare", "aria", "bene", "anche", "giocare", "piccolo", "fine",
    "mettere", "casa", "leggere", "mano", "porto", "grande", "compitare", "aggiungere", "anche", "terra",
    "qui", "mosto", "alto", "tale", "seguire", "atto", "chiedere", "maschi", "cambiamento", "luce",
    "tipo", "spento", "bisogno", "casa", "immagine", "provare", "noi", "animale", "punto", "madre",
    "mondo", "vicino", "costruire", "terra", "padre", "qualsiasi", "nuovo", "lavoro", "parte", "prendere",
    "ottenere", "posto", "fatto", "vivere", "dove", "dopo", "indietro", "poco", "solo", "turno",

];

//contais all the portuguese words for the app
var portuguese_Words = [
    "como", "seu", "que", "ele", "foi", "para", "em", "com", "eles", "ser",
    "em", "uma", "tem", "este", "por", "quente", "palavra", "mas", "alguns", "ou",
    "teve", "de", "uma", "em", "lata", "fora", "outro", "foram", "fazer", "tempo",
    "vontade", "disse", "cada", "dizer", "faz", "conjunto", "quer", "ar", "bem", "jogar",
    "pequeno", "fim", "colocar", "casa", "ler", "grande", "soletrar", "adicionar", "mesmo", "terra",
    "aqui", "alto", "tais", "siga", "ato", "perguntar", "homens", "luz", "tipo", "precisa",
    "casa", "imagem", "tentar", "novamente", "animais", "ponto", "mundo", "perto", "construir", "auto",
    "pai", "qualquer", "novo", "trabalho", "parte", "tomar", "obter", "lugar", "feito", "viver",
    "onde", "depois", "pouco", "apenas", "rodada", "ano", "veio", "bom", "sob", "muito",
    "justo", "forma", "dizer", "ajudar", "baixo", "linha", "diferir", "significar", "direito", "menino"
];

//contais all the spanish words for the app
var spanish_Words = [
    "la", "de", "que", "en", "un", "ser", "se", "no", "haber", "por",
    "con", "su", "para", "como", "estar", "tener", "le", "todo", "pero",
    "hacer", "poder", "decir", "este", "ir", "otro", "ese", "si", "me", "ya",
    "ver", "porque", "dar", "cuando", "muy", "sin", "vez", "mucho", "saber", "sobre",
    "mi", "alguno", "mismo", "yo", "hasta", "dos", "querer", "entre", "primero", "desde",
    "grande", "eso", "ni", "nos", "llegar", "pasar", "tiempo", "ella", "uno", "bien",
    "poco", "deber", "entonces", "poner", "cosa", "tanto", "hombre", "parecer", "nuestro", "tan",
    "donde", "ahora", "parte", "vida", "quedar", "siempre", "creer", "hablar", "llevar", "dejar",
    "nada", "cada", "seguir", "menos", "nuevo", "encontrar", "libro", "negocio", "historia", "danza",
    "escuela", "aeropuerto", "ciudad", "cuenta", "pez", "oveja", "caballo", "tigre", "lobo", "ave"
];