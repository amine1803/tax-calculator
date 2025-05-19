import styles from "./Card.module.scss";
import type { CardProps } from "./Card.types";
import Button from "../button/Button";

function Card({ children, className, title, actions, actionsPosition }: CardProps) {
    const cardClassName = [styles.card, className].filter(Boolean).join(" ");
    const cardActionsClassName = [
        styles.card__actions,
        styles[`card__actions--${actionsPosition || "left"}`],
    ].join(" ");

    return (
        <div className={cardClassName}>
            {title && <span className={styles.card__title}>{title}</span>}

            <div className={styles.card__body}>{children}</div>

            {actions && (
                <span className={cardActionsClassName}>
                    {actions.map((props, index) => (
                        <Button
                            key={index}
                            {...props}
                        />
                    ))}
                </span>
            )}
        </div>
    );
}

export default Card;
