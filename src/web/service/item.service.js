// import {db} from "./store/firestore-service";
import { EntityUtil, Item, ItemData } from "open.elements.data.ts";
import { EpConfig } from "./config/epconfig";
import { ItemServiceUtil } from "./item-servicee-util";

export class ItemService {
    // const hodcollection<FreightRule> = this.firestore.collection('products');
      roostore ='basecore_';
      // firestore;
    constructor(   ) {
        // this.firestore=db;
     }
  getContentById(ids, collection,subcollection) {
    // console.debug("in getcontentbyid");
    // console.debug(ids);
    // console.debug(collection);
    // console.debug(subcollection);
  return new Promise((res) => {
    // don't run if there aren't any ids or a path for the collection
   // if (!ids || !ids.length || !this.roostore+collection+'_'+subcollection)
    if (!ids || !ids.length  )
    { // console.debug("values arent proper");
      // console.debug(!ids);
      // console.debug(!ids.length);
      // console.debug(!this.roostore+collection+'_'+subcollection);
       return res([]);
    }
    const collectionPath = db.collection(this.roostore+collection+'_'+subcollection);
    let batches = [];
    // console.debug("collectionPath is ");
    // console.debug(collectionPath);
    while (ids.length) {
      // firestore limits batches to 10
      const batch = ids.splice(0, 10);
      // console.debug("batch is");
      // console.debug(batch);
      // console.debug("firebase.firestore.FieldPath");
      // console.debug(firebase.firestore.FieldPath.documentId());
      // add the batch request to to a queue
      batches.push(
        new Promise(response => {
          collectionPath
            .where(
              "uiid",
              'in',
              [...batch]
            )
            .get()
            .then(results => response(results.docs.map(result =>{
              let compstr=JSON.stringify(result.data());
              // console.debug(compstr);
                              let item=JSON.parse(compstr,Item.reviver);
                              return item;

            } )))
        })
      )
    }

    // after all of the data is fetched, return it
    Promise.all(batches).then(content => {
    //  let compstr=JSON.stringify(content);
    // console.debug("content is");
      // console.debug(content);
                 //     let item=JSON.parse(compstr,Item.reviver);
      res(content);
    })

  })
}

getAllBase(collection,subcollection){
  return new Promise((resolve, reject) => {
  // console.debug("respons from json");
  let collectionKey="getAllBase";
 let ecConfig=new EpConfig();

    // console.debug("looking EP for collection:"+subcollection+" operation:getAll");
    if(collection!=undefined && collection!="records"){
      collectionKey="getOnType_"+collection;
    }
  let epdata=ecConfig.getEndPointDetails(subcollection,collectionKey);
  // ;
    fetch(epdata.getValue()).then(response => {
    if(response.ok){
      // console.debug("API response is sucessfull ");
      return response.json();
    }else{
       console.error("API response is not  successfull ",response);
      return error("api unsucessfull");
    }
  }).then(data=>
    {
      // console.debug("data in fetch api response is:");
      // console.debug(data);
     let eles=JSON.parse(JSON.stringify(data));
      // console.debug(eles);
      let resposeArray= new Array();
      eles.forEach(element => {
        // console.debug("each record is:");
       let ele=this.parseData(element);
        // console.debug(ele);
        resposeArray.push(ele)
      });
    resolve(resposeArray)
    });
  });

 }

 
 postRaw(collection,subcollection,pathvar,item){
  return new Promise((resolve, reject) => {
  // console.debug("respons from json");
  let collectionKey="getAll";
 let ecConfig=new EpConfig();
 let eu= new EntityUtil();

    // console.debug("looking EP for collection:"+subcollection+" operation:getAll");
    // if(collection!=undefined && collection!="records"){
    //   collectionKey="getOnType_"+collection;
    // }
    console.log("getRaw::collection:"+collection,"subcollection"+subcollection);
  let epdata=ecConfig.getEndPointDetails(collection,subcollection);
  // ;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:  JSON.stringify(item, eu.replacerns)
};
    fetch(epdata.getValue()+pathvar,requestOptions).then(response => {
    if(response.ok){
      // console.debug("API response is sucessfull ");
      return response.json();
    }else{
       console.error("API response is not  successfull ",response);
      return error("api unsucessfull");
    }
  }).then(data=>
    {
      // console.debug("data in fetch api response is:");
      // console.debug(data);
     let eles=JSON.parse(JSON.stringify(data));
       console.debug(eles);
      // let resposeArray= new Array();
      // eles.forEach(element => {
      //   // console.debug("each record is:");
      //  let ele=this.parseData(element);
      //   // console.debug(ele);
      //   resposeArray.push(ele)
      // });
    resolve(this.parseData(eles))
    });
  });

 }
 getRaw(collection,subcollection,pathvar){
  return new Promise((resolve, reject) => {
  // console.debug("respons from json");
  let collectionKey="getAll";
 let ecConfig=new EpConfig();

    // console.debug("looking EP for collection:"+subcollection+" operation:getAll");
    // if(collection!=undefined && collection!="records"){
    //   collectionKey="getOnType_"+collection;
    // }
    console.log("getRaw::collection:"+collection,"subcollection"+subcollection);
  let epdata=ecConfig.getEndPointDetails(collection,subcollection);
  // ;
    fetch(epdata.getValue()+pathvar).then(response => {
    if(response.ok){
      // console.debug("API response is sucessfull ");
      return response.json();
    }else{
       console.error("API response is not  successfull ",response);
      return error("api unsucessfull");
    }
  }).then(data=>
    {
      // console.debug("data in fetch api response is:");
      // console.debug(data);
     let eles=JSON.parse(JSON.stringify(data));
       console.debug(eles);
      // let resposeArray= new Array();
      // eles.forEach(element => {
      //   // console.debug("each record is:");
      //  let ele=this.parseData(element);
      //   // console.debug(ele);
      //   resposeArray.push(ele)
      // });
    resolve(this.parseData(eles))
    });
  });

 }
 getAllOnPathVars(collection,subcollection,pathvar){
  return new Promise((resolve, reject) => {
  // console.debug("respons from json");
  let collectionKey="getAll";
 let ecConfig=new EpConfig();

    // console.debug("looking EP for collection:"+subcollection+" operation:getAll");
    if(collection!=undefined && collection!="records"){
      collectionKey="getOnType_"+collection;
    }
  let epdata=ecConfig.getEndPointDetails(subcollection,collectionKey);
  // ;
    fetch(epdata.getValue()+pathvar).then(response => {
    if(response.ok){
      // console.debug("API response is sucessfull ");
      return response.json();
    }else{
       console.error("API response is not  successfull ",response);
      return error("api unsucessfull");
    }
  }).then(data=>
    {
      // console.debug("data in fetch api response is:");
      // console.debug(data);
     let eles=JSON.parse(JSON.stringify(data));
      // console.debug(eles);
      let resposeArray= new Array();
      eles.forEach(element => {
        // console.debug("each record is:");
       let ele=this.parseData(element);
        // console.debug(ele);
        resposeArray.push(ele)
      });
    resolve(resposeArray)
    });
  });

 }


 
 filter(collection,subcollection,pathvar,item){
let eu= new EntityUtil();

  return new Promise((resolve, reject) => {
  // console.debug("respons from json");
  let collectionKey="getAll";
 let ecConfig=new EpConfig();

    // console.debug("looking EP for collection:"+subcollection+" operation:getAll");
    // if(collection!=undefined && collection!="records"){
    //   collectionKey="getOnType_"+collection;
    // }
    console.log("FILTER REQQUEST::",JSON.stringify(item, eu.replacerns));
     const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:  JSON.stringify(item, eu.replacerns)
  };
  let epdata=ecConfig.getEndPointDetails(collection,subcollection);
  fetch(epdata.getValue(), requestOptions)
  .then(response => {
    if(response.ok){
      // console.debug("API response is sucessfull ");
      return response.json();
    }else{
       console.error("API response is not  successfull ",response);
      return error("api unsucessfull");
    }
  }).then(data=>
    {
      // console.debug("data in fetch api response is:");
      // console.debug(data);
     let eles=JSON.parse(JSON.stringify(data));
      // console.debug(eles);
      let resposeArray= new Array();
      eles.forEach(element => {
        // console.debug("each record is:");
       let ele=this.parseData(element);
        // console.debug(ele);
        resposeArray.push(ele)
      });
    resolve(resposeArray)
    });
  });

 }



 
 getAllOnPathVarsV2(collection,subcollection,urlkey,pathvar){
  return new Promise((resolve, reject) => {
  // console.debug("respons from json");
  // let collectionKey="getAll";
 let ecConfig=new EpConfig();

    // console.debug("looking EP for collection:"+subcollection+" operation:getAll");
    // if(collection!=undefined && collection!="records"){
    //   collectionKey="getOnType_"+collection;
    // }
  let epdata=ecConfig.getEndPointDetails(subcollection,urlkey);
  // ;
    fetch(epdata.getValue()+pathvar).then(response => {
    if(response.ok){
      // console.debug("API response is sucessfull ");
      return response.json();
    }else{
       console.error("API response is not  successfull ",response);
      return error("api unsucessfull");
    }
  }).then(data=>
    {
      // console.debug("data in fetch api response is:");
      // console.debug(data);
     let eles=JSON.parse(JSON.stringify(data));
      // console.debug(eles);
      let resposeArray= new Array();
      eles.forEach(element => {
        // console.debug("each record is:");
       let ele=this.parseData(element);
        // console.debug(ele);
        resposeArray.push(ele)
      });
    resolve(resposeArray)
    });
  });

 }


     getAll(collection,subcollection){
      return new Promise((resolve, reject) => {
      // console.debug("respons from json");
      let collectionKey="getAll";
     let ecConfig=new EpConfig();

        console.debug("looking EP for collection:"+subcollection+" operation:getAll");
        if(collection!=undefined && collection!="records"){
          collectionKey="getOnType_"+collection;
        }
      let epdata=ecConfig.getEndPointDetails(subcollection,collectionKey);
      // console.log("EP DATA ON ENDPINT LOOKUP:GETALL ITEMSERVICE",epdata); ;
        fetch(epdata.getValue()).then(response => {
        if(response.ok){
          // console.debug("API response is sucessfull ");
          return response.json();
        }else{
           console.error("API response is not  successfull ",response);
          return error("api unsucessfull");
        }
      }).then(data=>
        {
          // console.debug("data in fetch api response is:");
          // console.debug(data);
         let eles=JSON.parse(JSON.stringify(data));
          // console.debug(eles);
          let resposeArray= new Array();
          eles.forEach(element => {
            // console.debug("each record is:");
           let ele=this.parseData(element);
            // console.debug(ele);
            resposeArray.push(ele)
          });
        resolve(resposeArray)
        });
      });
    
     }



     publishValidFileRecords(collection,subcollection,fileID){
      return new Promise((resolve, reject) => {
      // console.debug("respons from json");
      // let collectionKey="publish";
     let ecConfig=new EpConfig();

        // console.debug("looking EP for collection:"+subcollection+" operation:getAll");
        // if(collection!=undefined && collection!="records"){
        //   collectionKey="getOnType_"+collection;
        // }
      let epdata=ecConfig.getEndPointDetails(collection,subcollection);
      // ;
// http://10.101.132.22:9197/catalog/importer/catlogs/user1/commit?fileid=Q2Fhc0ltcG9ydEZJbGVTYW1wbGUuY3N2fDIwMjMtMDMtMTFUMDc6MzI6MDQuNzQyOTkxWg
        fetch(epdata.getValue()+"?fileid="+fileID).then(res => res.json()).then(data=>
        {
          // console.debug("data in fetch api response for approve and publish of records  is:", data); 
          resolve(data)
        }).catch(error=>{
          console.error("erro while calling  fetch api for approve and publish of records  is errored:",error); 

        });
      });
    
     }


     //******************GET BY CONTEXT ID ***************** */
     getOnContextIdasync(collection,subcollection,item){
      // console.log('undr getOnContextIdasync, context id is: ',item);
            return new Promise((resolve, reject) => {
              let ecConfig=new EpConfig();
            let  epkey=subcollection;
            let id='';
              if(collection!="records"){
                epkey=collection+subcollection;
                id="/"+item.parentId;
              }
          let epdata=ecConfig.getEndPointDetails(epkey,"getcontext");
      
           fetch(epdata.getValue()+item.contextId+id).then(res => res.json()).then((data) => {
          let   itemServiceUtil= new ItemServiceUtil();
             resolve(itemServiceUtil.getItem(data)) ;
        });
      });}

      getElementsOnContextIdasync(secc,collection,subcollection,item){
        // console.log('undr getOnContextIdasync, context id is: ',item);
              return new Promise((resolve, reject) => {
                let ecConfig=new EpConfig();
              let  epkey=subcollection;
              let tkn=secc?.token;
              let id='';
                if(collection!="records"){
                  epkey=collection+subcollection;
                  id="/"+item.parentId;
                }
            let epdata=ecConfig.getEndPointDetails(epkey,"getcontext");
        
             fetch(epdata.getValue()+item.contextId+id+"/elements", {
              headers: {Authentication: 'Bearer '+tkn}
            }).then(res => res.json()).then((data) => {
            let   itemServiceUtil= new ItemServiceUtil();
               resolve(itemServiceUtil.getItems(data)) ;
          });
        });}



        getElementsOnContextIdasyncDynamic(collection,subcollection,item){
          // console.log('undr getOnContextIdasync, context id is: ',item);
                return new Promise((resolve, reject) => {
                  let ecConfig=new EpConfig();
                let  epkey=subcollection;
                let id='';
                  if(collection!="records"){
                    epkey=collection+subcollection;
                    id="/"+item.parentId;
                  }
              let epdata=ecConfig.getEndPointDetails(epkey,"getcontext");
          
               fetch(epdata.getValue()+item.contextId+id).then(res => res.json()).then((data) => {
              let   itemServiceUtil= new ItemServiceUtil();
                 resolve(itemServiceUtil.getItems(data)) ;
            });
          });}
      getAllasync(collection,subcollection){
              return new Promise((resolve, reject) => {
                let ecConfig=new EpConfig();
              let  epkey=subcollection;
              let id='';
                if(collection!="records"){
                  epkey=collection+subcollection;
                   
                }

            let epdata=ecConfig.getEndPointDetails(collection,subcollection);
        
             fetch(epdata.getValue() ).then(res => res.json()).then((data) => {
            let   itemServiceUtil= new ItemServiceUtil();
               resolve(itemServiceUtil.getItems(data)) ;
          });
        });}

        triggerFileExportOnRequest(collection,subcollection,fname,req){
          const eu=new EntityUtil();
          // console.log("REQ DATA FOR TRIGGER FILE EXPORT REQ::",req);
          return new Promise((resolve, reject) => {
            let ecConfig=new EpConfig();
          let  epkey=subcollection;
          let id='';
            if(collection!="records"){
              epkey=collection+subcollection;
               
            }
 let filename ="FE"+fname;
        let epdata=ecConfig.getEndPointDetails(collection,subcollection);
         fetch(epdata.getValue(),{
          method: 'POST', body: JSON.stringify(req, eu.replacerns),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
        
          }} , 
          )  .then((res) => {
            const header = res.headers.get('Content-Disposition');
    const parts = header.split(';');
     filename = parts[1].split('=')[1];
        return     res.blob()})
          .then((blob) => URL.createObjectURL(blob))
          .then((href) => {
            Object.assign(document.createElement('a'), {
              href,
               download: ""+filename,
            }).click();
          });
    });}


    getExportedFiles(collection,subcollection,fsid,fname){

      return new Promise((resolve, reject) => {
        let ecConfig=new EpConfig();
      let  epkey=subcollection;
      let id='';
        if(collection!="records"){
          epkey=collection+subcollection;
           
        }
let filename ="FE"+fname;
    let epdata=ecConfig.getEndPointDetails(subcollection,"get");
     fetch(epdata.getValue()+"/"+fsid,{
      method: 'GET'} )  .then((res) => {
        const header = res.headers.get('Content-Disposition');
const parts = header.split(';');
 filename = parts[1].split('=')[1];
 return res.blob();
  })
      .then((blob) => URL.createObjectURL(blob))
      .then((href) => {
        Object.assign(document.createElement('a'), {
          href,
           download: ""+filename,
        }).click();
      });
});}
        triggerFileExport(collection,subcollection,fname){

          return new Promise((resolve, reject) => {
            let ecConfig=new EpConfig();
          let  epkey=subcollection;
          let id='';
            if(collection!="records"){
              epkey=collection+subcollection;
               
            }
 let filename ="FE"+fname;
        let epdata=ecConfig.getEndPointDetails(collection,subcollection);
         fetch(epdata.getValue(),{
          method: 'POST'} )  .then((res) => {
    //         const header = res.headers.get('Content-Disposition');
    // const parts = header.split(';');
    //  filename = parts[1].split('=')[1];
    // console.log("RESPONSE FROM SERVER ON TRIGGER OF FILE EXPORT IS",res.json);
    resolve(     res.json);
      })
          // .then((blob) => URL.createObjectURL(blob))
          // .then((href) => {
          //   Object.assign(document.createElement('a'), {
          //     href,
          //      download: ""+filename,
          //   }).click();
          // });
    });}

      getOnType(collection,type,item){
        // console.debug("getting epconfig:: data for :collection:"+collection+"getOnType_ type:"+type.toLowerCase());
      //  alert("getting epconfig:: data for :collection:"+collection+"getOnType_ type:"+type.toLowerCase());
        return new Promise((resolve, reject) => {
          let ecConfig=new EpConfig();
          
           // console.debug("getting epconfig:: data for :collection:"+collection+"getOnType_ type:"+type.toLowerCase());
      let epdata=ecConfig.getEndPointDetails(collection,"getOnType_"+type.toLowerCase());
      // console.debug("got epconfig:: data for :collection:"+collection+"getOnType_ type:"+type.toLowerCase(),epdata);

       fetch(epdata.getValue()).then(res => res.json()).then((data) => {


        
      let   itemServiceUtil= new ItemServiceUtil();
         resolve(itemServiceUtil.getItems(data)) ;
    });
  });}

  addChild(parentCollection,childConnection,parentId,childId){
    return new Promise((resolve, reject) => {
      let ecConfig=new EpConfig();
  let epdata=ecConfig.getEndPointDetails(parentCollection,"addchild_"+childConnection.toLowerCase());

   fetch(epdata.getValue()+parentId+"/child/"+childId).then(res => res.json()).then((data) => {


    
  let   itemServiceUtil= new ItemServiceUtil();
     resolve(itemServiceUtil.getItems(data)) ;
});
});
  }

  getOnParentOnScope(collection,type,parentid,scope,parentType){
    return new Promise((resolve, reject) => {
      let ecConfig=new EpConfig();
      // console.debug("fetching epconfig data for: [ parentType:"+parentType," scope:"+scope+" type:"+type+"]");
  let epdata=ecConfig.getEndPointDetails(parentType,"getOnParent"+"_"+scope+"_"+type.toLowerCase());

   fetch(epdata.getValue()+parentid+"/scope/"+scope).then(res => res.json()).then((data) => {


    
  let   itemServiceUtil= new ItemServiceUtil();
     resolve(itemServiceUtil.getItems(data)) ;
});
});}
    getOnParent(collection,type,parentid){
    return new Promise((resolve, reject) => {
      let ecConfig=new EpConfig();
      // console.debug("getting on prent for data:[collection:"+collection+", type:"+type+", parentId:"+parentid+"]");
  let epdata=ecConfig.getEndPointDetails(collection,"getOnParent_"+type.toLowerCase());

   fetch(epdata.getValue()+parentid).then(res => res.json()).then((data) => {


    
  let   itemServiceUtil= new ItemServiceUtil();
     resolve(itemServiceUtil.getItems(data)) ;
});
});}



