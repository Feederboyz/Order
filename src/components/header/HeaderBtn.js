import "./HeaderBtn.scss";
export default function HeaderBtn({ onClick, isCross }) {
    return (
        <div className="header__btn" onClick={onClick}>
            <div className={isCross ? "header__btn--active" : ""}></div>
            <div className={isCross ? "header__btn--active" : ""}></div>
            <div className={isCross ? "header__btn--active" : ""}></div>
        </div>
    );
}
