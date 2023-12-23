// import { Textfit } from "react";
import { Label } from 'reactstrap'
import './Screen.css'

const Screen = ({ value }) => {
    return (
        <Label className='screen' mode='single' max={70}>
            {value}
        </Label>
    )
}

export default Screen
