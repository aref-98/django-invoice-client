import React, {useEffect, useState} from "react";
import {apiDelete, apiGet} from "../utils/api";
import InvoiceTable from "./InvoiceTable";

const InvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);
    const [filter, setFilter] = useState({
        buyerID: "",
        sellerID: "",
        product: "",
        minPrice: "",
        maxPrice: "",
        limit: "",
    });

    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
        setInvoices(invoices.filter((item) => item.id !== id));
    };

    const fetchInvoices = (currentFilter = filter) => {
        apiGet("/api/invoices", currentFilter).then((data) => setInvoices(data));
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    return (
        <div>
            <h1>Seznam faktur</h1>
            <div className="mb-3">
                <h5>Filtrování</h5>
                <div className="row g-2">
                    <div className="col-md-2">
                        <input
                            className="form-control"
                            placeholder="Min. cena"
                            value={filter.minPrice}
                            onChange={(e) => setFilter({...filter, minPrice: e.target.value})}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            className="form-control"
                            placeholder="Max. cena"
                            value={filter.maxPrice}
                            onChange={(e) => setFilter({...filter, maxPrice: e.target.value})}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            className="form-control"
                            placeholder="Produkt"
                            value={filter.product}
                            onChange={(e) => setFilter({...filter, product: e.target.value})}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            className="form-control"
                            placeholder="Limit"
                            value={filter.limit}
                            onChange={(e) => setFilter({...filter, limit: e.target.value})}
                        />
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary" onClick={() => fetchInvoices(filter)}>
                            Filtrovat
                        </button>
                    </div>
                </div>
            </div>
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:"
            />
        </div>
    );
};

export default InvoiceIndex;