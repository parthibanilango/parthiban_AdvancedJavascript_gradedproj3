const text = document.getElementById("text");
const dummyText = document.getElementById("dummy-text-id");
const wpmValue = document.getElementById("wpm-value");
const cpmValue = document.getElementById("cpm-value");
const errorValue = document.getElementById("error-value");
const timeValue = document.getElementById("time-value");
const accuracyValue = document.getElementById("accuracy-value");
const resetButton = document.getElementById("reset-btn");
const wpm = document.getElementById("wpm");
const cpm = document.getElementById("cpm");

const defaultDummyText = 'Game started..Click on the area below to get the text';
let randomTextSelected ='';
let errorCount = 0;
let timeleftVal = 0;
let wordsPerMinute = 0;
let charPerMinute = 0;
let totalGameTimeinms = 60000;
let completedTime =0; 

const dummyTextsArray = [
"Radhika bought an attractive bracelet recently but it broke in less than a week All that glitters is not gold", 
"Ever failed ever tried no matter try again fail again fail better A picture is worth a thousand words meaning explaining something",
"A picture is worth a thousand words meaning explaining something is easier through a picture than by words", 
"People who depend on the generosity of others cannot pick choose things as per their liking They have to accept what is given to them", 
"I feel overwhelmed with all the tasks I have to finish but I have to start with something since a journey of a thousand miles begins with a single step", 
"I think I will sell my car at the offered price instead of waiting for something higher after all a bird in hand is worth two in the bush", 
"She never bragged about her grades but secured the second position in the board exams Truly actions speak louder than words"
];

function displayDefaultText(){
  dummyText.innerHTML = `${defaultDummyText}`;
}

text.onclick=() => {
  displayDynamicText();
};

function displayDynamicText(){
  if(dummyText.innerHTML === defaultDummyText){
    const random = Math.floor(Math.random() * dummyTextsArray.length);
    randomTextSelected = dummyTextsArray[random];
    dummyText.innerHTML = `${randomTextSelected}`;
  }
}

let myTimerFunc = timer(
  totalGameTimeinms, 
  function(timeleft) {
    timeValue.innerHTML = timeleft+"s";
    timeleftVal = timeleft;
  },
  function() { 
    showFinalResults(errorCount,charPerMinute,wordsPerMinute);
  }
);

function timer(time,update,complete) {
  let start = new Date().getTime();
  let interval = setInterval(function() {
      let now = time-(new Date().getTime()-start);
      if( now <= 0) {
          clearInterval(interval);
          complete();
      }
      else update(Math.floor(now/1000));
  },100); 
}


text.addEventListener("input", startTypingGame);
text.addEventListener("input", myTimerFunc);

text.addEventListener('keydown', function(e) {
  backspace = 8;
  if (e.keyCode == backspace) 
      e.preventDefault();
  });

function startTypingGame() {
  let str1 =new String(text.value);
  let str2 =new String(randomTextSelected);
  let s1 = str1.split('');
  let s2 = str2.split('');
  
  let result=[];
  let l = s2.length;
  let count = 0;

  if(s1.length <= l){
    for(i=0;i<l;i++){
      if((s1[i] === undefined ||s1[i] === null)  && (s2[i] !== undefined && s2[i] !== null)){
        result[i] = s2[i];
      }else if(s1[i] === s2[i]){
        result[i] = '<span style="color:green;">'+s2[i]+'</span>';
      } else if(s1[i] !== s2[i]){
        result[i] = '<span style="color:red; text-decoration: underline;">'+s2[i]+'</span>';
        count = count+1;
      }
    }
    errorCount = count;
    charPerMinute=s1.length;
    let wordsPerMinuteArr = str1.split(" ");
    wordsPerMinute = wordsPerMinuteArr.length+1;
    let dummyStrResult = result.join("");
    dummyText.innerHTML = `${dummyStrResult}`;
    showResultAccuracy(errorCount,charPerMinute)
    showResultError(errorCount);
   
  }else{
    let wordsPerMinuteArr = str1.split(" ");
    wordsPerMinute = wordsPerMinuteArr.length+1;
    completedTime = 60 - timeleftVal;
    charPerMinute = str1.length-1;
    text.disabled = true;
    resetButton.style.display = 'block';
  }
}

resetButton.onclick=() => {
  reStartGame();
};

function reStartGame(){
  displayDefaultText();
  
  cpm.style.display = 'none';
  wpm.style.display = 'none';
  
  text.disabled = false;
  resetButton.style.display = 'none';
  
  errorValue.innerHTML = `0`;
  timeValue.innerHTML = '60s';
  accuracyValue.value = '100%';
  text.value = '';
  
  let myTimerFuncReset = timer(
    totalGameTimeinms, 
    function(timeleft) {
      timeValue.innerHTML = timeleft+"s";
      timeleftVal = timeleft;
    },
    function() { 
      showFinalResults(errorCount,charPerMinute,wordsPerMinute);
    }
  );
  text.addEventListener("input", myTimerFuncReset);

  errorCount = 0;
  wordsPerMinute = 0;
  charPerMinute = 0;
  completedTime =0;

 }

function showFinalResults(errorChars,totalChars,wpmVal){
  text.disabled = true;
  resetButton.style.display = 'block';
  showResultAccuracy(errorChars,totalChars);
  showResultError(errorChars);
  showResultWPM(wpmVal);
  showResultsCPM(totalChars);
  showResultTime();
}

function showResultAccuracy(errorChars,totalChars){
  let ap ='0%';
  if(!isNaN((totalChars-errorChars)/totalChars)){
    let accuracyPercentage = ((totalChars-errorChars)/totalChars)*100;
    let rounded = Math.round((accuracyPercentage + Number.EPSILON) * 100) / 100;
    ap = rounded+'%';
  }
  accuracyValue.innerHTML = `${ap}`;
}

function showResultError(errorCount){
  errorValue.innerHTML = `${errorCount}`;
}

function showResultWPM(wpmVal){
  wpm.style.display = 'block';
  wpmValue.innerHTML = `${wpmVal}`;
 
}

function showResultsCPM(cpmVal){
  cpm.style.display = 'block';
 cpmValue.innerHTML = `${cpmVal}`;
 
}

function showResultTime(){
  timeValue.innerHTML = `${completedTime}s`;
}

function myTimerStopFunction() {
  clearInterval(myTimer);
  complete();
}


