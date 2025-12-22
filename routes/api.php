<?php

// Resource
Route::patch('antfusion/resource/{resource}/sync-fields', 'ResourceController@updateDependantField')->name('antfusion.resource.sync_fields');
Route::get('antfusion/resource/{resource}/create', 'ResourceController@create');
Route::get('antfusion/resource/{resource}', 'ResourceController@index');
Route::post('antfusion/resource/{resource}', 'ResourceController@store');
Route::patch('antfusion/resource/{resource}/{resourceId}', 'ResourceController@update');

Route::get('antfusion/resource/{resource}/show', 'ResourceController@show')->name('antfusion.resource.find');
Route::get('antfusion/resource/{resource}/{resourceId}', 'ResourceController@show');
Route::get('antfusion/resource/{resource}/{resourceId}/edit', 'ResourceController@edit');
Route::get('antfusion/resource/{resource}/{resourceId}/view', 'ResourceController@view');

Route::get('antfusion/resource/{resource}/{resourceId}/actions', 'ResourceController@actions');

Route::post('antfusion/resource/{resource}/{resourceId}/action/{action}', 'ResourceController@performAction');
Route::post('antfusion/resource/{resource}/action/{action}', 'ResourceController@performAction');

// Report
Route::get('antfusion/report/{report}', 'ReportController@index');

// Page
Route::get('antfusion/page/{page}', 'PageController@index');
Route::post('antfusion/page/{page}', 'PageController@index');
Route::post('antfusion/page/{page}/action/{action}', 'PageController@performAction');
Route::patch('antfusion/page/{page}/sync-fields', 'PageController@updateDependantField')->name('antfusion.page.sync_fields');

// Wizard
Route::post('antfusion/wizard/validate', 'WizardController@validate')->name('antfusion.wizard.validate');
