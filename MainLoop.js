/*
 * File: MainLoop.js
 *
 * Реализует функциональность бесконечного цикла для анимаций
 *
 * Заметка. Это синглтон объект
 */

var MainLoop = (function (){
    var kFPS = 120;          // Количество кадров в секунду
    var kMPF = 1000 / kFPS; // Интервал отрисовки кадров в миллисекундах

    // Переменные для корректировки работы главного цикла
    var mPreviousTime;
    var mLagTime;
    var mCurrentTime;
    var mElapsedTime;

    // Состояние цикла (запущен или остановлен)
    var mIsLoopRunning = false;

    var mScene = null;

    var _runLoop = function () {
        if (mIsLoopRunning) {

            // Чтобы снова была вызвана функция _runLoop
            requestAnimationFrame(function () { _runLoop.call(mScene); });

            // Вычисляем сколько миллисекунд прошло с прошлого вызова _runLoop
            mCurrentTime = Date.now();
            mElapsedTime = mCurrentTime - mPreviousTime;
            mPreviousTime = mCurrentTime;
            mLagTime += mElapsedTime;

            // Вызываем функцию update, которая находится на объекте класса Scene
            // Обновляем через тот интервал, который мы установили ранее
            while ((mLagTime >= kMPF) && mIsLoopRunning) {
                this.update();      // Вызываем Scene.update()
                mLagTime -= kMPF;
            }

            // Вызываем функцию update, которая находится на объекте класса Scene
            this.draw();
        }
    };

    var start = function (scene) {

        mScene = scene;

        // Сброс
        mPreviousTime = Date.now();
        mLagTime = 0.0;

        // Запоминаем, что цикл теперь запущен
        mIsLoopRunning = true;

        // Запускаем главный цикл
        requestAnimationFrame(function () { _runLoop.call(mScene); });
    };

    var mPublic = {
        start: start
    };
    return mPublic;
}());
