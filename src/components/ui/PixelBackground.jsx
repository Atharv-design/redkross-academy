/* eslint-disable */

import React from "react";
import CyberShaderBackground from "./CyberShaderBackground";

export default function PixelBackground({
    opacity = 0.35,
    className = ""
}) {
    return (
        <CyberShaderBackground opacity={opacity} className={className} />
    );
}

export { CyberShaderBackground };
