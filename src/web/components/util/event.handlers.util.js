import { Item, ItemData } from "open.elements.data.ts";
import { getButton } from "./elements.builder.util";
import { Modal } from "../modal/oewc-modal";
import { Overlay } from "../overlay/oewc-overlay";
import { ToggleSwitch } from "../oewc-toggle-switch/toggle.switch";

// import { CaasItem } from "../../npm-modules/caas-data/caasitem";
// import { SerdeService } from "../services/serde.service";

// const editRowHandler=(event)=>{
//     let formItem=new Item();

//     let row=event.target.parentNode.parentNode;
//     formItem.id=row.id;
//     Array.from(row.childNodes).filter(node=> !node.classList.contains("row-action")).forEach(node=>{
//         let fieldname=        node.getAttribute("field-name");
//         formItem.addData(fieldname,new ItemData(fieldname,node.childNodes[0].value));
//     });
//     formItem.status="Draft";
//         const itemservice= new ItemService();
//         itemservice.update("records","product_domain_metadata",formItem);

//   }

const relaod = () => {
  //  console.log("control in reload function in eventhandler for app reload:");
  location.reload();
  //  console.log("after location ::: reload:");
};

const handleItemUpdate = (secc, event, formItem, collection,dataFunctions) => {
  let row = event.target.closest("tr");
  //console.log("handle update : eventtarget is", event.target);
 // console.log("handle update : eventtarget.row is", row);
  // console.log("handle update : event.target.parentNode.parentNode is", event.target.parentNode.parentNode);
  // console.log("handle update : event.target.parentNode.parentNode.parentNode is", event.target.parentNode.parentNode.parentNode);

  Array.from(row.childNodes)
    .filter((node) => !node.classList.contains("row-action"))
    .forEach((node) => {
    //  console.log("WORKING  ON NODE", node);
      // let fieldname = node.getAttribute("field-id");
      let fieldname = node.getAttribute("field-name");
      let ip = node.childNodes[0];
     // console.log("IPIS:", ip);
     // console.log("IP VLAUE IS:", ip.value);

      let nodevalu = node.childNodes[0].value;
      if (node.childNodes[0].getAttribute("type") === "checkbox") {
      //  let inputnode =
      //    node.childNodes[0].shadowRoot.querySelectorAll(".switch-checkbox")[0];
        let inputnode = node.childNodes[0]; //retouch for custom checkbox
        // console.log("inputnode is:",inputnode);
        nodevalu = inputnode.checked;
      }
      if (ip.getAttribute("type") === "number") {
        nodevalu = node.childNodes[0].valueAsNumber;
      }
      let itmd = new ItemData();
      itmd.name = fieldname;
      itmd.fieldValue = nodevalu;
      //     console.log("parepared itemdata for formItem:",itmd);

      formItem.addData(itmd.name, itmd);
      // console.log("handleitemupdate json string of formItem:serde",JSON.stringify(formItem,serd.replacer));
    });
  //  console.log("handleitemupdate json string of formItem:",formItem);

  let rowParent = row.getAttribute("prnt");

  if (row.getAttribute("prnt") != undefined) {
    formItem.parentId = rowParent;
    formItem.addData("parentId", new ItemData("parentId", rowParent));
  }

  formItem.status = "Draft";
  //  console.log("formItem for update is:",formItem);
  // console.log("formItem mrp value is update is:",formItem.fields.get("mrp").getValue());
  // let caasItem=new CaasItem();
  // let cci=caasItem.clone(formItem);
  // console.log("let cloned data is:",cci);
  // const itemservice = new ItemService();
  dataFunctions.update(secc, "records", collection, formItem);
};

