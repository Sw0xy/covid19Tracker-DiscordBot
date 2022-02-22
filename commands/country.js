const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "country",
  description: "Get the country of a user",
  execute(message, args) {
    const user = message.mentions.users.first() || message.author;
    const country = args[0].toLowerCase();
    const url = "https://covid19.mathdro.id/api";
  
    const fetchData = (country) => {
      axios
        .get(`${url}/countries/${country}`)
        .then((res) => {
          const data = res.data;
          const Recovered = data.confirmed.value - data.deaths.value;
          const coronaEmbed = new MessageEmbed()
          .setColor("#0099ff")
          .setTitle('COVID-19 Tracker')
          .setDescription(`Covid 19 data for ${country.toUpperCase()}`)
          .addFields(
            { name: "Total Cases", value: `${data.confirmed.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, inline: true },
              { name: "Total Recovered", value:` ${Recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, inline: true },
              { name: "Total Deaths", value: `${data.deaths.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` , inline: true }, 
              { name: "Last Update", value: `${data.lastUpdate.substring(0, 10)}` }
          )
            .setThumbnail(user.avatarURL())
            .setTimestamp()
            .setFooter("Covid-19 Tracker")

          message.channel.send({ embeds: [coronaEmbed] });
          
        })
        .catch((err) => {
          message.channel.send(`${country} is not a valid country`);
        });
    };

    message.channel.send("Fetching data...");

    setTimeout(() => {
        fetchData(country);
        }, 1400);
    
  },
};
