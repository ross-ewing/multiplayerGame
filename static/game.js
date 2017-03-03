var socket = io();
socket.on('message', function(data){
    console.log(data)
});

socket.on('disconnect');

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


var context = canvas.getContext('2d');
socket.on('state', function(players) {
    context.fillStyle = '#0095DD';
    for (var id in players) {
        var player = players[id];
        context.beginPath();
        context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
        context.fill();
    }
});

var reset = function(players){
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