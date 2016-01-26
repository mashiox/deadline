// Private Server Methods
Meteor.methods({
    updateTask: function(task){
        if ( task.owner == this.userId ){
            return Tasks.update({_id: task._id}, task);
        }
        return false;
    },
    
    insertNewTask: function( parentId = "" ){
        return Tasks.insert({
            title: "New subtask",
            desc: "",
            owner: this.userId,
            children: [],
            clockIn: [],
            notes: "",
            isChild: ( parentId ? true : false ),
            parent: parentId
        });
    },
    
    deleteTask: function(task){
        return Tasks.remove({_id: task._id});
    }
})

Meteor.publish("deadline_tasks", function(){
    return Tasks.find({owner: this.userId });
})