const handleItemDelete = (secc, event, formItem, collection,dataFunctions) => {
  let row = event.target.parentNode.parentNode.parentNode;
  // console.debug("FORMITEM On handE ITEM ON DELETE IS:");
  // console.debug(formItem);
  let prnt = row.getAttribute("prnt");
  // if(prnt!=undefined)
  // const itemservice = new ItemService();
  dataFunctions
    .delete(secc, "records", collection, formItem.id, prnt)
    .then((response) => {
      // console.debug("response from itemservice .delete is:");
      // console.debug(response);
      row.remove();
    });
};

const enableInputHandlerOnTabKey = (event) => {
  if (event.keyCode == 9) {
    let inputEle = event.target;
    inputEle.parentNode.parentNode.classList.add("active-row");
    // console.debug("enableInputHandlerOnTabKey element is:");
    enableInputEditHandler(event);
  }
};

const enableInputEditHandler = (event) => {
  // console.log("ENABLE INPUT EDIt handler");
  let inputEle = event.target;
  inputEle.parentNode.parentNode.classList.add("active-row");
  if (inputEle.disabled == false) {
    inputEle.readOnly = "";
  }
};

const handleChildItemAdd = (event, collection, parentId) => {};

const handleFileUpload = (event, id, errorHandler, parent, ol, secc,dataFunctions) => {
  // console.debug("handling file upload for ID:",id,"event is",event);
  let file = event.target.files[0];
  let formData = new FormData();

  // formData.append("file", file);
  formData.append("file", file);
  // let itemservice = new ItemService(); 
  dataFunctions.uploadFile(secc, "product", id, formData).catch((error) => {
    // console.log("ERROR HANDLING FOR UPLoAD FILE IN for id:",id,file.name);
    // console.log("parent is:",parent);
    parent.shadowRoot.appendChild(ol);
    // errorHandler(event,parent);
  });
};

const handleClearFilters = (event, collection, filterdatacallback,configServices) => {
  // const itemservice = new ItemService();
  let formItem = new Item();
  let row = event.target.parentNode.parentNode.parentNode;
  // console.log("event.target:parentNode",event.target.parentNode);
  // console.log("event.target:parentNode.parentNode",event.target.parentNode.parentNode);
  // console.log("event.target:parentNode.parentNode.parentNode",event.target.parentNode.parentNode.parentNode);
  // console.log("event.target:",event.target);

  // console.debug("Event target on hanle item add is:");
  let captionTB = event.target.parentNode.parentNode.parentNode.parentNode;
  formItem.id = row.id;
  let updateRow = row.cloneNode(true);

  // Array.from(row.childNodes).filter(node=> !node.classList.contains("row-action")).forEach(node=>{
  //     let fieldname=        node.getAttribute("field-name");
  //     if(node.childNodes[0].getAttribute("type")==="checkbox"){
  //       let tswtich=node.childNodes[0];
  //       if(tswtich.classList.contains("toggled")){
  //          let inputnode=tswtich.shadowRoot.querySelectorAll(".switch-checkbox")[0];
  //           console.log("node is",node,"checkbox inputnode is:",inputnode);
  //          formItem.addData(fieldname,new ItemData(fieldname,inputnode.checked));
  //         }
  //     }else{
  //       if(node.childNodes[0].value!='' && node.childNodes[0].value!='--Select an Option--')
  //       formItem.addData(fieldname,new ItemData(fieldname,node.childNodes[0].value));
  //     }
  // });
  let rowParent = row.getAttribute("prnt");
  if (rowParent != undefined) {
    formItem.parentId = rowParent;
    formItem.addData("parentId", new ItemData("parentId", rowParent));
  }
  // let epco= new EpConfig();
  formItem.type = configServices.getCollectionElementType(collection);
  // console.log("filterdatacallback is:",filterdatacallback);

  //detect table of filter and clear its data.
  let tf = captionTB.querySelector("table-filter");
  console.log("table filter is", tf);
  tf.clearAllFilters();
  filterdatacallback(formItem);
  //  event.preventDefault();
};

