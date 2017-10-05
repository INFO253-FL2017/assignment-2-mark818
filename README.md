# Assignment 2
## Make your static website dynamic

Our assignments are going to be built around building a blog from the ground up and eventually hosting your blog in the 
cloud. For this second assignment, you are going to take the static blog that you have created and host it on a server 
that you will set up, build, and code yourself. At the end of this assignment you will have used your vagrant box to 
power a web server that is hosting your very own site!

You will be using [Flask](http://flask.pocoo.org/)

You will need to do the following:

### Install Python 3 to your vagrant box (if you haven't alreaady)

1. Download [miniconda](https://conda.io/miniconda.html) for Linux. Download the right Linux installer (32 bit or 64 bit, depending on your system) and 
save that file in the i253 folder
2. Load up your vagrant box and run the 
 - ```bash Miniconda3-latest-Linux-x86_64.sh``` for 64 bit
 - ```bash Miniconda3-latest-Linux-x86.sh``` for 32 bit
3. Be sure to type "yes" when asked this question;
 - Do you wish the installer to prepend the Miniconda3 install location to PATH in your /home/vagrant/.bashrc ? [yes|no]
4. Close out of your vagrant box and enter it again

Now you should be able to type python3 --version and it should specify that you are running python 3.6

### Forward ports from your vagrant box so that you can use your webserver outside your vagrant box (if you haven't already)

1. Open the file "Vagrantfile" located in your i253 folder with a text editor
2. At the second line from the end (before the word "end") add the following code:
   ``` 
    for i in 5000..5010
        config.vm.network :forwarded_port, guest: i, host: i
    end
    ```
3. Run ```vagrant reload```
4. Now ports 5000 through 5010 are availiable on your host computer by going to your browser and going to
http://localhost:5000, http://localhost:5001, and so on to http://localhost:5010

### Clone your repo and run your server

1. Clone your webarch-assign-2 repository inside your vagrant box under /vagrant
2. Run ```cd webarch-assign-2```
3. Install all of your requirements by running the command: ```pip install -r requirements.txt ```
4. Tell your vagrant box where the code to your flask application lives by running the command ```export FLASK_APP=webserver.py```
5. Run your application by running the command ```flask run --host=0.0.0.0```

You would see your terminal look something like this:

```
vagrant@precise64:/vagrant/webarch-assign-2$ flask run --host=0.0.0.0
 * Serving Flask app "webserver"
 * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
10.0.2.2 - - [26/Sep/2017 20:52:10] "GET / HTTP/1.1" 200 -
```

### Build a web server that serves the HTML pages you created in assignment 1
You will be wiring up your blog that you have created in assignment 1 to be hosted in your web server. You will need to 
create routes that tell the server to return the HTML of the page that the user requested. You will need to use the 
[templates feature](http://flask.pocoo.org/docs/0.12/templating/) of Flask to power these pages.

The following URLs should load the following pages:

1. http://localhost:5000/index -> home page
2. http://localhost:5000/about -> about us page
3. http://localhost:5000/contact -> contact us page
4. http://localhost:5000/blog/8-experiments-in-motivation -> 8 experiments in motivation blog post
5. http://localhost:5000/blog/a-mindful-shift-of-focus -> A Mindful Shift of Focus blog post
6. http://localhost:5000/blog/how-to-develop-an-awesome-sense-of-direction -> How to Develop an Awesome Sense of 
Direction blog post
7. http://localhost:5000/blog/training-to-be-a-good-writer -> Training to Be a Good Writer blog post
8. http://localhost:5000/blog/what-productivity-systems-wont-solve -> What Productivity Systems Won't Solve blog post

### Power your contact form to send a real email to yourself
In this assignment you are going to enable the contact form that you created in assignment 1 and have it send you an 
actual email. You will do this by having your server send an HTTP POST request to an external API powered by 
[Mailgun](http://www.mailgun.com). 

You will have to create a free account at [Mailgun](https://signup.mailgun.com/new/signup) and check the documentation 
to determine how you can send a POST request to Mailgun in order to send an email. Here's the reference for the API and 
how to use it: [Mailgun API Referefence](https://documentation.mailgun.com/api-sending.html#sending).

**Note:** this must be implemented by using the [requests](http://docs.python-requests.org/en/master/) Python module that 
is already included in this project. You are not allowed to find another module that integrates Mailgun with Flask

**Note:** for the free tier of mailgun you can send emails to the email address you have registered. Be sure to test sending emails to the email address where you created an account

**Note:** your integration with Mailgun needs to be externally configruable. This means that you cannot add your username,
password, nor recipient directly into the code. It is a security risk to check in passwords directly into code. You must use environment variables in order to achieve this result.

Please use the following environment variables to retrieve from your server the followign information to send an email externally:
- INFO253_MAILGUN_USER -> your username ("api")
- INFO253_MAILGUN_PASSWORD -> your password (your api key)
- INFO253_MAILGUN_FROM_EMAIL -> the email where you are sending this email from. You can use the mailgun provided one, or any email you choose
- INFO253_MAILGUN_TO_EMAIL -> the email where you are sending this email to
- INFO253_MAILGUN_DOMAIN -> your sandbox domain that mailgun assigned to you when you signed up. Should look something like this: sandbox9d95d40e03da4f6b949e22a5b6259f26.mailgun.org

Before you run your server to test, be sure to run the following commands to set your environment variables in your vagrant box:

- export INFO253_MAILGUN_USER="api"
- export INFO253_MAILGUN_PASSWORD=*"[your api key]"*
- export INFO253_MAILGUN_FROM_EMAIL=*"[your from email address]"*
- export INFO253_MAILGUN_TO_EMAIL=*"[the email address you are sending this email to]"*
- export INFO253_MAILGUN_DOMAIN=*"[your mailgun sandbox domain]"*

Executing the above commands will ensure that these variables are avaiable to your flask application when it is loaded. If you are curious if you did it right, run the following command:

```echo $INFO253_MAILGUN_USER```

To see if the INFO253_MAILGUN_USER environment variable was properly set.

### Here are the requirements for the contact form:

Your contact form should send an email to your own email with the following information:
1. Name
2. Subject
4. Message
5. Your contact form should still run the same JavaScript validations that you did in assignment 1. It should not send 
6 request the server unless all fields are filled out.
7. Your contact form should send a POST request to the server (not a GET request)
8. Your contact form should display the name of the person filling out the contact form on successful submission of the 
form. For example, after someone successfully submits the contact form named Kate, the message should say "Hi Kate, your 
message has been sent".

### Ensure that your CSS, JavaScript, and images are loading correctly

When moving HTML, CSS, and JavaScript to a web server, there may be issues with ensuring that all of those resources are 
being accessed properly

1. Ensure that your web page still looks the same as it did in assignment 1 and that your JavaScript is still functional

### Add a LEARNINGS.md file at the root of your repository answering the following questions:

 1. What is the function of the following technologies in your assignment:
    1. HTML
    2. CSS
    3. JavaScript
    4. Python
    5. Flask
    6. HTTP
    7. GET and POST requests
 2. How does HTML, CSS, and JavaScript work together in the browser for this assignment?
 3. How does Python and Flask work together in the server for this assignment?
 4. List all of the possible GET and POST requests that your server returns a response for and describes what happens for each GET and POST request

## Extra Credit
1. Add an email field to your contact form and add that information along with your name/subject/message
2. Add the current weather for Berkeley, CA to each of the five blog posts. You will need to use AJAX to accomplish this. You have freedom where this data can be placed
 1. **NOTE: This must be done using plain JavaScript. To recieve full credit you cannot include an external library**
 2. You will need to sign up for an account at [OpenWeatherMap](https://openweathermap.org) and [get an API key](http://openweathermap.org/appid)
 3. Next you will need to look at [the documentation](http://openweathermap.org/current) to get the weather for Berkeley, CA
 4. Modify your website to contact OpenWeatherMap to get the latest weather from Berkeley. This must be done on the front end/the browser, so you must use JavaScript that is being run on your browser (think ```<script src="js/script.js"></script>```)
 5. Display it on each of the five blog posts
 
