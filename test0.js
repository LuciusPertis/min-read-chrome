function splitStringWithTags(str) {
  let result = [];
  let current = "";
  let inTag = false;

  if (str.includes('<s1>') || str.includes('<s2>') || str.includes('<s3>'))
    return null;
  
  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i);
    
    if (char === "<") {
      if (current) {
        result.push(current);
        current = "<";
      }
      inTag = true;
    } else if (char === ">") {
      current += char;
      result.push(current);
      current = "";
      inTag = false;
    } else {
      current += char;
    }
  }
  
  if (current) {
    result.push(current);
  }
  
  return result;
}

function spanAdd(p) {
  let psplit = splitStringWithTags(p.innerHTML);   
  if (psplit==null) return "// not changed";

  for (let i=0; i<psplit.length; i++) {
      if(psplit[i][0].includes('<') || psplit[i].length < 5) continue;
  
  words = psplit[i].split(' ');
  
  for (let j=0; j<words.length; j++){
    if (words[j].length < 3) continue;
    
    words[j] =  '<s1>'+words[j][0]+'</s1>'+
                '<s2>'+words[j][1]+'</s2>'+
                '<s3>'+words[j][2]+'</s3>'+
                '<s4>'+words[j].substr(3)+'</s4>';
  }
    
      psplit[i] = words.join(' ');
  }

  p.innerHTML = psplit.join('');
  return psplit.join('');
}

function setall() {
  let s0 = '<style>s1{font-size:32px;}s2{font-size:26px;}s3{font-size:22px;}s4{font-size:12px;}</style>'
  head = document.querySelector('head');
  head.innerHTML = s0 + head.innerHTML;

	//for (let i=0, divs=document.querySelectorAll('body div'); i<divs.length; i++) {
	//	let pTags = divs[i].getElementsByTagName("p");
	for ( let i=0, pTags=document.body.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", 'p');
        i < pTags.length; i++){
  
		for (let j = 0, flag=1; j < pTags.length; j++) {
			try{
        flag=1; 
				console.log(pTags[j].innerHTML);
			} catch(err) {flag=0;} 
      
      if(flag){
				console.log(spanAdd(pTags[j]));
				console.log(i, j);
      }
    }
	}
}

function listAllDivs() {
	divs=document.querySelectorAll('body div');
	
	for (let i=0; i<divs.length; i++) {
		let pTags = divs[i].getElementsByTagName("p");
		for (let j = 0; j < 10; j++) {
			try{
				console.log(pTags[j].innerHTML);
				//console.log(spanAdd(pTags[j]));
				console.log(i, j);
			} catch(err) {} 
	  }
	}

	return divs;
}