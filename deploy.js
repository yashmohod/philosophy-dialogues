/**
 * Automated build + deploy script for Philosophy Dialogues
 * --------------------------------------------------------
 * This script:
 * 1. Runs the production build
 * 2. Commits local changes
 * 3. Pushes to GitHub main branch
 * 4. Deploys via gh-pages to the live site
 */

const { execSync } = require("child_process");
const chalk = require("chalk");

function run(command) {
    console.log(chalk.cyan(`\n> ${command}`));
    execSync(command, { stdio: "inherit" });
}

try {
    console.log(chalk.green("\n🚀 Starting deployment..."));

    // Step 1: build the React app
    run("npm run build");

    // Step 2: add & commit local changes
    run('git add .');
    try {
        run('git commit -m "auto: update site and deploy"');
    } catch {
        console.log(chalk.yellow("⚠️  No new changes to commit."));
    }

    // Step 3: push to main
    run("git push origin main");

    // Step 4: deploy using gh-pages
    run("npm run deploy");

    console.log(chalk.green("\n✨ Deployment complete! Site is live at:"));
    console.log(chalk.bold("https://yashmohod.github.io/philosophy-dialogues\n"));

} catch (err) {
    console.error(chalk.red("\n❌ Deployment failed:\n"), err);
    process.exit(1);
}
