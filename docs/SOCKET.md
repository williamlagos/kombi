#### 📡 Socket Server (backend/socket) 
- Need realtime integrations? We've got you!
- That's why we created our lightweight socket server. Its main and only purpose is to create a socket bridge between the applications (server, client and landing page).
- To do that, the Socket Server receives the socket.io events and retransmits them to the other applications.
    ##### So, why to create a whole application just for that?
    - Many PaaS services enable only one port per application (usually the 8080).
    - In order to freely change the PaaS if needed, we decide to turn our Socket Server into an standalone application.
    ##### What about the folders?
    - Glad you've asked! The Socket Server folder structure is actually pretty lean:
    ```
        . (backend/socket)
        ├── .bin/        -- Socket server specific scripts
        ├── .env/        -- Environment variables
        ├── .mars/       -- Mars configuration files
        ├── app.js       -- Socket Server initialization file
        └──  ...          -- Many standard config files
    ```

##### 📡 Running the Socket Server
* Open the terminal or command prompt of your choice and execute:
`$ npm run socket --env=[ENVIRONMENT_OF_YOUR_CHOICE]`