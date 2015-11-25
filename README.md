# GoldmanSachs

## Build locally

##### Install npm packages

Make sure you have npm installed in your path.
```shell
$  npm install
```

##### Install typescript compiler: tsc

```shell
$  npm install tsc -g
```
> This only needs to be done once; installs `tsc` command line tool into your $PATH

##### Install DefinitelyTyped package manager: tsd

```shell
$  npm install tsd -g
```
> This only needs to be done once; installs `tsd` command line tool into your $PATH.
Instead of including the whole DefinitelyTyped repository (1000+ typings) into git, whenever you need type definition for a module, do `tsd install --save MODULE_NAME` and it will write the dependency to `tsd.json`.

##### Install DefinitelyTyped typings

```shell
$  tsd install
```
> Install all typings specified in `tsd.json` into the directory `typings`. Simply include `/// <reference path='typings/tsd.d.ts'/>` at the top of *any* .ts file you need typings for and it will delegate the corresponding typing for the use of the required module.

##### run MongoDB

```shell
$  mongod
```
> Specifying MongoDB data directory is not necessary. Running `mongod` without any flags will create data files in `<root>/data/db`, just make sure you start MongoDB using `mongod` everytime.

##### Start the server:
```shell
$  npm start
```
> `npm start` automatically compiles TypeScript so you don't have to execute `tsc`

##### To run the Mocha test suite:
```shell
$  npm test
```
> `npm test` compiles TypeScript files before running `mocha` commands

## Deploy to OpenShift hosting

### First time configs

##### Install OpenShift command line interface: rhc
Install [Ruby and RubyGem](https://www.ruby-lang.org/en/downloads/) package managers in your path if you haven't already

Install [OpenShift CLI](https://developers.openshift.com/en/managing-client-tools.html) for your platform.

##### Setup OpenShift CLI
```shell
$  rhc setup
```

Use the *default* OpenShift API (just hit enter when asked about OpenShift link)

```shell
Login to openshift.redhat.com: moony.wong@hotmail.com
Password: goldmansachs
```

Generate SSH key and send the public key to OpenShift
```shell
Generate a token now? (yes|no) yes
Your public ssh key must be uploaded to the OpenShift server to access code.
Upload now? (yes|no) yes
```

##### Grab the git URL to OpenShift's git repository
```shell
$  rhc apps
```
Copy `Git URL` for `Domain: gold`, currently, it is `ssh://56387a5f7628e1e50500018d@crimes-golds.rhcloud.com/~/git/crimes.git`

##### Set up a new remote for our git repository currently hosted on GitHub:

In project's root:
```shell
$  git remote add openshift GIT_URL_FROM_ABOVE
```

##### Deploy changes to the master branch to OpenShift
**Only deploy runnable states of the application on master!**
```shell
$  git push openshift master
```
This will push (sync) the local git repo to OpenShift and start the build process. 

Wait till the build ends with `Deployment completed with status: success`

Verify deployment at http://crimes-golds.rhcloud.com/

You can view the MongoDB through:
https://crimes-golds.rhcloud.com/rockmongo/
```
username: admin
password: WIJCYsNHEZad
```
