# Telegram Quiz Bot

quiz_bro_bot is a Telegram quiz bot that provides an interactive quiz experience by retrieving random questions from the OpenTriviaDatabase. The bot offers a wide range of categories for users to choose from, making it an engaging platform for testing their knowledge and having fun.

## Bot Commands

- **/start**: Initializes the bot and sets up all the necessary values to begin using quiz_bro_bot.
- **/quiz**: Generates a quiz based on the chosen categories. Users can select their preferred categories and answer a series of random questions.
- **/settings**: Opens an inline menu where users can choose their preferred categories for the quiz. This allows users to customize their quiz experience according to their interests.
- **/stat**: Displays the bot's statistics based on the quizzes replied to by users. Users can view their performance, such as the number of correct and incorrect answers.

## How it works

- When the bot is started using the `/start` command, it initializes all the required values and sets up the necessary configurations.
- Users can then use the `/quiz` command to generate a quiz. The bot retrieves random questions from the OpenTriviaDatabase based on the chosen categories.
- The `/settings` command provides users with an inline menu where they can choose their preferred categories for the quiz. This allows users to tailor the quiz to their interests.
- After answering the questions in the quiz, users can view their performance statistics using the `/stat` command. The bot provides insights into the number of correct and incorrect answers, allowing users to track their progress.

## Technologies Used

- Node.js
- TypeScript
- [Grammy](https://github.com/grammyjs/grammY) (Telegram Bot Framework)

## Installation and Usage

1. Clone the repository.
2. Install the required dependencies using `npm install`.
3. Set up a Telegram bot and obtain the bot token.
4. Configure the bot token in the project.
5. Run the bot using `npm start` or your preferred method.
6. Start interacting with the bot by sending commands in your Telegram chat.

## Contributions

Contributions to quiz_bro_bot are always welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

quiz_bro_bot is released under the [MIT License](https://github.com/yourusername/quiz_bro_bot/blob/main/LICENSE).

Enjoy your quiz experience with Telegram Quiz Bot!
