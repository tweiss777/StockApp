import TabTitle from "./TabTitle";
import "../scss/Tabs.scss";

import { useState } from "react";
interface IProps {
    children: JSX.Element[];
}

export default function Tabs({ children }: IProps) {
    const [activeTab, setActiveTab] = useState<number>(0);

    const tabs: JSX.Element[] = children.map((item: any, i: number) => (
        <TabTitle
            key={i}
            index={i}
            title={item.props.title}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
        />
    ));
    return (
        <div>
            <ul className="tabs">{tabs}</ul>
            <div className="active-tab">{children[activeTab]}</div>
        </div>
    );
}
