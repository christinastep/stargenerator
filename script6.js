
let buttonDownload=document.querySelector(".download");
let buttonReload=document.querySelector(".reload");
let starNumberInput=document.querySelector("#starNumber");
let text=document.querySelector(".box__text")

let starNumber=10;

let input=document.querySelector("textarea");
let wrapper=document.querySelector(".wrapper");

let chaos=false;
let message=false;
let saveCenter=false;

let colors=["#fff"];


//let outputParagraph=document.querySelector(".box__output p");

generateStars(starNumber)


function generateStars(){
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

      if(chaos===true){
        if(x>(0.25*window.innerWidth) && x<(0.5*window.innerWidth)){
          console.log("hello")
          x=x-0.2*window.innerWidth
        }else if(x>(0.5*window.innerWidth) && x<(0.75*window.innerWidth)){
          x=x+0.2*window.innerWidth
        } 
        if(y>(0.25*window.innerHeight) && y<(0.5*window.innerHeight)){
          y=y-0.2*window.innerHeight
        }else if(y>(0.5*window.innerHeight) && y<(0.75*window.innerHeight)){
          y=y+0.2*window.innerHeight
        } 
      }

      ctx.lineTo(x,y)
      rot+=step
    }
    ctx.lineTo(cx,cy-outerRadius);
    ctx.closePath();
    ctx.lineWidth=5;
    ctx.strokeStyle='black';
    ctx.stroke();
    ctx.fillStyle=colors[Math.floor(Math.random() * colors.length)];;
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

  for (let i = 0; i < starNumber; i++) {
    let randomX = Math.floor(Math.random() * canvas.width) + 1; 
    let randomY = Math.floor(Math.random() * canvas.height) + 1; 
    
    let randomSpikes = Math.floor(Math.random() * 20) + 2; 

    if(saveCenter===true){
      if(randomX>(0.25*window.innerWidth) && randomX<(0.5*window.innerWidth) && randomY>(0.25*window.innerHeight) && randomY<(0.5*window.innerHeight)){
        console.log("hello")
        randomX=randomX-0.2*window.innerWidth;
        randomY=randomY-0.2*window.innerHeight;
      } else if(randomX>(0.5*window.innerWidth) && randomX<(0.75*window.innerWidth) && randomY>(0.25*window.innerHeight) && randomY<(0.5*window.innerHeight)){
        console.log("hello")
        randomX=randomX+0.2*window.innerWidth;
        randomY=randomY+0.2*window.innerHeight;
      }
      else if(randomX>(0.25*window.innerWidth) && randomX<(0.5*window.innerWidth) && randomY>(0.5*window.innerHeight) && randomY<(0.75*window.innerHeight)){
        console.log("hello")
        randomX=randomX-0.2*window.innerWidth;
        randomY=randomY-0.2*window.innerHeight;
      } else if(randomX>(0.5*window.innerWidth) && randomX<(0.75*window.innerWidth) && randomY>(0.5*window.innerHeight) && randomY<(0.75*window.innerHeight)){
        console.log("hello")
        randomX=randomX+0.2*window.innerWidth;
        randomY=randomY+0.2*window.innerHeight;
      }
    }

    drawStarGroup(randomX,randomY,randomSpikes,100,70,5);
  }
}



buttonReload.addEventListener("click",function(){
  generateStars(starNumber)
});

buttonDownload.addEventListener("click",function(){
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

let plusButton= document.querySelector("#plus");
let moinsButton= document.querySelector("#moins");
let colorButton= document.querySelector("#color");
let messageButton= document.querySelector("#message");
let chaosButton= document.querySelector("#chaos");
let saveCenterButton= document.querySelector("#saveCenter");



plusButton.addEventListener("click",function(){
  console.log("click +")
  if(starNumber<100){
    starNumber=starNumber*2;
    generateStars(starNumber)
  }
})
moinsButton.addEventListener("click",function(){
  if(starNumber>2){
    starNumber=starNumber/2;
    generateStars(starNumber)
  }
})

let clickCounterColors=0;
colorButton.addEventListener("click",function(){
  if(clickCounterColors===0){
    colors=["pink","green","red"];
    console.log("change color");
    colorButton.style.backgroundColor="white";
    
    clickCounterColors=1;
  }else{
    colors=["white"];
    clickCounterColors=0;
    colorButton.style.backgroundColor="yellow";
  }
  generateStars(starNumber)
})

let clickCounterChaos=0;

chaosButton.addEventListener("click",function(){ 
  if(clickCounterChaos===0){
    console.log("add chaoa")
    clickCounterChaos=1;
    chaos=true;
    chaosButton.style.backgroundColor="white";
    //chaosButton.innerHTML="Add Chaos";
  }else{
    clickCounterChaos=0;
    console.log("delte chaos")
    chaos=false;
    chaosButton.style.backgroundColor="yellow";
    //chaosButton.innerHTML="No Chaos";
  }
  generateStars(starNumber)
})

let clickCounterMessage=0;

messageButton.addEventListener("click",function(){
  if(clickCounterMessage===0){
    console.log("add")
    clickCounterMessage=1;
    text.style.display="flex";
    messageButton.style.backgroundColor="white";
    saveCenter=true;
    //messageButton.innerHTML="No Message";

    
  }else{
    clickCounterMessage=0;
    console.log("remove")
    text.style.display="none";
    saveCenter=false;
    messageButton.style.backgroundColor="yellow";
    //messageButton.innerHTML="Add Message";
  }
})


document.querySelector(".button--start").addEventListener("click",function(){
  console.log("click")
  document.querySelector(".intro").style.transform="translateY(-250%) translateX(-50%)"
  document.querySelector("footer").style.transform="translateY(0vh)";
  window.scrollTo({ top: 50, left: 0});
})


window.addEventListener("scroll",function(){
  console.log("scroll");
  if(window.scrollY===0){
    console.log("top");
    document.querySelector(".intro").style.transform="translateY(-50%) translateX(-50%)"
    document.querySelector("footer").style.transform="translateY(100vh)";
    text.style.display="none"
  }else if(window.scrollY>19){
    console.log("helo")
    document.querySelector(".intro").style.transform="translateY(-250%) translateX(-50%)"
  document.querySelector("footer").style.transform="translateY(0vh)";
  }
})



//var item = items[Math.floor(Math.random() * items.length)];

// starNumberInput.addEventListener("change",function(){
//   starNumber = starNumberInput.value;
//   console.log("input" +starNumber)
//   generateStars(starNumber)
// })



