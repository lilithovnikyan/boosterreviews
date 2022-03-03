import React, {useEffect, useState} from 'react';
import './Tableofcontents.scss';

function Tableofcontents(props) {


    const { parameters } = props;
    const { br_instructions } = parameters;

    const [instructions, setInstructions] = useState([]);

    useEffect(()=>{
        if( br_instructions != undefined ){
            setInstructions( br_instructions );
        }
    }, [parameters, br_instructions])

    return (
        <div className="TableOfContents_section">
            <div className="TableOfContents_sidebar">
            <div className="TableOfContents_sidebar-sticky">
                <h3>Table of Contents</h3>
                <ul>
                    <li><a className="topic-table-item" href="#instruction_block_0">What is a Mobile Signal Booster, and Do I Need It?</a></li>
                    <li><a className="topic-table-item" href="#instruction_block_2">What comes in a package?</a></li>
                    <li><a className="topic-table-item" href="#instruction_block_4">Do I need a signal booster?</a></li>
                    <li><a className="topic-table-item" href="#instruction_block_6">Conclusion</a></li>
                </ul>
            </div>
            </div>
            <div className="TableOfContents_right">
                {instructions.map((item, i)=>{
                    let html = '';
                    if( typeof item.br_instruction_title !== "undefined" ){
                        html = <h2 key={i} id={`instruction_block_${i}`}>{item.br_instruction_title}</h2>;
                    }else if( typeof item.br_instruction_description !== "undefined" ){
                        html = <div key={i} className="" dangerouslySetInnerHTML={{ __html: item.br_instruction_description }}></div>
                    }
                    return html;
                })}
            </div>
        </div>
    )
}

export default Tableofcontents


