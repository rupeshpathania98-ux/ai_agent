import { Telegraf } from "telegraf";
import chalk from "chalk";
import { WELCOME } from "./constant";
import { resolve } from "node:dns";
import { registerHandlers } from "./handlers";
import { getOwnerIds } from "./auth";


export async function runTelegramMode() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const ownerIds = getOwnerIds();

  const bot = new Telegraf(token!);
  registerHandlers(bot)

  await Promise.all(
    ownerIds.map(async (id) => {
      try {
        await bot.telegram.sendMessage(id, WELCOME, { parse_mode: "Markdown" });
        console.log(chalk.green(`Sent welcome message to Telegram owner ${id}.`));
      } catch (err) {
        console.warn(chalk.yellow(`Could not send welcome message to owner ${id}: ${(err as Error).message}. Make sure they have started a chat with the bot.`));
      }
    })
  );

  bot.launch();
  console.log(chalk.green("Telegram bot is running. Press Ctrl+C to stop.\n"));

  await new Promise<void>((resolve) => {
    const stop = () => {
      bot.stop("SIGINT");
      resolve();
    };
    process.once("SIGINT", stop);
    process.once("SIGTERM", stop);
  });
}