const showSplashScreen = (
  modalheader,
  modalMessage,
  buttonName,
  styles,
  func
) => {
  let modalItem = new Item();
  modalItem.addData("header", new ItemData("header", modalheader, func));
  modalItem.addData("body", new ItemData("body", modalMessage));
  modalItem.addData("button", new ItemData("button", buttonName));
  modalItem.addData("styles", new ItemData("styles", styles));
  if (func != undefined && func != null) {
    modalItem.addRelElementsOnType("FUNCTIONS", "modal-on-close-func", relaod);
  }

  let modal = new Modal(modalItem);
  let olItem = new Item();
  olItem.addData("modal", new ItemData("modal", modal));
  let ol = new Overlay(olItem);
  let w = document.getElementsByTagName("BODY")[0];
  w.appendChild(ol);
};

const handleItemFilter = (event, collection, filterdatacallback,configServices) => {
  // const itemservice = new ItemService();
  let formItem = new Item();
  let row = event.target.parentNode.parentNode.parentNode;
  // console.debug("Event target on hanle item add is:");
  // console.debug(event.target.parentNode.parentNode.parentNode);
  formItem.id = row.id;
  let updateRow = row.cloneNode(true);

  Array.from(row.childNodes)
    .filter((node) => !node.classList.contains("row-action"))
    .forEach((node) => {
      let fieldname = node.getAttribute("field-name");
      if (node.childNodes[0].getAttribute("type") === "checkbox") {
        let tswtich = node.childNodes[0];
        if (tswtich.classList.contains("toggled")) {
          let inputnode =
            tswtich.shadowRoot.querySelectorAll(".switch-checkbox")[0];
          // console.log("node is",node,"checkbox inputnode is:",inputnode);
          formItem.addData(
            fieldname,
            new ItemData(fieldname, inputnode.checked)
          );
        }
      } else {
        if (
          node.childNodes[0].value != "" &&
          node.childNodes[0].value != "--Select an Option--"
        )
          formItem.addData(
            fieldname,
            new ItemData(fieldname, node.childNodes[0].value)
          );
      }
    });
  let rowParent = row.getAttribute("prnt");
  if (rowParent != undefined) {
    formItem.parentId = rowParent;
    formItem.addData("parentId", new ItemData("parentId", rowParent));
  }
  // let epco = new EpConfig();
  formItem.type = configServices.getCollectionElementType(collection);
  // console.log("filterdatacallback is:",filterdatacallback);
  filterdatacallback(formItem);
  //  event.preventDefault();
};
const handleItemAdd = (event, secc, collection, parentId,dataFunctions,configServices) => {
  // const itemservice = new ItemService();
  let formItem = new Item();
  let row = event.target.closest("tr"); //.parentNode.parentNode;
  // console.debug("Event target on hanle item add is:");
  // console.debug(event.target.parentNode.parentNode.parentNode);
  // console.log("handleItemAdd parentidis:", parentId  );
  formItem.id = row.id;
  let updateRow = row.cloneNode(true);

  Array.from(row.childNodes)
    .filter((node) => !node.classList.contains("row-action"))
    .forEach((node) => {
      let fieldname = node.getAttribute("field-name");
      // let fieldId = node.getAttribute("field-id");

      if (node.childNodes[0].getAttribute("type") === "checkbox") {
      let inputnode = node.childNodes[0]; // retoucch for custom checkbox
        // console.log("inputnode is:",inputnode);
        formItem.addData(fieldname, new ItemData(fieldname, inputnode.checked));
      } else if (node.childNodes[0].getAttribute("type") === "number") {
        formItem.addData(
          fieldname,
          new ItemData(fieldname, node.childNodes[0].valueAsNumber)
        );
      } else {
        formItem.addData(
          fieldname,
          new ItemData(fieldname, node.childNodes[0].value)
        );
      }
      node.childNodes[0].value = "";
    });
  let rowParent = row.getAttribute("prnt");
  if (rowParent != undefined) {
    formItem.parentId = rowParent;
    formItem.addData("parentId", new ItemData("parentId", rowParent));
  } else if (parentId != undefined) {
    formItem.parentId = parentId;
    formItem.addData("parentId", new ItemData("parentId", parentId));
  }
  // let epco = new EpConfig();
  formItem.type = configServices.getCollectionElementType(collection);
  formItem.status = "Draft";
  // console.debug("formitem created to save to db is:");
  // console.debug(formItem);
  // throw "formitem created to save to db is";
  //  console.log("handleItemAdd secc:",secc);
  dataFunctions.add(secc, "records", collection, formItem).then((data) => {
    handleAddRowPostProccessing(
      secc,
      data,
      updateRow,
      row,
      formItem,
      collection,
      dataFunctions
    );
  });
};
const handleAddRowPostProccessing = (
  secc,
  data,
  updateRow,
  row,
  formItem,
  collection,
  dataFunctions
) => {
  // console.debug("data on response to add:");
  // console.debug(data);
  // console.debug("update row is:");
  // console.debug(updateRow);
  let nitm = new Item();
  row.id = nitm.getId();
  let addrwbtn = row.querySelector("#add_" + updateRow.id);
  addrwbtn.id = "add_" + row.id;
  let addbtn = updateRow.querySelector("#add_" + updateRow.id);

  let updateButton = getButton(
    "publish",
    "Publish Updates",
    updateRow.id,
    "click",
    (event) => handleItemUpdate(secc, event, formItem, collection,dataFunctions)
  );
  // console.debug(updateButton);
  let deleteButton = getButton(
    "delete",
    "Remove Record",
    formItem.getId(),
    "click",
    (event) => handleItemDelete(secc, event, formItem, collection,dataFunctions)
  );
  // console.debug("updateRow===>>>>>>>>");
  // console.debug(updateRow);

  // Array.from( updateRow.getElementsByTagName('toggle-switch')).forEach(sele=>{
  //   // console.log("ALL SWITCH_CHECKBOXES ARE:",sele);
  //   let nodename=sele.parentNode;
  //   // console.log("nodename",nodename,"nodename.getAttribute(field-name",nodename.getAttribute("field-name"));
  // let  formdaat=formItem.fields.get(nodename.getAttribute("field-name"));
  // sele.parentNode.replaceChild(new ToggleSwitch(formdaat),sele);
  // });
  Array.from(row.querySelectorAll("[type=checkbox]")).forEach((sele) => {
    // console.log("ALL SWITCH_CHECKBOXES ARE:",sele);
    sele.checked = false;
  });
  Array.from(updateRow.getElementsByTagName("select")).forEach((sele) => {
    // console.debug("ipdate row sele for updated ele:",sele.name,sele);
    // let  formdaat=formItem.fields.get(sele.fields.get("form_data_name").fieldValue);
    let formdaat = formItem.fields.get(sele.name);

    // console.debug("update row formdaatis:",formdaat);
    Array.from(sele.options)
      .filter((option) => option.value === formdaat.fieldValue)
      .forEach((op) => {
        op.selected = "selected";
      });
  });

  Array.from(row.getElementsByTagName("select")).forEach((sele) => {
    if (sele.disabled) {
      // console.debug("addrow sele for updated ele:",sele.name,sele);
      // let  formdaat=formItem.fields.get(sele.fields.get("form_data_name").fieldValue);
      let formdaat = formItem.fields.get(sele.name);

      // console.debug("addrow formdaatis:",formdaat);
      Array.from(sele.options)
        .filter((option) => option.value === formdaat.fieldValue)
        .forEach((op) => {
          op.selected = "selected";
        });
    }
  });
  // console.debug("addbtn to be replaced is:");
  // console.debug(addbtn);
  // console.debug("addb/tn.parentNode is:");
  // console.debug(addbtn.parentNode);
  addbtn.parentNode.replaceChild(updateButton, addbtn);
  updateButton.parentNode.appendChild(deleteButton);
  updateRow.classList.remove("addrow");
  insertBefore(row, updateRow);
};
const insertBefore = (referenceNode, newNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode);
};

