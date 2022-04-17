/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDonationsAPI } from "../../hooks";

export default function Donations() {
    const getDonationsAPI = useDonationsAPI();
    useEffect(() => {
        getDonationsAPI.getDonations();
    }, []);
    if (getDonationsAPI.error) return "Error!";
    if (getDonationsAPI.loading) return "Loading!";

    const [, email, name, donation, quantity, address, city, contactNumber, additionalInformation] =
        getDonationsAPI.data;
    return <div>donation user email: {email} </div>;
}
