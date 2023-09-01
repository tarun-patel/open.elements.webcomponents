import { Item } from "open.elements.data.ts";

export class EpConfig{
   env:string="local";
    epconfigItem:Item=new Item();
 endPoints:Map<string,Item>=new Map<string,Item>();
 collectionTypeMap:Map<string,string>=new Map<string,string>();

 constructor(){


}


getEndPointDetails(collection:string,operation:string){
    console.log("INPUT FOR GETTING URL DETIALS:",collection,operation);

  let map=this.epconfigItem.getAllRelElements();
  let envmap=map.get(this.env);
 let ele:Item=(envmap?.get(collection)) as Item;
   return ele.getData(operation);
}

getCollectionElementType(collection:string){
   return this.collectionTypeMap.get(collection);
}

}
