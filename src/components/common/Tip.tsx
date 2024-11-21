import { Tooltip, TooltipProps } from "@mui/material";
import React, { ReactElement } from "react";

export const Tip: React.FC<TooltipProps> = ({ title, children, sx, placement }) => {
    // Ensure that the child is a valid React element
    const child = React.isValidElement(children) ? children : <React.Fragment>{children}</React.Fragment>;

    return (
        <Tooltip title={title} sx={sx} placement={placement}>
            {React.cloneElement(child, { ref: (child as any).ref })}
        </Tooltip>
    );
};