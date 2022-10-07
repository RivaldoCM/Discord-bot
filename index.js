const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;


const { loadCommands } = require("./src/handlers/commandHandler");
const { loadEvents } = require("./src/handlers/eventHandler");

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember],
});

client.commands = new Collection();
client.config = require('./src/config.json');

client.login(client.config.token).then(() => {
    loadEvents(client);
    loadCommands(client);
});

/*
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);

    client.commands.set(command.data.name, command);
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'deu ruim', ephemeral: true });
    }
});
*/