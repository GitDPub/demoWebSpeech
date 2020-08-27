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

var recognizing = false;

recognition.onresult = function(event) {

    if(option == 'dictation') {        
        textArea.value = '';
        for (var i = 0; i < event.results.length; ++i) {          
                textArea.value += event.results[i][0].transcript;          
        }
    }
    else
    {
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
    }
    
};

function offDictationMode() {
    recognition.interimResults = false;
    recognition.continuous = false;
    recognizing = false;
}

function onDictationMode() {
    recognition.interimResults = true;
    recognition.continuous = true;
    recognizing = true;
}

recognition.onspeechend = function() {
    recognition.stop();
};

recognition.onerror = function(event) {
    message.textContent = 'Error occurred in recognition: ' + event.error;
}        

document.querySelector('#btnRate').addEventListener('click', function(){
    option = 'rate';
    recognition.start();
});

document.querySelector('#btnPitch').addEventListener('click', function(){
    option = 'pitch';
    recognition.start();
});

document.querySelector('#btnVolume').addEventListener('click', function(){
    option = 'volume';
    recognition.start();
});


document.querySelector('#btnDic').addEventListener('click', function(){
    if (recognizing) {
        recognition.stop();
        offDictationMode();
        return;
    }
    option = 'dictation';
    onDictationMode();
    recognition.start();
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