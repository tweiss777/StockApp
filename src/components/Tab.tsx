
interface IProps {
  title: string;
  children: JSX.Element | JSX.Element[];
}
export default function Tab({ title, children }: IProps) {
  return <div>{children}</div>;
}
