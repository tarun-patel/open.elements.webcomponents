


import { Item } from 'open.elements.data.ts';
import styles from './select.tag.styles.scss'
import html from './select.tag.html'

 export class SelectMulOptions extends HTMLElement{
     
    // item object --> it contains the list of options from to be displayed on the UI 
     item=new Item();

     drawer=null;
     ul=null;
     li=null;
     button=null;
     optionsList=null;
     input=null;
     inputContainer=null;
     //during the constructor call we are passing the options item, and making use of that item
    constructor(item){
        super();
        this.item=item;
        this.attachShadow({mode:'open'});
    }


    connectedCallback(){
        this.shadowRoot.innerHTML=`<style>${styles}</style>`
        // creating a select element and assigning the item id 
        let selectElm=document.createElement('select');

        // we are assigning the id and name of the item to the element 
        selectElm.id=this.item.id;
        selectElm.name=this.item.name;

        // selectElm.multiple=true;
        // selectElm.style.display='none';

        // getting the options which are present inside the item object 
        let options=this.item.getRelElementsOnType('options');
        console.log(options);
        console.log(options.keys())

        let defaultValue=undefined;

        if(this.item.fields!==undefined){
            defaultValue=this.item.fields.get('default-value').fieldValue;

        }

        // take options list and loop over through each option

        // on each option(key) create the option element--> adding options to the select element
        Array.from(options.keys()).forEach(key => {

            // on each ooption key is there take that key and make it as OptionsObjects
            let oObj= options.get(key);
            console.log(oObj)
            let op=document.createElement('option');
            op.text=oObj.name;
            op.value=oObj.id;

            if(defaultValue===op.text || defaultValue===op.value){
                op.selected=true;
            }
            selectElm.add(op);
        });

        // console.log(selectElm.options)
        
        let elem=this.createElements(selectElm);

        // this.shadowRoot.appendChild(selectElm);
        this.shadowRoot.appendChild(elem)
        this.addevents();

    }

    //getting options from the select element--> reading the options from the select element
    getOptions(selectElm){
        return[...selectElm.options].map((op)=>{
            console.log(op.value,op.label,op.selected)

            return {
                value:op.value,
                label:op.label,
                selected:op.selected
            }
        })
    }

    createElements(selectElm){

      let  customSelectContainer = document.createElement('div')
        customSelectContainer.classList.add('mult-select-tag')

        // .container
       let  wrapper = document.createElement('div')
        wrapper.classList.add('wrapper')

        // body
        let body = document.createElement('div')
        body.classList.add('body');

        this.inputContainer = document.createElement('div')
        this.inputContainer.classList.add('input-container')

        body.append(this.inputContainer)

        // .btn-container
        let btnContainer = document.createElement('div')
        btnContainer.classList.add('btn-container')

        // button
        this.button = document.createElement('button')
       this. button.type = 'button'
        btnContainer.append(this.button);

        var domParser = new DOMParser();
        const icon = domParser.parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 21 6 15"></polyline></svg>`, 'image/svg+xml').documentElement
        this.button.append(icon)
 
        body.append(btnContainer)
        wrapper.append(body);



        this.drawer = document.createElement('div');
        this.drawer.classList.add('drawer');
        this.drawer.classList.add('hidden');

        this.input = document.createElement('input')
        this.input.classList.add('input')
        this.input.placeholder = `Search...`;

       let inputBody = document.createElement('div')
        inputBody.classList.add('input-body')
        inputBody.append(this.input)

        this.drawer.append(inputBody)

        // let ulItem=new Item();
        // ulItem.name='options-list'
        this.ul = document.createElement('ul');
        // ul.id=ulItem.id;
        // ul.name=ulItem.name;


        this.optionsList= this.getOptions(selectElm);
        
        for (let opt of this.optionsList){
            console.log(opt);
            this.li=document.createElement('li');
            this.li.innerHTML=opt.label;
           this.li.dataset.value=opt.value;
           this.li.setAttribute('name',opt.label)

            this.ul.appendChild(this.li);
        }
        
        this.drawer.appendChild(this.ul)
    

        customSelectContainer.appendChild(wrapper)
        customSelectContainer.appendChild(this.drawer)
        
        return customSelectContainer;
    }

    addevents(){

        this.button.addEventListener('click',()=>{
        this.drawer.classList.toggle('hidden');
        
    })
        // console.log(this.ul.children);
    
        for(let li of this.ul.children){
            li.addEventListener('click',(e)=>{
                console.log(e.target.innerHTML);

                this.optionsList.find((o) => o.value == e.target.dataset.value).selected = true;
                //console.log(this.optionsList)
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item-container');

                const itemLabel = document.createElement('div');
                itemLabel.classList.add('item-label');

                itemLabel.innerHTML = e.target.innerHTML
                itemDiv.dataset.value = e.target.dataset.value; 
                itemLabel.dataset.value = e.target.dataset.value; 

                const itemClose = new DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="item-close-svg">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>`, 'image/svg+xml').documentElement
        
                itemClose.addEventListener('click', (e) => {
                    console.log('remove item')
                    

                })
            
                itemDiv.appendChild(itemLabel)
                itemDiv.appendChild(itemClose)
                this.inputContainer.append(itemDiv)
                })
        }
    }
    
}
customElements.define('multi-select', SelectMulOptions);

