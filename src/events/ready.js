const { joinVoiceChannel } = require('@discordjs/voice');
module.exports = async () => {
var guildId = "973183747308552222"
let guild = client.guilds.cache.get(guildId);
if(guild) guild.members.fetch().then(fetched=> { })
console.log("Başaraıyla Üyeler Fetchlendi")
const VoiceChannel = client.channels.cache.get("992037001102643220");
joinVoiceChannel({
  channelId: VoiceChannel.id,
  guildId: VoiceChannel.guild.id,
  adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
  selfDeaf: true
});
console.log("Başarıyla Sese Giriş Yaptım")
client.user.setPresence({ activities: [{ type: "STREAMING", url: "https://www.twitch.tv/adonciai", name: "Adoncia ❤️ Safecode" }]})
}
module.exports.conf = {
    name: "ready",
  };
  
