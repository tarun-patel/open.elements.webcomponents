export class SlotElement extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode : "open"});
    }
    connectedCallback(){
        
        let div1 = document.createElement("div");
        div1.innerHTML = `
        <slot name="name"></slot>
        <slot name="email"></slot>`;
        this.shadowRoot.appendChild(div1);
        
        let username = document.createElement("div");
        
        username.setAttribute("slot", "name");
        username.innerHTML = "priya";
        
        this.appendChild(username);

        let email = document.createElement("div");
        email.innerHTML = "priya@gmail.com";
        email.setAttribute("slot", "email");
        this.appendChild(email);
        
    }
}
customElements.define("slot-ele", SlotElement);