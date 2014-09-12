var mockAdminApp = angular.module('mockAdminApp', ['ui.bootstrap']);

mockAdminApp.controller("templateController", ['$scope', '$http', '$modal', function($scope, $http, $modal) {

  $scope.templates = [];
  $scope.mockingServiceEndpoints = properties.endpoints
  $scope.mockingServiceEndpoint = $scope.mockingServiceEndpoints[0];
  $scope.modalContent = {}
  
  var updateTemplateList = function() {
      $http({method: 'GET', url: $scope.mockingServiceEndpoint}).
        success(function(data, status, headers, config) {
          console.log(data);
          $scope.templates = data;

        }).
        error(function(data, status, headers, config) {
          $scope.templates = {}
          console.log(data);
          console.log(status);
        });
    }

    $scope.updateSelected = function() {
      console.log('updated');
      updateTemplateList();
    }

    $scope.switchEndpoint = function(endpoint) {
      console.log('Switching endpoint to: ' + endpoint);
      $scope.mockingServiceEndpoint = endpoint;
      updateTemplateList();
    }

    $scope.addNewEndpoint = function(endpoint) {
      console.log("adding new endpoint: " + endpoint);
      $scope.mockingServiceEndpoints.push(endpoint);
      $scope.mockingServiceEndpoint = endpoint;
      updateTemplateList();
    }

    $scope.setModalContent = function(content) {
      $scope.modalContent = content;
    }

  // load default data up front
  updateTemplateList();

  // Modal
  $scope.openModal = function (content, title) {

    var modalInstance = $modal.open({
      templateUrl: 'modalContent.html',
      controller: ModalInstanceCtrl,
      size: 'lg',
      resolve: {
        selectedTemplate: function () {
          return content;
        },
        title: function () {
          return title;
        }
      }
    });
  };
}]);

var ModalInstanceCtrl = function ($scope, $modalInstance, title, selectedTemplate) {

  $scope.title = title;
  $scope.selected = JSON.stringify(selectedTemplate, null, 4);

  $scope.ok = function () {
    $modalInstance.close();
  };
};
