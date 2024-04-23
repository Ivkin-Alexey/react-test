import React from "react";
import "./scrollItem.css";

interface IScrollItemProps {
    title: string;
}

const ScrollItem: React.FC<IScrollItemProps> = (props) => {

    const {title} = props;

    function handleClick() {
        console.log(title);
    }

    return (
        <li className="scrollItem" onClick={handleClick}>{title}</li>
    )

}

export default ScrollItem