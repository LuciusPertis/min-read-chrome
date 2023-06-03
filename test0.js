function splitStringWithTags(str, no_of_init=3) {
  let result = [];
  let current = "";
  let inTag = false;

  for (let t = 0; t < no_of_init+1; t++) 
    if (str.includes(`<m8r8s${t}>`))
      return null;
  
  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i);
    
    if (char === "<") {
      if (current) {
        result.push(current);
      }
      current = "<";
      inTag = true;
    } 
    else if (char === ">") {
      current += char;
      result.push(current);
      current = "";
      inTag = false;
    } 
    else {
      current += char;
    }
  }
  
  if (current) {
    result.push(current);
  }
  
  return result;
}

//deprecated
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

function spanAddg(p, no_of_init=3, least_word_length=3, max_word_length=25) {
  let psplit = splitStringWithTags(p.innerHTML, no_of_init);   
  if (psplit==null) return "// not changed";

  for (let i=0; i<psplit.length; i++) {
    if(psplit[i][0].includes('<') || psplit[i].length < 5) continue;
  
    words = psplit[i].split(' ');
    
    //ToDo: skip brakets and other "" posibile non alphabet characters
    for (let j=0; j<words.length; j++){
      if (words[j].length < least_word_length || words[j].length > max_word_length) continue;
      
      var nw = '', off = 0;
      //while(word[])
      for (let a = 0; a < no_of_init && a < words[j].length; a++) 
        nw = nw + `<m8r8s${a}>`+words[j][a+off]+`</m8r8s${a}>`;
        
      words[j] =  nw + `<m8r8s${no_of_init}>`+words[j].substr(no_of_init)+`</m8r8s${no_of_init}>`;
    }
    
    psplit[i] = words.join(' ');
  }

  p.innerHTML = psplit.join('');
  return psplit.join('');
}

let REVERT_SET = false;
let BODY_MASTER_RESET;

function revert() {
  if (REVERT_SET) document.body.outerHTML = BODY_MASTER_RESET;
}

function setall(no_of_init=3, max_init_size=32, min_init_size=22, trail_size=12, drop_off='exp') {
  //drop off can be
  //  'exp' 'lin'
  
  //create tags
  var tag = '<style>';
  for (let t = 0; t < no_of_init; t++) {
    
    if (drop_off == 'exp') df = 2 
    else df = 1;

    const sttag =  
    `m8r8s${t}{font-size:${~~(
      ((no_of_init-t-1)**df)*(max_init_size-min_init_size)/((no_of_init-1)**df)
      +min_init_size)}px;}`;
    
    tag = tag + sttag;
  } 
  
  let style_tag = tag + `m8r8s${no_of_init}{font-size:${trail_size}px;}</style>`;
  //let style_tag = '<style>s1{font-size:32px;}s2{font-size:26px;}s3{font-size:22px;}s4{font-size:12px;}</style>'
  
  
  head = document.querySelector('head');
  head.innerHTML = style_tag + head.innerHTML;

  if (REVERT_SET == false){ MASTER_RESET = document.body.outerHTML; REVERT_SET=true; }

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
				console.log(spanAddg(pTags[j], no_of_init));
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