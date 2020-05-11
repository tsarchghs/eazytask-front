import React from "react";

export default props => {
    return (
        <form onSubmit={props.onSubmit}>
            {
                props.errors.map(x => <div>{x}</div>)
            }
            <input
                placeholder="First name..."
                value={props.first_name.value}
                onChange={props.first_name.onChange}
            />
            <input
                placeholder="Last name..."
                value={props.last_name.value}
                onChange={props.last_name.onChange}
            />
            <input
                placeholder="Email..."
                value={props.email.value}
                onChange={props.email.onChange}
            />
            <input
                placeholder="Password..."
                value={props.password.value}
                onChange={props.password.onChange}
            />
            <button>Register</button>
        </form>
    )
}