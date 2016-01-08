/**
 * @class Shader
 */
export default class Shader {
  /**
   * @constructs Shader
   * @param {WebGLRenderingContext} gl
   * @param {uint} type - gl.VERTEX_SHADER or gl.FRAGMENT_SHADER 
   * @param {string} src
   */
  constructor(gl, type, src) {
    this.gl = gl;

    this.shader = this.gl.createShader(type);

    this.gl.shaderSource(this.shader, src);
    this.gl.compileShader(this.shader);

    if(!this.gl.getShaderParameter(this.shader, this.gl.COMPILE_STATUS)) {
      throw('Error while compiling shader: ' + this.gl.getShaderInfoLog(this.shader));
    }
  }

  /**
   * @method dispose
   * @public
   */
  dispose() {
    this.gl.deleteShader(this.shader);
    this.shader = null;

    this.gl = null;
  }
}

