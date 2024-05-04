import '../scss/Buttons.scss'
interface IProps{
    children: JSX.Element | JSX.Element[];

}

export default function ButtonGroup({ children }: IProps) {
    return <div className="btn-group"> {children} </div>

}
