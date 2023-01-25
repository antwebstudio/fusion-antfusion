<?php
namespace Addons\AntFusion\Http\Controllers\API;

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

    public function performAction(Request $request)
    {
        $page = app('page.'.$request->page);
        return $page->performAction($request->action, $request);
    }
}