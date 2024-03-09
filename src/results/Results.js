import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {ResultsStyles} from "./ResultsStyles";
import {useCollapse} from "react-collapsed";
export default function Results({data, loading, strategy}) {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

    function createTable(data) {
        let result = []
        for (let step = 0; step < data.sql.checks.length; step++) {
            let item ={}
            item.checkName = data.sql.checks[step].checkName
            item.sql = data.sql.checks[step].value.toString()
            item.deequ = data.deequ.checks[step].value.toString()
            item.dqdf = data.dqdf.checks[step].value.toString()
            result.push(item)
        }

        return result
    }

    return (
        <ResultsStyles>

            {!loading &&
                <table>
                    <tr>
                        <th></th>
                        <th>SQL</th>
                        <th>Deequ</th>
                        <th>DQDF</th>

                    </tr>
                    <tr>
                        <td>Duration</td>
                        <td>{data.sql.duration}</td>
                        <td>{data.deequ.duration}</td>
                        <td>{data.dqdf.duration}</td>
                    </tr>
                </table>}

            {!loading && data && <label>
                Total number of checks {createTable(data).length}</label>}

            <button {...getToggleProps()}>
                {isExpanded ? 'Hide results' : 'Show results'}
            </button>
            <section {...getCollapseProps()}>

                {!loading && data &&
                    <table>
                        <tr>
                            <th>Check name</th>
                            <th>SQL</th>
                            <th>Deequ</th>
                            <th>DQDF</th>

                        </tr>
                        {createTable(data).map(check => {
                            return (
                                <tr key={check.checkName}>
                                    <td>{check.checkName}</td>

                                    <td>{check.sql}</td>

                                    <td>{check.deequ}</td>

                                    <td>{check.dqdf}</td>
                                </tr>
                            )
                        })}
                    </table>}
            </section>
        </ResultsStyles>

    );

}