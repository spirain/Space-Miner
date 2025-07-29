let gainMultiplier = 1;
let discountMultiplier = 1;
let starDust = 0;
let isGameOn = false;
let difficultyInterval = null;
let currentDifficulty = null;
let difficultySongs = null;
let onLose = false;
let onWin = false;
const saveButton = document.getElementById("saveButton");
const loadButton = document.getElementById("loadButton");
const resetButton = document.getElementById("resetButton");
const menuButtonWin = document.getElementById("menuButtonWin");
const menuButtonLose = document.getElementById("menuButtonLose");
const playButton = document.getElementById("play");
const easyButton = document.getElementById("easy");
const mediumButton = document.getElementById("medium");
const hardButton = document.getElementById("hard");
const difficulty = document.getElementById("difficulty");
const timer = document.getElementById("timer");
playButton.addEventListener("click", () => {

    document.getElementById("mainMenu").style.display = "none";
    difficulty.style.display = "flex";
}
);
menuButtonWin.addEventListener("click", () => {
    difficulty.style.display = "none"
    document.getElementById("mainMenu").style.display = "flex";
    document.getElementById("winContainer").style.display = "none";
    onWin =  false;

    audio.pause();
    audio.currentTime = 0;
    audio.src = "";
    resetGame();
    playMainMenuMusic();
});
menuButtonLose.addEventListener("click", () => {
    difficulty.style.display = "none"
    document.getElementById("mainMenu").style.display = "flex";
    document.getElementById("loseContainer").style.display = "none";
    onLose = false;

    audio.pause();
    audio.currentTime = 0;
    audio.src = "";

    playMainMenuMusic();
});

saveButton.addEventListener("click", saveGame);
resetButton.addEventListener("click", () => {
      if (!confirm("Are you sure you want to reset your progress? This cannot be undone.")) return;


    resetGame();

    if(isGameOn && currentDifficulty) {
        startGame(currentDifficulty);
    }
    alert("Game has been reset.");
});
let hyperDriveEndTime = null;
function updateUI() {
  photonOwned.innerText = photonDrillOwned;
  miningDroneOwnedText.innerText = miningDroneOwned;
  plasmaCutterOwnedText.innerText = plasmaCutterOwned;
  automatedBotOwnedText.innerText = automatedBotOwned;
  orbitalCollectorOwnedText.innerText = orbitalCollectorOwned;
  refinerySatelliteOwnedText.innerText = refinerySatelliteOwned;
  singularityBreakerOwnedText.innerText = singularityBreakerOwned;
  energyCoreOwnedText.innerText = energyCoreOwned;
  upgradeMatrixOwnedText.innerText = upgradeMatrixOwned;
  starDustText.innerText = Math.floor(starDust);
    photonCostText.innerText = Math.floor(photonCost);
    miningDroneCostText.innerText = Math.floor(miningDroneCost);
    plasmaCutterCostText.innerText = Math.floor(plasmaCutterCost);
    automatedBotCostText.innerText = Math.floor(automatedBotCost);  
    orbitalCollectorCostText.innerText = Math.floor(orbitalCollectorCost);
    refinerySatelliteCostText.innerText = Math.floor(refinerySatelliteCost);
    singularityBreakerCostText.innerText = Math.floor(singularityBreakerCost);
}

function saveGame() {
    let gameState = {
        starDust,
gainMultiplier,
  discountMultiplier,

  photonDrillCount,
  miningDroneCount,
  plasmaCutterCount,
  automatedBotCount,
  orbitalCollectorCount,
  refinerySatelliteCount,
  singularityBreakerCount,

  energyCoreOwned,
  upgradeMatrixOwned,
  hyperDriveCount,

  photonDrillOwned,
  miningDroneOwned,
  plasmaCutterOwned,
  automatedBotOwned,
  orbitalCollectorOwned,
  refinerySatelliteOwned,
  singularityBreakerOwned,

  energyCoreCount,
  upgradeMatrixCount,
  hyperDriveOn,


  photonCost,
  miningDroneCost,
  plasmaCutterCost,
  automatedBotCost,
  orbitalCollectorCost,
  refinerySatelliteCost,
  singularityBreakerCost,
  hyperDriveCost,

  hyperDriveTimerText: hyperDriveTimerText.innerText,
  hyperDriveEndTime: hyperDriveEndTime || null
};
  localStorage.setItem("spaceMinerSave", JSON.stringify(gameState));
}

