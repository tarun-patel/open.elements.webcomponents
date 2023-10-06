import { updateFilterQueryMetadata } from "../util/data.handler";
import { extractFilterData } from "../util/event.handlers.util";
import { MultiSelect } from "../multi-select/multi.select";
import html from "./table.filter.html";
import styles from "./table.filter.styles.scss";
import { Item, ItemData } from "open.elements.data.ts";
export class TableFilter extends HTMLElement {
  metadataItem;
  filterattrBaseMap;
  constructor(item) {
    super();
    this.metadataItem = item;
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    let customStyles =
      this.metadataItem.fields?.get("custom-styles").fieldValue;
    this.shadow.innerHTML = `  <style>${styles}${customStyles}</style>${html}`;
    this.filterattrBaseMap = new Map();

    let fields = this.metadataItem.fields;
    if (fields.get("table-styles") != undefined) {
      let mainStyles = fields.get("styles").fieldValue;
      this.shadow.innerHTML = `  <style>${styles} ${mainStyles}</style>${html}`;
    }
    //console.log("calling add events of table filter ");
    this.addEvents();
  }

  addEvents = () => {
    //console.log("this.metadataItem in table filter is:",this.metadataItem.getRelElementsOnType("FUNCTIONS"));
    let filterattrConditionsFunction = this.metadataItem
      .getRelElementsOnType("FUNCTIONS")
      .get("table_filter_attr_conditions_function");

    filterattrConditionsFunction(
      this.metadataItem.getData("secc").fieldValue
    ).then((data) => {
      //console.log("table filter attribute conditions data::",);
      this.metadataItem.addRelElementsOnType(
        "RNDR_MDT",
        "filter_attr_condition_options",
        data
      );
    });
    //console.log("call under add events of table filter");
    // this.shadowRoot.querySelector(".apply-filter").addEventListener("click",this.closeFIlterScreen)

    // this.shadowRoot.querySelector(".apply-filter").addEventListener("click",this.metadataItem.getRelElementsOnType("FUNCTIOBS").get("init_filters_fields_conditions"))
    //console.log("this.shadowRoot.querySelector(.screen-close) ",this.shadowRoot.querySelector(".screen-close"));
    this.shadowRoot
      .querySelector(".screen-close")
      .addEventListener("click", (event) => this.closeFIlterScreen(event));
    this.shadowRoot
      .querySelector(".apply-filter")
      .addEventListener("click", (event) => this.applyFilter(event));
    // this.shadowRoot.querySelector(".cancel-filter").addEventListener("click",(event)=>this.cancelFilter(event));
    //console.log("this.shadowRoot.querySelector(.add-more-filter) ",this.shadowRoot.querySelector(".add-more-filter"));
    this.shadowRoot
      .querySelector(".add-more-filter")
      .addEventListener("click", (event) => this.addMoreFilter(event));
    this.shadowRoot
      .querySelector(".clear-all-filters")
      .addEventListener("click", this.clearAllFilters);
  };
  closeFIlterScreen = (event) => {
    this.classList.add("hidecomp");
    //console.log("Under close filter");
    event?.preventDefault();
  };

