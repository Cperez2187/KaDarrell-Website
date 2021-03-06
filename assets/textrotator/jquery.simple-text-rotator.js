/* ===========================================================
 * jquery-simple-text-rotator.js v1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * A very simple and light weight jQuery plugin that 
 * allows you to rotate multiple text without changing 
 * the layout
 * https://github.com/peachananr/simple-text-rotator
 *
 * ========================================================== */

!(function($) {
  var defaults = {
    animation: 'dissolve',
    separator: ',',
    speed: 2000
  };

  $.fx.step.textShadowBlur = function(fx) {
    $(fx.elem)
      .prop('textShadowBlur', fx.now)
      .css({ textShadow: '0 0 ' + Math.floor(fx.now) + 'px black' });
  };

  $.fn.textrotator = function(options) {
    var settings = $.extend({}, defaults, options);

    return this.each(function() {
      var el = $(this);
      var array = [];
      $.each(el.text().split(settings.separator), function(key, value) {
        array.push(value);
      });
      el.text(array[0]);
      changeQuote(array[0]);

      // animation option
      var rotate = function() {
        switch (settings.animation) {
          case 'dissolve':
            el.animate(
              {
                textShadowBlur: 20,
                opacity: 0
              },
              500,
              function() {
                index = $.inArray(el.text(), array);
                if (index + 1 == array.length) index = -1;
                el.text(array[index + 1]).animate(
                  {
                    textShadowBlur: 0,
                    opacity: 1
                  },
                  500,
                  changeQuote(array[index + 1])
                );
                // changeQuote(arra3y[index + 1]);
              }
            );
            break;

          case 'flip':
            if (el.find('.back').length > 0) {
              el.html(el.find('.back').html());
            }

            var initial = el.text();
            var index = $.inArray(initial, array);
            if (index + 1 == array.length) index = -1;

            el.html('');
            $("<span class='front'>" + initial + '</span>').appendTo(el);
            $("<span class='back'>" + array[index + 1] + '</span>').appendTo(
              el
            );
            el
              .wrapInner("<span class='rotating' />")
              .find('.rotating')
              .hide()
              .addClass('flip')
              .show()
              .css({
                '-webkit-transform': ' rotateY(-180deg)',
                '-moz-transform': ' rotateY(-180deg)',
                '-o-transform': ' rotateY(-180deg)',
                transform: ' rotateY(-180deg)'
              });
              changeQuote(array[index+1]);

            break;

          case 'flipUp':
            if (el.find('.back').length > 0) {
              el.html(el.find('.back').html());
            }

            var initial = el.text();
            var index = $.inArray(initial, array);
            if (index + 1 == array.length) index = -1;

            el.html('');
            $("<span class='front'>" + initial + '</span>').appendTo(el);
            $("<span class='back'>" + array[index + 1] + '</span>').appendTo(
              el
            );
            el
              .wrapInner("<span class='rotating' />")
              .find('.rotating')
              .hide()
              .addClass('flip up')
              .show()
              .css({
                '-webkit-transform': ' rotateX(-180deg)',
                '-moz-transform': ' rotateX(-180deg)',
                '-o-transform': ' rotateX(-180deg)',
                transform: ' rotateX(-180deg)'
              });
              changeQuote(array[index+1]);

            break;

          case 'flipCube':
            if (el.find('.back').length > 0) {
              el.html(el.find('.back').html());
            }

            var initial = el.text();
            var index = $.inArray(initial, array);
            if (index + 1 == array.length) index = -1;

            el.html('');
            $("<span class='front'>" + initial + '</span>').appendTo(el);
            $("<span class='back'>" + array[index + 1] + '</span>').appendTo(
              el
            );
            el
              .wrapInner("<span class='rotating' />")
              .find('.rotating')
              .hide()
              .addClass('flip cube')
              .show()
              .css({
                '-webkit-transform': ' rotateY(180deg)',
                '-moz-transform': ' rotateY(180deg)',
                '-o-transform': ' rotateY(180deg)',
                transform: ' rotateY(180deg)'
              });
              changeQuote(array[index+1]);

            break;

          case 'flipCubeUp':
            if (el.find('.back').length > 0) {
              el.html(el.find('.back').html());
            }

            var initial = el.text();
            var index = $.inArray(initial, array);
            if (index + 1 == array.length) index = -1;

            el.html('');
            $("<span class='front'>" + initial + '</span>').appendTo(el);
            $("<span class='back'>" + array[index + 1] + '</span>').appendTo(
              el
            );
            el
              .wrapInner("<span class='rotating' />")
              .find('.rotating')
              .hide()
              .addClass('flip cube up')
              .show()
              .css({
                '-webkit-transform': ' rotateX(180deg)',
                '-moz-transform': ' rotateX(180deg)',
                '-o-transform': ' rotateX(180deg)',
                transform: ' rotateX(180deg)'
              });
              changeQuote(array[index+1]);

            break;

          case 'spin':
            if (el.find('.rotating').length > 0) {
              el.html(el.find('.rotating').html());
            }
            index = $.inArray(el.text(), array);
            if (index + 1 == array.length) index = -1;

            el
              .wrapInner("<span class='rotating spin' />")
              .find('.rotating')
              .hide()
              .text(array[index + 1])
              .show()
              .css({
                '-webkit-transform': ' rotate(0) scale(1)',
                '-moz-transform': 'rotate(0) scale(1)',
                '-o-transform': 'rotate(0) scale(1)',
                transform: 'rotate(0) scale(1)'
              });
              changeQuote(array[index+1]);
            break;

          case 'fade':
            el.fadeOut(settings.speed, function() {
              index = $.inArray(el.text(), array);
              if (index + 1 == array.length) index = -1;
              el.text(array[index + 1]).fadeIn(settings.speed);
            });
            changeQuote(array[index+1]);         
            break;
        }
      };
      setInterval(rotate, settings.speed);
    });
  };
})(window.jQuery);

