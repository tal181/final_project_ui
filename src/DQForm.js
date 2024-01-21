import React from 'react';
import App from "./App";
import axios from 'axios';
import {useState} from 'react';
import {Styles} from "./Styles";
import {Oval} from "react-loader-spinner";
import 'bootstrap/dist/css/bootstrap.min.css'
import Results from "./results/Results";
import Schema from "./schema/Schema";

export default function DQForm() {


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // const body = {
        //     "strategy": selectedStrategy,
        //     "dataSetPath": selectedFilePath,
        //     "schemaConfig": selectedSchemaFilePath
        // }
        const body = {
            "strategy": "all", //all
            "dataSetPath": "/Users/tsharon/IdeaProjects/final_project/src/main/resources/text.csv",
            "schemaConfig": "fileSchemaConfig"
        }
        await axios.post(
            'http://localhost:9001/api/strategy/run',
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

    const [selectedStrategy, setSelectedStrategy] = useState('deequ');
    const [selectedFilePath, setSelectedFilePath] = useState('');
    const [selectedSchemaFilePath, setSelectedSchemaFilePath] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(false);
    const [errors, setErrors] = useState(false);

    return (
        <div className="App">
            <Styles>
                <form onSubmit={handleSubmit}>

                    {/*<label>*/}
                    {/*    Pick a strategy:*/}
                    {/*    <select*/}
                    {/*        value={selectedStrategy}*/}
                    {/*        onChange={e => setSelectedStrategy(e.target.value)}*/}
                    {/*    >*/}
                    {/*        <option value="SQL">SQL</option>*/}
                    {/*        <option value="Deequ">Deequ</option>*/}
                    {/*        <option value="DQDF">DQDF</option>*/}
                    {/*    </select>*/}
                    {/*</label>*/}

                    <label>
                        Pick file path:
                        <input type="text"
                               value={selectedFilePath}
                               onChange={e => setSelectedFilePath(e.target.value)}/>
                    </label>

                    <label>
                        Pick schema file path:
                        <input type="text"
                               value={selectedSchemaFilePath}
                               onChange={e => setSelectedSchemaFilePath(e.target.value)}/>
                    </label>

                    <button disabled={loading} className="btn btn-primary mr-1">
                        {loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Submit
                    </button>

                </form>
            </Styles>

            <Schema></Schema>

            {!loading && !errors && data &&
                <Results data={data} loading={loading} strategy = {selectedStrategy}></Results>}
        </div>

    );

}