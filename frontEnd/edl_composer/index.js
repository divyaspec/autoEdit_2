/**
* @module edl_composer
*
* @author Pietro Passarelli 
* @description  file ELD composer to create Edit Decision List. EDL, Edit Decision List, is a plain text format that describes a video sequence. It can be opened in a video editing software to reconnect media to assemble a video sequence.
* [Apple EDL spec]{@link https://documentation.apple.com/en/finalcutpro/usermanual/index.html#chapter=96%26section=1%26tasks=true  {@link https://documentation.apple.com/en/finalcutpro/usermanual/index.html#chapter=96%26section=1%26tasks=true  }
*
* >"In an EDL, each clip in your sequence is represented by a line of text called an event, which has a unique event number. A clip in an EDL is defined by a source reel name and two pairs of timecode In and Out points. The first pair of timecode numbers describes the source tape (or clip) In and Out points. The second pair describes the timecode location where that clip should be placed onto a master tape (or Timeline)."
*
* The EDL class here represents the EDL as an Object. That can take in a json sequence to generate a string conforming to the specs described above.
* Example usage, takes in a sequence. and `.compose()` is ued to generate the EDL.
@example <caption>Example Usage</caption>
var fs = require("fs");

//given a EDL sequence as json 
var edlSqDemo = {
    "title": "Demo Title of project",
    //offset is optional default is "00:00:00:00"
    "offset": "00:00:28:08",
    "events":  [
      { "id":1,
        "startTime": 10,
        "endTime": 20,
        "reelName":"SomeReelName",
        "clipName":"Something.mov"
      },
      { "id":2,
        "startTime": 45,
        "endTime": 55,
        "reelName":"SomeOtherReelName",
        "clipName":"SomethingElse.mov"
      },
        { "id":2,
        "startTime": 45,
        "endTime": 55,
        "reelName":"NA",
        "clipName":"SomethingElse.mov"
      }
    ]
}
//instantiate edl object
var edl = new EDL(edlSqDemo)

// create content of EDL file
console.log(edl.compose())
// or write conte of edl to edl file
fs.writeFileSync("edl_example.edl", edl.compose(), 'utf8');

* @example <caption>Example EDL</caption>
TITLE: TEST PAPEREDIT
FCM: NON-DROP FRAME

001  SomeRee AA/V  C        00:02:26:21 00:02:30:12 00:00:00:00 00:00:03:16
* FROM CLIP NAME:  Something.mov
* COMMENT:
FINAL CUT PRO REEL: SomeReelName REPLACED BY: SomeRee

002  SomeOthe AA/V  C        00:02:30:12 00:02:34:13 00:00:03:16 00:00:07:17
* FROM CLIP NAME:  SomethingElse.mov
* COMMENT:
FINAL CUT PRO REEL: SomeOtherReelName REPLACED BY: SomeOthe

003  AX AA/V  C        00:02:30:12 00:02:34:13 00:00:03:16 00:00:07:17
* FROM CLIP NAME:  SomethingElse.mov
* COMMENT:

* @tutorial EDL_format
* @todo Write documentation.
* @todo add error handling and error callbacks
*/

