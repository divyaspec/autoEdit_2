/**
* Form for creating a new transcription
*/
var app = app || {};

app.TranscriptionFormView = Backbone.View.extend({
  template: _.template($('#transcriptionFormTemplate').html()), 
  events :{
  	'click #submitBtn': 'save',
    'click #gentleSetupLink': "gentleSetupLink"
  },

  save: function(e){
  	e.preventDefault();

    var sttEngine; 

    //reading values from form 
    var newTitle        = this.$('input[name=title]').val();
    var newDescription  = this.$('textarea[name=description]').val();;
    var newFilePath     = this.$('input[name=file]').val();
    var newLanguage     = $('#languageModel').find(":selected")[0].value;

    if($('#IBMoption')[0].checked){
      sttEngine= "ibm";
    }else if($('#genelteOption')[0].checked){
       sttEngine= "gentle";
    }
    
    var newSTTLanguage = $('#IBMoption')[0].checked

  	this.model.save({title: newTitle, description: newDescription,videoUrl:newFilePath, languageModel: newLanguage, sttEngine: sttEngine},{
      success: function(mode, response, option){      
           Backbone.history.navigate("transcriptions", {trigger:true}); 
      },
      error: function(model, xhr,options){
        var errors = JSON.parse(xhr.responseText).errors;
        alert("ops, something when wrong with saving the transcription:" + errors)
      }
    });
  },

  gentleSetupLink: function(){
    var url = "https://opennewslabs.github.io/autoEdit_2/user_manual/setup.html#gentle-stt-open-source-free-and-offline"
    //in nwjs mode 
    if( window.frontEndEnviromentNWJS ){
      require('nw.gui').Shell.openExternal(url);
    //in browser mode, eg demo 
    }else{
      var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
      var win = window.open(url, "_blank", strWindowFeatures);
    }
  },

  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});
