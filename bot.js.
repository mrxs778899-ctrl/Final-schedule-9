const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

const votes = {};

bot.on('web_app_data', async (ctx) => {
  try {
    const data = JSON.parse(ctx.webAppData.data);
    const { date, time } = data;
    if (!date || !time) return;
    if (!votes[date]) votes[date] = {};
    if (!votes[date][time]) votes[date][time] = 0;
    votes[date][time]++;
    await ctx.answerWebAppQuery('✅ تم تسجيل تصويتك');
  } catch (err) {
    console.error(err);
  }
});

const http = require('http');
http.createServer((req, res) => {
  if (req.url === '/results') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(votes));
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(process.env.PORT || 3000);

bot.launch();
console.log('Bot started');
