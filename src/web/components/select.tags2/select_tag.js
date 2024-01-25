import html from "./select.tag2.html";
export class selectTag extends HTMLElement{ 
    constructor(data){
        super();
        this.data=data;
        
        this.attachShadow({mode : "open"});
        
    }
    connectedCallback(){
         this.shadowRoot.innerHTML = `${html}`;
    console.log(this.data);
    let div = this.shadowRoot.querySelector('.selecttag');
    let select = document.createElement('select');
    this.data.forEach(element => {
        console.log('individual items',element);
        let op = document.createElement('option');
        op.value = element.name;
        op.id = element.id;
        op.textContent = element.name;
        console.log(op);
        select.add(op);
    });
    console.log(select);
    //this.shadowRoot.appendChild(select);
    div.appendChild(select);
    
    }
}
customElements.define('display-data',selectTag);