# Uses a single route

from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        return render_template("greet.html", name=request.form.get("name", "world"))
    return render_template("index.html")



# # Switches to POST

# from flask import Flask, render_template, request

# app = Flask(__name__)


# @app.route("/")
# def index():
#     return render_template("index.html")


# @app.route("/greet", methods=["POST"])
# def greet():
#     return render_template("greet.html", name=request.form.get("name", "world"))



# # Adds a form, second route

# from flask import Flask, render_template, request

# app = Flask(__name__)


# @app.route("/")
# def index():
#     return render_template("index.html")


# @app.route("/greet")
# def greet():
#     return render_template("greet.html", name=request.args.get("name", "world"))



# # Greets user

# from flask import Flask, render_template, request

# app = Flask(__name__)


# @app.route("/")
# def index():
#     return render_template("index.html", name=request.args.get("name", "world"))
