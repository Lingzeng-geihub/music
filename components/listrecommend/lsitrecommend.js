// components/listrecommend/lsitrecommend.js
import {listrecomend,getplaylist} from "../../utils/NetworkRequests/getmassage"
let arry=[]
Component({
  data:{
    listrecomenddata:arry
  },
  methods:{
   listrecomend:  function (params) {
    getplaylist().then((res)=>{
      this.setData({
        listrecomenddata:res.playlists
      })
  })
   },
   listclick:function (res) {
     let id = res.currentTarget.id
   wx.navigateTo({
    url:"../../pages/page/Songcharts",
    success:function (res) {
      res.eventChannel.emit("listid",id)
    }
   })
  },
},
  attached:function name(params) {
    this.listrecomend()
   
  }
 
})