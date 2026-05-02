const NOTE_VALUES = {
  C: 0,
  "C#": 1,
  D: 2,
  Eb: 3,
  E: 4,
  F: 5,
  "F#": 6,
  G: 7,
  Ab: 8,
  A: 9,
  Bb: 10,
  B: 11,
};

const NOTE_LABELS = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const KEYS = NOTE_LABELS;
const STORAGE_KEY = "chord-map-notebook-v1";
const TUNING = [4, 9, 2, 7, 11, 4];
const STRING_NAMES = ["E", "A", "D", "G", "B", "E"];
const BASS_TUNING = [4, 9, 2, 7];
const BASS_STRING_NAMES = ["E", "A", "D", "G"];
const MIDI_PPQ = 480;
const MIDI_WHOLE_NOTE_TICKS = MIDI_PPQ * 4;
const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

const MOODS = {
  natural: { label: "自然", color: "#82dd55" },
  lift: { label: "明るい", color: "#7ab3ff" },
  wistful: { label: "切ない", color: "#54d9ff" },
  tension: { label: "緊張", color: "#f5c34b" },
  blues: { label: "ブルース", color: "#b78cff" },
  surprise: { label: "意外", color: "#ff786d" },
  dream: { label: "浮遊", color: "#7ee7d2" },
  chromatic: { label: "半音", color: "#ff8fbd" },
  groove: { label: "グルーヴ", color: "#b7e85d" },
  altered: { label: "濁り", color: "#ff9d57" },
};

const ADVENTURES = {
  classic: { label: "定番", levels: [1], visualLevel: 1 },
  deep: { label: "J-POP深め", levels: [1, 2], visualLevel: 2 },
  wild: { label: "AI実験", levels: [1, 2, 3], visualLevel: 3 },
  jazz: { label: "Jazz/Funk", levels: [1, 4], visualLevel: 3 },
};

const QUALITY_LABELS = {
  maj: "",
  min: "m",
  "7": "7",
  m7: "m7",
  dim: "dim",
  maj7: "maj7",
  add9: "add9",
  sus4: "sus4",
  "7sus4": "7sus4",
  m7b5: "m7b5",
  dim7: "dim7",
  aug: "aug",
  mM7: "mM7",
  "6": "6",
  maj9: "maj9",
  m9: "m9",
  "9": "9",
  "13": "13",
  sixNine: "6/9",
  m11: "m11",
  dom7b9: "7(b9)",
  dom7alt: "7alt",
  sus13: "13sus",
  add11: "add11",
};

const QUALITY_DESCRIPTIONS = {
  maj: "明るく、輪郭がはっきりした響き。",
  min: "少し影があり、歌ものにも使いやすい響き。",
  "7": "次へ進みたくなる、軽い緊張を持った響き。",
  m7: "柔らかく、少し大人っぽい響き。",
  dim: "不安定で、短い橋のように使いやすい響き。",
  maj7: "透明感があり、2000年以降のJ-POPにも合いやすい響き。",
  add9: "明るさに余韻が足され、ギターでも歌いやすい響き。",
  sus4: "まだ答えを出さない、空中で止まるような響き。",
  "7sus4": "緊張しているのに角が丸い、展開前に使いやすい響き。",
  m7b5: "暗く細い橋。次の強いコードへ滑らかに行けます。",
  dim7: "半音で動かしたくなる、映画的な通過コード。",
  aug: "不思議に膨らむ響き。次の景色を急に変えられます。",
  mM7: "暗いのに艶がある、少し危うい響き。",
  "6": "軽く懐かしい、終わりにも途中にも置ける響き。",
  maj9: "maj7よりさらに空気が広く、夜景のような透明感があります。",
  m9: "マイナーの切なさに、都会的な余白が足されます。",
  "9": "7thより明るく跳ねる、グルーヴを作りやすい響き。",
  "13": "ファンク寄りの明るい濁り。短く切ると気持ちいい響き。",
  sixNine: "安定しつつ浮く、終止にもループにも使える響き。",
  m11: "暗さを保ったまま、空間が横に広がる響き。",
  dom7b9: "かなり濃い緊張。次のコードを強く照らします。",
  dom7alt: "あえて濁らせる、ジャズ的な強い曲がり角。",
  sus13: "答えを保留したまま踊れる、ファンク向きの響き。",
  add11: "少しぶつかる透明感。普通の明るさから外れられます。",
};

