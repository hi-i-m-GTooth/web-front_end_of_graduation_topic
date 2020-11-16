//radar
var ctxR = document.getElementById("radarChart").getContext('2d');
var myRadarChart = new Chart(ctxR, {
type: 'radar',
data: {
labels: ["娛樂", "留言踴躍", "主角人氣", "深度","基本面","有梗" ],
datasets: [{
label: "分項分數",
data: [65, 59, 90, 81, 56, 55, 40],
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