function loadGame() {
    const savedGame = JSON.parse(localStorage.getItem("spaceMinerSave"));
    if(!savedGame) return;
    gainMultiplier = savedGame.gainMultiplier;
  discountMultiplier = savedGame.discountMultiplier;
  starDust = savedGame.starDust;

  photonDrillCount = savedGame.photonDrillCount;
  miningDroneCount = savedGame.miningDroneCount;
  plasmaCutterCount = savedGame.plasmaCutterCount;
  automatedBotCount = savedGame.automatedBotCount;
  orbitalCollectorCount = savedGame.orbitalCollectorCount;
  refinerySatelliteCount = savedGame.refinerySatelliteCount;
  singularityBreakerCount = savedGame.singularityBreakerCount;

  energyCoreOwned = savedGame.energyCoreOwned;
  upgradeMatrixOwned = savedGame.upgradeMatrixOwned;
  hyperDriveCount = savedGame.hyperDriveCount;

  photonDrillOwned = savedGame.photonDrillOwned;
  miningDroneOwned = savedGame.miningDroneOwned;
  plasmaCutterOwned = savedGame.plasmaCutterOwned;
  automatedBotOwned = savedGame.automatedBotOwned;
  orbitalCollectorOwned = savedGame.orbitalCollectorOwned;
  refinerySatelliteOwned = savedGame.refinerySatelliteOwned;
  singularityBreakerOwned = savedGame.singularityBreakerOwned;

  energyCoreCount = savedGame.energyCoreCount;
  upgradeMatrixCount = savedGame.upgradeMatrixCount;
  hyperDriveOn = savedGame.hyperDriveOn;
  photonCost = savedGame.photonCost;
  miningDroneCost = savedGame.miningDroneCost;
  plasmaCutterCost = savedGame.plasmaCutterCost;
  automatedBotCost = savedGame.automatedBotCost;
  orbitalCollectorCost = savedGame.orbitalCollectorCost;
  refinerySatelliteCost = savedGame.refinerySatelliteCost;
  singularityBreakerCost = savedGame.singularityBreakerCost;
  hyperDriveCost = savedGame.hyperDriveCost;

  if(savedGame.hyperDriveTimerText) {
    hyperDriveTimerText.innerText = savedGame.hyperDriveTimerText;
  }
  updateUI(); 
}

