# Readme for backend
This is the backend of the project. It is a RESTful API that provides the frontend with the data it needs. It is written in Python using the Django framework.
## Setup
To run the backend, you need to have Python 3.11 installed. You can install it from the [official website](https://www.python.org/downloads/).

After you have installed Python, you need to install the dependencies. You can do this by running the following command in the root directory of the project:
```bash
pip install -r requirements.txt
```
Also define a .env file in the root directory of the project with the following content:
```bash
EMAIL_HOST_USER=your_email
EMAIL_HOST_PASSWORD=your_password
```
**Note:** Replace `your_email` and `your_password` with your email and password. This email will be used to send emails to users when they register or reset their password.
**Important:** The password should be an app password generated from your email account. You can find out how to generate an app password for your email account by searching for it on the internet.


After you have installed the dependencies, you could run migrations for the database by running the following command:
```bash
python manage.py makemigrations
python manage.py migrate
```
This will create the database and the tables needed for the project.
if there is issue with makemigrations, you can run the following command:
```bash
python manage.py makemigrations app
```
if you want to create a superuser, you can do so by running the following command:
```bash
python manage.py createsuperuser
```
Finally, you can run the backend by running the following command:
```bash
python manage.py runserver
```

The backend will be running on `http://localhost:8000/`.

## API
The backend provides the following endpoints:
