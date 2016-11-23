import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';


const picmaxdim = 1000
const canvas = document.createElement('canvas')

class Display extends React.Component {
    constructor(props) {
            super(props)
            this.updateCanvas = this.updateCanvas.bind(this)
            this.saveImage = this.saveImage.bind(this)
    }
    componentDidMount() {
        console.log("inside didmount")
        this.updateCanvas()
    }
    componentDidUpdate() {
        console.log("inside didupdate")
        this.updateCanvas()
    }
    updateCanvas() {
        let widths = [], heights = []
        this.props.settings.images.forEach((img, idx)=>{
            if (!img.image.hasAttribute('rel') || img.image.getAttribute('rel') != 'loaded') {
                console.log(img.name, "not ready yet")
                setTimeout(() => { this.updateCanvas() }, 500)
                return
            }
            widths.push(img.image.width);
            heights.push(img.image.height);
        })

        let narrowest = Math.min.apply(null, widths)
        let shortest = Math.min.apply(null, heights)

        let rx = this.props.settings.margin, ry = this.props.settings.margin
        let images = this.props.settings.images.map((img, idx)=>{
            console.log("at", rx, ry)
            let obj = {
                image: img.image,
                x: rx,
                y: ry,
                w: 100,
                h: 100,
            }
            if(this.props.settings.direction == 'vertical') {
                let fac = narrowest / img.image.width
                obj.w = img.image.width * fac
                console.log("width set to", obj.w)
                obj.h = img.image.height * fac
                ry += obj.h + this.props.settings.margin
            } else if (this.props.settings.direction == 'horizontal') {
                let fac = shortest / img.image.height
                obj.w = img.image.width * fac
                obj.h = img.image.height * fac
                rx += obj.w + this.props.settings.margin
            } else {
                return null
            }
            return obj
        })

        if(this.props.settings.direction == 'vertical') {
            canvas.width = narrowest + (2 * this.props.settings.margin)
            canvas.height = ry
        } else if (this.props.settings.direction == 'horizontal') {
            canvas.width = rx 
            canvas.height = shortest + (2 * this.props.settings.margin)
        }

        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = this.props.settings.color
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        images.forEach((img, idx) => {
            ctx.drawImage(img.image, img.x, img.y, img.w, img.h)
        })

        // let x = this.props.settings.margin, y = this.props.settings.margin
        // this.props.settings.images.forEach((img, idx)=>{
        //     ctx.drawImage(img.image, x, y, 200, 200)
        //     if(this.props.settings.direction == 'vertical') {
        //         y += 200 + this.props.settings.margin
        //     } else if (this.props.settings.direction == 'horizontal') {
        //         x += 200 + this.props.settings.margin
        //     }
        // })
        this.refs.display.src = canvas.toDataURL('image/png')
    }

    saveImage(event) {
console.log("saving image")
        let dt = canvas.toDataURL('image/png')
        dt = dt.replace("image/png", "application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png")
        console.log(dt)
        top.location.href = dt
    }

    render() {
            // <canvas ref="canvas" width={500} height={500}/>
        return (
            <div>
                <img ref="display" style={{maxWidth: "100%"}} />
                <RaisedButton label="Save Image" primary={true} onClick={this.saveImage} />
            </div>
        )
    }
}

export default Display