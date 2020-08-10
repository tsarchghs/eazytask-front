import React from "react";
import { Link, withRouter } from "react-router-dom";
import WebHeader from "../../components/WebHeader";
import Footer from "../../components/Footer";

const Impressum = props => {
    let fromCreateTask = props.location.search.indexOf("fromCreateTask") !== -1
    return (
        <div className=" edit-task__wrapper">
        <section className="landing-info panel edit-task__section br-m">
            <div className="container">
                <div className="content ">
                    <header className="logo-text">
                        <span style={{ cursor: "pointer" }} onClick={props.goBack} className="show__mobile">
                        {
                          !fromCreateTask &&
                          <img src="/images/arrow.jpeg" alt="" />
                        }
                        </span>
                        <h4 style={ fromCreateTask ? { textAlign: "center" } : undefined } className="hide-on-desktop logo-title ">
                        <span style={{ cursor: "pointer" }} onClick={props.goBack} className="arraw hide-on-mobile">
                          {
                            !fromCreateTask && 
                          <img src="/images/arrow.jpeg" alt="" />
                          }
                        </span>Impressum</h4>
                        </header>
                    {/* <header>
                      <span style={{width: 29, display: "flex", marginRight: 15}} onClick={() => props.history.push("/register")} class=""><img src="/images/arrow.jpeg" alt="" /></span>
                      <img onClick={() => props.history.push("/")} style={{ cursor: "pointer" }} class="logo__img" src="/images/logo.svg" alt="" />
                    </header> */}
                    <center>
        <div>
          <h2 data-pm-slice="1 1 []">
            <strong>Impressum</strong>
            </h2>
            <p>Die Webseite eazytask.ch wird von pbits GmbH – Professional Business &amp; IT Solutions betrieben.</p><p>
              <strong>Kontaktadresse:</strong><br />eazytask<br />c/o pbits GmbH<br />Colombstrasse 30<br />CH-3027 Bern</p><p><strong>E-Mail:&nbsp;</strong>hello@eazytask.ch&nbsp;</p><p><strong>Geschäftsleitung:&nbsp;</strong>Senat Mustafi (Gesellschafter und Geschäftsführer)</p><p><strong>Handelsregistereintrag:</strong> Handelsregister des Kantons Bern, CH-036.4.061.531-5</p><p><strong>Firmenidentifikationsnummer (UID):</strong> CH-178.994.229</p>
        </div>

                    </center>
                    </div>

                  </div>
                  <Footer/>
                  
                </section>
                
              </div>
    )
}

export default withRouter(Impressum);