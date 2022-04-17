/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNeedsAPI } from "../../hooks";

export default function Donations() {
    const getNeedsAPI = useNeedsAPI();
    useEffect(() => {
        getNeedsAPI.getNeeds();
    }, []);
    if (getNeedsAPI.error) return "Error!";
    if (getNeedsAPI.loading) return "Loading!";

    const [, email, name, needs, quantity, address, city, contactNumber, additionalInformation] = getNeedsAPI.data;
    return <div>donation user email: {email} </div>;
}