const insertAfter = (referenceNode, newNode) => {
  referenceNode.parentNode.insertAfter(newNode, referenceNode);
};

const extractFilterData = (tbl) => {
  // console.log("table in apply filter",tbl);
  let trs = tbl.querySelectorAll(".attribute-rows");
  let formItem = new Item();

  trs.forEach((tr) => {
    let fieldAttribute = new ItemData();

    let trchildnodes = tr.querySelectorAll("td");
    let fieldnamecn = trchildnodes[0];
    let fieldcondtioncn = trchildnodes[1];
    let fieldfvcn = trchildnodes[2];
    let fieldsvcn = trchildnodes[3];
    //  console.log("fieldfvcn in extract filter data is:",fieldfvcn);
    fieldAttribute.name = fieldnamecn.firstChild.value;
    fieldAttribute.type = fieldcondtioncn.firstChild.value;
    //  console.log("values captured are:fieldnamecn",fieldnamecn.firstChild.value);
    //  console.log("values captured are:fieldcondtioncn",fieldcondtioncn.firstChild.value);
    let fvc = fieldfvcn.firstChild;
    if (fvc.tagName.toLowerCase() === "select") {
      // console.log("select type:",fvc.value);
      fieldAttribute.fieldValue = fvc.value;
    } else {
      fieldAttribute.fieldValue = extractInputs(fvc);
    }
    if (!fieldsvcn.firstChild.classList.contains("closed")) {
      let sfv = fieldsvcn.firstChild;
      //       let cc=sfv.shadowRoot.querySelector(".chipscontainer");
      //       let ps=cc.querySelector(".chip-value");

      // console.log("fieldsvcn is::",fieldsvcn);
      let fieldvalueArr = fieldAttribute.fieldValue;
      let fvarray = new Array();
      fvarray.push(fieldvalueArr);
      fvarray.push(extractInputs(sfv));
      fieldAttribute.fieldValue = fvarray;
    }
    formItem.addData(fieldAttribute.name, fieldAttribute);
  });
  return formItem;
};

