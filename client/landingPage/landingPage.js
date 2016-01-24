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
            notes: ""
        });
    },
    
    'click button.clockOut': function(event){
        event.preventDefault();
        var tasks = Tasks.find({owner: Meteor.userId()});
        tasks = tasks.map( function(task){ 
            task.clockIn = task.clockIn.map(function(clock){
                clock.punchOut = clock.punchOut === -1 ? new Date() : clock.punchOut;
                console.log(clock.punchOut);
                return clock;
            })
            return task; 
        });
        console.log("whole tasks object:")
        console.log(tasks);
        // WARNING: INSECURE
        tasks.map( function(task){
            Tasks.update({_id: task._id}, task );
        });
    }
})