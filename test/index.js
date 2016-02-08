import test from 'tape';
import getGl from '@vaalentin/gl-context';
import Shader from '../src';

const canvas = document.createElement('canvas');
const gl = getGl(canvas);

const vertexSrc = `
  attribute vec3 aPosition;

  void main() {
    gl_Position = vec4(aPosition, 1.0);
  }
`;

const fragmentSrc = `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(1.0);
  }
`;

const invalidSrc = `
  void main() {
  }
`

test('should be instanciable', t => {
  t.plan(1);

  const shader = new Shader(gl, gl.VERTEX_SHADER, vertexSrc);

  t.ok(shader instanceof Shader, 'instance of Shader');
});

test('should accept vertex and fragment shader', t => {
  t.plan(1);

  const vertexShader = new Shader(gl, gl.VERTEX_SHADER, vertexSrc);
  const fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, fragmentSrc);

  t.pass('success creating a vertex and fragment shader');
});

test('should throws with invalid source', t => {
  t.plan(1);

  t.throws(new Shader(gl, gl.VERTEX_SHADER, invalidSrc), Error, 'throws with invalid source');
})

test('should expose the WebGLShader', t => {
  t.plan(1);

  const shader = new Shader(gl, gl.VERTEX_SHADER, vertexSrc);

  t.ok(shader.shader instanceof WebGLShader, 'attribute shader is instance of WebGLShader');
});

test('should delete the WebGLShader when disposing', t => {
  t.plan(1);

  const shader = new Shader(gl, gl.VERTEX_SHADER, vertexSrc);
  shader.dispose();
  
  t.equal(shader.shader, null, 'shader deleted');
});

test.onFinish(window.close.bind(window));
