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
        if ($request->path) {
            $page = app('page.'.$request->page);
            $action = $page->getComponentByPath(Str::after($request->path, '.'));
            return $action->performAction($request);
        }
        $page = app('page.'.$request->page);
        return $page->performAction($request->action, $request);
    }
}