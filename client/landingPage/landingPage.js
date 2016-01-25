Template.landingPage.helpers({
    /*methodName: function () {
      // do
    }*/
});

Template.landingPage.events({
    /*'click thing': function () {
      // do thing when 'click thing' happens
    }*/
});

Template.taskList.helpers({
    task: function(){
        return Tasks.find({
            owner: Meteor.userId() 
        })
    },
    
    inactiveTask: function(taskId){
        return isTaskInactive(taskId);
    }
})
/*
Template.taskList.events({
    'click a.taskItem': function(event){
    }
})*/

Template.loggedIn.events({
    'click button.addTask': function(event){
        event.preventDefault();
        // WARNING: INSECURE
        return Tasks.insert({
            title: "New Task",
            desc: "",
            owner: Meteor.userId(),
            children: [],
            clockIn: [],
            notes: "",
            isChild: false,
            parent: ""
        });
    },
    
    'click button.clockOut': function(event){
        event.preventDefault();
        var tasks = Tasks.find({owner: Meteor.userId()});
        tasks = tasks.map( function(task){ 
            task.clockIn = task.clockIn.map(function(clock){
                clock.punchOut = clock.punchOut === -1 ? new Date() : clock.punchOut;
                return clock;
            })
            return task; 
        });
        // WARNING: INSECURE
        tasks.map( function(task){
            Tasks.update({_id: task._id}, task );
        });
    }
})

/**
 * Recursively finds if any active clock-ins are present.
 */
isTaskInactive = function(taskId){
    task = Tasks.findOne({_id: taskId});
    var res = task.clockIn.every(function(clock){
        return clock.punchOut !== -1;
    })
    if (!res) return res;
    return task.children.every( isTaskInactive );
} 

/**
 * Recursively finds the ancestor (root) task.
 */
findAncestor = function(taskId){
  task = Tasks.findOne({_id: taskId});
  if (task.parent) return findAncestor(task.parent);
  return taskId;
}

/**
 * Clocks out task with _id taskId and it's children.
 */
globalClockOut = function(taskId){
    var task = Tasks.findOne({_id: taskId});
    if (!task.clockIn.every( function(clock){return clock.punchOut !== -1})){
        task.clockIn = task.clockIn.map(function(clock){
            if (clock.punchOut === -1) clock.punchOut = new Date();
            return clock;
        });
        // WARNING: INSECURE
        Tasks.update({_id: task._id}, task);
    }
    task.children.forEach( globalClockOut );
}
