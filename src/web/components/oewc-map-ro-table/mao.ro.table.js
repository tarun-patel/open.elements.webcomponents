import html from './map.ro.table.html';
import styles from './map.ro.table.styles.scss';

export class MapRoTable extends HTMLElement {
     metadataItem;
    constructor(item){
        super();
        this.attachShadow({mode:'open'})
        this.metadataItem=item;
    }
    connectedCallback(){
        // let data=new ItemData();
        // 
        console.log("this.metadataItem.fieldValue",this.metadataItem.fieldValue);
        if(this.metadataItem.fields.get("field")!=undefined){
        const map = new Map(Object.entries(JSON.parse(JSON.stringify(this.metadataItem.fields.get("field").fieldValue))));
        console.log("map in rotable:",map);
      this.shadowRoot.innerHTML=` <style>${styles}</style> ${html} `
      let template=this.shadowRoot.getElementById("maprotabletemplapteid");
      let templateContent = template.content;
      this.shadowRoot.appendChild(templateContent.cloneNode(true));
      let thkey=this.shadowRoot.querySelectorAll(".theadkey")[0];

        console.log("metadta item in mapro table is:",this.metadataItem);
        // let thkey=document.createElement('th');
        thkey.textContent=this.metadataItem.fields.get("key_column_name").fieldValue;
        // thkey.setAttribute("slot","theadkey");
        // this.shadowRoot.appendChild(thkey);
      let thval=this.shadowRoot.querySelectorAll(".theadvalue")[0];
      
      let tbodye=this.shadowRoot.querySelectorAll(".tblbody")[0];

        thval.textContent=this.metadataItem.fields.get("value_column_name").fieldValue;
        map.forEach((v,k,m)=>{
          let row=  document.createElement("tr");
            let ktd=document.createElement("td");
            ktd.textContent=k;
            let vtd=document.createElement("td");
            vtd.textContent=v;
            row.appendChild(ktd);
            row.appendChild(vtd);
            tbodye.append(row);
        })
    }
        // thval.setAttribute("slot","theadvalue");
        // this.shadowRoot.appendChild(thval);
  
    }
}
customElements.define('map-ro-table',MapRoTable);

//  export default MapRoTable;