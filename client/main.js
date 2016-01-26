/*
Template.TEMPNAME.helpers({
    methodName: function () {
      // do
    }
});

Template.TEMPNAME.events({
    'click thing': function () {
      // do thing when 'click thing' happens
    }
});
*/

/**
 * Iron:Router Configuration
 */
Router.configure({
    layoutTemplate: 'ApplicationLayout',
    
    waitOn: function(){
        Meteor.subscribe("deadline_tasks");
        return;
    }
});

/**
 * Iron:Router 
 *   ---Landing Page
 */
Router.route("/", function(){
    this.render("navbar", {to: "header"});
    this.render("landingPage", {to: "main"});
});

/**
 * Iron:Router
 *   ---Task Page
 */
Router.route("/task/:_id", {
    waitOn: function(){
        Meteor.subscribe("deadline_tasks");
        return;
    },
    
    action: function(){
        this.render("navbar", {to: "header"});
        if (Meteor.user()){
            Session.set("taskId", this.params._id);
            var task = Tasks.findOne({_id: this.params._id});
            //var activeClocks = anyClockIns(task.clockIn);   // defined in taskPage.js
            var ancestorId = findAncestor(this.params._id);
            var activeClocks = !isTaskInactive(ancestorId);
            Session.set("activeClockIns", activeClocks);
            this.render("taskPage", {to: "main"});
        }
        else {
            this.render("landingPage", {to: "main"});
        }
    }
});
/**
 * End of Iron:Router
 */