getPaginatedOnParentFile(collection,type,parentid,pathvar,fileRecrod){
  return new Promise((resolve, reject) => {
    let ecConfig=new EpConfig();
    const eu=new EntityUtil();
    fileRecrod.fields.delete("click_function");
    // console.debug("getting on prent for data:[collection:"+collection+", type:"+type+", parentId:"+parentid+"]");
let epdata=ecConfig.getEndPointDetails(collection,"getOnParentFile_"+type.toLowerCase());
 fetch(epdata.getValue()+parentid+pathvar,{
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    

  },

  body: JSON.stringify(fileRecrod, eu.replacerns)
 }).then(res => res.json()).then((data) => {


  
let   itemServiceUtil= new ItemServiceUtil();
   resolve(itemServiceUtil.getItems(data)) ;
}).catch(error => {
  // element.parentElement.innerHTML = `Error: ${error}`;
  console.error('There was an error!', error);
});
});}

getOnParentFile(collection,type,parentid,fileRecrod){
  return new Promise((resolve, reject) => {
    let ecConfig=new EpConfig();
    const eu=new EntityUtil();
    fileRecrod.fields.delete("click_function");
    // console.debug("getting on prent for data:[collection:"+collection+", type:"+type+", parentId:"+parentid+"]");
let epdata=ecConfig.getEndPointDetails(collection,"getOnParentFile_"+type.toLowerCase());
 fetch(epdata.getValue()+parentid,{
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    

  },

  body: JSON.stringify(fileRecrod, eu.replacerns)
 }).then(res => res.json()).then((data) => {


  
let   itemServiceUtil= new ItemServiceUtil();
   resolve(itemServiceUtil.getItems(data)) ;
}).catch(error => {
  // element.parentElement.innerHTML = `Error: ${error}`;
  console.error('There was an error!', error);
});
});}
//      getOnContextId(collection,subcollection,item){
// //       return new Promise((resolve, reject) => {
// //         let ecConfig=new EpConfig();
// //     let epdata=ecConfig.getEndPointDetails(subcollection,"getcontext");

