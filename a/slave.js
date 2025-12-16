function onSongleAPIReady(Songle){
	
  var splayer = new Songle.Player({
      accessToken: '00000144-8PDPBsb' // アクセストークン
	  //mediaElement: "#songle"
  });

	/*const player =
  new window.Songle.Player({
    mediaElement: "#songle"
  });*/

/*splayer.on("ready",
  function(ev) {
    splayer.play();
  });*/

  splayer.addPlugin(new Songle.Plugin.SongleSync());
	//player.useMedia("https://www.youtube.com/watch?v=mTMs1S5td74");
 splayer.addPlugin(new Songle.Plugin.Chord());
let syncMode = false;

//グラデ
/*let fadeMsOnSync = 350;  // Syncのときだけフェード
let current = { h: 0, s: 70, l: 60 };
let animId = null;

function shortestHueDelta(from, to) {
  return ((to - from + 540) % 360) - 180;
}

function setColorSmooth(targetH, targetS, targetL, durationMs) {
  if (animId) cancelAnimationFrame(animId);

  if (durationMs <= 0) {
    current = { h: targetH, s: targetS, l: targetL };
    document.body.style.backgroundColor = `hsl(${current.h}, ${current.s}%, ${current.l}%)`;
    return;
  }

  const start = performance.now();
  const startH = current.h, startS = current.s, startL = current.l;
  const dH = shortestHueDelta(startH, targetH);
  const dS = targetS - startS;
  const dL = targetL - startL;

  function tick(now) {
    const t = Math.min(1, (now - start) / durationMs);
    const e = t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2)/2;

    const h = (startH + dH * e + 360) % 360;
    const s = startS + dS * e;
    const l = startL + dL * e;

    current = { h, s, l };
    document.body.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;

    if (t < 1) animId = requestAnimationFrame(tick);
  }
  animId = requestAnimationFrame(tick);
}*/
	
//和音
splayer.on("chordEnter",
  function(ev) {
	if (!syncMode) return;
     //do someting ...
	const chordName = ev.data.chord.name;
	  let h =0;
	let color = "white";
		if (chordName.startsWith("C"))
		  h = 0;
	  else if(chordName.startsWith("C#") || chordName.startsWith("Db"))
		  h = 30;
	  else if(chordName.startsWith("D"))
		  h = 60;
	  else if(chordName.startsWith("D#") || chordName.startsWith("Eb"))
		  h = 90;
	  else if(chordName.startsWith("E"))
		  h = 120;
	  else if(chordName.startsWith("F"))
		  h = 150;
	  else if(chordName.startsWith("F#") || chordName.startsWith("Gb"))
		  h = 180;
	  else if(chordName.startsWith("G"))
		  h = 210;
	  else if(chordName.startsWith("G#") || chordName.startsWith("Ab"))
		  h = 240;
	  else if(chordName.startsWith("A"))
		  h = 270;
	  else if(chordName.startsWith("A#") || chordName.startsWith("Bb"))
		  h = 300;
	  else if(chordName.startsWith("B"))
		  h = 330;
	  
	let s = 65;
	  if (chordName.includes("6"))
		  s = 68;
	  else if(chordName.includes("maj7"))
		  s = 72;
	  else if(chordName.includes("m7"))
		  s = 68;
	  else if(chordName.includes("m7(♭5)"))
		  s = 82;
	  else if(chordName.includes("7"))
		  s = 80;
	  else if(chordName.includes("m"))
		  s = 60;
	  else if(chordName.includes("dim"))
		  s = 88;
	  else if(chordName.includes("aug"))
		  s = 78;

	  let l = 50;
		  if(chordName.includes("/3"))
			  l = 75;
		  else if(chordName.includes("/5"))
			l = 68;
		  else if (chordName.includes("/2"))
			  l = 65;
		  else if (chordName.includes("/♭7"))
			  l = 60;
		  else if (chordName.includes("/7"))
			  l = 55;

	  document.body.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
	//setColorSmooth(h, s, l, fadeMsOnSync);
  });
	




	
//同期ボタン
const syncButton = document.querySelector('button.synchronize');
  syncButton.addEventListener('click', () => {
	
	syncMode = true;
	//player.addPlugin(new Songle.Plugin.Chord());

    console.log("同期開始！");
  });

	
//停止
const stopButton = document.querySelector('button.stop');
  stopButton.addEventListener('click', () => {
	  document.body.style.backgroundColor ="white";
	  syncMode = false;
  });

//ボタンでの切り替え
const buttons = document.querySelectorAll('button[data-color]');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
	syncMode = false;
    const color = btn.dataset.color; // data-color属性を取る
    document.body.style.backgroundColor = color;
  });
});

  
}
