var global_voice = create_4_4_voice();
var vf = Vex.Flow;

$(document).ready(function() {
	document.getElementById("makenote").onclick = makenote;
	var svg = $("#svg");
	var renderer = new Vex.Flow.Renderer(svg, Vex.Flow.Renderer.Backends.RAPHAEL);

	var ctx = renderer.getContext();
	var stave = new Vex.Flow.Stave(10, 0, 500);

  // Add a treble clef
  stave.addClef("treble");
  stave.setContext(ctx).draw();

  var notes = [
  new Vex.Flow.StaveNote({ keys: ["e##/5"], duration: "8d" }).
  addAccidental(0, new Vex.Flow.Accidental("##")).addDotToAll(),
  new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "16" }).
  addAccidental(0, new Vex.Flow.Accidental("b"))
  ];

  var notes2 = [
  new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "8" }),
  new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "16" }),
  new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "16" }).
  addAccidental(0, new Vex.Flow.Accidental("b")),
  new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "16" }),
  new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "16" }).
  addAccidental(0, new Vex.Flow.Accidental("#")),
  new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "32" }),
  new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "32" }),
  new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "16" })
  ];

  var notes4 = [ new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }) ];

  // Create the beams
  var beam = new Vex.Flow.Beam(notes);
  var beam2 = new Vex.Flow.Beam(notes2);

  var all_notes = notes.concat(notes2).concat(notes4);

  // Helper function to justify and draw a 4/4 voice
  Vex.Flow.Formatter.FormatAndDraw(ctx, stave, all_notes);

  // Render beams
  beam.setContext(ctx).draw();
  beam2.setContext(ctx).draw();

  $('svg').appendTo('#svg');
  $('svg').removeAttr("style");
  var lowestPoint = 0;
  $('svg').children().each(function() {
    var height = $(this).offset().top;
    if (height > lowestPoint) {
      lowestPoint = parseInt(height);
    };
  });
  $('svg').attr("height", lowestPoint);

  $('svg > path').hover(function() {
    $(this).attr("fill", "blue");
  }, function() {
    $(this).attr("fill", "black");
  });

  $('svg > path').click(function() {
    var offset = $(this).offset();
    var commentbox = document.createElement('div');
    var text = document.createElement('textarea');
    text.classList.add("text");
    commentbox.style.left = parseInt(offset.left) + "px";
    commentbox.style.position = "absolute";
    text.style.display = "block";
    var button = document.createElement("button");
    button.innerHTML = "Submit";
    button.classList.add("submit")
    commentbox.appendChild(text);
    commentbox.appendChild(button);
    $(button).click(function() {
      var comment = $('.text').val();
      $(commentbox).html(comment);
    });
    $('#comments').append(commentbox);
  });

	// notes.push(new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "4"}));
	//   // for (var i = 0; i < 3; i++) {
	//   // 	notes.push(new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }))	
	//   // }
	//   global_voice.addTickables(notes);

	//   global_voice.tickables[0].onmouseover = changeColor;

	//   function changeColor() {
	//   	console.log("my color changed yay!");
	//   }

 //  // Format and justify the notes to 500 pixels
 //  var formatter = new Vex.Flow.Formatter().
 //  joinVoices([global_voice]).format([global_voice], 500);

 //  // Render voice
 //  global_voice.draw(ctx, stave);
 //  // voice2.draw(ctx, stave);

 function makenote() {
 	document.getElementById("canvas").getContext("2d").clearRect(0,0,canvas.width,canvas.height);
 	var stave = new Vex.Flow.Stave(10, 0, 500);
 	stave.addClef("treble").setContext(ctx).draw();
 	var name = $('#name').val();
 	var duration = $('#duration').val();
 	var note = new Vex.Flow.StaveNote({ keys: [name + "/4"], duration: duration});
 	for (var i = 0; i < global_voice.tickables.length; i++) {
 		if (global_voice.tickables[i].isRest()) {
 			global_voice.tickables[i] = note;
 			fillWithRests(global_voice);
 			break;
 		}
 	}
 	var formatter = new Vex.Flow.Formatter().
 	joinVoices([global_voice]).format([global_voice], stave.getWidth());

 	global_voice.draw(ctx, stave);
 }

// function fillWithRests(voice) {
// 	var totalBeats = 0;
// 	var totalBeatsAllowed = 1;
// 	for (var i = 0; i < voice.tickables.length; i++) {
// 		if (!voice.tickables[i].isRest()) {
// 			var duration = 1 / parseInt(voice.tickables[i].duration);
// 			console.log("I am " + duration + " long");
// 			totalBeats += duration;
// 		} else if (totalBeats + 0.25 > totalBeatsAllowed) {
// 			voice.tickables.pop();
// 			console.log("I popped!");
// 		} else {
// 			voice.tickables[i] = new Vex.Flow.StaveNote({keys: ["b/4"], duration: "qr"});
// 			totalBeats += 0.25;
// 		}
// 		console.log("totalBeats: " + totalBeats);
// 		console.log("totalBeatsAllowed: " + totalBeatsAllowed);
// 	}
// }
});

// Create a voice in 4/4
function create_4_4_voice() {
	return new Vex.Flow.Voice({
		num_beats: 4,
		beat_value: 4,
		resolution: Vex.Flow.RESOLUTION
	});
}