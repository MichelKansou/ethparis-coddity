from flask import template_rendered
from flask import render_template
import flask
import web3
from flask_cors import CORS
from flask import request
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf import FlaskForm
import os
from flask import render_template, flash, redirect
import requests

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)


class LoginForm(FlaskForm):

    public_key = StringField('Your Public Key', validators=[DataRequired()])
    object_hash = PasswordField('The item hash', validators=[DataRequired()])
    submit = SubmitField('Print')


@app.route('/')
@app.route('/', methods=['GET','POST'])
def home():
    return render_template('home.html', title='Home')


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        flash('public key {}, hash {}'.format(
            form.public_key.data, form.object_hash.data))
            
        response = get_piece(form.object_hash.data)

        
        return render_template('file_template.html', title='Your file', file=response)
    return render_template('form_template.html', title='What do you want to print ?', form=form)

def get_piece(hash):
    #envoie du hash au back de la marketplace
    url="httpS://ethparis.herokuapp.com/piece_from_hash"
    data = {"hash":hash}
    response = requests.post(url, json=data).text

    #return la pièce
    return response



if __name__ == "__main__":
    SECRET_KEY = os.urandom(32)
    app.config['SECRET_KEY'] = SECRET_KEY
    app.run()

