import { Item, ItemData } from "open.elements.data.ts";
import { MapRoTable } from "open.elements.web.components";
import { ItemService } from "../../npm-modules/caas-store-adapter/firestore-adapter/item.service";
import {
  enableInputEditHandler,
  enableInputHandlerOnTabKey,
  handleChildItemAdd,
  handleClearFilters,
  handleItemAdd,
  handleItemDelete,
  handleItemFilter,
  handleItemUpdate,
  handleRelItemAdd,
} from "./event.handlers.util";
import { FormElementsEventHandlersRepo } from "./form.elements.event.handlers.repo";
import { Pagination } from "open.elements.web.components/src";
import { TableFilter } from "../components/data.table/table.filter/table.filter";
// import { Pagination } from "../components/pagination/pagination";

const getButton = (name, tooltip, id, eventname, buttonClickEventHandler) => {
  // if (name === "checkbox") {
  //   let inputEle = new ToggleSwitch(undefined);
  //   return inputEle;
  // } else {
  const span = document.createElement("span");
  const addbtnText = document.createTextNode(name);
  span.classList.add("material-symbols-outlined");
  span.classList.add("md-24", name + "-icon");
  span.append(addbtnText);
  const addbtn = document.createElement("span");
  addbtn.classList.add("icon_text_container", name + "-container");
  // span.classList.add(name);
  // addbtn.setAttribute("data-feather","circle");
  addbtn.setAttribute("id", name + "_" + id);
  addbtn.appendChild(span);

  const textSpan = document.createElement("span");
  let iconContent = tooltip.substr(0, tooltip.indexOf(" "));
  textSpan.textContent = iconContent;
  textSpan.classList.add("icon-text", name + "-text");
  addbtn.appendChild(textSpan);

  // if (name == "publish") {
  //    // console.log("name is publish");
  //    span.remove(addbtnText);
  //    addbtn.classList.add("publish-btn");
  //  }
  //creating text with icon
  //  if (name != "delete") {
  //   const textSpan = document.createElement("span");
  //capitalizing the first letter
  //   let iconContent = tooltip.substr(0, tooltip.indexOf(" "));
  //  textSpan.textContent = iconContent;
  //  textSpan.classList.add("icon-text");
  //  addbtn.appendChild(textSpan);
  // }
  // if (name == "delete") {
  //   addbtn.classList.add("delete-btn");
  //}
  addbtn.setAttribute("data-title", tooltip);
  // console.debug("buttonClickEventHandler fucntion to add to button");
  // console.debug(buttonClickEventHandler);
  if (buttonClickEventHandler != undefined)
    addbtn.addEventListener(eventname, buttonClickEventHandler);
  return addbtn;
  // }
};

