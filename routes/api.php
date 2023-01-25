<?php

// Resource
Route::get('antfusion/resource/{resource}', 'ResourceController@index');
Route::post('antfusion/resource/{resource}', 'ResourceController@store');
Route::patch('antfusion/resource/{resource}/{resourceId}', 'ResourceController@update');

Route::get('antfusion/resource/{resource}/create', 'ResourceController@create');
Route::get('antfusion/resource/{resource}/{resourceId}', 'ResourceController@show');
Route::get('antfusion/resource/{resource}/{resourceId}/edit', 'ResourceController@edit');

Route::post('antfusion/resource/{resource}/{resourceId}/action/{action}', 'ResourceController@performAction');
Route::post('antfusion/resource/{resource}/action/{action}', 'ResourceController@performAction');

// Report
Route::get('antfusion/report/{report}', 'ReportController@index');

// Page
Route::get('antfusion/page/{page}', 'PageController@index');
Route::post('antfusion/page/{page}/action/{action}', 'PageController@performAction');

