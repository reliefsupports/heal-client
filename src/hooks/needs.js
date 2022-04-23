import { useState } from "react";
import { getGoogleAuthenticatedSheet, removeSheetHeader } from "./utils";

export default () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const getNeeds = async () => {
        setLoading(true);
        if (data.length) return data; // cache the data.
        const sheets = getGoogleAuthenticatedSheet();
        try {
            const result = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.SPREADSHEET_ID_NEEDS,
                range: process.env.SPREADSHEET_ID_NEEDS_SHEET_NAME, // sheet name
            });
            const rows = result.data.values;
            if (rows.length) {
                const data = removeSheetHeader({ rows: rows });
                setData(data);
            }
        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        error,
        loading,
        getNeeds,
    };
};