function resetGame() {
    elapsedSeconds = 0;

    // Stop music and reset audio

    // Restart music interval
    if (difficultySongs) {
        clearInterval(musicInterval);
        updateMusic(); // Play the first appropriate track immediately
        musicInterval = setInterval(updateMusic, 1000);
    }
    audio.pause();
    audio.currentTime = 0;


  
    // Clear and restart game timer
    if (difficultyInterval) clearInterval(difficultyInterval);


  localStorage.removeItem("spaceMinerSave");

  starDust = 0;

  rewardClaimed100 = false;
rewardClaimedPhotonDrill = false;
rewardClaimed1000 = false;
rewardClaimedMiningDrone100 = false;
rewardClaimedObjective5 = false;
rewardClaimedObjective6 = false;
rewardClaimedObjective7 = false;


function resetObjectiveUI(button) {
    button.classList.remove("gray");
    button.classList.remove("buy");
    button.classList.add("gray");
    button.innerText = "claim";
}

resetObjectiveUI(starDust100Claim);
resetObjectiveUI(photonDrill100Claim);
resetObjectiveUI(starDust1000Claim);
resetObjectiveUI(miningDrone100Claim);
resetObjectiveUI(objective5Claim);
resetObjectiveUI(objective6Claim);
resetObjectiveUI(objective7Claim);


  gainMultiplier = 1;
  discountMultiplier = 1;

  photonDrillCount = 0;
  miningDroneCount = 0;
  plasmaCutterCount = 0;
  automatedBotCount = 0;
  orbitalCollectorCount = 0;
  refinerySatelliteCount = 0;
  singularityBreakerCount = 0;

  energyCoreOwned = 0;
  upgradeMatrixOwned = 0;
  hyperDriveOn = false;

  photonDrillOwned = 0;
  miningDroneOwned = 0;
  plasmaCutterOwned = 0;
  automatedBotOwned = 0;
  orbitalCollectorOwned = 0;
  refinerySatelliteOwned = 0;
  singularityBreakerOwned = 0;
  hyperDriveOwned = 0;

  energyCoreCount = 0;
  upgradeMatrixCount = 0;
  hyperDriveCount = 0;
    photonCost = 75 * discountMultiplier;
    miningDroneCost = 500 * discountMultiplier;
    plasmaCutterCost = 500 * discountMultiplier;
    automatedBotCost = 3000 * discountMultiplier;
    orbitalCollectorCost = 10000 * discountMultiplier;
    refinerySatelliteCost = 25000 * discountMultiplier;
    singularityBreakerCost = 50000 * discountMultiplier;
    hyperDriveCost = 25000 * discountMultiplier;
           hyperDriveTimerText.innerText = "";
window._alreadyWon = false;



updateUI();
saveGame();
}

const audio = document.getElementById("gameMusic");
let elapsedSeconds = 0;
let musicInterval = null;


// Play track if not already playing it
function playTrack(file) {
    const newSrc = `songs/${file}`;
    if (!audio.src.endsWith(file)) {
        audio.src = newSrc;
        audio.play();
    } else if (audio.paused) {
        audio.play();
    }
}

// Music logic based on elapsed time
function updateMusic() {
    if(onWin || onLose) return;
    elapsedSeconds++;
    if (difficultySongs === "easy") {
        if (elapsedSeconds <= 120) {
            playTrack("audio1.mp3");
        } else if (elapsedSeconds <= 240) {
            playTrack("audio2.mp3");
        } else if (elapsedSeconds <= 360) {
            playTrack("audio3.mp3");
        } else if(elapsedSeconds <= 480) {
            playTrack("audio4.mp3");
        } else if(elapsedSeconds <= 480) {
            playTrack("audio4.mp3");
    }  else if(elapsedSeconds <= 600) {
            playTrack("audio4.mp3");
    }
    }
    if (difficultySongs === "medium") {
        if (elapsedSeconds <= 100) {
            playTrack("audio1.mp3");
        } else if (elapsedSeconds <= 200) {
            playTrack("audio3.mp3");
        } else if(elapsedSeconds <= 300) {
            playTrack("audio5.mp3");
        }
    } 

    if (difficultySongs === "hard") {
        if (elapsedSeconds <= 60) {
            playTrack("audio1.mp3");
        } else if (elapsedSeconds <= 120) {
            playTrack("audio3.mp3");
        } else if (elapsedSeconds <= 180){
            playTrack("audio5.mp3");
        }
    }
    if (onWin) {
        clearInterval(musicInterval);
        audio.pause();
        audio.currentTime = 0;
        audio.src = "";
        playTrack("audio7.mp3");
    } else if (onLose) {
        clearInterval(musicInterval);
        audio.pause();
        audio.currentTime = 0;
        audio.src = "";
        playTrack("audio6.mp3");
    }
}



