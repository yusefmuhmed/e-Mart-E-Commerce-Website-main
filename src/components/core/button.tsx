import Link from '../core/link';
import ButtonProps from "../cms/types/button"

interface Props {
    btn?: ButtonProps
    noStyle?: boolean
    targetBrank?: boolean
}

const Button: React.FC<Props> = ({ btn, noStyle = false, targetBrank = false }: Props): JSX.Element => {
    if (!btn || !btn.enabled) {
        return <></>
    }
    return (
        <Link href={btn.href}>
            <a className={noStyle ? '' : 'default-btn'} target={targetBrank ? "_blank" : "_self"}>
                {btn.label} <i className={btn.icon}></i>
            </a>
        </Link>
    );
}

export default Button;