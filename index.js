const Discord = require('discord.js'),
      Bot = new Discord.Client(),
      Config = require('./config.json')

Bot.login(Config.Token)
Prefix = Config.Prefix

Bot.on("ready", () => {
  console.log(`${Bot.user.username} is online`)
})

Bot.on("message", message => {

  function ChangeColor() {
    Bot.guilds.forEach(arole => {
      var role =arole.roles.find('name', Config.RainbowRole)
      if (role) {
        role.edit({color : "RANDOM"})
      }
    })
  }

  function ChangeStatus() {
    let activityTypes = Config.StatusType
    const activities_list = Config.StatusInformation
    let randomType = activityTypes[Math.floor((Math.random()*activityTypes.length))]
    const randomName = Math.floor(Math.random() * (activities_list.length - 1) + 1)
    Bot.user.setActivity(activities_list[randomName],{type: randomType })
  }

 if (message.content.toLowerCase().startsWith(Prefix + ' start')) {
   if(message.member.roles.find("name", Config.AllowedRole)) {
     Color = setInterval(ChangeColor, Config.ColorTime)
     Status = setInterval(ChangeStatus, Config.StatusTime)
     message.channel.send(Config.ChangeColorMessage)
   }
   else {
     message.channel.send(Config.DeniedAccessMessage)
   }
 } else if (message.content.toLowerCase().startsWith(Prefix + ' stop')) {
   if(message.member.roles.find("name", Config.AllowedRole)) {
   clearInterval(Color)
   clearInterval(Status)
   message.channel.send(Config.StopMessage)
 } else {
   message.channel.send(Config.DeniedAccessMessage)
 }
}})
