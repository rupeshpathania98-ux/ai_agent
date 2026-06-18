#!/usr/bin/env bun

import { Command } from 'commander';
// 1. Correct the import to fetch runWakeup
import { runWakeup } from './tui/wakeup.js'; 

const program = new Command();
program
    .name("raka")
    .description("A CLI tool to interact with Raka Se Bate API")
    .version("1.0.0"); 

program
    .command("wake up")
    .description("Wake up Raka and pick cli or telegram")
    .action(async () => {
        // 2. Call the imported runWakeup function
        await runWakeup();
    });

await program.parseAsync(process.argv);