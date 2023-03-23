
function startPointOfTheGame() {
  makeCardsRandomly();
  makeVirtualOverLay();
  appearWelcomePopup();
  getLevelOfGame();
  passAndCheckName();
}
window.onload = function () {
  startPointOfTheGame();
}

// appear and disappear overlay
let virtualBodyOverLay = document.querySelector(".virtual-overlay");
function makeVirtualOverLay() {
  if(!virtualBodyOverLay.classList.contains("virtual-overlay-active"))
    virtualBodyOverLay.classList.add("virtual-overlay-active");
  else
    virtualBodyOverLay.classList.remove("virtual-overlay-active");
}
//************************************************************** */

// appear and disappear welcome popup
let welcomePopup = document.querySelector(".popups-container .center-popups .welcome-popup");
function appearWelcomePopup() {
  if(!welcomePopup.classList.contains("center-popups-active"))
    welcomePopup.classList.add("center-popups-active");
  else
    welcomePopup.classList.remove("center-popups-active");
}
//************************************************************** */

// craete random array of numbers
let randomNumbers = [];
let cardsContainer = document.querySelector(".container .cards-container");
let cardsContainerItems = Array.from(cardsContainer.children);

function createRandomArray(min, max) {
  for(let i = 0; i < cardsContainerItems.length; i++) {
    let diff = max - min + 1;
    let rand = Math.random() * diff;
    rand += min;
    rand = parseInt(rand);
    if(randomNumbers.includes(rand)) {
      i--; continue;
    }
    else 
      randomNumbers.push(rand);
  }
}
// make all cards randomly
function makeCardsRandomly() {
  createRandomArray(1, cardsContainerItems.length);
  for(let i = 0; i < cardsContainerItems.length; i++) {
    cardsContainerItems[i].style.order = randomNumbers[i];
  }
}
//************************************************************** */

// get selected game level
let groupLevel = document.getElementById("groupLevel");
let valueOfSelected = groupLevel.options[groupLevel.selectedIndex].value;
let textOfSelected = groupLevel.options[groupLevel.selectedIndex].text;
let gameLevelVar = document.querySelector(".container .game-container .gamer-infoAndScore .gamer-info .game-level span");
gameLevelVar.textContent = textOfSelected;

function getLevelOfGame() {
  groupLevel.onchange = function() {
    valueOfSelected = groupLevel.options[groupLevel.selectedIndex].value;
    textOfSelected = groupLevel.options[groupLevel.selectedIndex].text;
    if(valueOfSelected === "easy") {
      gameLevelVar.textContent = textOfSelected;
    }
    else if(valueOfSelected === "medium") {
      gameLevelVar.textContent = textOfSelected;
    }
    else if(valueOfSelected === "diffcult") {
      gameLevelVar.textContent = textOfSelected;
    }
  }
}
let mainSettimeOut = 0;
function gameLevelTime() {
  if(valueOfSelected == "easy")
    mainSettimeOut = 15_000;
  else if(valueOfSelected === "medium")
    mainSettimeOut = 10_000;
  else if(valueOfSelected === "diffcult")
    mainSettimeOut = 5000;
}
//************************************************************** */

// get the name of gamer and pass it to game info
let gamerName = document.querySelector(".container .game-container .gamer-infoAndScore .gamer-info .gamer-name span");
let reciveGamerName = document.querySelector(".popups-container .center-popups .welcome-popup input");
let nameValidErrorInWelcomePopup = document.querySelector(".popups-container .center-popups .welcome-popup .notValidName");
let welcomeConfirmButton = document.querySelector(".popups-container .center-popups .welcome-popup .confirm-welcme-popup");
function passAndCheckName() {
  welcomeConfirmButton.onclick = function() {
    if(reciveGamerName.value.length > 1 && isNaN(reciveGamerName.value)) {
      gamerName.textContent = reciveGamerName.value;
      makeVirtualOverLay();
      appearWelcomePopup();
      showAllCards();
      showSingleCards();
    }
    else {
      nameValidErrorInWelcomePopup.classList.add("notValidNameActive");
      setTimeout(() => {
        nameValidErrorInWelcomePopup.classList.remove("notValidNameActive");
      }, 2000);
    }
  }
  
}
//************************************************************** */

