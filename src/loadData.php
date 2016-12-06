<?php
	header('Access-Control-Allow-Origin:*');
	$keywords;
	if (isset($_GET['key']))
	{
		$keywords = $_GET['key'];
	}
	if (isset($keywords) && $keywords == "legibystates")
	{
		$response = file_get_contents("https://congress.api.sunlightfoundation.com/legislators?apikey=a7f9b14e379e4735bcec3569f9fa73b8&per_page=all");
		// $response = file_get_contents("http://104.198.0.197:8080/legislators?apikey=a7f9b14e379e4735bcec3569f9fa73b8&per_page=all");
		echo $response;
	}
	else if (isset($keywords) && $keywords == "billactive")
	{
		$response = file_get_contents("https://congress.api.sunlightfoundation.com/bills?history.active=true&apikey=a7f9b14e379e4735bcec3569f9fa73b8&per_page=50");
		// $response = file_get_contents("http://104.198.0.197:8080/bills?history.active=true&apikey=a7f9b14e379e4735bcec3569f9fa73b8&per_page=50");
		echo $response;
	}
	else if (isset($keywords) && $keywords == "billnew")
	{
		$response = file_get_contents("https://congress.api.sunlightfoundation.com/bills?history.active=false&apikey=a7f9b14e379e4735bcec3569f9fa73b8&per_page=50");
		// $response = file_get_contents("http://104.198.0.197:8080/bills?history.active=false&apikey=a7f9b14e379e4735bcec3569f9fa73b8&per_page=50");
		echo $response;
	}
	else if (isset($keywords) && $keywords == "committees")
	{
		$response = file_get_contents("https://congress.api.sunlightfoundation.com/committees?apikey=a7f9b14e379e4735bcec3569f9fa73b8&per_page=all");
		// $response = file_get_contents("http://104.198.0.197:8080/committees?apikey=a7f9b14e379e4735bcec3569f9fa73b8&per_page=all");
		echo $response;
	}

	$comid;
	if (isset($_GET['comid']))
	{
		$comid = $_GET['comid'];
	}
	if (isset($comid))
	{
		$response = file_get_contents("https://congress.api.sunlightfoundation.com/committees?member_ids=".$comid."&apikey=a7f9b14e379e4735bcec3569f9fa73b8&per_page=5");
		// $response = file_get_contents("http://104.198.0.197:8080/committees?member_ids=".$comid."&apikey=a7f9b14e379e4735bcec3569f9fa73b8&per_page=5");
		echo $response;
	}
	$billid;
	if (isset($_GET['billid']))
	{
		$billid = $_GET['billid'];
	}
	if (isset($billid))
	{
		$response = file_get_contents("https://congress.api.sunlightfoundation.com/bills?sponsor_id=".$billid."&apikey=a7f9b14e379e4735bcec3569f9fa73b8&per_page=5");
		// $response = file_get_contents("http://104.198.0.197:8080/bills?sponsor_id=".$billid."&apikey=a7f9b14e379e4735bcec3569f9fa73b8&per_page=5");
		echo $response;
	}
?>