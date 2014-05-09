self.port.on("text_pass_syllabify", function (arg) {
  var txtAreaValue = document.getElementById('edit-box1');
 var i;
var j;
var  sentence = arg;

	
 var signs = "\u0902,\u0903,\u093e,\u093f,\u0940,\u0941,\u0942,\u0943,\u0944,\u0946,\u0947,\u0948,\u094a,\u094b,\u094c,\u094d";

        var limiters = ".\"\'`!;,?";

        var virama = '\u094d';
        var zwj = '\u200d';

        //ArrayList<String> syllables = new ArrayList<String>();
//var syllables=[];
var syllables=new Array();
        for ( i = 0; i < sentence.length; i++) {
            if (sentence.substring(i, i + 1)==(" ")) {
                continue;
            }

            if (i > 0 && sentence.substring(i - 1, i)==(" ")) {
                syllables.push(sentence.substring(i, i + 1));
                continue;
            }
		if (limiters.indexOf(sentence.substring(i, i + 1))!=-1) {
	                syllables.add(sentence.substring(i, i + 1));
	        
	            } 
			
					
                else {
                try {
                    if (syllables.get(syllables.size - 1).charAt(syllables.get(syllables.size - 1).length() - 1) == virama
                            || syllables.get(syllables.size - 1).charAt(syllables.get(syllables.size - 1).length() - 1) == zwj) 
                    {
					
                        syllables.set(syllables.size - 1,syllables.get(syllables.size - 1) + sentence.substring(i, i + 1));
                    } else {
					
                        syllables.set(sentence.substring(i, i + 1));
                    }
                } catch (Except) {
				
                    syllables.push(sentence.substring(i, i + 1));
							
                }
            }

}

txtAreaValue.value=syllables;
});