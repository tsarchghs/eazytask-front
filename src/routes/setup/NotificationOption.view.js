import React from "react";
import PhoneInput from 'react-phone-number-input'

export default props => {
    return (
        <React.Fragment>
            Notification option<br />
            <button onClick={props.setSMS}>SMS</button><br/>
            <button onClick={props.setEMAIL}>EMAIL</button>


            { props.notification_option === "EMAIL" && null
            }
                {/* <input type="email" value={props.email} onChange={props.emailOnChange}/> */}
            { props.notification_option === "SMS" && 
                <PhoneInput
                    defaultCountry="CH"
                    placeholder="Enter phone number"
                    value={props.phone}
                    onChange={props.phoneOnChange} 
                />
            }
        </React.Fragment>
    )
}