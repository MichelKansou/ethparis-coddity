import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.scss';

class AddLicence extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            price: null,
            file: ''
        };
    }


    handleChange = (state) => {
        this.setState(state);
    };

    handleSubmit(event) {
        console.log('A name was submitted: ', this.state);
        event.preventDefault();
    }

    render() {
        const { price, file } = this.state;
        const { account } = this.props;

        return (
            <div className="add-licence-container">
                <h3>Upload your Model</h3>
                <div className="form">
                    <input className="input-form" placeholder="Address" type="text" value={ account } readOnly disabled />
                    <input className="input-form" placeholder="Price of 1 printing Licence ex: 0.1" type="text" value={ price } onChange={(e) => this.handleChange({price: e.target.value})} />
                    <div className="upload-container">
                        <input className="fake-input" value={ file.replace("C:\\fakepath\\", "") } readOnly/>
                        <div className="file-upload-btn">
                            <span>Upload</span>
                            <input type="file" accept="image/png, image/jpeg"  className="upload" onChange={(e) => this.handleChange({file: e.target.value})}/>
                        </div>
                    </div>
                    <button className="submit-btn" onClick={(e) => this.handleSubmit(e)}>Submit</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
        hasErrored: state.accountHasErrored,
        isLoading: state.accountIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLicence);
