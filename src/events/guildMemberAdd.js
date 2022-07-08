const Discord =  require("discord.js")
const moment = require("moment")
const channels = require("../configs/channels.json");
const guilds = require("../configs/guild.json");
const role = require("../configs/roles.json")
module.exports = async (member) => {
  member.roles.add(role.unregisterrole)
  
  let odalar = guilds.odalar
  let sesodaları = odalar[Math.floor(Math.random() * odalar.length)]
  let hoşgeldinKanal = member.guild.channels.cache.get(channels.hgkanal) 
  let memberGün = moment(member.user.createdAt).format("DD");
  let memberTarih = moment(member.user.createdAt).format("YYYY HH:mm:ss");
  let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");
    if(hoşgeldinKanal) hoşgeldinKanal.send(`${member.guild.name}'e Hoş geldin ${member} biz de seni bekliyorduk. 
Seninle birlikte sunucumuz **${member.guild.memberCount}** üye sayısına ulaştı.

Hesabın **${memberGün} ${memberAylar} ${memberTarih}** tarihinde **`  + moment(member.user.createdTimestamp).fromNow() + `** oluşturulmuş!
<#${sesodaları}> Kanalında kayıt olabilirsin. Kayıt işleminden sonra <#${channels.kurallar}> kanalını okumayı unutma.

Tagımızı alarak veya takviye basarak bize destek olabilirsin!
Tagımız ${guilds.tag}. Şimdiden iyi eğlenceler! :tada: :tada: :tada:`)


}

module.exports.conf = {
    name: "guildMemberAdd",
  };