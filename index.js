// import requirements 

// test 

const {
    Client,
    Intents,
} = require('discord.js');

// starting in djs v13, we are required to specify which intents we are using in the client constructor
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
});

const dotenv = require('dotenv')
// import config IDs
dotenv.config()
const TOKEN = process.env.TOKEN

const startup = require('./src/startup');
// run this script upon starting up the bot and pass in the client
startup(client)


var cache = new Map();
const { request } = require('./src/handlers/cache')

client.on('interactionCreate', async (interaction) => {

     if (interaction.isCommand()) {

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        if (command == 'start' || command == 'setup' || command == 'inrole') {
            console.log('ran a non-baking command')
            return await command.execute(client, interaction)
        } else {

            return await request(client, interaction, cache)
        }

    }
})
client.login(TOKEN);