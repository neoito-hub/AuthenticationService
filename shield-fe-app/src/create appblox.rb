create appblox
login to registry
get the created appblox detail page
click on deploy 
go to app create page
collect app name, app url, github if needed(next sprint), default env (typeahead) (populate prod for deafult env)
click next to db provision page collect ram and cpu requirement, 
provision rds and show the connect params
now the db is assigned to the default env created
go to my apps page, we should be able to see the app created in the list
take the app details, we should be able to see the functions and db listing for default env

in the function listing there will be a dropdown to choose the env, on choosing one will show the 
  fn bloxes for that env

  so when you create app for the first time, all the fn dependency in the appblox.config.json will be listed here

  appblox.config.json can be different for each env

  the api call to get the appblox.config.json and set the same should accept env param as well

do blox provision add <appid> to get the app id, name, all the env names and ids to the local machine
now when you do blox deploy --env=<name> from cli, bloxes will be pushed to corresponding env s3 storage
then -> blox apply deploy --env=<name>-> will trigger hosting of the new deployment (later it can be another s3 trigger)
   fn bloxes will be downloaded from the corresponding env(based on appblox.config.json)
   fn bloxes will be hosted in the vm/micro vm based on the strategy we have
   fn bloxes will be stiteched together with a gateway
   should be able to ping from the corresponding container domain
   right env vars should be applied while hosting so that connection to right db is establised

   ui bloxes are already built from the edge devices
   its already in s3
   research on making them available via s3 +cloudfront(instead of amplify)
   research on dns adding dns configs in route53 on deployment for s3 frontend and vm backend

   push the live urls of the ui bloxes and fn bloxes to app registry
   visiting the live url of container should show the app

