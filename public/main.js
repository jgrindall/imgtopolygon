

const drawHull = function(src, size){

};

var image = new Image();

const MAX_SIZE = 32;

var onLoad = function(){
    var sx = image.width/MAX_SIZE;
    var sy = image.height/MAX_SIZE;
    var scale = Math.max(sx, sy);
    var c = document.createElement("canvas");
    c.width = Math.round(image.width/scale);
    c.height = Math.round(image.height/scale);
    c.getContext("2d").drawImage(image, 0, 0, image.width, image.height, 0, 0, c.width, c.height);
    var imgData = c.getContext("2d").getImageData(0, 0, c.width, c.height);
    var pts = [];
    for(var i = 0; i < imgData.data.length; i+=4){
        var num = 4 * c.width;
        var y = Math.floor(i/num);
        var x = i - y*num;
        x = x/4;
        if(imgData.data[i + 3] >= 50){
            // solid pixel
            pts.push([x, y]);
        }
    }
    var bigCanvas = $("#canvas")[0];
    var ctx = bigCanvas.getContext("2d");
    ctx.lineWidth = 3;
    ctx.strokeStyle = "red";
    var myHull = hull(pts, 5);
    ctx.beginPath();
    ctx.fillStyle = "#009900";
    const DRAW_SCALE = 500/MAX_SIZE;
    for(var j = 0; j < pts.length; j++){
        ctx.beginPath();
        ctx.arc(DRAW_SCALE*pts[j][0], DRAW_SCALE*pts[j][1], 10, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
    ctx.beginPath();
    for(var j = 0; j < myHull.length; j++){
        if(j === 0){
            ctx.moveTo(DRAW_SCALE*myHull[j][0], DRAW_SCALE*myHull[j][1]);
        }
        else{
            ctx.lineTo(DRAW_SCALE*myHull[j][0], DRAW_SCALE*myHull[j][1]);
        }
    }
    ctx.closePath();
    ctx.stroke();
};

image.onload = onLoad;
image.src = "lshape.png";









