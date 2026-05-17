const dotenv = require("dotenv");
dotenv.config();

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD || "change_me_user_secret";
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD || "change_me_admin_secret";

module.exports = {
    JWT_USER_PASSWORD,
    JWT_ADMIN_PASSWORD
};