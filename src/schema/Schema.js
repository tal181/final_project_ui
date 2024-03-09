import React, {useState} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {SchemaStyles} from "./SchemaStyles";
import axios from "axios";
import {useCollapse} from "react-collapsed";

export default function Schema({data, loading}) {


    const {getCollapseProps, getToggleProps, isExpanded} = useCollapse()


    return (
        <SchemaStyles>

            {!loading && data &&
                <div>
                    <button {...getToggleProps()}>
                        {isExpanded ? 'Hide schema' : 'Show schema'}
                    </button>
                    <section {...getCollapseProps()}>
                        <table>
                            <tr>
                                <th>Column name</th>
                                <th>Type</th>

                            </tr>
                            {data.map(check => {
                                return (
                                    <tr key={check.columnName}>
                                        <td>{check.columnName}</td>

                                        <td>{check.type}</td>
                                    </tr>
                                )
                            })}
                        </table>

                    </section>
                </div>
            }

        </SchemaStyles>

    )
        ;

}