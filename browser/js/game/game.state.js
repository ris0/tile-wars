app.config(function ($stateProvider) {
    $stateProvider.state('game', {
        url: '/',
        templateUrl: 'js/game/game.html',
        controller: 'gameCtrl'
    });
});