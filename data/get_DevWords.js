self.port.on("Dev_Text", function (arg) {
  var textArea = document.getElementById('edit-box');
 textArea.value.replace(/(\r\n|\n|\r)/gm,"");
  //textArea.value=arg;
var allHtmlData=arg;
var response="";
var noHtmlTag="";
//noHtmlTag +=allHtmlData.replace("</?\\w++[^>]*+>", "");
//response +=noHtmlTag.replace("&nbsp;","");
//noHtmlTag +=response.replace("\\s+", " ");
var devtext="";
//noHtmlTag=allHtmlData.replace(/<\/?[^>]+(>|$)/ig, "");
noHtmlTag=allHtmlData.replace(/<\/?[^>]+(>|$)/g, "");
	//response=noHtmlTag.replace("&nbsp;","").trim();
	var re = /&nbsp;/g;
	response=noHtmlTag.replace(re,"");
 var c;
 var i=0;
/*noHtmlTag += response.replace("\\s+", " ").trim();
 			  for(i = 0; i <noHtmlTag .length; i++)
 			   {
 				   c = noHtmlTag .charAt(i);
                    
                    if((noHtmlTag .charCodeAt(i)>=2304 && noHtmlTag .charCodeAt(i)<=2431)|| ( c == '\n' || c == ' '))
                    {
                      devtext +=noHtmlTag .charAt(i);
                    }
                }*/
				for(i = 0; i <response .length; i++)
 			   {
 				   c = response.charAt(i);
                    
                    if((response.charCodeAt(i)>=2304 && response.charCodeAt(i)<=2431)|| ( c == '\n' || c == ' '))
                    {
                      devtext +=response.charAt(i);
                    }
                }
//var HighLightedDevnagaridata=devtext.replace("\\s+", " \n").trim();
var HighLightedDevnagaridata=devtext.replace(/(\r\n|\n|\r)/gm, "");
textArea.value=HighLightedDevnagaridata;

});
