# SmartCampus2019
SmartCampus was an initiative by Dr. Xiaobu Yuan to bring to life a social network that allows students and falculties of University of Windsor to collaborate on creating and sharing on-campus events.
This version represents the latest iteration of SmartCampus, brought to you by Mohammed Shamsul Arefeen, Kamya Singla and Jacob Poissant. 

Note that this is just an excerpt from the team's GitLab, i.e a cloned stable, master mainline, and does not represent the latest version of the SmartCampus project. You may follow the instructions below for basic setup instructions and running the development version, but it is advised to go through the readme files in the smartcampus-web and smartcampus-api directories for further information about the respective implementation details, such as how to set up the production version. 

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
git clone https://github.com/shamsula/SmartCampus2019.git
```
```cd smartcampus-web-master``` 
or 
```cd smartcampus-api-master```

start both front-end and back-end servers using: 
```npm start```
