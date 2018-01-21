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
    src: music,
    // autoplay: true,
    loop: true,
    volume: 0.5,
    preload: true,
    html5: true
  });

  sound.on('load', function() {
    sound.play();
  });


})()