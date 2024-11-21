import React from "react";

interface CheckBoxProps {
    isChecked?: boolean;
    width?: number;
    height?: number;
    color?: string;
    align?: string;
    addWidth?: boolean;
    shouldClick?: boolean;
    onClick?: () => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
    isChecked = false,
    width = 10,
    height = 10,
    color = '#050404',
    align = "center",
    addWidth = false,
    shouldClick = false,
    onClick = () => { }
}) => {
    return (
        <div style={addWidth ? { width: "100%", display: "flex", justifyContent: "center" } : {}}>
            <div className="check-box" style={{
                width: `${width}px`, height: `${height}px`,
                borderColor: color, alignSelf: align,
                cursor: shouldClick ? "pointer" : "auto"
            }} onClick={onClick}>
                {isChecked && <div className="check-box-check" style={{ backgroundColor: color }}></div>}
            </div>
        </div>
    );
};