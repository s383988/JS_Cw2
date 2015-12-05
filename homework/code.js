(function (global) {
	var mapArray;

	if (!global.UAM) {
		global.UAM = {};
	}
    
    global.UAM.aircrafts = [];
    
    //////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////// Sample aircraft with sample service  /////////////// 
    
    global.UAM.aircrafts.push({
        code: 'SP-ABC',
        services: []
    });
    
    global.UAM.aircrafts[0].services.push({
        name: 'smth1',
        timeToExecute: 120
    });
    
    //////////////////////////////////////////////////////////////////////////////////////

//sprawdzenie czy samolot o danym kodzie jest w tablicy
//jeśli jest zwraca index

    checkId = function (AircraftCode) {
	for (var i = 0; i < global.UAM.aircrafts.length; i++) {
    		if (global.UAM.aircrafts[i].code === AircraftCode) 
			return i;
		
	}
       return null;
    };



    checkName = function (check, name, timeToExxecute) {
	for ( var i=0; i < global.UAM.aircrafts[check].services.length; i++) {
		if(global.UAM.aircrafts[check].services[i].name == name){
			global.UAM.aircrafts[check].services[i].timeToExecute = timeToExxecute
			return i;
		}
	}
	return null;	
    };

    global.UAM.addAircraft = function (newAircraftCode) {
	global.UAM.aircrafts.push({
        code: newAircraftCode,
        services: []
    	});
	var lastElem = global.UAM.aircrafts.length-1;
	return global.UAM.aircrafts[lastElem]
    };

    global.UAM.removeAircraft = function (aircraftObj) {
	 for (var i = 0; i < global.UAM.aircrafts.length; i++) {
    		if (global.UAM.aircrafts[i].code == aircraftObj.code){
			global.UAM.aircrafts.splice(i, 1);
	}
	}
      	
    };

    global.UAM.addWorkToAircraft = function(aircraftObj, name, timeToExxecute) {
	var check = checkId(aircraftObj.code);
	var checkN = checkName(check,name,timeToExxecute);
	
	if(checkN == null){
        global.UAM.aircrafts[check].services.push({
        name: name,
        timeToExecute: timeToExxecute
    	});
	}
    };
        
    global.UAM.reduceTimeToExecute = function(aircraftObj, time) {
        var check = checkId(aircraftObj.code);
	
	if(check != null && global.UAM.aircrafts[check].services != null){
	 for ( var i = 0; i < global.UAM.aircrafts[check].services.length; i++ ) {
		var savedTime = global.UAM.aircrafts[check].services[i].timeToExecute;
		if(savedTime != null && savedTime > 0)
			global.UAM.aircrafts[check].services[i].timeToExecute = savedTime - time;
	}
	
	}
	
    };
    
    global.UAM.getAircraftsForRepairs = function(maxTimeToExecute) {
	var results = [];
	var element = null;
	for (var i=0; i<global.UAM.aircrafts.length; i++) {
		for(var j=0; j< global.UAM.aircrafts[i].services.length ; j++) {
			if(global.UAM.aircrafts[i].services[j].timeToExecute < maxTimeToExecute)
				element = global.UAM.aircrafts[i];

		}
	results.push(element);

}
      return results;

    };

}(window));

/*

Przykład użycia:

var newAircraft1 = addAircraft('SP-XY1');
var newAircraft2 = addAircraft('SP-XY2');

addWorkToAircraft(newAircraft1, 'serviceXY1a', 110);
addWorkToAircraft(newAircraft1, 'serviceXY1b', 130);
reduceTimeToExecute(newAircraft1, 20);

var sxy2a = addWorkToAircraft(newAircraft2, 'serviceXY2a', 130);
var sxy2b = addWorkToAircraft(newAircraft2, 'serviceXY2b', 160);
reduceTimeToExecute(newAircraft2, 20);

getAircraftsForRepairs(100); // [ newAircraft1 ]

removeAircraft(newAircraft1);

getAircraftsForRepairs(100); // []

reduceTimeToExecute(newAircraft2, 20);

getAircraftsForRepairs(100); // [ newAircraft2 ]

*/
