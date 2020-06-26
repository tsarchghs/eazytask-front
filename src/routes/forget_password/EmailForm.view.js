import React from "react";

const EmailForm = props => {
    return (
        <React.Fragment>
            Reset account <br /><br />
            Forgot password?<br />
            Enter your email<br /> <br />
            <form onSubmit={props.onSubmit}>
                <label>
                    Email: <input
                        type="email"
                        value={props.email}
                        onChange={props.onChange}
                    />
                </label>
                <button type={props.buttonType} style={props.buttonStyle}>Submit</button>
            </form>
        </React.Fragment>
    )
}

export default EmailForm;