function startGame (currentDifficulty) {
clearInterval(musicInterval);
clearInterval(difficultyInterval);
elapsedSeconds = 0;
updateMusic(); 
musicInterval = setInterval(updateMusic, 1000);
        difficulty.style.display = "none";
        document.getElementById("main").style.display = "flex";
        isGameOn = true;
        difficultyInterval = setInterval(() => {
            currentDifficulty--;
            timer.innerText = currentDifficulty;
            if(currentDifficulty === 0 && singularityBreakerCount >= 1) {
                onWin = true;
                resetGame();
                playTrack("audio7.mp3");
                onWin = false;
                document.getElementById("main").style.display = "none";
                document.getElementById("winContainer").style.display = "flex";
                onWin = true;
                clearInterval(difficultyInterval);
                difficultySongs = null;
            } else if (currentDifficulty === 0 && singularityBreakerCount < 1) {
                onLose = true;
                resetGame();
                playTrack("audio6.mp3");
                document.getElementById("main").style.display = "none";
                document.getElementById("loseContainer").style.display = "flex";
                onLose = true;
                clearInterval(difficultyInterval);
                difficultySongs = null;
            }
        }, 1000)        
}
easyButton.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    audio.src = "";

       difficultySongs = "easy";
        currentDifficulty = 600;
        startGame(currentDifficulty);
});
mediumButton.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    audio.src = "";

           difficultySongs = "medium";
        currentDifficulty = 300;
        startGame(currentDifficulty);  
});
hardButton.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    audio.src = "";

           difficultySongs = "hard";
        currentDifficulty = 180;
        startGame(currentDifficulty);
})

const photonDrill = document.getElementById("photonDrill");
const photonCostText = document.getElementById("photonCost");
let photonCost = 75 * discountMultiplier;
photonCostText.innerText = Math.floor(photonCost);
let photonDrillCount = 0;
const photonOwned = document.getElementById("photonOwned");
let photonDrillOwned = 0;

const miningDrone = document.getElementById("miningDrone");
const miningDroneCostText = document.getElementById("miningDroneCost");
let miningDroneCost = 500 * discountMultiplier;
miningDroneCostText.innerText = Math.floor(miningDroneCost);
let miningDroneCount = 0 ;
const miningDroneOwnedText = document.getElementById("miningDroneOwned");
let miningDroneOwned = 0;

const plasmaCutter = document.getElementById("plasmaCutter");
const plasmaCutterCostText = document.getElementById("plasmaCutterCost");
let plasmaCutterCost = 500 * discountMultiplier;
plasmaCutterCostText.innerText = Math.floor(plasmaCutterCost);
let plasmaCutterCount = 0;
const plasmaCutterOwnedText = document.getElementById("plasmaCutterOwned");
let plasmaCutterOwned = 0;

const automatedBot = document.getElementById("automatedBot");
const automatedBotCostText = document.getElementById("automatedBotCost");
let automatedBotCost = 3000 * discountMultiplier;
automatedBotCostText.innerText = Math.floor(automatedBotCost);
let automatedBotCount = 0;
const automatedBotOwnedText = document.getElementById("automatedBotOwned");
let automatedBotOwned = 0;

const energyCore = document.getElementById("energyCore");
let energyCoreCount = 0;
const energyCoreOwnedText = document.getElementById("energyCoreOwned");
let energyCoreOwned = 0;

const orbitalCollector = document.getElementById("orbitalCollector");
const orbitalCollectorCostText = document.getElementById("orbitalCollectorCost");
let orbitalCollectorCost = 10000 * discountMultiplier;
orbitalCollectorCostText.innerText = Math.floor(orbitalCollectorCost);
let orbitalCollectorCount = 0 ;
const orbitalCollectorOwnedText = document.getElementById("orbitalCollectorOwned");
let orbitalCollectorOwned = 0;

const refinerySatellite = document.getElementById("refinerySatellite");
const refinerySatelliteCostText = document.getElementById("refinerySatelliteCost");
let refinerySatelliteCost = 25000 * discountMultiplier;
refinerySatelliteCostText.innerText = Math.floor(refinerySatelliteCost);
let refinerySatelliteCount = 0 ;
const refinerySatelliteOwnedText = document.getElementById("refinerySatelliteOwned");
let refinerySatelliteOwned = 0;

