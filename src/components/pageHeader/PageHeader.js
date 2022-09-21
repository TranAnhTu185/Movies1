import React from 'react';

import "./PageHeader.scss";

function PageHeader(props) {
    return (
        <div className="page-header">
            <h2>{props.children}</h2>
        </div>
    );
}

export default PageHeader;