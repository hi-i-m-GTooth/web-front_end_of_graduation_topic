var vids_url = "../channeled_vids.json";

var yt_bind;

var vm = new Vue({
    delimiters: ["[[", "]]"],
    el: '#app',
    data:{
        items:data,  //測試分隔檔案
        result_items:[],
        buffer_items: [],
        tmp_items: [], // 處理後的結果影片
        keyword:keyword, // 關鍵字推薦中的所有關鍵字形成的list
        all_vid:vids, //所有影片vid

        // 排序
        sort_mode: "娛樂程度",
        sort_choice_list: ["娛樂程度", "觀眾黏著度", "主角人氣", "含梗量", "基本面", "觀看次數", "按讚數量"], 
        attr_value_list: [],
        
        // 分頁用
        cur_page:1,
        cur_pages:[1,2,3,4,5],
        max_page:3,
        pagination_num:5,

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
        rangeOutput: "滑動拉桿選取娛樂程度",
        rangeValue: 0,
        //view_count_max: 1,
        //like_count_max: 1,



        //讓使用者知道當前拉桿值
        loading: 0,
    },
    methods: {

        consoleTest(text){
          console.log(text);
        },
        returnHome(){
          this.buffer_items = [];
          this.tmp_items = [];

          //video_IDs = ["F7Jw5yn2-Rw","00w3Yf9gJlU","075Y1XWUn30","09X9_Hesn5o","0A3Iilngu_g","0B1DyDd6SCg"]
          video_IDs = Object.keys(this.items);

          //console.log(res);

          for (var i=0;i<video_IDs.length;i++){
              this.result_items.push(this.items[video_IDs[i]]);
              this.buffer_items.push(this.items[video_IDs[i]]);
          }

          //this.max_page = ( (Object.keys(this.buffer_items).length-1)/this.pagination_num << 0 ) + 1;
          this.changeSortMode("娛樂程度");
          //this.set_page(1);
        },

        myLog(x, y){
          var x = parseFloat(x);
          var y = parseFloat(y);
          return Math.log(x)/Math.log(y);
        },

        startLoading(){
          /*var loading_page = document.getElementById("loading-page");
          loading_page.classList.add("loading");*/
          this.set_page(1);
          this.loading = 1;
        },
        endLoading(){
          /*var loading_page = document.getElementById("loading-page");
          loading_page.className = loading_page.className.replace(/\bloading\b/g, "");*/
          this.loading = 0;
        },

                          /** interaction component **/
        //==============================================================//
        //==============================================================//
     
        bindYt(_to_bind){
          yt_bind = _to_bind;
          console.log("bind to control "+_to_bind);
        },

        changeSortMode(_mode){
          this.sort_mode = _mode;
          //this.buffer_items = this.result_items;

          console.log(this.sort_mode);
          if(_mode=="娛樂程度"){
            this.buffer_items.sort(function(first, second){
              return second.Discuss.Entertainment_Value - first.Discuss.Entertainment_Value;
            })
          }
          else if(_mode=="觀眾黏著度"){
            this.buffer_items.sort(function(first, second){
              return second.Discuss.Connectivity - first.Discuss.Connectivity;
            })
          }
          else if(_mode=="主角人氣"){
            this.buffer_items.sort(function(first, second){
              return second.Discuss.Metrics - first.Discuss.Metrics;
            })
          }
          else if(_mode=="含梗量"){
            this.buffer_items.sort(function(first, second){
              return second.Discuss.Geng_Ratio - first.Discuss.Geng_Ratio;
            })
          }
          else if(_mode=="基本面"){
            this.buffer_items.sort(function(first, second){
              return second.Discuss.Comment_Ratio - first.Discuss.Comment_Ratio;
            })
          }
          else if(_mode=="觀看次數"){
            //var tmp = Object.values(this.buffer_items);
            //this.view_count_max = Math.max(...tmp.map(i => i.Info.viewCount));
            this.buffer_items.sort(function(first, second){
              return second.Info.viewCount - first.Info.viewCount;
            })
          }
          else if(_mode=="按讚數量"){
            //var tmp = Object.values(this.buffer_items);
            //this.like_count_max = Math.max(...tmp.map(i => i.Info.likeCount));
            this.buffer_items.sort(function(first, second){
              return second.Info.likeCount - first.Info.likeCount;
            })
          }
          this.set_page(this.cur_page);
        },

        //綁定於mode=2 的拉桿，用於呈現數值變化
        updateRangeValue(event){
          let val = parseInt(event.target.value)+1;  // 回傳event這個物件，要的value在target裡
          if (val == 1){
            this.rangeOutput = "非常嚴肅";
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
            this.rangeOutput = "非常娛樂";
          }
          this.rangeValue = val;
          this.buffer_items = this.result_items;
          console.log(this.emtertain_interval);
          this.changeSortMode(this.sort_mode);
          this.buffer_items = this.buffer_items.filter(item => item.Discuss.Entertainment_Value>=this.entertain_interval*(val-1) && item.Discuss.Entertainment_Value<=this.entertain_interval*val);
        },
        returnToResult(){
          this.buffer_items = this.result_items;
        }
        ,

        changeMode(){  
          //綁定於 button class="col-md-1 btn btn-outline-dark "  
          //按下會更動網頁mode 
          this.mode = (this.mode+1)%this.allMode ;
        },

        change_page(_num){
          var num = parseInt(_num);
          if(num<0 && this.cur_page>1){
            this.set_page(this.cur_page+num);
          }
          else if(num>0 && this.cur_page<this.max_page){
            this.set_page(this.cur_page+num);
          }
          //console.log(this.cur_page);
        },
        
        set_page(_num){
          //console.log(this.sort_mode);
          var num = parseInt(_num);
          if(num>0 && num<=this.max_page){
            var element = document.getElementById("page"+this.cur_page);
            element.className = element.className.replace(/\bactive2\b/g, "");
            this.cur_page = num;
            this.follow_cur_page();
            var element = null;
            setTimeout(t => {element = document.getElementById("page"+this.cur_page);element.classList.add("active2");},10);
            this.tmp_items = this.buffer_items.slice((this.cur_page-1)*this.pagination_num, (this.cur_page-1)*this.pagination_num+(this.pagination_num-1)+1);
          }
        },

        follow_cur_page(){
          if(this.max_page<this.pagination_num){
            this.cur_pages = Array.from(Array(this.max_page), (x, index) => index+1);
          }
          else if(this.cur_page<(this.pagination_num+1)/2){
            this.cur_pages = Array.from(Array(this.pagination_num), (x, index) => index+1);
          }
          else if(this.cur_page>this.max_page-(this.pagination_num+1)/2){
            this.cur_pages = Array.from(Array(this.pagination_num), (x, index) => index+this.max_page-this.pagination_num+1);
          }
          else{
            this.cur_pages = Array.from(Array(this.pagination_num), (x, index) => index+this.cur_page-(this.pagination_num+1)/2+1);
            console.log("Renew pages!");
          }
        },

        bindWordCloud(_id){
          var global_this = this;
          var toggle = "#modalCenter_"+_id;
          console.log("bind wordcloud to: "+toggle);

          d3.select(document.body)
          .selectAll(toggle+" .wordcloud")
          .each(function(d,i){
              var btns_this = d3.select(this).select(".btns");
              var vid = d3.select(this).select(".chart").attr("vid");
              if(global_this.items[vid]["Word_Cloud"].length >= 0){
                if(d3.select(this).select(".chart svg").empty()){
                  d3.select(this).select(".chart").node()
                    .appendChild(chart(global_this.items[vid]["Word_Cloud"], btns_this))
                }
              }
          })
        },

        //==============================================================//
        //==============================================================//


                        /** communicate with back-end **/
        
        //==============================================================//
        //==============================================================//
        sendKeywordQuery(){
          this.startLoading();
          this.startSearhShake();
          console.log('||||||||||||||||||||||||| Send Query |||||||||||||||||||||||||!');
          console.log('||||||||||||||||||||||||| Waiting for Response |||||||||||||||||||||||||!');
          query_url = this.keyword_api+this.query;
          global_this = this;
          
          fetch(query_url, {
            method: 'GET',
          })
          .then(res => {
            return res.json();
          })
          .then(video_info_obj => {
            //console.log(myJson);
            var keys = Object.keys(video_info_obj);
            var num = Math.min(keys.length,50);
            vid_list = global_this.not_random_choose(keys,num);

            global_this.result_items = video_info_obj;
            global_this.buffer_items = video_info_obj;

            //this.changeSortMode(this.sort_choice_list[0]);
            this.changeSortMode("搜尋結果");
            console.log("|||||||||||||||||||||||||||  End Query  |||||||||||||||||||||||||");
            this.endLoading();
            this.endSearchShake();
          })
        },

        startSearhShake(){
          var tags = document.getElementById("search-bar").getElementsByClassName("tags");
          console.log(tags);
          Array.prototype.map.call(tags, item => item.classList.add("shaking"));
        },

        endSearchShake(){
          var tags = document.getElementById("search-bar").getElementsByClassName("tags");
          Array.prototype.map.call(tags, item => {item.className.baseVal = item.className.baseVal.replace(/\bshaking\b/g, "")});
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
          //this.startLoading();
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
            global_this.buffer_items = [];
            global_this.tmp_items = {} //clean 
            for (var i=0;i<vid_list.length;i++){
              global_this.buffer_items.push(video_info_obj[vid_list[i]]);
            }
            this.set_page(1);
          })
           
           //temp_list = {};
           //this.endLoading();
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
            
            global_this.tmp_items = [] //clean 
            global_this.buffer_items = [] //clean
            for (var i=0;i<vid_list.length;i++){
              global_this.buffer_items[vid_list[i]] = video_info_obj[vid_list[i]];
            }


          })
        },

        



        //==============================================================//
        //==============================================================// 

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
          not_random_choose(target_arr,num_of_return){
            // use in show keyword (write in html)
            // use in mounted (below)
            var res = [];
            
            len = target_arr.length 
            
            // Fisher–Yates shuffle algorithm
            for(let i=0;i<num_of_return;i++){
                //push to res
                res.push(target_arr[i]);
                //swap to end 
              }
  
            return res ;
            },

        renderRadarChart(vid){
                this.attr_value_list = this.items[vid]["Discuss"]["Value_List"];
                
                console.log(this.attr_value_list)
                console.log("this is "+vid);
                var ctxR = document.getElementById(vid).getContext('2d');
                
                var radar = new Chart(ctxR, {
                type: 'radar',
                data: {
                labels: ["娛樂", "留言踴躍", "主角人氣","有梗","基本面" ],
                datasets: [{
                label: "分項分數",
                data: this.attr_value_list,
                backgroundColor: [
                'rgba(105, 0, 132, .2)',
                ],
                borderColor: [
                'rgba(200, 99, 132, .7)',
                ],
                borderWidth: 2
                },

                ]
                },
                options: {
                  responsive: true,
                  
                  scale: {
                              pointLabels: {
                                  fontSize: 24  //調整字形大小
                              },
                              ticks: {
                                max: 1,
                                min: 0,
                                stepSize: 0.1
                              }
                       
                   },

                  legend: {
                            labels: {
                                // This more specific font property overrides the global property
                                fontColor: 'black', //字形大小
                                fontSize: 24,
                            }
                          },
                    }
                });
                      
            },

          },


    mounted: function(){  // 隨機選出n部影片呈現給使用者
          this.returnHome();
          //console.log(this.connectivity_max);
          //console.log(this.tmp_items)
    },

    watch: {
      buffer_items: function(val){
        // 初始最大頁面數
        this.max_page = ( (Object.keys(this.buffer_items).length-1)/this.pagination_num << 0 ) + 1;
        console.log("新的最大頁數："+this.max_page);
        this.set_page(1);

        /*document.getElementsByClassName('#demo .modal.fade').addEventListener('hidden.bs.modal', function () {
          window[yt_bind].stopVideo();
          console.log("Stoped "+yt_bind);
        });*/
      },

    },
    computed: {
      tmp: function(){
        return Object.values(this.items);
      },
      entertainment_value_max: function(){
        return Math.max(...this.tmp.map(i => i.Discuss.Entertainment_Value));
      },
      connectivity_max: function(){
        return Math.max(...this.tmp.map(i => i.Discuss.Connectivity));
      },
      metrics_max: function(){
        return Math.max(...this.tmp.map(i => i.Discuss.Metrics));
      },
      geng_ratio_max: function(){
        return Math.max(...this.tmp.map(i => i.Discuss.Geng_Ratio));
      },
      comment_ratio_max: function(){
        return Math.max(...this.tmp.map(i => i.Discuss.Comment_Ratio));
      },
      entertain_interval: function(){
        return this.entertainment_value_max/5;
      },
      view_count_max: function(){
        return Math.max(...this.tmp.map(i => i.Info.viewCount));
      },
      like_count_max: function(){
        return Math.max(...this.tmp.map(i => i.Info.likeCount));
      }
    },

});
