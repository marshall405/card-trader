import React from 'react'
import Button from '@material-ui/core/Button'

export default function ImgModal(props) {
    return (
        <div className="modal-card">
            <Button size="lg" style={{ position: "absolute", top: "30px", right: "30px" }} onClick={props.setShow}>
                <svg style={{ width: "50px", height: "50px", color: "#fff" }} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
                </svg>
            </Button>

            <div>
                <img src={props.img_url} alt="" />
            </div>
        </div>
    )
}
