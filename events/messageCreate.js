const { prefix } = require("../config.json");
module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    if (message.content.startsWith(prefix) == false) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if ( command === undefined) return;
    command.execute(message, args);
  });
};
