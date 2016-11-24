import React from 'react';

// Adapted from http://jsfiddle.net/KJW4E/754/

let pasteCount = 0

class ImagePaster extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.ctrl_pressed = null
        this.paste_mode = null

        if (!window.Clipboard) {

            this.pasteCatcher = document.createElement("div");
            this.pasteCatcher.setAttribute("id", "paste_ff");
            this.pasteCatcher.setAttribute("contenteditable", "");
            this.pasteCatcher.style.cssText = 'opacity:0;position:fixed;top:0px;left:0px;';
            this.pasteCatcher.style.marginLeft = "-20px";
            this.pasteCatcher.style.width = "10px";
            document.body.appendChild(this.pasteCatcher);
            document.getElementById('paste_ff').addEventListener('DOMSubtreeModified', () => {
                if (this.paste_mode == 'auto' || this.ctrl_pressed == false)
                    return true;
                //if paste handle failed - capture pasted object manually
                if (this.pasteCatcher.children.length == 1) {
                    if (this.pasteCatcher.firstElementChild.src != undefined) {
                        //image
                        this.paste_createImage(this.pasteCatcher.firstElementChild.src);
                    }
                }
                //register cleanup after some time.
                setTimeout(() => {
                    this.pasteCatcher.innerHTML = '';
                }, 20);
            }, false);
        }



        this.paste_auto = this.paste_auto.bind(this)
        this.on_keyboard_action = this.on_keyboard_action.bind(this)
        this.on_keyboardup_action = this.on_keyboardup_action.bind(this)
        this.paste_createImage = this.paste_createImage.bind(this)
    }

    componentDidMount() {
        //handlers
        document.addEventListener('keydown',(e) => {
            this.on_keyboard_action(e);
        }, false); //firefox fix
        document.addEventListener('keyup',(e) => {
            this.on_keyboardup_action(e);
        }, false); //firefox fix
        document.addEventListener('paste',(e) => {
            this.paste_auto(e);
        }, false); //official paste handler
    }

    paste_auto(e) {
        this.paste_mode = '';
        this.pasteCatcher.innerHTML = '';
        var plain_text_used = false;
        if (e.clipboardData) {
            var items = e.clipboardData.items;
            if (items) {
                this.paste_mode = 'auto';
                //access data directly
                for (var i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf("image") !== -1) {
                        //image
                        var blob = items[i].getAsFile();
                        var URLObj = window.URL || window.webkitURL;
                        var source = URLObj.createObjectURL(blob);
                        this.paste_createImage(source);
                    }
                }
                e.preventDefault();
            }
            else {
                //wait for DOMSubtreeModified event
                //https://bugzilla.mozilla.org/show_bug.cgi?id=891247
            }
        }
    }

    on_keyboard_action(event) {
        let k = event.keyCode;
        //ctrl
        if (k == 17 || event.metaKey || event.ctrlKey) {
            if (this.ctrl_pressed == false)
                this.ctrl_pressed = true;
        }
        //c
        if (k == 86) {
            if (document.activeElement != undefined && document.activeElement.type == 'text') {
                //let user paste into some input
                return false;
            }
            
            if (this.ctrl_pressed == true && !window.Clipboard)
                this.pasteCatcher.focus();
        }
    }

    on_keyboardup_action(event) {
        let k = event.keyCode;
        //ctrl
        if (k == 17 || event.metaKey || event.ctrlKey || event.key == 'Meta')
            this.ctrl_pressed = false;
    }

    paste_createImage(source) {
        this.context.addFile("Pasted Image " + ++pasteCount, source)
        return


        // let canvas = this.refs.canvas
        // let ctx = canvas.getContext("2d")
        // let autoresize = true
        // var pastedImage = new Image()
        // pastedImage.onload = () => {
        //     if(autoresize == true){
        //         //resize canvas
        //         canvas.width = pastedImage.width;
        //         canvas.height = pastedImage.height;
        //     }
        //     else{
        //         //clear canvas
        //         ctx.clearRect(0, 0, canvas.width, canvas.height);
        //     }
        //     ctx.drawImage(pastedImage, 0, 0);
        // };
        // pastedImage.src = source;
    }

    render() {
        return (
            <canvas ref="canvas" style={{border: "1px solid grey"}} id="my_canvas" width="300" height="300"></canvas>
        )
    }
}

ImagePaster.contextTypes = {
  addFile: React.PropTypes.func.isRequired,
}

export default ImagePaster