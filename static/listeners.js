// Movement Listners

document.addEventListener('keydown', function(event){
    switch (event.keyCode){
        case 65: // A
            movement.left = true;
            break;
        case 87: // W
            movement.up = true;
            break;
        case 68: // D
            movement.right = true;
            break;
        case 83: // S
            movement.down = true;
            break;
    }
});

document.addEventListener('keyup', function(event){
    switch (event.keyCode){
        case 65: // A
            movement.left = false;
            break;
        case 87: // W
            movement.up = false;
            break;
        case 68: // D
            movement.right = false;
            break;
        case 83: // S
            movement.down = false;
            break;
    }
});

// Mouse Listeners

canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos, rect)) {
        reset();
    }
});

// Other

document.addEventListener('disconnect', function(event){

});