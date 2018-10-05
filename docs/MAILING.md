#### 📨 Mailing Server (backend/mailing) 
- Need to comunicate on the old fashion? We've got you, pal!
- That's why we created our mailing server. Its main and only purpose is to deliver e-mail messages triggered by the applications over HTTPS.
- To do that, the Realtime Server receives the requests, adds the provided information to the e-mail template with handlebars and sends them to the destinatary.
    ##### Awesome! But... Can I test the templates on prototype phase?
    - Of course! All you need to do is create a new route on the `app.js` file and provide the proper mocked data.
    ##### What about the folders?
    - There it is: The Mailling Server is packed with only the necessary stuff:
    ```
        . (backend/mailing)
        ├── .bin/        -- Mailing server specific scripts
        ├── .env/        -- Environment variables
        ├── .mars/       -- Mars configuration files
        ├── templates/   -- Handlebars templates
        |  ├── partials/ -- Handlebars partials
        ├── app.js       -- Mailling Server initialization file
        └──  ...         -- Many standard config files
    ```

##### 📨 Running the Mailing Server
* Open the terminal or command prompt of your choice and execute:
`$ npm run mailing --env=[ENVIRONMENT_OF_YOUR_CHOICE]`