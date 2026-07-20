import React, {useEffect, useState} from "react";
import {apiGet} from "../utils/api";

const InvoiceStatistics = () => {
    const [statistics, setStatistics] = useState({
        currentYearSum: 0,
        allTimeSum: 0,
        invoicesCount: 0,
    });

    useEffect(() => {
        apiGet("/api/invoices/statistics").then((data) => setStatistics(data));
    }, []);

    return (
        <div>
            <h1>Statistiky faktur</h1>
            <hr/>
            <p>
                <strong>Obrat za letošní rok:</strong> {statistics.currentYearSum} Kč
            </p>
            <p>
                <strong>Celkový obrat:</strong> {statistics.allTimeSum} Kč
            </p>
            <p>
                <strong>Počet faktur:</strong> {statistics.invoicesCount}
            </p>
        </div>
    );
};

export default InvoiceStatistics;