//v1.0.1
var game_options = {
  sound: true,
};
var bgMusic = null; // Global reference to background music

function play_sound(id, scope) {
  if (game_options.sound) {
    scope.sound.play(id);
  }
}

function play_bg_music(id, scope) {
  if (game_options.sound) {
    // Stop any existing background music
    if (bgMusic) {
      bgMusic.stop();
    }
    // Play new background music with loop
    bgMusic = scope.sound.add(id, { loop: true, volume: 0.6 });
    bgMusic.play();
  }
}

function fade_out_bg_music(duration = 2000) {
  if (bgMusic && bgMusic.isPlaying) {
    // Create fade out tween
    bgMusic.volume = 0;
    bgMusic.stop();
    bgMusic = null;
    /* bgMusic.scene.tweens.add({
			targets: bgMusic,
			volume: 0,
			duration: duration,
			ease: 'Power2',
			onComplete: () => {
				bgMusic.stop();
				bgMusic = null;
			}
		}); */
  }
}

function switch_audio(obj) {
  if (game_options[obj.name]) {
    game_options[obj.name] = false;
    obj.setTexture("btn_sound_off");
    // Stop background music when sound is turned off
    if (bgMusic && bgMusic.isPlaying) {
      bgMusic.pause();
    }
  } else {
    game_options[obj.name] = true;
    obj.setTexture("btn_sound_on");
    // Resume background music when sound is turned on
    if (bgMusic && !bgMusic.isPlaying) {
      bgMusic.resume();
    }
  }
}
function check_audio(obj) {
  if (game_options[obj.name]) {
    obj.setTexture("btn_sound_on");
  } else {
    obj.setTexture("btn_sound_off");
  }
}
function draw_button(x, y, id, scope) {
  var o = scope.add.sprite(x, y, "btn_" + id).setInteractive();
  o.button = true;
  if (id == "sound_on" || id == "sound_off") {
    id = "sound";
  }
  o.name = id;
  return o;
}
function get_data(key) {
  let local_data = localStorage.getItem(key);
  if (local_data) {
    // Data is exist
    return local_data;
  } else {
    return null; //Not exist
  }
}
function save_data(key, value) {
  localStorage.setItem(key, value);
}
function remove_data(key) {
  localStorage.removeItem(key);
}
window.openTimer = false;
/* startPlayableTimer(); */
function startPlayableTimer() {
  let timer = 0;
  let interval = setInterval(() => {
    if (window.openTimer) {
      timer += 5;
      fnfetchAPI(window.trackingType + timer + "secondsOnAd");
    }
  }, 5000);
}
function fnfetchAPI(trackingURL) {
  fetch(trackingURL, { method: "GET" })
    .then((response) => console.log("Tracking sent:", response.status))
    .catch((error) => console.error("Tracking error:", error));
}
