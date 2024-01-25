// import { EditableTableBodyElement } from '../../../../npm-modules/open-wc-elements/open-wc-elements';
// import { TaggedSelect } from '../../../custom/tagged-select/tagged-select';
import html from "./local.data.table.html";
import styles from "./local.data.table.styles.scss";
import pageCSS from "./local.data.table.pagination.styles.scss";
import { Item, ItemData } from "open.elements.data.ts";
import {
  getAddDataRow,
  getFilterDataRow,
  getReadonlyRow,
  getUpdataRow,
  processTableWithHeader,
  processTableWithSearchableHeader,
} from "../util/elements.builder.util.js";
import { PageLoader } from "../page-loader/page-loader";
import { Pagination } from "../pagination/pagination";

import { TableFilter } from "../table.filter/table.filter";

export class LocalDataTable extends HTMLElement {
  metadataItem;
  page_loader = new PageLoader();
  tableBase;
  services;
  configServices;
  constructor(item) {
    super();
    this.metadataItem = item;
    this.shadow = this.attachShadow({ mode: "open" });
    // console.log("THIS METAATA ITEM IN Datatable");
    // console.log(this.metadataItem);
  }
  connectedCallback() {
    let table_styles = this.metadataItem.fields.get("table-styles")?.fieldValue;
    let skeletonTableStyles =
      this.metadataItem.fields.get("skeleton-styles")?.fieldValue;
    this.shadow.innerHTML = `  <style>${styles}${table_styles}${skeletonTableStyles}</style>${html}`;

    let fields = this.metadataItem.fields;

    let ItemServ = this.metadataItem.getRelElementsOnType("SERVICES");
    this.services = ItemServ.get("data_function_services");

    let congifServ = this.metadataItem.getRelElementsOnType("CONFIG");
    this.configServices = congifServ.get("config_data_func");
    // console.log('data function passing from local table',this.services);
    if (fields.get("table-styles") != undefined) {
      let mainStyles = fields.get("table-styles").fieldValue;
      this.shadow.innerHTML = `  <style>${styles} ${mainStyles}</style>${html}`;
      // this.shadow.appendChild(this.page_loader);
    }

    this.tableBase = this.shadowRoot.querySelector(".table-base");
    let tbl;
    let d = new Item();
    d = this.metadataItem;
    let tablefuctions = d.getRelElementsOnType("FUNCTIONS");

    let headerNature = d.getData("table_header_data_nature").fieldValue;
    if (headerNature === "DYNAMIC") {
      let headrfunc = tablefuctions.get("table_header_data_function");
      let headereventcontxt = undefined;
      if (d.getData("table_header_data_function_event_context") != undefined) {
        headereventcontxt = d.getData(
          "table_header_data_function_event_context"
        ).fieldValue;
      }

      headrfunc(headereventcontxt).then((header) => {
        //      console.log("heaer data in localdaatatabl header datais:", header);
        if (header) {
          tbl = processTableWithSearchableHeader(this.metadataItem, header);
          this.metadataItem.addRelElementsOnType("header", "header", header);

          let table_data_function = tablefuctions.get("table_data_function");
          let tblBody = document.createElement("tbody");
          if (this.metadataItem.getData("table-caption-toolbar") != undefined) {
            let captionEle = document.createElement("caption");
            captionEle.classList.add("table-caption-toolbar");
            let ct = this.getTableCaptionToolbar("PGNTN");
            if (ct != undefined) {
              captionEle.appendChild(ct);
              tbl.insertBefore(captionEle, tbl.firstChild);
            }
            //  let tablebasediv= this.shadowRoot.querySelector(".table-base");
            //     tablebasediv.insertBefore(captionEle,tablebasediv.firstChild);
          }
          if (this.metadataItem.getData("table-caption") != undefined) {
            let captionv =
              this.metadataItem.getData("table-caption").fieldValue;

            let captionEle = document.createElement("caption");
            captionEle.classList.add("table-caption");
            captionEle.textContent = captionv;
            tbl.insertBefore(captionEle, tbl.firstChild);
          }
          let dataContext = 1;
          if (d.getData("table_data_function_event_context") != undefined) {
            dataContext = d.getData(
              "table_data_function_event_context"
            ).fieldValue;
          }

          if (
            this.metadataItem.getData("table_is_filterable") != undefined &&
            this.metadataItem.getData("table_is_filterable").fieldValue
          ) {
            let actionTb = tbl
              .querySelector(".table-caption-toolbar")
              .querySelector(".table-action-toolbar");
            let filterRow = getFilterDataRow(
              this.metadataItem,
              header,
              new Item(),
              this.metadataItem.fields.get("table_data_collection").fieldValue,
              this.handleFilterChange,
              this.configServices
            );
            // console.log("Adding new filtered row:",filterRow);
            let filterMenuItem = new Item();
            filterMenuItem.addData(
              "collection",
              this.metadataItem.fields.get("table_data_collection").fieldValue
            );
            filterMenuItem.addData(
              "filter_data_function",
              this.handleFilterChange
            );
            filterMenuItem.addData(
              "filter_attr_list",
              new ItemData("filter_attr_list", header)
            );
            // console.log("this.metadataItem.fields.get(filter_attribute_ignore_list)::",this.metadataItem);
            filterMenuItem.addData(
              "filter_attribute_ignore_list",
              new ItemData(
                "filter_attribute_ignore_list",
                this.metadataItem.fields.get(
                  "filter_attribute_ignore_list"
                ).fieldValue
              )
            );
            filterMenuItem.addRelElementsOnType(
              "SERVICES",
              "data_function_services",
              this.services
            );
            filterMenuItem.addRelElementsOnType(
              "FUNCTIONS",
              "table_filter_attr_conditions_function",
              this.metadataItem
                .getRelElementsOnType("FUNCTIONS")
                .get("table_filter_attr_conditions_function")
            );
            filterMenuItem.addRelElementsOnType(
              "SECC",
              "secc",
              this.metadataItem.getRelElementsOnType("SECC").get("secc")
            );
            filterMenuItem.addData(
              "secc",
              new ItemData("secc", this.metadataItem.getData("secc").fieldValue)
            );

            // console.log("Filter menu item befor calling the table filter ::",filterMenuItem);
            let tblFilter = new TableFilter(filterMenuItem);
            actionTb.parentNode.appendChild(tblFilter);
            tblFilter.classList.add("hidecomp");
            actionTb.appendChild(filterRow);

            // }
          }
          // tbl.appendChild(tblBody);
          //       console.log("Data contect being passed to table data function:",dataContext);
          table_data_function(dataContext).then((data) =>
            this.renderDataTable(data, tbl, tblBody, "base", "PGNTN")
          );
          tbl.classList.add("ro-data-table");
          this.displayTable(tbl);
        }
      });
    } else if (headerNature === "STATIC") {
      let tableHeaderData = d
        .getRelElementsOnType("RNDR_MDT")
        .get("table-header");
    }
  }
  renderDataTable = (
    data,
    tbl,
    tblBody,
    callcontext,
    pgntdataContext,
    paginationContextItem
  ) => {
    let filterow = tblBody.querySelector(".filterrow");
    if (data) {
      if (callcontext != "base") {
        // console.log("renderDataTable tbl is",tbl);
        let tb = tbl.querySelector("tbody");
        if (tb != undefined) {
          tbl.removeChild(tb);
        }
      }
      //  alert('after remvoing tbody')
      tblBody = document.createElement("tbody");
      if (callcontext === "base") {
        let tablebasediv = this.shadowRoot.querySelector(".table-base");
        tablebasediv.appendChild(tbl);
      }
      tbl.appendChild(tblBody);
      let header = this.metadataItem
        .getRelElementsOnType("header")
        .get("header");
      if (
        this.metadataItem.getData("table_is_editable") != undefined &&
        this.metadataItem.getData("table_is_editable").fieldValue
      ) {
        // console.log("this.metadataItem.fields.get(table_data_collection).fieldValue is:",this.metadataItem.fields.get("table_data_collection").fieldValue);

        let addEle = new Item();
        //  console.log("METAdataitem before addrow::",this.metadataItem);
        addEle.addData(
          "parentId",
          new ItemData(
            "parentId",
            this.metadataItem
              .getData("table_data_function_event_context")
              ?.fieldValue?.getData("parentId")?.fieldValue
          )
        );

        //      console.log('function services passing before getAddRow call', this.services);
        let addrow = getAddDataRow(
          this.metadataItem.getData("secc").fieldValue,
          header,
          addEle,
          this.metadataItem.fields.get("table_data_collection").fieldValue,
          this.services,
          this.configServices,
          this.metadataItem.getData("cells_on_field_id")?.fieldValue
        );
        tblBody.appendChild(addrow);
      }
      let dataset = new Item();
      data.forEach((ele) => {
        let fields = ele.fields;
        let drow = undefined;
        // console.log("this.metadataItem.getData(table_is_editable)::",this.metadataItem.getData("table_is_editable"));
        if (
          this.metadataItem.getData("table_is_editable") != undefined &&
          this.metadataItem.getData("table_is_editable").fieldValue
        ) {
          drow = getUpdataRow(
            this.metadataItem.getData("secc").fieldValue,
            header,
            ele,
            this.metadataItem.fields.get("table_data_collection").fieldValue,
            this.metadataItem.getData("select_values_mapper").fieldValue,
            this.services,
            this.metadataItem.getData("cells_on_field_id")?.fieldValue,
            this.metadataItem
          );
          if (
            this.metadataItem.fields.get("set_parent_attribute_from_element")
              ?.fieldValue
          ) {
            drow.setAttribute("prnt", ele.parentId);
          }
        } else {
          // console.log("call under getting RO row");

          //  console.log("this.metadataItem.fields.get(table_is_editable).fieldValue is:",this.metadataItem.fields.get("table_is_editable").fieldValue);
          // console.log('function services passing before readOnlyRow call', this.services);

          drow = getReadonlyRow(
            this.metadataItem.getData("secc").fieldValue,
            this.metadataItem,
            header,
            ele,
            this.metadataItem.fields.get("table_data_collection").fieldValue,
            this.services,
            this.metadataItem.getData("cells_on_field_id")?.fieldValue
          );
        }
        tblBody.appendChild(drow);
      });
      if (
        this.metadataItem.getData("table_is_paginated") != undefined &&
        this.metadataItem.getData("table_is_paginated").fieldValue === true
      ) {
        this.appendTablePagination(pgntdataContext, paginationContextItem);
      }

      // tbl.appendChild(tfooter);
      if (callcontext === "base") {
        let caption = tbl.querySelectorAll("caption")[1];
        // console.log("caption isL::",caption);
        if (
          this.metadataItem.getData("table_is_paginated") != undefined &&
          this.metadataItem.getData("table_is_paginated").fieldValue === true
        ) {
          this.attachTablePageChangeEentListerner(
            caption,
            tbl,
            tblBody,
            this.metadataItem
              .getRelElementsOnType("FUNCTIONS")
              .get("table_data_function")
          );
        }
      }
    }

    let skeleton_table = this.shadowRoot.querySelector(".skeleton-container");
    // console.log("skeleton-container in localdatatable is", skeleton_table);
    if (skeleton_table != null) {
      skeleton_table.classList.add("hide");
    }
    let progressContainer = this.shadowRoot.querySelector(
      ".progress-container"
    );
    //   console.log("progress-container in localdatatable is", progressContainer);

    if (progressContainer != null) {
      progressContainer.classList.add("hide");

      // this.tableBase.removeChild(progressContainer)
    }
    let modal = this.page_loader.shadowRoot.querySelector(".modal-box");
    if (modal != null) {
      modal.close();
    }
    tbl.classList.remove("hide");
  };

