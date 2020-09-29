
var vids_url = "../channeled_vids.json";
var vm = new Vue({
    delimiters: ["{{{", "}}}"],
    el: '#app',
    data:{
        items: [],
        vid_num: 0,
    },
    methods: {

    },
    mounted: function() {
      var vobj = this;
      fetch("https://drive.google.com/file/d/1mopNgRaCJhO_oH_Ho6FALDx2AZJblMAd/view?usp=sharing").then(function(json){
        console.log("123"+json[2]);
        //vobj.items = json;
      })

      console.log("Pushing Youtube-items into item-array.")
      //console.log(this.items[0].videos[0].comments[0].comment)
    },

});
