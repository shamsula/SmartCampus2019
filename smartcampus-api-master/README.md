# API Specification
See [API proposal](api-proposal) for the most up to date API specs

## Table of Contents
  * [Authentication Header](#authentication-header)
- [JSON Responses](#json-responses)
  * [User](#user)
  * [Event](#event)
  * [Multiple Events](#multiple-events)
  * [Errors and Status Codes](#errors-and-status-codes)
- [Endpoints](#endpoints)
  * [Login](#login)
  * [Registration](#registration)
  * [Get Current User](#get-current-user)
  * [Get Event Feed](#get-event-feed)
  * [Get Event](#get-event)
  * [Delete Event](#delete-event)
  * [Create an Event](#create-an-event)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

## Authentication Header
For routes requiring authentication, use the following header:

```
Authorization: Bearer <token>
```

## JSON Responses

Objects returned by API. Check out http://jsonapi.org/format/ for standards on JSON responses

### User
```JSON
{
    "user": {
        "id": 1,
        "username": "TestUser",
        "email": "user@test.ca",
        "created_at": "2018-04-22 08:07:24",
        "updated_at": "2018-04-22 08:07:24",
        "token": "xxx.yyy.zzz"
    }
}
```

### Event
```JSON
{
    "event": {
        "id": 1,
        "title": "Voluptatum ducimus quia nostrum ea nihil qui autem nisi.",
        "time": "2018-05-14 23:10:53",
        "location": "4752 Savannah Curve Apt. 031\nPort Effiemouth, NM 53122",
        "link": "http://www.carroll.info/",
        "body": "Ducimus ut iste deleniti. Nesciunt sunt sapiente et quidem voluptatem reiciendis reprehenderit.",
        "created_at": "2018-04-06 23:10:53",
        "updated_at": "2018-04-06 23:10:53",
        "author": {
            "id": 1,
            "username": "TestUser",
            "email": "test@test.ca"
        }
    }
}
```

### Multiple Events
```JSON
{
    "events": [
        {
            "id": 1,
            "title": "Voluptatum ducimus quia nostrum ea nihil qui autem nisi.",
            "time": "2018-05-14 23:10:53",
            "location": "4752 Savannah Curve Apt. 031\nPort Effiemouth, NM 53122",
            "link": "http://www.carroll.info/",
            "body": "Ducimus ut iste deleniti. Nesciunt sunt sapiente et quidem voluptatem reiciendis reprehenderit.",
            "created_at": "2018-04-06 23:10:53",
            "updated_at": "2018-04-06 23:10:53",
            "author": {
                "id": 1,
                "username": "TestUser",
                "email": "test@test.ca"
            }
        },
        {
            "id": 46,
            "title": "Numquam praesentium rerum perspiciatis placeat pariatur commodi fuga.",
            "time": "2018-05-20 19:31:02",
            "location": "32592 Wuckert Plaza\nHoppehaven, LA 66943-2996",
            "link": "http://www.prosacco.info/",
            "body": "Doloribus ipsa fugiat saepe et dolorem qui ab dolor. Quae quis repellat adipisci qui.",
            "created_at": "2018-03-27 00:31:02",
            "updated_at": "2018-03-27 00:31:02",
            "author": {
                "id": 2,
                "username": "TestUser2",
                "email": "test2@test.com"
            }
        },
    ]
}
```

### Errors and Status Codes

Form of JSON response:
```JSON
{
  "error": {
    "message": "<error message>"
  }
}
```

**Error status codes:**

| Status Code   | Meaning                                                       |
| ------------- | ------------------------------------------------------------- |
| 401           | Unauthorized - Requires authentication                        |
| 403           | Forbidden - User doesn't have permission                      |
| 404           | Not found - server can't find resource. Usually bad api call. |
| 422           | Validation error - problem with request body                  |

## Endpoints

### Login
`POST /api/user/login`

Example request body:
```JSON
{
  "user":{
    "email": "test@test.ca",
    "password": "mypassword1234"
  }
}
```
Returns a [User](#user)

### Registration
`POST /api/user/register`

Example request body:
```JSON
{
  "user":{
    "username": "TestUser",
    "email": "test@test.ca",
    "password": "mypassword1234"
  }
}
```
Returns a [User](#user)

### Get Current User
`GET /api/user`

[Authentication](#authentication-header) required, returns current [User](#user)

### Get Event Feed
`GET /api/events`

Returns [Multiple Events](#multiple-events)

### Get Event
`GET /api/events/{id}`

Returns [Event](#event)

### Delete Event
`DELETE /api/events/{id}`

[Authentication](#authentication-header) required.

Success Response:
```JSON
{
    "message": "delete_successful"
}
```

### Create an Event
`POST /api/events`

Example request body:
```JSON
{
    "event": {
        "title": "Test Event",
        "time": "2018-05-25 14:39:49",
        "location": "Erie hall",
        "link": "http://event-url.com/",
        "body": "An event to meet and hang out"
    }
}
```
[Authentication](#authentication-header) required, returns [Event](#event)

# API Proposal 
Subject to change

## API routes

| Endpoint                         | HTTP Verb | Description                                           | Auth? | Response          | Roadmap | 
|----------------------------------|-----------|-------------------------------------------------------|-------|-------------------|---------| 
| /api/user/login                  | POST      | Login                                                 | No    | Auth              | v1      | 
| /api/user                        | GET       | Get current user                                      | Yes   | User              | v1      | 
| /api/user                        | PUT       | Update current user                                   | Yes   | User              | v3      | 
| /api/user                        | DELETE    | Delete current user                                   | Yes   | None              | v3      | 
| /api/events                      | GET       | "Get list of events, sorted by most recently posted." | No    | Multiple events   | v1      | 
| /api/events/{id}                  | GET       | Get an event                                          | No    | Event             | v1      | 
| /api/events/{id}                  | POST      | Create an event                                       | Yes   | Event             | v1      | 
| /api/events/{id}                  | PUT       | Update an event                                       | Yes   | Event             | v2      | 
| /api/events/{id}                  | DELETE    | Delete an event                                       | Yes   | None              | v1      | 
| /api/user/{id}                   | GET       | Get user profile                                      | No    | User              | v2      | 
| /api/user/{id}/friend            | PUT       | Friend user                                           | Yes   | User              | v2      | 
| /api/user/{id}/friend            | DELETE    | Unfriend user                                         | Yes   | User              | v2      | 
| /api/events?=                    | GET       | Parameters for sorting/filtering                      | No    | Multiple events   | v2      | 
| /api/event/{id}/comment          | POST      | Create a comment for event                            | Yes   | Comment           | v2      | 
| /api/event/{id}/like             | PUT       | Like an event                                         | Yes   | Event             | v2      | 
| /api/event/{id}/like             | DELETE    | Unlike an event                                       | Yes   | Event             | v2      | 
| /api/event/{id}/attend           | PUT       | Attend an event                                       | Yes   | Event             | v2      | 
| /api/event/{id}/attend           | DELETE    | Unattend an event                                     | Yes   | Event             | v2      | 
| /api/friends                     | GET       | Get list of friends                                   | Yes   | Multiple users    | v3      | 
| /api/comment/{id}          | PUT      | Update a comment                            | Yes   | Comment           | v3      | 
| /api/comment/{id}          | DELETE    | Delete a comment                            | Yes   | Comment           | v2      | 
| /api/comment/{id}/like     | POST      | Like a comment                            | Yes   | Comment           | v4      | 
| /api/comment/{id}/comment  | POST      | Reply to a comment                            | Yes   | Comment           | v4      | 

## JSON Responses

Make sure you set header to `Accept: application/json` when expecting a JSON response

### Auth
```
{ 
    "token" : "KJ43K4L4K34J2L3K4N"
}
```
 
### User
```
{ 
    "user" : 
    {
        "username" : "Zach",
        "email" : "zach@smartcampus.com",
        "image" : "/path/to/image.jpg"
    }
}
```

### Multiple Users
```
{ 
    "users" : [{
        "<user profile objects>"
    }]
}
```

### Comment
```
{
    "comment" :
    {
        "id" : "1",
        "createdAt": "2016-02-18T03:22:56.637Z",
        "updatedAt": "2016-02-18T03:22:56.637Z",
        "author" : {
            "username" : "Zach",
            "email" : "zach@smartcampus.com",
            "image" : "/path/to/image.jpg"
        },
        "body" : "Blah blah blah",
        "likes" : [
            {multiple user objects}
        ],
        "comments" : [
            {multiple comment objects}
        ],    
    }
}
```

### Event
```
{
    "event" :
    {
        "id" : "1",
        "createdAt": "2016-02-18T03:22:56.637Z",
        "updatedAt": "2016-02-18T03:22:56.637Z",
        "author" : {
            "username" : "Zach",
            "email" : "zach@smartcampus.com",
            "image" : "/path/to/image.jpg"
        },
        "date" : "2016-02-24",
        "time" : "16:45",
        "location" : "Erie Hall",
        "body" : "Blah blah blah",
        "link" : "http://myevent.com/",
        "likes" : [
            {multiple user objects}
        ],
        "comments" : [
            {multiple comment objects}
        ],
        "attendees" : [
            {multiple user objects}
        ],
        "tags" : ["School event", "Free"]
    }
}
```
 
### Multiple events
```
{
    "events" : [{
        "<event objects>"
    }]
}
```

# Database

We are using a NoSQL graph database called [Neo4J](https://neo4j.com/) to store data. Graphs are a natural way to express social networks.

# Initialization

You can use a local instance, remote instance, or both:

### Local instance

[Install Neo4j Desktop](https://neo4j.com/download/)

Add a new graph, and start it. The bolt server should default to localhost:7687, but you may need to update .env (root of project) with your username/password.

**NOTE**: Neo4j Desktop provides Enterprise edition for free, so we can set `NEO4J_ENTERPRISE=true`. Careful though, CI testing (and most likely production) will happen on the Community edition where constraints such as EXISTS are unavailable.

![overview](/uploads/c25d095c7ac774cea730d925746750fb/overview.png)
>  Overview screen of Neo4J desktop with two graphs

![browser](/uploads/99acc8cfb51ca12947e77ca74a9fec38/browser.png)
> Browser with a few nodes in database


### Remote instance

[GrapheneDB](https://graphenedb.com/) provides sandbox Neo4j databases. 
Create an account, and select a free database plan.
Name the database, and select the latest version of Neo4J Community.

Enter a username, and note the password.

Note the "bolt" address. Ex: 
`bolt://hobby-des47fqekhg4wghad.dbs.graphenedb.com:55421`

Replace the contents in .env (at root of project). For example:
```
NEO4J_PROTOCOL=bolt
NEO4J_HOST=hobby-des47fqekhg4wghad.dbs.graphenedb.com
NEO4J_PORT=55421
NEO4J_USERNAME=database-username
NEO4J_PASSWORD=h.F43dfkhjers8798.09df2hjdigf304
NEO4J_ENTERPRISE=false
```

---

Regardless of which you choose, run `npm run schema` to set up the database schema. This sets up the constraints such as required fields for nodes.
You'll probably need to drop and re-install the schema if you change it. Run `npm run schema -- drop` to drop.

You might want to repeat the process to make a "Testing" graph. Then switch between them depending on whether your developing or testing.


## Neode

We use an npm package called Neode for easily interacting with the database. It provides modeling and data access methods. You can still use Neo4J **cypher ** language by calling the cypher() command on a Neode instance. Warning: Neode is a work in progress, so there may be bugs and features lacking. See https://github.com/adam-cowley/neode

## Common cypher commands:

### Clear database

```
MATCH (n) DETACH DELETE n
```

### Delete all nodes with a given label and their relationships

```
MATCH (n:Label) DETACH DELETE n
```

### Removing specific relationships

Below example shows how to delete all 'LIKES' relationships for user with email 'test@test.ca':
```
MATCH (a:User {email: "test@test.ca"})-[r:LIKES]-() DELETE r
```

# Developer Setup

**Prerequisites**: Git (see [here](https://www.atlassian.com/git/tutorials/install-git) for help installing)

**Optional**: See ["Gitlab and SSH keys"](https://docs.gitlab.com/ee/ssh/) to set up authenticating to github via SSH instead of username/password.

Use your terminal or [Git Bash](https://gitforwindows.org/)(Windows) for running the commands in the wiki.

See [Git Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) for a guide on how to make changes and submit them.

## 1. Install NodeJS
* MacOS/Linux: Recommended to use NVM (node version manager). Download and run install script:
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```
Restart terminal, then install node and set to use LTS version by default:
```
nvm install --lts
nvm use --lts
nvm alias default lts/*
```

* Windows: Download [NodeJS](https://nodejs.org/en/download/) and install.

***

Verify that you have node and npm (node package manager):
```
$ node -v
v8.11.1
$ npm -v
5.6.0
```

## 2. Clone project
```
git clone https://gitlab.cs.uwindsor.ca/smart-campus/smartcampus-api.git
cd smartcampus-api
```

> During the remote git clone, you might receive the following error:
> ```
> fatal: unable to access 'https://gitlab.cs.uwindsor.ca/smart-campus/smartcampus-web.git/': SSL certificate problem: unable to get local issuer certificate
> ```
> If you are using Windows, you can use Windows Certificate Store (schannel) instead of SSL to authenticate by running the following:
> ```
> git config --global http.sslBackend schannel
> ```
> Another option is to disable ssl altogether (not recommended)
> ```
> git config --global http.sslVerify false
> ```

## 3. Install Neo4J
See the [Database wiki page](https://gitlab.cs.uwindsor.ca/smart-campus/smartcampus-api/wikis/Database) for a instructions on setting up a local and/or remote Neo4J instance for development.

## 4. Create a Google+ API OAuth Client ID

1. See [this guide](https://chimpgroup.com/knowledgebase/google-plus-api-keys/) on creating a client id. We need `user.profile` and `user.email` permissions. 
1. You will need to add the app to the authorized engine and redirects: `localhost:3001`
1. Place the obtained google client ID in `.env` (you might need to copy from `.env.example` if not already done)

You can [use the same client id](https://gitlab.cs.uwindsor.ca/smart-campus/smartcampus-web/wikis/Developer-Setup#3-create-a-google-api-oauth-client-id) for `smartcampus-web`

## 5. Install dependencies
```
npm install
```
You can run `npm test` now to verify everything works.

## 6. Install database schema

With the Neo4J database started, run the following to set up the schema:
```
npm run schema
```

> To drop schema (useful for when you make changes to it):
> ```
> npm run schema -- drop
> ```

## 7. Start development server
```
npm start
```
Use `ctrl-c` to stop. 

To start a server that will restart when files change:
```
npm run dev
```

## 8. Making requests

Use curl/[Postman](https://www.getpostman.com/) to make requests to localhost:3001/api

```
curl http://localhost:3001/api/events
```

If you need authorization token (JWT), you will need to generate one somehow. I find the easiest way is to start up the front end, login with my uwin account (which calls Google+ API to authenticate), and use the returned JWT (in local storage) to make requests.

Another possibility would be to call the Google+ API yourself with your google token. Then call the smart campus API (/api/user/login) with the google token to get back the JWT.

# Production

We use Windows Server 2012 with iisnode to host the app. Theres a few changes required:

Create a `web.config` in project root (iisnode does use .env):

```
<?xml version="1.0" encoding="utf-8"?>
<configuration>

  <appSettings>
    <add key="NEO4J_HOST" value="localhost" />
    <add key="NEO4J_PROTOCOL" value="bolt" />
    <add key="NEO4J_USERNAME" value="CHANGE ME" />
    <add key="NEO4J_PASSWORD" value="CHANGE ME" />
    <add key="NEO4J_PORT" value="CHANGE ME" />
    <add key="JWT_SECRET" value="CHANGE ME" />
    <add key="GOOGLE_CLIENT_ID" value="CHANGEME" />  
  </appSettings>
  
  <system.webServer>
    <iisnode node_env="production"/>
  
    <httpErrors existingResponse="PassThrough" />
    <!-- 
	  By default IIS will block requests going to the bin directory for security reasons. 
      We need to disable this since that's where Express has put the application entry point. 
	  Don't serve node_modules folder
    -->
    <security>
      <requestFiltering>
        <hiddenSegments applyToWebDAV="false">
          <remove segment="bin" />
		  <add segment="node_modules" />
        </hiddenSegments>
      </requestFiltering>
    </security>
	
    <!-- Indicates that the www file is a node.js entry point to be handled by the iisnode module -->
    <handlers>
      <add name="iisnode" path="bin/www" verb="*" modules="iisnode"/>
    </handlers>
	
    <rewrite>
      <rules>
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^bin\/www\/debug[\/]?" />
        </rule>

        <!-- 
          First we consider whether the incoming URL matches a physical file in the /public folder. 
          This means IIS will handle your static resources, and you don't have to use express.static 
		-->
		<rule name="StaticContent">
		  <action type="Rewrite" url="public{REQUEST_URI}"/>
		</rule>

        <!-- All other URLs are mapped to the node.js entry point -->
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="bin/www"/>
        </rule>
      </rules>
    </rewrite>
	
  </system.webServer>
</configuration>
```

Comment out the https redirect in app.js:

```
...
/*
  // force https in production
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
*/
...
```

# Testing 

We use [chai](https://www.npmjs.com/package/chai), [mocha](https://www.npmjs.com/package/mocha), and [supertest](https://www.npmjs.com/package/supertest) to write our automated BDD tests. Tests exercise the api endpoints and actual database code.

## Running tests

We use a script to call `mocha`. To run all tests, execute:
```
npm test
```

To run tests, and produce a code coverage report:
```
npm run coverage
```

## Writing tests

See [chai docs](https://www.chaijs.com/) and [mocha docs](https://mochajs.org/) for documentation on writing JSON Api tests.

# Home

Production version hosted at https://smartcampus.cs.uwindsor.ca/api

See side menu for project information ->

## System Architecture

### High level

![smartcampus_arch-Page-1__1_](/uploads/fdc0ba9038040df7250f5e5e0f165c9b/smartcampus_arch-Page-1__1_.png)

### Deploy Environment

The following shows the development application when smartcampus-api and smartcampus-web are started via `npm start`:

![smartcampus_arch__3_-Page-2](/uploads/cb25cb7f58a44f863e2629826552ca8b/smartcampus_arch__3_-Page-2.png)

As above, the apps are served to:
1. smartcampus-web: http://localhost:3000
1. smartcampus-api: http://localhost:3001

The production version operates the same way, except instead of using multiple ports the apps are differentiated by url:

1. smartcampus-web: https://smartcampus.cs.uwindsor.ca/
1. smartcampus-api: https://smartcampus.cs.uwindsor.ca/api

Draw.io: [smartcampus_arch__3___2_.xml](/uploads/a1469c3a96ba14696767d93378d66777/smartcampus_arch__3___2_.xml)
