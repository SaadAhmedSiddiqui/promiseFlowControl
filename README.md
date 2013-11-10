Promise Flow Control
=

Utilities
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