const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const msToMinutes = milliseconds => {  
  // 确保输入是数值类型  
  const ms = Number(milliseconds);  
  // 计算总秒数  
  const seconds = Math.floor(ms / 1000);  
  // 计算分钟数  
  const mins = Math.floor(seconds / 60);  
  // 计算剩余的秒数  
  const secs = seconds % 60;  
    
  // 使用padStart方法确保分钟和秒数都是两位数  
  const minsStr = mins.toString().padStart(2, '0');  
  const secsStr = secs.toString().padStart(2, '0');  
    
  // 返回格式化的字符串  
  return `${minsStr}:${secsStr}`;  
}; 

 function parseLyric(lyricString) {

  // 1. 通过换行符\n将字符串分隔开来
  const lyricLineStrings = lyricString.split("\n");

  // 3.创建一个空数组
  const lyricInfos = [];
  const timeRe = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/i; //因为有些时间节点第三组也是有两位数的情况
  // 2.使用正则匹配, 针对每一行歌词进行解析
  for (const lineString of lyricLineStrings) {
    // 2.1我们需要获取到时间节点并转为毫秒
    const result = lineString.match(timeRe);
  
    if (!result) continue;
    const minuteTime = result[1] * 60 * 1000;
    const secondTime = result[2] * 1000;
    const mSecondTime =
      result[3].length === 3 ? result[3] * 1 : result[3] * 10;
    const time = minuteTime + secondTime + mSecondTime;
    // 2.2获取内容
    const content = lineString.replace(timeRe, "");
    // 3.将对象加入到数组中
    lyricInfos.push({ time, content });
  }
  return lyricInfos
}

module.exports = {
  formatTime,
  msToMinutes,
  parseLyric
}
