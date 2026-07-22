import React, {useEffect, useState} from "react";
import { apiGet } from "../utils/api";

const PersonStatistics = () => {
    const [statistics, setStatistics] = useState([]);
    const [growth, setGrowth] = useState([]);

    useEffect(() => {
        apiGet("/api/persons/statistics").then((data) => setStatistics(data));
        apiGet("/api/persons/revenue-growth").then((data) => setGrowth(data));
    }, []);

    return (

        <div>
            <h1>Statistiky osob</h1>
            <hr/>

            <h3>Celkové příjmy</h3>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Jméno</th>
                    <th>Příjmy</th>
                </tr>
                </thead>
                <tbody>
                {statistics.map((item) => (
                    <tr key={item.personId}>
                        <td>{item.personName}</td>
                        <td>{item.revenue} Kč</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h3>Měsíční růst obratu</h3>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Firma</th>
                    <th>Měsíc</th>
                    <th>Obrat</th>
                    <th>Předchozí obrat</th>
                    <th>Růst</th>
                </tr>
                </thead>
                <tbody>
                {growth.map((item, index) => (
                    <tr key={index}>
                        <td>{item.company}</td>
                        <td>{item.year_month}</td>
                        <td>{item.price} Kč</td>
                        <td>{item.prev_revenue} Kč</td>
                        <td>{item.growth_rate !== "" ? item.growth_rate + " %" : "-"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PersonStatistics;