// //      fetch(epdata.getValue()+item.contextId).then(res => res.json()).then((data) => {
// //       resolve(data) ;
// //   });
// // });
// let ecConfig=new EpConfig();
// const request = new XMLHttpRequest();

// let epdata=ecConfig.getEndPointDetails(subcollection,"getcontext");
// request.open('GET',epdata.getValue()+item.contextId, false);  // `false` makes the request synchronous
// request.send(null);

// if (request.status === 200) {
//   // console.debug("RESPONSE FROM SYNC CALL IS")
//   // console.debug(request.responseText);

//   let eles=JSON.parse(request.responseText);
//   // console.debug(eles);
//   let itemServiceUtil= new ItemServiceUtil();
//    let ele=itemServiceUtil.getItem(eles);
//    return ele;
// }
//   }

     /*******************************************/
    get(collection,subcollection,key, type, value)   {
      return new Promise((resolve, reject) => {
      let col;
      // let colc=this.firestore.collection(this.roostore+collection+'_'+subcollection);
      let colc
      let query = colc.ref;  
      let q = query.where(key, '==', value);
  
//// console.debug("DATA PASSED FOR QUERY: "+value+" key passed is:"+key);
      q.get().then(querySnapshot => {
        if (querySnapshot.size > 0) {
          const data = querySnapshot.docs.map(documentSnapshot => {
            return documentSnapshot.data();
          }) ;
          resolve(data);
        } else{
          resolve(undefined);
        }
      });
    });
  
    }
    update(collection,subcollection, item) {
      // console.debug("under update of itemservice")
      // console.debug(item);
      // console.debug("under update of itemservice JSON.stringify(this.parseData(item)")
      const eu=new EntityUtil();
      // console.debug("under update of itemserviceJSON.stringify(item)")
      ;
      // console.debug(JSON.stringify(item, eu.replacerns));
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item, eu.replacerns)
    };
    let ecConfig=new EpConfig();
    // console.debug("looking EP for collection:"+subcollection+" operation:update");
  let epdata=ecConfig.getEndPointDetails(subcollection,"update");
  // ;
    fetch(epdata.getValue(), requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
    
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            // console.debug("data saved to db is");
            // console.debug(data);
            // element.innerHTML = data.id;
        })
        .catch(error => {
            element.parentElement.innerHTML = `Error: ${error}`;
            console.error('There was an error!', error);
        });
      // this.firestore.collection(this.roostore+collection+'_'+subcollection).doc(veh.id).set(this.parseData(veh));
    }
  uploadFile(subcollection,id, item) { 
    return new Promise((resolve, reject) => {
// console.debug("under add of item service ::  is");
let eu= new EntityUtil();
// console.debug(JSON.stringify(item, eu.replacerns));
   const requestOptions = {
      method: 'POST',
      // mode:'no-cors',
      // headers: { 'Content-Type': 'multipart/form-data' },
      body:  item
  };
  let ecConfig=new EpConfig();
  // console.debug("looking EP for collection:"+subcollection+" operation:upload");
let epdata=ecConfig.getEndPointDetails(subcollection,"file-upload");
// ;
  fetch(epdata.getValue()+"/"+id, requestOptions)
  //  fetch(epdata.getValue(), requestOptions)
      .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();
  
          // check for error response
          if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
          }
          // console.debug("data saved to db is");
          // console.debug(data);
            return resolve(response);
        
          // element.innerHTML = data.id;
      })
      .catch(error => {
          // element.parentElement.innerHTML = `Error: ${error}`;
          console.error('There was an error!')
          // console.log("BEFORE LAGGING ERROR");

          // console.log( JSON.stringify(error));
          // console.log("AFTER LAGGING ERROR");
        let errorcontext= new Item();
        errorcontext.addData("context",new ItemData("context","error in uploading file"));
        errorcontext.addData("contextitem",new ItemData("contextitem",item));
        
        var event = new CustomEvent("file-handling-error", errorcontext);

      // Dispatch/Trigger/Fire the event
      document.dispatchEvent(event);
      return reject(error);
      });
} ) } 

    add(collection,subcollection, item) { 
      return new Promise((resolve, reject) => {
// console.debug("under add of item service ::  is");
let eu= new EntityUtil();
// console.debug(JSON.stringify(item, eu.replacerns));
    let collname= this.roostore+collection+'_'+subcollection;
     const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:  JSON.stringify(item, eu.replacerns)
    };
    let ecConfig=new EpConfig();
    // console.debug("looking EP for collection:"+subcollection+" operation:add");
  let epdata=ecConfig.getEndPointDetails(subcollection,"add");
  // ;
    fetch(epdata.getValue(), requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
    
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            // console.debug("data saved to db is");
            // console.debug(data);
              return resolve(response);
          
            // element.innerHTML = data.id;
        })
        .catch(error => {
            element.parentElement.innerHTML = `Error: ${error}`;
            console.error('There was an error!', error);
        });
 } ) } 
  
  
    // getCOllectionFilterOnName(collectionName,subcollection,queri):Observable {
    //   const datafs = this.firestore.collection(this.roostore+collectionName+'_'+subcollection, ref => ref.where('name', '==', queri.name)) ;
    //   return datafs.valueChanges();
    // }
    
    parseData(item){
      let itemServiceUtil=new ItemServiceUtil();
      itemServiceUtil.getItem(JSON.stringify(item));
      const eu = new EntityUtil();
      eu.compressed=true;
//// console.debug('Item created is');
//// console.debug(item);

//// console.debug("EU . replacer ns is");
//// console.debug(eu.replacerns);
      const compStr = JSON.stringify(item, eu.replacerns);
//// console.debug("compStr is");
//// console.debug(compStr);
      const datas = JSON.parse(compStr,Item.reviver);
// console.debug('datas  created after parse is');
  
// console.debug(datas);
// console.debug( typeof datas);
      return datas;
    }

//uncomment to enable delete
  delete(collection,subcollection,id,prntId){
    return new Promise((resolve, reject) => {
// console.debug("under add of item service ::  is");
// console.debug(id);
let item=new Item();
if(prntId!=undefined){
  item.addData("parent_id",new ItemData("parent_id",prntId));
}
item.addData("delete_id",new ItemData("delete_id",id));
    let collname= this.roostore+collection+'_'+subcollection;
      let eu= new EntityUtil();
     const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body:  JSON.stringify(item, eu.replacerns)
    };
    let ecConfig=new EpConfig();
    // console.debug("looking EP for collection:"+subcollection+" operation:delete");
  let epdata=ecConfig.getEndPointDetails(subcollection,"delete");
  // ;
    fetch(epdata.getValue(), requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
    
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return reject(error);
            }
            // console.debug("data saved to db is");
            // console.debug(data);
            return resolve(response);

            // element.innerHTML = data.id;
        })
        .catch(error => {
            element.parentElement.innerHTML = `Error: ${error}`;
            console.error ('There was an error!', error);
        });
      });
  }
 
//uncomment to enable delete
  }
  
