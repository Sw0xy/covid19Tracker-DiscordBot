const axios = require("axios");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "world",
    description: "Get the world data",
    execute(message, args) {
        const url = "https://covid19.mathdro.id/api";
        const fetchData = () => {
            axios
                .get(`${url}`)
                .then((res) => {
                    const data = res.data;
                    const recovered = data.confirmed.value - data.deaths.value;
                    const coronaEmbed = new MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle('COVID-19 Tracker')
                    .setDescription("Covid 19 data for the world")
                    .addFields(
                        { name: "Total Cases", value: `${data.confirmed.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, inline: true },
                        { name: "Total Recovered", value: `${recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, inline: true },
                        { name: "Total Deaths", value: `${data.deaths.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, inline: true },
                        { name: "Last Update", value: `${data.lastUpdate.substring(0, 10)}` }
                    )
                    .setThumbnail(message.author.avatarURL())
                    .setTimestamp()
                    .setFooter("Covid-19 Tracker")

                    message.channel.send({ embeds: [coronaEmbed] });
                })
                .catch((err) => {
                    message.channel.send(`something went wrong`);
                });
        };
        message.channel.send("Fetching data...");
        setTimeout(() => {  
            fetchData();
        }, 1400);
    },
};