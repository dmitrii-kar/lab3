/*
 * File: IndexBuffer.js
 *
 * Поддерживает создание буферного объекта для индексов вершин в памяти
 * видео карты и загрузку цветов вершин в хранилище данных буферного объекта
 * 
 * Заметка. Это синглтон объект
 */

"use strict"; // Работа в строгом режиме, в котором переменные должны быть объявлены до использования

var IndexBuffer = (function () {
    
    var mIndexBuffer = null;    // Буфер объект для цветов вершин

    // Определяем цвета вершин
    var indices = [
        0, 1, 1, 2, 2, 3, 3, 0, 0, 4, 4, 5, 5, 6, 6,7, 7,4, 1, 5, 2, 6, 3, 7
    ];
    
    var initialize = function () {

        var gl = Core.getGL();

        // Создаём буфер на GL контексте в памяти видео карты
        mIndexBuffer = gl.createBuffer();
    
        // Выполняем привязку буфера к GL контексту
        // Привязка означает, что все операции с буфером будут происходить
        // именно над созданным буферным объектом
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mIndexBuffer);
    
        // Загружаем данные в хранилище данных буферного объекта
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    };

    var getGLBufferRef = function () { return mIndexBuffer; };

    var mPublic = {
        initialize: initialize,
        getGLBufferRef: getGLBufferRef
    };

    return mPublic;
}());