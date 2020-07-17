import React from "react";

export default () => {
    return (
        <div className="container">
            <div className="content">
                <header className="w-subtitle text-center">
                    <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                </header>
                <section className="two-column__layout setup__mobile create-task reset-password text-center">
                    <div className="two-column__info flex flex-column">
                        <div className="flex-grow img-wrapper flex aic jcc one-section-show">
                            <img className="img__mobile " src="/images/404_not_found.png" alt="" />
                        </div>
                        <div className="background-title mb30">
                            <h1 style={{ color: '#000', fontSize: '28px', marginTop: '30px', marginBottom: '50px' }}>Sorry, we don’t know what you’re looking for</h1>
                            <p className="web__subtitle gray">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>
                        </div>
                        <h4 className="show__mobile title-with-subtitle text-center " style={{ color: '#000' }}>
                            Sorry, we don’t know what <br /> you’re looking for
                <p className="text-center mt20" style={{ color: '#8a8a8a' }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>
                        </h4>
                    </div>
                    <div className="two-column__img hide-on-desktop">
                        <div className="two-column__image">
                            <img src="/images/404_not_found.png" alt="" />
                        </div>
                        {/* 	<div class="dots__group">
					<span class="dot active"></span>
					<span class="dot"></span>
					<span class="dot"></span>
				</div> */}
                    </div>
                </section>
            </div>
        </div>

    )
}