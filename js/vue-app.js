var vids_url = "../channeled_vids.json";

var vm = new Vue({
    delimiters: ["[[", "]]"],
    el: '#app',
    data:{
        items:data,  //測試分隔檔案
        tmp_items:[],
        keyword:keyword, // 關鍵字推薦中的所有關鍵字形成的list
        all_vid:vids, //所有影片vid

        vid_num: 0,
        query: "",
        keyword_api: "http://127.0.0.1:8000/sendall?queryname=",
        popularity_api: "http://127.0.0.1:8000/sendpop?popularity=",
        key_api: "http://127.0.0.1:8000/sendkey?keyword=",

        mode: 0,
        // mode : 當前mode

        // 0 : 關鍵字推薦模式
        // 1 : 搜尋模式
        // 2 : 拉桿推薦模式 
        allMode: 3,  
        //allMode: 所有mode數量 
        rangeOutput: "拉桿",
        rangeValue: 0,
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
          let val = event.target.value+1;  // 回傳event這個物件，要的value在target裡
          if (val == 1){
            this.rangeOutput = "嚴肅";
          }
          else if (val == 2){
            this.rangeOutput = "稍微嚴肅";
          }
          else if (val == 3){
            this.rangeOutput = "中立";
          }
          else  if (val == 4){
            this.rangeOutput = "稍微娛樂";
          }
          else  if (val == 5){
            this.rangeOutput = "娛樂";
          }
          this.rangeValue = val;
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
          query_url = this.keyword_api+this.query;
          
          fetch(query_url, {
            method: 'GET',
          })
          .then(res => {
            return res.json();
          })
          .then(video_info_obj => {
            //console.log(myJson);
            var keys = Object.keys(video_info_obj);
            vid_list = global_this.random_choose(keys,1);

            global_this.tmp_items = {} //clean 
            for (var i=0;i<vid_list.length;i++){
                global_this.tmp_items[vid_list[i]] =video_info_obj[vid_list[i]];
            }

          })
        },

        vidQuery(vid){ //return data 
          console.log(vid,"|",typeof  vid);
          console.log('Send Query!');
          query_url = this.keyword_api+this.query;
          
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

        recommendKeyWordQuery(keyword){ // return vid_list
          var global_this = this;
          console.log(keyword,"|",typeof  keyword);
          console.log('Send Query!');
          query_url = this.key_api+keyword;
          
          fetch(query_url, {
            method: 'GET',
          })
          .then(res => {
            return res.json();
          })
          .then(video_info_obj => {
            //console.log(myJson);
            var keys = Object.keys(video_info_obj);
            vid_list = global_this.random_choose(keys,1);

            global_this.tmp_items = {} //clean 
            for (var i=0;i<vid_list.length;i++){
                global_this.tmp_items[vid_list[i]] =video_info_obj[vid_list[i]];
            }

          })
           
           //temp_list = {};
          
        },

         
        rangeValueQuery(value){  //return vid_list
          var global_this = this; 
          console.log(value,"|",typeof  value);
          console.log('Send Query!');
          query_url = this.popularity_api+value;
          
          fetch(query_url, {
            method: 'GET',
          })
          .then(res => {
            return res.json();
          })
          .then(video_info_obj => {
            var keys = Object.keys(video_info_obj);
            vid_list = global_this.random_choose(keys,5);
            
            global_this.tmp_items = {} //clean 
            for (var i=0;i<vid_list.length;i++){
                global_this.tmp_items[vid_list[i]] = video_info_obj[vid_list[i]];
            }


          })
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
=======
          //video_IDs = ["F7Jw5yn2-Rw","00w3Yf9gJlU","075Y1XWUn30","09X9_Hesn5o","0A3Iilngu_g","0B1DyDd6SCg"]
          //video_IDs = ["00w3Yf9gJlU"]

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
          .selectAll(".wordcloud")
          .each(function(d,i){
            var btns_this = d3.select(this).select(".btns");
            var vid = d3.select(this).select(".chart").attr("vid");
            if(global_this.items[vid]["word_cloud"]!=undefined){
              d3.select(this).select(".chart").node()
                .appendChild(chart(global_this.items[vid]["word_cloud"], btns_this))
            }
          })
    },

});