const hyperDrive = document.getElementById("hyperDrive");
const hyperDriveCostText = document.getElementById("hyperDriveCost");
let hyperDriveCost = 25000 * discountMultiplier;
hyperDriveCostText.innerText = Math.floor(hyperDriveCost);
let hyperDriveCount = 0 ;
const hyperDriveTimerText = document.getElementById("hyperDriveTimer");

const upgradeMatrix = document.getElementById("upgradeMatrix");
let upgradeMatrixCount = 0;
const upgradeMatrixOwnedText = document.getElementById("upgradeMatrixOwned");
let upgradeMatrixOwned = 0;

const singularityBreaker = document.getElementById("singularityBreaker");
const singularityBreakerCostText = document.getElementById("singularityBreakerCost");
let singularityBreakerCost = 50000 * discountMultiplier;
singularityBreakerCostText.innerText = Math.floor(singularityBreakerCost);
let singularityBreakerCount = 0;
const singularityBreakerOwnedText = document.getElementById("singularityBreakerOwned");
let singularityBreakerOwned = 0;

const rockButton = document.getElementById("rock");
const starDustText = document.getElementById("starDust");
let rewardClaimed100 = false;

const starDust100 = document.getElementById("starDust100");
const starDust100Claim = document.getElementById("starDust100Claim");
function starDust100Function() {
starDust100.innerText = Math.floor(starDust);
if (starDust >= 100 && rewardClaimed100 === false) {
    starDust100Claim.classList.remove("gray");
    starDust100Claim.classList.add("buy");
    starDust100.innerText = Math.floor(starDust);
    starDust100Claim.addEventListener("click", () => {
    if (rewardClaimed100) return;
    starDust100Claim.classList.remove("buy");
    starDust100Claim.classList.add("gray");
    starDust += 50;
    starDust100Claim.innerText = "Claimed!";
    rewardClaimed100 = true;
    }
    );
} 
}
let rewardClaimedPhotonDrill = false;
const photonDrill100 = document.getElementById("photonDrill100");
const photonDrill100Claim = document.getElementById("photonDrill100Claim");

    photonDrill100Claim.addEventListener("click", () => {
         if (photonDrillOwned >= 1 && rewardClaimedPhotonDrill === false) {
        gainMultiplier += .10;
        rewardClaimedPhotonDrill = true;
        } 
    });

function photonDrill100Function() {
            if (rewardClaimedPhotonDrill === true){
    photonDrill100Claim.classList.remove("buy");
    photonDrill100Claim.classList.add("gray");
    photonDrill100Claim.innerText = "Claimed!";
        } else if (photonDrillOwned >= 1 && rewardClaimedPhotonDrill === false) {
            photonDrill100Claim.classList.remove("gray");
             photonDrill100Claim.classList.add("buy");
        }
photonDrill100.innerText = photonDrillOwned;
}

let rewardClaimed1000 = false;
const starDust1000 = document.getElementById("starDust1000");
const starDust1000Claim = document.getElementById("starDust1000Claim");
function starDust1000Function() {
starDust1000.innerText = Math.floor(starDust);
if (starDust >= 1000 && rewardClaimed1000 === false) {
    starDust1000Claim.classList.remove("gray");
    starDust1000Claim.classList.add("buy");
    starDust1000.innerText = Math.floor(starDust);
    starDust1000Claim.addEventListener("click", () => {
    if (rewardClaimed1000) return;
    starDust1000Claim.classList.remove("buy");
    starDust1000Claim.classList.add("gray");
    plasmaCutterOwned++;
    plasmaCutterOwnedText.innerText = plasmaCutterOwned;
    plasmaCutterCount += 7;
    starDust1000Claim.innerText = "Claimed!";
    rewardClaimed1000 = true;
    }
    );
} 
}
let rewardClaimedMiningDrone100 = false;
const miningDrone100 = document.getElementById("miningDrone100");
const miningDrone100Claim = document.getElementById("miningDrone100Claim");

    miningDrone100Claim.addEventListener("click", () => {
         if (miningDroneOwned >= 1 && rewardClaimedMiningDrone100 === false) {
        gainMultiplier += .05;
        rewardClaimedMiningDrone100 = true;
        } 
    });

