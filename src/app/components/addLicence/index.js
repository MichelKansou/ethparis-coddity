import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createLicence } from '../../../app/store/actions/licence.js';
import './style.scss';

class AddLicence extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            price: '',
            file: '',
            fileName: ''
        };
    }


    handleChange = (state) => {
        this.setState(state);
    };

    handleSubmit(event) {
        event.preventDefault();
        this.props.createLicence(this.props.account, this.state);
    }

    handleFileChosen = (e, file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            this.setState({
                file: reader.result.split(',')[1],
                fileName: file.name
            });
        };
        reader.readAsDataURL(file);
    };

    render() {
        const { price, fileName } = this.state;
        const { account } = this.props;

        return (
            <div className="add-licence-container">
                <h3>Upload your Model</h3>
                <div className="form">
                    <input className="input-form" placeholder="Address" type="text" value={ account } readOnly disabled />
                    <input className="input-form" placeholder="Price of 1 printing Licence ex: 0.1" type="text" value={ price } onChange={(e) => this.handleChange({price: e.target.value})} />
                    <div className="upload-container">
                        <input className="fake-input" value={ fileName.replace("C:\\fakepath\\", "") }  readOnly/>
                        <div className="file-upload-btn">
                            <span>Upload</span>
                            <input ref="file" type="file"  className="upload" onChange={(e) => this.handleFileChosen(e, e.target.files[0])}/>
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
    return {
        createLicence: (account, payload) => dispatch(createLicence(account, payload))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(AddLicence);
