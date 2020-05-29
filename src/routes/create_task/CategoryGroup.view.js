import React from "react";
import { connect } from "react-redux";
import { getCategoriesGroups } from "../../actions/categories_group";

class CategoryGroup extends React.Component {
    componentDidMount(){
        this.props.getCategoriesGroups();
    }
    render(){
        return (
            <React.Fragment>
                Task Category<br />
                {
                    this.props.categoriesGroups.loading && "Loading"
                }
                {
                    !this.props.categoriesGroups.loading && this.props.categoriesGroups.allIds.map(ID => {
                        let { id, name } = this.props.categoriesGroups.byIds[ID];
                        return (
                            <React.Fragment key={id}>
                                <button onClick={() => this.props.onCategoryGroupClick(id)}>
                                    {name}
                                </button><br />
                            </React.Fragment>
                        )
                    })
                }
                <button onClick={this.props.onOtherClick}>
                    Other
                </button>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({ categoriesGroups: state.categoriesGroups})

export default connect(mapStateToProps, { getCategoriesGroups })(CategoryGroup);