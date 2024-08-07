<?php
namespace Addons\AntFusion\Http\Controllers\API;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Addons\AntFusion\Http\Resources\ResourceResource;

class PageController extends Controller
{
    public function index(Request $request) 
    {
        $page = app('page.'.$request->page);
        return $page->toArray();
    }

    public function updateDependantField(Request $request) 
    {
        $page = app('page.'.$request->page);
        $field = $page->getComponentByPath(Str::after($request->path, '.'));
        return $field->toArrayWithDependant($request);
    }

    public function performAction(Request $request)
    {
        $page = app('page.'.$request->page);
        
        if (isset($request->route['resource'])) {
            $page->setMainResource($request->route['resource']);
        }

        if ($request->path) {
            $action = $page->getComponentByPath(Str::after($request->path, '.'));
            return $action->performAction($request);
        }
        return $page->performAction($request->action, $request);
    }
}