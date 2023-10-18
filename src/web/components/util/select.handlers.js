const handleChildDropDownSelect =(event,secc,dataFunctions)=>{

   // alert("under change of select");
   // console.debug("event target on select ");
   // console.debug(event.target);
  let row=event.target.parentNode.parentNode;
  row.classList.add("active-row");
   let selectElments=row.querySelectorAll('select[prnt="'+event.target.name+'"]');
   // console.debug("select elements are:");
   selectElments.forEach(seleEle=>{
      // console.debug("EACH SELECT ELE IS: handle child drop down select");
      // console.debug(seleEle);
   })
   
   // let itemService= new ItemService();
Array.from(selectElments).forEach(ele=>{
   let col=ele.getAttribute("coll");
   let coltyp=ele.getAttribute("coll_typ");
   
   dataFunctions.getOnParent(secc,col,coltyp,event.target.value).then(resp=>{
      // console.debug("REPSONE OF DOMAIN LIST:getOnParent");
      // console.debug(JSON.stringify(resp));
      // console.debug("ele is");
      // console.debug(ele);
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
  
const handleFileDownload=(event,secc,dataFunctions)=>{
//   console.log(  "handle-file download secc is:",secc);
   // console.log("parent node of clicked event:",event.target.parentNode.parentNode);
   let fieldStatusId=event.target.parentNode.parentNode.id;
   // let itemservice=new ItemService();
   let filename=event.target.textContent;
   // console.log("file name:",filename);
   // itemservice.getfile
   dataFunctions.getExportedFiles(secc,"records","product_catalog_export_file",fieldStatusId,filename);

}
  const  handleChildXORDropDownSelect =(event,dataFunctions)=>{

   // alert("under change of select");
   // console.debug("event target on select ");
   // console.debug(event.target);
  let row=event.target.parentNode.parentNode;
  row.classList.add("active-row");
   let selectElments=row.querySelectorAll('select[prnt="'+event.target.name+'"]');
   // console.debug("select elements are:");
   selectElments.forEach(seleEle=>{
      // console.debug("EACH SELECT ELE IS: ON XOR Drop down select");
      // console.debug(seleEle);
   })
   
   // let itemService= new ItemService();
Array.from(selectElments).forEach(ele=>{
   let col=ele.getAttribute("coll");
   let coltyp=ele.getAttribute("coll_typ");
   
   dataFunctions.getOnParentAsXOR(col,coltyp,event.target.value).then(resp=>{
      // console.debug("REPSONE OF DOMAIN LIST:getOnParentAsXOR");
      // console.debug(JSON.stringify(resp));
      // console.debug("ele is");
      // console.debug(ele);
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
   export {handleFileDownload,handleChildDropDownSelect,handleChildXORDropDownSelect}