 // Audio elements
 let backgroundMusic = document.getElementById('background-music');
 let cardRotateSound = document.getElementById('card-rotate-sound');
 
 // Flag to track if music has been started
 let musicStarted = false;

$( function () {
  var clicks = 0;
  PEXI.receiveMessage('200', function(){
		document.querySelector('.copytop').src = 'copytopR.png';
    document.querySelector('.copy').src = '';
	});
  PEXI.receiveMessage('300', function(){
		document.querySelector('.copytop').src = 'copytop.svg';
    document.querySelector('.copy').src = 'top_copy_1.svg';
	});
	function hover(){
		var hoverTimeline = gsap.timeline({paused:true})
      .to('.cta', 0.4, {scale:1.2, ease: "power2.out", yoyo:true})    
		;
		$("#stage").mouseenter( function() {
			PEXI.message('hoverIn')
    });
		$("#stage").mouseleave( function() {
			PEXI.message('hoverOut')
		});
    PEXI.receiveMessage('hoverIn', function(){
      hoverTimeline.play();
    });
		PEXI.receiveMessage('hoverOut', function(){
			hoverTimeline.reverse();
		});
	}
	tl = gsap.timeline({delay: 0.4, onComplete:hover,paused:true})
		.set('.hiddenOnload',{opacity:1})
    .from('.joch, .strand, .copy , .copytop',.5, {y:200, opacity:0,stagger:.1, ease: "power2.out"}, "<")
    .from('.cta', .5, {y:200, opacity:0, ease: "power2.out"}, "<")
    .to('.cta', .5, {scale:1.2, ease: "power2.out", yoyo:true, repeat:1})
	;
  puzzel = gsap.timeline({paused:true})
    .from('.cursor', 0.6, {x:40, y:40, display:'none', scale:0.8, ease: "power2.out"}, "2")
    .to('.cursor', 0.4, {scale:.8, ease: "power1.inOut"}, "<1")
    .to('.cursor', 0.3, {scale:1, ease: "power1.out"})
    .to('.row2 .M', 0.2, {rotation:"+=90", ease: "power2.out"}, "<")
    .to('.cursor', 0.4, {scale:.8, ease: "power1.inOut"}, "<1")
    .to('.cursor', 0.3, {scale:1, ease: "power1.out"})
    .to('.row2 .M', 0.2, {rotation:"-=90", ease: "power2.inOut"}, "<")
    .to('.cursor', 0.6, {x:40, y:40, display:'none', scale:0.8, ease: "power2.in"}, "<.5")
  ;
  completed = gsap.timeline({paused:true})
    .to('.puzzel', 1, {scale:1.2, ease: "power2.out", yoyo:true, repeat:1}, "<");
  document.querySelector('#stage').addEventListener('mouseenter', () => {
    if (puzzel.progress() < 1 && puzzel.progress() > 0) {
      puzzel.reverse();
    }
  });
  const pieces = document.querySelectorAll(".piece");

  // Make all pieces rotatable
  pieces.forEach(piece => {
    piece.dataset.rotation = "0";
    piece.addEventListener("click", () => {
      // Start background music if it's not already playing
      if(backgroundMusic.paused) backgroundMusic.play().catch(e => console.log('Unable to play music:', e));
      // Play card rotation sound with error handling
      cardRotateSound.currentTime = 0; // Reset to beginning
      cardRotateSound.play().catch(e => console.log('Unable to play card sound:', e));
      clicks++;
      PEXI.event(`aantal clicks: ${clicks}`);
      let current = parseInt(piece.dataset.rotation);
      current = current + 90; 
      piece.dataset.rotation = current;
      piece.style.transform = `rotate(${current}deg)`;
      checkWin();
    });
  });

  // Randomly rotate 5 pieces (wrong positions)
  const randomIndexes = new Set();
  while (randomIndexes.size < 7) {
    let index = Math.floor(Math.random() * pieces.length);
    randomIndexes.add(index);
  }
  [...randomIndexes].forEach(index => {
    const piece = pieces[index];
    const wrongAngle = [90, 180, 270][Math.floor(Math.random() * 3)];
    piece.dataset.rotation = wrongAngle;
    piece.style.transform = `rotate(${wrongAngle}deg)`;
  });

  // Function to check if all pieces are "correct" (rotation % 360 == 0)
  function checkWin() {
    const allCorrect = [...pieces].every(piece => {
      return parseInt(piece.dataset.rotation) % 360 === 0;
    });

    if (allCorrect) {
      PEXI.event(`Puzzel voltooid! Aantal clicks: ${clicks}`);
      
      setTimeout(() => {
        document.querySelectorAll('.L, .M, .R').forEach(el => {
          el.style.border = "none";
        });
        completed.play()
      },200);
      pieces.forEach(piece => {
        piece.style.pointerEvents = "none"; // Prevent further interaction
        piece.style.cursor = "default";     // Optional: change cursor style
      });
      setTimeout(() => {
        document.querySelector('.puzzel').style.opacity = '0';
        setTimeout(() => {
          document.querySelector('.strand').style.backgroundImage = "url('bgmain1.png')";
        },1000);
      },1000);
    }
  }
PEXI.inView(function(){
		tl.play();
    puzzel.play();
})
});


