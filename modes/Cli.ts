import chalk from "chalk";
import {select, isCancel} from "@clack/prompts";
import { runAgentMode } from "./agent/orcastratior";
import { runAskMode } from "./ask/orcastrator";
import { runPlanMode } from "./plan/orcastrator";

export async function runCliMode() {
    while (true) {
        const mode = await select({
            message: "Choose CLI sub-mode",
            options: [
                { value: "agent", label: "Agent Mode" },
                { value: "plan", label: "Plan Mode" },
                { value: "ask", label: "Ask Mode" },
                { value: "back", label: "← Back to main menu" },
            ],
        });

        if(isCancel(mode) || mode === "back") return;

        if(mode === "agent"){
            await runAgentMode();
        }
        if(mode === "plan"){
            await runPlanMode();
        }
        if(mode === "ask"){
            await runAskMode();
        }
        

        if (!["agent", "plan", "ask"].includes(mode)) {
            console.log(chalk.red("Invalid mode selected. Please choose again."));
        }
    }
}
