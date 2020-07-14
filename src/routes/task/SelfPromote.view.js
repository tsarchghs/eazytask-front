import React from "react";

export default props => {
    return (
        <div>
            <div className="container hide-on-web">
                <div className="content">
                    <header className="logo-text">
                        <span onClick={props.goBack} className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                        <h4 className="hide-on-desktop logo-title">Self <span> Promote</span></h4>
                        <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                    </header>
                    <section className="two-column__layout setup__mobile create-task ">
                        <div className="two-column__info flex flex-column">
                            <div className="background-title mb30">
                                <h1>Describe</h1>
                                <h3>task</h3>
                                <p className="shadow__title no-contain">create a task on eazytask easy </p>
                            </div>
                            <h4 className="show__mobile">
                                <p className="show__mobile--subtitle">Please write why do you think you are the right person to do this task</p>
                            </h4>
                            <form action className="register__form flex-grow" style={{ marginTop: 0 }}>
                                <textarea className="textarea" name id placeholder="Promote yourself..." value={props.value} onChange={props.onChange} />
                            </form>
                            <div className="buttons__group">
                                <button onClick={e => {
                                    e.preventDefault();
                                    if (props.buttonOnClick) props.buttonOnClick()
                                }}  className="button__style" style={props.buttonStyle}>Next</button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <section className="offers-layout hide-on-mobile">
                <div className="offers-picture" style={{
                    backgroundImage: `url(${props.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__})`
                }} />
                <div className="offers-content">
                    <div className="offers__cards">
                        {props.offersCard}
                        <div className="other-offers__list offers-web-size">
                            <p className="offers-images__title">Self promote</p>
                            <p style={{ fontSize: '12px', color: '#8a8a8a', width: '300px', margin: '0 auto', textAlign: 'center' }}>Vulputate erat ut nisl, dolor. In ac sed iaculis nec feugiat arcu aenean curabitur diam.</p>
                            <div className="other-textarea">
                                <textarea name id cols={30} rows={10} value={props.value} onChange={props.onChange} />
                            </div>
                        </div>
                        <div className="offers-buttons" style={{ marginBottom: "2%" }}>
                            <a onClick={e => {
                                e.preventDefault();
                                if (props.buttonOnClick) props.buttonOnClick()
                            }} className="button__style" style={props.buttonStyle}>Make offer</a>
                        </div>
                    </div>
                </div></section>
        </div>

    )
}