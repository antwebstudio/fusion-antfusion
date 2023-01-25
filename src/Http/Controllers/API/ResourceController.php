<?php
namespace Addons\AntFusion\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Addons\AntFusion\Http\Resources\ResourceResource;

class ResourceController extends Controller
{
    public function show(Request $request) {
        $resource = app('resources.'.$request->resource);
        return $resource->findOrFail($request->resourceId);
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

    public function update(Request $request) {
        $resource = app('resources.'.$request->resource);
        return $resource->update($request);
    }
    
    public function performAction(Request $request)
    {
        $resource = app('resources.'.$request->resource);
        return $resource->performAction($request->action, $request);
    }

    public function index(Request $request) {
        $resource = app('resources.'.$request->resource);
        return $resource->toIndexArray();
    }
}