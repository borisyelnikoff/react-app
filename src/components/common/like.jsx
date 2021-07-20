import React from 'react';

const Like = ({ liked, onClick }) => {
    let iconClass = "fa fa-heart";
    if (!liked)
        iconClass += "-o";

    return (
            <i style={{ cursor: 'pointer' }} className={iconClass} onClick={onClick} />
        );
}
 
export default Like;