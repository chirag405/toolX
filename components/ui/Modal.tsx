import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        onClose &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        console.log("Clicked outside modal, closing...");
        onClose();
      }
    };

    // Add event listener
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000, // Ensure it's on top
      }}
      onClick={(e) => {
        // Prevent clicks on the overlay from propagating
        if (e.target === e.currentTarget && onClose) {
          console.log("Clicked on overlay, closing modal...");
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          minWidth: "300px", // Basic width
          maxWidth: "90%", // Responsive width
          textAlign: "center", // Center text for "Coming Soon"
        }}
      >
        {/* If onClose is provided, show a close button */}
        {onClose && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                padding: "0.25rem 0.5rem",
              }}
            >
              &times;
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
