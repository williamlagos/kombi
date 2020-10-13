#### 💎 Landing Page (frontend/landing) 
- Ok, so your app is both functional and beautiful. Now what?
- It's time to make it shine: Let people know it exists!
- That's where our Landing Page application comes handy. It's fast, it's easily customizable, it's webpack based, it's landy.

##### What about the folders?
    - There it is: The Landing Page is packed with only the necessary stuff.
    ```
        . (frontend/landing)
        ├── .bin/        -- Landing Page specific scripts
        ├── .env/        -- Environment variables
        ├── .mars/       -- Mars configuration files
        ├── src/         -- Landing Page source code
        |  ├── assets/   -- You know: CSS, JS, images...
        |  ├── index.html   -- HTML main file.
        |  └── index.js     -- JavaScript main file.
        ├── app.js       -- Landing Page hosting server initialization
        ├── mars.js       -- Landing Page hosting server configuration
        └──  ...         -- Many standard config files
    ```

##### 💎 Running the Landing Page
* Open the terminal or command prompt of your choice and execute:
`$ npm run landing --env=[ENVIRONMENT_OF_YOUR_CHOICE]`