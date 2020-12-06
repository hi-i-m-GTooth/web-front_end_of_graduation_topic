# Work log
### First commit 
* add comments  
* add README  
* add range in main_page.html (need to be adjusted typesetting )  
* add updateRangeValue in vue.js-method to show user what they selected 
* modify data in vue.js-data and add allmode variable in order to maintain mode switching  

### Fix tool bar 
* modify some id to make its name more explict
(ex: btn-change-mode)
* add div tag for typesetting
(ex: tool-bar-interact)
* add CSS in "Fix tool bar size" section

### Add slider 
* modify static background image to slider 

### Add random cold start 
* in vue.js mounted function，implement shuffle algorithm to get n random videos

### split json from vue.js (in js/data.js) 
* As title

### Generalize keyword recommend 
* modify button by v-for="(key,vid) in keyword" to generate keyword button
* NEED to add random function
* ~**WARNING**: old verson json does NOT support this function~ 

### Fix API error
* modify sendQuery() function
* add new variable - query_api

### Change the Way to Demo
* modify the demo part to present in list
* boost the experience of enlarge-hover

### Add Split Word Cloud
* Words are vary in Font-size & Font-weight depends on their wordcloud-weight (Proportional)

### Fix keyword recommend format
* Generalize random function in vue.js method: random_choose()
* add keyword json data 
* **WARNING**: some keywords are meaningless for me(littleCube2019) . Need to be checked.

### change query method name in vue.js

### modify to fit new format  
* modify all vue template in html
* replace some duplicate tag to v-for  

### ~~Change "wordcloud" into "word sunburst"~~
* ~~apply sunburst chart in d3.js~~
* add new file: wordcloud.js
* change mutiplication number of entertainment value (enlarger it)
* **WARNING** font-size need to be determined. It is currently too small.

### Change "wordcloud" into "bubble chart"
* each geng and comments belong to it correspond to one unique color
* combine geng and chart into one page
* add format file "sunburst.json" for recording
* modify the DOMs' classes in tab-pane

### Test for radar chart 
* add chart.js in js 
* add "屬性圖" in html
* include Chart.min.js
* **WARNING** Only for demo this time

### Pagination and Sort Mode Choosing
* add Pagination (**temporarily only in draft html**)
* add Sort Mode Choosing (**temporarily only in draft html**)
* click geng will automatically roll to the video part
* add data in Vue: "result_itmes" for query result
* preserve data in Vue: "tmp_items" for showing items

### Replace "Updated" with "Watch"
* Remove "Updated" state to prevent frequently updating our page
* change the way of binding wordcloud (Now by clicking Proto Objects)
* in "Watch", "max_page" of pagination depends on the change of "result_items"

# Note
### bootstrap

How to get icon   
https://icons.getbootstrap.com/    

How to get component  
https://getbootstrap.com/docs/3.3/components/#dropdowns

### col-md-n
One of feature in bootstrap
By controlling "n" in tag (class = "col-md-n")，we can determine width of component.  
* Note: weight col-md-n > CSS 

### How to split data
把 json 令一個變數，如test_data
然後改名成.js 
最後vue.js中用items:test_data之類的就可以取用了

And remember to include data.js in html  
by adding  `<script type="text/javascript" src="js/data.js"></script> `

# Bug Fix Experience 

* Cannot read property '\_wrapper' of undefine
通常是html裡按鈕綁定函數設定不正確(通常是名字錯誤)

* javaScript引入檔有些要放在html最後面 如vue.js chart.js這些自訂的js檔  
有些要放在最前面比如vue、jquery這些lib
