const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

const CHANNEL_ID = '1393069670537367554';
const MESSAGE_ID = '1394561495253258291';
const FISHING_START_BUTTON_ID = 'fishing_game_start?script=true';
const FISHING_CATCH_BUTTON_ID = 'fishing_game_handler?script=true';

const MIN_DELAY = 60;
const MAX_DELAY = 120;

let isFishingIdle = true;

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    await clickFishingButton();
});

client.on('messageCreate', message => {
    if (message.channel.id !== CHANNEL_ID) return;
    const embed = message.embeds[0];
    if (embed?.title === '**🎣 You have cast your fishing rod...**') {
        console.log('釣竿を投げました！');
    }
});

client.on('messageUpdate', async (_oldMessage, newMessage) => {
    if (newMessage.channel.id !== CHANNEL_ID) return;
    const embed = newMessage.embeds[0];
    if (!embed) return;

    if (embed.title === '**Hurry! Something bit the bait!**' && !newMessage.components[0]?.components[0]?.disabled) {
        console.log('魚がかかりました！');
        await clickButtonOnMessage(newMessage, FISHING_CATCH_BUTTON_ID);
        console.log('魚を釣り上げました！');
    }

    if (embed.title === '**You lifted your rod!**') {
        const unixTimestamp = extractUnixTimestamp(embed.fields?.[0]?.value);
        if (isFishingIdle && unixTimestamp) {
            const now = Math.floor(Date.now() / 1000);
            const randomDelay = getRandomDelay(MIN_DELAY, MAX_DELAY);
            const delay = (unixTimestamp + randomDelay - now) * 1000;
            isFishingIdle = false;
            setTimeout(async () => {
                console.log('釣りを再開します。');
                await clickFishingButton();
            }, Math.max(delay, 0));
        }
    }
});

function extractUnixTimestamp(text) {
    const match = text?.match(/<t:(\d+):[a-zA-Z]>/);
    return match ? Number(match[1]) : null;
}

async function clickFishingButton() {
    const channel = await client.channels.fetch(CHANNEL_ID);
    const message = await channel.messages.fetch(MESSAGE_ID);
    await clickButtonOnMessage(message, FISHING_START_BUTTON_ID);
    isFishingIdle = true;
}

async function clickButtonOnMessage(message, buttonId) {
    try {
        await message.clickButton(buttonId);
    } catch (err) {
        console.error('ボタンのクリックに失敗しました:', err);
    }
}

client.login('token');