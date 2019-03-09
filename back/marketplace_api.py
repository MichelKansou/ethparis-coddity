import flask
import web3
from flask_cors import CORS
from flask import request
import pandas as pd
from flask import request

num_file = 0

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

csv_file = "file.csv"
bdd = pd.DataFrame()

#fonction d'initialisation de la bdd pour les test
def init_bdd():
    global bdd 
    bdd = pd.DataFrame({"file":["file1","file1","file2","file2","file3"],"licence":[1,5,1,10,1],"prix":[1,2,2,5,3]})
    bdd['hash'] = bdd.apply(calcul_hash,axis=1)

#calcul le hash d'un item
def calcul_hash(item):
    pass

#route pour ajouter un nouveau produit
@app.route('/new_product', methods=['POST'])
def add_product():
    product = request.file['modele']

    #calcul du hash du produit


    #ajout du produit à la bdd
    pass

#route pour ajouter une nouvelle licence à un produit
@app.route('/new_licence', methods=['POST'])
def add_licence():
    #get id du produit, le nombre d'unité et le prix associé à ce nombre 
    pass

#route pour acheter un produit
@app.route('/buy', methods=['POST'])
def buy():
    #récupère la clé publique de l'utilisateur et celle de l'ensemble produit-"licence"
    #récupère la valeur en eth de l'ensemble produit licence

    pass
 
#envois les information au contrat 
def execute_contract(prix,user_key):
    #execute le contrat 

    #retourne si échec ou réussite 
    pass

#retourne une pièce à partir d'un hash 
@app.route('/piece_from_hash/<string:hash>', methods=['GET'])
def get_piece_from_hash(hash):
    item = bdd[bdd["hash"]==hash]
    return flask.jsonify(item.to_dict("records")[0])
     


#rertourne l'ensemble des pièces et leurs prix (front pour afficher)
@app.route('/all_piece', methods=['GET'])
def get_all_piece():
    return flask.jsonify(bdd.to_dict("records"))

#load the BDD  
def load_bdd():
    global bdd
    bdd = pd.read_csv(csv_file)
     
def save_bdd():
    global bdd
    bdd.to_csv(csv_file)
    

if __name__ == "__main__":
    init_bdd()
    app.run()
