"use client";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface AlertBoxProps {
    severity?: "success" | "error" | "warning" | "info";
    title?: string;
    message: string;
    onClose?: () => void;
    onShow?: () => void;
}
const AlertBox = ({ severity = "info", title, message }: AlertBoxProps) => {
    return (
        <div
            style={{
                position: "fixed",
                top: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000,
                minWidth: "300px",
            }}
        >
            <Alert severity={severity}>
                {title && <AlertTitle>{title}</AlertTitle>}
                {message}
            </Alert>
        </div>
    );
};

export default AlertBox;
