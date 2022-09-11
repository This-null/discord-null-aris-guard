// Util
const fs = require("fs");
const { whitelist } = require("../database/schemas")

// Slash Commands
const slash = require("../util/slash");


module.exports = {
  event: "ready",
  oneTime: true,
  ws: false,
  run: async (client) => {
    const commandFiles = fs
      .readdirSync("./src/commands")
      .filter((file) => file.endsWith(".js"));

    let commandsArray = [];
    commandFiles.forEach((file) => {
      const command = require(`../commands/${file}`);
      client.commands.set(command.data.name, command);

      commandsArray.push(command);
    });

    const finalArray = commandsArray.map((e) => e.data.toJSON());
    slash.register(client.user.id, finalArray);

    console.log(`${client.user.tag}, başarıyla giriş yaptım.`);



    let wht = await whitelist.findOne({
      guildID: settings.guild.id
    })
    if (!wht) {
      await whitelist.findOneAndUpdate({
        guildID: settings.guild.id
      },
        {
          $push: { full: settings.bot.owner }
        })
    } else {
      if (!wht.full?.includes(settings.bot.owner)) {
        await whitelist.findOneAndUpdate({
          guildID: settings.guild.id
        },
          {
            $push: { full: settings.bot.owner }
          })
      } else return
    }
  },
};

