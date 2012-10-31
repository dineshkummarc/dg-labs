/*	Author:
		TMW - (Author Name Here)
*/

var startBtn = document.querySelector('.startBtn'),
	moveText = document.querySelector('.moveText'),
	marioFlat = document.querySelector('.marioFlat'),
	mario = document.querySelector('.mario'),
	coin = document.querySelectorAll('.coin'),
	mushroom = document.querySelector('.mushroom'),
	enemy1 = document.querySelector('.enemy1');

//  =======================
//  === EVENT LISTENERS ===
//  =======================

//click handler for START button
	startBtn.addEventListener('click', function(event) {
		event.preventDefault();
		document.getElementById('textBox').className += ' fade';
		audioNewWorld.play();
		document.getElementById('levelSelect').className = 'startScreen';
	}, false);

//listening for our flat mario on level select to start moving
	marioFlat.addEventListener('animationstart', marioFlatSound);
	marioFlat.addEventListener('webkitAnimationStart', marioFlatSound);
		function marioFlatSound() {
			//play movement sound, delay by 200ms, then play again
			mapTravel.play();
			window.setTimeout(function () { mapTravel.currentTime = 0.01; }, 200);
		}

//listening for our flat mario on level select to start moving
	marioFlat.addEventListener('animationend', marioFlatEnd);
	marioFlat.addEventListener('webkitAnimationEnd', marioFlatEnd);
		function marioFlatEnd() {
			//play movement sound, delay by 200ms, then play again
			levelBegin.play();
			audioSelectTheme.pause();
			document.getElementById('levelSelect').className += ' fadeScreen';

			window.setTimeout(function () { audioWorldTheme.play(); }, 300);
			window.setTimeout(function () { document.getElementById('mainScene').className += ' startAnim'; }, 1000);
		}

//listening for end of the first goomba animation
	enemy1.addEventListener('animationend', enemyHide);
	enemy1.addEventListener('webkitAnimationEnd', enemyHide);
		function enemyHide(e) {
			log(e);
			e.currentTarget.className += ' dead';
			window.setTimeout(deleteNode, 500, '.enemy1');
		}

//coin
	var i, coinLength = coin.length;
	for (i = 0; i < coinLength; i++) {
		coin[i].addEventListener('animationStart', playCoin);
		coin[i].addEventListener('webkitAnimationStart', playCoin);
	}
	function playCoin(e) {
		if (!audioCoin.paused) {
			audioCoin.currentTime = 0.01;
		} else {
			audioCoin.play();
		}
	}

//mushroom
	mushroom.addEventListener('animationstart', function(e) { audioMushroom.play(); });
	mushroom.addEventListener('webkitAnimationStart', function(e) { audioMushroom.play(); });

//Mario listener events
	mario.addEventListener('animationstart', marioEventListener);
	mario.addEventListener('webkitAnimationStart', marioEventListener);
		function marioEventListener(e) {
			switch (e.animationName) {
				//jumps
				case 'mario-jump-first':
					audioMarioJump.play();
					break;
				case 'mario-jump-second':
					moveTextToggle(); //turn sign off
					audioMarioJump.play();
					window.setTimeout(function () { audioMarioJump.currentTime = 0.01; }, 370);
					break;
				case 'mario-grow':
					audioPowerUp.play();
					break;
				case 'mario-run-second':
					moveTextToggle(); //turn sign off
					break;
			}
		}
	mario.addEventListener('animationEnd', marioEventEndListener);
	mario.addEventListener('webkitAnimationEnd', marioEventEndListener);
		function marioEventEndListener(e) {
			switch (e.animationName) {
				//jumps
				case 'mario-jump-first':
				case 'mario-grow':
				case 'mario-jump-qbox':
					moveTextToggle();
					break;
			}
		}

//  =============================
//  === AUDIO BITS AND PIECES ===
//  =============================

var audio = new Audio(), //generic audio object for testing
	canPlayOgg = !!audio.canPlayType && audio.canPlayType('audio/ogg; codecs="vorbis"') !== "",
	canPlayMP3 = !!audio.canPlayType && audio.canPlayType('audio/mp3') !== "",

	//setup audio elements to embed in page,
	audioObjects = [],
	audioSelectTheme,
	audioWorldTheme,
	audioNewWorld,
	mapTravel,
	levelBegin,
	audioMarioJump,
	audioCoin,
	audioMushroom,
	audioPowerUp;


audioSelectTheme = createAudio("soundboard/smb3-world-map", true);
audioWorldTheme = createAudio("soundboard/smb3-overworld-1", true);
audioNewWorld = createAudio("soundboard/smb3_map_new_world");
mapTravel = createAudio("soundboard/smb3_map_travel");
levelBegin = createAudio("soundboard/smb3_enter_level");
audioMarioJump = createAudio("soundboard/smb3_jump");
audioCoin = createAudio("soundboard/smb3_coin");
audioMushroom = createAudio("soundboard/smb3_mushroom_appears");
audioPowerUp = createAudio("soundboard/smb3_power-up");


audioSelectTheme.play();

//generic function to create all new audio elements equal, with preload
function createAudio (audioFile, loopSet) {
	var tempAudio = new Audio(),
		audioExt;

	if (canPlayMP3) {
		audioExt = '.mp3';
	} else if (canPlayOgg) {
		audioExt = '.ogg';
	}

	tempAudio.setAttribute('src', audioFile + audioExt);
	tempAudio.preload = 'auto';
	tempAudio.loop = (loopSet === true ? true : false);

	return tempAudio;
}


function deleteNode(element) {
	document.querySelector(element).style.display = 'none';
}

function moveTextToggle () {
	var moveTextState = moveText.style.display;

	if (moveTextState === 'block') {
		moveText.style.display = 'none';
	} else {
		moveText.style.display = 'block';
	}
}
