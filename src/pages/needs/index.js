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

    const needs = getNeedsAPI.data;
    return (
        <div>
            {needs.map((need) => {
                const [, email, name, needDetail, quantity, address, city, contactNumber, additionalInformation] = need;
                return <div> need user email {email}</div>;
            })}
        </div>
    );
}
