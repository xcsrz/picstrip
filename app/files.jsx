import React from 'react';
import {Card, CardHeader, CardTitle} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400, darkBlack, lightBlack, indigo900} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';

const draftmaxdim = 1000;

const scaleSrcImage = function(img) {
    // if the pic is already small enough the draft is the full res image
    if (img.width <= draftmaxdim && img.height <= draftmaxdim) {
        return new Array(img, img.width, img. height)
    }
    if(img.width > img.height) {
        pw = draftmaxdim;
        ph = img.height * (draftmaxdim / img.width);
    } else {
        ph = draftmaxdim;
        pw = img.width * (draftmaxdim / img.height);
    }
    newsrc = scaleImage(img, pw, ph);
    return new Array(newsrc, pw, ph);
}

const scaleImage = function(img,tw,th) {
    cvs = document.createElement("canvas");
    cvs.width = tw;
    cvs.height = th;
    if(cvs && cvs.getContext) {
        ctx = cvs.getContext("2d");
        ctx.drawImage(img,0,0,tw,th);
        return cvs.toDataURL();
    } else {
        alert("Could not scale image.");
    }
}

const File = (props, context ) => {
	let addpics = function(event) {
		let myURL = window.URL || window.webkitURL
		for (let i = 0; i < event.target.files.length; i++) {
			if (!event.target.files[i].type.match(/image.*/)) {
				alert("Could not add " + file.name + " because it it not a valid file.")
				continue
			}

			let img = document.createElement("img");
			img.src = myURL.createObjectURL(event.target.files[i])
			img.onload = function() {
				this.setAttribute("rel", "loaded")
			}
			props.add({
				name: event.target.files[i].name,
				image: img,
                draft: img,
			})
		}
	}


	return (
		<Card>
            <CardTitle title="Images" />
                <List>
                    {props.files.map((img, idx)=>{
                        const iconButtonElement = (
                          <IconButton
                            touch={true}
                            tooltip="more"
                            tooltipPosition="bottom-left"
                          >
                            <MoreVertIcon color={grey400} />
                          </IconButton>
                        );

                        const rightIconMenu = (
                          <IconMenu iconButtonElement={iconButtonElement}>
                            <MenuItem>Move Up</MenuItem>
                            <MenuItem>Move Down</MenuItem>
                            <MenuItem>Delete</MenuItem>
                          </IconMenu>
                        );
                        return (<ListItem
                                    primaryText={img.name}
                                    rightIconButton={rightIconMenu}
                                    />)
                    })}
                </List>
                <label>
                    <Avatar
                        icon={<ContentAdd />}
                        size={50}
                        backgroundColor={indigo900}
                        style={{float: "right"}}
                    />
                    <input type="file" multiple style={{display: "none"}} onChange={ addpics } />
                </label>
                <div style={{clear: "both"}}></div>
        </Card>
    )
}

export default File