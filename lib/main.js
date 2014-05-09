var widgets = require('widget')
    , pageMod = require('page-mod')
    , panels = require('panel')
    , cm = require('context-menu')
    , tabs = require('tabs')
    , data = require('self').data
    , _ = require('l10n').get
    , translator = require('translator')
    , Languages = require('languages')
    , simple_prefs = require('simple-prefs')
    , prefs = require('preferences-service')
    , prefs_branch = 'extensions.translator@dontfollowme.net'; 
var Request = require("request").Request;
var contextMenu = require("context-menu");

exports.main = function (options, callbacks) {
    /* {{{ First-Run */
    if ('startup' != options.loadReason) {
        Languages.setup();
    }

    /* }}} */
    /* {{{ Settings */
    simple_prefs.on('FavoriteLanguages', function () {
        LanguagesPanel.show();
        
        LanguagesPanel.port.emit('init', {
            languages : Languages.languages,
            favorites : Languages.getFavorites(),
            tts_langs : Languages.speakLanguages,
        });
    });


/*var panelKeyboard = require("panel").Panel({
  width:550,
  height: 500,
contentURL: data.url("Key_Layout.html"),
contentScriptFile: data.url("panel_keyLayout.js")
});*/




    var LanguagesPanel = panels.Panel({
        width: 380,
        height: 280,
        contentURL : data.url('favorite-languages.html'),
        contentScriptFile : data.url('favorite-languages.js')
    });

    LanguagesPanel.port.on('close', function () {
        LanguagesPanel.hide();
    });

    LanguagesPanel.port.on('save', function (favs) {
        Languages.saveFavorites(favs);
        LanguagesPanel.hide();
    });
    

    /* }}} */
    /* {{{ Text Translation */
    var onTranslateText = function (text) {
        textTranslatePanel.show();
        textTranslatePanel.port.emit('init', {
            text : text,
            languages : Languages.languages,
            favorites : Languages.getFavorites(),
            speakLanguages : Languages.speakLanguages,
            locales : {
                'Original_Text' : _('Original_Text'),
                'To' : _('To'),
                'From' : _('From'),
                'Unknown' : _('Unknown'),
                'Translation_Error' : _('Translation_Error'),
                'Close' : _('Close')
            }
        });
    };
var panel2 = require("panel").Panel({
  width:550,
  height: 500,
contentURL: data.url("get_DevWords.html"),
contentScriptFile: data.url("get_DevWords.js")
});
    cm.Item({
       // label : _('Translate_This_Text'),
       label : _('Translate_This_Text(using Google translate)'),
        image : data.url('images/icons/sansk1.ico'),
        context : cm.SelectionContext(),
        contentScript : 'self.on("click", function () { self.postMessage(window.getSelection().toString());});',
        onMessage : onTranslateText
    });
 
cm.Item({
  label: "Find Devanagari Text",
image : data.url('images/icons/sansk1.ico'),
 contentScript: 'self.on("click", function (node, data) {' +
                 ' var divs = document.getElementsByTagName("html")[0].innerHTML;'+'self.postMessage(divs)'+'});',
  onMessage: function (pageURL) {
// findDevanagariText();
console.log("inside function:",pageURL);
  panel2.show();
panel2.port.emit("Dev_Text",pageURL);
  }
});
  
var menuItem = contextMenu.Item({
    label: "Search Text(Details)",
    // Show this item when a selection exists.
  image : data.url('images/icons/sansk1.ico'),
    context: contextMenu.SelectionContext(),
    // When this item is clicked, post a message back with the selection
    contentScript: 'self.on("click", function () {' +
                   '  var text = window.getSelection().toString();' +
                   '  self.postMessage(text);' +
                   '});',
    // When we receive a message, look up the item
    onMessage: function (item) {
      console.log('looking up "' + item + '"');
      lookup(item);
    }
    
  });
  function lookup(item) {
  var wikipanel = panels.Panel({
    width: 620,
    height: 420,

 contentURL: "http://www.sanskrit-lexicon.uni-koeln.de/monier/webtc5/monier.php?key="+item+"&keyboard=yes&inputType=unicode&unicodeInput=devQWERTY&phoneticInput=slp1&serverOptions=deva&viewAs=deva"
  });
  wikipanel.show();
}

var panel = panels.Panel({
  width:400,
  height: 300,
contentURL: data.url("text-entry.html"),
contentScriptFile: data.url("get-text.js")
});
   var menuItem1 = contextMenu.Item({
    label: "Transliteration",
    image : data.url('images/icons/sansk1.ico'),
      // Show this item when a selection exists.
        context: contextMenu.SelectionContext(),
    // When this item is clicked, post a message back with the selection
            contentScript: 'self.on("click", function () {' +
                   '  var text = window.getSelection().toString();' +
                   '  self.postMessage(text);' +
                   '});',
    // When we receive a message, look up the item
    onMessage: function (item) {
      console.log('Translating "' + item + '"');

 panel.show();
panel.port.emit("text_pass",item);
    }
    
  });


var panel1 = panels.Panel({
  width:400,
  height: 300,
contentURL: data.url("get_syllable.html"),
contentScriptFile: data.url("get_syllablification.js")
});

var menuItem2 = contextMenu.Item({
    label: "Syllabification of Sanskrit Text",
   image : data.url('images/icons/sansk1.ico'),
    // Show this item when a selection exists.
    context: contextMenu.SelectionContext(),
    // When this item is clicked, post a message back with the selection
    contentScript: 'self.on("click", function () {' +
                   '  var text = window.getSelection().toString();' +
                   '  self.postMessage(text);' +
                   '});',
    // When we receive a message, look up the item
    onMessage: function (item) {
      console.log('Syllabificate "' + item + '"');

 panel1.show();
panel1.port.emit("text_pass_syllabify",item);
    }
    
  });
    var textTranslatePanel = panels.Panel({
        width: 400,
        height: 320,
        contentURL : data.url('translate-text.html'),
        contentScriptFile : [data.url('jquery-1.8.2.min.js'), data.url('translate-text.js')],
    });

var panel_without_html = panels.Panel({
  width:580,
  height: 500,
contentURL: data.url("text-entry-without-html.html"),
contentScriptFile: data.url("get-text_without-html.js")
});
var menuItem3 = contextMenu.Item({
    label: "Search this Sanskrit Text(Without Html tag, Line no, Page num )",
   image : data.url('images/icons/sansk1.ico'),
    // Show this item when a selection exists.
    context: contextMenu.SelectionContext(),
    // When this item is clicked, post a message back with the selection
    contentScript: 'self.on("click", function () {' +
                   '  var text = window.getSelection().toString();' +
                   '  self.postMessage(text);' +
                   '});',
    // When we receive a message, look up the item
    onMessage: function (item) {
      console.log('Search this Sanskrit Text "' + item + '"');
 var quijote = Request({
   url:"http://www.sanskrit-lexicon.uni-koeln.de/monier/webtc5/monier.php?key="+item+"&keyboard=yes&inputType=unicode&unicodeInput=devQWERTY&phoneticInput=slp1&serverOptions=deva&viewAs=deva",
  overrideMimeType: "text/plain; charset=utf",
  onComplete: function (response) {
    console.log(response.text);
panel_without_html.show();
panel_without_html.port.emit("text_pass",response.text);
  }
});
quijote.get();
    }
    
  });



var panel_4 = panels.Panel({
  width:500,
  height: 500,
contentURL: data.url("sanskrit_analysis.html"),
contentScriptFile: data.url("get_SanskritAnalysis.js")
});
var menuItem4 = contextMenu.Item({
    label: "Analyze the Sanskrit Text",
   image : data.url('images/icons/sansk1.ico'),
    // Show this item when a selection exists.
    context: contextMenu.SelectionContext(),
    // When this item is clicked, post a message back with the selection
    contentScript: 'self.on("click", function () {' +
                   '  var text = window.getSelection().toString();' +
                   '  self.postMessage(text);' +
                   '});',
    // When we receive a message, look up the item
    onMessage: function (item) {
      console.log('Analyzing "' + item + '"');

 panel_4.show();
panel_4.port.emit("text_pass_forAnalysis",item);
    }
    
  });
    textTranslatePanel.on('hide', function () {
        textTranslatePanel.port.emit('hide');
    });

    textTranslatePanel.port.on('close', function () {
        textTranslatePanel.hide();
    });

    textTranslatePanel.port.on('translate', function (options) {
        translator.text(options, function (data) {
            textTranslatePanel.port.emit('translation-complete', {
                result : data.result,
                status: data.status,
                to : options.to  
            });
        });
    });
    
    textTranslatePanel.port.on('detect', function (text) {
        translator.detect(text, function (data) {
            textTranslatePanel.port.emit('detect-complete', data.json);
        });
    });

  

    textTranslatePanel.port.on('save-favorites', function (favorites) {
        Languages.saveFavorites(favorites);
    });
        
    
   require("widget").Widget({
  id: "panel",
  label: "Sanskrit Toolkit",
  contentURL: data.url("sansk1.ico"),
  onClick: function() {
  tabs.open(data.url("sanskrit.html"));
  }
});

};