const MAPS = {
  major: {
    title: "メジャー系",
    centerRole: "I",
    nodes: [
      { id: "I", offset: 0, quality: "maj", x: 0, y: -190, role: "home", feeling: "家にいる感じ", description: "いちばん安定した場所。ここから始めても、ここへ戻っても落ち着きます。" },
      { id: "V7", offset: 7, quality: "7", x: 0, y: -82, role: "pull", feeling: "戻りたくなる", description: "少し緊張して、家のコードへ戻りたくなる響きです。" },
      { id: "ii", offset: 2, quality: "min", x: 0, y: 34, role: "step", feeling: "前に進む", description: "次に強いコードへ向かう準備をしてくれます。" },
      { id: "vi", offset: 9, quality: "min", x: 132, y: 46, role: "shade", feeling: "切ない寄り道", description: "明るいキーの中で、少しだけ影を足せます。" },
      { id: "iii", offset: 4, quality: "min", x: 190, y: 136, role: "float", feeling: "浮く感じ", description: "やわらかく浮いてから、切ない方向へ行きやすい場所です。" },
      { id: "IV", offset: 5, quality: "maj", x: -154, y: -74, role: "wide", feeling: "広がる", description: "空が開くような明るさ。サビや展開でよく効きます。" },
      { id: "V", offset: 7, quality: "maj", x: 156, y: -92, role: "go", feeling: "進みたい", description: "明るく前へ進む感じ。家へ戻る力もあります。" },
      { id: "bVII", offset: 10, quality: "maj", x: -244, y: 54, role: "rock", feeling: "ロック感", description: "少し外の空気が入る、ギターで気持ちいい寄り道です。" },
      { id: "ivm", offset: 5, quality: "min", x: -194, y: 148, role: "borrow", feeling: "胸がきゅっとする", description: "明るい曲の中で急に切なさを出せます。" },
      { id: "II7", offset: 2, quality: "7", x: 76, y: -168, role: "spark", feeling: "勢いを足す", description: "次の強いコードへ向かうためのブースターです。" },
      { id: "III7", offset: 4, quality: "7", x: 86, y: 164, role: "turn", feeling: "切なさへ押す", description: "マイナー寄りのコードへ行きたくなる強い合図です。" },
      { id: "VI7", offset: 9, quality: "7", x: 142, y: 238, role: "push", feeling: "次へ押す", description: "さらに先へ進める、少しジャジーな通り道です。" },
      { id: "vii", offset: 11, quality: "dim", x: 246, y: 16, role: "bridge", feeling: "細い橋", description: "短く使うと、近くのコードへ滑り込めます。" },
      { id: "Imaj7", offset: 0, quality: "maj7", x: -70, y: -248, role: "glass", feeling: "透明な家", description: "安定感はあるのに、余韻が深く残る場所です。", level: 2, weight: 2 },
      { id: "Iadd9", offset: 0, quality: "add9", x: 74, y: -254, role: "air", feeling: "空気が足される", description: "同じ家でも、歌の余白が広がる響きになります。", level: 2, weight: 2 },
      { id: "ii7", offset: 2, quality: "m7", x: -70, y: 94, role: "silk", feeling: "滑らかに進む", description: "普通のiiより柔らかく、J-POPの橋渡しに合います。", level: 2, weight: 1 },
      { id: "iii7", offset: 4, quality: "m7", x: 262, y: 170, role: "inner", feeling: "内側へ潜る", description: "王道進行で切なさを作りやすい、奥行きのある場所です。", level: 2, weight: 1 },
      { id: "IVmaj7", offset: 5, quality: "maj7", x: -292, y: -104, role: "wide", feeling: "都会的に広がる", description: "ただ明るいだけでなく、少し大人っぽい広がりを作ります。", level: 2, weight: 3 },
      { id: "IVadd9", offset: 5, quality: "add9", x: -336, y: -8, role: "halo", feeling: "光がにじむ", description: "ギターで鳴らすと、明るさのまわりに余韻が残ります。", level: 2, weight: 2 },
      { id: "vi7", offset: 9, quality: "m7", x: 252, y: 74, role: "shade", feeling: "切なさが深い", description: "普通のviより柔らかく、歌メロを乗せやすい場所です。", level: 2, weight: 2 },
      { id: "V7sus4", offset: 7, quality: "7sus4", x: 238, y: -168, role: "hold", feeling: "答えを待つ", description: "戻る力はあるのに、すぐ答えを出さない浮遊感があります。", level: 2, weight: 2 },
      { id: "bVII7", offset: 10, quality: "7", x: -350, y: 68, role: "back", feeling: "裏口から戻る", description: "ロック感とおしゃれな戻り方の間にあるコードです。", level: 2, weight: 2 },
      { id: "I7", offset: 0, quality: "7", x: -26, y: 252, role: "door", feeling: "別の景色へ開く", description: "家のコードを一瞬だけ緊張させ、IVへ向かう扉にできます。", level: 2, weight: 1 },
      { id: "Vm7", offset: 7, quality: "m7", x: 270, y: 254, role: "blue", feeling: "急に夜になる", description: "メジャー系の中で急に影が差す、歌もの向きの寄り道です。", level: 3, weight: 3 },
      { id: "bVImaj7", offset: 8, quality: "maj7", x: -318, y: 198, role: "borrow", feeling: "遠い光", description: "キーの外から借りた、大きく景色を変えるコードです。", level: 3, weight: 4 },
      { id: "bIImaj7", offset: 1, quality: "maj7", x: -306, y: -222, role: "film", feeling: "映画みたい", description: "一瞬で別世界に行く、強い色のあるコードです。", level: 3, weight: 4 },
      { id: "sharpIdim7", offset: 1, quality: "dim7", x: -102, y: -14, role: "slide", feeling: "半音で滑る", description: "CからDmのように、半音で次へ滑らせるためのコードです。", level: 3, weight: 3 },
      { id: "sharpivHalf", offset: 6, quality: "m7b5", x: 318, y: -44, role: "jazz", feeling: "細く深い橋", description: "急に大人っぽくなる橋。次のコードを濃く見せます。", level: 3, weight: 3 },
      { id: "III7slash", offset: 4, quality: "7", slashOffset: 8, x: 188, y: 214, role: "bass", feeling: "ベースが歌う", description: "ベースが半音で上がるように感じられ、viへ入る時に強く効きます。", level: 3, weight: 4 },
      { id: "I6_9", offset: 0, quality: "sixNine", x: 6, y: -296, role: "haze", feeling: "終わらない家", description: "安定しているのに終止感が強すぎず、ループに向いた家です。", level: 2, weight: 3 },
      { id: "Vadd9", offset: 7, quality: "add9", x: 318, y: -226, role: "spark", feeling: "明るい予感", description: "Vの前向きさに、歌メロが乗る余白を足します。", level: 2, weight: 2 },
      { id: "bIIImaj7", offset: 3, quality: "maj7", x: -270, y: 286, role: "borrow", feeling: "急に色づく", description: "キーの外から借りて、懐かしさと新しさを同時に出します。", level: 3, weight: 4 },
      { id: "bVI7", offset: 8, quality: "7", x: -232, y: 256, role: "burn", feeling: "外から燃える", description: "遠い場所から強引に次へ押す、AI実験寄りの熱いコードです。", level: 3, weight: 4 },
      { id: "sharpVaug", offset: 8, quality: "aug", x: 316, y: 154, role: "warp", feeling: "景色が曲がる", description: "ベースやトップノートを半音で押し上げる、不思議な曲がり角です。", level: 3, weight: 4 },
      { id: "tritoneV", offset: 1, quality: "7", x: -376, y: -164, role: "sub", feeling: "裏から帰る", description: "V7の代わりに使うと、半音で家へ戻るような濃い戻り方になります。", level: 3, weight: 4 },
      { id: "Imaj9", offset: 0, quality: "maj9", x: -42, y: -292, role: "silk", feeling: "夜景の家", description: "家のコードを夜景みたいに広げる、Jazz/Funk寄りの着地点です。", level: 4, weight: 4 },
      { id: "ii9", offset: 2, quality: "m9", x: -124, y: 126, role: "flow", feeling: "滑る準備", description: "普通のiiより空気があり、次のドミナントへ滑りやすい場所です。", level: 4, weight: 3 },
      { id: "iii9", offset: 4, quality: "m9", x: 326, y: 208, role: "inside", feeling: "奥へ潜る", description: "メロウな内側の場所。R&B寄りのコードループにも向きます。", level: 4, weight: 3 },
      { id: "IVmaj9", offset: 5, quality: "maj9", x: -388, y: -106, role: "wide", feeling: "広い夜景", description: "IVmaj7よりさらに広く、都会的なサビ前を作れます。", level: 4, weight: 4 },
      { id: "V13", offset: 7, quality: "13", x: 366, y: -126, role: "funk", feeling: "跳ねて戻る", description: "短く切るとファンクっぽく、伸ばすとジャジーに戻れます。", level: 4, weight: 4 },
      { id: "V7alt", offset: 7, quality: "dom7alt", x: 388, y: -28, role: "alt", feeling: "濁って戻る", description: "あえて濁らせて、次の家を強く美しく見せます。", level: 4, weight: 4 },
      { id: "bII13", offset: 1, quality: "13", x: -394, y: -246, role: "sub", feeling: "裏口のファンク", description: "半音上から戻る、濃くて踊れる裏口です。", level: 4, weight: 4 },
      { id: "VI9", offset: 9, quality: "9", x: 228, y: 292, role: "chain", feeling: "連鎖する", description: "次のiiへ進むための、明るく跳ねる寄り道です。", level: 4, weight: 3 },
      { id: "sus13", offset: 7, quality: "sus13", x: 308, y: -288, role: "hold", feeling: "踊って待つ", description: "答えを出さずにグルーヴを保つ、ファンク向きの保留コードです。", level: 4, weight: 4 },
    ],
    edges: [
      ["I", "V", "natural", "王道で明るく進みます。"],
      ["I", "V7", "tension", "少し緊張を作って、戻る力を出します。"],
      ["I", "vi", "wistful", "明るい場所から少し切ない場所へ下がります。"],
      ["I", "IV", "lift", "一気に景色が広がります。"],
      ["I", "ii", "natural", "次の流れを作る準備になります。"],
      ["I", "bVII", "blues", "ロックやブルースっぽい外の色が入ります。"],
      ["V", "I", "natural", "すっきり家へ戻ります。"],
      ["V", "vi", "surprise", "戻ると思わせて切ない方向へ逃がします。"],
      ["V7", "I", "natural", "強く戻る、いちばん分かりやすい解決です。"],
      ["V7", "vi", "surprise", "戻りそうで戻らない、歌ものの切ない動きです。"],
      ["IV", "I", "natural", "広がったあとに落ち着きます。"],
      ["IV", "V", "lift", "サビへ向かうように前へ進みます。"],
      ["IV", "ivm", "wistful", "明るさから急に胸がきゅっとします。"],
      ["ivm", "I", "wistful", "切なさを残したまま家へ戻ります。"],
      ["ii", "V7", "tension", "次に戻る力が強くなります。"],
      ["ii", "V", "natural", "自然に前へ進む定番の動きです。"],
      ["ii", "I", "surprise", "少しだけ肩透かしで落ち着けます。"],
      ["vi", "IV", "wistful", "切なさから明るさへ開きます。"],
      ["vi", "ii", "natural", "もう一歩進む準備になります。"],
      ["vi", "III7", "tension", "切ない場所をさらに強く引っ張ります。"],
      ["III7", "vi", "tension", "viへ強く入りたいときに効きます。"],
      ["VI7", "ii", "tension", "次の準備コードへ勢いよくつながります。"],
      ["II7", "V7", "tension", "戻るための力を一段強くします。"],
      ["bVII", "IV", "blues", "ロックの大きな流れを作れます。"],
      ["bVII", "I", "blues", "外から家へ戻る、ギターらしい動きです。"],
      ["vii", "I", "tension", "短い緊張からすぐ安定します。"],
      ["iii", "vi", "natural", "ふわっと切ない方向へ進みます。"],
      ["iii", "IV", "lift", "少し浮いたあと景色が広がります。"],
      ["I", "Imaj7", "dream", "同じ場所にいるのに急に奥行きが出ます。歌い出しやAメロの入口に合います。", 2],
      ["I", "Iadd9", "dream", "普通のIを少し浮かせます。明るいけど説明しすぎない響きです。", 2],
      ["Imaj7", "III7slash", "chromatic", "ベースがするっと動き、viへ行く予感をかなり強く作れます。", 3],
      ["Imaj7", "IVmaj7", "lift", "透明な家から、都会的に広がる場所へ行けます。", 2],
      ["Iadd9", "vi7", "wistful", "明るい余韻を残したまま、切ない場所へ落とします。", 2],
      ["IV", "IVmaj7", "dream", "いつものIVを少し大人っぽくします。", 2],
      ["IVmaj7", "V7sus4", "tension", "答えを焦らしてから戻る力を作ります。", 2],
      ["IVmaj7", "iii7", "wistful", "J-POPらしい、明るさの裏へ潜る動きです。", 2],
      ["V7sus4", "V7", "tension", "宙に浮いた感じを一度ほどいて、戻る力を強くします。", 2],
      ["V7sus4", "Imaj7", "dream", "解決しているのに余韻が残る戻り方です。", 2],
      ["vi", "vi7", "dream", "切なさをやわらかくして、次の展開を選びやすくします。", 2],
      ["vi7", "IVmaj7", "wistful", "切ないまま大きく開く、2000年以降の歌ものに合う動きです。", 2],
      ["vi7", "ii7", "natural", "深い循環に入る準備ができます。", 2],
      ["ii7", "V7sus4", "tension", "滑らかに緊張を作り、サビ前の待ち感が出ます。", 2],
      ["ii7", "V7", "tension", "王道を少し柔らかくした進み方です。", 2],
      ["iii7", "VI7", "tension", "王道進行の中に、次へ押す濃い味を入れられます。", 2],
      ["iii7", "vi7", "wistful", "内側へ潜ってから、さらに切ない場所へ流れます。", 2],
      ["III7slash", "vi7", "tension", "ベースが歌いながらviへ着地します。かなりJ-POP向きです。", 3],
      ["I7", "IVmaj7", "tension", "家のコードを一瞬だけ扉に変えて、IVへドラマチックに開きます。", 2],
      ["Vm7", "I7", "blues", "急に夜っぽくしてから、IVへ向かう入口を作れます。", 3],
      ["Imaj7", "Vm7", "surprise", "メジャーの家から急に影のある部屋へ行く、かなり遊べる動きです。", 3],
      ["bVII7", "Imaj7", "blues", "裏口から家へ戻ります。普通のVより洒落た帰り道です。", 2],
      ["ivm", "bVII7", "wistful", "切ない借用コードから、裏口の戻りへつなぎます。", 2],
      ["bVImaj7", "bVII7", "lift", "外の世界から大きく持ち上げて、家へ戻る準備をします。", 3],
      ["bVImaj7", "V7sus4", "surprise", "遠い光から、答えを待つ緊張へ急に近づきます。", 3],
      ["bIImaj7", "Imaj7", "surprise", "半音上の別世界から、急に透明な家へ戻ります。", 3],
      ["bIImaj7", "V7sus4", "tension", "映画っぽい外の色を、戻るための緊張へ変換します。", 3],
      ["I", "sharpIdim7", "chromatic", "次のコードへ半音で滑るための、AI実験寄りの通過点です。", 3],
      ["sharpIdim7", "ii7", "chromatic", "細い橋を渡って、自然な進行に戻れます。", 3],
      ["sharpivHalf", "V7sus4", "tension", "細く深い橋から、答えを待つ緊張へつなぎます。", 3],
      ["IVmaj7", "sharpivHalf", "chromatic", "IVから半音だけ影へ滑る、深めの作曲メモ向きです。", 3],
      ["I", "I6_9", "dream", "家にいるのに終わりすぎない、ループ向きの着地点になります。", 2],
      ["I6_9", "IVadd9", "lift", "浮いた家から、余韻のあるIVへ広がります。", 2],
      ["V", "Vadd9", "dream", "前へ行く力に、歌える余白を足します。", 2],
      ["Vadd9", "Iadd9", "natural", "明るい予感から、空気のある家へ戻ります。", 2],
      ["iii7", "I6_9", "surprise", "内側へ潜ったあと、終わりきらない家へ戻すと今っぽいループになります。", 2],
      ["Imaj7", "bIIImaj7", "surprise", "家から急に色づいた借用コードへ飛び、懐かしいのに新しく聞こえます。", 3],
      ["bIIImaj7", "IVmaj7", "lift", "遠い色を自然な広がりへ戻します。", 3],
      ["vi7", "bVI7", "altered", "切ない場所から外の熱へ落とす、かなり実験的な押し出しです。", 3],
      ["bVI7", "V7sus4", "chromatic", "外の熱を半音で落として、戻る前の保留に入れます。", 3],
      ["III7slash", "sharpVaug", "altered", "ベースの動きに合わせて景色を歪ませ、次の着地を読ませにくくします。", 3],
      ["sharpVaug", "vi7", "surprise", "膨らんだコードが、切ない場所へ吸い込まれます。", 3],
      ["tritoneV", "Imaj7", "chromatic", "裏から半音で戻る、普通のV7より濃い帰り道です。", 3],
      ["bIImaj7", "tritoneV", "altered", "映画的な外の場所から、さらに濁った裏口へ入ります。", 3],
      ["I", "Imaj9", "dream", "家をジャズ寄りに広げ、最初から夜の空気を作ります。", 4],
      ["Imaj9", "ii9", "groove", "透明な家から、滑る準備へ自然に入ります。", 4],
      ["ii9", "V13", "groove", "ジャズの流れを、ファンク寄りに跳ねさせます。", 4],
      ["V13", "Imaj9", "groove", "跳ねる濁りから、夜景の家へ戻ります。", 4],
      ["V13", "V7alt", "altered", "踊れるドミナントを、あえて濁らせてから戻せます。", 4],
      ["V7alt", "Imaj9", "altered", "強く濁ったあと、家の透明感がかなり映えます。", 4],
      ["Imaj9", "IVmaj9", "dream", "家から広い夜景へ横移動する、メロウな展開です。", 4],
      ["IVmaj9", "iii9", "wistful", "広がりから内側へ潜り、R&B的な切なさを作れます。", 4],
      ["iii9", "VI9", "groove", "内側からドミナントの連鎖へ入り、動きが出ます。", 4],
      ["VI9", "ii9", "groove", "跳ねる連鎖でiiへ戻り、循環を作れます。", 4],
      ["I", "sus13", "groove", "家からいきなり答えを保留し、リズムで引っ張れます。", 4],
      ["sus13", "V13", "groove", "保留したまま、さらにファンク寄りに進めます。", 4],
      ["bII13", "Imaj9", "chromatic", "半音上の濃い裏口から、夜景の家へ戻ります。", 4],
      ["IVmaj9", "bII13", "altered", "広いIVから遠い裏口へ飛び、強烈なリハモ感を作れます。", 4],
    ],
  },
  minor: {
    title: "マイナー系",
    centerRole: "i",
    nodes: [
      { id: "i", offset: 0, quality: "min", x: 0, y: -178, role: "home", feeling: "暗い家", description: "マイナー系の中心。切なさや影を持った安定感があります。" },
      { id: "i7", offset: 0, quality: "m7", x: 0, y: -72, role: "soft", feeling: "柔らかい家", description: "同じ家でも、少し大人っぽく丸い響きになります。" },
      { id: "iv", offset: 5, quality: "min", x: -148, y: -60, role: "deep", feeling: "深くなる", description: "暗さを保ったまま奥へ進む感じです。" },
      { id: "V7", offset: 7, quality: "7", x: 142, y: -70, role: "pull", feeling: "強く戻る", description: "マイナーの家へ戻る力がかなり強いコードです。" },
      { id: "v", offset: 7, quality: "min", x: 230, y: 18, role: "low", feeling: "沈む", description: "強く引っ張らず、暗さを保ったまま進めます。" },
      { id: "VI", offset: 8, quality: "maj", x: -170, y: 132, role: "light", feeling: "少し光る", description: "マイナーの中で光が差すような場所です。" },
      { id: "VII", offset: 10, quality: "maj", x: 168, y: 124, role: "rise", feeling: "上がる", description: "勢いを出しやすく、次の景色へつなげます。" },
      { id: "III", offset: 3, quality: "maj", x: 0, y: 176, role: "open", feeling: "開ける", description: "相対的に明るい場所。サビっぽさも作れます。" },
      { id: "ii", offset: 2, quality: "dim", x: -250, y: 20, role: "bridge", feeling: "細い橋", description: "短く使うと、強いコードへきれいに流れます。" },
      { id: "bII", offset: 1, quality: "maj", x: -100, y: -176, role: "dark", feeling: "映画っぽい", description: "かなり印象的な外の色。重たさやドラマが出ます。" },
      { id: "iv7", offset: 5, quality: "m7", x: -92, y: 234, role: "soft", feeling: "深く柔らかい", description: "暗いまま、少し滑らかに進めます。" },
      { id: "III7", offset: 3, quality: "7", x: 96, y: 236, role: "push", feeling: "光へ押す", description: "明るい場所からさらに流れを作る通り道です。" },
      { id: "iM7", offset: 0, quality: "mM7", x: -74, y: -246, role: "noir", feeling: "暗い艶", description: "マイナーの家に、少し危うい美しさを足します。", level: 2, weight: 3 },
      { id: "iadd9", offset: 0, quality: "add9", x: 76, y: -250, role: "air", feeling: "影に余白", description: "暗さを残しつつ、メロディが入る余白を作ります。", level: 2, weight: 2 },
      { id: "IIImaj7", offset: 3, quality: "maj7", x: 72, y: 182, role: "open", feeling: "明るく深い", description: "マイナーの中で開ける場所に、透明感を足します。", level: 2, weight: 3 },
      { id: "VImaj7", offset: 8, quality: "maj7", x: -280, y: 168, role: "light", feeling: "遠くに光る", description: "暗い世界の中で、遠くに光が見えるようなコードです。", level: 2, weight: 3 },
      { id: "VII7", offset: 10, quality: "7", x: 274, y: 146, role: "rise", feeling: "荒く上がる", description: "普通のVIIよりロック感と緊張が増します。", level: 2, weight: 2 },
      { id: "V7sus4m", offset: 7, quality: "7sus4", x: 254, y: -122, role: "hold", feeling: "戻る前に止まる", description: "戻りたいのに答えを焦らす、サビ前にも使いやすいコードです。", level: 2, weight: 2 },
      { id: "iiHalf", offset: 2, quality: "m7b5", x: -318, y: 78, role: "jazz", feeling: "細い橋", description: "マイナーの深い定番。V7へ行くと濃く戻れます。", level: 2, weight: 2 },
      { id: "bIImaj7", offset: 1, quality: "maj7", x: -248, y: -204, role: "film", feeling: "別世界の壁", description: "マイナーに強い映画感を足す、かなり濃い外のコードです。", level: 3, weight: 4 },
      { id: "ivM7", offset: 5, quality: "mM7", x: -216, y: -126, role: "noir", feeling: "深い艶", description: "ivをさらに危うく、美しくします。", level: 3, weight: 3 },
      { id: "Vaug", offset: 7, quality: "aug", x: 80, y: -190, role: "warp", feeling: "膨らむ緊張", description: "戻る直前に、景色が歪むような緊張を作ります。", level: 3, weight: 3 },
      { id: "VIIadd9", offset: 10, quality: "add9", x: 314, y: 50, role: "air", feeling: "上昇に余白", description: "上昇感を保ちながら、少し透明な響きにします。", level: 3, weight: 3 },
      { id: "i6", offset: 0, quality: "6", x: 46, y: 44, role: "old", feeling: "少し懐かしい", description: "暗さを少しだけ柔らかく終わらせる、不思議な着地点です。", level: 3, weight: 2 },
      { id: "i9", offset: 0, quality: "m9", x: 74, y: -298, role: "night", feeling: "暗い余白", description: "切なさを保ったまま、声が入る空間を広げます。", level: 2, weight: 3 },
      { id: "iv9", offset: 5, quality: "m9", x: -250, y: -66, role: "deep", feeling: "深い夜", description: "ivの暗さに余白が足され、サビ前にも使いやすくなります。", level: 2, weight: 3 },
      { id: "V7b9", offset: 7, quality: "dom7b9", x: 210, y: -196, role: "sting", feeling: "刺さって戻る", description: "戻る力に強い濁りを足して、着地をくっきり見せます。", level: 2, weight: 3 },
      { id: "VIadd9", offset: 8, quality: "add9", x: -346, y: 174, role: "glow", feeling: "淡く光る", description: "暗いキーの中で光るコードを、少し現代的にします。", level: 2, weight: 2 },
      { id: "bVmaj7", offset: 6, quality: "maj7", x: -360, y: -34, role: "alien", feeling: "遠い星", description: "ほとんど別世界のコード。短く置くと強烈な印象になります。", level: 3, weight: 4 },
      { id: "sharpIVdim7m", offset: 6, quality: "dim7", x: 336, y: -30, role: "slide", feeling: "影が滑る", description: "半音移動で次の場所へ吸い込ませる、実験的な通過点です。", level: 3, weight: 3 },
      { id: "bVI13m", offset: 8, quality: "13", x: -300, y: 254, role: "burn", feeling: "暗く跳ねる", description: "マイナーの外側で踊る、濃くて少し危ないコードです。", level: 3, weight: 4 },
      { id: "i11", offset: 0, quality: "m11", x: -34, y: -300, role: "space", feeling: "暗い空間", description: "マイナーの中心を広い空間に変える、Neo Soul寄りの家です。", level: 4, weight: 4 },
      { id: "iv11", offset: 5, quality: "m11", x: -354, y: -106, role: "deep", feeling: "沈むグルーヴ", description: "暗く広いサブドミナント。カッティングにも合います。", level: 4, weight: 4 },
      { id: "V7altm", offset: 7, quality: "dom7alt", x: 372, y: -116, role: "alt", feeling: "濁って帰る", description: "戻る直前を濁らせ、iの暗さを強く美しくします。", level: 4, weight: 4 },
      { id: "V13m", offset: 7, quality: "13", x: 370, y: -18, role: "funk", feeling: "跳ねて帰る", description: "暗いキーの中でも踊れる、ファンク寄りのドミナントです。", level: 4, weight: 4 },
      { id: "bII13m", offset: 1, quality: "13", x: -326, y: -238, role: "sub", feeling: "裏口の熱", description: "半音上から戻る、濃くて踊れる裏口です。", level: 4, weight: 4 },
      { id: "IIImaj9m", offset: 3, quality: "maj9", x: 92, y: 220, role: "open", feeling: "開けた夜", description: "マイナーから見える明るい場所を、より深く広げます。", level: 4, weight: 4 },
      { id: "VImaj9m", offset: 8, quality: "maj9", x: -382, y: 196, role: "light", feeling: "遠い光", description: "VImaj7よりさらに空気があり、メロウな展開に向きます。", level: 4, weight: 4 },
      { id: "VII13m", offset: 10, quality: "13", x: 328, y: 150, role: "rise", feeling: "跳ねて上がる", description: "上昇感をファンク寄りに変えるコードです。", level: 4, weight: 3 },
    ],
    edges: [
      ["i", "iv", "natural", "暗さを保ちながら深く進みます。"],
      ["i", "V7", "tension", "戻る力を作ってドラマが出ます。"],
      ["i", "VI", "wistful", "暗い場所から少し光のある場所へ行けます。"],
      ["i", "VII", "lift", "上昇感が出ます。"],
      ["i", "III", "lift", "同じ世界の中で明るく開きます。"],
      ["i", "bII", "surprise", "映画っぽく、強い色を足せます。"],
      ["i7", "iv7", "natural", "柔らかいまま流れます。"],
      ["i7", "VI", "wistful", "切ない余韻を残して光ります。"],
      ["iv", "V7", "tension", "家へ戻るための緊張を作ります。"],
      ["iv", "i", "natural", "深くなったあと、暗い家へ戻ります。"],
      ["iv", "VII", "lift", "暗さから上昇感へ切り替わります。"],
      ["iv7", "V7", "tension", "柔らかい暗さから強い緊張へ進みます。"],
      ["V7", "i", "natural", "強い緊張から家へ戻ります。"],
      ["V7", "VI", "surprise", "戻りそうで少し明るい場所へ逃がします。"],
      ["v", "i", "natural", "強すぎず自然に戻れます。"],
      ["v", "VI", "wistful", "静かに切なさを広げます。"],
      ["VI", "VII", "lift", "上へ持ち上がる定番の動きです。"],
      ["VI", "V7", "tension", "明るさから緊張へ落とせます。"],
      ["VI", "iv", "wistful", "光から暗い深さへ戻ります。"],
      ["VII", "III", "lift", "大きく開く、気持ちいい流れです。"],
      ["VII", "i", "natural", "勢いを保って家へ戻れます。"],
      ["III", "VI", "natural", "明るく開いたあと、少し切ない方へ流れます。"],
      ["III", "VII", "lift", "さらに上へ進む感じが出ます。"],
      ["ii", "V7", "tension", "短い橋から強い戻りへつながります。"],
      ["bII", "i", "surprise", "外の色から一気に暗い家へ戻れます。"],
      ["bII", "V7", "tension", "かなりドラマチックに引っ張れます。"],
      ["III7", "VI", "tension", "VIへ強く入りたいときに使えます。"],
      ["i", "iM7", "chromatic", "同じ家の中で、ベースや響きだけが少し上品に動きます。", 2],
      ["iM7", "i7", "chromatic", "暗い艶から柔らかい暗さへ落ちます。メロディが乗せやすい動きです。", 2],
      ["i", "iadd9", "dream", "暗いまま余白を足します。Aメロの入口に向いています。", 2],
      ["iadd9", "VImaj7", "wistful", "暗い余白から、遠い光へ開きます。", 2],
      ["i7", "VImaj7", "wistful", "切ない余韻を保ったまま、少し明るい景色へ行けます。", 2],
      ["VImaj7", "VII7", "lift", "暗い世界から強めに上がり、次の展開を作れます。", 2],
      ["VImaj7", "V7sus4m", "tension", "光を一度止めて、戻る前の待ち時間を作ります。", 2],
      ["VII7", "IIImaj7", "lift", "荒く上がって、透明に開く動きです。", 2],
      ["IIImaj7", "VImaj7", "natural", "明るく開いた場所から、切ない光へ流れます。", 2],
      ["iv7", "V7sus4m", "tension", "暗く柔らかい場所から、答えを焦らす緊張へ進みます。", 2],
      ["V7sus4m", "V7", "tension", "止めていた答えをほどき、家へ戻る力を強くします。", 2],
      ["iiHalf", "V7", "tension", "細い橋から強く戻る、マイナーを濃くする定番です。", 2],
      ["IIImaj7", "iiHalf", "surprise", "明るく開いたあと、急に細い橋へ落とします。", 3],
      ["bIImaj7", "i", "surprise", "半音上の別世界から、暗い家へ一気に戻ります。", 3],
      ["bIImaj7", "V7sus4m", "tension", "映画っぽい濃さを、戻る前の待ち感へ変えます。", 3],
      ["iv", "ivM7", "chromatic", "深いivに艶を足して、次の一手を読ませにくくします。", 3],
      ["ivM7", "Vaug", "surprise", "暗い艶から、歪んだ緊張へワープします。", 3],
      ["Vaug", "i", "tension", "膨らんだ緊張が、暗い家へ吸い込まれます。", 3],
      ["VIIadd9", "IIImaj7", "dream", "上昇感に余白を作ってから、透明に開きます。", 3],
      ["VII", "VIIadd9", "dream", "普通のVIIを浮かせて、次のコードに期待を残します。", 3],
      ["i7", "i6", "surprise", "暗い家を、少し懐かしい着地点に変えます。", 3],
      ["i6", "iv7", "wistful", "懐かしい暗さから、もう一度深い場所へ入れます。", 3],
      ["i", "i9", "dream", "暗い家を少し広げ、声が入る余白を作ります。", 2],
      ["i9", "iv9", "wistful", "広がった暗さから、さらに深い夜へ入ります。", 2],
      ["iv9", "V7b9", "tension", "深い夜から、刺さる緊張へ進めます。", 2],
      ["V7b9", "i9", "tension", "濃い緊張が、広い暗い家へ戻ります。", 2],
      ["VI", "VIadd9", "dream", "光のあるコードに、現代的な余白を足します。", 2],
      ["VIadd9", "V7sus4m", "tension", "淡い光を保留の緊張へ変えます。", 2],
      ["iM7", "bVmaj7", "surprise", "暗い艶から、ほとんど別世界へ飛びます。", 3],
      ["bVmaj7", "ivM7", "chromatic", "遠い星のようなコードを、深い艶へ引き戻します。", 3],
      ["V7b9", "sharpIVdim7m", "chromatic", "刺さる緊張を半音で滑らせ、帰り道をぼかします。", 3],
      ["sharpIVdim7m", "Vaug", "altered", "滑った影が、膨らむ緊張へ変わります。", 3],
      ["VImaj7", "bVI13m", "altered", "遠い光を、暗く跳ねる外側のコードへ歪ませます。", 3],
      ["bVI13m", "V7b9", "chromatic", "暗く跳ねた場所から、半音で刺さる緊張へ落とします。", 3],
      ["i", "i11", "dream", "暗い家をNeo Soul寄りの広い空間に変えます。", 4],
      ["i11", "iv11", "groove", "広い暗さを保ったまま、沈むグルーヴへ進みます。", 4],
      ["iv11", "V13m", "groove", "暗く広いivから、踊れるドミナントへ入ります。", 4],
      ["V13m", "i11", "groove", "跳ねる緊張が、広い暗い家へ戻ります。", 4],
      ["V13m", "V7altm", "altered", "踊れる緊張を、さらに濁らせてから戻せます。", 4],
      ["V7altm", "i11", "altered", "強く濁ったあと、i11の広さが美しく見えます。", 4],
      ["i11", "VImaj9m", "wistful", "広い暗い家から、遠い光へ開きます。", 4],
      ["VImaj9m", "VII13m", "groove", "遠い光から、跳ねる上昇へつなぎます。", 4],
      ["VII13m", "IIImaj9m", "groove", "跳ねて上がり、開けた夜へ着地します。", 4],
      ["IIImaj9m", "iv11", "wistful", "開けた夜から、深いグルーヴへ戻ります。", 4],
      ["bII13m", "i11", "chromatic", "半音上の濃い裏口から、広い暗い家へ戻ります。", 4],
      ["iv11", "bII13m", "altered", "深いivから、遠い裏口へ飛ぶ強いリハモです。", 4],
    ],
  },
};

