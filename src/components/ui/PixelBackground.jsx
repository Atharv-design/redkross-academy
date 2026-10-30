/* eslint-disable */
// PixelBackground — Global Ambient Cyber Shimmer & Ray-Marching Fractal Shader Layer
// Implements user's WebGL fragment shader mapped strictly to Emerald Green & Electric Mint (0% blue).

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
