var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');

function TaskList(taskDao) {
  this.taskDao = taskDao;
}

TaskList.prototype = {
  showTasks: function (req, res) {
    var self = this;

    var querySpec = {
      query: 'SELECT * FROM root r',
      parameters: [{
        name: '@completed',
        value: false
      }]
    };

    self.taskDao.find(querySpec, function (err, items) {
      if (err) {
        throw (err);
      }

      res.render('index', {
        title: 'My ToDo Lists Yo ',
        tasks: items
      });
    });
  },

  addTask: function (req, res) {
    var self = this;
    var item = req.body;

    self.taskDao.addItem(item, function (err) {
      if (err) {
        throw (err);
      }

      res.redirect('/');
    });
  },

  justGet: function (req, res) {
    var self = this;

    var querySpec = {
      query: 'SELECT * FROM root r',
      parameters: [{
        name: '@completed',
        value: false
      }]
    };

    self.taskDao.find(querySpec, function (err, items) {
      if (err) {
        throw (err);
      }

      res.send(items);
    });
  },

  getLocation: function (req, res) {
    var self = this;

    self.taskDao.getLocation(req.query.sender, function (err, items) {
      if (err) {
        throw (err);
      }

      res.send(items);
    });
  },

  completeTask: function (req, res) {
    var self = this;
    var completedTasks = Object.keys(req.body);

    async.forEach(completedTasks, function taskIterator(completedTask, callback) {
      self.taskDao.updateItem(completedTask, function (err) {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    }, function goHome(err) {
      if (err) {
        throw err;
      } else {
        res.redirect('/');
      }
    });
  }
};

module.exports = TaskList;
