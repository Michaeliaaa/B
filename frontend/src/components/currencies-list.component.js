import React, { Component } from "react";
import { currencyURL } from "../config/serverless.config";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default class CurrencyRatesList extends Component {

    constructor(props) {
        super(props);
        this.state = { currencies: [] };
    }

    componentDidMount() {
        axios.get(currencyURL)
            .then(response => {
                this.setState({ currencies: response.data });
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="container">
                <h2>Rates of Top 20 Most Traded Currencies in the World</h2>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Currency:</th>
                            <th>Rate: (= 1 SGD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(this.state.currencies).map((key) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{this.state.currencies[key]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}