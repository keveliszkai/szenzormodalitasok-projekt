<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

// Home page
$app->get('/', function () use ($app) {
    return $app->version();
});

$app->group(['middleware' => 'oauth'], function () use ($app) {
	// Posts
	$app->group(['middleware' => 'oauth', 'prefix' => 'posts'], function () use ($app) {
		$app->get('','PostController@index');
		$app->post('','PostController@store');
		$app->get('{post_id}','PostController@show');
		$app->put('{post_id}', 'PostController@update');
		$app->patch('{post_id}', 'PostController@update');
		$app->delete('{post_id}', 'PostController@destroy');
	});

	// Measurements
	$app->group(['middleware' => 'oauth', 'prefix' => 'measurements'], function () use ($app) {
	    $app->get('','MeasurementController@index');
		$app->post('','MeasurementController@store');
		$app->get('{id}','MeasurementController@show');
		$app->delete('{id}', 'MeasurementController@destroy');
	});

	// Users
	$app->group(['middleware' => 'oauth', 'prefix' => 'users'], function () use ($app) {
		$app->get('', 'UserController@index');
		$app->post('', 'UserController@store');
		$app->get('me', 'UserController@me');
		$app->get('{user_id}', 'UserController@show');
		$app->put('{user_id}', 'UserController@update');
		$app->patch('{user_id}', 'UserController@update');
		$app->delete('{user_id}', 'UserController@destroy');
	});

	// Server
	$app->get('server', 'ServerController@index');
});

// Request an access token
$app->post('/oauth/access_token', function() use ($app){
    return response()->json($app->make('oauth2-server.authorizer')->issueAccessToken());
});
