Todos.TodoController = Ember.ObjectController.extend({
  isCompleted: function(key, value) {
    var model = this.get('model');

    if (value === undefined) {
      // property being used is a getter
      return model.get('isCompleted');
    } else {
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property('model.isCompleted'),

  actions: {
    editTodo: function() {
      this.set('isEditing', true);
    },
    acceptChanges: function() {
      this.set('isEditing', false);

      if (Ember.isEmpty(this.get('model.title'))) {
        this.send('removeTodo');
      } else {
        this.get('model').save();
      }
    },
    removeTodo: function() {
      var model = this.get('model')
      model.deleteRecord();
      model.save();
    }
  },

  isEditing: false,
});

