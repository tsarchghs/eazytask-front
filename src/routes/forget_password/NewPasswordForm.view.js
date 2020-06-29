import React from "react";
import { withRouter } from "react-router-dom";

const NewPasswordForm = props => {
    if (props.app_resetPassowrd.success)  
        props.history.push("?success=true")  
    let { loading } = props.app_resetPassowrd;
    return (
        <React.Fragment>
            Reset account <br /><br />
            New password<br />
            Please write your new password down below<br /> <br />
            <form onSubmit={props.onSubmit}>
                {
                    props.app_resetPassowrd.err &&
                    props.app_resetPassowrd.err.response &&
                    props.app_resetPassowrd.err.response.data &&
                    props.app_resetPassowrd.err.response.data.errors.map(err => <div>{err}<br/></div>)

                }
                <label>
                    New password: <input
                        type="password"
                        value={props.new_password}
                        onChange={props.onNewPasswordChange}
                    />
                    Confirm new password: <input
                        type="password"
                        value={props.confirm_new_password}
                        onChange={props.onConfirmNewPasswordChange}
                    />
                </label>
                {
                    loading ? "Loading" :
                    <button type={props.buttonType} style={props.buttonStyle}>Submit</button>
                }
            </form>
        </React.Fragment>
    )
}

export default withRouter(NewPasswordForm);