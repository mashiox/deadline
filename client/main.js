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
        // TODO: Subscribe
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
        // TODO: Subscribe
        return;
    },
    
    action: function(){
        // TODO: Grab task by user and ID
        this.render("navbar", {to: "header"});
        if (Meteor.user()){
            Session.set("taskId", this.params._id);
            var task = Tasks.findOne({_id: this.params._id});
            var activeClocks = anyClockIns(task.clockIn);   // defined in taskPage.js
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
