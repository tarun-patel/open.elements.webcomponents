
import { Item } from 'open.elements.data.ts';
import { SelectMulOptions } from '../select_tags/select.tag';

export class  ElementTest extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        // creating an item and name it

        let item=new Item();
        item.name='select element'; 

        let optionItem1=new Item();
        optionItem1.name='India';
        item.addRelElementsOnType('options',optionItem1.name,optionItem1);
 
        let optionItem2=new Item();
        optionItem2.name='USA';
        // item.name='select element';
        item.addRelElementsOnType('options',optionItem2.name,optionItem2)

        let optionItem3=new Item();
        optionItem3.name='China';
        // item.name='select element';
        item.addRelElementsOnType('options',optionItem3.name,optionItem3)
        // console.log(item.name)

        let optionItem4=new Item();
        optionItem4.name='Japan';
        item.addRelElementsOnType('options',optionItem4.name,optionItem4);

        let optionItem5=new Item();
        optionItem5.name='Canada';
        item.addRelElementsOnType('options',optionItem5.name,optionItem5);

        let optionItem6=new Item();
        optionItem6.name='Bangladesh';
        item.addRelElementsOnType('options',optionItem6.name,optionItem6);

        let optionItem7=new Item();
        optionItem7.name='ABC';
        item.addRelElementsOnType('options',optionItem7.name,optionItem7);

       let multiSelc= new SelectMulOptions(item);
       
       this.shadowRoot.appendChild(multiSelc);
    }
}
customElements.define('element-test',ElementTest);