import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";
import { runCliMode } from "../modes/Cli";
import { runTelegramMode } from "../modes/tellegram";

const BANNER_FORT = "ANSI Shadow";
const SHADOW = chalk.hex("#76d8f0d5");
const FACE = chalk.hex("#9538f2").bold;

function printBannerWithShadow(ascii: string) {
  const bannerLines = ascii.replace(/\s+$/, '').split('\n');
  const maxLen = Math.max(...bannerLines.map((l) => l.length), 0);
  const rowWidth = maxLen + 2;

  for (const line of bannerLines) {
    console.log(SHADOW((' ' + line).padEnd(rowWidth)));
  }
  process.stdout.write(`\x1b[${bannerLines.length}A`);
  for (const line of bannerLines) {
    console.log(FACE(line.padEnd(rowWidth)));
  }
  console.log();
}

export async function runWakeup() {
    let ascii: string;
    try {
        ascii = figlet.textSync("Raka is awake.", { font: BANNER_FORT });
    } catch (error) {
        ascii = figlet.textSync("Raka is awake.");
    }
    
    // 1. Prints the banner
    printBannerWithShadow(ascii);

    // 2. Prompts for the main menu mode immediately after
    const mode = await select({
        message: "How do you want to interact with Raka?",
        options: [
            { value: "cli", label: "CLI" },
            { value: "telegram", label: "Telegram" },
            { value: "exit", label: "Exit" },
        ],
    });

    if (isCancel(mode) || mode === "exit") {
        console.log(chalk.dim("\nGoodbye!"));
        process.exit(0);
    }

    if (mode === "cli") {
        await runCliMode();
    } else if (mode === "telegram") {
        await runTelegramMode();
    }
}