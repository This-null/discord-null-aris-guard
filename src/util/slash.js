const slash = {
  register: async (clientId, commands) => {

    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v9");

    const rest = new REST({ version: "9" }).setToken(settings?.bot?.token);

    try {
      const guildId = settings.guild?.id;
      if (!isNaN(guildId)) {
        await rest
          .put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
          })
          .then(() => {
            return console.log(`Eğik çizgi komutları sunucuya yüklendi.`);
          });
      } else {
        await rest
          .put(Routes.applicationCommands(clientId), { body: commands })
          .then(() => {
            console.log(`Eğik çizgi komutları yüklendi.`);
          });
      }
    } catch (error) {
      console.log(`Eğik çizgi komutları yüklenemedi, hata: \n ${error}`);
    }
  },
};

module.exports = slash;