// show and unshow all cards
function showAllCards() {
  // set the time of flibbed indepndent of the LEVEL
  gameLevelTime();
  // [1] prevent click
  preventClickAllCards();
  // [2] flibbed all cards
  cardsContainerItems.forEach((ele) => {
    ele.classList.add("flibbed");
  });
  // [3] active click and rotate all cards and show "go" popup
  setTimeout(() => {
  cardsContainerItems.forEach((ele) => {
    ele.classList.remove("prevent-click");
    ele.classList.remove("flibbed");
    showGoWayPoup();
  });
}, mainSettimeOut);
}
//----------------------------
function makeCardsUnFlibbed() {
  cardsContainerItems.forEach((ele) => {
    ele.classList.remove("flibbed")
  })
}
//----------------------------
//prevent click on all crads
function preventClickAllCards() {
  cardsContainerItems.forEach((ele) => {
    ele.classList.add("prevent-click");
  });
}
//************************************************************** */

// show single cards
function showSingleCards() {
  cardsContainerItems.forEach((ele) => {
    ele.onclick = function() {
      ele.classList.add("flibbed");
      matchCards(ele);
      ele.classList.add("prevent-click");
      checkAllCardsRotatedOrNo();
    }
  })
}
//-----------------------------
// pass The Two crads to array to match tehm
let macthCardsArray = [];
function matchCards(ele) {
  macthCardsArray.push(ele);
  if(macthCardsArray.length === 2) {
    checkMatchCards(macthCardsArray[0], macthCardsArray[1])
    macthCardsArray.length = 0;
  }
}
//-----------------------------------
// match The two cards and show all uppopups
let worngTimesEle = document.querySelector(".container .game-container .gamer-infoAndScore .gamer-score .wrong-tries span");
let successTimesEle = document.querySelector(".container .game-container .gamer-infoAndScore .gamer-score .success-tries span");
let wrongTimes = successTimes = 0;

function checkMatchCards(firstCard, secondCard) {
  if(firstCard.dataset.id === secondCard.dataset.id) {
    successTimes++;
    successTimesEle.textContent = successTimes;
    showCorrectMark();
    if(successTimes === 3 || successTimes === 9 || successTimes === 15) {
      showGreatMemory();
    }
  }
  else {
    wrongTimes++;
    worngTimesEle.textContent = wrongTimes;
    showinCorrectMark();
    if(wrongTimes === 6 || wrongTimes === 9 || wrongTimes === 15) {
      showWeakMemory();
    }
  }
}
//----------------------------------
// restore score when play again
function reSetScore() {
  wrongTimes = successTimes = 0;
  successTimesEle.textContent = successTimes;
  worngTimesEle.textContent = wrongTimes;
}
//************************************************************** */

// **********The UP Popups Functions***********
// show go way popup
function showGoWayPoup() {
  let goWay = document.querySelector(".popups-container .up-popups .go-way");
  goWay.classList.add("up-popups-active");
  setTimeout(() => {
    goWay.classList.remove("up-popups-active");
  }, 1_500);
}
//---------------------------
// the Mark popup of page [correct, incorrect]
function showCorrectMark() {
  let correctPopup = document.querySelector(".popups-container .up-popups .correct-popup")
  correctPopup.classList.add("up-popups-active");
  playCorrectSound();
  setTimeout(() => {
    correctPopup.classList.remove("up-popups-active");
  }, 1000);
}
function showinCorrectMark() {
  let incorrectPopup = document.querySelector(".popups-container .up-popups .incorrect-popup");
  incorrectPopup.classList.add("up-popups-active");
  playInorrectSound();
  setTimeout(() => {
    incorrectPopup.classList.remove("up-popups-active");
  }, 1000);
}
//-------------------------------------------
// the popup of page [greate-memory, weak-memory]
function showGreatMemory() {
  let greatMemory = document.querySelector(".popups-container .up-popups .great-memory-popup")
  greatMemory.classList.add("up-popups-active");
  setTimeout(() => {
    greatMemory.classList.remove("up-popups-active");
  }, 1_500);
}
function showWeakMemory() {
let weakMemory = document.querySelector(".popups-container .up-popups .weak-memory-popup");
  weakMemory.classList.add("up-popups-active");
  setTimeout(() => {
    weakMemory.classList.remove("up-popups-active");
  }, 1_500);
}
//------------------------------------
// play correct and in correct sound
function playCorrectSound() {
  let correctSound = document.querySelector(".up-popups .correct-incorrect-sounds .correct-sound");
  correctSound.play();
}
function playInorrectSound() {
  let incorrectSound = document.querySelector(".up-popups .correct-incorrect-sounds .incorrect-sound");
  incorrectSound.play();
}
//--------------------------------------
//show game will started after 5 Seconds
function showPlayAgainMsgPopup() {
  let playAgainMSg = document.querySelector(".popups-container .up-popups .playAgain-msg-popup");
  playAgainMSg.classList.add("up-popups-active");
  setTimeout(() => {
    playAgainMSg.classList.remove("up-popups-active");
  }, 1500);
}
//------------------------------------------------
// show we rerdering all cards
function showReOrderingMsgPopup() {
  let reOrderAgainMSg = document.querySelector(".popups-container .up-popups .reOredring-popup");
  reOrderAgainMSg.classList.add("up-popups-active");
  setTimeout(() => {
    reOrderAgainMSg.classList.remove("up-popups-active");
  }, 1500);
}
//------------------------------------------
// show take alook popup
function showTakeLookPopup() {
  let takeLook = document.querySelector(".popups-container .up-popups .take-alook");
  takeLook.classList.add("up-popups-active");
  setTimeout(() => {
    takeLook.classList.remove("up-popups-active");
  }, 1500);
}