const state = {
  key: "C",
  mode: "major",
  adventure: "deep",
  selectedId: "I",
  selectionHistory: [],
  instrument: "guitar",
  detailTab: "suggestions",
  progression: [],
  selectedVoicing: 0,
  ideas: [],
  notes: [],
};

const el = {
  keySelect: document.querySelector("#keySelect"),
  modeButtons: [...document.querySelectorAll(".segment")],
  adventureButtons: [...document.querySelectorAll(".adventure-segment")],
  currentChord: document.querySelector("#currentChord"),
  previousChordButton: document.querySelector("#previousChordButton"),
  detailTabButtons: [...document.querySelectorAll(".detail-tab")],
  detailPanels: [...document.querySelectorAll("[data-detail-panel]")],
  instrumentButtons: [...document.querySelectorAll(".instrument-tab")],
  selectedTitle: document.querySelector("#selectedTitle"),
  selectedFunction: document.querySelector("#selectedFunction"),
  selectedDescription: document.querySelector("#selectedDescription"),
  orbitLayer: document.querySelector("#orbitLayer"),
  edgeLayer: document.querySelector("#edgeLayer"),
  nodeLayer: document.querySelector("#nodeLayer"),
  suggestions: document.querySelector("#suggestions"),
  voicingTabs: document.querySelector("#voicingTabs"),
  chordDiagram: document.querySelector("#chordDiagram"),
  voicingCount: document.querySelector("#voicingCount"),
  progressionStrip: document.querySelector("#progressionStrip"),
  addCurrentButton: document.querySelector("#addCurrentButton"),
  clearPathButton: document.querySelector("#clearPathButton"),
  downloadMidiButton: document.querySelector("#downloadMidiButton"),
  saveIdeaButton: document.querySelector("#saveIdeaButton"),
  ideaMemo: document.querySelector("#ideaMemo"),
  savedIdeas: document.querySelector("#savedIdeas"),
  clearIdeasButton: document.querySelector("#clearIdeasButton"),
  mapNoteInput: document.querySelector("#mapNoteInput"),
  addMapNoteButton: document.querySelector("#addMapNoteButton"),
  mapNotes: document.querySelector("#mapNotes"),
  mapStage: document.querySelector("#mapStage"),
};

function mod(value, base = 12) {
  return ((value % base) + base) % base;
}

function noteName(value) {
  return NOTE_LABELS[mod(value)];
}

function rootValue() {
  return NOTE_VALUES[state.key];
}

function chordName(node) {
  const base = `${noteName(rootValue() + node.offset)}${QUALITY_LABELS[node.quality]}`;
  return node.slashOffset === undefined ? base : `${base}/${noteName(rootValue() + node.slashOffset)}`;
}

function mapData() {
  return MAPS[state.mode];
}

function selectedNode() {
  return visibleNodeById(state.selectedId) || visibleNodes()[0] || mapData().nodes[0];
}

function nodeById(id) {
  return mapData().nodes.find((node) => node.id === id);
}

function currentAdventure() {
  return ADVENTURES[state.adventure] || ADVENTURES.deep;
}

function nodeLevel(node) {
  return node.level || 1;
}

function edgeLevel(edge) {
  return edge[4] || 1;
}

function visibleNodes() {
  const levels = currentAdventure().levels;
  return mapData().nodes.filter((node) => levels.includes(nodeLevel(node)));
}

function visibleNodeById(id) {
  return visibleNodes().find((node) => node.id === id);
}

