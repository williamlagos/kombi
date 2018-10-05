Wait! But the twelve factor said you're not supposed to do that!
---
Well, probably not. Keep in mind that it's not the bible. And the bible is not necessairly to be followed. Having multiple envrionment files on the same repository it's not that big of a deal anyways: Just keed in mind that only the proper file will be shipped with the application - based on the `process.env.env` or "env" parameter (e.g.: `npm run socket --env=dev`). 
For more information, check the .bin/predeploy/set-env/index.js file ;)