const extractInputs = (fvc) => {
  let cc = fvc.shadowRoot.querySelector(".chipscontainer");
  let ip = fvc.shadowRoot.querySelector('[name="multiselectip"]');
  let ipval = ip.value;

  let fieldvalueArr = new Array();
  let ps = cc.querySelectorAll(".chip-value");
  // if(ps.length==1){
  //   return ps[0].innerText;

  // }else{
  ps.forEach((p) => {
    // console.log("each p value is: ",p);
    fieldvalueArr.push(p.innerText);
  });
  //
  if (ipval != "") {
    fieldvalueArr.push(ipval);
  }
  if (fieldvalueArr.length == 1) {
    return fieldvalueArr[0];
  } else {
    return fieldvalueArr;
  }
};

const functionFilterAttributeTypeMapper = (secc,dataFunctions) => {
  // let itemService = new ItemService();
  let quertItem = new Item();
  quertItem.contextId = "product_attribute_filter_type_conditions_form_schema";
  // console.log("this.shadowRoot is1:",this.shadowRoot);
  return new Promise((resolve, reject) => {
    dataFunctions
      .getOnContextIdasync(secc, "records", "caas_form_schema", quertItem)
      .then((d) => {
        return resolve(d);
      });
  });
};

export {
  showSplashScreen,
  relaod,
  functionFilterAttributeTypeMapper,
  extractInputs,
  extractFilterData,
  handleClearFilters,
  handleItemFilter,
  handleFileUpload,
  handleChildItemAdd,
  handleItemDelete,
  handleItemAdd,
  enableInputEditHandler,
  handleItemUpdate,
  enableInputHandlerOnTabKey,
};
