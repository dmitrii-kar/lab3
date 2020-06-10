/* 
 * File: Shader.js
 * 
 * Класс для создания шейдерной программы
 *
 */
 
"use strict"; // Работа в строгом режиме, в котором переменные должны быть объявлены до использования

// Конструктор шейдера
function ShaderProgram(vertexShaderID, fragmentShaderID)
{
    this.mProgram = null;
    this.mModelTransform = null; // Ссылка на модельную матрицу трансформаций в вершинном шейдере
    this.mViewProjTransform = null; // Ссылка на матрицу View/Projection в вершинном шейдере

    var gl = Core.getGL();
    
    // Начало кода конструктора
    //
    // Загружаем и компилируем вершинный и фрагментный шейдеры
    var vertexShader = this._loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
    var fragmentShader = this._loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);
    
    // Создаём и линкуем шейдерную программу
    this.mProgram = gl.createProgram();
    gl.attachShader(this.mProgram, vertexShader);
    gl.attachShader(this.mProgram, fragmentShader);
    gl.linkProgram(this.mProgram);
    
    // Проверяем удачно ли прошла линковка
    if (!gl.getProgramParameter(this.mProgram, gl.LINK_STATUS)) {
        alert("Не удалось призвести линковку шейдеров");
        return null;
    }
    
    // Выполняем привязку буфера к GL контексту
    // Привязка означает, что все операции с буфером будут происходить
    // именно над созданным буферным объектом
    gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer.getGLBufferRef());

    // Настраиваем характеристики переменной-атрибута
    gl.vertexAttribPointer(
        0,          // Индекс переменой-атрибута в вершинном шейдере
        3,          // Число данных на одну вершину
        gl.FLOAT,   // Тип данных - FLOAT
        false,      // true - если значения нужно нормализовать
        0,          // Количество байт, которое нужно пропустить между элементами
        0);         // Сдвиг первого элемента в байтах
        
    // Выполняем привязку буфера к GL контексту
    // Привязка означает, что все операции с буфером будут происходить
    // именно над созданным буферным объектом
    gl.bindBuffer(gl.ARRAY_BUFFER, ColorBuffer.getGLBufferRef());

    // Настраиваем характеристики переменной-атрибута
    gl.vertexAttribPointer(
        1,          // Индекс переменой-атрибута в вершинном шейдере
        3,          // Число данных на одну вершину
        gl.FLOAT,   // Тип данных - FLOAT
        false,      // true - если значения нужно нормализовать
        0,          // Количество байт, которое нужно пропустить между элементами
        0);         // Сдвиг первого элемента в байтах

    this.mModelTransform = gl.getUniformLocation(this.mProgram, "uModelTransform");
    if (!this.mModelTransform)
    {
        alert("Не могу получить ссылку на uModelTransform из вершинного шейдера");
        return;
    }
    
    this.mViewProjTransform = gl.getUniformLocation(this.mProgram, "uViewProjTransform");
    if (!this.mViewProjTransform)
    {
        alert("Не могу получить ссылку на uViewProjTransform из вершинного шейдера");
        return;
    }
}

ShaderProgram.prototype.activate = function (vpMatrix) {
    
    var gl = Core.getGL();
    gl.useProgram(this.mProgram);
    gl.uniformMatrix4fv(this.mViewProjTransform, false, vpMatrix);
    // Активируем присваивание переменной-атрибута в вертексном шейдере
    gl.enableVertexAttribArray(0);
    // Активируем присваивание переменной-атрибута в вертексном шейдере
    gl.enableVertexAttribArray(1);
};

// Загружаем трансформации объекта (модельную матрицу) в вертексный шейдер
ShaderProgram.prototype.loadObjectTransform = function (modelTransform) {

    var gl = Core.getGL();
    gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
};

// Функция возвращает скомпилированный шейдер из dom-элемента
// id - это id скрипта в html-теге
ShaderProgram.prototype._loadAndCompileShader = function(htmlShaderID, shaderType) {
    
    // Получаем исходник шейдера из index.html
    var source = document.getElementById(htmlShaderID).innerHTML;

    var gl = Core.getGL();
    
    // Создаем шейдер по типу
    var shader = gl.createShader(shaderType);
    // Устанавливаем источник шейдера
    gl.shaderSource(shader, source);
    // Компилируем шейдер
    gl.compileShader(shader);

    // Проверяем на ошибки и возвращаем результат (null - если была ошибка)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Ошибка компиляции шейдера: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    
    return shader;
};