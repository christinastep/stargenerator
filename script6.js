
let button=document.querySelector("button");

let input=document.querySelector("textarea");
let wrapper=document.querySelector(".wrapper");

//let outputParagraph=document.querySelector(".box__output p");


var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;

let outerRadius;
let innerRadius;

function drawStar(cx,cy,spikes,outerRadius,innerRadius){
  var rot=Math.PI/2*3;
  var x=cx;
  var y=cy;
  var step=Math.PI/spikes;

  ctx.beginPath();
  ctx.moveTo(cx,cy-outerRadius)
  for(i=0;i<spikes;i++){
    x=cx+Math.cos(rot)*outerRadius;
    y=cy+Math.sin(rot)*outerRadius;
    ctx.lineTo(x,y)
    rot+=step

    x=cx+Math.cos(rot)*innerRadius;
    y=cy+Math.sin(rot)*innerRadius;
    ctx.lineTo(x,y)
    rot+=step
  }
  ctx.lineTo(cx,cy-outerRadius);
  ctx.closePath();
  ctx.lineWidth=5;
  ctx.strokeStyle='black';
  ctx.stroke();
  ctx.fillStyle='white';
  ctx.fill();
}

function drawStarGroup(cx,cy,spikes,outerRadius,innerRadius,numberInnerStars){
  let radiusPartie=outerRadius/numberInnerStars;
  console.log(radiusPartie);
  for (let i = 0; i < numberInnerStars; i++) {
     outerRadius= outerRadius-radiusPartie;
    innerRadius=innerRadius-radiusPartie;
     drawStar(cx,cy,spikes,outerRadius,innerRadius);
  }
}


for (let i = 0; i < 10; i++) {
  let randomX = Math.floor(Math.random() * canvas.width) + 1; 
  let randomY = Math.floor(Math.random() * canvas.height) + 1; 
  
  let randomSpikes = Math.floor(Math.random() * 20) + 2; 

  drawStarGroup(randomX,randomY,randomSpikes,100,70,5);
}


button.addEventListener("click",function(){
  console.log("click");
  var node = document.querySelector('.wrapper');

  domtoimage.toPng(node, { 
    height: node.offsetHeight * 2,
    width: node.offsetWidth * 2,
    style: {
      transform: "scale(2)",
      transformOrigin: "top left",
      width: node.offsetWidth + "px",
      height: node.offsetHeight + "px",
      quality: 0.95
    }
    })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'merryChristmas.png';
        link.href = dataUrl;
        link.click();
    });
  })


var textarea = document.querySelector('textarea');
textarea.addEventListener('keydown', autosize);
 
function autosize(){
  var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:0';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
}



