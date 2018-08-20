(function() {
  //Put music files in array
  var musicArray = [
    './music/bensound-love.mp3',
    './music/bensound-tenderness.mp3',
    './music/bensound-straight.mp3',
    './music/bensound-acousticbreeze.mp3',
    './music/bensound-funkyelement.mp3',
    './music/Black_History.mp3',
    './music/Chocolate_Child.mp3',
    './music/pebbles.mp3',
    './music/Uncontainable.mp3'
  ];


  // Create Howl instance

  var play = false;
  var muted = false;
  var track = 0;
  // Create new shuffled array
  var shuffledArray = shuffle(musicArray.slice());
  var current = audioInstance(shuffledArray, track);

  $('#play').on('click', function() {
    play = !play;

    if (play) {
      current.playing() ? current.mute(false) : current.play();
      $(this).toggleClass('glyphicon-play glyphicon-volume-off');
      $(this).attr('aria-label', 'Mute Music');
      // Show forward button
      $('#forward').toggle();
      muted = false;
      
    } else {
      current.mute(true);
      muted = true;
      $(this).toggleClass('glyphicon-play glyphicon-volume-off');
      $(this).attr('aria-label', 'Play Music');
      // Hide forward button
      $('#forward').toggle();
    }
  });

  // Forward button
  $('#forward').on('click', function() {
    // Stop current track and play next one
    current.stop();
    nextTrack();
  })
  
  function nextTrack() {
    (track >= shuffledArray.length - 1) ? track = 0 : track++;
   
    current = audioInstance(shuffledArray, track);
    if (muted === false) {
      current.play();
    }
  }

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  
  function audioInstance(array, track) {
    // create howl instance to reuse
    return new Howl({
      src: array[track],
      volume: 0.5,
      preload: true,
      html5: true,
      onend: nextTrack,
    });
  }

})()
