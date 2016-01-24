Template.taskPage.helpers({
    /*methodName: function () {
      // do
    }*/
    task: function(){
        return Tasks.findOne({_id: Session.get("taskId")});
    },
    getChildTask: function(taskId){
        return Tasks.findOne({_id: taskId, owner: Meteor.userId()})
    },
    isClockedIn: function(){
        return this.clockIn[this.clockIn.length-1].punchOut === -1;
    },
    anyClockIns: function(){
        return Session.get("activeClockIns");
        /*return this.clockIn.map(function(n){
            return n.punchOut;
        }).sort() < 0*/
    }
});

Template.taskPage.events({
    /*'click thing': function () {
      // do thing when 'click thing' happens
    }*/
    'click span.clockOut': function(){
        var task = Tasks.findOne({_id: Session.get("taskId")});
        task.clockIn = task.clockIn.map(function(punch){
            if ( punch.punchOut === -1 ){
                punch.punchOut = new Date();
            }
            return punch;
        });
        // WARNING: INSECURE
        Tasks.update({_id: Session.get("taskId")}, task);
        Session.set("activeClockIns", false);
    },
    
    'click span.clockIn': function(){
        var task = Tasks.findOne({_id: Session.get("taskId")});
        task.clockIn.push({
            punchIn: new Date(),
            punchOut: -1
        });
        // WARNING: INSECURE
        Tasks.update({_id: Session.get("taskId")}, task);
        Session.set("activeClockIns", true);
    }
});

Template.taskDescription.helpers({
    optionsHelper: function(){
        return {
            collection: "deadline_tasks",
            field: "desc",
            acceptEmpty: true,
            placeholder: "Enter description",
            textarea: true,
            removeEmpty: false,
            substitute: 'Enter description'
        }
    }
});

Template.clockInList.helpers({
    /**
     * Check if user is currently clocked in.
     */
    userIsClockedIn: function(){
        return this.punchOut === -1;
    },
    
    /**
     * Formats the clock-in time.
     */
    formatTime: function(date){
        return date.toLocaleString()
    },
    
    /**
     * Calculates the amount of time clocked in.
     */
    timeInterval: function(){
        return Math.floor((Session.get("currentTime") - this.punchIn)/1000 );
    },
    
    optionsHelper: function(){
        return {
            collection: "deadline_tasks",
            field: "clockIn.notes",
            acceptEmpty: true,
            placeholder: "Enter notes",
            substitute: "Enter notes",
            removeEmpty: false
        }
    }
    
});

Template.clockInList.events({
    'click span.punchNotes': function(event){
        event.preventDefault();
        event.currentTarget.hidden = true;
        textarea = document.getElementsByClassName("punchNotesText")
        textarea.hidden = false;
    }
})

Template.punchButton.helpers({
    anyClockIns: function(){
        return Session.get("activeClockIns");
    }
});

Template.taskNotes.helpers({
    optionsHelper: function(){
        return {
                wysiwyg: true,
                textarea: true,
                collection: "deadline_tasks",
                field: "notes",
                acceptEmpty: true,
                placeholder: "Enter notes",
                substitute: "Enter notes",
                removeEmpty: false
        };
    }
})

Meteor.setInterval(function(){
    Session.set("currentTime", new Date())
}, 1000);


anyClockIns = function(clockIn){
    return clockIn.map(function(n){
        return n.punchOut;
    }).sort()[0] < 0
}