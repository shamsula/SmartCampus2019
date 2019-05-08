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
git clone https://gitlab.cs.uwindsor.ca/smart-campus/smartcampus-web.git
cd smartcampus-web
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

## 3. Create a Google+ API OAuth Client ID

1. See [this guide](https://chimpgroup.com/knowledgebase/google-plus-api-keys/) on creating a client id. We need `user.profile` and `user.email` permissions. 
1. You will need to add the app to the authorized engine and redirects: `localhost:3000`
1. Place the obtained google client ID in `.env.local` (You might need to create if non-existent)

You can [use the same client id](https://gitlab.cs.uwindsor.ca/smart-campus/smartcampus-api/wikis/Developer-Setup#4-create-a-google-api-oauth-client-id) for `smartcampus-api`

## 4. Install dependencies
```
npm install
```

You can run `CI=true npm test` after to verify everything works.

## 5. Start development server
```
npm start
```
Use `ctrl-c` to stop. 

Visit [http://localhost:3000](http://localhost:3000) to see development build. The server automatically restarts when files change.

## 6. Start the back-end server

Setup [smartcampus-api](https://gitlab.cs.uwindsor.ca/smart-campus/smartcampus-api) and [start the dev server](https://gitlab.cs.uwindsor.ca/smart-campus/smartcampus-api/wikis/Developer-Setup#6-start-development-server).

`.env` holds the URL of the back-end api, which is defaulted to port 3001 (`smartcampus-api` dev server). If you want to use something different, create an `.env.local` file to override.

# Production

We serve the built react app on Windows Server 2012, just like an ordinary php app, with the following changes:

Create `.env.production`:
```
# URL of smartcampus-api
REACT_APP_API_URL=https://smartcampus.cs.uwindsor.ca

# Google+ API OAuth ClientID. (https://console.cloud.google.com/apis)
REACT_APP_GOOGLE_CLIENT_ID=CHANGEME
```
Run `npm run build` to generate the production build.

Go to build/ directory, and add the following `web.config` file (needed for routing pages):

```
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
	<system.webServer>
		<rewrite>
			<rules>
				<rule name="ReactRouter Routes" stopProcessing="true">
					<match url=".*" />
					<conditions logicalGrouping="MatchAll">
						<add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
						<add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
						<add input="{REQUEST_URI}" pattern="^/(api)" negate="true" />
					</conditions>
					<action type="Rewrite" url="index.html" />
				</rule>
			</rules>
		</rewrite>
	</system.webServer>
</configuration>
```

Then add `<base href='https://smartcampus.cs.uwindsor.ca'/>` to `build/index.html` in the `<head>` section
