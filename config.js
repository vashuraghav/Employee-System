require("dotenv").config();

module.exports = {
    SERVER_PORT : process.env.port || 5050,
    MONGO_LOCAL_URL : process.env.MONGO_LOCAL_URL,
    EMAIL_ADDRESS : process.env.EMAIL_ADDRESS,
    EMAIL_PASSWORD : process.env.EMAIL_PASSWORD,
}