function miningDroneFunction() {
            if (rewardClaimedMiningDrone100 === false && miningDroneOwned >= 1) {
         miningDrone100Claim.classList.remove("gray");
        miningDrone100Claim.classList.add("buy");
            } else if (rewardClaimedMiningDrone100 === true && rewardClaimedMiningDrone100 === true) {
    miningDrone100Claim.classList.remove("buy");
    miningDrone100Claim.classList.add("gray");
    miningDrone100Claim.innerText = "Claimed!";
        }
miningDrone100.innerText = miningDroneOwned;
}

let rewardClaimedObjective5 = false;
const objective5 = document.getElementById("objective5Count");
const objective5Claim = document.getElementById("objective5Claim");

    objective5Claim.addEventListener("click", () => {
         if (miningDroneOwned >= 1 && rewardClaimedObjective5 === false) {
        gainMultiplier += .15;
        rewardClaimedObjective5 = true;
        } 
    });

function objective5Function() {
            if (rewardClaimedObjective5 === false && miningDroneOwned >= 3) {
         objective5Claim.classList.remove("gray");
        objective5Claim.classList.add("buy");
            } else if (rewardClaimedObjective5 === true && rewardClaimedObjective5 === true) {
    objective5Claim.classList.remove("buy");
    objective5Claim.classList.add("gray");
    objective5Claim.innerText = "Claimed!";
        }
objective5.innerText = miningDroneOwned;
}

let rewardClaimedObjective6 = false;
const objective6 = document.getElementById("objective6Count");
const objective6Claim = document.getElementById("objective6Claim");

    objective6Claim.addEventListener("click", () => {
         if (starDust >= 10000 && rewardClaimedObjective6 === false) {
        gainMultiplier += .15;
        rewardClaimedObjective6 = true;
        } 
    });

function objective6Function() {
            if (rewardClaimedObjective6 === false && starDust >= 10000) {
         objective6Claim.classList.remove("gray");
        objective6Claim.classList.add("buy");
            } else if (rewardClaimedObjective6 === true && rewardClaimedObjective6 === true) {
    objective6Claim.classList.remove("buy");
    objective6Claim.classList.add("gray");
    objective6Claim.innerText = "Claimed!";
        }
objective6.innerText = Math.floor(starDust);;
}

let rewardClaimedObjective7 = false;
const objective7 = document.getElementById("objective7Count");
const objective7Claim = document.getElementById("objective7Claim");

    objective7Claim.addEventListener("click", () => {
         if (hyperDriveOwned >= 1 && rewardClaimedObjective7 === false) {
        starDust += 5000;
        rewardClaimedObjective7 = true;
        } 
    });

function objective7Function() {
            if (rewardClaimedObjective7 === false && hyperDriveOwned >= 1) {
         objective7Claim.classList.remove("gray");
        objective7Claim.classList.add("buy");
            } else if (rewardClaimedObjective7 === true && rewardClaimedObjective7 === true) {
    objective7Claim.classList.remove("buy");
    objective7Claim.classList.add("gray");
    objective7Claim.innerText = "Claimed!";
        }
objective7.innerText = hyperDriveOwned;
}

