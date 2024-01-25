// import html from "./table.html";
// import styles from "./tabletag.styles.scss";


export class displayTable extends HTMLElement{
    constructor(item){
        super();
        this.item = item;
        this.attachShadow({mode : "open"});
    }
    connectedCallback(){
        // this.shadowRoot.innerHTML = `<style>${styles}</style>${html} `;
        console.log("item received in display table",this.item);
        let tabledata=document.createElement('table');
        let tableRow = document.createElement('tr');
        let fields = this.item.fields;
        console.log(fields);
        fields.forEach(element => {
            console.log(element);
            let th = document.createElement('th');
            th.innerHTML = element.fieldValue;
            tableRow.appendChild(th);
        });
        tabledata.appendChild(tableRow);
        this.shadowRoot.appendChild(tabledata);
    }
}
customElements.define('display-table',displayTable);