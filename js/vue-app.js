var vids_url = "../channeled_vids.json";

var vm = new Vue({
    delimiters: ["{{{", "}}}"],
    el: '#app',
    data:{
        items:test_data,  //測試分隔檔案
        keyword:keyword,

        vid_num: 0,
        query: "",
        

        mode: 0,
        // mode : 當前mode

        // 0 : 關鍵字推薦模式
        // 1 : 搜尋模式
        // 2 : 拉桿推薦模式 
        allMode: 3,  
        //allMode: 所有mode數量 
        rangeOutput: "拉桿",
        //讓使用者知道當前拉桿值
    },
    methods: {
        //綁定於mode=2 的拉桿，用於呈現數值變化
        updateRangeValue(event){
          let val = event.target.value;  // 回傳event這個物件，要的value在target裡
          if (val == 0){
            this.rangeOutput = "嚴肅";
          }
          else if (val == 1){
            this.rangeOutput = "稍微嚴肅";
          }
          else if (val == 2){
            this.rangeOutput = "中立";
          }
          else  if (val == 3){
            this.rangeOutput = "稍微娛樂";
          }
          else  if (val == 4){
            this.rangeOutput = "娛樂";
          }
        },
        changeMode(){  
          //綁定於 button class="col-md-1 btn btn-outline-dark "  
          //按下會更動網頁mode 
          this.mode = (this.mode+1)%this.allMode ;
         
        },
        sendQuery(){
          console.log('Send Query!');
          //var globalthis=this;
          fetch('https://reqres.in/api/users',{
            method: 'GET',
            //mode: 'no-cors',
          })
          .then(res => {
            return res.json();
          })
          .then(result => {
            console.log(result);
          })
        },
        keyWordRecommend(receive){
        //  console.log(typeof receive);
          this.items = [];
          this.items.push(
            {
              "channel": "伯恩夜夜秀",
              "cid": "UCDrswN-SqWh7Kii62h9aXGA",
              "videos": [test_data["videos"][0]]
            }
            )
        }
      },


    mounted: function(){  // 隨機選出n部影片呈現給使用者
          this.items = [];
          videos = test_data["videos"]
          len = videos.length
          n = 5 //n部影片

          //!!!!!!!!!!!!!!!!!注意!!!!!!!!!!!!!!!!!!!
          // 舊格式 - 待修改
          res = { 
            "channel": "伯恩夜夜秀",
            "cid": "UCDrswN-SqWh7Kii62h9aXGA",
            "videos": [] 
          }
          // Fisher–Yates shuffle algorithm
          for(;n>0;n--){
            chosenOne = Math.floor(Math.random() * (len)); //select 0~len-1
   
            //push to res
            res["videos"].push(videos[chosenOne])
            //swap to end 
            videos[chosenOne] = videos[len-1];
          
            len-=1;
          }


       

          this.items.push(res);
          
          console.log("hello world");
    },
    
  

});
