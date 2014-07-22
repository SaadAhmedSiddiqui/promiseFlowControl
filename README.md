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
	} );

return of success will be passed to the function if defined in successFlow and success is called, 
these role will be called according to the arrangement defined in flows, roles can be defined like:

        promise.role( "makeEngine", function ( result ) {
        	console.log("makeEngine");
        } );
        
        promise.role( "paintIt", function ( result ) {
        	console.log("paintIt")
        } );
        
        promise.role( "makeChasis", function ( result ) {
        	console.log("makeChasis");
        } );
        
        
after calling all the roles its then will be called accordingly, like:

        promise.then( function ( str ) {
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
        
        promise.then( function ( str ) {
        	console.log( str );
        },
        function ( str ) {
        	console.log( str );
        } );

Asynchronous Function Worker
=
worker which executes your given function with the given context and given arguments

	var worker = util.AsyncCaller();
	worker( context, arguments, function, successCallback, errorCallback );
	
arguments and context cannot contain function, because functions does not carry
sample use:

	var worker = util.AsyncCaller();
	var arr = [2,5,-13];
	var doSum = function(arr, mult){
		for(var i = 0; i< arr.length; i++){
			this.sum = += arr[i];
		}
		return this.sum * mult;
	}
	var callback = function(result){
		console.log(result);		//-60
	}
	errorCallback = function(e){
		console.log(e);
	}
	worker( {sum:0}, [arr, 10], doSum, callback, errorCallback );
	
Sequence Flow
=

    util.sequence(function(callback){

        setTimeout(function(){
            callback(null,"success");

        }, 100);
    },
    function(callback){

        callback(null,"success2");
    },
    function(callback){
        setTimeout(function(){

        	callback(null,{g:5});
        },700);
        
    }).then(function(data1, data2, data3){
        return
    }, function(err){
        return;
    }).then(function(data1, data2, data3){
        return;
    }, function(err){
        return;
    });
    
