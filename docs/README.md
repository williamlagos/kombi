
# Mars.js Framework: Blazing Fast Prototypes!
[![Efforia](https://imgur.com/QY08kxe.png)](https://efforia.io)
## 👾 Hi there, fellow humans:
##### Meet the `Mars.js` Framework! 
Your new ally on the development journey! 
######

### ☕ Mars.js - The TLDR; 
##### What is the Mars.js Framework? 
- The Mars.js project is an all-in-one solution to rapidly prototype and deploy an universal app (Cordova, PWA, Electron: Pick your weapon!) with all its layers, such as: 
     - The Application Server (Node.js + Swagger for integration)
     - The Database (MongoDB)
     - The Socket Server (Node.js + Socket.io)
     - The Landing Page (Boostrap + Webpack + SASS)
     - And, of course, The Universal App (Angular.io + Ionic Framework + Webpack + Swagger + SASS + A Whole Lotta Awesome Stuff)

##### A bunch of apps put togheter on the same repository, so what?
- Nah, don't be like that. That's not quite it. 😉
- The framework provides services, directives and common syntax in order to facilitate the Ionic apps with MongoDB and Node.js + Express building and integration process .
- Tired of having to choose between hundreds of similar *npm packages*? Always like: *"Which should I pick: cool-package, cool-package-2, @enterprise/cool-package or coolpackage?"*. 
- Well, we are too. That's why we made Mars.js highly opiniated. You can always change the default packages, sure. But we wanted to focus more on the application features because, you know, profit and stuff. 

##### So, why we created the Mars.js Framework?  (Or "The MARS MANIFESTO")
- We wanted to created an code template that was both flexible and fast to prototype with. We once dreamt of an application ecosystem with an all-in-one philosophy. 
- A place where you could edit your database structures, update your server business logics, change the application name and colors within seconds and add some pretty images on the landing page on the fly, and still avoid the vendor lock in`*`.
`*` We all remember Parse from Facebook, don't we?
- A place where apps could be bootstraped in days and finished in a pair of months.
- A place where applications could be written once and executed everywhere.
- But by having automation scripts, shared colors and locales, integrations and all we've put into this template... Well, it just didn't felt like a template or a seed. So, we decide to create the framework with all of the working parts of the project - which lead us to this moment in time.  
- Because: long live open source technologies 💖
- And, most importantly, because we believed on the idea.
### 

### 🍼 The basics:
* Important notes before diving into Mars.js:

##### ✅ Project Prerequisites:
 * [Node.js]
 * [MongoDB](https://www.mongodb.com/download-center#community)
 * [Nodemon](https://www.npmjs.com/package/nodemon)
 * [Ionic Framework](https://ionicframework.com/getting-started)
 * An IDE of your choice`*`
 
 ###### Optional tools: 
* [Apache Cordova (For mobile native wrapping)](https://ionicframework.com/getting-started)

 `*` (VSCode or Atom are highly recommended, though)

##### 🌳 Understanding the ecosystem:
##### So: Many applications, many environments, many locales, many colors, many, many.... How do you keep it all up to date once there is a change? 
- Keeping a copy of each file on multiple applications (e.g.: Server, socket, landing page, client, etc, etc) and edit them *manually* can (and probaly will) lead to **human errors** at some point.
- That's why we created the `.mars` and `.env` folders on the root of the project. These two folders contain the project specific variables, such as the environment variables, locales, credentials, project name, contact e-mail, application bundle, landing page address and all that needs to be customized once the project is created.
- After this, we added the `npm prepare` script, which copies the proper variables to the application (read: Server, Socket, Landing or Client) before any other actions. 
- **BEWARE**: It is important to remember, though, that these files can only be edited on the root of the project, **otherwise they will be overwritten** (more on that will be discussed on the "Folder Structure" section).
###

### 📂 Folder Structure:
#### ⚛️ The core: 
- The Mars.js framework core resides in three main folders:
    - `.bin`: General automation scripts used within the development and integration process.
    - `.mars`: That's where your project information will reside. This includes the overly mentioned colors.js, locales folder, project meta information, application keys and general assets.
    - `.env`: Environment variables divided in `env.local.js`, `env.dev.js` and `env.prod.js`. Do not feel too disturbed if the ~~bible~~ 12 factor applications said you should not version your environments. The `npm prepare` script will make sure to copy and expose the right one on each build (more on the "CLI Parameters" section).
    - `docs`: A whole lot of mess and not so funny jokes, yet a great starting point to guide you on the journey.

#### The Applications: 
>> What's the point of having a badass code repo if you won't use it?
(Propably Linus Torvalds or something)

* ##### Learn more about our:
* ##### [Landing Page](docs/LANDING.md)
* ##### [Universal Apps](docs/UNIVERSAL.md)
* ##### [Backend](docs/BACKEND.md)
###

# Roadmap:
- Finish documentation.

License
----

![MIT](http://seawisphunter.com/minibuffer/api/MIT-License-transparent.png)

###### Crafted with 💖 by Efforia Labs
###### --- Fly on, you coders, et bon voyage: Bon voyage a tout le monde!

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [Node.js]: <https://nodejs.org/en/download/>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>