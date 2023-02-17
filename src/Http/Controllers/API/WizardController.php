<?php
namespace Addons\AntFusion\Http\Controllers\API;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class WizardController extends Controller
{
    public function validate(Request $request) {
        $path = str_replace(':', '.', Str::before($request->path, '.'));
        $resource = app($path);
        return $resource->getComponentByPath(Str::after($request->path, '.'))->validateStep($request->step, $request);
    }
}