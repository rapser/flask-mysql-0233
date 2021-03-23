from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required

import pymysql

conn = pymysql.connect(
        host= 'webinarcodigo.c16vf7d4zq8q.us-east-2.rds.amazonaws.com', 
        port = 3306,
        user = 'admin', 
        password = 'admin1234',
        db = 'j6esing1lhmqk7kj'
        )

app = Flask(__name__)
app.config['JWT_SECRET_KEY']="codigowebinar"

jwt = JWTManager(app)
CORS(app)

@jwt.unauthorized_loader
def prueba(mensaje):
    print(mensaje)
    if mensaje == 'Missing Authorization Header':
        return jsonify({
            'message':'Salte de mi servidor 😁😁'
        })
    else:
        return jsonify({
            'message': mensaje
        })


@app.route('/') #ENDPOINT
@jwt_required
def inicio():
    return {
        'message':'Bienvenido al webinar CodiGo'
    }


@app.route('/productos', methods=['GET'])
#@jwt_required
def getProducts():
    cur = conn.cursor()
    cur.execute('SELECT * FROM t_productos') # ORM
    data = cur.fetchall()
    print(data)
    cur.close()
    if data:
        resultado = []
        for producto in data:
            print(producto)
            resultado.append({
                'id': producto[0],
                'nombre':producto[1],
                'precio':str(producto[2]),
                'disponible':bool(producto[3]),
            })
        return jsonify({
            'ok': True,
            'content': resultado
        }), 200
    return jsonify({
            'ok': True,
            'content': None
        }), 200

@app.route('/agregar_producto',methods=['POST'])
def addProduct():
    if request.is_json:
        data = request.get_json()
        cur = conn.cursor()
        cur.execute('INSERT INTO t_productos (prod_nom, prod_prec, prod_disp) VALUES (%s,%s,%s)',
                    (data['nombre'], data['precio'],data['disponible']))
        conn.commit()
        cur.close()
        return jsonify({
            'ok':True,
            'message':'Producto agregado exitosamente'
        }), 201
    else:
        return jsonify({
            'ok':False,
            'message':'Faltan campos'
        }), 404

@app.route('/producto/<int:id>', methods=['DELETE'])
def eliminarProduct(id):
    cur = conn.cursor()
    cur.execute('DELETE FROM t_productos where id = %s',(id,))
    conn.commit()
    cur.close()
    return {
        'message':'Se eliminó exitosamente el producto',
    }

if __name__ =='__main__':
    app.run(debug=True)