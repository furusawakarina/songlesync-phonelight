function onSongleAPIReady(Songle) {

  // 音楽プレーヤーを表示する
  var player = new Songle.Player({
    mediaElement: document.querySelector('div.media'),
    accessToken: '00000144-8PDPBsb', // 参加用トークン
    secretToken: '5ruktp2XZhuB1rKBLhUTkTdq6b46bHDb'  // 認証用トークン
  });

  // Sync
  player.addPlugin(new Songle.Plugin.SongleSync({
    enabled: true,
    clientId: "unique-" + Date.now()
  }));

  // 曲切り替え
  const songA = "https://embed.nicovideo.jp/watch/sm40955466";
  const songB = "https://www.nicovideo.jp/watch/sm40955466";

  document.querySelector('button.songA')?.addEventListener('click', () => {
    player.useMedia(songA);
  });

  document.querySelector('button.songB')?.addEventListener('click', () => {
    player.useMedia(songB);
  });

  // ===== ランダム色モード設定 =====
  // true: 和音が変わるたびランダム色 / false: ボタン手動色 or（あなたの元の和音→色対応）にできる
  let randomMode = true;

  // （任意）UIに切替ボタンがある場合： <button class="toggleRandom">random</button>
  document.querySelector('button.toggleRandom')?.addEventListener('click', () => {
    randomMode = !randomMode;
    console.log("randomMode:", randomMode);
  });

  // 色を“気持ちよく”ランダムにする関数（極端な白/黒を避ける）
  function randomHsl() {
    const h = Math.floor(Math.random() * 360);          // 0-359
    const s = 55 + Math.floor(Math.random() * 35);      // 55-89%
    const l = 40 + Math.floor(Math.random() * 25);      // 40-64%
    return { h, s, l };
  }

  // 連続で近すぎる色が出るのを避ける（任意）
  let lastH = null;
  function randomHslAvoidNearHue(minDelta = 35) {
    let c, tries = 0;
    do {
      c = randomHsl();
      tries++;
      if (lastH === null) break;
      const d = Math.abs(c.h - lastH);
      const hueDist = Math.min(d, 360 - d);
      if (hueDist >= minDelta) break;
    } while (tries < 10);
    lastH = c.h;
    return c;
  }

  // ===== 和音 =====
  player.addPlugin(new Songle.Plugin.Chord());

  player.on("chordEnter", function (ev) {
    if (!randomMode) return; // ランダムモードOFFなら何もしない

    const { h, s, l } = randomHslAvoidNearHue(35);
    document.body.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  });

  // ===== 再生/停止/シークなど =====
  document.querySelector('button.play')?.addEventListener('click', () => {
    player.play();
  });

  document.querySelector('button.seekTo')?.addEventListener('click', () => {
    player.seekTo(0);
  });

  // サビ
  player.addPlugin(new Songle.Plugin.Chorus());
  document.querySelector('button.seekToPrevChorusSection')?.addEventListener('click', () => {
    player.seekToPrevChorusSection();
  });

  document.querySelector('button.pause')?.addEventListener('click', () => {
    player.pause();
  });

  // （あなたの既存ボタン色固定：手動色は常に効く＆ランダムを止める仕様に）
  const buttons = document.querySelectorAll('button[data-color]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color');
      if (!color) return;
      randomMode = false; // 手動押したらランダム止める（実験として自然）
      document.body.style.backgroundColor = color;
    });
  });

  // 再生時刻表示
  var span = document.querySelector('span.time');
  if (span) {
    setInterval(function () {
      while (span.childNodes.length > 0) span.removeChild(span.childNodes[0]);
      var textNode = document.createTextNode(parseInt(player.positionTime));
      span.appendChild(textNode);
    }, 100);
  }
}
