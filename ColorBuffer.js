/*
 * File: ColorBuffer.js
 *
 * Поддерживает создание буферного объекта для цветов в памяти видео карты и
 * загрузку цветов вершин в хранилище данных буферного объекта
 *
 * Заметка. Это синглтон объект
 */

"use strict"; // Работа в строгом режиме, в котором переменные должны быть объявлены до использования

var ColorBuffer = (function () {

    var mColorBuffer = null;    // Буфер объект для цветов вершин

    // Определяем цвета вершин
    var сolors = [
        0.2, 0.4, 0.1,
        0.2, 0.4, 0.1,
        0.2, 0.4, 0.1,
        0.2, 0.4, 0.1,
        0.2, 0.4, 0.1,
        0.2, 0.4, 0.1,
        0.2, 0.4, 0.1,
        0.2, 0.4, 0.1,


        1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, 1.0
    ];

    var initialize = function () {

        var gl = Core.getGL();

        // Создаём буфер на GL контексте в памяти видео карты
        mColorBuffer = gl.createBuffer();

        // Выполняем привязку буфера к GL контексту
        // Привязка означает, что все операции с буфером будут происходить
        // именно над созданным буферным объектом
        gl.bindBuffer(gl.ARRAY_BUFFER, mColorBuffer);

        // Загружаем данные в хранилище данных буферного объекта
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
    };

    var getGLBufferRef = function () { return mColorBuffer; };

    var mPublic = {
        initialize: initialize,
        getGLBufferRef: getGLBufferRef
    };

    return mPublic;
}());
