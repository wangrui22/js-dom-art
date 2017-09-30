function Cell(cellName, cellID, canvas, svg) {
    this.cellName = cellName;
    this.cellID = cellID;
    
    //containee canvas& svg
    this.canvas = canvas;
    this.svg = svg;

    //mouse event
    this.mouseAction = null;
    this.mouseBtn = BTN_NONE;
    this.mouseStatus = BTN_UP;

    //ROIs
    this.rois = [];
    this.lastROI = null;

    if(this.svg != null) {
        var mouseDown_ = (function(event) {
            this.mouseDown(event);
        }).bind(this);
        this.svg.addEventListener('mousedown', mouseDown_);

        var mouseMove_ = (function(event) {
            this.mouseMove(event);
        }).bind(this);
        this.svg.addEventListener('mousemove', mouseMove_);

        var mouseUp_ = (function(event) {
            this.mouseUp(event);
        }).bind(this);
        this.svg.addEventListener('mouseup', mouseUp_);
    }
}


Cell.prototype.mouseDown = function(event) {
    this.mouseStatus = BTN_DOWN;
    this.mouseBtn = event.button;

    var x = event.clientX - this.svg.getBoundingClientRect().left;
    var y = event.clientY - this.svg.getBoundingClientRect().top;

    if(this.mouseAction) {
        this.mouseAction.mouseDown(this.mouseBtn, this.mouseStatus, x, y, this);
    }

    // if(this.mouseAction == ACTION_ID_ADD_ROI_CIRCLE) {
    //     this.lastROI = new ROICircle(this.rois.length, this.svg, x, y, 1);
    // }
}

Cell.prototype.mouseMove = function (event) {
    if (this.mouseStatus != BTN_DOWN) {
        return;
    }

    var x = event.clientX - this.svg.getBoundingClientRect().left;
    var y = event.clientY - this.svg.getBoundingClientRect().top;
    // if (this.mouseAction == ACTION_ID_ADD_ROI_CIRCLE) {
    //     this.lastROI.creating(curX, curY);
    // }

    if (this.mouseAction) {
        this.mouseAction.mouseMove(this.mouseBtn, this.mouseStatus, x, y, this);
    }
}

Cell.prototype.mouseUp = function(event) {
    this.mouseBtn = BTN_NONE;
    this.mouseStatus = BTN_UP;

    // send a msg to notify BE we are done with adding an circle
    // if (this.mouseAction == ACTION_ID_ADD_ROI_CIRCLE) {
    //     this.rois.push(this.lastROI);
    //     this.lastROI = null;
    // }

    var x = event.clientX - this.svg.getBoundingClientRect().left;
    var y = event.clientY - this.svg.getBoundingClientRect().top;

    if(this.mouseAction) {
        this.mouseAction.mouseUp(this.mouseBtn, this.mouseStatus, x, y, this);
    }
}

Cell.prototype.removeROIRear = function() {
    if(this.rois.length > 0) {
        this.rois[this.rois.length-1].release();
        this.rois.pop();    
    }
}

Cell.prototype.addROIDebug = function() {
    this.rois.push(new ROICircle(this.rois.length, this.svg, this.canvas.width/2, this.canvas.height/2, 50));
}

Cell.prototype.setROIVisbility = function(flag) {
    for (var i = 0; i < this.rois.length; i++) {
        this.rois[i].visible(flag);
    }
}