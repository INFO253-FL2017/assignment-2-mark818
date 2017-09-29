"""
webserver.py

File that is the central location of code for your webserver.
"""

from flask import Flask, redirect, render_template, request, abort
import os.path
import json
import requests

# Create application, and point static path (where static resources like images, css, and js files are stored) to the
# "static folder"
app = Flask(__name__,static_url_path="/static")

@app.route('/index')
def index():
    return render_template("index.html") # Render the template located in "templates/index.html"

@app.route('/about')
def about():
	return render_template("about.html")

@app.route('/contact')
def contact():
	return render_template("contact.html")

@app.route('/blog/<fname>')
def blog(fname):
	return render_template(fname + '.html')

@app.route('/comment')
def comment():
	return render_template("comment.html")

@app.route('/f', methods=['POST'])
def form():
	data = json.loads(request.data.decode('ascii'))
	r=requests.post(
        "https://api.mailgun.net/v3/sandbox3a8ff3143b3b4e5aaee4908fcb65e1e3.mailgun.org/messages",
        auth=("api", "key-697199aacc92d66f417c9f41deef6cff"),
        data={"from": data['name'] + " " + data['email'],
              "to": ["markshen818@hotmail.com"],
              "subject": data['subject'],
              "text": data['msg']})
	print(r.json())
	return ('', 204)

@app.route('/')
def root():
    """
    If someone goes to the root of your website (i.e. http://localhost:5000/), run this function. The string that this
    returns will be sent to the browser
    """
    return redirect("/index", code=302)