	
var InteractiveTranscriptionGenerator = require('./interactive_transcription_generator/index.js')

var keys = require("/Users/pietropassarelli/Dropbox/CODE/Vox/TBVE/autoEdit_v2/wttskeys.json")

var iTg = new InteractiveTranscriptionGenerator();


iTg.generate({
	videoUrl: "/Users/pietropassarelli/Desktop/Demo_media/Vox.com/norman\ door/norman_door_trimmed2.mp4",
	// videoUrl: "/Users/pietropassarelli/Movies/VideoNow/Video\ Now\ Report\ \(2014\)-\ \ An\ interview\ with\ Brian\ Storm\ Founder\ \&\ Executive\ Producer\ MediaStorm\ -\ MediaStorm-HD.mp4",
	title: "Normna Door Trimmed",
	description: "Testing out this module ", 
	tmpWorkFolder: "/",
	destFolder:"/" ,
	keys: keys,
	cbTranscription: function(resp){
		console.log(JSON.stringify(resp))
	}, 

	cbMetadata:function(resp){
		console.log(resp)
	},
	cbVideo: function(resp){
		console.log(resp)
	}
})



iTg.generate({
	videoUrl: "/Users/pietropassarelli/Desktop/Demo_media/Vox.com/norman\ door/norman_door_trimmed.mp4",
	// videoUrl: "/Users/pietropassarelli/Movies/VideoNow/Video\ Now\ Report\ \(2014\)-\ \ An\ interview\ with\ Brian\ Storm\ Founder\ \&\ Executive\ Producer\ MediaStorm\ -\ MediaStorm-HD.mp4",
	title: "Normna Door Trimmed",
	description: "Testing out this module ", 
	tmpWorkFolder: "/",
	destFolder:"/" ,
	keys: keys,
	cbTranscription: function(resp){
		console.log(JSON.stringify(resp))
	}, 

	cbMetadata:function(resp){
		console.log(resp)
	},
	cbVideo: function(resp){
		console.log(resp)
	}
})



transcription_generate({
        id: transcription._id,
        videoUrl: newElement.videoUrl,
        title: newElement.title,
        description: newElement.description,
        //TODO: this is hardcoded, and this variable is not used, fix me!
        // tmpWorkFolder:"/",
        // destFolder:"/media",
        tmpWorkFolder: tmpMediaFolder,
        destFolder: mediaFolder,
        keys: global.keys,
        languageModel: newElement.languageModel,
        sttEngine: newElement.sttEngine,
        cbMetadata:function(respM){
          meta = respM;
          //update current transcription with metadata data
          Transcription.findOne({ _id: transcription._id }, function (err, trs) {
            console.info("got metadata for transcription: "+transcription._id)
            trs.metadata = respM;
            //saving current transcription
            trs.save(function(err) {
              // app.trigger('updateTranscription:'+trs._id);
            });
          });
        },
        cbTranscription: function(resp){
          //updating current transcription with transcription json.
          Transcription.findOne({ _id: resp.id }, function (err, trs) {
            console.info("got transcription json for transcription: "+ trs._id);
            //updating transcription attributes with result
            trs.audioFile = resp.audioFile;
            trs.processedAudio = resp.processedAudio;
            trs.text = resp.text;
            trs.status = resp.status;
            //saving current transcription 
            trs.save(function(err) {
              // app.trigger('updateTranscription:'+trs._id);
            });
          });
        },
        cbVideo: function(resp){
          //updating current transcription with webm html5 video preview.
          Transcription.findOne({ _id: transcription._id}, function (err, trs) {
            console.info("got video webm back for transcription: "+ trs._id);
            //updating transcription attributes with result
            trs.videoOgg = resp.videoOgg;
            trs.processedVideo = resp.processedVideo;
            //saving current transcription 
            trs.save(function(err) {
              // app.trigger('updateTranscription:'+trs._id);
            });
          });
        }
      });