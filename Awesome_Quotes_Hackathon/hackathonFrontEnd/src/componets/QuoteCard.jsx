import React from "react";
import { X } from "lucide-react"; // 

function QuoteCard(props) {
    return <div className="col">
        <div className="card m-2 d-flex">
            <div className='card-body'>
                <div className="col box m-3 p-3 ">
                    <p className='card-title'>{props?.content || "AuthorArise, awake, and stop not until the goal is reached."}</p>
                    <p className='card-body'>~{props?.author || "Swami Vivekananda"}</p>
                </div>
            </div>
        </div>
    </div>
}
export default QuoteCard