// Chooses quote depending on word
function changeQuote(word) {
  const quote = $('#quote-text');
  const author = $('#quote-auth');

  quote.animate(
    {
      textShadow: 20,
      opacity: 0
    },
    200,
    function() {
      // Animate author too
      author.animate(
        {
          textShadow: 20,
          opacity: 0
        },
        500,
        function() {
          switch (word) {
            case 'Journalist':
              quote
                .text(
                  `“Anthony is that talent with impeccable story-telling skills who can peak to the interest of readership whether
                  covering the story of a young man fighting a rare form of cancer or writing about a mission's trip to Africa. I
                  know him as a dependable, driven and resourceful journalist who has the ability to shine in high pressure
                  environments while embracing the unpredictable schedules in the newsroom.”`
                )
                .animate(
                  {
                    textShadowBlur: 0,
                    opacity: 1
                  },
                  500
                );
              author
                .html(
                  '- Charmella Greer,Former Editor, <br>NWI Post-Tribune Newspaper <br><span id="journ-loc" class="auth-loc">INDIANA</span>'
                )
                .animate(
                  {
                    textShadowBlur: 0,
                    opacity: 1
                  },
                  500
                );
              break;

            case 'Photographer':
              quote
                .text(
                  `“I know I am only 11-years- old, but I am smart enough to know that my daddy is the best photographer,
                  writer and father in the world. I see why everybody loves working with my daddy, because I love him, too.”`
                )
                .animate(
                  {
                    textShadowBlur: 0,
                    opacity: 1
                  },
                  500
                );
              author
                .html('- Amber Thigpen,, <br>Daughter of Anthony Thigpen <br><span id="photo-loc" class="auth-loc">ARIZONA</span>')
                .animate(
                  {
                    textShadowBlur: 0,
                    opacity: 1
                  },
                  500
                );
              break;

            case 'Publisher':
              quote
                .text(
                  `“It has been my personal privilege to work with Anthony Thigpen on multiple projects, but the most
                  memorable is the editing process he did on a series of essays I had written. His attention to detail, cadence in
                  writing, tone, alliteration and strength gleaned from proper punctuation, with deference to rhetorical writing,
                  was both exhilarating and a great learning experience for me.”`
                )
                .animate(
                  {
                    textShadowBlur: 0,
                    opacity: 1
                  },
                  500
                );
              author.html('- Thomas Ray, III, <br>Author <br><span id="pub-loc" class="auth-loc">TEXAS</span>').animate(
                {
                  textShadowBlur: 0,
                  opacity: 1
                },
                500
              );
              break;

            default:
              quote
                .text(
                  `“Mr. KaDarrell is a true missionary. In 2012, he visited Uganda and stayed in a remote village called Mateete.
                  He was keen in supporting vulnerable school children, needy families, and orphans. After evaluating our
                  education system, he realized so much lack in the schools, one of which was communication systems...”`
                )
                .animate(
                  {
                    textShadowBlur: 0,
                    opacity: 1
                  },
                  500
                );
              author
                .html(
                  '- John Robert Emetu, <br>Ugandan Citizen <br><span id="phil-loc" class="auth-loc">AFRICA</span>'
                )
                .animate(
                  {
                    textShadowBlur: 0,
                    opacity: 1
                  },
                  500
                );

              break;
          }
        }
      );
    }
  );
}
