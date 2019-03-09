import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class PageLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    };

    shouldComponentUpdate(nextProps) {
        if (nextProps.loading !== this.state.loading) {
            this.setState({
                loading: nextProps.loading
            });
        }
        return true;
    }

    loader() {
        return (
            <div className="lds-ellipsis">
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
            </div>
        );
    }

    render() {
        const children = this.state.loading ? this.loader() : this.props.children;
        return (
            <div className={this.state.loading ? 'loader-container is-loading' : 'loader-container'}>
                {children}
            </div>
        )
    }
}

PageLoader.propTypes = {
    children: PropTypes.node.isRequired,
    loading: PropTypes.bool.isRequired
};
