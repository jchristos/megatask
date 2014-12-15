var Megatask = function() {
  function Megatask() {
    this.tasks = [];
    this.counter = 0;
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
        // localStorage.tasks will look something like this...
        // '[{"name": "task 1", "completed": "false"}]'
        self.tasks = JSON.parse(localStorage.tasks);
        for (var i=0; i < self.tasks.length; i++) {
          var taskToAppend = self.tasks[i];
          $('#tasks').append(createListItem(taskToAppend));
        }
      }
    }
    var addTask = function(taskName, taskCompleted) {
      taskCompleted = !!taskCompleted;
      self.counter++;
      var newTask = {
        id: self.counter,
        name: taskName,
        completed: taskCompleted
      };
      self.tasks.push(newTask);
      var newItem = createListItem(newTask);
      $('#tasks').append(newItem);
      saveTasks();
    };
    var createListItem = function(task) {
      var deleteButton, editButton, buttonGroup, label;
      label = '<label>' + task.name + '</label>';
      deleteButton = '<button class="btn btn-sm btn-danger"><i class="fa fa-trash-o fa-lg"></i></button>';
      editButton = '<button class="btn btn-sm btn-success">edit</button>';
      buttonGroup = '<div class="btn-group">' + deleteButton +
        editButton + '</div>';
      return '<li class="list-group-item" id="task_' + task.id + '"><div class="task">' +
        label + buttonGroup + '</div></li>';
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
    $('#tasks').on('click', 'button.btn-danger', function() {
      var listItem = $(this).closest('li');
      var id = listItem.attr('id');
      id = id.substring(id.lastIndexOf('_') + 1);
      for (var i=0; i < self.tasks.length; i++) {
        if (self.tasks[i].id.toString() === id) {
          self.tasks.splice(i, 1); // remove 1 item at index i
        }
      }
      listItem.remove();
      saveTasks();
    });

    loadTasks();
  }
  return Megatask;
}();

var megatask = new Megatask();
