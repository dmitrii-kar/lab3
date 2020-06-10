/*
 * File: Scene.js
 *
 * Содержимое и логика сцены
 *
 */

"use strict"; // Работа в строгом режиме, в котором переменные должны быть объявлены до использования

function Scene(htmlCanvasID) {

    // Переменная для кубика
    this.mCube0 = null;
    this.mCube1 = null;
    this.mCube2 = null;

    // Инициализируем WebGL контекст и буферные объекты
    Core.initializeWebGL(htmlCanvasID);

    // Инициализируем сцену
    this.initialize();
}

Scene.prototype.initialize = function () {

    // Создаём и настраиваем камеру
    this.mCamera = new Camera(
        vec3.fromValues(8, 5, 3),   // Позиция камеры
        vec3.fromValues(6, 4, -5), // Точка, куда направлена камера
        [60, 35, 360, 260]);        // viewport (orgX, orgY, width, height)

    // Устанавливаем цвет области ViewPort'а
    this.mCamera.setBackgroundColor([0.3, 0.3, 0.3, 1]);

    // Создаём шейдерную программу
    this.mShaderProgram = new ShaderProgram(
        "shader-vs",    // ID вершинного шейдера в теге html в index.html
        "shader-fs");   // ID фрагментного шейдера в теге html в index.html

    // Создаём объекты, которые будут нарисованы на холсте
    this.mCube0 = new Renderable(this.mShaderProgram);
    this.mCube1 = new Renderable(this.mShaderProgram)
    this.mCube2 = new Renderable(this.mShaderProgram);

    this.mCube1.getXform().setPosition(-7, 1, -3);
    this.mCube2.getXform().setPosition(7, 2.2, -3);

    // Запускаем главный цикл
    MainLoop.start(this);
};

Scene.prototype.draw = function() {

    // Очищаем весь холст указанным цветом
    Core.clearCanvas([1, 1, 1, 1]);

    // Активируем камеру
    this.mCamera.setupViewProjection();

    this.mCube0.draw(this.mCamera.getVPMatrix());
    this.mCube1.draw(this.mCamera.getVPMatrix());
    this.mCube2.draw(this.mCamera.getVPMatrix());
};

Scene.prototype.update = function () {

    // Первый кубик
    var cubeXform_0 = this.mCube0.getXform();
    cubeXform_0.incRotationByDegree(1, [0, 5, 0]);

    // Второй кубик
    var cubeXform_1 = this.mCube1.getXform();
    var deltaX_1 = 0.1;
    if (cubeXform_1.getXPos() > 9)
    {
        cubeXform_1.setPosition(-5, 1, -5);
    }
    cubeXform_1.incXPosBy(deltaX_1);
    cubeXform_1.incRotationByDegree(2, [1, 0, 0]);

    // Третий кубик
    var cubeXform_2 = this.mCube2.getXform();
    var deltaX_2 = 0.05;
    if (cubeXform_2.getYPos() >= 9)
    {
        cubeXform_2.setPosition(7, 2.2, -3);
    }
    cubeXform_2.incYPosBy(deltaX_2);
    cubeXform_2.incRotationByDegree(5, [1, 0, 0]);
};