function visibleEdges() {
  const ids = new Set(visibleNodes().map((node) => node.id));
  const levels = currentAdventure().levels;
  return mapData().edges.filter((edge) => {
    const [from, to] = edge;
    return ids.has(from) && ids.has(to) && levels.includes(edgeLevel(edge));
  });
}

function outgoingEdges(id = state.selectedId) {
  return visibleEdges().filter(([from]) => from === id);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
  });
}

function init() {
  restore();
  document.body.classList.toggle("is-ios", IS_IOS);
  if (IS_IOS) el.downloadMidiButton.hidden = true;
  renderKeySelect();
  render();
  bindEvents();
}

function bindEvents() {
  el.keySelect.addEventListener("change", () => {
    state.key = el.keySelect.value;
    state.selectionHistory = [];
    state.progression = [];
    state.selectedVoicing = 0;
    render();
    persist();
  });

  el.modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.mode = button.dataset.mode;
      state.selectedId = mapData().centerRole;
      state.selectionHistory = [];
      state.progression = [];
      state.selectedVoicing = 0;
      render();
      persist();
    });
  });

  el.adventureButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.adventure = button.dataset.adventure;
      if (!visibleNodeById(state.selectedId)) state.selectedId = mapData().centerRole;
      state.selectionHistory = [];
      state.selectedVoicing = 0;
      render();
      persist();
    });
  });

  el.addCurrentButton.addEventListener("click", () => {
    addToProgression(selectedNode());
  });

  el.previousChordButton.addEventListener("click", () => {
    selectPreviousChord();
  });

  el.instrumentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.instrument = button.dataset.instrument;
      state.selectedVoicing = 0;
      render();
      persist();
    });
  });

  el.detailTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.detailTab = button.dataset.detailTab;
      renderDetailTabs();
      persist();
    });
  });

  el.clearPathButton.addEventListener("click", () => {
    state.progression = [];
    el.ideaMemo.value = "";
    renderProgression();
    persist();
  });

  el.downloadMidiButton.addEventListener("click", downloadProgressionMidi);

  el.saveIdeaButton.addEventListener("click", () => {
    if (!state.progression.length) return;
    state.ideas.unshift({
      id: crypto.randomUUID(),
      key: state.key,
      mode: state.mode,
      adventure: state.adventure,
      instrument: state.instrument,
      chords: [...state.progression],
      memo: el.ideaMemo.value.trim(),
      createdAt: new Date().toISOString(),
    });
    state.ideas = state.ideas.slice(0, 18);
    el.ideaMemo.value = "";
    state.progression = [];
    renderProgression();
    renderSavedIdeas();
    persist();
  });

  el.clearIdeasButton.addEventListener("click", () => {
    state.ideas = [];
    renderSavedIdeas();
    persist();
  });

  el.addMapNoteButton.addEventListener("click", addMapNote);
  el.mapNoteInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addMapNote();
  });

  window.addEventListener("resize", () => {
    renderMapNotes();
  });
}

function renderKeySelect() {
  el.keySelect.innerHTML = KEYS.map((key) => `<option value="${key}">${key}</option>`).join("");
  el.keySelect.value = state.key;
}