/**
* Represents an EDL Object.
* @constructor
* @param {Object} config - EDL video sequence as JSON
* @param {string} config.title - Title of the EDL video sequence
* @param {string} config.offset - The camera timecode, eg free run, rec run, time of day, repsent a time offset from the time relative to the beginning of the video file timeline. in format of timecode eg "00:00:28:08" such as "hh:mm:ss:ms" because that's how cameras write it in the metadata of the file. if it is  "NA" then it uses default 0.
* @param {Object[]} config.events - array of video segment makind up the EDL sequence
* @param {string} config.events[].id - "id" of video segment
* @param {number} config.events[].startTime - start time of video segment in seconds
* @param {number} config.events[].endTime - end time of video segment in seconds
* @param {string} config.events[].reelName - reel name of video segment, generally the name of the card the footage was filmed on or not available
* @param {string} config.events[].clipName - file name that the video segment belongs to. Only file name. no path.
* @returns {stirng} EDL - and EDL string that can written to file to import EDL into video editing software.
*/
var EDL = function (config){
  //creating head of EDL with project title.
  this.head = "TITLE: "+config.title+"\nFCM: NON-DROP FRAME\n\n";
  //by default setting offset to zero, equivalent to as if it was "00:00:00:00"
  this.offset = 0;
  //if offset exists
  if(config.offset!= "NA"){
    //converting offset to seconds
    this.offset = toSeconds(config.offset) ;
  }
  //creating body of the EDL 
  this.body = function(){
    //startime relative to EDL sequence always starts from zero, equivvalent to "00:00:00:00" 
    var startTimecode =0 ;
    //story EDL sequence segments in array
    var edlBody = [];
    //iterate over sequence events segments to make the edl body
    for(var j = 0; j < config.events.length; j++){
      var event =  config.events[j];
      //creating EDL Lines, startTimecode passed as second param so that it can increment for every line
      var edlLine = new EDLline(event, startTimecode, this.offset)
      //set startTimecode to increment for next line by keeping value of current.
      startTimecode = edlLine.tapeOut();
      //transform segment into string 
      edlBody.push(edlLine.compose());
    }
      return edlBody.join("");
  }
  //putting the EDL togethere by joining head and body
  this.compose = function(){
    return this.head + this.body();
  }
}
/**
* @constructor
* @description Represents an EDL Line for the EDL body.
* @param {Object[]} config.events - array of video segment makind up the EDL sequence
* @param {string} config.events[].id - "id" of video segment
* @param {number} config.events[].startTime - start time of video segment in seconds
* @param {number} config.events[].endTime - end time of video segment in seconds
* @param {string} config.events[].reelName - reel name of video segment, generally the name of the card the footage was filmed on or not available
* @param {string} config.events[].clipName - file name that the video segment belongs to. Only file name. no path.
* @function {stirng} EDL - and EDL string  for an EDL line.
*/
var EDLline = function(event, tapeIn, offset){
    
  this.offset = offset;

  this.counter = event.id;

  this.n = function(){
    if(this.counter.toString().length ==1 ){
      return "00"+this.counter.toString();
    }else if(this.counter.toString().length ==2){
      return "0"+this.counter.toString();
    }else if(this.counter.toString().length ==3){
      return this.counter.toString();
    }else{
      return this.counter.toString();
    }
  };

  this.startTime = event.startTime;
  this.endTime = event.endTime;

  this.clipInPoint = function(){
    //return convert  this.endTime to TC
    return parseFloat(this.startTime) ;
  };
  this.clipOutPoint = function(){
    //return convert  this.endTime to TC
    return  parseFloat(this.endTime);
  };

  this.reelName = event.reelName;
  this.reelName7digit= function(){
    return this.reelName.split("").slice(0,7).join("")
  };

  this.clipName = event.clipName;

  this.tapeIn = tapeIn;
  
  this.tapeOut = function(){
    var result = (this.tapeIn + (this.clipOutPoint()- this.clipInPoint()));
    return result;
    // return 890;
  };

  this.compose = function(){    
    var res ="";
    //Handling lack of reel name in clip.
    if(this.reelName != "NA" ){
       res =  ""+this.n()+"   "+this.reelName7digit()+"  AA/V  C  "
    }else{
       res =  ""+this.n()+"   "+" AX  AA/V  C  "
    }
    res+=fromSeconds(this.clipInPoint()+this.offset)+" "+fromSeconds(this.clipOutPoint()+this.offset)+" ";
    res+=fromSeconds(this.tapeIn)+" "+fromSeconds(this.tapeOut())+"\n";
    res+= "* FROM CLIP NAME: "+this.clipName+"\n";
    //Handling lack of reel name in clip.
    if(this.reelName != "NA" ){
      res+="FINAL CUT PRO REEL: "+this.reelName+" REPLACED BY: "+this.reelName7digit()+"\n\n";
    }else{
      res+="\n";
    }
    return res;
  }

}


