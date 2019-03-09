import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {truncate} from 'lodash';
import './style.scss';

class LicenceList extends Component {

    render() {
        const licences = this.props.licences.slice(0).reverse().map((licence, index) =>
            <div key={index} className="item">
                <div className="column">
                    <div className="object-name">{licence.file}</div>
                    <div className="object-hash">{truncate(licence.hash, {length: 50})}</div>
                    <div className="object-price">{licence.price > 2 ? 1 : licence.price}</div>
                </div>
                <button className="buy-btn" onClick={() => this.props.setLicence(this.props.account, licence.hash, licence.price)}>BUY</button>
            </div>
        );
        return (
            <div className="licence-list-container">
                {licences}
            </div>
        );
    }
}


LicenceList.propTypes = {
    account: PropTypes.string,
    licences: PropTypes.array,
    setLicence: PropTypes.func,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default LicenceList;
