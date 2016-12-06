$(document).ready(function() {
	var tag = 0;
	$wid1 = $("#myList").outerWidth();
	$wid2 = $("#myMain").outerWidth();
	$("#myCarousel").carousel('pause');
	$("#myCarousel2").carousel('pause');
	$("#myCarousel3").carousel('pause');
	$("#myBtn").click(function() {
		if (tag == 0)
		{
			$newWid = $wid1 + $wid2;
			$("#myList").animate({left: -$wid1});
			$("#myMain").animate({left: -$wid1});
			$("#myMain").css('width', $newWid);
			tag = 1;
		}
		else if (tag == 1)
		{
			$("#myList").animate({left:'0'});
			$("#myMain").animate({left:'0'}, function() {
				$("#myMain").css('width', $wid2);
			});
			tag = 0;
		}
	});
});

var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);

function MyController($scope, $http, $sce) {
	$scope.currentPage = 1;
	$scope.pageSize = 10;

	$scope.states = [
		{
		"name": "Alabama", "abbreviation": "AL"
		},
		{
		"name": "Alaska", "abbreviation": "AK"
		},
		{
		"name": "American Samoa", "abbreviation": "AS"
		},
		{
		"name": "Arizona", "abbreviation": "AZ"
		},
		{
		"name": "Arkansas", "abbreviation": "AR"
		},
		{
		"name": "California", "abbreviation": "CA"
		},
		{
		"name": "Colorado", "abbreviation": "CO"
		},
		{
		"name": "Connecticut", "abbreviation": "CT"
		},
		{
		"name": "Delaware", "abbreviation": "DE"
		},
		{
		"name": "District Of Columbia", "abbreviation": "DC"
		},
		{
		"name": "Federated States Of Micronesia", "abbreviation": "FM"
		},
		{
		"name": "Florida", "abbreviation": "FL"
		},
		{
		"name": "Georgia", "abbreviation": "GA"
		},
		{
		"name": "Guam", "abbreviation": "GU"
		},
		{
		"name": "Hawaii", "abbreviation": "HI"
		},
		{
		"name": "Idaho", "abbreviation": "ID"
		},
		{
		"name": "Illinois", "abbreviation": "IL"
		},
		{
		"name": "Indiana", "abbreviation": "IN"
		},
		{
		"name": "Iowa", "abbreviation": "IA"
		},
		{
		"name": "Kansas", "abbreviation": "KS"
		},
		{
		"name": "Kentucky", "abbreviation": "KY"
		},
		{
		"name": "Louisiana", "abbreviation": "LA"
		},
		{
		"name": "Maine", "abbreviation": "ME"
		},
		{
		"name": "Marshall Islands", "abbreviation": "MH"
		},
		{
		"name": "Maryland", "abbreviation": "MD"
		},
		{
		"name": "Massachusetts", "abbreviation": "MA"
		},
		{
		"name": "Michigan", "abbreviation": "MI"
		},
		{
		"name": "Minnesota", "abbreviation": "MN"
		},
		{
		"name": "Mississippi", "abbreviation": "MS"
		},
		{
		"name": "Missouri", "abbreviation": "MO"
		},
		{
		"name": "Montana", "abbreviation": "MT"
		},
		{
		"name": "Nebraska", "abbreviation": "NE"
		},
		{
		"name": "Nevada", "abbreviation": "NV"
		},
		{
		"name": "New Hampshire", "abbreviation": "NH"
		},
		{
		"name": "New Jersey", "abbreviation": "NJ"
		},
		{
		"name": "New Mexico", "abbreviation": "NM"
		},
		{
		"name": "New York", "abbreviation": "NY"
		},
		{
		"name": "North Carolina", "abbreviation": "NC"
		},
		{
		"name": "North Dakota", "abbreviation": "ND"
		},
		{
		"name": "Northern Mariana Islands", "abbreviation": "MP"
		},
		{
		"name": "Ohio", "abbreviation": "OH"
		},
		{
		"name": "Oklahoma", "abbreviation": "OK"
		},
		{
		"name": "Oregon", "abbreviation": "OR"
		},
		{
		"name": "Palau", "abbreviation": "PW"
		},
		{
		"name": "Pennsylvania", "abbreviation": "PA"
		},
		{
		"name": "Puerto Rico", "abbreviation": "PR"
		},
		{
		"name": "Rhode Island", "abbreviation": "RI"
		},
		{
		"name": "South Carolina", "abbreviation": "SC"
		},
		{
		"name": "South Dakota", "abbreviation": "SD"
		},
		{
		"name": "Tennessee", "abbreviation": "TN"
		},
		{
		"name": "Texas", "abbreviation": "TX"
		},
		{
		"name": "Utah", "abbreviation": "UT"
		},
		{
		"name": "Vermont", "abbreviation": "VT"
		},
		{
		"name": "Virgin Islands", "abbreviation": "VI"
		},
		{
		"name": "Virginia", "abbreviation": "VA"
		},
		{
		"name": "Washington", "abbreviation": "WA"
		},
		{
		"name": "West Virginia", "abbreviation": "WV"
		},
		{
		"name": "Wisconsin", "abbreviation": "WI"
		},
		{
		"name": "Wyoming", "abbreviation": "WY"
		}
	];

	$http({
		method: "GET",
		url: "http://app12016-env.us-west-1.elasticbeanstalk.com/loadData.php",
		params: {key: "legibystates"}
	}).then(function(response) {
		$scope.legibystates = response.data.results;
	});
	var storage = window.localStorage;
	$scope.favid = "favbefore";
	$scope.getLegi = function(element) {
		$scope.detail = element;
		var begin = Date.parse(new Date($scope.detail.term_start.replace(/-/g, "/")));
		var end = Date.parse(new Date($scope.detail.term_end.replace(/-/g, "/")));
		var myDate = new Date();
		var myCur = myDate.toLocaleDateString();
		var curDate = Date.parse(myCur);
		$scope.lag = Math.round(100 * (curDate - begin) / (end - begin));
		$scope.bioid = element.bioguide_id;
		$http({
			method: "GET",
			url: "http://app12016-env.us-west-1.elasticbeanstalk.com/loadData.php",
			params: {comid: $scope.bioid}
		}).then(function(response) {
			$scope.combylegi = response.data.results;
		});
		$http({
			method: "GET",
			url: "http://app12016-env.us-west-1.elasticbeanstalk.com/loadData.php",
			params: {billid: $scope.bioid}
		}).then(function(response) {
			$scope.billbylegi = response.data.results;
		});
		var buff = [];
		if (storage.hasOwnProperty('favoriteLegi'))
		{
			buff = JSON.parse(storage.getItem('favoriteLegi'));
		}
		var i = 0;
		for (i = 0; i < buff.length; i++)
		{
			if (buff[i].bioguide_id == element.bioguide_id)
				break;
		}
		if (buff.length != 0 && i < buff.length)
		{
			$scope.favid = "favafter";
		}
		else
		{
			$scope.favid = "favbefore";
		}
	};

	$http({
		method: "GET",
		url: "http://app12016-env.us-west-1.elasticbeanstalk.com/loadData.php",
		params: {key: "billactive"}
	}).then(function(response) {
		$scope.billactive = response.data.results;
	});
	$http({
		method: "GET",
		url: "http://app12016-env.us-west-1.elasticbeanstalk.com/loadData.php",
		params: {key: "billnew"}
	}).then(function(response) {
		$scope.billnew = response.data.results;
	});
	$scope.billData = function(element) {
		$scope.billDetail = element;
		$scope.trustSrc = $sce.trustAs($sce.RESOURCE_URL, element.last_version.urls.pdf);
		var buff = [];
		if (storage.hasOwnProperty('favoriteBill'))
		{
			buff = JSON.parse(storage.getItem('favoriteBill'));
		}
		var i = 0;
		for (i = 0; i < buff.length; i++)
		{
			if (buff[i].bioguide_id == element.bioguide_id)
				break;
		}
		if (buff.length != 0 && i < buff.length)
		{
			$scope.favid = "favafter";
		}
		else
		{
			$scope.favid = "favbefore";
		}
	}

	$http({
		method: "GET",
		url: "http://app12016-env.us-west-1.elasticbeanstalk.com/loadData.php",
		params: {key: "committees"}
	}).then(function(response) {
		$scope.committees = response.data.results;
	});
	$scope.favoriteLegi = JSON.parse(storage.getItem('favoriteLegi'));
	$scope.getFavoriteLegi = function(element) {
		var buff = [];
		if (storage.hasOwnProperty('favoriteLegi'))
		{
			buff = JSON.parse(storage.getItem('favoriteLegi'));
		}
    	if ($scope.favid == "favbefore")
		{
			buff.push(element);
			storage.setItem('favoriteLegi', JSON.stringify(buff));
			$scope.favoriteLegi = buff;
			$scope.favid = "favafter";
		}
		else if ($scope.favid == "favafter")
		{
			var i = 0;
			for (i = 0; i < buff.length; i++)
			{
				if (buff[i].bioguide_id == element.bioguide_id)
					break;
			}
			buff.splice(i, 1);
			storage.removeItem('favoriteLegi');
			storage.setItem('favoriteLegi', JSON.stringify(buff));
			$scope.favoriteLegi = buff;
			$scope.favid = "favbefore";
		}
	};
	$scope.removeFavoriteLegi = function(element) {
		var buff = [];
		if (storage.hasOwnProperty('favoriteLegi'))
		{
			buff = JSON.parse(storage.getItem('favoriteLegi'));
		}
		var i = 0;
		for (i = 0; i < buff.length; i++)
		{
			if (buff[i].bioguide_id == element.bioguide_id)
				break;
		}
		buff.splice(i, 1);
		storage.removeItem('favoriteLegi');
		storage.setItem('favoriteLegi', JSON.stringify(buff));
		$scope.favoriteLegi = buff;
		$scope.favid = "favbefore";
	};
	$scope.favoriteBill = JSON.parse(storage.getItem('favoriteBill'));
	$scope.getFavoriteBill = function(element) {
		var buff = [];
		if (storage.hasOwnProperty('favoriteBill'))
		{
			buff = JSON.parse(storage.getItem('favoriteBill'));
		}
    	if ($scope.favid == "favbefore")
		{
			buff.push(element);
			storage.setItem('favoriteBill', JSON.stringify(buff));
			$scope.favoriteBill = buff;
			$scope.favid = "favafter";
		}
		else if ($scope.favid == "favafter")
		{
			var i = 0;
			for (i = 0; i < buff.length; i++)
			{
				if (buff[i].bill_id == element.bill_id)
					break;
			}
			buff.splice(i, 1);
			storage.removeItem('favoriteBill');
			storage.setItem('favoriteBill', JSON.stringify(buff));
			$scope.favoriteBill = buff;
			$scope.favid = "favbefore";
		}
	};
	$scope.removeFavoriteBill = function(element) {
		var buff = [];
		if (storage.hasOwnProperty('favoriteBill'))
		{
			buff = JSON.parse(storage.getItem('favoriteBill'));
		}
		var i = 0;
		for (i = 0; i < buff.length; i++)
		{
			if (buff[i].bill_id == element.bill_id)
				break;
		}
		buff.splice(i, 1);
		storage.removeItem('favoriteBill');
		storage.setItem('favoriteBill', JSON.stringify(buff));
		$scope.favoriteBill = buff;
		$scope.favid = "favbefore";
	};
	$scope.favoriteCom = JSON.parse(storage.getItem('favoriteCom'));
	$scope.getFavoriteCom = function(element) {
		var buff = [];
		if (storage.hasOwnProperty('favoriteCom'))
		{
			buff = JSON.parse(storage.getItem('favoriteCom'));
		}
		var id = "#" + element.committee_id;
		var star = angular.element(document.querySelector(id));
		var style = star.css("color");
    	if (style == "white")
		{
			buff.push(element);
			storage.setItem('favoriteCom', JSON.stringify(buff));
			$scope.favoriteCom = buff;
			star.css("color", "yellow");
		}
		else if (style == "yellow")
		{
			var i = 0;
			for (i = 0; i < buff.length; i++)
			{
				if (buff[i].committee_id == element.committee_id)
					break;
			}
			buff.splice(i, 1);
			storage.removeItem('favoriteCom');
			storage.setItem('favoriteCom', JSON.stringify(buff));
			$scope.favoriteCom = buff;
			star.css("color", "white");
		}
	};
	$scope.removeFavoriteCom = function(element) {
		var buff = [];
		if (storage.hasOwnProperty('favoriteCom'))
		{
			buff = JSON.parse(storage.getItem('favoriteCom'));
		}
		var i = 0;
		for (i = 0; i < buff.length; i++)
		{
			if (buff[i].committee_id == element.committee_id)
				break;
		}
		buff.splice(i, 1);
		storage.removeItem('favoriteCom');
		storage.setItem('favoriteCom', JSON.stringify(buff));
		$scope.favoriteCom = buff;
		var id = "#" + element.committee_id;
		var star = angular.element(document.querySelector(id));
		var style = star.css("color");
		star.css("color", "white");
	};
	$scope.pageChangeHandler = function(num) {
	  console.log('page changed to ' + num);
	};
}

myApp.controller('MyController', MyController);