const getformElement = (
  secc,
  field,
  element, //element.getfieldvaluerefid
  elementEventListners,
  selectValuesMapper
) => {
  console.debug("getformElement secc:", secc);
  console.debug("getformElement element:", element);
  //  console.debug("getformElement trying to create form element for field:",field);
  if (
    element.fields.get("type").fieldValue == "link" &&
    element.fields.get("element").fieldValue == "file"
  ) {
    let inputEle = document.createElement("button");
    inputEle.setAttribute("link", field.fieldValue);
    inputEle.textContent = field.fieldValue;
    // console.log("creating the link for file download : field is:",field);
    if (field.status === "disabled") {
      inputEle.classList.add("block-file");
      inputEle.disabled = true;
      // console.log("creating the link for file download :inputEle.disabled field is:",inputEle);
    } else {
      // alert("call under else of diabled link ::for field value:")
      attachEventListeners(inputEle, elementEventListners, secc);
      inputEle.removeAttribute("disabled");
      // console.log("creating the link for file download :inputEle.attachEventListeners field is:",inputEle);
    }
    // inputEle.readOnly=true;
    // if(field!=undefined)
    // inputEle.value=field.fieldValue;
    console.debug("inputEle are: ", inputEle);
    // console.debug(elementEventListners);
    return inputEle;
  } else if (element.fields.get("type").fieldValue == "text") {
    let inputEle = document.createElement("input");
    inputEle.setAttribute("type", "text");
    inputEle.readOnly = true;
    if (field != undefined) {
      if (field.fieldValue != undefined) {
        inputEle.value = field.fieldValue;
      } else {
        inputEle.value = "";
      }
    }
    // console.debug("inputelementeventlisters are: ");
    // console.debug(elementEventListners);
    attachEventListeners(inputEle, elementEventListners, secc);
    return inputEle;
  } else if (element.fields.get("type").fieldValue == "email") {
    let inputEle = document.createElement("input");
    inputEle.setAttribute("type", "email");
    inputEle.readOnly = true;
    if (field != undefined) {
      if (field.fieldValue != undefined) {
        inputEle.value = field.fieldValue;
      } else {
        inputEle.value = "";
      }
    }
    // console.debug("inputelementeventlisters are: ");
    // console.debug(elementEventListners);
    attachEventListeners(inputEle, elementEventListners, secc);
    return inputEle;
  } else if (element.fields.get("type").fieldValue == "number") {
    let inputEle = document.createElement("input");
    inputEle.setAttribute("type", "number");
    // inputEle.readOnly=true;
    if (field != undefined) inputEle.value = field.fieldValue;
    // console.debug("inputelementeventlisters are: ");
    // console.debug(elementEventListners);
    attachEventListeners(inputEle, elementEventListners, secc);
    return inputEle;
  } else if (element.fields.get("type").fieldValue == "radio") {
    let inputEle = document.createElement("input");
    inputEle.setAttribute("type", "radio");
    // inputEle.readOnly=true;
    if (field != undefined) inputEle.value = field.fieldValue;
    // console.debug("inputelementeventlisters are: ");
    // console.debug(elementEventListners);
    attachEventListeners(inputEle, elementEventListners, secc);
    return inputEle;
  } else if (element.fields.get("type").fieldValue == "checkbox") {
    // let inputEle = new ToggleSwitch(field);
    let inputEle = document.createElement("input");
    inputEle.setAttribute("type", "checkbox");
    // console.log("setting checkbox for  element :",element," and filed as :"+field);
    // inputEle.readOnly=true;
    if (field != undefined) inputEle.checked = field.fieldValue;
    // console.debug("inputelementeventlisters are: ");
    // console.debug(elementEventListners);
    attachEventListeners(inputEle, elementEventListners, secc);
    return inputEle;
  } else if (element.fields.get("type").fieldValue == "maprotable") {
    // console.log("creating field as MapROTable for field::",field,"for element::",element);
    let itm = new Item();
    if (field != undefined) {
      itm.addData("field", new ItemData("field", field.fieldValue));
    }
    itm.addData(
      "key_column_name",
      new ItemData(
        "key_column_name",
        element.fields.get("table_key_col_name").fieldValue
      )
    );
    itm.addData(
      "value_column_name",
      new ItemData(
        "value_column_name",
        element.fields.get("table_value_col_name").fieldValue
      )
    );

    // field.addRe
    let inputEle = new MapRoTable(itm);
    // inputEle.setAttribute("type","checkbox");
    // console.log("setting checkbox for  element :",element," and filed as :"+field);
    // // inputEle.readOnly=true;
    // if(field!=undefined)
    // inputEle.value=field.fieldValue;
    // console.debug("inputelementeventlisters are: ");
    // console.debug(elementEventListners);
    // attachEventListeners(inputEle,elementEventListners);
    return inputEle;
  } else if (
    element.fields.get("type").fieldValue == undefined ||
    element.fields.get("type").fieldValue == "XOR"
  ) {
    if (element.fields.get("element").fieldValue == "select") {
      let selEle = document.createElement("select");
      console.debug("PROCESSING SELECT ELEMENT FOR:", element);
      console.debug("processing select elemnt :: field:: IS:", field);
      let defoption = document.createElement("option");
      defoption.text = "--Select an Option--";

      if (element.fields.get("default-value") != undefined) {
        defoption.text = element.fields.get("default-value").fieldValue;
        if (element.fields.get("default-value-ref-id") != undefined) {
          defoption.value = element.fields.get(
            "default-value-ref-id"
          ).fieldValue;
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
      if (
        element.fields.get("options_dervation_collection_parent") != undefined
      ) {
        selEle.setAttribute(
          "prnt",
          element.fields.get("options_dervation_collection_parent").fieldValue
        );
        selEle.setAttribute(
          "coll",
          element.fields.get("options_dervation_collection").fieldValue
        );
        selEle.setAttribute(
          "coll_typ",
          element.fields.get("options_dervation_collection_type").fieldValue
        );
      }
      // selEle.setAttribute("prnt","domain");
      selEle.name = element.name;

      //  console.log("==== C",secc);
      //  console.log("selEle",selEle);
      //  console.log("element",element);
      //console.log("field passed to create select options", field);

      createSelectOptions(secc, selEle, element, field, selectValuesMapper);
      console.debug("SEL ELEE IS for tWORKIG FOR ELE");
      console.debug(field);
      // console.debug("EVENT HANDLERS FOR SELECT ELE ARE");
      // console.debug(elementEventListners);
      // console.debug();
      attachEventListeners(selEle, elementEventListners, secc);
      // console.debug("field in select value data");
      // console.debug(field);

      //   if(field!=undefined && element.fields.get("options_dervation_collection_parent")!=undefined){
      //   selEle.value=field.id;
      //   // alert("sele value is set to:"+selEle.value+" fieldid is:"+field.id);
      //   // console.debug("selEle options are :");

      //   // selEle.readOnly=true;
      //   // console.debug(JSON.stringify(field.id)+":fieldid");
      //   // console.debug("setting sel value to :"+JSON.stringify(selEle.value));

      // }
      return selEle;
    } else {
      // console.debug("elemnt.fields.get(type).fieldValue==undefined"+element.fields.get("type").fieldValue+"for element name:",element);
      // console.debug(element);
      throw (
        "elemnt.fields.get(type).fieldValue==undefined" +
        element.fields.get("type").fieldValue +
        "for element name:" +
        element.name
      );
    }
  } else {
    // console.debug("no input element processor found:element.fields.get('type')"+element.fields.get("type").fieldValue+"for element name:",element);
    // console.debug(element);
    throw (
      ("no input element processor found:element.fields.get('type')" +
        element.fields.get("type").fieldValue +
        "for element name:",
      element)
    );
  }
  // return addbtn;
};

const createSelectOptions = (secc, ele, sele, selfield, selectValuesMapper) => {
  // console.log("secc in :createSelectOptions",secc);
  //  console.debug("UNDER CREATE SELECT OPTIONS:ele:",ele); //html eleemnt
  //  console.debug("UNDER CREATE SELECT OPTIONS:sele:",sele); // schema representation
  //  console.debug("UNDER CREATE SELECT OPTIONS:selfield:",selfield); // runtime data
  if (sele.fields.get("options_dervation_collection") != undefined) {
    let itemServie = new ItemService();
    let colname = sele.fields.get("options_dervation_collection").fieldValue;
    let filterType = sele.fields.get(
      "options_dervation_collection_type"
    ).fieldValue;
    if (sele.fields.get("options_dervation_collection_parent") != undefined) {
      let filteronParent = sele.fields.get(
        "options_dervation_collection_parent"
      ).fieldValue;
      // console.debug("Form data is:cfor parent name:sele",sele);
      // console.debug("Form data is:cfor parent name:selfield",selfield);
      // console.debug("Form data is:cfor parent name:ele",ele);
      // console.debug("ele parentnode",ele.parentNode);
      //  // console.debug(this.formData);
      // let row=ele.parentNode.parentNode;

      //   let selectElments=row.querySelectorAll('select[name="'+filteronParent+'"]');
      //  // console.debug("select elements are:");
      //  // console.debug(selectElments);

      //    let formele=ele.parentNode.parentNode.getElementById(`frm${this.metadatakeyid}`)
      //   // console.debug(formele.id);//.filter(ele.form==formele.id)
      // let parentEle=this.shadowRoot.querySelectorAll('[name="'+filteronParent +'"]')[0];
      // console.debug("selfield ele is: for name:"+filteronParent+" with value");
      // console.debug(selfield);

      // console.debug("on parent : colname and type: "+colname+" fitlertype:"+filterType);
      if (selfield != undefined) {
        console.debug("on parent : selfield: ", selfield);

        if (selfield.ref_comp_type != undefined) {
          //  console.debug("collect xor data ::");

          // console.debug("working on getting data from server for : colname:"+colname);
          // console.debug("working on getting data from server for : filterType:"+filterType);
          // console.debug("working on getting data from server for : selfield:",selfield);
          // console.debug("working on getting data from server for : colname:"+colname);
          // console.debug("working on getting data from server for : colname:"+colname);
          if (
            selectValuesMapper != undefined &&
            selectValuesMapper.getRelElementsOnType("SELECT_VALUES_MAP") !=
              undefined &&
            selectValuesMapper
              .getRelElementsOnType("SELECT_VALUES_MAP")
              .get(
                colname +
                  filterType +
                  selfield.parentName +
                  selfield.ref_comp_type +
                  selfield.parentType
              ) != undefined
          ) {
            alert(
              "got valuees fro,m map:::" +
                colname +
                filterType +
                selfield.parentName +
                selfield.ref_comp_type +
                selfield.parentType
            );
            let selres = selectValuesMapper
              .getRelElementsOnType("SELECT_VALUES_MAP")
              .get(
                colname +
                  filterType +
                  selfield.parentName +
                  selfield.ref_comp_type +
                  selfield.parentType
              );
            let defaultph = ele.options[0];
            ele.options.length = 0;
            ele.add(defaultph);
            selres.forEach((itm) => {
              let option = new Option(itm.name, itm.id);
              if (selfield != null && selfield.fieldValue === itm.id) {
                option.selected = "selected";
              }
              ele.add(option);
            });
            // console.log("found onn selectvaluesmapperkeys are:",selectValuesMapper);
          } else {
            //  alert("getting valuees fro,m apis:::"+colname+filterType+selfield.parentName+selfield.ref_comp_type+selfield.parentType);
            if(selfield.parentName!=undefined){
            itemServie
              .getOnParentOnScope(
                secc,
                colname,
                filterType,
                selfield.parentName,
                selfield.ref_comp_type,
                selfield.parentType
              )
              .then((resp) => {
                // alert("working on key for select values:"+colname+filterType+selfield.parentName+selfield.ref_comp_type+selfield.parentType);
                //  // console.debug("REPSONE OF DOMAIN LIST:getOnParentOnScope");
                //  // console.debug(JSON.stringify(resp));
                //  // console.debug("ele is");
                //  // console.debug(ele);
                //  // console.debug("geton parent on scope selfield.fieldValue ele value is:");
                //  // console.debug(selfield.fieldValue);
                let defaultph = ele.options[0];

                ele.options.length = 0;
                ele.add(defaultph);
                if (selectValuesMapper != undefined) {
                  selectValuesMapper
                    .getRelElementsOnType("SELECT_VALUES_MAP")
                    .set(
                      colname +
                        filterType +
                        selfield.parentName +
                        selfield.ref_comp_type +
                        selfield.parentType,
                      resp
                    );
                }
                resp.forEach((itm) => {
                  let option = new Option(itm.name, itm.id);
                  if (selfield != null && selfield.fieldValue === itm.id) {
                    option.selected = "selected";
                  }
                  ele.add(option);
                });
                //  // console.log("after updating selectvaluesmapperkeys are:",selectValuesMapper);
                // alert("after working on key for select values:"+colname+filterType+selfield.parentName+selfield.ref_comp_type+selfield.parentType);
              });}
          }
        } else {
          // console.debug("working on getting data from server for : colname:"+colname+" filterType:"+filterType+" : selfield:",selfield);
          // console.debug("working on getting data from server for : colname:"+colname);
          // console.debug("working on getting data from server for : colname:"+colname);
          //TODO 826 this is a bug uncomment
          // if(selfield.parentName==undefined){
          //   // console.debug("selField parent name is undefined:",selfield);
          //  throw "selField parent name is undefined:"+JSON.stringify(selfield);
          // }
          if(selfield.parentName!=undefined){
          itemServie
            .getOnParent(secc, colname, filterType, selfield.parentName)
            .then((resp) => {
              // console.debug("REPSONE OF DOMAIN  LIST:getOnParent");
              // console.debug(JSON.stringify(resp));
              // console.debug("ele is");
              // console.debug(ele);
              // console.debug("get on parent selfield.fieldValue ele value is:");
              // console.debug(selfield.fieldValue);
              let defaultph = ele.options[0];

              ele.options.length = 0;
              ele.add(defaultph);
              resp.forEach((itm) => {
                let option = new Option(itm.name, itm.id);
                if (selfield != null && selfield.fieldValue === itm.id) {
                  option.selected = "selected";
                }
                ele.add(option);
              });
            });}
        }
      } else {
        // console.debug("UNDER CREATE SELECT OTPIONS::::: selfield is undeifned::: ",selfield);
      }
    } else {
      // console.debug("WITHOUT PARENT DROPDOWN colname and type: "+colname+" fitlertype:"+filterType);
      itemServie.getOnType(secc, colname, filterType).then((resp) => {
        console.debug("REPSONE OF DOMAIN LIST:getOnType");
        console.debug(JSON.stringify(resp)); // console.debug("sele is");
        // console.debug(sele);
        console.debug("ele is");
        console.debug(ele);
        let defaultph = ele.options[0];

        ele.options.length = 0;
        ele.add(defaultph);
        console.debug("selfield is for option select");
        console.debug(selfield);
        resp.forEach((itm) => {
          let option = new Option(itm.name, itm.id);
          console.debug("OPTION itm  is");
          console.debug(itm);
          if (selfield != null && selfield.fieldValue === itm.id) {
            // console.log("selfield!=null && selfield.fieldValue===itm.id>>::",selfield.fieldValue,itm.id);
            option.selected = "selected";
          }
          ele.add(option);
        });
      });
    }
  } else {
    // console.debug("options are to be set when option-derivation-collection is notdeined: ");
    // console.debug("options are to be set when option-derivation-collection is notdeined: sele",sele);
    // console.debug("options are to be set when option-derivation-collection is notdeined:ele ",ele);
    // console.debug("options are to be set when option-derivation-collection is notdeined:selfield ",selfield);
    sele.getRelElementsOnType("options").forEach((itm) => {
      let option = new Option(itm.name, itm.id);
      // console.debug("OPTION itm  is");
      // console.debug(itm);
      // console.debug("OPTION tXT & value IS:");
      // console.debug("["+option.text+":"+option.value+"]");
      // console.debug("itm.feildsitm.feildsitm.feilds");
      // console.debug(itm.fields);

      if (selfield != null && selfield.fieldValue === itm.id) {
        // console.debug('setting option as selected: for selfield.fieldValue::'+selfield.fieldValue+" and :: itm.id::"+itm.id);
        option.selected = "selected";
      } else {
        // console.debug('not setting option as selected: for selfield.fieldValue::'+selfield+" and :: itm.id::"+itm.id);
      }
      // console.debug("option is:["+option.value+","+option.text+","+option.selected);

      ele.add(option);
    });
    //  // console.debug("ELEE ISS ::: WITH SELECTED OPTION:");
    //  // console.debug(ele.value);
    //  // console.debug()
  }
};

const attachEventListeners = (ele, elementEventListners, secc) => {
  if (elementEventListners != undefined) {
    Array.from(elementEventListners).forEach((handler) => {
      //  // console.debug("event listener for inputelement is:");
      //  // console.debug(handler);
      // console.log(  "attachEventListeners secc is:",secc);
      // console.log(  "attachEventListeners working on handler is:",handler.handler);

      ele.addEventListener(handler.eventname, (event) =>
        handler.handler(event, secc)
      );
    });
  }
};

//  const getTableCellElement=( formElement,field,buttonEvent,selectValuesMapper)=>{
const getTableCellElement = (formElement, field, selectValuesMapper) => {
  // console.debug("setting fieldv attbiutes for filed-name & field-id for:",field);
  // console.debug("setting filed-name for formelement:");
  // console.debug(formElement);
  const cell = document.createElement("td");
  let fdname = field.fields.get("form-data-name");

  if (fdname != undefined) cell.setAttribute("field-name", fdname.fieldValue);
  else cell.setAttribute("field-name", field.name);
    cell.setAttribute("field-id", field.id);
  cell.appendChild(formElement);
  return cell;
};

const getAddDataRow = (secc, relEles, ele, collection) => {
  // console.debug("call in adddatarow: ele is:",ele);
  let drow = getRow(secc, relEles, ele);
  const actionbcell = document.createElement("td");
  //  let prntid;
  //  if(ele!=undefined && ele.fields!=undfined?.getData("parentId")?.fieldValue)
  actionbcell.appendChild(
    getButton("add", "Add Record", ele.getId(), "click", (event) =>
      handleItemAdd(
        event,
        secc,
        collection,
        ele?.fields?.get("parentId")?.fieldValue
      )
    )
  );
  actionbcell.classList.add("row-action");
  //console.log("finding ipnode on acction cellb",actionbcell);

  drow.appendChild(actionbcell);
  drow.classList.add("addrow");
  let ipnodes = drow.querySelectorAll("input");
  ipnodes.forEach((ipnode) => {
    //     console.log("input node identified ",ipnode,"ipnode.getAttribute(disabled)",ipnode.getAttribute("disabled"));

    if (ipnode.getAttribute("disabled") != null) {
      console.log("input node identified as disabled", ipnode);
      if (ipnode.getAttribute("type") === "text") {
        ipnode.removeAttribute("disabled");
      }
    }
  });
  // drow.setAttribute("prnt",ele.parentId);
  return drow;
};

const getFilterDataRow = (
  mi,
  relEles,
  ele,
  collection,
  tablefilterdataFunction
) => {
  // console.debug("call in adddatarow: ele is:",ele);
  //console.log("REL ELES PASSED FROM FILTER DATA ROW :",relEles);
  //  let drow= getRow(relEles,ele);
  const actionbcell = document.createElement("nav");
  actionbcell.appendChild(
    getButton("filter_list", "Filter Records", ele.getId(), "click", (event) =>
      renderFilterMenu(event, collection, tablefilterdataFunction)
    )
  );
  actionbcell.appendChild(
    getButton(
      "filter_list_off",
      "Clear Filter",
      ele.getId(),
      "click",
      (event) => handleClearFilters(event, collection, tablefilterdataFunction)
    )
  );

  return actionbcell;
};

const getUploadDataRow = (mi, relEles, ele, collection, fileUploadFunctoin) => {
  console.debug("call in adddatarow: ele is:", ele);
  // console.log("REL ELES PASSED FROM FILTER DATA ROW :",relEles);
  //  let drow= getRow(relEles,ele);
  const actionbcell = document.createElement("nav");
  actionbcell.appendChild(
    getButton("upload", "Upload File of Type", ele.getId(), "click", (event) =>
      fileUploadFunctoin(event, collection, tablefilterdataFunction)
    )
  );

  return actionbcell;
};
const renderFilterMenu = (event, collection, tablefilterdataFunction) => {
  // console.log("event in renderFilterMenu");
  // console.log("event target",);
  let ctb = event.target.parentNode.parentNode.parentNode.parentNode;
  let tablFilter = ctb.querySelector("table-filter");
  tablFilter.classList.remove("hidecomp");
  // event.tar
  //  let filterMenuItem= new Item();
  //   filterMenuItem.addData("context_event",event);
  //   filterMenuItem.addData("collection",collection);
  //   filterMenuItem.addData("filter_data_function",tablefilterdataFunction);
  //   let tblFilter=new TableFilter(filterMenuItem);
  //   event.target.parentNode.appendChild(tblFilter);
};

const getAddChildDataRow = (relEles, ele, collection, parentId) => {
  let drow = getRow(this.metadata.getData("secc").fieldValue, relEles, ele);
  const actionbcell = document.createElement("td");
  actionbcell.appendChild(
    getButton("Add", "Add Record", ele.getId(), "click", (event) =>
      handleChildItemAdd(event, collection, parentId)
    )
  );
  actionbcell.classList.add("row-action");
  drow.appendChild(actionbcell);
  return drow;
};

const getUpdataRow = (secc, relEles, ele, collection, selectValuesMapper) => {
  let drow = getRow(secc, relEles, ele, selectValuesMapper);
  const actionbcell = document.createElement("td");
  actionbcell.appendChild(
    getButton("publish", "Publish Updates", ele.getId(), "click", (event) =>
      handleItemUpdate(secc, event, ele, collection)
    )
  );
  actionbcell.appendChild(
    getButton("delete", "Remove Record", ele.getId(), "click", (event) =>
      handleItemDelete(secc, event, ele, collection)
    )
  );

  actionbcell.classList.add("row-action");
  if (ele.fields != undefined && ele.fields.get("status") != undefined) {
    drow.setAttribute("data-status", ele.fields.get("status").fieldValue);
  }
  drow.appendChild(actionbcell);
  if (true) {
    // throw "before dataprocessing and after table header loaded prodcut type"
  }
  return drow;
};

const getReadonlyRow = (secc, metadataItem, header, ele, collection) => {
  const actionbcell = document.createElement("td");
  // actionbcell.appendChild(getButton("publish","Publish Updates", ele.getId(), "click", (event) => handleItemUpdate(event, ele,collection)));
  // override-action-buttons;
  // ACTION_BUTTONS
  let actionbutons = metadataItem.getRelElementsOnType("ACTION_BUTTONS");
  if (actionbutons != undefined && actionbutons.size > 0) {
    // console.log("oactb::: ELEEEEMENET::::",actionbutons);

    // let buttons=    actionbutons.getRelElementsOnType("RNDR_MDT");
    actionbutons.forEach((v, k, m) => {
      let x = new Item();
      x = v;
      //  // console.log("VALUE TO BE WORKED ON : ",x);
      if (k === "remove") {
        // console.log("FIELDS ARE:",x.fields);
        let col = x.fields.get("collection").fieldValue;
        // console.log("v.getData(collection).fieldValue::"+v.getData("collection").fieldValue);
        // console.log("Collectio name fr delete button:"+col);
        let deleteButton = getButton(
          "delete",
          "Remove Record",
          ele.getId(),
          "click",
          (event) => handleItemDelete(secc, event, ele, col)
        );
        actionbcell.appendChild(deleteButton);
      }
    });
  }
  // else if{
  //   actionbcell.appendChild(getButton("checkbox","Select Record", ele.getId(), "click", (event) => handleItemDelete(secc,event, ele,collection)));
  // }
  actionbcell.classList.add("row-action");
  let drow = getRoRow(secc, metadataItem, actionbcell, header, ele);
  if (ele.fields != undefined && ele.fields.get("status") != undefined) {
    drow.setAttribute("data-status", ele.fields.get("status").fieldValue);
  }
  return drow;
};

const getRoRow = (secc, metadataItem, actionbcell, relEles, ele) => {
  let mi = new Item();
  mi = metadataItem;

  //ele == database item to work on
  const drow = document.createElement("tr");
  drow.setAttribute("id", ele.getId());
  if (
    mi.getData("actions-at-beginning") != undefined &&
    mi.getData("actions-at-beginning").fieldValue
  ) {
    drow.appendChild(actionbcell);
  }
  // console.debug("Workkimh mo ele");
  // console.debug(ele);

  Array.from(relEles.values())
    .sort((a, b) => a.name - b.name)
    .forEach((element) => {
      //       console.debug("Creating row wokring on element:",element);
      let field = undefined;
      let fields = ele.fields;
      let fname = element.name;
      let defaultvalue = undefined;
      let flags = undefined;
      if (element.fields.get("form-data-name") != undefined) {
        fname = element.fields.get("form-data-name").fieldValue;
      }
      if (element.fields.get("default-value") != undefined) {
        defaultvalue = element.fields.get("default-value").fieldValue;
      }
      if (element.fields.get("flags") != undefined) {
        flags = element.fields.get("flags").fieldValue;
      }
      if (fields != undefined) {
        // field = fields.get(element.id ); // revert this after exports test: 
          field = fields.get(fname); // revert this after exports test:

        // field = fields.get(fname ); // revert this after exports test:
      }
      // console.debug("fname for field is:");
      // console.debug(fname);
      // console.debug("working for fields:");
      // console.debug(fields);

      // console.debug("wokring on field");
      // console.debug(field);
      let feehr = new FormElementsEventHandlersRepo();
      let hanlderkey = element.fields.get("element").fieldValue;
      if (element.fields.get("type").fieldValue != undefined) {
        hanlderkey = hanlderkey + "_" + element.fields.get("type").fieldValue;
      }
      //  // console.debug('element.fields.get("element").fieldValue+"_"+element.fields.get("type").fieldValue is:::'+element.fields.get("element").fieldValue+"_"+element.fields.get("type").fieldValue);
      let formEle = getformElement(
        secc,
        field,
        element,
        feehr.getHandlers(hanlderkey),
        null
      );
      if (defaultvalue != undefined) {
        formEle.setAttribute("value", defaultvalue);
      }
      // console.debug("falgs for rendering input is:",flags);
      if (flags != undefined && flags.includes("disabled")) {
        formEle.disabled = true; //defauliting to disabled since call is in RO rows
      }
      drow.appendChild(getTableCellElement(formEle, element));
    });
  if (
    mi.getData("actions-at-beginning") == undefined ||
    !mi.getData("actions-at-beginning").fieldValue
  ) {
    drow.appendChild(actionbcell);
  }

  return drow;
};
const getRow = (secc, relEles, ele, selectValuesMapper) => {
  // relEless
  //ele == database item to work on
  const drow = document.createElement("tr");
  drow.setAttribute("id", ele.getId());
  // console.debug("Workkimh mo ele");
  // console.debug(ele);

  Array.from(relEles.values())
    .sort((a, b) => a.seqId - b.seqId)
    .forEach((element) => {
      // console.debug("Creating row wokring on element:");
      // console.debug(element);
      let field = undefined;
      let fields = ele.fields;
      let fname = element.name;
      let defaultvalue = undefined;
      let flags = undefined;
      if (element.fields.get("form-data-name") != undefined) {
        fname = element.fields.get("form-data-name").fieldValue;
      }
      if (element.fields.get("default-value") != undefined) {
        defaultvalue = element.fields.get("default-value").fieldValue;
      }
      if (element.fields.get("flags") != undefined) {
        flags = element.fields.get("flags").fieldValue;
      }
      if (fields != undefined) {
                // field = fields.get(element.id ); // revert this after exports test: 
          field = fields.get(fname); // revert this after exports test:

      }
      // console.debug("fname for field fname is:", fname);
      //  console.debug(fname);
      //console.debug("working for fields:", fields);
      //  console.debug(fields);

      // console.debug("wokring on field", field);
      //  console.debug(field);
      let feehr = new FormElementsEventHandlersRepo();
      let hanlderkey = element.fields.get("element").fieldValue;
      if (element.fields.get("type").fieldValue != undefined) {
        hanlderkey = hanlderkey + "_" + element.fields.get("type").fieldValue;
      }
      //  // console.debug('element.fields.get("element").fieldValue+"_"+element.fields.get("type").fieldValue is:::'+element.fields.get("element").fieldValue+"_"+element.fields.get("type").fieldValue);
      // console.log("get row,element is:::",element);
      // console.log("get row,secc is:::",secc);
      // console.log("get row,element is:::",element);
      //  console.log("get row,field is::::::", field);
      let formEle = getformElement(
        secc,
        field,
        element,
        feehr.getHandlers(hanlderkey),
        selectValuesMapper
      );
      if (defaultvalue != undefined) {
        formEle.setAttribute("value", defaultvalue);
      }
      console.debug("falgs for rendering input is:", flags);
      if (flags != undefined && flags.includes("disabled")) {
        formEle.disabled = true;
      }
      drow.appendChild(
        getTableCellElement(formEle, element, selectValuesMapper) //element.id
      );
    });

  return drow;
};
//  const updateTableHeader=(d)=>{
//   const tbl = document.createElement("table");

//  }
const processTableWithHeader = (d) => {
  // console.log("d in processTableWithHeader in preparing header for talbe is: ",d);

  const tbl = document.createElement("table");
  tbl.setAttribute("cellspacing", 0);

  const tblheader = document.createElement("thead");

  let relEles = d.getRelElementsOnType("RNDR_MDT");
  //  // console.log("relEles in preparing header for talbe is: ",relEles);
  const hrow = document.createElement("tr");
  Array.from(relEles.values())
    .sort((a, b) => a.seqId - b.seqId)
    .forEach((element) => {
      let colname = element.name;
      let hrid = undefined;
      //    console.log("wokring on header  cell col is : ",element);

      if (element.fields.get("field-value-ref-id") != undefined) {
        hrid = element.fields.get("field-value-ref-id").fieldValue;
      }
      if (element.fields.get("default-value-ref-id") != undefined) {
        hrid = element.fields.get("default-value-ref-id").fieldValue;
      }
      if (element.fields.get("form-data-name") != undefined) {
        colname = element.fields.get("form-data-name").fieldValue;
      }
      let sentenceCase = converterToSentenceCase(`${colname}`);
      const cellText = document.createTextNode(sentenceCase);
      const cell = document.createElement("th");
      let inputEle = document.createElement("input");
      if (hrid != undefined) {
        cell.id = hrid;
      }
      inputEle.value = colname;
      //  cell.appendChild(inputEle);
      cell.appendChild(cellText);
      //  // console.log("header cell crated is : ",cell);
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
};

const appendCaption = (captionv, tbl) => {
  let captionEle = document.createElement("caption");
  captionEle.textContent = captionv;
  tbl.insertBefore(captionEle, tbl.firstChild);
};
const appendCaptionElements = (captionavs, tbl) => {
  let captionEle = document.createElement("caption");
  let tb = document.createElement("div");
  tb.classList.add("table-action-toolbar");
  Array.from(captionavs.getRelElementsOnType("RNDR_MDT").values()).forEach(
    (ele) => {
      let nav = document.createElement("nav");
      // console.log("cation ele is::",ele);

      if (ele.type === "string") {
        //   // console.log("ele.fields:::",ele.fields);
        // console.log("cation ele is:.getData('content:",ele.fields.get("content"));

        nav.textContent = ele.fields.get("content").fieldValue;
      } else if (ele.type === "icon") {
        let buttonclassFuncMap = new Map();
        let iconsStr = ``;
        iconsStr = `${iconsStr}${ele.getData("icon_element").fieldValue}`;
        // console.log("icon_elements==> iconstr::::",iconsStr);
        // console.log("val.getData(icon_element).fieldValue==> iconstr::::",ele.getData("icon_element").fieldValue);
        let funfield = Array.from(
          ele.getRelElementsOnType("FUNCTIONS").values()
        )[0];
        // console.log("funfield is:",funfield.fields.get("icon_func"));
        buttonclassFuncMap.set(
          ele.getData("button_name").fieldValue,
          funfield.fields.get("icon_func").fieldValue
        );
        //  // console.log("iconsStr is:::",iconsStr);
        nav.setAttribute(
          "data-title",
          ele.getData("nav_data_title").fieldValue
        );
        nav.innerHTML = `${iconsStr}`;
        // console.log("NAV IS ::: ",nav);
        // console.log("Childnodes of toolbar elements are: ",nav.childNodes);
        buttonclassFuncMap.forEach((value, key) => {
          // console.log("map key:",key,"map value:",value);
          let btnele = nav.querySelectorAll("." + key)[0];
          btnele.id = ele.fields.get("icon_element_id").fieldValue;
          // console.log("button elee to add function is:",btnele);
          btnele.addEventListener("click", (e) => value(e));
        });
      }
      tb.appendChild(nav);
    }
  );
  captionEle.appendChild(tb);
  if (
    captionavs.getData("table_is_paginated") != undefined &&
    captionavs.getData("table_is_paginated").fieldValue === true
  ) {
    // // console.log("table is paginated",itm.getRelElementsOnType("PGNTN"));
    let paginationconfig = captionavs
      .getRelElementsOnType("PGNTN")
      .values()
      .next().value;
    // // console.log("table is paginated",paginationconfig);
    let paginationelement = new Pagination(paginationconfig);
    captionEle.appendChild(paginationelement);
  }

  // captionEle.textContent=captionv;
  tbl.insertBefore(captionEle, tbl.firstChild);
};

const converterToSentenceCase = (headerName) => {
  const words = headerName.split("_");
  let capitalized_words = words.map((word) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else return "";
  });
  let convertedStr = capitalized_words.join(" ");
  return convertedStr;
};

const processTableWithSearchableHeader = (metadataItem, d) => {
  //  console.log("d in processTableWithHeader in preparing header for talbe is: ",d);
  let mi = new Item();
  mi = metadataItem;
  const actioncellText = document.createTextNode(`Actions`);
  const actioncell = document.createElement("th");
  actioncell.appendChild(actioncellText);

  const tbl = document.createElement("table");
  tbl.setAttribute("cellspacing", 0);
  const tblheader = document.createElement("thead");
  const hrow = document.createElement("tr");
  if (
    mi.getData("no-actions") == undefined ||
    mi.getData("no-actions").fieldValue === false
  ) {
    if (
      mi.getData("actions-at-beginning") != undefined &&
      mi.getData("actions-at-beginning").fieldValue
    ) {
      hrow.appendChild(actioncell);
    }
  }
  d.sort((a, b) => a.seqId - b.seqId).forEach((element) => {
    //  console.log("Working on element d:",element);
  });
  //  let relEles = d.getRelElementsOnType("RNDR_MDT");
  //  // console.log("relEles in preparing header for talbe is: ",relEles);

  Array.from(d)
    .sort((a, b) => a.name - b.name)
    .forEach((element) => {
      let colname = element.name;
      let hrid = undefined;
      // console.log("wokring on header  cell col is : ",element);

      if (element.fields.get("field-value-ref-id") != undefined) {
        hrid = element.fields.get("field-value-ref-id").fieldValue;
      }
      if (element.fields.get("default-value-ref-id") != undefined) {
        hrid = element.fields.get("default-value-ref-id").fieldValue;
      }

      if (element.fields.get("label") != undefined) {
        colname = element.fields.get("label").fieldValue;
      } else if (element.fields.get("form-data-name") != undefined) {
        colname = element.fields.get("form-data-name").fieldValue;
      }
      const cellText = document.createTextNode(`${colname}`);
      const cell = document.createElement("th");
      let inputEle = document.createElement("input");
      //  <input type="text" class="search-input" placeholder="Full Name">
      inputEle.type = "text";
      inputEle.classList.add("search-input");
      //inputEle.placeholder = colname.toUpperCase().split("_").join(" ");
      inputEle.placeholder = converterToSentenceCase(colname);
      if (hrid != undefined) {
        cell.id = hrid;
      }
      //  inputEle.value=colname;
      //  cell.appendChild(inputEle);
      cell.appendChild(inputEle);
      // console.log("header cell crated is : ",cell);
      hrow.appendChild(cell);
    });

  //  let actioninputEle=document.createElement("input");
  //  actioninputEle.value="Actions"
  if (
    mi.getData("no-actions") == undefined ||
    mi.getData("no-actions").fieldValue === false
  ) {
    if (
      mi.getData("actions-at-beginning") == undefined ||
      !mi.getData("actions-at-beginning").fieldValue
    ) {
      hrow.appendChild(actioncell);
    }
  }
  tblheader.appendChild(hrow);
  tbl.appendChild(tblheader);
  return tbl;
};

export {
  getUploadDataRow,
  getFilterDataRow,
  getReadonlyRow,
  appendCaptionElements,
  appendCaption,
  processTableWithSearchableHeader,
  getButton,
  getformElement,
  getTableCellElement,
  processTableWithHeader,
  getUpdataRow,
  getAddDataRow,
  getAddChildDataRow,
};
