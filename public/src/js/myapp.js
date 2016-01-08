// Parameters
var myApp = angular.module('MyApp', ['ngRoute']);

// ===============================================================
// Configuration
// ===============================================================
 
myApp.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
	// Route
	$routeProvider.
	when('/', {
		templateUrl: '/dist/themes/home.html',
		controller: 'homeCtrl'
	}).
	when('/post/:postId', {
		templateUrl: '/dist/themes/post.html',
		controller: 'postCtrl'
	}).
	otherwise({
		redirectTo: '/'
	});
 //    $locationProvider.html5Mode({
	//   enabled: true,
	//   requireBase: false
	// });
}]);

// ===============================================================
// Controller
// ===============================================================

myApp.controller('postCtrl', ['$scope','$routeParams','$http', function($scope, $routeParams, $http){
  	var req_postId = $routeParams.postId;
	$scope.headline = 'Post Content';
	$http.get('/api/post/'+req_postId).success(function(data, status, headers, config) {
		$scope.post_id = data.response._id;
		$scope.post_title = data.response.title;
	});
}]);

myApp.controller('homeCtrl', ['$scope','$http','magnificPopup', function($scope, $http, magnificPopup){
	$scope.headline = 'Welcome Home';
	$http.get('/api/post').success(function(data, status, headers, config) {
		$scope.posts_enties = data.response;
	});
	$scope.openPost = function(event) {
		var nodeValue = event.target.attributes[0].nodeValue;
		return magnificPopup._open(nodeValue);
	}
}]);

// ===============================================================
// Services
// ===============================================================

// open post content in popup when clicked
myApp.service('magnificPopup', function(){
    this._open = function(postUrl) {
    	$.magnificPopup.open({
	        items: {
	            src: postUrl,
	            type: 'ajax',
	        },
	        closeOnContentClick : false, 
	        closeOnBgClick :true, 
	        showCloseBtn : false, 
	        enableEscapeKey : false,
	        closeMarkup: '<button class="mfp-close mfp-new-close" type="button" title="Close (Esc)"> { costume button with close icon image } </button>'
	    });
    };   
});