function render() {
  if (!visibleNodeById(state.selectedId)) state.selectedId = mapData().centerRole;
  el.keySelect.value = state.key;
  el.modeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === state.mode);
  });
  el.adventureButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.adventure === state.adventure);
  });
  el.instrumentButtons.forEach((button) => {
    const isActive = button.dataset.instrument === state.instrument;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  renderDetailTabs();
  renderHistoryButton();
  renderMap();
  renderDetails();
  renderSuggestions();
  renderVoicings();
  renderProgression();
  renderSavedIdeas();
  renderMapNotes();
}

function renderHistoryButton() {
  const previousId = previousVisibleHistoryId();
  el.previousChordButton.disabled = !previousId;
  if (!previousId) {
    el.previousChordButton.textContent = "← 前のコード";
    return;
  }
  const previousNode = nodeById(previousId);
  el.previousChordButton.textContent = `← ${chordName(previousNode)}`;
}

function renderDetailTabs() {
  if (!["suggestions", "voicings"].includes(state.detailTab)) state.detailTab = "suggestions";
  el.detailTabButtons.forEach((button) => {
    const isActive = button.dataset.detailTab === state.detailTab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  el.detailPanels.forEach((panel) => {
    const isActive = panel.dataset.detailPanel === state.detailTab;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

function previousVisibleHistoryId() {
  for (let index = state.selectionHistory.length - 1; index >= 0; index -= 1) {
    const id = state.selectionHistory[index];
    if (visibleNodeById(id)) return id;
  }
  return null;
}

function selectChord(nodeId, options = {}) {
  if (!visibleNodeById(nodeId) || nodeId === state.selectedId) return;
  if (options.recordHistory !== false) {
    state.selectionHistory.push(state.selectedId);
    state.selectionHistory = state.selectionHistory.slice(-24);
  }
  state.selectedId = nodeId;
  state.selectedVoicing = 0;
  render();
  persist();
}

function selectPreviousChord() {
  while (state.selectionHistory.length) {
    const previousId = state.selectionHistory.pop();
    if (visibleNodeById(previousId)) {
      state.selectedId = previousId;
      state.selectedVoicing = 0;
      render();
      persist();
      return;
    }
  }
  render();
  persist();
}

function renderMap() {
  const current = selectedNode();
  const activeEdges = outgoingEdges();
  const suggestionIds = new Set(activeEdges.map(([, to]) => to));
  const positions = layoutPositions(suggestionIds);
  el.currentChord.textContent = chordName(current);
  el.orbitLayer.innerHTML = renderOrbits();
  el.edgeLayer.innerHTML = renderEdges(suggestionIds, positions);
  el.nodeLayer.innerHTML = visibleNodes()
    .slice()
    .sort((a, b) => renderPriority(a, suggestionIds) - renderPriority(b, suggestionIds))
    .map((node) => {
      const name = chordName(node);
      const point = positions.get(node.id) || { x: node.x, y: node.y };
      const isSelected = node.id === state.selectedId;
      const isSuggestion = suggestionIds.has(node.id);
      const muted = !isSelected && suggestionIds.size > 0 && !isSuggestion;
      const radius = nodeRadius(node, { isSelected, isSuggestion, muted });
      const auraRadius = radius + 8 + nodeLevel(node) * 2;
      const floatDelay = (hashNumber(node.id) % 900) * -1;
      return `
        <g class="node node-button quality-${node.quality} ${isSelected ? "is-selected" : ""} ${isSuggestion ? "is-suggestion" : ""} ${muted ? "is-muted" : ""}" transform="translate(${point.x} ${point.y})" data-node-id="${node.id}" role="button" tabindex="0" aria-label="${name}を選ぶ">
          <g class="node-content" style="--float-delay:${floatDelay}ms">
            ${nodeLevel(node) > 1 ? `<circle class="aura" r="${auraRadius}"></circle>` : ""}
            <circle class="core" r="${radius}"></circle>
            <text y="-2" style="font-size:${fontSizeForChord(name)}px">${escapeHTML(name)}</text>
            <text class="role" y="22">${escapeHTML(node.role)}</text>
          </g>
        </g>
      `;
    })
    .join("");

  el.nodeLayer.querySelectorAll(".node-button").forEach((button) => {
    button.addEventListener("click", () => {
      selectChord(button.dataset.nodeId);
    });
    button.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      selectChord(button.dataset.nodeId);
    });
  });
}

function renderPriority(node, suggestionIds) {
  if (node.id === state.selectedId) return 3;
  if (suggestionIds.has(node.id)) return 2;
  return 1;
}

function layoutPositions(suggestionIds = new Set()) {
  const nodes = visibleNodes();
  const bucketCounts = new Map();
  const positions = new Map(
    nodes.map((node) => {
      const key = semanticBucket(node);
      const order = bucketCounts.get(key) || 0;
      bucketCounts.set(key, order + 1);
      return [node.id, semanticPosition(node, order)];
    })
  );
  separateSuggestionPositions(positions, suggestionIds);
  softenGlobalOverlaps(positions, suggestionIds);
  return positions;
}

function separateSuggestionPositions(positions, suggestionIds) {
  const ids = [...suggestionIds].filter((id) => positions.has(id));
  if (!ids.length) return;
  const selectedPoint = positions.get(state.selectedId) || { x: 0, y: 0 };
  const minDistance = ids.length > 8 ? 72 : 84;
  for (let pass = 0; pass < 7; pass += 1) {
    for (let i = 0; i < ids.length; i += 1) {
      for (let j = i + 1; j < ids.length; j += 1) {
        pushApart(positions, ids[i], ids[j], minDistance);
      }
      pushAwayFromPoint(positions, ids[i], selectedPoint, minDistance + 12);
      keepInsideView(positions, ids[i], 386, 288);
    }
  }
}

function softenGlobalOverlaps(positions, suggestionIds) {
  const nodes = visibleNodes();
  const ids = nodes.map((node) => node.id).filter((id) => positions.has(id));
  for (let pass = 0; pass < 3; pass += 1) {
    for (let i = 0; i < ids.length; i += 1) {
      for (let j = i + 1; j < ids.length; j += 1) {
        const a = ids[i];
        const b = ids[j];
        const priority = suggestionIds.has(a) || suggestionIds.has(b) || a === state.selectedId || b === state.selectedId;
        pushApart(positions, a, b, priority ? 66 : 47, priority ? 0.72 : 0.32);
      }
      keepInsideView(positions, ids[i], 394, 292);
    }
  }
}

function pushApart(positions, firstId, secondId, minDistance, strength = 1) {
  const first = positions.get(firstId);
  const second = positions.get(secondId);
  if (!first || !second) return;
  const dx = second.x - first.x;
  const dy = second.y - first.y;
  const distance = Math.max(Math.hypot(dx, dy), 0.001);
  if (distance >= minDistance) return;
  const move = ((minDistance - distance) / 2) * strength;
  const nx = dx / distance;
  const ny = dy / distance;
  if (firstId !== state.selectedId) {
    first.x -= nx * move;
    first.y -= ny * move;
  }
  if (secondId !== state.selectedId) {
    second.x += nx * move;
    second.y += ny * move;
  }
}

function pushAwayFromPoint(positions, id, point, minDistance) {
  const current = positions.get(id);
  if (!current) return;
  const dx = current.x - point.x;
  const dy = current.y - point.y;
  const distance = Math.max(Math.hypot(dx, dy), 0.001);
  if (distance >= minDistance) return;
  const move = minDistance - distance;
  current.x += (dx / distance) * move;
  current.y += (dy / distance) * move;
}

function keepInsideView(positions, id, maxX, maxY) {
  const point = positions.get(id);
  if (!point) return;
  point.x = Math.max(-maxX, Math.min(maxX, point.x));
  point.y = Math.max(-maxY, Math.min(maxY, point.y));
}

function semanticPosition(node, order) {
  if (node.id === mapData().centerRole) return { x: 0, y: 0 };
  const vector = semanticVector(node);
  const angle = Math.atan2(vector.y, vector.x) + jitterFor(node.id, 16);
  const radius = semanticRadius(node) + radialJitterFor(node.id) + orderOffset(order);
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

function semanticRadius(node) {
  if (homeLike(node)) return nodeLevel(node) === 4 ? 168 : nodeLevel(node) === 3 ? 145 : 112;
  return { 1: 150, 2: 220, 3: 282, 4: 288 }[nodeLevel(node)] || 220;
}

function semanticBucket(node) {
  const vector = semanticVector(node);
  return `${Math.round(vector.x * 10)}:${Math.round(vector.y * 10)}:${nodeLevel(node)}`;
}

function semanticVector(node) {
  const id = node.id.toLowerCase();
  const role = node.role || "";
  if (homeLike(node)) return { x: 0.04, y: -0.72 };
  if (roleIncludes(role, ["pull", "go", "hold", "funk", "alt", "sting"]) || id.includes("v7") || id.includes("v13") || id.includes("vaug")) {
    return { x: 1, y: -0.08 };
  }
  if (roleIncludes(role, ["wide", "borrow", "back", "film", "sub", "alien"]) || id.includes("bii") || id.includes("biii") || id.includes("bvi") || id.includes("bvii") || id.includes("iv")) {
    return { x: -1, y: id.includes("bii") || role === "film" ? -0.38 : 0.1 };
  }
  if (roleIncludes(role, ["bridge", "slide", "jazz"]) || id.includes("ii") || id.includes("vii") || id.includes("sharp")) {
    return { x: 0.42, y: 0.62 };
  }
  if (id.includes("iii")) return { x: 0.36, y: 0.88 };
  if (id.includes("vi")) return { x: -0.12, y: 1 };
  if (roleIncludes(role, ["spark", "push", "chain", "turn", "warp", "burn"])) {
    return { x: 0.76, y: 0.54 };
  }
  if (roleIncludes(role, ["deep", "night", "noir", "space", "old", "low"])) {
    return { x: -0.18, y: 1 };
  }
  if (roleIncludes(role, ["light", "glow", "open", "rise"])) {
    return { x: -0.35, y: -0.76 };
  }
  return { x: 0.58, y: 0.42 };
}

function homeLike(node) {
  const id = node.id.toLowerCase();
  if (state.mode === "major") {
    return id === "i" || id.startsWith("imaj") || id.startsWith("iadd") || id.startsWith("i6");
  }
  return id === "i" || id === "i7" || id.startsWith("im") || id.startsWith("iadd") || id.startsWith("i6") || id.startsWith("i9") || id.startsWith("i11");
}

function roleIncludes(role, values) {
  return values.includes(role);
}

function jitterFor(id, degrees) {
  return ((hashNumber(id) % (degrees * 2 + 1)) - degrees) * (Math.PI / 180);
}

function radialJitterFor(id) {
  return (hashNumber(`${id}:r`) % 21) - 10;
}

function orderOffset(order) {
  if (order === 0) return 0;
  const direction = order % 2 === 0 ? -1 : 1;
  return direction * Math.ceil(order / 2) * 24;
}

function hashNumber(value) {
  return [...value].reduce((sum, char) => sum + char.charCodeAt(0) * 17, 0);
}

function nodeRadius(node, stateFlags = {}) {
  const base = 25 + Math.min(nodeLevel(node), 3) * 3 + (node.weight || 0);
  if (stateFlags.isSelected) return base + 8;
  if (stateFlags.isSuggestion) return base + 5;
  if (stateFlags.muted) return Math.max(18, base - 8);
  return base;
}

function fontSizeForChord(name) {
  if (name.length >= 9) return 13;
  if (name.length >= 7) return 15;
  if (name.length >= 6) return 16;
  if (name.length >= 5) return 18;
  return 21;
}

function renderOrbits() {
  return `
    <defs>
      <marker id="arrowMuted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(222,236,224,.28)"></path>
      </marker>
      <marker id="arrowBright" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#82dd55"></path>
      </marker>
      <path id="guideArcTop" d="M -242 -210 A 320 320 0 0 1 242 -210"></path>
      <path id="guideArcRight" d="M 312 -112 A 320 320 0 0 1 312 112"></path>
      <path id="guideArcBottom" d="M 242 210 A 320 320 0 0 1 -242 210"></path>
      <path id="guideArcLeft" d="M -312 112 A 320 320 0 0 1 -312 -112"></path>
      <path id="guideRingClassic" d="M -86 -86 A 122 122 0 0 1 86 -86"></path>
      <path id="guideRingDeep" d="M -165 -165 A 234 234 0 0 1 165 -165"></path>
      <path id="guideRingWild" d="M -208 -208 A 294 294 0 0 1 208 -208"></path>
    </defs>
    <line class="guide-axis" x1="-390" y1="0" x2="390" y2="0"></line>
    <line class="guide-axis" x1="0" y1="-290" x2="0" y2="290"></line>
    <circle class="guide-ring" cx="0" cy="0" r="120"></circle>
    <circle class="guide-ring deep" cx="0" cy="0" r="230"></circle>
    <circle class="guide-ring wild" cx="0" cy="0" r="292"></circle>
    <text class="guide-label arc"><textPath href="#guideArcTop" startOffset="50%">BRIGHT / AIR</textPath></text>
    <text class="guide-label arc"><textPath href="#guideArcRight" startOffset="50%">TENSION / RETURN</textPath></text>
    <text class="guide-label arc"><textPath href="#guideArcBottom" startOffset="50%">DARK / DEEP</textPath></text>
    <text class="guide-label arc"><textPath href="#guideArcLeft" startOffset="50%">EXPAND / BORROW</textPath></text>
    <text class="guide-label ring"><textPath href="#guideRingClassic" startOffset="50%">CLASSIC</textPath></text>
    <text class="guide-label ring"><textPath href="#guideRingDeep" startOffset="50%">DEEP</textPath></text>
    <text class="guide-label ring"><textPath href="#guideRingWild" startOffset="50%">WILD / JAZZ</textPath></text>
    <text class="guide-label center" x="0" y="-18">HOME</text>
  `;
}

function renderEdges(suggestionIds, positions) {
  const selectedEdges = new Set(outgoingEdges().map(([from, to]) => `${from}-${to}`));
  return visibleEdges()
    .map(([from, to, mood]) => {
      const source = nodeById(from);
      const target = nodeById(to);
      if (!source || !target) return "";
      const key = `${from}-${to}`;
      const related = selectedEdges.has(key);
      const muted = suggestionIds.size > 0 && !related;
      const sourcePoint = positions.get(from) || source;
      const targetPoint = positions.get(to) || target;
      const path = curvedPath(sourcePoint, targetPoint);
      return `<path class="edge ${mood} ${related ? "is-related" : ""} ${muted ? "is-muted" : ""}" d="${path}"></path>`;
    })
    .join("");
}

function curvedPath(source, target) {
  const mx = (source.x + target.x) / 2;
  const my = (source.y + target.y) / 2;
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const length = Math.max(Math.hypot(dx, dy), 1);
  const bend = Math.min(62, length * 0.22);
  const cx = mx - (dy / length) * bend;
  const cy = my + (dx / length) * bend;
  return `M ${source.x} ${source.y} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${target.x} ${target.y}`;
}

function renderDetails() {
  const node = selectedNode();
  el.selectedTitle.textContent = chordName(node);
  el.selectedFunction.textContent = node.feeling;
  el.selectedDescription.textContent = `${node.description} ${QUALITY_DESCRIPTIONS[node.quality]}`;
}

function renderSuggestions() {
  const edges = outgoingEdges();
  if (!edges.length) {
    el.suggestions.innerHTML = `<p class="saved-empty">ここからの候補はまだ入れていません。地図を育てる余地ありです。</p>`;
    return;
  }

  el.suggestions.innerHTML = edges
    .map((edge) => {
      const [, to, mood, reason] = edge;
      const node = nodeById(to);
      const name = chordName(node);
      const moodData = MOODS[mood];
      const adventure = adventureByLevel(edgeLevel(edge));
      return `
        <article class="suggestion">
          <div class="suggestion-head">
            <h3>${escapeHTML(name)}</h3>
            <div class="pill-row">
              <span class="mood-pill" style="background:${moodData.color}">${moodData.label}</span>
              <span class="level-pill">${adventure.label}</span>
            </div>
          </div>
          <p>${escapeHTML(reason)}</p>
          <div class="suggestion-actions">
            <button type="button" data-select="${node.id}">このコードへ移動</button>
            <button type="button" data-add="${node.id}">進行に追加</button>
          </div>
        </article>
      `;
    })
    .join("");

  el.suggestions.querySelectorAll("[data-select]").forEach((button) => {
    button.addEventListener("click", () => {
      selectChord(button.dataset.select);
    });
  });

  el.suggestions.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", () => {
      const node = nodeById(button.dataset.add);
      addToProgression(node);
    });
  });
}

function adventureByLevel(level) {
  if (level === 4) return ADVENTURES.jazz;
  if (level === 3) return ADVENTURES.wild;
  if (level === 2) return ADVENTURES.deep;
  return ADVENTURES.classic;
}

function addToProgression(node) {
  if (!node) return;
  state.progression.push(chordName(node));
  renderProgression();
  persist();
}

function renderProgression() {
  el.downloadMidiButton.hidden = IS_IOS;
  el.downloadMidiButton.disabled = IS_IOS || !state.progression.length;
  if (!state.progression.length) {
    el.progressionStrip.innerHTML = `<span class="saved-empty">コードを追加すると、ここに進行が並びます。</span>`;
    return;
  }

  el.progressionStrip.innerHTML = state.progression
    .map((name, index) => {
      const arrow = index === state.progression.length - 1 ? "" : "<span>→</span>";
      return `
        <span class="path-chip">
          <strong>${escapeHTML(name)}</strong>
          <button type="button" data-remove-index="${index}" aria-label="${name}を外す">×</button>
        </span>
        ${arrow}
      `;
    })
    .join("");

  el.progressionStrip.querySelectorAll("[data-remove-index]").forEach((button) => {
    button.addEventListener("click", () => {
      state.progression.splice(Number(button.dataset.removeIndex), 1);
      renderProgression();
      persist();
    });
  });
}

function downloadProgressionMidi() {
  if (!state.progression.length) return;
  const bytes = buildProgressionMidi(state.progression);
  triggerMidiDownload(bytes, midiFileName());
}

function triggerMidiDownload(bytes, fileName) {
  const blob = new Blob([new Uint8Array(bytes)], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 3000);
}

function midiFileName() {
  const modeLabel = state.mode === "major" ? "major" : "minor";
  const key = state.key.replace("#", "sharp");
  return `chord-map-${key}-${modeLabel}-${state.progression.length}bars.mid`;
}

function buildProgressionMidi(chords) {
  const trackName = asciiBytes("Chord Map Notebook");
  const track = [
    ...midiVarLen(0),
    0xff,
    0x03,
    trackName.length,
    ...trackName,
    ...midiVarLen(0),
    0xff,
    0x51,
    0x03,
    0x07,
    0xa1,
    0x20,
    ...midiVarLen(0),
    0xff,
    0x58,
    0x04,
    0x04,
    0x02,
    0x18,
    0x08,
    ...midiProgramChange(0, 4),
  ];

  chords.forEach((name) => {
    const notes = midiNotesForChord(name);
    notes.forEach((note, index) => {
      track.push(...midiVarLen(0), 0x90, note, index === 0 ? 82 : 72);
    });
    notes.forEach((note, index) => {
      track.push(...midiVarLen(index === 0 ? MIDI_WHOLE_NOTE_TICKS : 0), 0x80, note, 0x40);
    });
  });

  track.push(...midiVarLen(0), 0xff, 0x2f, 0x00);

  return [
    ...asciiBytes("MThd"),
    ...uint32Bytes(6),
    ...uint16Bytes(0),
    ...uint16Bytes(1),
    ...uint16Bytes(MIDI_PPQ),
    ...asciiBytes("MTrk"),
    ...uint32Bytes(track.length),
    ...track,
  ];
}

function midiNotesForChord(name) {
  const parsed = parseChordName(name);
  const rootNote = midiRootNote(parsed.root);
  const chordTones = intervalsForQuality(parsed.quality).map((interval) => rootNote + midiIntervalPlacement(interval));
  const unique = [...new Set(chordTones)].sort((a, b) => a - b);
  if (parsed.bass !== null) {
    const bass = 36 + parsed.bass;
    return [bass, ...unique.filter((note) => mod(note) !== parsed.bass)].slice(0, 8);
  }
  return [36 + parsed.root, ...unique].slice(0, 8);
}

function midiRootNote(root) {
  const note = 60 + root;
  return note > 66 ? note - 12 : note;
}

function midiIntervalPlacement(interval) {
  const normalized = mod(interval);
  if (normalized === 1 || normalized === 2) return normalized + 12;
  return normalized;
}

function parseChordName(name) {
  const roots = NOTE_LABELS.slice().sort((a, b) => b.length - a.length);
  const rootLabel = roots.find((label) => name.startsWith(label));
  if (!rootLabel) return { root: 0, quality: "maj", bass: null };
  const root = NOTE_VALUES[rootLabel];
  let rest = name.slice(rootLabel.length);
  const labels = Object.entries(QUALITY_LABELS)
    .filter(([, label]) => label)
    .sort((a, b) => b[1].length - a[1].length);
  const qualityEntry = labels.find(([, label]) => rest.startsWith(label));
  const quality = qualityEntry ? qualityEntry[0] : "maj";
  if (qualityEntry) rest = rest.slice(qualityEntry[1].length);
  let bass = null;
  if (rest.startsWith("/")) {
    const bassLabel = roots.find((label) => rest.slice(1).startsWith(label));
    if (bassLabel) bass = NOTE_VALUES[bassLabel];
  }
  return { root, quality, bass };
}

function midiProgramChange(channel, program) {
  return [...midiVarLen(0), 0xc0 + channel, program];
}

function midiVarLen(value) {
  let buffer = value & 0x7f;
  const bytes = [];
  while ((value >>= 7)) {
    buffer <<= 8;
    buffer |= (value & 0x7f) | 0x80;
  }
  while (true) {
    bytes.push(buffer & 0xff);
    if (buffer & 0x80) buffer >>= 8;
    else break;
  }
  return bytes;
}

function uint16Bytes(value) {
  return [(value >> 8) & 0xff, value & 0xff];
}

function uint32Bytes(value) {
  return [(value >> 24) & 0xff, (value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff];
}

function asciiBytes(value) {
  return [...value].map((char) => char.charCodeAt(0) & 0xff);
}

function renderVoicings() {
  const node = selectedNode();
  const root = mod(rootValue() + node.offset);
  const voicings = makeInstrumentVoicings(root, node.quality);
  state.selectedVoicing = Math.min(state.selectedVoicing, voicings.length - 1);
  el.voicingCount.textContent = `${voicings.length}種類`;
  el.voicingTabs.innerHTML = voicings
    .map((voicing, index) => {
      return `<button type="button" class="${index === state.selectedVoicing ? "is-active" : ""}" data-voicing-index="${index}">${escapeHTML(voicing.name)}</button>`;
    })
    .join("");

  el.voicingTabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedVoicing = Number(button.dataset.voicingIndex);
      renderVoicings();
      persist();
    });
  });

  const currentVoicing = voicings[state.selectedVoicing];
  el.chordDiagram.innerHTML = renderInstrumentDiagram(currentVoicing, root, node.quality);
}

function makeInstrumentVoicings(root, quality) {
  if (state.instrument === "keyboard") return makeKeyboardVoicings(root, quality);
  if (state.instrument === "bass") return makeBassVoicings(root, quality);
  return makeVoicings(root, quality);
}

function renderInstrumentDiagram(currentVoicing, root, quality) {
  if (state.instrument === "keyboard") {
    return `
      <p class="voicing-note">鍵盤では、構成音とテンションの位置関係を見ます。低音は左手、色は右手に分けてもOKです。</p>
      <div class="diagram-wrap keyboard-wrap">
        ${renderKeyboard(currentVoicing, root)}
        ${renderVoicingMeta(currentVoicing, `音の高さ: ${currentVoicing.notes.map(keyboardNoteLabel).join(" - ")}`)}
      </div>
    `;
  }
  if (state.instrument === "bass") {
    return `
      <p class="voicing-note">ベースでは、全部を鳴らすよりルート・3度・5度・7度・テンションの着地点を探します。</p>
      <div class="diagram-wrap bass-wrap">
        ${renderBassFretboard(currentVoicing, root, quality)}
        ${renderVoicingMeta(currentVoicing, "大丸: 使える音 / 明るい丸: ルート / 小点: 経過音")}
      </div>
    `;
  }
  return `
    <p class="voicing-note">完全な構成音よりも、ギターで使える響き・省略・色を優先しています。</p>
    <div class="diagram-wrap">
      ${renderFretboard(currentVoicing)}
      ${renderVoicingMeta(currentVoicing, `低い弦から: ${currentVoicing.frets.map((fret) => (fret < 0 ? "x" : fret)).join(" - ")}`)}
    </div>
  `;
}

function renderVoicingMeta(voicing, footer) {
  return `
    <p class="diagram-meta">
      <strong>${escapeHTML(voicing.name)}</strong><br>
      ${escapeHTML(voicing.description)}<br>
      ${voicing.intent ? `狙い: ${escapeHTML(voicing.intent)}<br>` : ""}
      ${voicing.omit ? `省略: ${escapeHTML(voicing.omit)}<br>` : ""}
      ${escapeHTML(footer)}
    </p>
  `;
}

