import './Button.css'

const Button = ({ className, value, onClick }) => {
    return (
        <button type='button' className={className} onClick={onClick}>
            {value}
        </button>
    )
}

export default Button
