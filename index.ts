import DiscordJS, { Intents, Options } from 'discord.js'
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
})

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'))

client.on('ready', () => {
    console.log('bot is ready')

    const guildId = '816709720894472215'
    const guild = client.guilds.cache.get(guildId)
    let commands

    if (guild)
        commands = guild.commands
    else
        commands = client.application?.commands

    commands?.create({
        name: 'robot',
        description: 'See a robot from the specified team and season',
        options: [
            {
                name: 'season',
                description: 'Name, year, number or span of the FTC season.',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            },

            {
                name: 'team',
                description: "The number of the team whose robot you wish to see",
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            }

        ]
    })
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if (commandName === 'robot') {
        const season = options.getString('season')!
        const teamnr = options.getNumber('team')!

        const FreightFrenzy = season == data.FreightFrenzy.number || season == data.FreightFrenzy.year || season == data.FreightFrenzy.span || season == data.FreightFrenzy.name
        const UltimateGoal = season == data.UltimateGoal.number || season == data.UltimateGoal.year || season == data.UltimateGoal.span || season ==data.UltimateGoal.name
        const Skystone = season == data.Skystone.number || season == data.Skystone.year || season == data.Skystone.span || season == data.Skystone.name
        const RoverRuckus = season == data.RoverRuckus.number || season == data.RoverRuckus.year || season == data.RoverRuckus.span || season == data.RoverRuckus.name
        const VelocityVortex = season == data.VelocityVortex.number || season == data.VelocityVortex.year || season == data.VelocityVortex.span || season == data.VelocityVortex.name

        if (FreightFrenzy) {
            interaction.reply({
                content: `Here is ${data.FreightFrenzy.team[teamnr].name}'s robot: ${data.FreightFrenzy.team[teamnr].bot}`,
                ephemeral: false,
            })
        }
        else if (UltimateGoal) {
            interaction.reply({
                content: `Here is ${data.UltimateGoal.team[teamnr].name}'s robot: ${data.UltimateGoal.team[teamnr].bot}`,
                ephemeral: false,
            })
        }
        else if (Skystone) {
            interaction.reply({
                content: `Here is ${data.Skystone.team[teamnr].name}'s robot: ${data.Skystone.team[teamnr].bot}`,
                ephemeral: false,
            })
        }
        else if (RoverRuckus) {
            interaction.reply({
                content: `Here is ${data.RoverRuckus.team[teamnr].name}'s robot: ${data.RoverRuckus.team[teamnr].bot}`,
                ephemeral: false,
            })
        }
        else if (VelocityVortex) {
            interaction.reply({
                content: `Here is ${data.VelocityVortex.team[teamnr].name}'s robot: ${data.VelocityVortex.team[teamnr].bot}`,
                ephemeral: false,
            })
        }
        else {
            interaction.reply({
                content: 'Sezonul acesta nu exist??/nu a fost ad??ugat ??nc??\nScrie numele, numarul, sau anul altui sezon',
                ephemeral: true,
            })
        }
    }
})

client.on('messageCreate', (message) => {
    if (message.content.includes('auto'))
        message.reply({
            content: 'MAC!'
        })
})

client.login(process.env.TOKEN)