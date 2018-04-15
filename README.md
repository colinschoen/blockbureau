[![Build Status](https://travis-ci.org/colinschoen/blockbureau.svg?branch=master)](https://travis-ci.org/colinschoen/blockbureau)

Local Server
------------
To run the server locally:

```bash
$ source env/bin/activate # for virtualenv
$ pip install -r requirements.txt  # to install libraries
$ python3 manage.py server # to start the local development web server
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
