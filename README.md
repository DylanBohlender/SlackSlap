#1) Create a Node.js app on Heroku with your preferred app name.

#2) In Slack, create a new Slash Command.

Go to "Apps & Integrations," "Manage," "Custom Integrations," "Slash Commands," and "Add Configuration." Name the command "/slap" and set the URL to the URL of your Heroku app, but with a "/slap" on the end. You can customize the name and icon; but that will be overridden by settings in the Node app anyway so it's not necessary. Check the "Show this command in the autocomplete list" box, and add the text `Slap a user with style`. For the "Usage hint," add the text `@user [slaptype]`. Save the integration.

#3) In Slack, create a new Incoming WebHook.

Go to "Apps & Integrations," "Manage," "Custom Integrations," "Incoming WebHooks," and "Add Configuration." Pick any channel for the integration (it will be able to post in all channels anyway, but Slack requires that this be set). You can customize the name and icon; but that will be overridden by settings in the Node app anyway so it's not necessary. Save the settings.

#4) Clone the repository to your local filesystem.

Run `npm install` in the repository directory - the one with package.json.

#5) Fill in and commit values for "herokuInstanceURL" and "exports.slackWebhookPath" in the app.js file.

#6) Deploy the repository to Heroku.

*NOTE:* This is heavily inspired by "Slack Slash Commands as a Service" by danielsamuels - check his site out! https://sscaas.eu/

*NOTE:* Inspiration was also drawn from "Getting Started with Slack Bots" by Taylor Brennan - check out that tutorial as well! https://www.sitepoint.com/getting-started-slack-bots/
