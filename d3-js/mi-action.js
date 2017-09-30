//action
const ACTION_ID_NONE = 0
const ACTION_ID_ADD_ROI_CIRCLE = 1;

//mouse button type
const BTN_NONE = -1;
const BTN_LEFT = 0;
const BTN_MIDDLE = 1;
const BTN_RIGHT = 2;

//mouse button status
const BTN_DOWN = 0;
const BTN_UP = 1;

function ActionAnnotation() {
    this.callbackAfterDown = null;
    this.callbackAfterMove = null;
    this.callbackAfterUp = null;

    //mouse event
    this.mousePre = {x:0,y:0};
};

ActionAnnotation.prototype.mouseDown = function(mouseBtn, mouseStatus, x, y, cell){
    this.mousePre = {x:x, y:y};
    cell.lastROI = new ROICircle(cell.rois.length, cell.svg, x, y, 1);

    if(this.callbackAfterDown) {
        this.callbackAfterDown(mouseBtn, mouseStatus, x, y, cell);
    }
}

ActionAnnotation.prototype.mouseMove = function(mouseBtn, mouseStatus, x, y, cell){
    if(mouseStatus != BTN_DOWN) {
        return;
    }

    cell.lastROI.creating(x, y);
    this.mousePre = {x:x, y:y};

    if(this.callbackAfterMove) {
        this.callbackAfterMove(mouseBtn, mouseStatus, x, y, cell);
    }
}

ActionAnnotation.prototype.mouseUp = function(mouseBtn, mouseStatus, x, y, cell){
    cell.rois.push(cell.lastROI);
    cell.lastROI = null;

    this.mousePre.x = 0;
    this.mousePre.y = 0;

    if(this.callbackAfterUp) {
        this.callbackAfterUp(mouseBtn, mouseStatus, x, y, cell);
    }
}

