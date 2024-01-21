import React, {useState} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {SchemaStyles} from "./SchemaStyles";
import axios from "axios";
export default function Schema() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(false);
    const [errors, setErrors] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // const body = {
        //     "strategy": selectedStrategy,
        //     "dataSetPath": selectedFilePath,
        //     "schemaConfig": selectedSchemaFilePath
        // }
        const body = {
            "filePath": "fileSchemaConfig",
        }
        await axios.post(
            'http://localhost:9001/api/schema',
            body,
            {headers: {'Content-Type': 'application/json'}}
        )
            .then(response => {
                console.log(response.data);
                setData(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                setErrors(error);
                console.log(error);
                setLoading(false);
            });
    }

    return (
        <SchemaStyles>
            <form onSubmit={handleSubmit}>
                <button  className="btn btn-primary mr-1">
                    Submit
                </button>
            </form>
        </SchemaStyles>

    );

}