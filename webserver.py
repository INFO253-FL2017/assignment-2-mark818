"""
webserver.py

File that is the central location of code for your webserver.
"""

from flask import Flask, redirect, render_template, request, abort
from os import environ
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

@app.route('/weather')
def weather():
  return render_template('weather.html')

@app.route('/comment')
def comment():
	return render_template("comment.html")

USER  = environ['INFO253_MAILGUN_USER'] #api
PASS  = environ['INFO253_MAILGUN_PASSWORD'] #key-697199aacc92d66f417c9f41deef6cff
EFROM = environ['INFO253_MAILGUN_FROM_EMAIL']
ETO   = environ['INFO253_MAILGUN_TO_EMAIL']
URL   = environ['INFO253_MAILGUN_DOMAIN'] #"https://api.mailgun.net/v3/sandbox3a8ff3143b3b4e5aaee4908fcb65e1e3.mailgun.org/messages"

@app.route('/f', methods=['POST'])
def form():
	data = json.loads(request.data.decode('ascii'))
	r=requests.post(
        URL,
        auth=(USER, PASS),
        data={"from": data['name'] + " " + EFROM,
              "to": ETO,
              "subject": data['subject'],
              "text": data['msg'] +
                     '\n Please reply to ' + data['email'] + ' directly.'})
	return ('', 204)

@app.route('/')
def root():
    """
    If someone goes to the root of your website (i.e. http://localhost:5000/), run this function. The string that this
    returns will be sent to the browser
    """
    return redirect("/index", code=302)