/*
* [Timecode conversion code from and extracted to use outside of npm node modules on client side]{@link  https://www.npmjs.com/package/node-timecodes}
*/

/**
* @funciton padNumber
* @description helper function to make timecode consistent eg 00:05:00:00 vs 00:5:00:00
* @param{nb} digit - integer to make into two digits if not by adding a zero
*/
var padNumber = function (nb) {
  var length = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

  while (('' + nb).length < length) {
    nb = '0' + nb;
  }
  return nb;
}

/**
* @function fromSeconds
* @description helper funciton converts time in seconds to timecode 
* @param{number} seconds - seconds to convdert to 00:00:00:00
* @returns {string} result - returns string "hh:mm:ss:ms" eg "00:00:00:00"
*/
var fromSeconds = function (seconds) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var defaultFrameRate = 25;
  var _ref$frameRate = _ref.frameRate;
  var frameRate = _ref$frameRate === undefined ? defaultFrameRate : _ref$frameRate;
  var _ref$ms = _ref.ms;
  var ms = _ref$ms === undefined ? false : _ref$ms;

  var _seconds = parseFloat(seconds) || 0,
      milliseconds = Math.round((_seconds - parseInt(_seconds, 10)) * 10000, 10) / 10;

  var hours = Math.floor(_seconds / (60 * 60), 10),
      mins = Math.floor(_seconds / 60, 10) - hours * 60,
      secs = Math.floor(_seconds - hours * 3600 - mins * 60, 10),
      frame = Math.floor(Math.round(milliseconds / 1000 / (1 / frameRate) * 100) / 100);

  var suffix = ms && padNumber(parseInt(milliseconds, 10), 3) || padNumber(frame, 2);

  return padNumber(hours) + ':' + padNumber(mins) + ':' + padNumber(secs) + ':' + suffix;
}

/**
* @function fromSecondsForSrt
* @description converts time in seconds to timecode for srt file 
* [modified from ]{@link https://github.com/Synchronized-TV/node-timecodes/blob/master/src/toSeconds.js}
* @param{number} seconds - seconds to convdert to 00:00:00,00
* @returns {string} result - returns string "hh:mm:ss:ms" eg "00:00:00,00"
*/
var fromSecondsForSrt = function (seconds) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var defaultFrameRate = 25;
  var _ref$frameRate = _ref.frameRate;
  var frameRate = _ref$frameRate === undefined ? defaultFrameRate : _ref$frameRate;
  var _ref$ms = _ref.ms;
  var ms = _ref$ms === undefined ? false : _ref$ms;

  var _seconds = parseFloat(seconds) || 0,
      milliseconds = Math.round((_seconds - parseInt(_seconds, 10)) * 10000, 10) / 10;

  var hours = Math.floor(_seconds / (60 * 60), 10),
      mins = Math.floor(_seconds / 60, 10) - hours * 60,
      secs = Math.floor(_seconds - hours * 3600 - mins * 60, 10),
      frame = Math.floor(Math.round(milliseconds / 1000 / (1 / frameRate) * 100) / 100);

  var suffix = ms && padNumber(parseInt(milliseconds, 10), 3) || padNumber(frame, 2);

  return padNumber(hours) + ':' + padNumber(mins) + ':' + padNumber(secs) + ',' + suffix+"0";
}

/**
* @funciton toSeconds
* @description converts timecode to seconds eg "00:00:00:00" -> 0.
* @param{string} seconds - timecode to convert to seconds
* @returns {number} seconds - returns number of seconds 
*/
function toSeconds(timecode, fr){
  //option to convert passing in frame rate
  var frameRate;
  if(fr == undefined){
       frameRate = 25;
  }else{
     frameRate = fr;
  }

  var  tc = timecode.split(':');
  return parseFloat(tc[0] * 60 * 60 + parseInt(tc[1], 10) * 60 + parseInt(tc[2], 10) + parseInt(tc[3], 10) / frameRate);
}


