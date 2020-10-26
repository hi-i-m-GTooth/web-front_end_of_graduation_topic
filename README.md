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
* WARNING: old verson json does NOT support this function 

### Fix API error
* modify sendQuery() function
* add new variable - query_api

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

