const { Telegraf } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  console.error('FATAL: BOT_TOKEN غير معرف! أضفه في Variables');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);
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
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  if (req.url === '/results') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(votes));
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

bot.launch();
console.log('Bot started');
