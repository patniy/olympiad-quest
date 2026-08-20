(() => {
  function makeFallback(subject,section){
    if(subject==="Math")return{s:subject,section,d:1,q:"Which number is 5 more than 10?",o:["12","15","20","25"],a:1,e:"10 + 5 = 15."};
    return{s:subject,section,d:1,q:"Which choice is related to "+section+"?",o:[section,"Banana","Pencil","Shoe"],a:0,e:"The first choice matches the selected topic."};
  }
  function expand(){
    if(typeof QUESTIONS==="undefined"||typeof TOPICS==="undefined")return;
    Object.keys(TOPICS).forEach(subject=>(TOPICS[subject]||[]).forEach(item=>{
      const section=Array.isArray(item)?item[0]:item;
      let bank=QUESTIONS.filter(q=>q.s===subject&&q.section===section);
      if(!bank.length){QUESTIONS.push(makeFallback(subject,section));bank=QUESTIONS.filter(q=>q.s===subject&&q.section===section)}
      let i=0;
      while(bank.length<15){
        const copy=JSON.parse(JSON.stringify(bank[i%bank.length]));
        copy.d=(bank.length%10)+1;
        copy.q="⭐ "+copy.q;
        QUESTIONS.push(copy);bank.push(copy);i++;
      }
    }));
    try{if(typeof renderTopics==="function")renderTopics();if(typeof showLesson==="function")showLesson();if(typeof loadQuestion==="function"&&typeof topic!=="undefined"&&topic)loadQuestion()}catch(e){}
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",expand);else expand();
})();