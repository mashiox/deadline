Time = {
    day: 86400,     // seconds in a day
    hour: 3600,     // seconds in a hour
    minute: 60,     // seconds in a minute
    /**
     * Returns a string of the amount of time passed from seconds.
     */
    duration: function(diff){
        var days = Math.floor( diff/this.day );
      
        diff = ( diff - days*this.day > 0 ? diff - days*this.day : diff );
      
        var hours = Math.floor( diff/this.hour );
        diff = ( diff - hours*this.hour > 0 ? diff - hours*this.hour : diff );
        
        var minutes = Math.floor( diff/this.minute );
        diff = ( diff - minutes*this.minutes > 0 ? diff - minutes*this.minutes : diff )
        
        return days + ":" + this._pad(hours,2) + ":" + this._pad(minutes,2) + ":" + this._pad(Math.floor(diff),2);
    },
    _pad: function(n, max){
        str = n.toString();
        return str.length < max ? this._pad("0" + str, max) : str;
    }
}