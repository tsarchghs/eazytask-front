import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Controller, Scene } from 'react-scrollmagic';

import TaskList from "./TaskList.view"

import { getActiveListing } from "../../actions/app";
import { connect } from "react-redux";

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scroll_x: 0,
            onStep: 0,
            detailed: false
        }
        this.stepsSectionRef = undefined;
        this.mainStepsSectionRef = undefined;
        this.activeListingRef = undefined;
        this.count = 0;
        this.prevScrollY = 0;
    }
    listenToScroll = e => {
        console.log(e);
        if (!this.stepsSectionRef) return;
        let fixedY = this.mainStepsSectionRef.offsetTop // 3738 // 4654 // this.stepsSectionRef.getBoundingClientRect
        let down = window.scrollY >= fixedY
        let up = window.scrollY <= fixedY && !down
        console.log(up, down)
        if (up) this.stepsSectionRef.className = "landing-info panel steps-section"
        if (down) this.stepsSectionRef.className = "landing-info panel steps-section steps__layout"
        let stepHeight = (this.stepsSectionRef.scrollHeight + this.stepsSectionRef.offsetHeight) / 3;
        let onStep;
        console.log(up, down)
        if (window.scrollY >= fixedY) onStep = 1
        if (window.scrollY >= (fixedY + (stepHeight * 0.5))) onStep = 2
        if (window.scrollY >= (fixedY + (stepHeight * 1))) onStep = 3
        this.setState({ onStep })
    }
    listenToTouchMove = e => {
        let val = document.documentElement.clientHeight
            ? document.documentElement.scrollTop
            : document.body.scrollTop;
        console.log(val)
        // console.log(e);
        // if (!this.stepsSectionRef) return;
        // let fixedY = 517 // 3738 // 4654 // this.stepsSectionRef.getBoundingClientRect
        // let screenY = document.documentElement.clientHeight
        //     ? document.documentElement.scrollTop
        //     : document.body.scrollTop;
        // console.log(fixedY, screenY)
        // let down = screenY >= fixedY
        // let up = screenY <= fixedY && !down
        // console.log(up, down)
        // if (up) this.stepsSectionRef.className = "landing-info panel steps-section"
        // if (down) this.stepsSectionRef.className = "landing-info panel steps-section steps__layout"
        // let stepHeight = (this.stepsSectionRef.scrollHeight + this.stepsSectionRef.offsetHeight) / 3;
        // let onStep;
        // console.log(up, down)
        // if (screenY >= fixedY) onStep = 1
        // if (screenY >= (fixedY + (stepHeight * 0.5))) onStep = 2
        // if (screenY >= (fixedY + (stepHeight * 1))) onStep = 3
        // this.setState({ onStep })
    }
    componentDidMount(){
        const element = ReactDOM.findDOMNode(this);
        if (element != null) {
            this.scrollPosition = window.scrollY
            console.log("this.scrollPosition", this.scrollPosition)
        }
        console.log(123444)
        this.props.getActiveListing()
        // window.addEventListener('scroll', this.listenToScroll)
        // window.addEventListener('touchmove', this.listenToScroll)
    }
    componentWillUnmount(){
        // window.removeEventListener('scroll', this.listenToScroll)
        // window.removeEventListener('touchmove', this.listenToScroll)

    }
    detailed = () => {
        this.setState(prevState => {
            prevState.detailed = !prevState.detailed 
        })
    }
    render(){
        console.log("this.state.onStep",this.state.onStep)
        console.log("this.props.loading", this.props.loading)
        return (
            <React.Fragment>
                <div className="wrapper">
                    <section className="background-img panel" id="fixed">
                        <div className="container">
                            <div className="content setup-ready">
                                <header>
                                    <a href="#"><img className="logo__img" src="/images/logo2.png" alt="" /></a>
                                </header>
                                <section className="two-column__layout setup__mobile profile__cover">
                                    <div className="two-column__info flex flex-column">
                                        <div className="flex-grow flex flex-column jcc m-jci w100">
                                            <div className="background-title mb5">
                                                <h1>Your tasks</h1>
                                                <h1 className="bold bigger">Made Easy!</h1>
                                            </div>
                                            <p className="mb30 special ">Lorem ipsum dolor sit amet, <br /> consetetur sadipscing elitr, sed diam. </p>
                                        </div>
                                        <div className="mb10">
                                            <img onClick={e => {
                                                this.activeListingRef.scrollIntoView(true, { behavior: "smooth" });
                                            }} style={{cursor:"pointer"}} className="play-img" src="/images/play.png" alt="" />
                                            <p className="special">Watch how it works</p>
                                        </div>
                                        <div className="buttons__group">
                                            {/* <button class="button__style no-color">Skip <span class="show__mobile">for now</span></button> */}
                                            <Link to="/register">
                                                <button className="button__style button--smaller">Join us</button>
                                            </Link>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                    <section className="landing-info panel" ref={ref => this.activeListingRef = ref} id="b">
                        <div className="container">
                            <div className="content">
                                <header className="flex jcsb aic">
                                    <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                                    <Link to="/register">
                                        <a href="#" className="h4">Join us</a>
                                    </Link>
                                </header>
                                <section className="two-column__layout profile__cover">
                                    <div className="two-column__info flex flex-column">
                                        <div className="flex-grow flex flex-column  w100">
                                            <div className="background-title mb5">
                                                <h3>Watch how it</h3>
                                                <h4>Works</h4>
                                                <p className="shadow__title hide__mobile">wanna know how our app works?</p>
                                                <p className="shadow__title show__mobile">COMMERCIAL</p>
                                            </div>
                                            <div className="video">
                                                <div className="video__content">
                                                    <iframe src="https://www.youtube.com/embed/GyM2njSbH00" frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                    <section className="landing-info panel" id="c" style={{ background: 'white' }}>
                        <div className="container">
                            <div className="content">
                                <header class="flex jcsb aic"></header>
                                <section className="two-column__layout profile__cover mission-section">
                                    <div className="two-column__info flex flex-column">
                                        <div className=" flex flex-column  w100">
                                            <div className="background-title mb5">
                                                <h3>Our Wonderful</h3>
                                                <h4>mission</h4>
                                                <p className="shadow__title hide__mobile">wanna know how our app works?</p>
                                                <p className="shadow__title show__mobile">COMMERCIAL</p>
                                            </div>
                                        </div>
                                        <div className="flex jcsb aic two-content" style={{marginTop:60}}> 
                                            <p className="special">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget praesent tristique sed morbi massa porttitor risus posuere. Faucibus platea suspendisse pharetra lacinia ipsum. Hendrerit praesent sem mattis vitae mollis enim.</p>
                                            <img src="/images/product.png" alt="" />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                    <Controller>
                        <Scene duration="100%">
                            { (a,b,c,d) => {
                                console.log("propro",a,b,c,d)
                                let onStep;
                                if (a < 0.3) onStep = 1
                                else if (a < 0.5) onStep = 2
                                else if (a > 0.5) onStep = 3

                                let stepImage = `/images/step${onStep}.png`; 

                                return (
                                    <section ref={ref => this.mainStepsSectionRef = ref} 
                                        className={"landing-info panel steps-section" + (a ? " stdeps__layout" : "")} id="d" 
                                        style={{ background: 'white', height: "100vh" }}
                                    >
                                        <div className="container">
                                            <div className="content">
                                                <header class="flex jcsb aic"></header>
                                                <section ref={ref => this.stepsSectionRef = ref} className="two-column__layout steps__layout-toggle profile__cover steps__layout"> {/* two-column__layout steps__layout-toggle steps__layout profile__cover */ }
                                                    <div className="two-column__info flex flex-column">
                                                        <div className=" flex flex-column  w100">
                                                            <div className="background-title mb5">
                                                                <h3>Steps to make</h3>
                                                                <h4>an eazytask</h4>
                                                                <p className="shadow__title hide__mobile">checkout the steps to make an eazy</p>
                                                                <p className="shadow__title show__mobile">COMMERCIAL</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex jcsb aic two-content" style={{height: "100%"}}>
                                                            <div className="landing-steps">
                                                                <div className={"landing-step active"} id="st1">
                                                                    <div className="landing-step--state">
                                                                        <span className="landing-step__bullet" />
                                                                        <span className="landing-step__line" />
                                                                    </div>
                                                                    <Link to="/register">
                                                                        <h4>Join Us</h4>
                                                                    </Link>
                                                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>
                                                                </div>
                                                                <div className={"landing-step" + (onStep >= 2 ? " active" : "")} id="st2">
                                                                    <div className="landing-step--state">
                                                                        <span className="landing-step__bullet" />
                                                                        <span className="landing-step__line" />
                                                                    </div>
                                                                    <Link to="/register">
                                                                        <h4>Join Us</h4>
                                                                    </Link>                                                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>
                                                                </div>
                                                                <div className={"landing-step" + (onStep >= 3 ? " active" : "")} id="st3">
                                                                    <div className="landing-step--state">
                                                                        <span className="landing-step__bullet" />
                                                                        <span className="landing-step__line" />
                                                                    </div>
                                                                    <Link to="/register">
                                                                        <h4>Join Us</h4>
                                                                    </Link>                                                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>
                                                                </div>
                                                            </div>
                                                            <img src={stepImage} alt="" />
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </section>
                                )
                            }}
                        </Scene>
                    </Controller>
                    <section className="landing-info panel card-section" id="c" style={{ background: 'white' }}>
                        <div className="container">
                            <div className="content">
                                <header className="flex jcsb aic">
                                    <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                                    <Link to="/register">
                                        <a href="#" className="h4">Join us</a>
                                    </Link>
                                </header>
                                <section className="profile__cover">
                                    <div className="two-column__info flex flex-column">
                                        <div className=" flex jcsb aic w100">
                                            <div className="background-title mb5 flex1">
                                                <h3>Active</h3>
                                                <h4>listings</h4>
                                                <p className="shadow__title hide__mobile">some active listings on eazytask</p>
                                                <p className="shadow__title show__mobile">COMMERCIAL</p>
                                            </div>
                                            <Link to="/active_listing">
                                                <h4>Discover all</h4>
                                            </Link><br/>
                                        </div>
                                        <div className={"listing-cards flex aic jcsb" + (this.state.detailed ? "col-cards" :"") }>
                                            { this.props.loading && "Loading" }
                                            {
                                                !this.props.loading && 
                                                this.props.tasks.map(task => (
                                                    <div className="listing-card">
                                                        <Link to={"/task/" + task.id}>
                                                            <div className="listing-card__img">
                                                                <div className="lc-img" style={{ 
                                                                    backgroundImage: 
                                                                            task.thumbnail ? `url("${task.thumbnail}")` : 'url("/images/ustah.jpeg")' 
                                                                    }}
                                                                />
                                                                <div className="listing-card__img--mask" />
                                                            </div>
                                                            <div className="listing-card__info">
                                                                <h3>{task.title}</h3>
                                                                <h5>{task.User.first_name} {task.User.last_name[0]}</h5>
                                                            </div>
                                                            <div className="listing-card__hover flex aic">
                                                                <div>
                                                                <h5>{task.city || "-"}</h5>
                                                                <h5>{task.due_date ? new Date(task.due_date).toLocaleDateString() : "-"}</h5>
                                                                </div>
                                                                <div>
                                                                    <h5>{task.Category.name}</h5>
                                                                    <h5>CHF {task.expected_price}.-</h5>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                </div>

                {/* <Link to="/login">Login</Link> <Link to="/register">Register</Link> <Link to="/logout">Logout</Link>
                <TaskList/> */}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    let tasks = state.app.activeListing.ids.map(
        x => state.tasks.byIds[x]
    )
    let { loading } = state.app.activeListing;
    return { loading, tasks }
}


export default connect(mapStateToProps, { getActiveListing })(Home);