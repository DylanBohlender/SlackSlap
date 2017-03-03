#1) Create a Node.js app on Heroku with your preferred app name.

#2) In Slack, create a new Slash Command.

Go to "Apps & Integrations," "Manage," "Custom Integrations," "Slash Commands," and "Add Configuration."

Name the command "/slap" and set the URL to the URL of your Heroku app, but with a "/slap" on the end. You can customize the name and icon; but that will be overridden by settings in the Node app anyway so it's not necessary. 

Check the "Show this command in the autocomplete list" box, and add the text `Slap a user with style`. For the "Usage hint," add the text `@user [slaptype]`. 

Save the integration.

#3) In Slack, create a new Incoming WebHook.

Go to "Apps & Integrations," "Manage," "Custom Integrations," "Incoming WebHooks," and "Add Configuration."

Pick any channel for the integration (it will be able to post in all channels anyway, but Slack requires that this be set). You can customize the name and icon; but that will be overridden by settings in the Node app anyway so it's not necessary.

Save the settings.

#4) Clone the repository to your local filesystem.

Use `git clone https://github.com/DylanBohlender/SlackSlap.git` to grab the repo locally.

Enter the repository with `cd slackslap`.

Log in to the Heroku CLI with `heroku login` (install the Heroku CLI if you haven't before this point).

Hook Heroku up to your git repository with `heroku git:remote -a yourherokuappname`.

#5) Fill in your instance-specific values and commit them.

Edit app.js and add string values for "herokuInstanceURL" and "exports.slackWebhookPath" that match your Heroku app's root URL and your Slack Incoming WebHook's URL, respectively.

Save and `git commit` your changes to the app.js file.

#6) Deploy the repository to Heroku.

Use `heroku git:remote -a yourherokuappnamehere` to set the alias for 'heroku' in git.

Run `git push heroku master` to auto-deploy the code to Heroku.

#7) Enjoy!

**NOTE:** This is heavily inspired by "Slack Slash Commands as a Service" by danielsamuels - check his site out! https://sscaas.eu/

**NOTE:** Inspiration was also drawn from "Getting Started with Slack Bots" by Taylor Brennan - check out that tutorial as well! https://www.sitepoint.com/getting-started-slack-bots/
