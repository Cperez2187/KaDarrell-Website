(function() {
  //Put music files in array
  var music = [
    './music/bensound-love.mp3',
    './music/bensound-tenderness.mp3',
    './music/bensound-straight.mp3',
    './music/bensound-acousticbreeze.mp3',
    './music/bensound-funkyelement.mp3',
  ];


  // Create Howl instance
  var sound = new Howl({
    src: shuffle(music),
    loop: true,
    volume: 0.5,
    preload: true,
    html5: true
  });

  var play = false;

  sound.on('load', function() {
    $('.music-button').on('click', function() {
      play = !play;
      console.log(play);
      if (play) {
        // sound.play() && sound.mute(false);
        sound.playing() ? sound.mute(false) : sound.play();
        $(this).toggleClass('glyphicon-play glyphicon-volume-off');
        $(this).attr('aria-label', 'Mute Music');

      } else {
        sound.mute(true);
        $(this).toggleClass('glyphicon-play glyphicon-volume-off');
        $(this).attr('aria-label', 'Play Music');
      }
    });

  });


})()

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  console.log(array);
  return array;
}