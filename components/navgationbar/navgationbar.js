import { Lrequest } from '../../utils/NetworkRequests/netrequest'
import { throttle, debounce } from 'throttle-debounce';
import{ searchhot } from "../../utils/NetworkRequests/getmassage" 

const app = getApp()
Component({
    properties: {
        // defaultData（父页面传递的数据-就是引用组件的页面）
        defaultData: {
            type: Object,
            value: {
                title: "我是默认标题"
            },
            observer: function(newVal, oldVal) {}
        }
    },
    properties:{
      inputshow:{
        type:Boolean,
        value:true,
      }
    },
    data: {
        navBarHeight: app.globalData.navBarHeight,
        menuRight: app.globalData.menuRight,
        menuTop: app.globalData.menuTop,
        menuHeight: app.globalData.menuHeight,
        searchlist:[],
        clickvaule:""
     
    },
    methods:{
      searchhot:function name(params) {
        searchhot().then( (res)=> {
          this.setData({
            searchlist:res.result.hots
          })
          // console.log(this.data.searchlist);
        })
        
      },
      isshow:function name(params) {
      this.setData({
       inputshow:false
      })
        this.searchhot()
      },
      blur:function name(params) {
        // this.setData({
        //   inputshow:true
        // })
   
      },
      search:   function name(params) {
        Lrequest.prototype.get({
          url:"search/suggest",
          data:{
           keywords:params ,
           type:"mobile"
          }
        }).then( res =>{
          this.setData({
            searchlist:res.result.allMatch
          })
        } )
      },
      input:debounce(2000,function(params){
        let keywords = params.detail.value
         this.search(keywords)
      }),
        searchclick:function name(res) {
          let value =res.target.dataset.value
          this.setData({
            inputshow:true
          })
          this.search(res.target.dataset.value)
         wx.navigateTo({
           url: '../../pages/page/Searchdetails',
           success:function name(res) {
           res.eventChannel.emit("searchkeyworld",value)
           }
         })
        }
    },
    attached: function() {
      
    },
    
   
})


 