setInterval(() => {
    if (rewardClaimed100 === true) return;

    starDust100Function();
}, 3000);
setInterval(() => {
    console.log(elapsedSeconds);
    photonDrill100Function();
}, 1000);
setInterval(() => {
    starDust1000Function();
}, 1000);
setInterval(() => {
    miningDroneFunction();
}, 1000);
setInterval(() => {
    objective5Function();
}, 1000);
setInterval(() => {
    objective6Function();
}, 1000);
setInterval(() => {
    objective7Function();
}, 1000);
starDustText.innerText = Math.floor(starDust);
rockButton.addEventListener("click", () => {
         rockButton.classList.remove("wobble");
         void rockButton.offsetWidth;
         rockButton.classList.add("wobble");
         starDust += (1 + photonDrillCount + plasmaCutterCount + orbitalCollectorCount + refinerySatelliteCount) * gainMultiplier;
         starDustText.innerText = Math.floor(starDust);
})

photonDrill.addEventListener("click", () => {
    if(starDust >= photonCost) {
        starDust -= photonCost;
        starDustText.innerText = Math.floor(starDust);
        photonDrillOwned++;
        photonOwned.innerText = photonDrillOwned;
        photonDrillCount++;
        photonCost = Math.floor((photonCost * 1.15) * discountMultiplier);
        photonCostText.innerText = photonCost;
    }
})
miningDrone.addEventListener("click", () => {
    if(starDust >= miningDroneCost) {
        starDust -= miningDroneCost;
        starDustText.innerText = Math.floor(starDust);
        miningDroneCount += 5;
        miningDroneOwned++;
        miningDroneOwnedText.innerText = miningDroneOwned;
        miningDroneCost = Math.floor((miningDroneCost * 1.15) * discountMultiplier);
        miningDroneCostText.innerText = Math.floor(miningDroneCost);
    }
})
plasmaCutter.addEventListener("click", () => {
        if(starDust >= plasmaCutterCost) {
        starDust -= plasmaCutterCost;
        starDustText.innerText = Math.floor(starDust);
        plasmaCutterCount += 7;
        plasmaCutterOwned++;
        plasmaCutterOwnedText.innerText = plasmaCutterOwned;
        plasmaCutterCost = Math.floor((plasmaCutterCost * 1.15) * discountMultiplier);
        plasmaCutterCostText.innerText = Math.floor(plasmaCutterCost);
    }
})
automatedBot.addEventListener("click", () => {
        if(starDust >= automatedBotCost) {
        starDust -= automatedBotCost;
        starDustText.innerText = Math.floor(starDust);
        automatedBotCount += 20;
        automatedBotOwned++;
        automatedBotOwnedText.innerText = automatedBotOwned;
        automatedBotCost = Math.floor((automatedBotCost * 1.15) * discountMultiplier);
        automatedBotCostText.innerText = Math.floor(automatedBotCost);
    } 
})
energyCore.addEventListener("click", () => {
    if(energyCoreOwned === 1) return;
     if(starDust >= 4000) {
        starDust -= 4000;
        starDustText.innerText = Math.floor(starDust);
        energyCoreOwned++;
        energyCoreOwnedText.innerText = energyCoreOwned;
        gainMultiplier += .15;
     }
});
upgradeMatrix.addEventListener("click", () => {
    if(upgradeMatrixOwned === 1) return;
     if(starDust >= 1000) {
        starDust -= 1000;
        starDustText.innerText = Math.floor(starDust);
        upgradeMatrixOwned++;
        upgradeMatrixOwnedText.innerText = upgradeMatrixOwned;
        discountMultiplier -= .10;
     }
});

orbitalCollector.addEventListener("click", () => {
    if(starDust >= orbitalCollectorCost) {
        starDust -= orbitalCollectorCost;
        starDustText.innerText = Math.floor(starDust);
        orbitalCollectorCount += 75;
        orbitalCollectorOwned++;
        orbitalCollectorOwnedText.innerText = orbitalCollectorOwned;
        orbitalCollectorCost = Math.floor((orbitalCollectorCost * 1.15) * discountMultiplier);
        orbitalCollectorCostText.innerText = Math.floor(orbitalCollectorCost);
    }
})