  clearAllFilters = (event) => {
    let tb = this.shadowRoot.querySelector("table").querySelector("tbody");
    let nodelists = tb.querySelectorAll("tr");
    tb.innerHTML = ``;
    this.applyFilter(event);
    this.closeFIlterScreen(event);
  };
  addMoreFilter = (event) => {
    //console.log("call under add more FilterElements:",event);
    let farowtemp = this.shadowRoot.getElementById(
      "filter-attribute-row-template"
    ).content;
    //console.log("farowtemp is:",farowtemp);
    //console.log("    this.shadowRoot.querySelectortable).querySelector(tbody) in filter is: ",    this.shadowRoot.querySelector("table").querySelector("tbody"));
    let arow = farowtemp.cloneNode(true).querySelector("#tablerow");
    let tb = this.shadowRoot.querySelector("table").querySelector("tbody");
    let l = tb.childNodes.length;
    // arow.id=l+1;
    //console.log("arow is ::: ",arow);
    arow.setAttribute("id", "tr" + l);
    tb.appendChild(arow);
    let arown = tb.querySelector("#tr" + l);
    // arown.
    let filter_attrList =
      this.metadataItem.getData("filter_attr_list").fieldValue;
    //console.log("filter_attrMap",filter_attrMap);
    //console.log("LOG FILTER ATTR LSIT IS:",filter_attrList);
    //console.log("METADATA ITEM IN :",this.metadataItem);
    let filter_attribute_ignore_list = this.metadataItem.getData(
      "filter_attribute_ignore_list"
    ).fieldValue;
    //console.log(" LOG FILTER ATTR filter_attribute_ignore_list IS:",filter_attribute_ignore_list);
    let ignoreListarry = Array.from(filter_attribute_ignore_list);
    let filter_attrMap = new Map(
      filter_attrList
        .filter((v) => !ignoreListarry.includes(v.name))
        .map((obj) => [obj.name, obj])
    );
    let fieldattrselect = arown.querySelector('[name="fieldattr"]');
    let filedattrconditon = arown.querySelector('[name="condition"]');
    let secondValue = arown.querySelector('[name="secondvalue"]');
    secondValue.classList.add("closed");
    //console.log("fieldattrselect is:",fieldattrselect);
    let firstattr = undefined;
    Array.from(filter_attrMap.values()).forEach((element) => {
      // if(!ignoreListarry.includes(element.name)){
      let op = new Option(
        element.name.toUpperCase().split("_").join(" "),
        element.name
      );
      fieldattrselect.add(op);
      if (firstattr === undefined) {
        firstattr = element;
      }

      // }
    });
    this.addFilterCondtionOptions(firstattr, filedattrconditon);
    fieldattrselect.addEventListener("change", (event) =>
      this.onFilterAttrChange(event, filter_attrMap)
    );
    //console.log("arown is:",arown);
    arown
      .querySelector(".removeattributefilter")
      .addEventListener("click", this.removeFilterAttrRow);
  };
  addFilterCondtionOptions = (fieldattr, filedattrconditon) => {
    filedattrconditon.options.length = 0;
    let faFields = fieldattr.fields;

    let optionsKey = faFields.get("element").fieldValue;
    let typ = faFields.get("type").fieldValue;
    if (typ != undefined) {
      optionsKey = faFields.get("element").fieldValue + "_" + typ;
    }
    let optionsdata = this.metadataItem
      .getRelElementsOnType("RNDR_MDT")
      .get("filter_attr_condition_options")
      .getRelElementsOnType("RNDR_MDT")
      .get(optionsKey);

    //console.log("Options data is:",optionsdata);

    console.log("optionsKey is: ", optionsKey);
    //console.log("optionsdata.getRelElementsOnType(options)",optionsdata.getRelElementsOnType("options").values());
    optionsdata.getRelElementsOnType("options").forEach((value, key) => {
      filedattrconditon.add(
        new Option(
          value.name.toUpperCase().split("_").join(" "),
          value.getData("value").fieldValue
        )
      );
    });
    let firstvalue = this.getparentRow(filedattrconditon).querySelector(
      '[name="firstvalue"]'
    );

    if (optionsKey === "input_checkbox") {
      // console.log("firstvalue is::",firstvalue);
      let fvparent = firstvalue.parentNode;
      fvparent.removeChild(firstvalue);
      let selesv = document.createElement("select");
      selesv.setAttribute("name", "firstvalue");
      selesv.add(new Option("TRUE", true));
      selesv.add(new Option("FALSE", false));
      fvparent.appendChild(selesv);
    } else {
      // if(firstvalue.tagName.toLowerCase()==="select"){
      let fvparent = firstvalue.parentNode;
      fvparent.removeChild(firstvalue);
      let msMDItem = new Item();
      msMDItem.addData(
        "input-element-type",
        new ItemData("input-element-type", "")
      );

      // let selesv= document.createElement("multi-select-ip");
      // msip.setAttribute("name","firstvalue");
      if (optionsKey === "input_number") {
        msMDItem.addData(
          "input-element-type",
          new ItemData("input-element-type", "number")
        );
      }
      // console.log("MDT FOR MSIP:",msMDItem);
      let msip = new MultiSelect(msMDItem);
      fvparent.appendChild(msip);
      msip.setAttribute("name", "firstvalue");

      // }
    }
    if (optionsKey === "input_number") {
      // let fvx=this.getparentRow(filedattrconditon).querySelector('[name="firstvalue"]');

      //   //change the first field to number type :
      //   console.log("changing for firstvalue of:",fvx);
      //   fvx.type="number";
      filedattrconditon.addEventListener("change", this.filterConditionChange);
      // }
      // if(!(optionsKey==="input_number"||optionsKey==="input_checkbox")){
      //   let fv=this.getparentRow(filedattrconditon).querySelector('[name="firstvalue"]');

      //   fv.type="";
    }
    if (optionsKey != "input_number") {
      let sv = this.getparentRow(filedattrconditon).querySelector(
        '[name="secondvalue"]'
      );
      // console.log("sv is:",sv);
      if (sv != null) {
        sv.classList.add("closed");
      }
    }
  };
  filterConditionChange = (event) => {
    // console.log("filter condition change  forr input number event.target : ",event.target);
    // console.log("filter condition change  forr input number event.target.value : ",event.target.value);
    let condition = event.target.value;
    let arown = this.getparentRow(event.target);
    // console.log("arown is:",arown);
    let secondval = arown.querySelector('[name="secondvalue"]');

    if (
      condition === "BETWEEN" ||
      condition === "GREATER_THAN" ||
      condition === "LESS_THAN" ||
      condition === "LESS_THAN_OR_EQUAL_TO" ||
      condition === "GREATER_THAN_OR_EQUAL_TO"
    ) {
      let secondval = arown.querySelector('[name="firstvalue"]');

      // secondval.classList.remove("closed");
      let slpanretnode = secondval.parentNode;
      let msMDItem = new Item();
      // console.log("slpanretnodeslpanretnodeslpanretnode::",slpanretnode);
      msMDItem.addData(
        "input-element-type",
        new ItemData("input-element-type", "number")
      );
      msMDItem.addData("max-chip-count", new ItemData("max-chip-count", 1));

      // console.log("slpanretnode is:",slpanretnode);
      let msip = new MultiSelect(msMDItem);
      slpanretnode.appendChild(msip);
      msip.setAttribute("name", "firstvalue");
      slpanretnode.removeChild(secondval);
    } else {
      let secondval = arown.querySelector('[name="firstvalue"]');

      // secondval.classList.remove("closed");
      let slpanretnode = secondval.parentNode;
      let msMDItem = new Item();
      // console.log("slpanretnodeslpanretnodeslpanretnode::",slpanretnode);
      msMDItem.addData(
        "input-element-type",
        new ItemData("input-element-type", "number")
      );
      // msMDItem.addData("max-chip-count", new ItemData("max-chip-count",1))

      // console.log("slpanretnode is:",slpanretnode);
      let msip = new MultiSelect(msMDItem);
      slpanretnode.appendChild(msip);
      msip.setAttribute("name", "firstvalue");
      slpanretnode.removeChild(secondval);
    }

    if (condition === "BETWEEN") {
      secondval.classList.remove("closed");
      let slpanretnode = secondval.parentNode;
      let msMDItem = new Item();
      // console.log("slpanretnodeslpanretnodeslpanretnode::",slpanretnode);
      msMDItem.addData(
        "input-element-type",
        new ItemData("input-element-type", "number")
      );
      msMDItem.addData("max-chip-count", new ItemData("max-chip-count", 1));

      // console.log("slpanretnode is:",slpanretnode);
      let msip = new MultiSelect(msMDItem);
      slpanretnode.appendChild(msip);
      msip.setAttribute("name", "secondvalue");
      slpanretnode.removeChild(secondval);
    } else {
      let secondval = arown.querySelector('[name="secondvalue"]');
      secondval.classList.add("closed");
    }
  };
  onFilterAttrChange = (event, filter_attrMap) => {
    // console.log("event on filterattr change",event.target);
    // console.log("event.target.value::",event.target.value)

    //console.log("filter_attrMap is:",filter_attrMap);
    let arown = this.getparentRow(event.target);
    // console.log("working on row:",arown);
    let filedattrconditon = arown.querySelector('[name="condition"]');

    this.addFilterCondtionOptions(
      filter_attrMap.get(event.target.value),
      filedattrconditon
    );
  };

