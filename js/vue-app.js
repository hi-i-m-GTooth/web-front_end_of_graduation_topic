var vids_url = "../channeled_vids.json";

var vm = new Vue({
    delimiters: ["{{{", "}}}"],
    el: '#app',
    data:{
        items:data,  //測試分隔檔案
        tmp_items:[],
        keyword:keyword, // 關鍵字推薦中的所有關鍵字形成的list
        all_vid:vids, //所有影片vid

        vid_num: 0,
        query: "",
        query_api: "http://127.0.01:8000/test?queryname=",

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

        consoleTest(text){
          console.log(text);
        },
        returnTmp(){
          this.items = this.tmp_items;
        },

                          /** interaction component **/
        //==============================================================//
        //==============================================================//
     
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

        //==============================================================//
        //==============================================================//


                        /** communicate with back-end **/
        
        //==============================================================//
        //==============================================================//
        sendKeywordQuery(){
          console.log('Send Query!');
          query_url = query_api+query;
          
          fetch(query_url, {
            method: 'GET',
          })
          .then(res => {
            return res.json();
          })
          .then(myJson => {
            console.log(myJson);
          })
        },

        vidQuery(vid){
          console.log(vid,"|",typeof  vid);
        },

        recommendKeyWordQuery(keyword){
          console.log(keyword,"|",typeof  keyword);
        },

        
        rangeValueQuery(value){
          console.log(value,"|",typeof  value);
        },




        //==============================================================//
        //==============================================================//  

        wordcloudChart(data){
          return chart(data);
        },
        wordcloudWeight(_weight){
          var weight = _weight*100;
          if(weight<30){
            return 30;
          }
          else{
            return weight;
          }
        },
        random_choose(target_arr,num_of_return){
          // use in show keyword (write in html)
          // use in mounted (below)
          var res = [];
          
          len = target_arr.length
          

          
          // Fisher–Yates shuffle algorithm
          for(;num_of_return>0;num_of_return--){
              chosenOne = Math.floor(Math.random() * (len)); //select 0~len-1
              
              //push to res
              res.push(target_arr[chosenOne]);
              //swap to end 
              temp = target_arr[chosenOne]
              target_arr[chosenOne] = target_arr[len-1];
              target_arr[len-1] = temp ;       
              len-=1;
            }

          return res ;
          },

      


      },


    mounted: function(){  // 隨機選出n部影片呈現給使用者
          this.tmp_items = {};

          //video_IDs = this.random_choose(this.all_vid,5);
          video_IDs = ["00w3Yf9gJlU","075Y1XWUn30","09X9_Hesn5o","0A3Iilngu_g","0B1DyDd6SCg"]
          //console.log(res);

          for (var i=0;i<video_IDs.length;i++){
              this.tmp_items[video_IDs[i]] = this.items[video_IDs[i]];
          }  
          
          console.log(this.tmp_items);
    },

    updated: function(){
        // 製作文字Sunburst圖
        // WARNING!! data.js資料格式不對！
        var global_this = this;
        d3.select(document.body)
          .selectAll(".wordcloud.modal-body")
          .each(function(d,i){
            var vid = d3.select(this).attr("vid");
            d3.select(this).node()
              .appendChild(chart(global_this.items[vid]["Word_Cloud"]))
          })
    },

});
