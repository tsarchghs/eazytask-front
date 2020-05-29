import React from "react";
import { connect } from "react-redux";
import { getCategories } from "../../actions/categories";

class CategoryGroup extends React.Component {
    componentDidMount(){
        this.props.getCategories(this.props.categoryGroupId);
    }
    render(){
        return (
            <React.Fragment>
                Task Category<br />
                {
                    this.props.categories.loading && "Loading"
                }
                {
                    !this.props.categories.loading && this.props.categories.allIds.map(id => {
                        let category = this.props.categories.byIds[id];
                        return (
                            <React.Fragment key={category.id}>
                                <button onClick={() => this.props.onCategoryClick(category.name)}>
                                    {category.name}
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

const mapStateToProps = state => ({ categories: state.categories})

export default connect(mapStateToProps, { getCategories })(CategoryGroup);