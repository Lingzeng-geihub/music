import { Lrequest } from './netrequest';


 function getbanner(type = 2){
   return Lrequest.prototype.get({
     url:"banner",
     data:{
       type
     }
   })
 };
 function getplaylist(limit = 10) {
   return Lrequest.prototype.get({
     url:"top/playlist",
     data:{
      limit
     }
   })
 };
 function geiranking(id = 3778678){
   return Lrequest.prototype.get({
     url:"playlist/detail",
     data:{
       id:id
     }
   })
 };
 function listrecomend(params) {
   return Lrequest.prototype.get({
     url:"playlist/hot"
   })
 };
 function searchhot(params="hot") {
   return Lrequest.prototype.get({
     url:"search/"+params
   })
 };
 function songdetail(id=1959528822) {
   return Lrequest.prototype.get({
     url:"song/detail",
     data:{
       ids:id
     }
   })
 };

 function lyc(id) {
   return Lrequest.prototype.get({
     url:"lyric",
      data:{
        id:id
      }
   })
 };
 function search(keyworld) {
   return Lrequest.prototype.get({
     url:"search",
     data:{
       keywords:keyworld
     }
   })
 }
 
 module.exports = {
  getbanner,
  getplaylist,
  geiranking,
  listrecomend,
  searchhot,
  songdetail,
  lyc,
  search
}
