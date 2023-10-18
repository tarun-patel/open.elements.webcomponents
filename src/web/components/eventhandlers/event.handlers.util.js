import { Item, ItemData } from "open.elements.data.ts";
import { getButton } from "../elementbuilders/elebuilders";
// import { getButton } from "./elements.builder.util";

const editRowHandler=(event)=>{
    let formItem=new Item();
    
    let row=event.target.parentNode.parentNode;
    formItem.id=row.id;
    Array.from(row.childNodes).filter(node=> !node.classList.contains("row-action")).forEach(node=>{
        let fieldname=        node.getAttribute("field-name");
        formItem.addData(fieldname,new ItemData(fieldname,node.childNodes[0].value));
    });
    formItem.status="Draft";
        const itemservice= new ItemService();
        itemservice.update("records","product_domain_metadata",formItem);

  }



 const handleItemUpdate=(event,formItem,collection)=>{
    let row=event.target.parentNode.parentNode.parentNode;
  console.debug("handle update : eventtarget is",row);

    Array.from(row.childNodes).filter(node=> !node.classList.contains("row-action")).forEach(node=>{
        let fieldname=        node.getAttribute("field-name");
        formItem.addData(fieldname,new ItemData(fieldname,node.childNodes[0].value));
    });
    formItem.status="Draft";
        const itemservice= new ItemService();
        itemservice.update("records",collection,formItem);

  }

  const handleItemDelete=(event,formItem,collection)=>{
    let row=event.target.parentNode.parentNode.parentNode ;
    console.debug("FORMITEM On handE ITEM ON DELETE IS:");
    console.debug(formItem);
    let prnt=row.getAttribute("prnt");
    // if(prnt!=undefined)
        const itemservice= new ItemService();
        itemservice.delete("records",collection,formItem.id,prnt).then(response=>{
          console.debug("response from itemservice .delete is:");
          console.debug(response);
          row.remove();
        });

  }

  const enableInputHandlerOnTabKey=(event)=>{
    if(event.keyCode==9){
    let inputEle=event.target;
    inputEle.parentNode.parentNode.classList.add("active-row");
    console.debug("enableInputHandlerOnTabKey element is:");
    enableInputEditHandler(event);
}
  }

 const enableInputEditHandler=(event)=>{
    let inputEle=event.target;
    inputEle.parentNode.parentNode.classList.add("active-row");
    if(inputEle.disabled==false){
    inputEle.readOnly='';
  }
  }

  const handleChildItemAdd=(event,collection,parentId)=>{

  }

  const handleFileUpload=(event,id,errorHandler,parent)=>{
    console.debug("handling file upload for ID:",id,"event is",event);
    let file = event.target.files[0];
let formData = new FormData();
     
// formData.append("file", file);
formData.append("file", file);
let itemservice=new ItemService();
itemservice.uploadFile("product",id,formData).catch(error=>{
  console.log("ERROR HANDLING FOR UPLoAD FILE IN for id:",id,file.name);
  errorHandler(event,parent);
});
  }
 
  const handleItemAdd=(event,collection)=>{
    const itemservice= new ItemService();
    let formItem= new Item();
    let row=event.target.parentNode.parentNode.parentNode;
    console.debug("Event target on hanle item add is:");
    // console.debug(event.target.parentNode.parentNode.parentNode);
    formItem.id=row.id;
    let updateRow=row.cloneNode(true);

    Array.from(row.childNodes).filter(node=> !node.classList.contains("row-action")).forEach(node=>{
        let fieldname=        node.getAttribute("field-name");
        formItem.addData(fieldname,new ItemData(fieldname,node.childNodes[0].value));
         node.childNodes[0].value='';
    });
    let rowParent=row.getAttribute("prnt");
    if(row.getAttribute("prnt")!=undefined){
      formItem.parentId=rowParent;
      formItem.addData("parentId",new ItemData("parentId",rowParent));

    }
    let epco=new EpConfig();
    formItem.type=epco.getCollectionElementType(collection);
    formItem.status="Draft";
    console.debug("formitem created to save to db is:");
    console.debug(formItem);
    // throw "formitem created to save to db is";
    itemservice.add("records",collection,formItem).then((data)=>{
      handleAddRowPostProccessing(data,updateRow,row,formItem,collection);
    })

  }
  const handleAddRowPostProccessing=(data,updateRow,row,formItem,collection)=>{
    
    console.debug("data on response to add:");
    console.debug(data);
    console.debug("update row is:");
    console.debug(updateRow);
    let nitm= new Item();
    row.id=nitm.getId();
    let addrwbtn=row.querySelector("#add_"+updateRow.id);
    addrwbtn.id="add_"+row.id;
   let addbtn=updateRow.querySelector("#add_"+updateRow.id);
    
    let updateButton=getButton("publish","Publish Updates",updateRow.id,"click", (event) => handleItemUpdate(event, formItem,collection));
    console.debug(updateButton);
  let deleteButton=getButton("remove","Remove Record", formItem.getId(), "click", (event) => handleItemDelete(event, formItem,collection));
  console.debug("updateRow===>>>>>>>>");
  console.debug(updateRow);

 Array.from( updateRow.getElementsByTagName('select')).forEach(sele=>{
    console.debug("ipdate row sele for updated ele:",sele.name,sele);
  // let  formdaat=formItem.fields.get(sele.fields.get("form_data_name").fieldValue);
  let  formdaat=formItem.fields.get(sele.name);

  console.debug("update row formdaatis:",formdaat);
    Array.from(sele.options).filter(option=>option.value===formdaat.fieldValue).forEach(op=>{
      op.selected="selected";
    })
    })

    Array.from( row.getElementsByTagName('select')).forEach(sele=>{
      if(sele.disabled){
      console.debug("addrow sele for updated ele:",sele.name,sele);
    // let  formdaat=formItem.fields.get(sele.fields.get("form_data_name").fieldValue);
    let  formdaat=formItem.fields.get(sele.name);
  
    console.debug("addrow formdaatis:",formdaat);
      Array.from(sele.options).filter(option=>option.value===formdaat.fieldValue).forEach(op=>{
        op.selected="selected";
      })
    } })
    console.debug("addbtn to be replaced is:");
    console.debug(addbtn);
    console.debug("addbtn.parentNode is:");
    console.debug(addbtn.parentNode);
    addbtn.parentNode.replaceChild(updateButton,addbtn);
    updateButton.parentNode.appendChild(deleteButton);
    updateRow.classList.remove("addrow");
    insertBefore(row,updateRow);
  }
  const  insertBefore=(referenceNode, newNode)=> {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
}




  export {handleFileUpload,handleChildItemAdd,handleItemDelete,handleItemAdd,editRowHandler,enableInputEditHandler,handleItemUpdate,enableInputHandlerOnTabKey}
