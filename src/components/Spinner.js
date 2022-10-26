import React from "react";
import loading from './loader.gif'

const Spinner = () => {
    return (
        <div className="text-center">
            <img className="md-3" src={loading} alt="loading" />
        </div>
    )
}

export default Spinner