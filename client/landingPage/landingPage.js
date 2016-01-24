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