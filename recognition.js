var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var grammar = '#JSGF V1.0;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.continuous = false;

var option = '';

recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var command = event.results[last][0].transcript;
    message.textContent = 'Voice Input: ' + command + '.';
    switch (option) {
        case 'volume':
            setVolume(command);
          break;
          case 'rate':
            setRate(command);
          break;
          case 'pitch':
            setPitch(command);
          break;                  
      }
};

function offDictationMode() {
    recognition.interimResults = false;
    recognition.continuous = false;
}

function onDictationMode() {
    recognition.interimResults = true;
    recognition.continuous = true;
}

recognition.onspeechend = function() {
    recognition.stop();
};

recognition.onerror = function(event) {
    message.textContent = 'Error occurred in recognition: ' + event.error;
}        

document.querySelector('#btnRate').addEventListener('click', function(){
    option = 'rate';
    offDictationMode()
    recognition.start();
});

document.querySelector('#btnPitch').addEventListener('click', function(){
    option = 'pitch';
    offDictationMode()
    recognition.start();
});

document.querySelector('#btnVolume').addEventListener('click', function(){
    option = 'volume';
    offDictationMode()
    recognition.start();
});


document.querySelector('#btnDic').addEventListener('click', function(){
    option = 'volume';
    onDictationMode()
    recognition.start();
});

document.querySelector('#btnStop').addEventListener('click', function(){
    offDictationMode()
    recognition.stop();
});


function setRate(command) {    
    var rateValue = parseFloat(command.toLowerCase());
    document.querySelector('#rate').value = rateValue;
}

function setPitch(command) {    
    var newValue = parseFloat(command.toLowerCase());
    document.querySelector('#pitch').value = newValue;
}

function setVolume(command) {
    if(command.toLowerCase() === 'volume top'){
        document.querySelector('#volume').value = 1;
   }
   else if (command.toLowerCase() === 'volume high'){
       document.querySelector('#volume').value = 0.7;
   }
   else if (command.toLowerCase() === 'volume mid'){
       document.querySelector('#volume').value = 0.5;
   }
   else if (command.toLowerCase() === 'volume low'){
       document.querySelector('#volume').value = 0.3;
   }
   else if (command.toLowerCase() === 'volume mute'){
       document.querySelector('#volume').value = 0;
   }
}