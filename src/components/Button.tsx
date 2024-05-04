import "../scss/Button.scss";
interface IProps {
    children: string;
    selected?: boolean;
    onClick: () => void;
}

export default function Button(props: IProps) {
    return (
        <button
            className={`${props.selected ? "btn-selected" : ""} btn`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}
