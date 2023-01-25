<?php

// Resource
Route::get('antfusion/resource/{resource}', 'ResourceController@index');

// Report
Route::get('antfusion/report/{report}/from/{from}/to/{to}', 'ReportController@index');