//************************************************************** */

// after finish the game show the popup ask play again or no
let gameResultCase = false;
function afterFinishPoupAction() {
  makeVirtualOverLay();
  // if game success
  if(gameResultCase === true) {
    inssertGameSuccesMessageInPoup(); // show success message and it icone
  }
  // if game fail
  else {
    inssertGameFailMessageInPoup(); // show fail message and it icone
  }
  // apear the popup in center
  afterFinishPoup.classList.add("center-popups-active"); 
}
function unShowafterFinishPoupAction() {
  afterFinishPoup.classList.remove("center-popups-active");
}

//****************************************************************** */

// set popup message and icons ["game success" or "game faild"]
let afterFinishPoup = document.querySelector(".popups-container .center-popups .after-finish-popup");
let afterFinishMsg = document.createElement("h3");
function inssertGameSuccesMessageInPoup() {
  afterFinishMsg.innerHTML = `Game Success <i class="fa-solid fa-check"></i>`;
  afterFinishPoup.insertBefore(afterFinishMsg, document.querySelector(".popups-container .center-popups .after-finish-popup p"));
}
function inssertGameFailMessageInPoup() {
  // add class to the icon to make it red color => "changeIconColor"
  afterFinishMsg.innerHTML = `Game Failed <i class="fa-sharp fa-solid fa-circle-xmark changeIconColor"></i>`;
  afterFinishMsg.style.color = "red";
  afterFinishPoup.insertBefore(afterFinishMsg, document.querySelector(".popups-container .center-popups .after-finish-popup p"));
}
// remove the MSG to craete it again when play again
function removeAfterFinishPopupMessage() {
  afterFinishMsg.innerHTML = "";
}

//************************************************************* */

function checkAllCardsRotatedOrNo() {
  // counter to check get click on last card or no
  let counter = 0; 
  cardsContainerItems.forEach((ele) => {
    if(ele.classList.contains("flibbed")) {
      counter++;
    }
  })
  //----------------------------
  if(counter === cardsContainerItems.length) {
    // when game easy level choosen
    if(valueOfSelected === "easy") {
      if(+wrongTimes < +successTimes) {
        gameResultCase = true;
        afterFinishPoupAction();
      }
      else if(+wrongTimes > +successTimes) {
        gameResultCase = false;
        afterFinishPoupAction();
      }
    }
    // when game medium or diffcult level choosen
    else if(valueOfSelected === "medium" || valueOfSelected === "diffcult") {
      if(successTimes === cardsContainerItems.length / 2) {
        gameResultCase = true;
        afterFinishPoupAction();
      }
      else {
        gameResultCase = false;
        afterFinishPoupAction();
      }
    }
  }
}
//********************************************************************* */

let okAfterfinshButton = document.getElementById("repeatGame");
let cancelAfterfinshButton = document.getElementById("cancelGame");

// action when click ok or cancel
function checkAfterFinshClicked() {
  okAfterfinshButton.onclick = function() {
    playAgainStartPoint();
  }
  cancelAfterfinshButton.onclick = function() {
    window.close();
  }
}
checkAfterFinshClicked();

//------------------------------------------------------

function playAgainStartPoint() {
  // flibbed all cards
  makeCardsUnFlibbed(); 
  // reset the length of random numbers arra
  randomNumbers.length = 0;
  // remove overlay
  makeVirtualOverLay(); 
  // disapear after finsh popup
  unShowafterFinishPoupAction(); 
  // reset the score
  reSetScore(); 
  // remove content of popup MSG "Game Success" or "Game Faild"
  removeAfterFinishPopupMessage(); 
  // show play again popup
  showPlayAgainMsgPopup();

  // after 1.5 seconds
  setTimeout(() => {
    // reorder cards
    makeCardsRandomly();
    // show "rordering" popup
    showReOrderingMsgPopup();
  }, 1_500);

  //after 3 seoncs
  setTimeout(() => {
    /// show "take alook" popup
    showTakeLookPopup();
    // flibbed all cards
    showAllCards();
    // click and match function
    showSingleCards();
  }, 3000);
}