function makeKeyboardVoicings(root, quality) {
  const compact = compactIntervals(quality);
  const color = colorIntervals(quality);
  const basic = compact.map((interval) => root + interval);
  const firstInversion = basic.length > 2 ? [...basic.slice(1), basic[0] + 12] : basic;
  const open = openKeyboardIntervals(quality).map((interval) => root + interval);
  const colorOnly = color.map((interval) => root + interval);
  return [
    {
      name: "基本",
      description: "まず響きの骨格を確認する形。ルートから積んで、コードの正体を見ます。",
      notes: basic,
      intent: "構成音の位置をつかむ",
      omit: omittedKeyboardText(quality, basic),
    },
    {
      name: "転回",
      description: "一番下の音を入れ替えて、前後のコードへ滑らかにつなぎやすくします。",
      notes: firstInversion,
      intent: "トップノートやベースの動きを滑らかにする",
      omit: "必要に応じて低いルート",
    },
    {
      name: "広め",
      description: "左手と右手に分けるイメージ。ポップスやバラードで広がりが出ます。",
      notes: open,
      intent: "低音の安定と高音の色を分ける",
      omit: omittedKeyboardText(quality, open),
    },
    {
      name: "色だけ",
      description: "ルートを省き、3度・7度・テンションを中心に鳴らす形。バンド内で特に使いやすい見方です。",
      notes: colorOnly,
      intent: "伴奏の上で色だけを足す",
      omit: "低いルート、厚い5度",
    },
  ];
}

function compactIntervals(quality) {
  const intervals = intervalsForQuality(quality);
  const priority = [0, 3, 4, 5, 6, 7, 10, 11, 1, 2, 9, 8];
  return priority.filter((interval) => intervals.map((value) => mod(value)).includes(interval)).slice(0, 5);
}

function openKeyboardIntervals(quality) {
  const intervals = compactIntervals(quality);
  const root = intervals.includes(0) ? [0] : [];
  const color = intervals.filter((interval) => interval !== 0).map((interval, index) => interval + (index > 1 ? 12 : 0));
  return [...root, ...color].slice(0, 5);
}

function colorIntervals(quality) {
  const intervals = intervalsForQuality(quality);
  const preferred = [3, 4, 5, 10, 11, 1, 2, 9, 8, 6, 7];
  const colors = preferred.filter((interval) => intervals.map((value) => mod(value)).includes(interval));
  return (colors.length ? colors : compactIntervals(quality).filter((interval) => interval !== 0)).slice(0, 4);
}

function omittedKeyboardText(quality, notes) {
  const all = new Set(intervalsForQuality(quality).map((interval) => mod(interval)));
  const shown = new Set(notes.map((note) => mod(note)));
  const omitted = [...all].filter((interval) => !shown.has(interval)).map(intervalLabel);
  return omitted.length ? omitted.join(" / ") : "なし";
}

function keyboardNoteLabel(note) {
  const octave = Math.floor(note / 12);
  if (octave >= 2) return `${noteName(note)} 高2`;
  if (octave === 1) return `${noteName(note)} 高`;
  return noteName(note);
}

function renderKeyboard(voicing, root) {
  const highlighted = new Set(voicing.notes);
  const keyWidth = 16;
  const blackWidth = 10;
  const whiteHeight = 112;
  const blackHeight = 68;
  const octaves = 3;
  const whitePattern = [0, 2, 4, 5, 7, 9, 11];
  const blackPattern = [
    { pc: 1, afterWhite: 0 },
    { pc: 3, afterWhite: 1 },
    { pc: 6, afterWhite: 3 },
    { pc: 8, afterWhite: 4 },
    { pc: 10, afterWhite: 5 },
  ];
  const whiteNotes = Array.from({ length: octaves }).flatMap((_, octave) => {
    return whitePattern.map((pc, index) => ({
      note: octave * 12 + pc,
      x: (octave * whitePattern.length + index) * keyWidth,
    }));
  });
  const blackNotes = Array.from({ length: octaves }).flatMap((_, octave) => {
    return blackPattern.map(({ pc, afterWhite }) => ({
      note: octave * 12 + pc,
      x: (octave * whitePattern.length + afterWhite + 1) * keyWidth - blackWidth / 2,
    }));
  });
  const whiteKeys = whiteNotes
    .map(({ note, x }) => {
      const pc = mod(note);
      const isOn = highlighted.has(note);
      const isRoot = isOn && pc === root;
      return `<rect x="${x}" y="0" width="${keyWidth}" height="${whiteHeight}" rx="3" class="piano-white ${isOn ? "is-on" : ""} ${isRoot ? "is-root" : ""}"></rect>`;
    })
    .join("");
  const blackKeys = blackNotes
    .map(({ note, x }) => {
      const pc = mod(note);
      const isOn = highlighted.has(note);
      const isRoot = isOn && pc === root;
      return `<rect x="${x}" y="0" width="${blackWidth}" height="${blackHeight}" rx="3" class="piano-black ${isOn ? "is-on" : ""} ${isRoot ? "is-root" : ""}"></rect>`;
    })
    .join("");
  const labels = voicing.notes
    .map((note) => `<span class="${mod(note) === root ? "is-root" : ""}">${keyboardNoteLabel(note)}</span>`)
    .join("");
  return `
    <div class="keyboard-diagram">
      <svg class="keyboard-svg" viewBox="0 0 ${octaves * whitePattern.length * keyWidth} ${whiteHeight}" aria-label="鍵盤">
        ${whiteKeys}
        ${blackKeys}
      </svg>
      <div class="note-pills">${labels}</div>
    </div>
  `;
}

function makeBassVoicings(root, quality) {
  return [
    bassMapVoicing(root, quality, "0-7F", 0, 7, "開放弦から7フレットまで。曲中で迷った時に使いやすい範囲です。"),
    bassMapVoicing(root, quality, "5-12F", 5, 12, "5フレット以降。ギターのコードフォームとも合わせやすい範囲です。"),
    bassMapVoicing(root, quality, "9-17F", 9, 17, "高めのポジション。メロディックなベースラインや上昇フレーズ向きです。"),
  ];
}

function bassMapVoicing(root, quality, name, fromFret, toFret, description) {
  const tones = bassToneMap(root, quality);
  const positions = [];
  BASS_TUNING.forEach((openNote, stringIndex) => {
    for (let fret = fromFret; fret <= toFret; fret += 1) {
      const pc = mod(openNote + fret);
      const tone = tones.find((item) => item.pc === pc);
      if (tone) positions.push({ stringIndex, fret, ...tone });
    }
  });
  const passingPositions = bassPassingPositions(root, quality, fromFret, toFret, positions);
  return {
    name,
    description,
    positions,
    passingPositions,
    intent: "ルートから始め、3度/7度/テンションへ経過音で滑り込む",
    omit: "同時に全部鳴らす必要はなし。小点は短く通過してOK",
  };
}

function bassToneMap(root, quality) {
  const intervals = intervalsForQuality(quality);
  const priority = [0, 3, 4, 5, 7, 10, 11, 1, 2, 6, 8, 9];
  return priority
    .filter((interval) => intervals.map((value) => mod(value)).includes(interval))
    .slice(0, 6)
    .map((interval) => ({
      pc: mod(root + interval),
      label: intervalLabel(interval),
      isRoot: interval === 0,
    }));
}

function intervalLabel(interval) {
  return {
    0: "R",
    1: "b9",
    2: "9",
    3: "m3",
    4: "3",
    5: "4",
    6: "b5",
    7: "5",
    8: "#5",
    9: "6/13",
    10: "b7",
    11: "7",
  }[mod(interval)] || `${interval}`;
}

function bassPassingToneMap(root, quality) {
  const chordIntervals = new Set(intervalsForQuality(quality).map((interval) => mod(interval)));
  const candidates = [];
  const add = (interval, label, description, weight = 5) => {
    const normalized = mod(interval);
    if (chordIntervals.has(normalized)) return;
    if (candidates.some((candidate) => candidate.interval === normalized)) return;
    candidates.push({
      interval: normalized,
      pc: mod(root + normalized),
      label,
      description,
      weight,
    });
  };
  const third = chordIntervals.has(4) ? 4 : chordIntervals.has(3) ? 3 : null;
  const seventh = chordIntervals.has(11) ? 11 : chordIntervals.has(10) ? 10 : null;

  add(-1, "R↑", "半音下からルートへ入る", 1);
  add(1, "R↓", "半音上からルートへ戻す", 3);
  if (third !== null) {
    add(third - 1, `${intervalLabel(third)}↑`, `${intervalLabel(third)}へ半音で寄る`, 2);
    add(third + 1, `${intervalLabel(third)}↓`, `${intervalLabel(third)}を上下で囲う`, 6);
  }
  if (chordIntervals.has(7)) add(6, "5↑", "ブルーノート気味に5度へ入る", 2);
  if (seventh !== null) add(seventh - 1, `${intervalLabel(seventh)}↑`, `${intervalLabel(seventh)}へ半音で寄る`, 4);

  if (["7", "9", "13", "dom7b9", "dom7alt", "sus13", "7sus4"].includes(quality)) {
    add(3, "#9", "ブルース/Funk寄りの濁り", 3);
    add(8, "b13", "濃い下降感を作る外の音", 5);
  }
  if (["maj", "maj7", "maj9", "add9", "sixNine", "6"].includes(quality)) {
    add(3, "blue", "メジャーに一瞬だけ影を入れる", 3);
    add(10, "b7", "ミクソリディアンっぽく外す", 7);
  }
  if (["min", "m7", "m9", "m11", "mM7"].includes(quality)) {
    add(4, "M3", "マイナーに一瞬だけ明るさを混ぜる", 4);
    add(6, "b5", "暗いブルーノートとして使う", 3);
  }

  return candidates.sort((a, b) => a.weight - b.weight).slice(0, 7);
}

function bassPassingPositions(root, quality, fromFret, toFret, chordPositions) {
  const passingTones = bassPassingToneMap(root, quality);
  const chordKeys = new Set(chordPositions.map((position) => `${position.stringIndex}:${position.fret}`));
  const candidates = [];
  BASS_TUNING.forEach((openNote, stringIndex) => {
    for (let fret = fromFret; fret <= toFret; fret += 1) {
      if (chordKeys.has(`${stringIndex}:${fret}`)) continue;
      const pc = mod(openNote + fret);
      const tone = passingTones.find((item) => item.pc === pc);
      if (!tone) continue;
      const nearestChord = chordPositions
        .filter((position) => position.stringIndex === stringIndex)
        .map((position) => Math.abs(position.fret - fret))
        .sort((a, b) => a - b)[0];
      if (nearestChord === undefined || nearestChord > 2) continue;
      candidates.push({ stringIndex, fret, ...tone, distance: nearestChord });
    }
  });
  return candidates
    .sort((a, b) => a.distance - b.distance || a.weight - b.weight || a.stringIndex - b.stringIndex || a.fret - b.fret)
    .slice(0, 16);
}

function renderBassFretboard(voicing, root, quality) {
  const fromFret = Number(voicing.name.split("-")[0]);
  const toFret = Number(voicing.name.split("-")[1]?.replace("F", "")) || fromFret + 7;
  const width = 274;
  const height = 148;
  const left = 28;
  const top = 22;
  const fretStep = 24;
  const stringStep = 28;
  const fretLines = Array.from({ length: toFret - fromFret + 2 }, (_, index) => {
    const x = left + index * fretStep;
    return `<line x1="${x}" y1="${top}" x2="${x}" y2="${top + stringStep * 3}" class="bass-fret"></line>`;
  }).join("");
  const strings = BASS_STRING_NAMES.map((name, index) => {
    const y = top + index * stringStep;
    return `<g><line x1="${left}" y1="${y}" x2="${left + (toFret - fromFret + 1) * fretStep}" y2="${y}" class="bass-string"></line><text x="10" y="${y + 4}" class="bass-label">${name}</text></g>`;
  }).join("");
  const passingMarkers = (voicing.passingPositions || [])
    .map((position) => {
      const x = left + (position.fret - fromFret + 0.5) * fretStep;
      const y = top + position.stringIndex * stringStep;
      return `<g class="bass-passing"><title>${escapeHTML(noteName(position.pc))}: ${escapeHTML(position.description)}</title><circle cx="${x}" cy="${y}" r="3.7"></circle></g>`;
    })
    .join("");
  const markers = voicing.positions
    .map((position) => {
      const x = left + (position.fret - fromFret + 0.5) * fretStep;
      const y = top + position.stringIndex * stringStep;
      return `<g class="bass-marker ${position.isRoot ? "is-root" : ""}"><circle cx="${x}" cy="${y}" r="${position.isRoot ? 8 : 6}"></circle><text x="${x}" y="${y + 3}">${position.label}</text></g>`;
    })
    .join("");
  const fretNumbers = Array.from({ length: toFret - fromFret + 1 }, (_, index) => {
    const fret = fromFret + index;
    const x = left + (index + 0.5) * fretStep;
    return `<text x="${x}" y="136" class="bass-fret-number">${fret}</text>`;
  }).join("");
  return `
    <svg class="bass-svg" viewBox="0 0 ${width} ${height}" aria-label="4弦ベースの使えるフレット">
      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="8" fill="rgba(255,255,255,.035)" stroke="rgba(222,236,224,.16)"></rect>
      ${fretLines}
      ${strings}
      ${passingMarkers}
      ${markers}
      ${fretNumbers}
    </svg>
  `;
}

