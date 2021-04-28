import flask
import random

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    n = random.randint(0,100)
    print(n)
    return str(n)

app.run()
