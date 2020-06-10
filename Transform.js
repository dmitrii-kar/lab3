/*
 * File: Transform.js
 *
 * Данный класс инкапсулирует матричные трансформации
 */

"use strict"; // Работа в строгом режиме, в котором переменные должны быть объявлены до использования

function Transform() {
    this.mPosition = vec3.fromValues(0, 0, 0); // Перенос
    this.mScale = vec3.fromValues(1, 1.7, 1); // ширина (x), высота (y) и глубина (z)
    this.mRotationInRad = 0.0; // в радианах!
    this.mAxis = [1, 0, 1]; // Ось, вокруг которого нужно поворачивать
}

// Публичные методы

// Setter/Getter методы для позиционирования
Transform.prototype.setPosition = function(xPos, yPos, zPos) {
    this.setXPos(xPos);
    this.setYPos(yPos);
    this.setZPos(zPos);
};
Transform.prototype.getPosition = function() {
    return this.mPosition;
};

Transform.prototype.getXPos = function() {
    return this.mPosition[0];
};
Transform.prototype.setXPos = function(xPos) {
    this.mPosition[0] = xPos;
};
Transform.prototype.incXPosBy = function(delta) {
    this.mPosition[0] += delta;
};

Transform.prototype.getYPos = function() {
    return this.mPosition[1];
};
Transform.prototype.setYPos = function(yPos) {
    this.mPosition[1] = yPos;
};
Transform.prototype.incYPosBy = function(delta) {
    this.mPosition[1] += delta;
};

Transform.prototype.getZPos = function() {
    return this.mPosition[2];
};
Transform.prototype.setZPos = function(zPos) {
    this.mPosition[2] = zPos;
};
Transform.prototype.incZPosBy = function(delta) {
    this.mPosition[2] += delta;
};

// Setter/Getter методы для задания размера
Transform.prototype.setSize = function(width, height, depth) {
    this.setWidth(width);
    this.setHeight(height);
    this.setDepth(height);
};
Transform.prototype.getSize = function() {
    return this.mScale;
};
Transform.prototype.incSizeBy = function(delta) {
    this.incWidthBy(delta);
    this.incHeightBy(delta);
};

Transform.prototype.getWidth = function() {
    return this.mScale[0];
};
Transform.prototype.setWidth = function(width) {
    this.mScale[0] = width;
};
Transform.prototype.incWidthBy = function(delta) {
    this.mScale[0] += delta;
};

Transform.prototype.getHeight = function() {
    return this.mScale[1];
};
Transform.prototype.setHeight = function(height) {
    this.mScale[1] = height;
};
Transform.prototype.incHeightBy = function(delta) {
    this.mScale[1] += delta;
};

Transform.prototype.getDepth = function() {
    return this.mScale[2];
};
Transform.prototype.setDepth = function(depth) {
    this.mScale[2] = depth;
};
Transform.prototype.incDepthBy = function(delta) {
    this.mScale[2] += delta;
};

// Setter/Getter методы для задания поворота
Transform.prototype.setRotationInRad = function(rotationInRadians, axis) {

    this.mAxis = axis;
    this.mRotationInRad = rotationInRadians;
    while (this.mRotationInRad > (2 * Math.PI)) {
        this.mRotationInRad -= (2 * Math.PI);
    }
};
Transform.prototype.setRotationInDegree = function(rotationInDegree, axis) {
    this.setRotationInRad(rotationInDegree * Math.PI / 180.0, axis);
};
Transform.prototype.incRotationByDegree = function(deltaDegree, axis) {
    this.incRotationByRad(deltaDegree * Math.PI / 180.0, axis);
};
Transform.prototype.incRotationByRad = function(deltaRad, axis) {
    this.setRotationInRad(this.mRotationInRad + deltaRad, axis);
};
Transform.prototype.getRotationInRad = function() {
    return this.mRotationInRad;
};
Transform.prototype.getRotationInDegree = function() {
    return this.mRotationInRad * 180.0 / Math.PI;
};

// Возвращает матрицу, которая объединяет все три вида трансформаций
Transform.prototype.getXform = function() {

    // Создаём единичную матрицу
    var matrix = mat4.create();

    // Матрицы, которые использует WebGL, транспонированные, поэтому типичные
    // операции с матрицами должны идти в обратном порядке

    // Расчитываем перемещение
    mat4.translate(matrix, matrix, vec3.fromValues(this.getXPos(), this.getYPos(), this.getZPos()));
    // Объединяем перемещение и вращение в одну матрицу
    mat4.rotate(matrix, matrix, this.getRotationInRad(), this.mAxis);
    // Объединяем предыдущую матрицу с матрицей масштабирования
    mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), this.getDepth()));

    return matrix;
};
