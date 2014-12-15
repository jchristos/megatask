var Megatask = function() {
  function Megatask() {
    this.tasks = [];
    var self = this;
    var addTask = function(taskName) {
        self.tasks.push(taskName);
        $('#tasks').append('<li class="list-group-item">' + taskName + '</li>');
    };

    $('#new_task').submit(function(ev) {  
      ev.preventDefault();
      var field = $(this.elements.task_name);
      addTask(field.val());
      field.val('');
    });
  }
  return Megatask;
}();

var megatask = new Megatask();
