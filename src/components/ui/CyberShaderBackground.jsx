/* eslint-disable */
// CyberShaderBackground — RedKross Academy Ray-Marching Fractal WebGL Engine
// Implements the user's custom fragment shader mapped strictly to Emerald Green (#65F58A, #00FFA3)
// and Electric Mint (#35E6B5) over dark cyber canvas (#071018). ZERO BLUE.

import React, { useEffect, useRef } from 'react';

const VERTEX_SHADER_SRC = `
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_noise;

#define PI 3.141592653589793
#define TAU 6.283185307179586

const float multiplier = 15.5;
const float zoomSpeed = 10.0;
const int layers = 8;
const int octaves = 4;

// RedKross Signature Palettes (Strict Zero Blue)
// Emerald Green #00FFA3 / #65F58A and Electric Mint #35E6B5
const vec3 C_EMERALD = vec3(0.0, 1.0, 0.64);
const vec3 C_MINT    = vec3(0.21, 0.90, 0.71);
const vec3 C_DARK    = vec3(0.027, 0.063, 0.094);

vec2 hash2(vec2 p) {
    return texture2D(u_noise, (p + 0.5) / 256.0).xy;
}

mat2 rotate2d(float _angle) {
    return mat2(cos(_angle), -sin(_angle),
                sin(_angle),  cos(_angle));
}

float hash(vec2 p) {
    return texture2D(u_noise, (p + 0.5) / 256.0).x;
}

float noise(vec2 uv) {
    vec2 id = floor(uv);
    vec2 subuv = fract(uv);
    vec2 u = subuv * subuv * (3.0 - 2.0 * subuv);
    float a = hash(id);
    float b = hash(id + vec2(1.0, 0.0));
    float c = hash(id + vec2(0.0, 1.0));
    float d = hash(id + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(in vec2 uv) {
    float s = 0.0;
    float m = 0.0;
    float a = 0.5;
    for (int i = 0; i < octaves; i++) {
        s += a * noise(uv);
        m += a;
        a *= 0.5;
        uv *= 2.0;
    }
    return s / m;
}

vec3 domain(vec2 z) {
    float angle = atan(z.y, z.x);
    float t = sin(angle * 2.0 + u_time * 0.15) * 0.5 + 0.5;
    return mix(C_MINT, C_EMERALD, t);
}

vec3 render(vec2 uv, float scale, vec3 colour) {
    vec2 id = floor(uv);
    vec2 subuv = fract(uv);
    vec2 rand = hash2(id);
    float bokeh = abs(scale) * 1.0;
    
    float particle = 0.0;
    if (length(rand) > 1.25) {
        vec2 pos = subuv - 0.5;
        float field = length(pos);
        particle = smoothstep(0.3, 0.0, field);
        particle += smoothstep(0.4 * bokeh, 0.34 * bokeh, field);
    }
    return colour * (particle * 2.2);
}

vec3 renderLayer(int layer, int totalLayers, vec2 uv, inout float opacity, vec3 colour, float n) {
    float fLayer = float(layer);
    float scale = mod((u_time + zoomSpeed / float(totalLayers) * fLayer) / zoomSpeed, -1.0);
    uv *= 18.0;
    uv *= scale * scale;
    uv = rotate2d(u_time / 14.0) * uv;
    uv += vec2(25.0 + sin(u_time * 0.08)) * fLayer;

    vec3 pass = render(uv * multiplier, scale, colour) * 0.22;

    opacity = 1.0 + scale;
    float _opacity = opacity;
    
    float endOpacity = smoothstep(0.0, 0.4, scale * -1.0);
    opacity += endOpacity;

    return pass * _opacity * endOpacity;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy);
    if (u_resolution.y < u_resolution.x) {
        uv /= u_resolution.y;
    } else {
        uv /= u_resolution.x;
    }

    float n = fbm((uv + vec2(sin(u_time * 0.08), u_time * 0.06)) * 2.0 - 2.0);

    // Color mixing strictly in Emerald Green and Electric Mint
    vec3 baseColour = mix(C_DARK, mix(C_MINT * 0.35, C_EMERALD * 0.65, n), n);

    vec3 layerColour = domain(uv);

    float opacity = 1.0;
    float opacity_sum = 1.0;

    for (int i = 1; i <= layers; i++) {
        baseColour += renderLayer(i, layers, uv, opacity, layerColour, n);
        opacity_sum += opacity;
    }

    baseColour /= (opacity_sum * 0.75);

    // Final color clamp with cyber glass luminescence
    vec3 finalGlow = clamp(baseColour * 4.5, 0.0, 1.0);
    gl_FragColor = vec4(finalGlow, 1.0);
}
`;

export default function CyberShaderBackground({
    opacity = 0.35,
    className = ""
}) {
    const canvasRef = useRef(null);
    const animFrameRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Try getting WebGL context
        const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' })
            || canvas.getContext('experimental-webgl');

        if (!gl) {
            console.warn('WebGL not supported for CyberShaderBackground');
            return;
        }

        // Compile helper
        const compileShader = (type, source) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compile error:', gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
        const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);

        if (!vertShader || !fragShader) return;

        const program = gl.createProgram();
        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
            return;
        }

        gl.useProgram(program);

        // Quad geometry
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = new Float32Array([
            -1.0, -1.0,
             1.0, -1.0,
            -1.0,  1.0,
            -1.0,  1.0,
             1.0, -1.0,
             1.0,  1.0,
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // Uniform locations
        const uResolution = gl.getUniformLocation(program, 'u_resolution');
        const uMouse = gl.getUniformLocation(program, 'u_mouse');
        const uTime = gl.getUniformLocation(program, 'u_time');
        const uNoise = gl.getUniformLocation(program, 'u_noise');

        // Create 256x256 procedural noise texture
        const noiseSize = 256;
        const noiseData = new Uint8Array(noiseSize * noiseSize * 4);
        for (let i = 0; i < noiseData.length; i += 4) {
            noiseData[i] = Math.floor(Math.random() * 256);     // R
            noiseData[i + 1] = Math.floor(Math.random() * 256); // G
            noiseData[i + 2] = Math.floor(Math.random() * 256); // B
            noiseData[i + 3] = 255;                             // A
        }

        const texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, noiseSize, noiseSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, noiseData);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        if (uNoise) gl.uniform1i(uNoise, 0);

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Resize handler with 0.75x DPR for super smooth 60fps
        const resize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        window.addEventListener('resize', resize, { passive: true });
        resize();

        const startTime = performance.now();

        const render = () => {
            const currentTime = (performance.now() - startTime) * 0.001;

            gl.uniform2f(uResolution, canvas.width, canvas.height);
            gl.uniform2f(uMouse, mouseX, mouseY);
            gl.uniform1f(uTime, currentTime);

            gl.drawArrays(gl.TRIANGLES, 0, 6);

            animFrameRef.current = requestAnimationFrame(render);
        };

        animFrameRef.current = requestAnimationFrame(render);

        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resize);
            try {
                gl.deleteProgram(program);
                gl.deleteShader(vertShader);
                gl.deleteShader(fragShader);
                gl.deleteTexture(texture);
                gl.deleteBuffer(positionBuffer);
            } catch (e) {}
        };
    }, []);

    return (
        <div
            aria-hidden="true"
            className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}
            style={{ opacity }}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
            />
        </div>
    );
}
