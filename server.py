import cx_Oracle
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['POST'])
def get_data():
    data = request.json
    command = data.get('command')
    if((command.split())[0] == "insert" or (command.split())[0] == "update" or (command.split())[0] == "delete"):
        
        try:
            connection = cx_Oracle.connect(user="c##new_kanna", password="kanna", dsn="localhost/orcl2")
            cursor = connection.cursor()
            cursor.execute(command)
            cursor.execute('commit')
            return jsonify({'sol': "allgood"}), 200
        except cx_Oracle.Error as error:
            
            error_message = str(error)
            return jsonify({'error': error_message}), 500
        except Exception as e:
            error_message = str(e)
            return jsonify({'error': error_message}), 500
        
    else:
        try:
            connection = cx_Oracle.connect(user="c##new_kanna", password="kanna", dsn="localhost/orcl2")
            cursor = connection.cursor()
            cursor.execute(command)
            rows = cursor.fetchall()
            cursor.close()
            connection.close()
            return jsonify({'sol': rows}), 200
        except cx_Oracle.Error as error:
            error_message = str(error)
            return jsonify({'error': error_message}), 500
        except Exception as e:
            error_message = str(e)
            return jsonify({'error': error_message}), 500

if __name__ == '__main__':
    app.run(debug=True)