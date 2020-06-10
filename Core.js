/*
 * File: Core.js
 *
 * Core - синглтон объект для работы с WebGL
 * 
 */

"use strict"; // Работа в строгом режиме, в котором переменные должны быть объявлены до использования

var Core = (function() {

    // Графический контекст
    var mGL = null;

    //**----------------------------
    // Публичные методы:
    //**-----------------------------
    //
    // Aксессор к графическому контексту WebGL
    var getGL = function() {
        return mGL;
    };

    // Инициализация WebGL, буферных объектов, загрузка и компиляция шейдеров
    var initializeWebGL = function(htmlCanvasID) {
        
        var canvas = document.getElementById(htmlCanvasID);
        
        // Получаем ссылку на контекст webgl 2.0
        mGL = canvas.getContext("webgl2");
        if (mGL === null) {
            alert("Ваш браузер не поддерживает WebGL 2.0");
            return;
        }
        
        // Включаем алгоритм проверки глубины
        mGL.enable(mGL.DEPTH_TEST);

        // Инициализируем буферные объекты данными
        VertexBuffer.initialize();
        ColorBuffer.initialize();
        IndexBuffer.initialize();
    }

    // Очищаем область рисования указанным цветов
    var clearCanvas = function(color) {
        // Выставляем цвет, которым будет очищена область рисования
        mGL.clearColor(color[0], color[1], color[2], color[3]);
        // Очищаем область рисования цветом, который был установлен выше
        mGL.clear(mGL.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
    };

    // -- Конец определений публичных методов

    var mPublic = {
        getGL: getGL,
        initializeWebGL: initializeWebGL,
        clearCanvas: clearCanvas
    };

    return mPublic;
}());