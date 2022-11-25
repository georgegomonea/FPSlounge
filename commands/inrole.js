const {
    SlashCommandBuilder
} = require('@discordjs/builders');

const {
    MessageEmbed, 
} = require('discord.js');

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

        let namelist;
        
            switch (interaction.options.getSubcommand()) {
                case 'apex':
                namelist = await getNames(guild, ApexCoach);
                    
                    
                    break;
                case 'valorant':
                  await getNames(guild, ValCoach);
    
                    break;
                case 'warzone':
                    
                namelist = await getNames(guild, WzCoach);

                    break;
                case 'fortnite':
                    getNames(guild, FnCoach);
    
                    break;
            }
        

            let list = cache.get(WzCoach);

            console.log(list);
            



            
        function getNames(guild, role) {
            
           return new Promise(resolve => {
            guild.members.fetch().then(members =>
                {
                    let names = [];
                    
                    members.forEach(member =>
                    {
                    
                        if(member._roles == role) {
    
                            names.push(member.user.username);
                   
                        } 
                                                      
                    });
    
                    cache.set(role, names);  
                    
                    return names;
                    
                }).then(names => {
                    

                    if (names.length == 0) {
                        names = 'no one found';
                    }

                    resolve(names);
                });
           })
        };
    } 
};








    