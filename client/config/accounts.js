Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'username',
        fieldLabel: 'Username',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction){
            if ( !value ){
                errorFunction("Please enter a username");
                return false;
            }
            return true;
        }
    }]
})