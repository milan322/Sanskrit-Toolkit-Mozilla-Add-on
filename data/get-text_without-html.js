self.port.on("text_pass", function (arg) {
  var textArea = document.getElementById('edit-box');
//textArea.value.replace(/(\r\n|\n|\r)/gm,"");
  //textArea.value=arg;
var allHtmlData=arg;
var response="";
var noHtmlTag="";
noHtmlTag=allHtmlData.replace(/<\/?[^>]+(>|$)/g, "");
              // noHtmlTag=allHtmlData.replace(/<\/?[^>]+(>|$)/g, "");

var re = /&nbsp;/g;
response=noHtmlTag.replace(re," ");
var h1="";
var h2="";
  var re1 = (/\((H1|H1A|H3|H3A|H1B|H3B|H2B|H2|H2A|H4|H4B|H4A)\)/g);
h1=response.replace(re1,"");

/*var str=h1;
var startIndex = str.indexOf("[p=");
var endIndex = str.indexOf("]");
var replacement = "";
var toBeReplaced = str.substring(startIndex, endIndex+1);
//alert(str.replace(toBeReplaced, replacement));
var result=str.replace(toBeReplaced, replacement);*/
var re2= /\[(.*?)\]/g;
var output=h1.replace(re2,"");
var re3=/^\s*[\r\n]/gm; //remove all square brackets content
var output1=output.replace(re3,"");
var re4=/&quot;/g;
var output2=output1.replace(re4,"");
var output3=output2.replace(/ +(?= )/g,'');
textArea.value=output3;


});