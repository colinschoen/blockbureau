[![Build Status](https://travis-ci.org/colinschoen/blockbureau.svg?branch=master)](https://travis-ci.org/colinschoen/blockbureau)
[![Heroku App Status](http://heroku-shields.herokuapp.com/blockbureau)](https://blockbureau.herokuapp.com)

Deployment
------------
All pushes to the `master` branch trigger Travis to run all tests found in 
the `app/tests` directory. If all tests pass then the current build will be
deployed to `Heroku` and accessible momentarily at 
[blockbureau.herokuapp.com](https://blockbureau.herokuapp.com)

Local Server
------------
To run the server locally:

```bash
$ source env/bin/activate # for virtualenv
$ pip install -r requirements.txt  # to install libraries
$ python3 manage.py server # to start the local development web server
```

An HTTPS development server can also be started when a cert.pem and key.pem
file are available. These two files should be located in the root repo directory.
To generate them run

```bash
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365
```

The HTTPS development server can then be started with the following command

```bash
$ python3 manage.py server-ssl
```

Finally, point yout web browser to `http://localhost:5000`


Development: Setting up
----------

1. Install [Python 3.6 or above](https://www.python.org/downloads/) and
   [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html)
2. Clone this repository:

        git clone git@github.com:colinschoen/dokku-mysql-backup.git

    and change directories into the repository.

3. Create a virtualenv:

        virtualenv -p python3 env/

4. Activate the virtualenv:

        source env/bin/activate

5. Install all dependencies:

        pip install -r requirements.txt

> You only have to run through the setup process once. However, you **must run
> `source env/bin/activate` every time you work in the repo.**
