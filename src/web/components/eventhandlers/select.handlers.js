
const handleChildDropDownSelect =(event)=>{

   // alert("under change of select");
   console.debug("event target on select ");
   console.debug(event.target);
  let row=event.target.parentNode.parentNode;
  row.classList.add("active-row");
   let selectElments=row.querySelectorAll('select[prnt="'+event.target.name+'"]');
   console.debug("select elements are:");
   selectElments.forEach(seleEle=>{
      console.debug("EACH SELECT ELE IS: handle child drop down select");
      console.debug(seleEle);
   })
   
   let itemService= new ItemService();
Array.from(selectElments).forEach(ele=>{
   let col=ele.getAttribute("coll");
   let coltyp=ele.getAttribute("coll_typ");
   
   itemService.getOnParent(col,coltyp,event.target.value).then(resp=>{
      console.debug("REPSONE OF DOMAIN LIST:getOnParent");
      console.debug(JSON.stringify(resp));
      console.debug("ele is");
      console.debug(ele);
      let defaultph=ele.options[0];

      ele.options.length = 0;
      ele.add(defaultph);
      resp.forEach(itm=>{
         let option = new Option(itm.name, itm.id); 
         ele.add(option);
        
      })
   })
   })
   }
  

//   const  handleChildXORDropDownSelect =(event)=>{

//    // alert("under change of select");
//    console.debug("event target on select ");
//    console.debug(event.target);
//   let row=event.target.parentNode.parentNode;
//   row.classList.add("active-row");
//    let selectElments=row.querySelectorAll('select[prnt="'+event.target.name+'"]');
//    console.debug("select elements are:");
//    selectElments.forEach(seleEle=>{
//       console.debug("EACH SELECT ELE IS: ON XOR Drop down select");
//       console.debug(seleEle);
//    })
   
//    let itemService= new ItemService();
// Array.from(selectElments).forEach(ele=>{
//    let col=ele.getAttribute("coll");
//    let coltyp=ele.getAttribute("coll_typ");
   
//    itemService.getOnParentAsXOR(col,coltyp,event.target.value).then(resp=>{
//       console.debug("REPSONE OF DOMAIN LIST:getOnParentAsXOR");
//       console.debug(JSON.stringify(resp));
//       console.debug("ele is");
//       console.debug(ele);
//       let defaultph=ele.options[0];

//       ele.options.length = 0;
//       ele.add(defaultph);
//       resp.forEach(itm=>{
//          let option = new Option(itm.name, itm.id); 
//          ele.add(option);
        
//       })
//    })
//    })
//    }
   export {handleChildDropDownSelect}