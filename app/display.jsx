import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';


const picmaxdim = 1000

class Display extends React.Component {
    constructor(props, context) {
            super(props, context)
            this.updateCanvas = this.updateCanvas.bind(this)
    }

    componentDidMount() {
        this.updateCanvas()
    }

    componentDidUpdate() {
        this.updateCanvas()
    }

    updateCanvas() {
        let widths = [], heights = []
        this.props.settings.images.forEach((img, idx)=>{
            if (!img.image.hasAttribute('rel') || img.image.getAttribute('rel') != 'loaded') {
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
            this.context.canvas.width = narrowest + (2 * this.props.settings.margin)
            this.context.canvas.height = ry
        } else if (this.props.settings.direction == 'horizontal') {
            this.context.canvas.width = rx 
            this.context.canvas.height = shortest + (2 * this.props.settings.margin)
        }

        const ctx = this.context.canvas.getContext('2d')
        ctx.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
        ctx.fillStyle = this.props.settings.color
        ctx.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height)

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
        this.refs.display.src = this.context.canvas.toDataURL('image/png')
    }

    render() {
            // <canvas ref="canvas" width={500} height={500}/>
        return (
            <div style={{textAlign: "center"}}>
                {(() => {
                    if(this.props.settings.images.length > 0) {
                        return <img ref="display" style={{maxWidth: "100%"}} />
                    } else {
                        return <p style={{margin: "3em"}}><em> You need to add images.  Click on <Chip style={{display: "inline-block", margin: '0em', padding: '0em'}}> IMAGES </Chip> button above.</em></p>
                    }
                })()}
            </div>
        )
    }
}

Display.contextTypes = {
  canvas: React.PropTypes.object.isRequired,
}


export default Display