refinerySatellite.addEventListener("click", () => {
    if(starDust >= refinerySatelliteCost) {
        starDust -= refinerySatelliteCost;
        starDustText.innerText = Math.floor(starDust);
        refinerySatelliteCount += 400;
        refinerySatelliteOwned++;
        refinerySatelliteOwnedText.innerText = refinerySatelliteOwned;
        refinerySatelliteCost = Math.floor((refinerySatelliteCost * 1.15) * discountMultiplier);
        refinerySatelliteCostText.innerText = Math.floor(refinerySatelliteCost);
    }
})

let hyperDriveOwned = 0;
let hyperDriveOn = false;
hyperDrive.addEventListener("click", () => {
    if(hyperDriveOn === true) return;
    if(starDust >= 25000) {
        hyperDriveOwned++;
        starDust-= 25000;
        starDustText.innerText = Math.floor(starDust);
     hyperDriveCost = Math.floor((hyperDriveCost * 1.15) * discountMultiplier);
     hyperDriveCostText.innerText = Math.floor(hyperDriveCost);
     gainMultiplier *= 2;
     let remaining = 300;
    hyperDriveOn = true;
     const countdown = setInterval(() => {
        if (hyperDriveOn === false) {
         clearInterval(countdown);
        hyperDriveTimerText.innerText = "";
         return;
        }
      remaining--;
      hyperDriveTimerText.innerText = `HYPER DRIVE! ${remaining}`;
      if(remaining <= 0) {
        clearInterval(countdown);
        hyperDriveTimerText.innerText = "";
        gainMultiplier /= 2;
        hyperDriveOn = false;
      }
    }, 1000
    )
    
    }
});
singularityBreaker.addEventListener("click", () => {
        if(starDust >= singularityBreakerCost) {
        starDust -= singularityBreakerCost;
        starDustText.innerText = Math.floor(starDust);
        singularityBreakerOwned++;
        singularityBreakerOwnedText.innerText = singularityBreakerOwned;
        singularityBreakerCost = Math.floor((singularityBreakerCost * 1.15) * discountMultiplier);
        singularityBreakerCostText.innerText = Math.floor(singularityBreakerCost);
                clearInterval(musicInterval);


            clearInterval(musicInterval);
    }
})

function checkWinCondition() {
    if (singularityBreakerOwned >= 1) {
                onWin = true;
                clearInterval(difficultyInterval);
                playTrack("audio7.mp3");
        document.getElementById("main").style.display = "none";
        document.getElementById("winContainer").style.display = "flex";


    };
}    
    setInterval(() => {
        checkWinCondition();
    }, 1000);
let droneInterval = setInterval(() => {
    starDust += miningDroneCount * gainMultiplier;
    starDustText.innerText = Math.floor(starDust);
}, 1000);

let automatedBotInterval = setInterval(() => {
    starDust += automatedBotCount * gainMultiplier;
        starDustText.innerText = Math.floor(starDust);
}, 1000)

let orbitalInterval = setInterval(() => {
    starDust += orbitalCollectorCount * gainMultiplier;
    starDustText.innerText = Math.floor(starDust);
}, 1000);

let satelliteInterval = setInterval(() => {
    starDust += refinerySatelliteCount * gainMultiplier;
    starDustText.innerText = Math.floor(starDust);
}, 1000);


window.onload = () => {
  loadGame();
  if (!localStorage.getItem("introShown")) {
    alert("🚀 MISSION BRIEFING:\nYou're stranded in deep space.\nMine stardust, restore ship systems, and return to Earth.");
    localStorage.setItem("introShown", true);
  }
};
function playMainMenuMusic() {
    if(!audio.src.endsWith("audio8.mp3")) {
        audio.src = "songs/audio8.mp3";
    } else if (audio.paused) {
        audio.play();
    }
}

window.addEventListener("load", () => {
     playMainMenuMusic();
})