function makeVoicings(root, quality) {
  const practicalCandidates = practicalVoicings(root, quality);
  if (quality === "dim" || quality === "dim7") {
    const dimCandidates = [
      ...practicalCandidates,
      searchOpenVoicing(root, quality),
      diminishedVoicing(root, 0),
      diminishedVoicing(root, 3),
      searchWindowVoicing(root, quality, 7, "ハイフレット"),
    ].filter(Boolean);
    return uniqueVoicings(dimCandidates).slice(0, 4);
  }
  const standardQuality = ["maj", "min", "7", "m7"].includes(quality);
  const windowCandidates = preferredVoicingStarts(root)
    .map((start, index) => {
      const names = ["低め", "6弦寄り", "5弦寄り", "高め"];
      return searchWindowVoicing(root, quality, start, names[index] || "別フォーム");
    })
    .filter(Boolean);
  const highCandidates = [5, 7, 9, 12]
    .map((start, index) => searchWindowVoicing(root, quality, start, ["5F以降", "7F以降", "9F以降", "12F付近"][index]))
    .filter(Boolean);
  const reharmCandidates = reharmVoicings(root, quality);
  const candidates = standardQuality
    ? [
        ...practicalCandidates,
        searchOpenVoicing(root, quality),
        cagedVoicing(root, quality, "E"),
        cagedVoicing(root, quality, "A"),
        cagedVoicing(root, quality, "D"),
        ...windowCandidates,
        ...highCandidates,
        ...reharmCandidates,
      ].filter(Boolean)
    : [ ...practicalCandidates, searchOpenVoicing(root, quality), ...windowCandidates, ...highCandidates, ...reharmCandidates].filter(Boolean);

  const unique = uniqueVoicings(candidates);
  return unique.length ? unique.slice(0, 7) : [fallbackVoicing(root, quality)];
}

function practicalVoicings(root, quality) {
  const root6 = rootFretOnString(root, 0, 5);
  const root5 = rootFretOnString(root, 1, 3);
  const high5 = rootFretOnString(root, 1, 8);
  const voicings = [
    shellVoicing6(root6, quality),
    shellVoicing5(root5, quality),
    colorVoicing6(root6, quality),
    colorVoicing5(root5, quality),
    highColorVoicing5(high5, quality),
    upperFragmentVoicing(root, quality),
  ].filter(Boolean);
  return voicings;
}

function rootFretOnString(root, stringIndex, minFret = 1) {
  let fret = mod(root - TUNING[stringIndex]);
  if (fret === 0 && minFret > 0) fret = 12;
  while (fret < minFret) fret += 12;
  while (fret > 16 && fret - 12 >= minFret) fret -= 12;
  return fret;
}

function normalizeShape(frets, minFret = 0, maxFret = 17) {
  let next = [...frets];
  const fretted = () => next.filter((fret) => fret >= 0);
  while (fretted().length && Math.min(...fretted()) < minFret) {
    next = next.map((fret) => (fret >= 0 ? fret + 12 : fret));
  }
  while (fretted().length && Math.max(...fretted()) > maxFret && Math.min(...fretted()) - 12 >= minFret) {
    next = next.map((fret) => (fret >= 0 ? fret - 12 : fret));
  }
  if (fretted().some((fret) => fret < 0 || fret > maxFret)) return null;
  return next;
}

function makeVoicing(name, frets, description, extra = {}) {
  const normalized = normalizeShape(frets, extra.minFret || 0, extra.maxFret || 17);
  if (!normalized) return null;
  return {
    name,
    description,
    frets: normalized,
    intent: extra.intent,
    omit: extra.omit,
  };
}

function shellVoicing6(rootFret, quality) {
  const shell = shellType(quality);
  if (!shell) return null;
  const shapes = {
    maj: [rootFret, -1, rootFret + 1, rootFret + 1, -1, -1],
    min: [rootFret, -1, rootFret, rootFret, -1, -1],
    dom: [rootFret, -1, rootFret, rootFret + 1, -1, -1],
    sus: [rootFret, -1, rootFret, rootFret + 2, -1, -1],
  };
  return makeVoicing("Shell 6弦", shapes[shell], "6弦ルートの3音フォーム。伴奏で濁りにくく、次のコードへ動きやすい形です。", {
    minFret: 5,
    intent: "ルート、3度、7度だけでコードの性格を出す",
    omit: "5度や細かいテンション",
  });
}

function shellVoicing5(rootFret, quality) {
  const shell = shellType(quality);
  if (!shell) return null;
  const shapes = {
    maj: [-1, rootFret, rootFret - 1, rootFret + 1, -1, -1],
    min: [-1, rootFret, rootFret - 2, rootFret, -1, -1],
    dom: [-1, rootFret, rootFret - 1, rootFret, -1, -1],
    sus: [-1, rootFret, -1, rootFret, rootFret + 1, -1],
  };
  return makeVoicing("Shell 5弦", shapes[shell], "5弦ルートの小さなフォーム。ジャズ、R&B、ファンクのカッティングで扱いやすい形です。", {
    minFret: 3,
    intent: "低音を残しつつ、3度と7度で響きを決める",
    omit: "5度、厚すぎる重複音",
  });
}

function shellType(quality) {
  if (["maj", "maj7", "maj9", "add9", "add11", "sixNine", "6"].includes(quality)) return "maj";
  if (["min", "m7", "m9", "m11", "mM7", "m7b5"].includes(quality)) return "min";
  if (["7", "9", "13", "dom7b9", "dom7alt", "aug"].includes(quality)) return "dom";
  if (["sus4", "7sus4", "sus13"].includes(quality)) return "sus";
  return null;
}

function colorVoicing6(rootFret, quality) {
  const descriptions = {
    m9: ["m9 バレー", [rootFret, rootFret + 2, rootFret, rootFret, rootFret, rootFret + 2], "ネオソウル/R&Bで使いやすい、9thを上に置いたマイナーの広い響き。", "9thをトップに置き、切なさを浮かせる", "一部の5度は響きの中で補う"],
    "9": ["9th compact", [rootFret, -1, rootFret, rootFret + 1, rootFret, rootFret + 2], "ファンクで短く切りやすい9thフォーム。普通の7thより跳ねます。", "9thでグルーヴ感を出す", "5度"],
    "13": ["13th funk", [rootFret, -1, rootFret, rootFret + 1, rootFret + 2, rootFret + 2], "13thを高音側に置いた、カッティング向きのドミナント。", "13thで明るい濁りを作る", "5度"],
    dom7b9: ["7(b9)", [rootFret, -1, rootFret, rootFret + 1, rootFret, rootFret + 1], "b9を近くに置いて、次のコードを強く照らすフォーム。", "b9の刺さる緊張を入れる", "5度"],
    dom7alt: ["7alt", [rootFret, -1, rootFret, rootFret + 1, rootFret + 1, rootFret + 1], "alt系の濁りをまとめて感じられる、実験的なドミナントフォーム。", "b9/#9/b13的な濁りで戻りを強める", "完全な5度"],
    sus13: ["13sus", [rootFret, -1, rootFret, rootFret + 2, rootFret, rootFret + 2], "susの保留感を残したまま踊れるフォーム。", "3度を保留し、4度と13thの空気を出す", "3度"],
  };
  const item = descriptions[quality] || (quality === "7" ? descriptions["9"] : null);
  if (!item) return null;
  return makeVoicing(item[0], item[1], item[2], { minFret: 5, intent: item[3], omit: item[4] });
}

function colorVoicing5(rootFret, quality) {
  const descriptions = {
    maj7: ["maj7 5弦", [-1, rootFret, rootFret + 2, rootFret + 1, rootFret + 2, -1], "5弦ルートの扱いやすいmaj7。歌ものの透明感に向きます。", "maj7の透明感をはっきり出す", "低い5度の重複"],
    maj9: ["maj9 5弦", [-1, rootFret, rootFret - 1, rootFret + 1, rootFret, -1], "maj7に9thの空気を足した、J-POP/Jazz両方で使えるフォーム。", "9thで夜景のような広がりを作る", "5度"],
    add9: ["add9 5弦", [-1, rootFret, rootFret + 2, rootFret + 2, rootFret, -1], "明るいコードを少し浮かせる、ポップスで使いやすいフォーム。", "9thを足して、普通のメジャーを少し今っぽくする", "7度"],
    sixNine: ["6/9", [-1, rootFret, rootFret - 1, rootFret - 1, rootFret, -1], "終止感を弱め、ループで使いやすい6/9フォーム。", "6thと9thで、終わりすぎない家にする", "7度"],
    m9: ["m9 5弦", [-1, rootFret, rootFret + 2, rootFret, rootFret + 1, rootFret + 2], "m7に9thを足した、切ないけれど広いフォーム。", "9thを足してマイナーを浮かせる", "5度は必要に応じて省略"],
    m11: ["m11", [-1, rootFret, rootFret - 2, rootFret, rootFret - 2, rootFret - 2], "暗さを保ったまま空間を広げるフォーム。", "11thでNeo Soul寄りの広がりを出す", "5度"],
  };
  const fallback = quality === "maj" ? descriptions.add9 : quality === "min" || quality === "m7" ? descriptions.m9 : null;
  const item = descriptions[quality] || fallback;
  if (!item) return null;
  return makeVoicing(item[0], item[1], item[2], { minFret: 3, intent: item[3], omit: item[4] });
}

function highColorVoicing5(rootFret, quality) {
  const color = colorVoicing5(rootFret, quality) || shellVoicing5(rootFret, quality);
  if (!color) return null;
  return {
    ...color,
    name: `高音 ${color.name}`,
    description: `${color.description} 5フレット以降で、バンドや録音でも抜けやすい高さです。`,
  };
}

function upperFragmentVoicing(root, quality) {
  const start = rootFretOnString(root, 2, 7);
  const chordTones = intervalsForQuality(fragmentQuality(quality)).map((interval) => mod(root + interval));
  const voicing = searchWindowVoicing(root, fragmentQuality(quality), start, "上モノだけ");
  if (!voicing) return null;
  return {
    ...voicing,
    description: "低音をベースや他のギターに任せて、高い弦の色だけを鳴らす実用フォームです。",
    intent: `高音側で${chordTones.map(noteName).join(" / ")}の色を作る`,
    omit: "低いルートや厚い5度",
  };
}

function fragmentQuality(quality) {
  if (["7", "9", "13"].includes(quality)) return "9";
  if (["dom7b9", "dom7alt"].includes(quality)) return quality;
  if (["maj", "maj7", "add9", "sixNine", "6"].includes(quality)) return "maj9";
  if (["min", "m7", "m9", "m11"].includes(quality)) return "m9";
  return quality;
}

function uniqueVoicings(candidates) {
  const unique = [];
  const seen = new Set();
  for (const voicing of candidates) {
    const key = voicing.frets.join(",");
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(voicing);
    }
  }
  return unique;
}

function reharmVoicings(root, quality) {
  const alternatives = reharmQualities(quality);
  return alternatives
    .flatMap((alt) => {
      return [5, 7, 9].map((start) => {
        const voicing = searchWindowVoicing(root, alt.quality, start, alt.name);
        if (!voicing) return null;
        return {
          ...voicing,
          description: `${alt.description} ${voicing.description}`,
        };
      });
    })
    .filter(Boolean)
    .slice(0, 3);
}

function reharmQualities(quality) {
  if (quality === "maj") {
    return [
      { quality: "maj7", name: "リハモ maj7", description: "同じ家を少し透明にする解釈です。" },
      { quality: "sixNine", name: "リハモ 6/9", description: "終わりすぎない家として使う解釈です。" },
      { quality: "maj9", name: "リハモ maj9", description: "Jazz/Funk寄りに広げる解釈です。" },
    ];
  }
  if (quality === "min") {
    return [
      { quality: "m7", name: "リハモ m7", description: "暗さを柔らかくする解釈です。" },
      { quality: "m9", name: "リハモ m9", description: "暗さに余白を足す解釈です。" },
      { quality: "m11", name: "リハモ m11", description: "Neo Soul寄りに広げる解釈です。" },
    ];
  }
  if (quality === "7") {
    return [
      { quality: "9", name: "リハモ 9", description: "ドミナントを少し跳ねさせる解釈です。" },
      { quality: "13", name: "リハモ 13", description: "ファンク寄りに踊らせる解釈です。" },
      { quality: "dom7alt", name: "リハモ alt", description: "あえて濁らせて戻りを強くする解釈です。" },
    ];
  }
  if (quality === "m7") {
    return [
      { quality: "m9", name: "リハモ m9", description: "m7をよりメロウにする解釈です。" },
      { quality: "m11", name: "リハモ m11", description: "m7を広い空間に変える解釈です。" },
    ];
  }
  if (quality === "maj7") {
    return [
      { quality: "maj9", name: "リハモ maj9", description: "maj7の透明感をさらに広げる解釈です。" },
      { quality: "sixNine", name: "リハモ 6/9", description: "maj7より少し軽く終わる解釈です。" },
    ];
  }
  return [];
}

function diminishedVoicing(root, extraFrets) {
  const r = mod(root - 9) + extraFrets;
  return {
    name: extraFrets ? "dim型 高め" : "dim型",
    description: "不安定な響きを短く使いやすい形。次のコードへ滑り込ませると効きます。",
    frets: [-1, r, r + 1, r + 2, r + 1, -1],
  };
}

function cagedVoicing(root, quality, shape) {
  const fretFrom = (baseRoot) => mod(root - baseRoot);
  const templates = {
    E: {
      base: 4,
      frets: {
        maj: (r) => [r, r + 2, r + 2, r + 1, r, r],
        min: (r) => [r, r + 2, r + 2, r, r, r],
        "7": (r) => [r, r + 2, r, r + 1, r, r],
        m7: (r) => [r, r + 2, r, r, r, r],
      },
      name: "E型",
      description: "6弦ルートの形。ロックや弾き語りで使いやすいフォームです。",
    },
    A: {
      base: 9,
      frets: {
        maj: (r) => [-1, r, r + 2, r + 2, r + 2, r],
        min: (r) => [-1, r, r + 2, r + 2, r + 1, r],
        "7": (r) => [-1, r, r + 2, r, r + 2, r],
        m7: (r) => [-1, r, r + 2, r, r + 1, r],
      },
      name: "A型",
      description: "5弦ルートの形。少し高い位置でまとまりやすいフォームです。",
    },
    D: {
      base: 2,
      frets: {
        maj: (r) => [-1, -1, r, r + 2, r + 3, r + 2],
        min: (r) => [-1, -1, r, r + 2, r + 3, r + 1],
        "7": (r) => [-1, -1, r, r + 2, r + 1, r + 2],
        m7: (r) => [-1, -1, r, r + 2, r + 1, r + 1],
      },
      name: "D型",
      description: "高い弦中心の形。軽く響かせたいときに便利です。",
    },
  };
  const template = templates[shape];
  const builder = template.frets[quality];
  if (!builder) return null;
  let r = fretFrom(template.base);
  if (r === 0 && shape !== "D") {
    const frets = builder(0);
    return { name: `${template.name} 開放`, description: template.description, frets };
  }
  if (r === 0 && shape === "D") r = 12;
  return {
    name: template.name,
    description: template.description,
    frets: builder(r),
  };
}

