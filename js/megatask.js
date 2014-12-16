var Megatask = function() {
  function Megatask() {
    this.tasks = [];
    this.counter = 0;
    var self = this;
    var supportsStorage = function() {
      try {
        return 'localStorage' in window &&
        window['localStorage'] != null;
      } catch(e) {
        return false;
      }
    };
    var loadTasks = function() {
      if (supportsStorage() && localStorage.tasks) {
        // localStorage.tasks will be a string, looking
        // something like this...
        // '[{"name": "task 1", "completed": "false"}]'
        self.tasks = JSON.parse(localStorage.tasks);
        for (var i=0; i < self.tasks.length; i++) {
          var taskToAppend = self.tasks[i];
          $('#tasks').append(createListItem(taskToAppend));
          if (taskToAppend.id > self.counter) {
            self.counter = taskToAppend.id;
          }
        }
      }
    };
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
      editButton = '<button class="btn btn-sm btn-success edit">Edit</button>';
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

    var getListItemFromButton = function(button) {
      return $(button).closest('li');
    };

    var getTaskIdFromListItem = function(listItem) {
      var id = listItem.attr('id');
      return id.substring(id.lastIndexOf('_') + 1);
    };

    $('#new_task').submit(function(ev) {
      ev.preventDefault();
      var field = $(this.elements.task_name);
      addTask(field.val());
      field.val('');
    });

    $('#tasks').on('click', 'button.btn-danger', function() {
      var listItem = getListItemFromButton(this);
      var id = getTaskIdFromListItem(listItem);
      for (var i=0; i < self.tasks.length; i++) {
        if (self.tasks[i].id.toString() === id) {
          self.tasks.splice(i, 1); // remove 1 item at index i
        }
      }
      listItem.remove();
      saveTasks();
    });

    $('#tasks').on('click', 'button.edit', function() {
      var listItem = getListItemFromButton(this);
      var id = getTaskIdFromListItem(listItem);
      var editForm = $('.edit_task.hidden').clone();
      var task;
      for (var i=0; i < self.tasks.length; i++) {
        if (self.tasks[i].id.toString() === id) {
          task = self.tasks[i];
        }
      }
      editForm.find('input.task_name').val(task.name);
      editForm.removeClass('hidden');
      listItem.html(editForm);
    });

    var getTaskFromElement = function(element) {
      var id = getTaskIdFromListItem(element);
      var task;
      for (var i=0; i < self.tasks.length; i++) {
        if (self.tasks[i].id.toString() === id) {
          task = self.tasks[i];
        }
      }
      return task
    };

    $('#tasks').on('click', 'button.cancel', function(e) {
      e.preventDefault();
      var listItem = getListItemFromButton(this);
      var task = getTaskFromElement(listItem);
      listItem.replaceWith(createListItem(task));
    });

    $('#tasks').on('submit', '.edit_task', function(e) {
      e.preventDefault();
      var listItem = getListItemFromButton(this);
      var task = getTaskFromElement(listItem);
      task.name = $(this).find('.task_name').val();
      saveTasks();
      listItem.replaceWith(createListItem(task));
    });

    loadTasks();
  }
  return Megatask;
}();

var megatask = new Megatask();
