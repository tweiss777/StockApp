import '../scss/Tab.scss'
interface IProps {
    title: string
    index: number,
    setActiveTab: (index: number) => void
    activeTab: number
}
export default function TabTitle({title, index, activeTab, setActiveTab}: IProps) {
    return (
        <li className='tab'>
            <button className={`tab-btn ${index === activeTab? 'tab-btn-active': ''}`} onClick={() => setActiveTab(index)}>{title}</button>
        </li>

    );
}
