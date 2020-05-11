import React from "react";

export default props => {
    return (
        <form onSubmit={props.onSubmit}>
            {
                props.errors.map(x => <div>{x}</div>)
            }
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
            <button>Login</button>
        </form>
    )
}