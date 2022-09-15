const {
    SlashCommandBuilder
} = require('@discordjs/builders');

const {
    MessageEmbed, 
} = require('discord.js');
const cache = require('../src/handlers/cache');

module.exports = {
    name: "inrole",
    timeout: 5,
    data: new SlashCommandBuilder()
        .setName('inrole')
        .setDescription('Create list of coaches')
        .addSubcommand(subcommand =>
            subcommand
                .setName('apex')
                .setDescription('x'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('valorant')
                .setDescription('x'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('warzone')
                .setDescription('x'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('fortnite')
                .setDescription('x')),
        


    async execute(client, interaction, cache) {
       
        const guild = client.guilds.cache.get(interaction.guild.id);    
        
        const ApexCoach = 1003469893062099068;
        const ValCoach = 1;
        const FnCoach = 2;
        const WzCoach = 1003470192283766784;


        let namelist = new Promise((resolve, reject) => {
            switch (interaction.options.getSubcommand()) {
                case 'apex':
                    getNames(guild, ApexCoach);
                    
                    
                    break;
                case 'valorant':
                    getNames(guild, ValCoach);
    
                    break;
                case 'warzone':
                    getNames(guild, WzCoach);
                    
                    let test = cache.get(WzCoach);
                     
                    if(test != null) {
                        resolve(test);
                    } else{
                        reject('no one found');
                    }
                    
                    break;
                case 'fortnite':
                    getNames(guild, FnCoach);
    
                    break;
            }
        })

        namelist.then((message) => {
            console.log(message);
        }).catch((message) => {
            console.log(message);
        })
        




        //var checkCache = cache.get(WzCoach);

        //if(checkCache == null) {
        //    console.log('nothing');
        //} else {
       //     console.log(checkCache);
        //}

        
       

        function getNames(guild, role) {
            var names = [];
            
            guild.members.fetch().then(members =>
            {
                members.forEach(member =>
                {
                
                    if(member._roles == role) {
                        names.push(member.user.username);
            
                        cache.set(role, names);  
                                                           
                        return;
        
                    } else {
                                    
                        return;
                                
                    }
                                                                    
                });
                
                    
            });
        };
    }
};








    