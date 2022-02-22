const { Client, Intents, Collection  } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const { token } = require("./config.json");
const fs = require("fs");
client.commands = new Collection();

client.on("ready", () => {
  const commands = fs.readdirSync("./commands/");
  commands.forEach((file) => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  });
  const events = fs
    .readdirSync("./events/")
    .filter((file) => file.endsWith(".js"));

  events.forEach((event) => {
    const executeFunc = require(`./events/${event}`);
    executeFunc(client);
  });
  client.user.setActivity("!help", { type: "WATCHING" });
  console.log(`logged in as ${client.user.username} BOT ✅`);
});

client.login(token);
