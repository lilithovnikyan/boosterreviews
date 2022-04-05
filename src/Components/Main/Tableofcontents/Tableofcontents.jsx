import React, {useEffect, useState} from 'react';
import './Tableofcontents.scss';

function Tableofcontents({parameters}) {


    // const {parameters} = props;
    const {br_instructions} = parameters;
    const {br_toc_title} = parameters;
    const [instructions, setInstructions] = useState([]);
    const [tocTitle, setTocTitle] = useState([]);
    const [addActive, setAddActive] = useState('');
    const [st, setSt] = useState('active');


    useEffect(() => {
        if (br_instructions != undefined) {
            setInstructions(br_instructions);
        }
        if (br_toc_title == "") {
            setTocTitle('Table of Contents');
        } else {
            setTocTitle(br_toc_title)
        }

    }, [parameters, br_instructions, br_toc_title])


    const toggle = (item) => {
        window.exact = true;

        setAddActive(item)
        setSt("")
    }

    return (
        <div className="TableOfContents_section">
            <div className="TableOfContents_sidebar">
                <div className="TableOfContents_sidebar-sticky">
                    <h3>{tocTitle}</h3>
                    <ul>
                        {instructions.map((item, i) => {

                            let html = '';
                            if (typeof item.br_instruction_title !== "undefined") {
                                html = <li key={i}>
                                    <a className={`${i == 0 ? st : ""} ${item === addActive ? "active" : ""}`}
                                       href={`#instruction_block_${i}`}
                                       key={i}
                                       onClick={() => toggle(item)}
                                    >
                                        {item.br_instruction_title}
                                    </a>
                                </li>
                            }

                            return html;
                        })}
                    </ul>
                </div>
            </div>
            <div className="TableOfContents_right">
                {instructions.map((item, i) => {
                    let html = '';
                    if (typeof item.br_instruction_title !== "undefined") {
                        html = <h2 key={i} id={`instruction_block_${i}`}>{item.br_instruction_title}</h2>;
                    } else if (typeof item.br_instruction_description !== "undefined") {
                        html = <div key={i} className=""
                                    dangerouslySetInnerHTML={{__html: item.br_instruction_description}}/>
                    }
                    return html;
                })}
            </div>
        </div>
    )
}

export default Tableofcontents


