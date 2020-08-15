import React from "react";
import { connect } from "react-redux";
import { getMyHistory } from "../../actions/task";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import getImageUrl from "../../utils/getImageUrl";

class History extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getMyHistory()
    }
    getShow = task => {
        let show;
        if (task.status == "ACTIVE") {
            show = `${this.getTrans(this.props.translations.text_1)} ${new Date(task.due_date).toLocaleDateString().replace(/\//g, ".")}`;
        } else if (task.status == "DELETED") {
            show = this.getTrans(this.props.translations.text_2)
        } else if (task.status == "DEACTIVATED") {
            show = this.getTrans(this.props.translations.text_3)
        }
        return show;
    }
    getTrans = obj => {
      let data = obj[this.props.app_lang];
      if (typeof (data) == "string") return data;
      if (data.length) {
          return data.map(str => <React.Fragment>
              {str}
          </React.Fragment>)
      }
    }
    render(){
        let { loading, err, tasks } = this.props;
        return (
            <div>
            <div className=" edit-task__wrapper hide-on-web">
              <section className="landing-info panel edit-task__section">
                <div className="container">
                  <div className="content pb50">
                    <header className="logo-text">
                      <span className="show__mobile"><img onClick={this.props.goBack} src="/images/arrow.jpeg" alt="" /></span>
                      <h4 className="hide-on-desktop logo-title">
                        {this.getTrans(this.props.translations.mobile.text_1)}
                      </h4>
                    </header>
                    <section className="home">
                      <div className="home__cards">
                        <div className="home__card--content">
                        { loading && "Loading.." }
                        { err && err.name }
                        { !loading && !err && !tasks.length  && <p className="special">
                          {this.getTrans(this.props.common.no_results)}
                        </p>}
                        { !loading && !err && tasks.map(task => (
                            <div style={{cursor: "pointer" }} onClick={() => this.props.history.push("/task/" + task.id)} className="home__card" style={{backgroundImage: `url("${task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__}")`}}>
                                <div className="home__card--mask" />
                                <h5>{this.getTrans(this.props.translations.text_4)} “{task.title}”</h5>
                                <p>{this.getShow(task)}</p>
                            </div>
                        ))}
                          {/* <div class="home__card--lonely">
                                    <h4>It's lonely here!</h4>
                                    <p>You don’t have any active task yet.</p>
                                    <img src="/images/super_man.png" alt="" style="width: 35%;">
                                    <img src="/images/lonely.jpeg" alt="">
                                </div> */}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </section>
            </div>
            <section className="offers-layout tasker-profile hide-on-mobile">
              <div style={{
                backgroundImage: `url(${getImageUrl(this.props.own_profile.cover_image) || window.__COVER_DEFAULT_PICTURE__})`

              }} className="offers-picture">
                <div className="offer-picture__buttons">
                  <div style={{ cursor: "pointer" }} className="offer-picture__back"><img onClick={this.props.goBack} src="/images/arrow.jpeg" alt="" /></div>
                  <div className="offer-picture__edit hide">
                    <img src="/images/more.png" alt="" />
                  </div>	
                </div>
                {/* <div class="slice"></div> */}
              </div>
              <div className="offers-content modified">
                <div className="offers__cards">
                  <div className="offers__card ">
                    <div className="offers__card--top">
                      <div className="offers__profile">
                        <div className="offers__profile--img" />
                        <h4 className="flex aic jcc"> <div className="img-circle"><img src={getImageUrl(this.props.own_profile.profile_image) || window.__PROFILE_DEFAULT_PICTURE__} alt="" />
                        </div> {this.props.own_profile.first_name} {this.props.own_profile.last_name}</h4>
                      </div>
                      <p className="special">{this.props.own_profile.short_biography || 
                      this.getTrans(this.props.translations.web.text_2)}</p>
                    </div>
                  </div>
                  <div className="offers-images__layout">
                    <div className="faq-web__top  tabs-modified">
                      <div className="home__tabs jcc">
                        <div className="home__tab active">{this.getTrans(this.props.translations.web.text_1)}</div>
                      </div>
                    </div>
                    <div className="offers-images slide-cards">
                        { loading && "Loading.." }
                        { err && err.name }
                        { !loading && !err && tasks.map(task => (
                          <div style={{ cursor: "pointer" }} onClick={() => this.props.history.push("/task/" + task.id)} className="offers-image">
                                <img src={task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__} alt="" />
                                <div>
                                    <h4>{task.title}</h4>
                                    <p>{this.getShow(task)}</p>
                                </div>
                                </div>
                        ))}
                        { !loading && !err && !tasks.length && <p className="special">
                          {this.getTrans(this.props.common.no_results)}
                        </p> }
                    </div>
                  </div>
                </div>
              </div></section>
          </div>
        )
    }
}

const mapStateToProps = state => {
    let tasks = state.tasks.my_history.ids.map(id => state.tasks.byIds[id]);
    return { 
      ...state.tasks.my_history, tasks, own_profile: state.auth.profile,
      translations: state.app_lang.data["/history"],
      app_lang: state.app_lang.app_lang,
      common: state.app_lang.common  
    }
}

export default compose(withRouter,connect(mapStateToProps, { getMyHistory }))(History);