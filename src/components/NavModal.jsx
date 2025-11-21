import React, { useEffect } from "react"
import "./NavModal.css"

const NavModal = ({ isOpen, title, children, onClose }) => {
    useEffect(() => {
        if (!isOpen) return undefined

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose])

    if (!isOpen) {
        return null
    }

    return (
        <div className="nav-modal-backdrop" onClick={onClose}>
            <div className="nav-modal" onClick={(event) => event.stopPropagation()}>
                <div className="nav-modal-header">
                    <h3>{title}</h3>
                    <button type="button" className="nav-modal-close" onClick={onClose} aria-label="Stäng modal">
                        Stäng
                    </button>
                </div>
                <div className="nav-modal-body">
                    {children}
                </div>
                <div className="nav-modal-actions">
                    <button type="button" className="nav-modal-primary" onClick={onClose}>
                        Klar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavModal

