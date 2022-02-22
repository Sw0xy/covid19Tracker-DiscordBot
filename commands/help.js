const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "help",
    description: "Get the help of the bot",
    execute(message, args) {
        const embed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle('COVID-19 Tracker')
        .setDescription("Covid 19 data for the world")
        .addFields(
            { name: "Command", value: "`!country <country>`", inline: true },
            { name: "Example", value: "`!country india`", inline: true },
            { name: "Description", value: "Get covid19 data of the country", inline: true },
            { name: "Command", value: "`!world`", inline: true },
            { name: "Example", value: "`!world`", inline: true },
            { name: "Description", value: "Get covid19 data of the world", inline: true },  
        )
        .setThumbnail(message.author.avatarURL())
        .setTimestamp()
        .setFooter("Covid-19 Tracker")
        message.channel.send({ embeds: [embed] });
    },
};