const dbUrl = "mongodb+srv://rradic:rradic123@pts.c2hwo.mongodb.net/?retryWrites=true&w=majority&appName=PTS";

const port = process.env.PORT || 3000;

module.exports = {
    dbUrl,
    port
};