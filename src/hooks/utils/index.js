import { google } from "googleapis";

const getGoogleAuthenticatedSheet = () => {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.SPREADSHEET_CLIENT_EMAIL,
            client_id: process.env.SPREADSHEET_CLIENT_ID,
            private_key: process.env.SPREADSHEET_PRIVATE_KEY,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    return google.sheets({ version: "v4", auth });
};

const removeSheetHeader = ({ rows }) => rows.slice(1, rows.length);
export { getGoogleAuthenticatedSheet, removeSheetHeader };
