const { Telegraf } = require("telegraf");
const sqlite3 = require("sqlite3").verbose();

// إنشاء اتصال بقاعدة البيانات SQLite3
const db = new sqlite3.Database("./students.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the students database.");
});

// إنشاء بوت تليغرام
const bot = new Telegraf("6216799068:AAGCnZ2zPUvq93AeZbxElpPYqgsOx56oaNQ");

// أمر للحصول على درجة الطالب
bot.command("/grade", (ctx) => {
  const name = ctx.message.text.split(" ")[1];
  if (name) {
    db.get(`SELECT * FROM students WHERE name = ?`, [name], (err, row) => {
      if (err) {
        console.error(err.message);
        ctx.reply("حدث خطأ أثناء البحث عن درجة الطالب.");
      } else if (row) {
        ctx.reply(`درجة الطالب ${row.name} هي ${row.mark}.`);
      } else {
        ctx.reply(`لا يوجد طالب يحمل الاسم ${name}.`);
      }
    });
  } else {
    ctx.reply("يرجى إدخال اسم الطالب.");
  }
});

// تشغيل البوت
bot.launch();
