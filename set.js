const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOERmb1VCb003dFhhU3Y0bGkvT0hST1NvRDhFNnBOTnJZWERRZ2dZNFkxaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUllJL1RRSUNodGVxWWRxaCtmNWk0N1pEblh6OWFGUmQ3TUt3cHllWFFEWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDRng3MlpQQWh6Yzh6bUUzZStWNmhyR21QaWdrRGtBYUtWRVhwZ05xcjNBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOS2RtZERUOEJ1dEUxRmkvOER5U0JpVE40VVhnNUFGdUxOQnMrcmQyT25jPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZHWGs1Sy8xS0o2dGJ1YWJ3UGZ3WW45czhNRGRFdlVpU1FyM1l0TVpjbmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRBSUhWVjlTaFdBbVNBMFQ1a2dlbC9OZm1oL0wyRjBiZjVSNm9wQ0J6Rzg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ01PRnpyZ1ZqdXZtNlVlQitHNVNwMmU0YmtPRW5lVk11WU1la245THBHST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMjBHQ3UrL3g4WUFuckFiNHVLQ0pMVjZGSDc3aGc0c1FVTG1sVHJla3B4TT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im02OHVTSFZEeUppaHNtSHU1Mm1ub2ljbHVDeWg4RmtFazA3ZGcvOHhMNGhQSElrVkUvQ0FvODdNMlBjMHA0UTdVUXFVZmhyTWdwWWQ1aklOQVpZVGl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIsImFkdlNlY3JldEtleSI6ImVhZXlqR2x0a0RRdGlHODVSNmczd1M0eGY3MHpGazBodUJtNlp6LzZFNEE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlhSWHhreWNpU2h5dUJXMjdUTnc4RlEiLCJwaG9uZUlkIjoiZTIyMDdlOGEtYjhlZC00ZjdkLWFhMWUtYTg4ZGE5MTY0YTFjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRPQ09iTkFpZGZEakJQL29CaEN3eGgzd285Zz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4MUF6T2xoNXZ1SDVwZ245RkprMTJCOVlPbmc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiN1RNOVZUU1giLCJtZSI6eyJpZCI6IjI1Njc1ODEwMzEzMDo0MkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSWZlL0lVSEVLN1U3cnNHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiVnd6RVlTMzM2WUJDejloY0EwRHp4cWVCQnd2ZXk2ZTVqaUxBcmkra1Mxaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoia3VNVUQxVkNEVGtRd2cxWllwMHh0OTduWExZaVE2d2JiTkpqamZ3VGl6MmEzUER2dzNRUG9GNVp0cEtrT2dhNmdiZ2h2WXduVlpCcFlMZ2t5ZXBHRGc9PSIsImRldmljZVNpZ25hdHVyZSI6InhaMDNRZHZ2YXE2UkNZU0djOVVpbDBKbE90dEx2MnA2VWNBZ1dlS3AyVCtiaDBOT3JlTXYrSGlsR2ZjZCs3c0VCN29PS1B6QmFxL1VDek5iQ0tacWdRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU2NzU4MTAzMTMwOjQyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZjTXhHRXQ5K21BUXMvWVhBTkE4OGFuZ1FjTDNzdW51WTRpd0s0dnBFdFoifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzYxNTc3NTd9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Mr pickup lines",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 256758103130",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUCKY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PTIVATE_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY|| 'yes', 
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


                  
