var Megatask = function() {
  function Megatask() {
    this.tasks = [];
    var self = this;
    var supportsStorage = function() {
      try {
        return 'localStorage' in window && window['localStorage'] != null;
      } catch(e) {
        return false;
      }
    };
    var loadTasks = function() {
      if (supportsStorage() && localStorage.tasks) {
        self.tasks = JSON.parse(localStorage.tasks);
      }
    }
    var addTask = function(taskName) {
        self.tasks.push(taskName);
        $('#tasks').append('<li class="list-group-item">' + taskName + '</li>');
        saveTasks();
    };
    var saveTasks = function() {
      if (supportsStorage()) {
        localStorage.tasks = JSON.stringify(self.tasks);
      }
    };

    $('#new_task').submit(function(ev) {
      ev.preventDefault();
      var field = $(this.elements.task_name);
      addTask(field.val());
      field.val('');
    });

    loadTasks();
  }
  return Megatask;
}();

var megatask = new Megatask();
