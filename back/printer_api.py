import flask
import web3
from flask_cors import CORS
from flask import request

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

# adresse du smart contract à exécuter pour s'assurer de la validité 
adresse_contract = None 

web3_contract = web3.contract.Contract(adresse_contract)

#route pour demander l'impression d'une pière 
@app.route('/print', methods=['POST'])
def print_piece():
    #Calcul du Hash

    #Envoie du Hash au smart contract

    #Si retour positif : 
    #Récupération de la pièce à imprimer
    #Envoie du fichier en retour

    #Sinon
    #Retourne False
    pass



#Fonction pour DL le modele 
def get_piece(hash):
    #envoie du hash au back de la marketplace
    url="httpS://ethparis.herokuapp.com/piece_from_hash"
    data = {"hash":hash}
    response = request.post(url, json=data,).text

    #return la pièce
    return flask.jsonify(response)


if __name__ == "__main__":
    app.run()


