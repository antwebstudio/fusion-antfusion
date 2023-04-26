<?php

// Resource
Route::get('antfusion/resource/{resource}', 'ResourceController@index');
Route::get('antfusion/resource/{main}/{id}/{resource}', 'ResourceController@index');

// Report
Route::get('antfusion/report/{report}/from/{from}/to/{to}', 'ReportController@index');