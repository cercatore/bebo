angular.module('app.blanotte', [])
  .controller('blaCtrl', function ($scope) {

      let self = this;

      self.update = () => {
        let ref = storageRef.child(self.path + "/" + self.filename);
      }


  });