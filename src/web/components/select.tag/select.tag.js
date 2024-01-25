export class SelectTag extends HTMLElement{
    constructor(item){
        super();
        this.attachShadow({mode : "open"});
        this.metaDataItem = item;
    }
    connectedCallback(){
        //this.shadowRoot = ``;
        console.log("data received from metadata item", this.metaDataItem);
        let select = document.createElement("select");
        // let op = document.createElement("option");
        // op.textContent = "select option";
        // select.appendChild(op);
        select.appendChild(new Option("select option"));
        this.shadowRoot.appendChild(select);
        this.metaDataItem.forEach(element => {
            // let op = document.createElement("option");
            // op.textContent = element.name;
            // select.appendChild(op);
            select.appendChild(new Option(element.name, element.name));
        });
        // select.addEventListener("change", () => {
        //     localStorage.setItem("option", select.value);
        //     console.log("data stored successfully");
        //     let option = this.localStorage.getItem("option");
        //     console.log(option);
        // })
        select.addEventListener("change", (event) => {
            //console.log("value from select element", select.value);
            localStorage.setItem("option", select.value);
            console.log("data stored successfully");
            let option = localStorage.getItem("option");
            console.log(option);
        })
        //console.log(select);
    }
}
customElements.define("input-select", SelectTag);