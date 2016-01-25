Time = {
    day: 86400,     // seconds in a day
    hour: 3600,     // seconds in a hour
    minute: 60,     // seconds in a minute
    duration: function(diff){
        days = Math.floor( diff/this.day );
        diff = ( diff - days*this.day >= 0 ? diff - days*this.days : diff );
        
        hours = Math.floor( diff/this.hour );
        diff = ( diff - hours*this.hour >= 0 ? diff - hours*this.hour : diff );
        
        minutes = Math.floor( diff/this.minute );
        diff = ( diff - minutes*this.minutes > 0 ? diff - minutes*this.minutes : diff )
        
        return days + ":" + this._pad(hours,2) + ":" + this._pad(minutes,2) + ":" + this._pad(seconds,2);
    },
    _pad: function(n, max){
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }
}