  getparentRow = (target) => {
    return target.parentNode.parentNode;
  };
  applyFilter = (event) => {
    let tbl = this.shadowRoot.querySelector("table");
    this.classList.add("hidecomp");
    // console.log("Under apply filter");
    let formItem = extractFilterData(tbl);
    // console.log(" filter item extracted is:", formItem);

    let optionsdata = this.metadataItem
      .getRelElementsOnType("RNDR_MDT")
      .get("filter_attr_condition_options")
      .getRelElementsOnType("RNDR_MDT");
    let filter_attrList =
      this.metadataItem.getData("filter_attr_list").fieldValue;

    updateFilterQueryMetadata(formItem, optionsdata, filter_attrList);
    //  console.log(
    //    "filter query request form item after updateFilterQueryMetadata is:",
    //   formItem
    //  );

    let filterdatafunc = this.metadataItem.fields.get("filter_data_function");
    filterdatafunc(formItem);
    event?.preventDefault();
  };

  removeFilterAttrRow = (event) => {
    //console.log("event in removefilteratrrow",event);
    //console.log("event in  target",event.target);
    let parentele = event.target.parentNode.parentNode;
    let parentbody = parentele.parentNode;
    parentbody.removeChild(parentele);
  };

  cancelFilter = (event) => {
    this.classList.add("hidecomp");
    //console.log("Under cancel filter");

    event.preventDefault();
  };

