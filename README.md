# AuthenticationService
Auth Service for appblocks

Install docker on your machine.
Move to the root directory.
Run docker compose up.

While adding a new app to manage auth using shield.Create a new row in shieldApps table.
We are already seeding a new app via migrations in /shield/migrator/main.go.
Use the same migration query and replace the id and secret params while registering a new app.

We have also added a sample app to use the shield service in the docker-compose.yml(auth_shield_app_container)
A similar process can be used for integrating new apps with the shield service
