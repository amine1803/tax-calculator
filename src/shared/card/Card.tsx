import { JSX } from "react";
import styles from "./Card.module.scss";
import type { CardProps } from "./Card.types";
import Button from "../button/Button";

/**
 * Card component renders a container with optional title, body, and action buttons.
 *
 * @param {ReactNode} children - The content of the card body.
 * @param {string} className - Additional CSS classes to apply to the card.
 * @param {string} title - Optional title text displayed at the top of the card.
 * @param {ButtonProps[]} actions - Optional array of action buttons to render at the bottom.
 * @param {string} actionsPosition - Position of the actions ("left" or "right").
 * @param props - The rest of the card properties.
 * @returns {JSX.Element} A styled card container element.
 */
function Card({
    children,
    className,
    title,
    actions,
    actionsPosition,
    ...props
}: CardProps): JSX.Element {
    // Combine the base card class with any additional className prop
    const cardClassName = [styles.card, className].filter(Boolean).join(" ");
    // Combine the base actions class with a position-specific class
    const cardActionsClassName = [
        styles.card__actions,
        styles[`card__actions--${actionsPosition || "left"}`],
    ].join(" ");

    return (
        <div
            className={cardClassName}
            {...props}>
            {/* Render the title if provided */}
            {title && <span className={styles.card__title}>{title}</span>}

            {/* Render the card body content */}
            <div className={styles.card__body}>{children}</div>

            {/* Render actions if provided */}
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