  handleFilterChange = (filterItem) => {
    //console.log("filter change on table",filterItem,"this.metadataItem",this.metadataItem, "this is:",this);

    let tbl = this.shadowRoot.querySelectorAll(".ro-data-table")[0];
    if (this.metadataItem.getData("table-caption-toolbar") != undefined) {
      let captionEle = document.createElement("caption");
      captionEle.appendChild(
        this.getTableCaptionToolbar("FILTER_PGNTN", filterItem)
      );
      let ceold = tbl.querySelector(".table-caption-toolbar");
      let thead = tbl.querySelector("thead");
      //console.log("ceold is:",ceold);
      captionEle.classList.add("table-caption-toolbar");
      tbl.insertBefore(captionEle, thead);
      tbl.removeChild(ceold);
      let caption = tbl.querySelectorAll("caption")[1];
      let tblBody = tbl.querySelector("tbody");

      // //console.log("caption isL::",caption);

      this.attachTablePageChangeEentListerner(
        caption,
        tbl,
        tblBody,
        this.metadataItem
          .getRelElementsOnType("FUNCTIONS")
          .get("table_filter_data_function")
      );
    }
    let tablefuctions = this.metadataItem.getRelElementsOnType("FUNCTIONS");

    let table_filter_data_function = tablefuctions.get(
      "table_filter_data_function"
    );
    let tbd = tbl.getElementsByTagName("tbody")[0];
    let pgntdataContext = filterItem;
    //console.log("table_filter_data_function is::",table_filter_data_function);
    table_filter_data_function(pgntdataContext).then((data) =>
      this.renderDataTable(
        data,
        tbl,
        tbd,
        "filtered",
        "FILTER_PGNTN",
        filterItem
      )
    );
  };
}
customElements.define("table-filter", TableFilter);
