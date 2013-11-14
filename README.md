Promise Flow Control
=
How to use (example use):
Using Promise and its flow

        var promise = new window.util.Promise( function ( success, failure ) {
        	setTimeout(function(){
        	if( 'I have a success'){
            	success("make a car");
        	} else{
        		failure("destroy car");
        	}
        } );
        
You can define flow of success or failure, success flow can have any arrangement depending on the return of success
        promise.successFlow( function ( result ) {
	        if ( result == "make a car" ) {
	            return ["makeEngine", "makeChasis", "paintIt"];
	        } else if ( result == "make half car" ) {
	            return ["makeChasis", "paintIt"];
	        } else if ( result == "paint it" ) {
	            return ["paintIt"];
	        } else {
	            return [];     //no exectution of roles
	        }
        } )

return of success will be passed to the function if defined in successFlow and success is called, 
these role will be called according to the arrangement defined in flows, roles can be defined like:
        b.role( "makeEngine", function ( result ) {
        console.log("makeEngine");
        } );
        
        b.role( "paintIt", function ( result ) {
        console.log("paintIt")
        } );
        
        b.role( "makeChasis", function ( result ) {
        console.log("makeChasis");
        } );
        
        
after calling all the roles its then will be called accordingly, like:
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
