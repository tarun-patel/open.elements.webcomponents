import { EntityUtil, Item } from "open.elements.data.ts";

export class ItemServiceUtil{
    getItem(data:any):Item{
        let eu= new EntityUtil();
        const compStr = JSON.stringify(data, eu.replacerns);
        let datas:Item = JSON.parse(compStr,Item.reviver);
        return datas;
    }
    getItemJson(data:Item):string{
        let eu= new EntityUtil();
       return  JSON.stringify(data, eu.replacerns);
    }
    getItemOnText(itemstring:string):Item{
        // let eu= new EntityUtil();
        // const compStr = JSON.stringify(data, eu.replacerns);
        let datas:Item = JSON.parse(itemstring,Item.reviver);
        return datas;
    }


    getItems(data:any):Array<Item>{
        // console.debug("data in fetch api response is:");
        // console.debug(data);
       let eles=JSON.parse(JSON.stringify(data));
        // console.debug(eles);
        let resposeArray:Array<Item>= new Array<Item>();
        eles.forEach(element => {
          // console.debug("each record is:");
         let ele=this.getItem(element);
          // console.debug(ele);
          resposeArray.push(ele)
        });
        return resposeArray;
    }
}
