/*
 * File: Camera.js
 *
 * Инкапсулирует вид и Viewport функциональность
 */

"use strict"; // Работа в строгом режиме, в котором переменные должны быть объявлены до использования

// wcCenter: положение камеры
// target: точка, куда направлена камера
// viewportRect: массив из 4-х элементов
//      [0] [1]: (x,y) позиция левого нижнего угла холста (в пикселях)
//      [2]: ширина viewport'а
//      [3]: высота viewport'а
function Camera(wcCenter, target, viewportArray) {
    // WC and viewport position and size
    this.mWCCenter = wcCenter;
    this.mTarget = target;
    this.mViewport = viewportArray;  // [x, y, width, height]
    this.mNearPlane = 0.1;
    this.mFarPlane = 1000.0;

    // transformation matrices
    this.mViewMatrix = mat4.create();
    this.mProjMatrix = mat4.create();
    this.mVPMatrix = mat4.create();

    // background color
    this.mBgColor = [0.294, 0.352, 0.364, 1]; // RGB and Alpha
}

// Public Methods

// Getter/Setter для WC и viewport'а
Camera.prototype.setWCCenter = function (xPos, yPos, zPos) {
    this.mWCCenter[0] = xPos;
    this.mWCCenter[1] = yPos;
    this.mWCCenter[2] = zPos;
};
Camera.prototype.getWCCenter = function () { return this.mWCCenter; };
Camera.prototype.setWCWidth = function (width) { this.mWCWidth = width; };

Camera.prototype.setViewport = function (viewportArray) { this.mViewport = viewportArray; };
Camera.prototype.getViewport = function () { return this.mViewport; };

// Getter/Setter для цвета фона
Camera.prototype.setBackgroundColor = function (newColor) { this.mBgColor = newColor; };
Camera.prototype.getBackgroundColor = function () { return this.mBgColor; };

// Getter для View-Projection оператора
Camera.prototype.getVPMatrix = function () {
    return this.mVPMatrix;
};

// Инициализация камеры для начала рисования
Camera.prototype.setupViewProjection = function () {

    var gl = Core.getGL();

    // Настроить и очистить ViewPort
    gl.viewport(this.mViewport[3],  // x координата нижнего левого угла области рисования
            this.mViewport[0],      // y координата нижнего левого угла области рисования
            this.mViewport[2],      // ширина области рисования
            this.mViewport[3]);     // высота области рисования
    // Определяем область очистки
    gl.scissor(this.mViewport[3], // x координата нижнего левого угла области очистки
               this.mViewport[0], // y координата нижнего левого угла области очистки
               this.mViewport[2], // ширина области области очистки
               this.mViewport[3]);// высота области области очистки
    // Устанавливаем цвет очистки
    gl.clearColor(this.mBgColor[0], this.mBgColor[1], this.mBgColor[2], this.mBgColor[3]);
    // Активируем указанную обасть
    gl.enable(gl.SCISSOR_TEST);
    // Очищаем указанную область
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Диактивируем указанную область
    gl.disable(gl.SCISSOR_TEST);

    // Настраиваем View-Projection оператор
    //
    // Определяем матрицу вида
    mat4.lookAt(this.mViewMatrix,
        [this.mWCCenter[0], this.mWCCenter[0], this.mWCCenter[0]],      // Положение камеры
        [this.mTarget[1], this.mTarget[1], this.mTarget[2]],   // Точка куда направлена камера
        [5, 0, 1]);     // Ориентация камеры

    var aspect = this.mViewport[2] / this.mViewport[3]; // viewportW/viewportH
    mat4.perspective(this.mProjMatrix, 60.0 * (Math.PI / 180.0), aspect, this.mNearPlane, this.mFarPlane);

    mat4.multiply(this.mVPMatrix, this.mProjMatrix, this.mViewMatrix);
};