  attachFilteredPageChangeEventListener = (filterItem) => {
    this.shadowRoot
      .querySelector(".tbl-footer")
      .removeEventListener("table-page-change", this.handleTablePagination);

    this.shadowRoot
      .querySelector(".tbl-footer")
      .addEventListener("table-page-change", (event) =>
        this.handleFilteredTablePagination(event, filterItem)
      );
  };

  handleFilteredTablePagination = (evnt, filterItem) => {
    // console.log("page change on table",evnt.detail);
    // TODO FIX THIS
    // show skeleton again
    //   let skeleton_table=this.shadowRoot.querySelector('.skeleton-container');
    //   console.log("skeletontable to unhide is:",skeleton_table);
    // if(skeleton_table !=null){
    //    skeleton_table.classList.remove("hide");
    // }
    let pgntdataContext = evnt.detail.current_page_no;
    let metadataitm = new Item();
    metadataitm.addData("pageno", new ItemData("pageno", pgntdataContext - 1));
    metadataitm.addData("size", new ItemData("size", 100));
    filterItem.metaData = metadataitm;
    let tablefuctions = this.metadataItem.getRelElementsOnType("FUNCTIONS");

    let table_filter_data_function = tablefuctions.get(
      "table_filter_data_function"
    );
    let tbl = this.shadowRoot.querySelector(".ro-data-table");
    let tbd = tbl.getElementsByTagName("tbody")[0];
    this.addProgressScreen(tbl);
    // console.log("table_filter_data_function is::",table_filter_data_function);
    table_filter_data_function(filterItem).then((data) =>
      this.renderDataTable(data, tbl, tbd, "filtered", undefined, filterItem)
    );
  };

