import html from './toggle.switch.html';
import styles from './toggle.switch.styles.scss';

export class ToggleSwitch extends HTMLElement {
     metadataItem;
    constructor(item){
        super();
        this.attachShadow({mode:'open'})
        this.metadataItem=item;
    }
    connectedCallback(){
        this.shadowRoot.innerHTML=` <style>${styles}</style> ${html} `

        let container=document.createElement('div');

        let label=document.createElement('label');
        label.classList.add('outer-container');

        let input=document.createElement('input');
        input.type='checkbox';
        input.classList.add('switch-checkbox');
        if(this.metadataItem!=undefined){
        input.checked=this.metadataItem.fieldValue;
    }else{
        input.checked=false;
    }
        let span=document.createElement('span');
        span.classList.add('switch-roller');


        label.appendChild(input);
        label.appendChild(span);

        container.appendChild(label);

        this.shadowRoot.appendChild(container);
  
    }
}
customElements.define('toggle-switch',ToggleSwitch);

//  export default ToggleSwitch;