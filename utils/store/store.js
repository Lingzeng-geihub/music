
import {action, observable,makeObservable, autorun} from 'mobx-miniprogram'


export const store = observable({
  storeplaylist:[],
  id:0,//歌曲播放的id
  setstoreplaylist: action(function (list) {
    let newArray = list.map(item => ({  
      id: item.id,  
      name: item.name,
      singer:item.ar
  }));
  newArray.forEach(element => {
    this.storeplaylist.push(element)
  });
  }),
  destroyplailist:action(function (list) {
    this.destroyplailist=[]
  }),
  findindex:action(function name(id) {
    let index = this.storeplaylist.findIndex(obj => obj.id === id)
    this.indexq=index
    console.log(this);
    return index
  }),
  setidvalue:action(function (value) {
     this.id=value
    
  })
  
 
})