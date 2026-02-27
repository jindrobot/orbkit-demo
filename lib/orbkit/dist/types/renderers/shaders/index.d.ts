/**
 * Shader source strings for the WebGL renderer.
 *
 * The canonical shader source lives in the .glsl files alongside this module
 * (orb.vert.glsl, orb.frag.glsl) for syntax highlighting and GLSL tooling.
 * Bun's --loader .glsl:text flag imports them as raw strings at build time.
 */
/** Fullscreen triangle vertex shader for WebGL2 (uses gl_VertexID, no buffers needed) */
export { default as VERTEX_SHADER_WEBGL2 } from './orb.vert.glsl';
/** Fullscreen triangle vertex shader for WebGL1 (requires a_position attribute buffer) */
export declare const VERTEX_SHADER_WEBGL1 = "\nattribute vec2 a_position;\nvoid main() {\n  gl_Position = vec4(a_position, 0.0, 1.0);\n}\n";
/** Complete fragment shader for WebGL2 (GLSL ES 3.00) */
export declare const FRAGMENT_SHADER_WEBGL2: string;
/** Complete fragment shader for WebGL1 (GLSL ES 1.00) */
export declare const FRAGMENT_SHADER_WEBGL1: string;
//# sourceMappingURL=index.d.ts.map