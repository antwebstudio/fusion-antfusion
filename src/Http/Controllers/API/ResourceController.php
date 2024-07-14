<?php
namespace Addons\AntFusion\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Addons\AntFusion\Http\Resources\ResourceResource;
use Illuminate\Support\Str;

class ResourceController extends Controller
{
    public function show(Request $request) {
        $resource = app('resources.'.$request->resource);
        return $resource->getShowRecord($resource->findOrFail($request->resourceId));
    }

    public function store(Request $request) {
        $resource = app('resources.'.$request->resource);
        return $resource->create($request);
    }

    public function create(Request $request) {
        $resource = app('resources.'.$request->resource);
        return $resource->createMeta();
    }

    public function edit(Request $request) {
        $resource = app('resources.'.$request->resource);
        return $resource->editMeta($request->resourceId);
    }

    public function view(Request $request) {
        $resource = app('resources.'.$request->resource);
        return $resource->viewMeta($request->resourceId);
    }

    public function update(Request $request) {
        $resource = app('resources.'.$request->resource);
        return $resource->update($request);
    }
    
    public function performAction(Request $request)
    {
        $resource = app('resources.'.$request->resource);
        if (isset($request->route['resource'])) {
            $resource->setMainResource($request->route['resource']);
        }
        if ($request->path) {
            $action = $resource->getComponentByPath(Str::after($request->path, '.'));
            return $action->performAction($request);
        }
        return $resource->performAction($request->action, $request);
    }

    public function index(Request $request) {
        $resource = app('resources.'.$request->resource);
        return $resource->toIndexArray();
    }

    public function updateDependantField(Request $request) 
    {
        $resource = app('resources.'.$request->resource);
        $field = $resource->getComponentByPath(Str::after($request->path, '.'));
        return $field->toArrayWithDependant($request);
    }
}