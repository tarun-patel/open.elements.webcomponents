export class ButtonElment extends HTMLElement{
    constructor(){
        super();
        //this.metaDataItem = item;
        this.attachShadow({mode : "open"});
    }
    data(item){
        this.metaDataItem = item;
    }
    connectedCallback(){
        let fields = this.metaDataItem.fields;
        let customStyle = fields.get("custom-style").fieldValue;
        console.log("custom styles received ", customStyle);
        this.shadowRoot.innerHTML = `<style> ${customStyle} </style>`;
        let ele = fields.get("element").fieldValue;
        let type = fields.get("type").fieldValue;
        let isDisabled = fields.get("disabled").fieldValue;
        console.log(isDisabled);

        let button = document.createElement(ele);
        button.textContent = type;
        button.type = type;
        
        this.shadowRoot.appendChild(button);
        if(isDisabled != undefined){
            button.disabled = isDisabled;
        }
        
        button.addEventListener("click", () => {
            console.log("button clicked");

        })
        
        

        
    }
}
customElements.define("button-submit", ButtonElment);