import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {apiGet, apiPost, apiPut} from "../utils/api";
import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";

const InvoiceForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: 21,
        note: "",
        buyerId: "",
        sellerId: "",
    });
    const [persons, setPersons] = useState([]);
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data));
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => {
                setInvoice({
                    ...data,
                    buyerId: data.buyer?._id,
                    sellerId: data.seller?._id,
                });
            });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then(() => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr/>
            {errorState && (
                <div className="alert alert-danger">{errorState}</div>
            )}
            {sentState && (
                <FlashMessage
                    theme={successState ? "success" : ""}
                    text={successState ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="number"
                    name="invoiceNumber"
                    label="Číslo faktury"
                    prompt="Zadejte číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => setInvoice({...invoice, invoiceNumber: e.target.value})}
                />
                <InputField
                    required={true}
                    type="date"
                    name="issued"
                    label="Datum vystavení"
                    value={invoice.issued}
                    handleChange={(e) => setInvoice({...invoice, issued: e.target.value})}
                />
                <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    label="Datum splatnosti"
                    value={invoice.dueDate}
                    handleChange={(e) => setInvoice({...invoice, dueDate: e.target.value})}
                />
                <InputField
                    required={true}
                    type="text"
                    name="product"
                    label="Produkt"
                    prompt="Zadejte produkt"
                    value={invoice.product}
                    handleChange={(e) => setInvoice({...invoice, product: e.target.value})}
                />
                <InputField
                    required={true}
                    type="number"
                    name="price"
                    label="Cena"
                    prompt="Zadejte cenu"
                    value={invoice.price}
                    handleChange={(e) => setInvoice({...invoice, price: e.target.value})}
                />
                <InputField
                    required={true}
                    type="number"
                    name="vat"
                    label="DPH (%)"
                    value={invoice.vat}
                    handleChange={(e) => setInvoice({...invoice, vat: e.target.value})}
                />
                <InputField
                    type="text"
                    name="note"
                    label="Poznámka"
                    value={invoice.note}
                    handleChange={(e) => setInvoice({...invoice, note: e.target.value})}
                />

                <div className="mb-3">
                    <label className="form-label">Dodavatel</label>
                    <select
                        className="form-select"
                        value={invoice.sellerId}
                        onChange={(e) => setInvoice({...invoice, sellerId: e.target.value})}
                        required
                    >
                        <option value="">Vyberte dodavatele</option>
                        {persons.map((person) => (
                            <option key={person._id} value={person._id}>
                                {person.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Odběratel</label>
                    <select
                        className="form-select"
                        value={invoice.buyerId}
                        onChange={(e) => setInvoice({...invoice, buyerId: e.target.value})}
                        required
                    >
                        <option value="">Vyberte odběratele</option>
                        {persons.map((person) => (
                            <option key={person._id} value={person._id}>
                                {person.name}
                            </option>
                        ))}
                    </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Uložit"/>
            </form>
        </div>
    );
};

export default InvoiceForm;