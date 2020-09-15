import React from "react";
import axios from "../../utils/axios";
import getNotificationInfo from "../../utils/getNotificationInfo";
import { withRouter, Link } from "react-router-dom";
import getImageUrl from "../../utils/getImageUrl";
import { compose } from "recompose";
import { connect } from "react-redux";

class MobileNotifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: undefined,
            payload: undefined
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        axios.get("/notifications")
            .then(({ data }) => this.setState({ payload: data.data, loading: false }))
            .catch(error => this.setState({ error, loading: false }))
    }
    render() {
        let { loading, error, payload } = this.state;
        if (loading) return <p className="text-center special">Loading</p>;
        if (error) {
            return "Error";
        }
        if (this.props.children) return this.props.children({ loading, error, payload })
        return (
            <React.Fragment>
                <div className=" edit-task__wrapper hide-on-web">
                    <section className="landing-info panel edit-task__section">
                        <div className="container">
                            <div className="content pb50">
                                <header className="logo-text">
                                    <span onClick={this.props.goBack} className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                                    <h4 className="hide-on-desktop logo-title">
                                        {this.props.translations.text_1[this.props.app_lang]}
                                    </h4>
                                </header>
                                <section className="home">
                                    <div className="home__notifications noti__mobile">
                                        <div className="home__noti-cards">
                                            {
                                                payload.map(notifc => {
                                                    let info = getNotificationInfo[notifc.type](notifc);
                                                    return (
                                                        <div
                                                            onClick={e => {
                                                                axios.post("/read_notification/" + notifc.id)
                                                                this.props.history.push(info.pathname)
                                                            }}
                                                            style={{ display: "inline-flex", cursor: "pointer" }}

                                                            className={"home__noti-card " + (!notifc.read ? "highlighted" : "") }>
                                                            <div className="img-circle" style={{ width: '43px', height: '43px', minWidth: '43px' }}><img src={
                                                                getImageUrl(notifc.user_2.profile_image,"small") || window.__PROFILE_DEFAULT_PICTURE__
                                                            } alt="" /></div>
                                                            <div clas="flex	aic">
                                                                <h3 className="m-fs16 text-left fwb mb0">{notifc.user_2.first_name} {notifc.user_2.last_name[0]}.</h3>
                                                                <p className="fs12 fwn mb0 special">{info.text}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        )
    }
}

let mapStateToProps = state => ({
    translations: state.app_lang.data["/notifications-mobile"],
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})
export default compose(withRouter,connect(mapStateToProps))(MobileNotifications)