# Telegram Quiz Bot
!["Show case gif"](./assets/showcase.gif)

Telegram Quiz Bot is a Telegram quiz bot that provides an interactive quiz experience by retrieving random questions from the OpenTriviaDatabase. The bot offers a wide range of categories for users to choose from, making it an engaging platform for testing their knowledge and having fun.

## Bot Commands

- **/start**: Initializes the bot and sets up all the necessary values to begin using Telegram Quiz Bot.
- **/quiz**: Generates a quiz based on the chosen categories. Users can select their preferred categories and answer a series of random questions.
- **/settings**: Opens an inline menu where users can choose their preferred categories for the quiz. This allows users to customize their quiz experience according to their interests.
- **/stat**: Displays the bot's statistics based on the quizzes replied to by users. Users can view their performance, such as the number of correct and incorrect answers.

## Technologies Used

- Node.js
- TypeScript
- [Grammy](https://github.com/grammyjs/grammY) (Telegram Bot Framework)

## Bot Token Setup
To run the bot, you need to set up your Telegram bot token. There are two options for setting the token: using an .env file or directly in the source code.

### Option 1: Setting in the .env File
- Create a new file named .env in the root directory of your project.
- Add the following line to the .env file:
```bash
  BOT_TOKEN=your_bot_token_here
```
- Replace your_bot_token_here with the actual token for your Telegram bot.

### Option 2: Setting in the Source Code
Alternatively, you can directly set the BOT_TOKEN in the source code of your src/index.ts file.

- Locate the src/index.ts file.
- Find the line that initializes the bot:
```ts
  const bot = new Bot<MyContext>(BOT_TOKEN);
```
- Replace BOT_TOKEN with your actual bot token.

## Installation and Usage

1. Clone the repository.
2. Install the required dependencies using `npm install`.
3. Set up a Telegram bot and obtain the bot token.
4. Configure the bot token in the project (use the solution described above)
5. Run the bot using `npm start` or your preferred method.
6. Start interacting with the bot by sending commands in your Telegram chat.

## License

Telegram Quiz Bot is released under the [MIT License](https://github.com/yourusername/quiz_bro_bot/blob/main/LICENSE).

Enjoy your quiz experience with Telegram Quiz Bot!
