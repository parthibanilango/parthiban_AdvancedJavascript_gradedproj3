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
let timeleft = 10;
let wordsPerMinute = 0;
let charPerMinute = 0;



//keep the static items in seperate file
const dummyTextsArray = [
"Radhika bought an attractive bracelet recently, but it broke in less than a week. All that glitters is not gold.", 
"Ever failed ever tried no matter try again fail again fail better",
"A picture is worth a thousand words, meaning explaining something is easier through a picture than by words", 
"People who depend on the generosity of others can’t pick & choose things as per their liking. They’ve to accept what is given to them", 
"I feel overwhelmed with all the tasks I have to finish, but I have to start with something since a journey of a thousand miles begins with a single step.", 
"I think I’ll sell my car at the offered price instead of waiting for something higher. After all, a bird in hand is worth two in the bush.", 
"She never bragged about her grades but secured the second position in the board exams. Truly, actions speak louder than words."
];


function reStartGame(){
 displayDefaultText();
 cpm.style.display = 'none';
 wpm.style.display = 'none';
}

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

var myTimerFunc = timer(
  5000, 
  function(timeleft) {
    timeValue.innerHTML = timeleft+"s";
  },
  function() { 
    showFinalResults(errorCount,charPerMinute,wordsPerMinute);
  }
);

function timer(time,update,complete) {
  var start = new Date().getTime();
  var interval = setInterval(function() {
      var now = time-(new Date().getTime()-start);
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
    charPerMinute = s1.length-1;
    resetButton.style.display = 'block';
  }
}

resetButton.onclick=() => {
  reStartGame();
};


function showFinalResults(errorChars,totalChars,wpmVal){
  showResultAccuracy(errorChars,totalChars);
  showResultError(errorChars);
  showResultWPM(wpmVal);
  showResultsCPM(totalChars);
}

function showResultAccuracy(errorChars,totalChars){
  let accuracyPercentage = ((totalChars-errorChars)/totalChars)*100;
  var rounded = Math.round((accuracyPercentage + Number.EPSILON) * 100) / 100;
  let ap = rounded+'%';
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

function myTimerStopFunction() {
  clearInterval(myTimer);
  complete();
}


