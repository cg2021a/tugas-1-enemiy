function main() {
    var canvas = document.getElementById('myCanvas');
    var gl = canvas.getContext('webgl');

    // Gambar sebelah kiri merupakan foto tampak depan atas
    // Gambar sebelah kanan merupakan foto tampak kiri atas

    const gambar_1 = {
        line_color_1: [0.910, 0.760, 0.500],
        line_color_2: [0.850, 0.707, 0.459],
        line_color_3: [0.800, 0.630, 0.336],

        line_point_a: [-0.250, 0.750],
        line_point_b: [-0.300, 0.900],
        line_point_c: [-0.800, 0.750],
        line_point_d: [-0.750, 0.900],
        line_point_e: [-0.245, 0.700],
        line_point_f: [-0.805, 0.700],
        line_point_g: [-0.300, 0.300],
        line_point_h: [-0.750, 0.300]

    };

    const gambar_2 = {
        line_color_1: [0.910, 0.760, 0.500],
        line_color_2: [0.850, 0.707, 0.459],
        line_color_3: [0.800, 0.630, 0.336],

        line_point_a: [0.300, 0.750],
        line_point_b: [0.350, 0.980],
        line_point_c: [0.800, 0.750],
        line_point_d: [0.750, 0.980],
        line_point_e: [0.800, 0.685],
        line_point_f: [0.300, 0.685],
        line_point_g: [0.350, 0.400],
        line_point_h: [0.750, 0.400]
    };

    const vertices = [
        ...gambar_1.line_point_a, ...gambar_1.line_color_1,
        ...gambar_1.line_point_b, ...gambar_1.line_color_1,
        ...gambar_1.line_point_c, ...gambar_1.line_color_1,

        ...gambar_1.line_point_d, ...gambar_1.line_color_1,
        ...gambar_1.line_point_b, ...gambar_1.line_color_1,
        ...gambar_1.line_point_c, ...gambar_1.line_color_1,

        ...gambar_1.line_point_a, ...gambar_1.line_color_3,
        ...gambar_1.line_point_c, ...gambar_1.line_color_3,
        ...gambar_1.line_point_g, ...gambar_1.line_color_3,

        ...gambar_1.line_point_c, ...gambar_1.line_color_3,
        ...gambar_1.line_point_g, ...gambar_1.line_color_3,
        ...gambar_1.line_point_h, ...gambar_1.line_color_3,

        ...gambar_1.line_point_a, ...gambar_1.line_color_2,
        ...gambar_1.line_point_e, ...gambar_1.line_color_2,
        ...gambar_1.line_point_c, ...gambar_1.line_color_2,

        ...gambar_1.line_point_c, ...gambar_1.line_color_2,
        ...gambar_1.line_point_f, ...gambar_1.line_color_2,
        ...gambar_1.line_point_e, ...gambar_1.line_color_2,

        // //gambar_2 Object
        ...gambar_2.line_point_a, ...gambar_2.line_color_1,
        ...gambar_2.line_point_b, ...gambar_2.line_color_1,
        ...gambar_2.line_point_c, ...gambar_2.line_color_1,

        ...gambar_2.line_point_d, ...gambar_2.line_color_1,
        ...gambar_2.line_point_b, ...gambar_2.line_color_1,
        ...gambar_2.line_point_c, ...gambar_2.line_color_1,

        ...gambar_2.line_point_a, ...gambar_2.line_color_3,
        ...gambar_2.line_point_c, ...gambar_2.line_color_3,
        ...gambar_2.line_point_g, ...gambar_2.line_color_3,

        ...gambar_2.line_point_c, ...gambar_2.line_color_3,
        ...gambar_2.line_point_g, ...gambar_2.line_color_3,
        ...gambar_2.line_point_h, ...gambar_2.line_color_3,

        ...gambar_2.line_point_a, ...gambar_2.line_color_2,
        ...gambar_2.line_point_f, ...gambar_2.line_color_2,
        ...gambar_2.line_point_c, ...gambar_2.line_color_2,

        ...gambar_2.line_point_c, ...gambar_2.line_color_2,
        ...gambar_2.line_point_f, ...gambar_2.line_color_2,
        ...gambar_2.line_point_e, ...gambar_2.line_color_2,
    ];

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = `
      attribute vec2 aPosition;
      attribute vec3 aColor;
      varying vec3 vColor;
      uniform float uChange;
      void main() {
          gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
          vColor = aColor;
      }`;

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexShaderSource = `
      attribute vec2 aPosition;
      attribute vec3 aColor;
      varying vec3 vColor;
      uniform float uChange;
      void main() {
          gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
          vColor = aColor;
      }`;

    var fragmentShaderSource = `
      precision mediump float;
      varying vec3 vColor;
      void main() {
          gl_FragColor = vec4(vColor, 1.0);
      }`;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);

    gl.useProgram(shaderProgram);

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);

    var speed = 0.0142;
    var change = 0;
    var uChange = gl.getUniformLocation(shaderProgram, "uChange");

    function moveVertices() {
        for (var j = 0; j < vertices.length; j += 5) {
            if (vertices[j] > 0) {
                if ((vertices[j + 1] >= 0.99 && vertices[j + 1] <= 1.0) || (vertices[j + 1] <= -0.99 && vertices[j + 1] >= -1.0)) {
                    speed *= -1;
                }
            }
        }

        for (var i = 0; i < vertices.length; i += 5) {
            if (vertices[i] > 0) {
                vertices[i + 1] += speed;
            }
        }
    }

    function render() {
        moveVertices();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        change = change + speed;
        gl.uniform1f(uChange, change);

        gl.clearColor(0.1, 0.1, 0.1, 0.2);
        gl.clear(gl.COLOR_BUFFER_BIT);
        var primitive = gl.TRIANGLES;
        var offset = 0;
        var nVertex = 36;
        gl.drawArrays(primitive, offset, nVertex);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render)
}