  attachTablePageChangeEentListerner = (
    caption,
    tbl,
    tblBody,
    table_data_functn
  ) => {
    this.shadowRoot
      .querySelector(".tbl-footer")
      .addEventListener("table-page-change", this.handleTablePagination);
  };

  handleTablePagination = (evnt) => {
    // console.log("page change on table",evnt.detail);

    // FIX THIS
    // let skeleton_table=this.shadowRoot.querySelector('.skeleton-container');
    //console.log("skeletontable to unhide is:",skeleton_table);
    // if(skeleton_table !=null){
    //skeleton_table.classList.remove("hide");
    let pgntdataContext = evnt.detail.current_page_no;
    if (
      this.metadataItem.getData("table_data_function_event_context") !=
      undefined
    ) {
      pgntdataContext = this.metadataItem.getData(
        "table_data_function_event_context"
      ).fieldValue;
      pgntdataContext.addData(
        "pageNo",
        new ItemData("pageNo", evnt.detail.current_page_no)
      );
    }
    // let table_data_function=  this.metadataItem.getRelElementsOnType("FUNCTIONS").get("table_data_function");
    // console.log("table_data_function in local data table:::::",table_data_function,"    ::::pgntdataContext::::",pgntdataContext);
    let table_data_function = this.metadataItem
      .getRelElementsOnType("FUNCTIONS")
      .get("table_data_function");
    let tbl = this.shadowRoot.querySelector(".ro-data-table");
    let tblBody = tbl.querySelector("tbody");
    this.addProgressScreen(tbl);
    table_data_function(pgntdataContext).then((datan) =>
      this.renderDataTable(datan, tbl, tblBody, "paginated")
    );
  };
  handleFilterChange = (filterItem) => {
    // FIX THIS
    //let skeleton_table=this.shadowRoot.querySelector('.skeleton-container');
    //console.log("skeletontable to unhide is:",skeleton_table);
    // if(skeleton_table !=null){
    //skeleton_table.classList.remove("hide");
    // console.log("filter change on table",filterItem,"this.metadataItem",this.metadataItem, "this is:",this);

    let tbl = this.shadowRoot.querySelectorAll(".ro-data-table")[0];
    // tbl.getElementsByTagName("tbody");
    // let tblBody=tbl.querySelector("tbody");

    if (this.metadataItem.getData("table-caption-toolbar") != undefined) {
      let caption = tbl.querySelectorAll("caption")[1];
      let tblBody = tbl.querySelector("tbody");
      this.addProgressScreen(tbl);
      // console.log("caption isL::",caption);
      if (
        this.metadataItem.getData("table_is_paginated") != undefined &&
        this.metadataItem.getData("table_is_paginated").fieldValue === true
      ) {
        this.attachFilteredPageChangeEventListener(filterItem);
      }
      // this.attachTablePageChangeEentListerner(caption,tbl,tblBody, this.metadataItem.getRelElementsOnType("FUNCTIONS").get("table_filter_data_function"));
    }
    let tablefuctions = this.metadataItem.getRelElementsOnType("FUNCTIONS");

    let table_filter_data_function = tablefuctions.get(
      "table_filter_data_function"
    );
    let tbd = tbl.getElementsByTagName("tbody")[0];
    let pgntdataContext = filterItem;
    // console.log("table_filter_data_function is::",table_filter_data_function);
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
  addProgressScreen(tbl) {
    let sktblb = this.shadowRoot.querySelector(".skeleton-container");
    // let sktblb2=sktblb.cloneNode(true);
    sktblb.classList.remove("hide");
    // let tbase=this.shadowRoot.querySelector(".table-base");
    // tbase.insertBefore(sktblb2,tbase.firstChild);
    tbl.classList.add("hide");
  }
  addProgressScreen_bkup(tbl) {
    let sktblb = this.shadowRoot.querySelector(".skeleton-container");
    let sktblb2 = sktblb.cloneNode(true);
    sktblb2.classList.remove("hide");
    let tbase = this.shadowRoot.querySelector(".table-base");
    tbase.insertBefore(sktblb2, tbase.firstChild);
    tbl.classList.add("hide");
  }
  getTableCaptionToolbar(pgntnCfgContext, paginationContextItem) {
    let ele = document.createElement("div");
    ele.classList.add("table-action-toolbar");
    let iconsStr = ``;
    // console.log("this.metadataItem.getData(table-caption-toolbar)::",this.metadataItem.getData("table-caption-toolbar").fieldValue);
    let itm = new Item();
    let buttonclassFuncMap = new Map();
    itm = this.metadataItem.getData("table-caption-toolbar").fieldValue;
    //  // console.log("values in rndr mdp", itm.getRelElementsOnType("RNDR_MDT").values());

    Array.from(itm.getRelElementsOnType("RNDR_MDT").values()).forEach((val) => {
      iconsStr = `${iconsStr}${val.getData("toolbar-icon-element").fieldValue}`;
      buttonclassFuncMap.set(
        val.getData("button-name").fieldValue,
        val
          .getRelElementsOnType("FUNCTIONS")
          .get("toolbar-icon-element-action-function")
      );
    });
    //  console.log("buttonclassFuncMaps are:: ",buttonclassFuncMap);
    ele.innerHTML = `${iconsStr}`;
    // console.log("Childnodes of toolbar elements are: ",ele.childNodes);
    buttonclassFuncMap.forEach((value, key) => {
      //    console.log("map key:",key,"map value:",value);
      let btnele = ele.querySelectorAll("." + key)[0];
      //     console.log("button elee to add function is:",btnele);
      btnele.addEventListener("click", (e) => value(e));
    });
    // console.log("check if table is paginated",this.metadataItem);
    // console.log("value on preplist:",itm)
    Array.from(itm.getRelElementsOnType("PREPEND_LIST").values()).forEach(
      (value) => {
        // console.log("value on preplist:",value);
        let divToprepend = value.getData("func").fieldValue;
        ele.insertBefore(divToprepend, ele.firstChild);
      }
    );
    if (ele.childNodes.length > 0) return ele;
    else return undefined;
  }

  appendTablePagination(pgntnCfgContext, paginationContextItem) {
    if (
      this.metadataItem.getData("table_is_paginated") != undefined &&
      this.metadataItem.getData("table_is_paginated").fieldValue === true
    ) {
      // // console.log("table is paginated",itm.getRelElementsOnType("PGNTN"));
      let itm = this.metadataItem.getData("table-caption-toolbar").fieldValue;
      let paginationconfig = itm
        .getRelElementsOnType(pgntnCfgContext)
        .values()
        .next().value;
      // if(pgntnCfg!=undefined){
      //   paginationconfig=pgntnCfg;
      // }
      // console.log("table is paginated pgntnCfgContext",pgntnCfgContext);
      // console.log("table is paginated",paginationconfig);
      if (paginationconfig != undefined) {
        // console.log("pagination config is not undefined pgntnCfgContext",pgntnCfgContext)
        // console.log("pagination config is not undefined",paginationconfig)
        paginationconfig.addData(
          "paginationContextItem",
          new ItemData("paginationContextItem", paginationContextItem)
        );
        paginationconfig.addData("styles", new ItemData("styles", pageCSS));
        // console.log("pgntnCfgContext before creating pagination elment is:",pgntnCfgContext);
        // console.log("paginationContextItem before creating pagination elment is:",paginationContextItem);
        // console.log("paginationconfig before creating pagination elment is:",paginationconfig);
        let paginationelement = new Pagination(paginationconfig);
        let tblprnt = this.shadowRoot.querySelector(".table-base");

        let tfooter = tblprnt.querySelector(".tbl-footer");
        if (tfooter == undefined || tfooter == null) {
          tfooter = document.createElement("div");
          tfooter.classList.add("tbl-footer");

          tblprnt.appendChild(tfooter);
        } else {
        }
        let paginationlink = tfooter.querySelector("pagination-links");
        if (paginationlink != undefined && paginationlink != null) {
          tfooter.removeChild(paginationlink);
        }

        tfooter.appendChild(paginationelement);
      }

      // let tblfooter=tblprnt.querySelector(".tbl-footer");
      // ele.appendChild(paginationelement);
    }
  }
  displayTable(tbl) {
    let theadele = tbl.getElementsByTagName("thead")[0];
    theadele.addEventListener("click", () => {
      this.shadowRoot
        .querySelectorAll(".search-input")
        .forEach((inputField) => {
          const tableRows = inputField
            .closest("table")
            .querySelectorAll("tbody > tr");
          tableRows.forEach((tablerow) => {
            //           // console.log("               row.style.visibility on currentrrow is:           "+tablerow.rowIndex,  tablerow.style.visibility);
          });
          //         // console.log(tableRows)
          const headerCell = inputField.closest("th");
          const otherHeaderCells = headerCell.closest("tr").children;
          const columnIndex = Array.from(otherHeaderCells).indexOf(headerCell);
          const searchableCells = Array.from(tableRows)
            .filter((r) => r.style.visibility != "collapse")
            .map((row) => row.querySelectorAll("td")[columnIndex]);

          inputField.addEventListener("input", () => {
            const searchQuery = inputField.value.toLowerCase();
            //           // console.log("searchquery is:",searchQuery);
            for (const tableCell of searchableCells) {
              const row = tableCell.closest("tr");
              let cellele = tableCell.firstChild;

              let val = cellele.value;
              if (cellele.nodeName === "SELECT") {
                //               // SELECT
                val = cellele.options[cellele.selectedIndex].text;
              }
              if (cellele.nodeName === "TOGGLE-SWITCH") {
                //to do retouch fix for check box
                let toggleSwitchInput =
                  cellele.shadowRoot.querySelectorAll(".switch-checkbox")[0];
                val = toggleSwitchInput.checked + "";
              }
              const value = val.toLowerCase().replace(",", "");

              row.style.visibility = null;

              if (value.search(searchQuery) === -1) {
                row.style.visibility = "collapse";
              }
            }
          });
        });
    });
  }
}
customElements.define("local-data-table", LocalDataTable);
