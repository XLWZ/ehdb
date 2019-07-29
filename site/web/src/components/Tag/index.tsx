import React from 'react';
import "./index.css"
import { Link } from 'react-router-dom';

export default function Tag(props: { tags: string[] }) {
    const tags = props.tags;
    const tobj: any = {};
    tags.filter(it => it.includes(':')).forEach(it => {
        const tag = it.split(':');
        if (!Object.keys(tobj).some(it => it === tag[0])) {
            tobj[tag[0]] = [];
        }
        tobj[tag[0]].push(tag[1]);
    })
    return (
        <table>
            <tbody>
                {Object.keys(tobj).map(it => (
                    <tr>
                        <td className="tc">
                            {it}:
                    </td>
                        <td>
                            {tobj[it].map((value: string) => (
                                <div className="gt">
                                    <Link to={`/tags?search=${it}:${value}`}>
                                        {value}
                                    </Link>
                                </div>
                            ))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}