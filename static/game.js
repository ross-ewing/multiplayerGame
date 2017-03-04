var socket = io();

var movement = {
    up: false,
    down: false,
    left: false,
    right: false
};

socket.emit('new player');
setInterval(function() {
    socket.emit('movement', movement);
});

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;

var motionTrailLength = 100;
var positions = {};

function storeLastPosition(xPos, yPos, playerid) {
    // push an item
    if (positions[playerid] == null) {
        positions[playerid] = []
    }

    positions[playerid].push({
        x: xPos,
        y: yPos
    });

    //get rid of first item
    if (positions[playerid].length > motionTrailLength) {
        positions[playerid].shift();
    }
}

function draw() {
    socket.on('state', function (players) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (var id in players) {
            var player = players[id];
            //storeLastPosition(player.x, player.y, id);
            context.fillStyle = player.color;
            context.beginPath();
            context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
            context.fill();
            //for (var i = 0; i < positions[id].length; i++) {
            //        context.fillStyle = player.color;
            //        context.beginPath();
            //        context.arc(positions[id][i].x, positions[id][i].y, 10, 0, 2 * Math.PI, true);
            //        context.fill();
            //}
        }
    });
}

draw();

var reset = function(){
    console.log('reset')
};


function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.heigth && pos.y > rect.y
}

var resetBtn = canvas.getContext('2d');
var rect = {
    x:50,
    y:50,
    width:60,
    heigth:10
};


resetBtn.beginPath();
resetBtn.rect(50, 50, 60, 20);
resetBtn.lineWidth = 2;
resetBtn.strokeStyle = '#000000';
resetBtn.stroke();
resetBtn.closePath();
resetBtn.font = '15pt Kremlin Pro Web';
resetBtn.fillStyle = '#000000';
resetBtn.fillText('reset', 60, 65);