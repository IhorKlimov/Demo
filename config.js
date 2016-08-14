var config = {}

config.host = process.env.HOST || "https://botdemogit.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "4wgLxlby19yTepqE7lOFTASGrYwjpHLckS0e8OA4DTLj5Sk8XnfZj3qmXDWwueRXAnFdbyYznq0IM0tdSCf4GA==";
config.databaseId = "ToDoList";
config.collectionId = "Items";

module.exports = config;
