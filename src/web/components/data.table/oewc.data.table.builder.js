import { getButton } from "../elementbuilders/elebuilders";
import { FormElementsEventHandlersRepo } from "../eventhandlers/event.handlers";
const processTableWithHeader=(d)=>{
    const tbl = document.createElement("table");
    const tblheader = document.createElement("thead");
 
    let relEles = d.getRelElementsOnType("RNDR_MDT");
    const hrow = document.createElement("tr");
    Array.from(relEles.values()).sort((a, b) => a.seqId - b.seqId).forEach(element => {
     let colname=element.name; 
     let hrid=undefined;
     if(element.fields.get("field-value-ref-id")!=undefined){
       hrid=element.fields.get("field-value-ref-id").fieldValue;
     }  if(element.fields.get("default-value-ref-id")!=undefined){
       hrid=element.fields.get("default-value-ref-id").fieldValue;
     }
     if(element.fields.get("form-data-name")!=undefined){
       colname=element.fields.get("form-data-name").fieldValue;
       }
      const cellText = document.createTextNode(`${colname}`);
      const cell = document.createElement("th");
      let inputEle=document.createElement("input");
      if(hrid!=undefined){
       cell.id=hrid;
      }
      inputEle.value=colname;
     //  cell.appendChild(inputEle);
      cell.appendChild(cellText);
      hrow.appendChild(cell);
    });
 
   //  let actioninputEle=document.createElement("input");
   //  actioninputEle.value="Actions"
     const actioncellText = document.createTextNode(`Actions`);
    const actioncell = document.createElement("th");
    actioncell.appendChild(actioncellText);
    hrow.appendChild(actioncell);
 
    tblheader.appendChild(hrow);
    tbl.appendChild(tblheader);
    return tbl;
  }

  
 const getRow=(relEles,ele)=>{
    //ele == database item to work on
     const drow = document.createElement("tr");
     drow.setAttribute("id", ele.getId());
    console.debug("Workkimh mo ele");
    console.debug(ele);
  
     Array.from(relEles.values()).sort((a, b) => a.seqId - b.seqId).forEach(element => {
        console.debug("Creating row wokring on element:");
        console.debug(element);
       let field =undefined;
       let fields=ele.fields;
       let fname=element.name;
       let defaultvalue=undefined;
       let flags=undefined;
       if(element.fields.get("form-data-name")!=undefined){
        fname=element.fields.get("form-data-name").fieldValue;
       }
       if(element.fields.get("default-value")!=undefined){
        defaultvalue=element.fields.get("default-value").fieldValue;
       }
       if(element.fields.get("flags")!=undefined){
        flags=element.fields.get("flags").fieldValue;
       }
       if(fields!=undefined){
        field= fields.get(fname);
       }
       console.debug("fname for field is:");
       console.debug(fname);
       console.debug("working for fields:");
       console.debug(fields);
       
       console.debug("wokring on field");
       console.debug(field);
       let feehr= new    FormElementsEventHandlersRepo();
       let hanlderkey=element.fields.get("element").fieldValue;
       if(element.fields.get("type").fieldValue !=undefined){
        hanlderkey=hanlderkey+"_"+element.fields.get("type").fieldValue;
       }
      //  console.debug('element.fields.get("element").fieldValue+"_"+element.fields.get("type").fieldValue is:::'+element.fields.get("element").fieldValue+"_"+element.fields.get("type").fieldValue);
    let  formEle=getformElement(field, element, feehr.getHandlers(hanlderkey));
      if(defaultvalue!=undefined){
        formEle.setAttribute("value",defaultvalue);
  
      }
      console.debug("falgs for rendering input is:",flags);
      if(flags!=undefined && flags.includes("disabled")){
        formEle.disabled=true;
      }
        drow.appendChild(getTableCellElement(formEle, element));
     });
  
     return drow;
  
   }

   
 const getformElement=( field,element,elementEventListners)=>{
    console.debug("getformElement trying to create form element for:",element);
    console.debug("getformElement trying to create form element for field:",field);
    
       if(element.fields.get("type").fieldValue=="text"){
          let inputEle=document.createElement("input");
          inputEle.setAttribute("type","text");
          inputEle.readOnly=true;
          if(field!=undefined)
          inputEle.value=field.fieldValue;
          console.debug("inputelementeventlisters are: ");
          console.debug(elementEventListners);
          attachEventListeners(inputEle,elementEventListners);
          return inputEle;
  
  
      }else  if(element.fields.get("type").fieldValue=="number"){
        let inputEle=document.createElement("input");
        inputEle.setAttribute("type","number");
        // inputEle.readOnly=true;
        if(field!=undefined)
        inputEle.value=field.fieldValue;
        console.debug("inputelementeventlisters are: ");
        console.debug(elementEventListners);
        attachEventListeners(inputEle,elementEventListners);
        return inputEle;
  
  
    }
  else  if(element.fields.get("type").fieldValue=="radio"){
      let inputEle=document.createElement("input");
      inputEle.setAttribute("type","radio");
      // inputEle.readOnly=true;
      if(field!=undefined)
      inputEle.value=field.fieldValue;
      console.debug("inputelementeventlisters are: ");
      console.debug(elementEventListners);
      attachEventListeners(inputEle,elementEventListners);
      return inputEle;
  
  
  }else  if(element.fields.get("type").fieldValue=="checkbox"){
  
    let inputEle=new ToggleSwitch(field);
    inputEle.setAttribute("type","checkbox");
    console.log("setting checkbox for  element :",element," and filed as :"+field);
    // inputEle.readOnly=true;
    if(field!=undefined)
    inputEle.value=field.fieldValue;
    console.debug("inputelementeventlisters are: ");
    console.debug(elementEventListners);
    attachEventListeners(inputEle,elementEventListners);
    return inputEle;
  
  
  }
   
      else if(element.fields.get("type").fieldValue==undefined || element.fields.get("type").fieldValue=="XOR" ) {
  
        if(element.fields.get("element").fieldValue=="select"){
          let selEle= document.createElement("select");
          console.debug("PROCESSING SELECT ELEMENT FOR:",element);
          console.debug("processing select elemnt :: field:: IS:",field);
          let defoption= document.createElement("option");
          defoption.text="--Select an Option--";
          
          if(element.fields.get("default-value")!=undefined){
            defoption.text= element.fields.get("default-value").fieldValue;
            if(element.fields.get("default-value-ref-id")!=undefined){
            defoption.value= element.fields.get("default-value-ref-id").fieldValue;
            }
          }
          // else {
          //   if(field.fieldValue!=undefined && field.fieldValueRefId!=undefined){
          //     let fieldop= document.createElement("option");
          //     fieldop.text=field.fieldValue;
          
          //     fieldop.value= field.fieldValueRefId;
          //     fieldop.selected=true;
          //     selEle.add(fieldop);
  
          //     }
          // }
          selEle.add(defoption);
          if(element.fields.get("options_dervation_collection_parent")!=undefined){
          selEle.setAttribute("prnt",element.fields.get("options_dervation_collection_parent").fieldValue);
          selEle.setAttribute("coll",element.fields.get("options_dervation_collection").fieldValue);
          selEle.setAttribute("coll_typ",element.fields.get("options_dervation_collection_type").fieldValue);
        }
          // selEle.setAttribute("prnt","domain");
          selEle.name=element.name;
  
         
  
          createSelectOptions(selEle,element,field);
          console.debug("SEL ELEE IS for testing product attribute dropdown for typeS");
          console.debug(selEle);  
          console.debug("EVENT HANDLERS FOR SELECT ELE ARE");
          console.debug(elementEventListners);
          // console.debug();
                attachEventListeners(selEle,elementEventListners);
          console.debug("field in select value data");
          console.debug(field);
          
        //   if(field!=undefined && element.fields.get("options_dervation_collection_parent")!=undefined){
        //   selEle.value=field.id;
        //   // alert("sele value is set to:"+selEle.value+" fieldid is:"+field.id);
        //   console.debug("selEle options are :");
           
        //   // selEle.readOnly=true;
        //   console.debug(JSON.stringify(field.id)+":fieldid");
        //   console.debug("setting sel value to :"+JSON.stringify(selEle.value));
          
  
        // }
          return selEle;
        }else{
        console.debug("elemnt.fields.get(type).fieldValue==undefined"+element.fields.get("type").fieldValue+"for element name:",element);
        console.debug(element);
        throw "elemnt.fields.get(type).fieldValue==undefined"+element.fields.get("type").fieldValue+"for element name:"+element.name;
      }
      }else {
        console.debug("no input element processor found:element.fields.get('type')"+element.fields.get("type").fieldValue+"for element name:",element);
        console.debug(element);
        throw "no input element processor found:element.fields.get('type')"+element.fields.get("type").fieldValue+"for element name:", element;
      }
      // return addbtn;
   }
   
 const getTableCellElement=( formElement,field,buttonEvent)=>{
    console.debug("setting filed-name for:");
    console.debug(field);
    console.debug("setting filed-name for formelement:");
    console.debug(formElement);
    const cell = document.createElement("td");
    let fdname=field.fields.get("form-data-name");

    if(fdname!=undefined)
    cell.setAttribute("field-name",fdname.fieldValue);
    else
    cell.setAttribute("field-name",field.name);
    
    cell.appendChild(formElement);
    return cell;
 }


 const getUpdataRow=(relEles,ele,collection)=>{
    let drow= getRow(relEles,ele);
    const actionbcell = document.createElement("td");
    actionbcell.appendChild(getButton("publish","Publish Updates", ele.getId(), "click", (event) => handleItemUpdate(event, ele,collection)));
    actionbcell.appendChild(getButton("remove","Remove Record", ele.getId(), "click", (event) => handleItemDelete(event, ele,collection)));
  
    actionbcell.classList.add("row-action");
    drow.appendChild(actionbcell);
    return drow;
   }
 
  export {processTableWithHeader,getUpdataRow}