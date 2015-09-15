angular.module('ionicInView', [])
.directive('inView', ['$rootScope', '$parse', function($rootScope, $parse) {
  function callFn($scope, fn, status) {
      fn && $scope.$apply(function() {
          fn($scope, {$status: status});
      });
  }    
    
  function defStatus(sElem, $element, $scope, fn) {
      var tElem = $element[0],
          sElemRect = sElem.getBoundingClientRect(),
          sTop = sElemRect.top,
          sHeight=sElemRect.height,
          tElemRect = tElem.getBoundingClientRect(),
          tTop = tElemRect.top,
          tHeight=tElemRect.height,
          tHeightM=tHeight/3,
          top = tTop - sTop;
      var status = $element.data('inview-status');

      //console.log('scroll:',sTop, sHeight, tTop,tHeight, top);
      if(top+tHeightM<0 || top>sHeight-(tHeightM*2)) {
          if(status!='out') {
              //console.log('saiu',$element.text().replace(/\s+/g,''));
              $element.data('inview-status','out');
              $element.removeClass('inview-in').addClass('inview-out');
              fn && callFn($scope, fn, 'out');
          }
      } else if (status!='in') {
          //console.log('entrou',$element.text().replace(/\s+/g,''));
          $element.data('inview-status','in');
          $element.removeClass('inview-out').addClass('inview-in');
          fn && callFn($scope, fn, 'in');
      }
  }
      
  return {
    require: '^$ionicScroll',
    restrict: 'A',
    link: function ($scope, $element, $attrs, scrollCtrl) {
      var sElem = scrollCtrl.element;
      var fn = $attrs.inView ? $parse($attrs.inView) : null;

      defStatus(sElem, $element, $scope, fn);
      scrollCtrl.$element.on('scroll', function(e){
          defStatus(sElem, $element, $scope, fn);
      });
    }
  };
}]);