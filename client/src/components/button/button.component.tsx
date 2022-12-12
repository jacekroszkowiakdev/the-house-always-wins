import "./button.styles.css";

interface ButtonProps {
    id: string;
    buttonText: string;
    style: {};
    disabled: boolean;
    handleMouseOver: React.MouseEventHandler;
    handleOnClick: React.MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({
    id,
    buttonText,
    style,
    disabled,
    handleOnClick,
    handleMouseOver,
}: ButtonProps) => {
    return (
        <button
            id={id}
            className="button"
            style={style}
            disabled={disabled}
            onClick={handleOnClick}
            onMouseOver={handleMouseOver}
        >
            {buttonText}
        </button>
    );
};

export default Button;
