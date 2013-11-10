
( function PromiseLibrary() {
    "use strict";

    window.util = window.util || {};       //defining NameSpace
    window.util.Promise = Promise;

    // ---- context is the context will found in every then ----
    function Promise( worker, context ) {
        var that = this;
        this._context = context;
        this._thens = [];

        function success( ) {
            var args = arguments, flow;

            if ( that._successFlow ) {
                flow = that._successFlow.apply( context, args ) || [];
                for ( i = 0; i < flow.length; i++ ) {
                    if ( that._rolesHash[flow[i]] ) {
                        that._rolesHash[flow[i]].apply( context, args );
                    } else {
                        if ( that._errorHandler ) that._errorHandler( "Role: " + flow[i] + " is not defined" );
                    }
                }
            }

            for (var i = 0; i < that._thens.length; i++) {
                args = [that._thens[i].success.apply( context, args )];
                that._thens.splice( i--, 1 );
            }
        }
        function failure( ) {
            var args = arguments, flow;

            if ( that._failureFlow ) {
                flow = that._failureFlow.apply( context, args ) || [];
                for ( i = 0; i < flow.length; i++ ) {
                    if ( that._rolesHash[flow[i]] ) {
                        that._rolesHash[flow[i]].apply( context, args );
                    } else {
                        if ( that._errorHandler ) that._errorHandler( "Role: " + flow[i] + " is not defined" );
                    }
                }
            }

            for ( var i = 0; i < that._thens.length; i++ ) {
                args = [that._thens[i].failure.apply( context, args )];
                that._thens.splice( i--, 1 );
            }
        }
        setTimeout( function () {
            worker.call( context, success, failure );
        }, 0 );
        this.resolve = success;
        this.reject = failure;
    }

    // **************--- Interface Methods ---************** \\
    Promise.prototype.then = function ( success, failure ) {
        if ( success instanceof Function ) {
            if ( !( failure instanceof Function ) ) {
                failure = function ( arg ) { return arg; };
            }
            this._thens.push( { success: success, failure: failure } );
        }
        return this;
    }

    Promise.prototype.successFlow = function ( flowExtractor ) {
        this._successFlow = flowExtractor;
        return this;
    }

    Promise.prototype.failureFlow = function ( flowExtractor ) {
        this._failureFlow = flowExtractor;
        return this;
    }

    Promise.prototype.role = function ( roleName, worker ) {
        this._rolesHash[roleName] = worker;
        return this;
    }

    Promise.prototype._rolesHash = {};

    Promise.prototype.onError = function ( errorHandler ) {
        this._errorHandler = errorHandler;
        return this;
    }
    // ************************************************* \\
    
    

} )();

( function testing() {
    var b = new window.util.Promise( function ( success, failure ) {
        setTimeout( function () {
            success( "I found him", "g" );
        }, 100 );

        setTimeout( function () {
            failure( "bad1", "b" );
        }, 100 );

    } ).successFlow( function ( succesReturn1, successReturn2 ) {
        if ( succesReturn1 == "I found him" ) {
            return ["addUser", "findMore"];
        } else if ( succesReturn1 == "I lost him" ) {
            return ["find from server", "authenticate", "addUser"];
        } else if ( succesReturn1 == "find many" ) {
            return ["find from server", "authenticate", "findMore", "addUser"];
        } else {
            return [];     //no exectution of roles
        }
    } ).onError( function (error) {
        console.log( error );
    } );

    b.role( "find from server", function ( succesReturn1, successReturn2 ) {
        console.log("find from server");
    } );

    b.role( "authenticate", function ( succesReturn1, successReturn2 ) {
        console.log("authenticate")
    } );

    b.role( "addUser", function ( succesReturn1, successReturn2 ) {
        console.log("addUser");
    } );

    b.role( "findMore", function ( succesReturn1, successReturn2 ) {
        console.log("findMores");
    } );


    b.then( function ( str ) {
        console.log( str );
        return "good2";
    },
    function ( str ) {
        console.log( str );
        return "bad2";
    } ).then( function ( str ) {
        console.log( str );
        return "good3";
    },
    function ( str ) {
        console.log( str );
        return "bad3";
    } );

    b.then( function ( str ) {
        console.log( str );
    },
    function ( str ) {
        console.log( str );
    } );

} )();