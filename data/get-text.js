self.port.on("text_pass", function (arg) {
  var textArea = document.getElementById('edit-box');

    var i;
var j;
var  iastText =arg.toLowerCase();

var arrDV = new Array("अं", "अः", "अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ॠ", "ऌ", "ॡ", "ए", "ऐ", "ओ", "औ", "ा", "ि", "ी", "ु", "ू", "ृ", "ॄ", "ॢ", "ॣ", "े", "ै", "ो", "ौ", "ख", "क", "घ", "ग", "ङ", "छ", "च", "झ", "ज", "ञ", "ठ", "ट", "ड", "ढ", "ण", "थ", "त", "ध", "द", "न", "फ", "प", "भ", "ब", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह");

  var arrIAST =new Array ("aṃ", "aḥ", "a", "ā", "i", "ī", "u", "ū", "ṛ", "ṝ", "ḷ", "ḹ", "e", "ai", "o", "au", "ā", "i", "ī", "u", "ū", "ṛ", "ṝ", "ḷ", "ḹ", "e", "ai", "o", "au", "kh", "k", "gh", "g", "ṅ", "ch", "c", "jh", "j", "ñ", "ṭh", "ṭ", "ḍ", "ḍh", "ṇ", "th", "t", "dh", "d", "n", "ph", "p", "bh", "b", "m", "y", "r", "l", "v", "ś", "ṣ", "s", "h");
var strTemp;

        for (i = 29; i <= 61; i++) //Loop for consonants
        {
            for (j = 16; j <= 28; j++) //Loop for matras
            {
                strTemp = arrIAST[i] + arrIAST[j];
                iastText = iastText.replace(strTemp, arrDV[i] +  arrDV[j]); //Replacing barhkhadi except full varnas
            }
        }
  for ( i = 29; i <= 61; i++) {
            strTemp = arrIAST[i] + "a";
            iastText = iastText.replace(strTemp, arrDV[i]); //Replacing full varnas
        }
  
  for (i = 0; i <= 15; i++) {
            strTemp = arrIAST[i];
            iastText = iastText.replace(strTemp, arrDV[i]); //Replacing vowels, anushwara and visharga
        }

        for ( i = 29; i <= 61; i++) {
            strTemp = arrIAST[i];
            iastText = iastText.replace(strTemp, arrDV[i] + "्"); //Replacing halant varnas
        }

 iastText = iastText.replace("ṃ", "ं"); //Replacing anushwar sign on consonants
 iastText = iastText.replace("ḥ", "ः"); //Replacing visharga sign on consonants
 iastText = iastText.replace("'", "ऽ"); //Replacing visharga sign on consonants
 textArea.value.replace(/(\r\n|\n|\r)/gm,"");
  textArea.value= iastText;
});