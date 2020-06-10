/*
 * File: VertexBuffer.js
 *
 * Поддерживает создание буферного объекта для координат вершин в памяти
 * видео карты и загрузку координат вершин в хранилище данных буферного объекта
 *
 * Заметка. Это синглтон объект
 */

"use strict"; // Работа в строгом режиме, в котором переменные должны быть объявлены до использования

var VertexBuffer = (function () {

    var mVertexBuffer = null;   // Буферный объект для координат вершин

    // Определяем координаты вертексов
    var vertices = [
        // лицевая часть
        -1.5, -1.5, 1.5,
        -1.5, 0.5, 0.5,
         0.5, 0.5, 0.5,
         0.5, -0.5, 0.5,
        // задняя часть
        -1.5, -1.5, -1.5,
        -1.5, 0.5, -0.5,
         0.5, 0.5, -0.5,
         0.5, -0.5, -0.5
    ];

    var initialize = function () {

        var gl = Core.getGL();

        // mVertexBuffer буфер на GL контексте в памяти видео карты
        mVertexBuffer = gl.createBuffer();

        // Выполняем привязку буфера к GL контексту
        // Привязка означает, что все операции с буфером будут происходить
        // именно над созданным буферным объектом
        gl.bindBuffer(gl.ARRAY_BUFFER, mVertexBuffer);

        // Загружаем данные в хранилище данных буферного объекта
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    };

    var getGLBufferRef = function () { return mVertexBuffer; };

    var mPublic = {
        initialize: initialize,
        getGLBufferRef: getGLBufferRef
    };

    return mPublic;
}());
