
const getButton=( name,tooltip,id,eventname,buttonClickEventHandler)=>{
    const span=document.createElement("span");
     const addbtnText = document.createTextNode(name);
     span.classList.add("material-symbols-outlined");
     span.classList.add("md-24");
     span.append(addbtnText);
     const addbtn = document.createElement("span");
     // addbtn.setAttribute("data-feather","circle");
     addbtn.setAttribute("id",name+"_"+id)
     addbtn.appendChild(span);
     addbtn.setAttribute("data-title",tooltip);
     console.debug("buttonClickEventHandler fucntion to add to button");
     console.debug(buttonClickEventHandler);
     if(buttonClickEventHandler!=undefined)
     addbtn.addEventListener(eventname,buttonClickEventHandler)
     return addbtn;
  }
  export{getButton}