/*
 * File: Renderable.js
 *
 * Класс объекта, который можно нарисовать на холсте
 *
 */

"use strict"; // Работа в строгом режиме, в котором переменные должны быть объявлены до использования

// Конструктор
function Renderable(shaderProgram) {
    this.mShaderProgram = shaderProgram;
    this.mXform = new Transform();
}

//**-----------------------------------------
// Публичные методы
//**-----------------------------------------
Renderable.prototype.draw = function (vpMatrix) {

    var gl = Core.getGL();
    this.mShaderProgram.activate(vpMatrix);
    this.mShaderProgram.loadObjectTransform(this.mXform.getXform());
    gl.drawElements(gl.LINES, 24, gl.UNSIGNED_SHORT, 0);
};

Renderable.prototype.getXform = function () { return this.mXform; };

//--- Конец секции публичных методов