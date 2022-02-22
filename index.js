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

  var arrayOfStatus = [
    `${client.users.cache.size} users`,
    `${client.guilds.cache.size} Servers`,
    `${client.channels.cache.size} Channels`,
    `!help for commands`,
  ];
  setInterval(() => {
    var arrayOfStatus = [
      `${client.users.cache.size} users`,
      `Covid 19 Tracker🦠`,
      `${client.guilds.cache.size} Servers!!`,
    ];
  }, 3000);

  let index = 1;
  setInterval(() => {
    if (index === arrayOfStatus.length) index = 0;
    const status = arrayOfStatus[index];
    client.user.setActivity(status);
    index++;
  }, 40000);

  console.log(`logged in as ${client.user.username} BOT ✅`);
});

client.login(token);