function preferredVoicingStarts(root) {
  const lowE = mod(root - 4) || 12;
  const aString = mod(root - 9) || 12;
  return [...new Set([0, lowE, aString, Math.min(9, Math.max(3, aString + 3))])].slice(0, 4);
}

function searchWindowVoicing(root, quality, startFret, name) {
  const chordTones = intervalsForQuality(quality).map((interval) => mod(root + interval));
  const firstFret = startFret === 0 ? 0 : Math.max(1, startFret);
  const lastFret = startFret === 0 ? 4 : firstFret + 4;
  const options = TUNING.map((openNote) => {
    const frets = [];
    for (let fret = firstFret; fret <= lastFret; fret += 1) {
      if (chordTones.includes(mod(openNote + fret))) frets.push(fret);
    }
    if (startFret === 0 && chordTones.includes(openNote)) frets.unshift(0);
    frets.push(-1);
    return [...new Set(frets)];
  });

  let best = null;
  function walk(stringIndex, frets) {
    if (stringIndex === options.length) {
      const sounded = frets.filter((fret) => fret >= 0);
      if (sounded.length < Math.min(4, chordTones.length)) return;
      const pitchSet = new Set(
        frets
          .map((fret, index) => (fret >= 0 ? mod(TUNING[index] + fret) : null))
          .filter((value) => value !== null)
      );
      if (!pitchSet.has(root)) return;
      const covered = chordTones.filter((tone) => pitchSet.has(tone)).length;
      if (covered < Math.min(chordTones.length, 3)) return;
      const positive = sounded.filter((fret) => fret > 0);
      const span = positive.length ? Math.max(...positive) - Math.min(...positive) : 0;
      if (span > 4) return;
      const bassIndex = frets.findIndex((fret) => fret >= 0);
      const bassPitch = bassIndex >= 0 ? mod(TUNING[bassIndex] + frets[bassIndex]) : -1;
      const openCount = sounded.filter((fret) => fret === 0).length;
      const score = covered * 14 + sounded.length * 3 + openCount * 2 - span * 3 + (bassPitch === root ? 10 : 0);
      if (!best || score > best.score) best = { score, frets };
      return;
    }
    for (const fret of options[stringIndex]) {
      walk(stringIndex + 1, [...frets, fret]);
    }
  }
  walk(0, []);

  if (!best) return null;
  const normalized = normalizeShape(best.frets, 0, 17);
  if (!normalized) return null;
  return {
    name,
    description: `${QUALITY_DESCRIPTIONS[quality] || "響きの違いを試せるフォームです"} 位置を変えたフォームとして使えます。`,
    frets: normalized,
  };
}

function fallbackVoicing(root, quality) {
  const start = mod(root - 9) || 12;
  return {
    name: "仮フォーム",
    description: `${QUALITY_DESCRIPTIONS[quality] || "響きの違いを試せるフォームです"} まず音の動きを試すための簡易フォームです。`,
    frets: [-1, start, start + 2, start + 2, start + 1, -1],
  };
}

function searchOpenVoicing(root, quality) {
  const chordTones = intervalsForQuality(quality).map((interval) => mod(root + interval));
  const options = TUNING.map((openNote) => {
    const frets = [];
    for (let fret = 0; fret <= 5; fret += 1) {
      if (chordTones.includes(mod(openNote + fret))) frets.push(fret);
    }
    frets.push(-1);
    return frets;
  });

  let best = null;
  function walk(stringIndex, frets) {
    if (stringIndex === options.length) {
      const sounded = frets.filter((fret) => fret >= 0);
      if (sounded.length < 4) return;
      const pitchSet = new Set(
        frets
          .map((fret, index) => (fret >= 0 ? mod(TUNING[index] + fret) : null))
          .filter((value) => value !== null)
      );
      if (!chordTones.every((tone) => pitchSet.has(tone))) return;
      const positive = sounded.filter((fret) => fret > 0);
      const span = positive.length ? Math.max(...positive) - Math.min(...positive) : 0;
      if (span > 4) return;
      const bassIndex = frets.findIndex((fret) => fret >= 0);
      const bassPitch = bassIndex >= 0 ? mod(TUNING[bassIndex] + frets[bassIndex]) : -1;
      const openCount = sounded.filter((fret) => fret === 0).length;
      const score = sounded.length * 6 + openCount * 4 - span * 3 + (bassPitch === root ? 10 : 0);
      if (!best || score > best.score) best = { score, frets };
      return;
    }
    for (const fret of options[stringIndex]) {
      walk(stringIndex + 1, [...frets, fret]);
    }
  }
  walk(0, []);

  if (!best) return null;
  return {
    name: "近い形",
    description: "開放弦に近い位置で探した形。すぐ試すための入り口です。",
    frets: best.frets,
  };
}

function intervalsForQuality(quality) {
  return {
    maj: [0, 4, 7],
    min: [0, 3, 7],
    "7": [0, 4, 7, 10],
    m7: [0, 3, 7, 10],
    dim: [0, 3, 6],
    maj7: [0, 4, 7, 11],
    add9: [0, 2, 4, 7],
    sus4: [0, 5, 7],
    "7sus4": [0, 5, 7, 10],
    m7b5: [0, 3, 6, 10],
    dim7: [0, 3, 6, 9],
    aug: [0, 4, 8],
    mM7: [0, 3, 7, 11],
    "6": [0, 4, 7, 9],
    maj9: [0, 2, 4, 7, 11],
    m9: [0, 2, 3, 7, 10],
    "9": [0, 2, 4, 7, 10],
    "13": [0, 2, 4, 7, 9, 10],
    sixNine: [0, 2, 4, 7, 9],
    m11: [0, 3, 5, 7, 10],
    dom7b9: [0, 1, 4, 7, 10],
    dom7alt: [0, 3, 4, 6, 8, 10],
    sus13: [0, 5, 7, 9, 10],
    add11: [0, 4, 5, 7],
  }[quality] || [0, 4, 7];
}

function renderFretboard(voicing) {
  const frets = voicing.frets;
  const played = frets.filter((fret) => fret > 0);
  const minFret = played.length ? Math.min(...played) : 0;
  const startFret = minFret > 4 ? minFret : 1;
  const rows = 5;
  const stringX = [16, 36, 56, 76, 96, 116];
  const top = 34;
  const rowHeight = 26;
  const width = 132;
  const height = 174;
  const nutY = 28;
  const fretLines = Array.from({ length: rows + 1 }, (_, index) => {
    const y = top + index * rowHeight;
    const strokeWidth = startFret === 1 && index === 0 ? 5 : 1.5;
    return `<line x1="16" y1="${y}" x2="116" y2="${y}" stroke="rgba(233,239,231,.7)" stroke-width="${strokeWidth}"></line>`;
  }).join("");
  const strings = stringX
    .map((x, index) => {
      const weight = 2.2 - index * 0.16;
      return `<line x1="${x}" y1="${top}" x2="${x}" y2="${top + rows * rowHeight}" stroke="rgba(233,239,231,.56)" stroke-width="${weight}"></line>`;
    })
    .join("");
  const markers = frets
    .map((fret, index) => {
      const x = stringX[index];
      if (fret < 0) {
        return `<text x="${x}" y="20" class="diagram-text">x</text>`;
      }
      if (fret === 0) {
        return `<text x="${x}" y="20" class="diagram-text">o</text>`;
      }
      const row = fret - startFret;
      const y = top + row * rowHeight + rowHeight / 2;
      if (row < 0 || row >= rows) return "";
      return `<circle cx="${x}" cy="${y}" r="8.5" fill="#82dd55"></circle>`;
    })
    .join("");
  const label = startFret > 1 ? `<text x="5" y="${top + rowHeight / 2 + 4}" class="fret-label">${startFret}</text>` : "";
  const stringLabels = STRING_NAMES.map((name, index) => `<text x="${stringX[index]}" y="${height - 6}" class="string-label">${name}</text>`).join("");

  return `
    <svg class="fret-svg" viewBox="0 0 ${width} ${height}" aria-label="ギターコードフォーム">
      <style>
        .diagram-text,.string-label{fill:#9aa89d;font-size:12px;text-anchor:middle;font-weight:700}
        .fret-label{fill:#82dd55;font-size:12px;font-weight:800}
      </style>
      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="8" fill="rgba(255,255,255,.035)" stroke="rgba(222,236,224,.16)"></rect>
      ${startFret === 1 ? "" : `<line x1="16" y1="${nutY}" x2="116" y2="${nutY}" stroke="rgba(233,239,231,.25)" stroke-width="1"></line>`}
      ${strings}
      ${fretLines}
      ${markers}
      ${label}
      ${stringLabels}
    </svg>
  `;
}

function addMapNote() {
  const text = el.mapNoteInput.value.trim();
  if (!text) return;
  const count = state.notes.length;
  state.notes.push({
    id: crypto.randomUUID(),
    text,
    x: 44 + ((count * 54) % 240),
    y: 62 + ((count * 42) % 220),
  });
  el.mapNoteInput.value = "";
  renderMapNotes();
  persist();
}

function renderMapNotes() {
  el.mapNotes.innerHTML = state.notes
    .map((note) => {
      return `
        <div class="map-note" data-note-id="${note.id}" style="left:${note.x}px;top:${note.y}px">
          <button type="button" aria-label="メモを削除">×</button>
          <p>${escapeHTML(note.text)}</p>
        </div>
      `;
    })
    .join("");

  el.mapNotes.querySelectorAll(".map-note").forEach((noteEl) => {
    const note = state.notes.find((item) => item.id === noteEl.dataset.noteId);
    if (!note) return;
    noteEl.querySelector("button").addEventListener("click", (event) => {
      event.stopPropagation();
      state.notes = state.notes.filter((item) => item.id !== note.id);
      renderMapNotes();
      persist();
    });
    makeDraggable(noteEl, note);
  });
}

function makeDraggable(noteEl, note) {
  let startX = 0;
  let startY = 0;
  let baseX = 0;
  let baseY = 0;

  noteEl.addEventListener("pointerdown", (event) => {
    if (event.target.tagName === "BUTTON") return;
    noteEl.setPointerCapture(event.pointerId);
    startX = event.clientX;
    startY = event.clientY;
    baseX = note.x;
    baseY = note.y;
  });

  noteEl.addEventListener("pointermove", (event) => {
    if (!noteEl.hasPointerCapture(event.pointerId)) return;
    const bounds = el.mapStage.getBoundingClientRect();
    const width = noteEl.offsetWidth;
    const height = noteEl.offsetHeight;
    note.x = Math.max(6, Math.min(bounds.width - width - 6, baseX + event.clientX - startX));
    note.y = Math.max(6, Math.min(bounds.height - height - 6, baseY + event.clientY - startY));
    noteEl.style.left = `${note.x}px`;
    noteEl.style.top = `${note.y}px`;
  });

  noteEl.addEventListener("pointerup", (event) => {
    if (noteEl.hasPointerCapture(event.pointerId)) noteEl.releasePointerCapture(event.pointerId);
    persist();
  });
}

function renderSavedIdeas() {
  if (!state.ideas.length) {
    el.savedIdeas.innerHTML = `<p class="saved-empty">まだ保存はありません。気に入った流れを見つけたら保存できます。</p>`;
    return;
  }
  el.savedIdeas.innerHTML = state.ideas
    .map((idea) => {
      const modeLabel = idea.mode === "major" ? "メジャー系" : "マイナー系";
      const adventureLabel = ADVENTURES[idea.adventure]?.label || "J-POP深め";
      return `
        <article class="saved-idea">
          <strong>${escapeHTML(idea.key)} / ${modeLabel} / ${adventureLabel}: ${idea.chords.map(escapeHTML).join(" → ")}</strong>
          <p>${idea.memo ? escapeHTML(idea.memo) : "メモなし"}</p>
          <button type="button" data-load-idea="${idea.id}">この進行を戻す</button>
        </article>
      `;
    })
    .join("");

  el.savedIdeas.querySelectorAll("[data-load-idea]").forEach((button) => {
    button.addEventListener("click", () => {
      const idea = state.ideas.find((item) => item.id === button.dataset.loadIdea);
      if (!idea) return;
      state.key = idea.key;
      state.mode = idea.mode;
      state.adventure = idea.adventure || state.adventure;
      if (["guitar", "keyboard", "bass"].includes(idea.instrument)) state.instrument = idea.instrument;
      state.selectedId = mapData().centerRole;
      state.selectionHistory = [];
      state.progression = [...idea.chords];
      el.ideaMemo.value = idea.memo || "";
      render();
      persist();
    });
  });
}

function restore() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return;
    if (KEYS.includes(saved.key)) state.key = saved.key;
    if (MAPS[saved.mode]) state.mode = saved.mode;
    if (ADVENTURES[saved.adventure]) state.adventure = saved.adventure;
    if (["guitar", "keyboard", "bass"].includes(saved.instrument)) state.instrument = saved.instrument;
    if (["suggestions", "voicings"].includes(saved.detailTab)) state.detailTab = saved.detailTab;
    if (typeof saved.selectedId === "string") state.selectedId = saved.selectedId;
    if (Array.isArray(saved.selectionHistory)) state.selectionHistory = saved.selectionHistory.slice(-24);
    if (Array.isArray(saved.progression)) state.progression = saved.progression.slice(0, 32);
    if (Array.isArray(saved.ideas)) state.ideas = saved.ideas.slice(0, 18);
    if (Array.isArray(saved.notes)) state.notes = saved.notes.slice(0, 24);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function persist() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      key: state.key,
      mode: state.mode,
      adventure: state.adventure,
      instrument: state.instrument,
      detailTab: state.detailTab,
      selectedId: state.selectedId,
      selectionHistory: state.selectionHistory,
      progression: state.progression,
      ideas: state.ideas,
      notes: state.notes,
    })
  );
}

init();
registerServiceWorker();

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol === "file:") return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
