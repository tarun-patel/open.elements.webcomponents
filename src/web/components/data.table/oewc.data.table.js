// import { EditableTableBodyElement } from '../../../../npm-modules/open-wc-elements/open-wc-elements';
// import { TaggedSelect } from '../../../custom/tagged-select/tagged-select';
import html from './oewc.data.table.html';
import styles from './oewc.data.table.styles.scss';
import { Item, ItemData } from "open.elements.data.ts";
import { getUpdataRow, processTableWithHeader } from './oewc.data.table.builder';
export class DataTable extends HTMLElement {
  metadataItem;
  constructor(item) {
    super();
    this.metadataItem = item;
    this.shadow = this.attachShadow({ mode: 'open' });
    console.log("THIS METAATA ITEM IN Datatable");
    console.log(this.metadataItem);
  }
  connectedCallback() {
    this.shadow.innerHTML = `  <style>${styles}</style>${html}`

    let fields = this.metadataItem.fields;
    let mainStyles = fields.get("table-styles").fieldValue;
    this.shadow.innerHTML = `  <style>${styles} ${mainStyles}</style>${html}`

   
    let tbl;
    let d=new Item();
    d=this.metadataItem;
    let  tablefuctions=d.getRelElementsOnType("FUNCTIONS");
    console.log("Connected call back  Datatable getting table_header_data_nature");

    let headerNature=    d.getData("table_header_data_nature").fieldValue;
    if(headerNature==="DYNAMIC"){
   let headrfunc=   tablefuctions.get("table_header_data_function");
      headrfunc().then(header=>{
        console.log("data in headerfunction processing in taable:",header);

        if(header){
         tbl=processTableWithHeader(header);
         console.log("table in datatable is:",tbl);
        let relEles = header.getRelElementsOnType("RNDR_MDT");
        let table_data_function=  tablefuctions.get("table_data_function");
        let collectionname=header.fields.get("collection").fieldValue;
        let tblBody = document.createElement("tbody");

        table_data_function().then(data=>{
          if (data) {
            console.debug("data on get on parent in product type attribute is:");
            console.debug(data);
            console.debug("collectionname on context id in product type attribute is:");
            console.debug(collectionname);
            
            let dataset = new Item();
            data.forEach(ele => {
    
              let fields = ele.fields;
              
              let drow = getUpdataRow(relEles, ele,collectionname);
    
    
              // tblBody.appendChild(drow);
    
              tblBody.appendChild(drow);
              
            });
            // console.debug("productTypeId for using in the add row for attributes is:",productTypeId);
            // let productTypeItem= new Item();
            // // productTypeItem.addData("product_type_id",new ItemData("product_type_id",productTypeId));
            // let attrField=new ItemData("attribute","attribute");
            // attrField.parentName="5eb4ed17-689d-462a-a5df-570a7592f877";
            // attrField.parentType="product_type_metadata";
            // attrField.ref_comp_type="xor";
            // productTypeItem.addData("attribute",attrField);
            // // let addrow = getAddDataRow(relEles, new Item(), "product");
            // addrow.setAttribute("prnt",productTypeId);
    
            // tblBody.appendChild(addrow);
            // this.createAttributeDorpdownx(data);
    
          }
          tbl.appendChild(tblBody);
        })
        this.shadowRoot.appendChild(tbl);

      }
      })
    }else if(headerNature==="STATIC"){
      let tableHeaderData=d.getRelElementsOnType("RNDR_MDT").get("table-header");

    }



  }
}
customElements.define('oewc-data-table', DataTable)


