<?php
namespace Addons\AntFusion\Http\Controllers\Web;

use Illuminate\Routing\Controller;

class PageController extends Controller
{
    public function index($component) 
    {
        return view('antfusion::page.index', [
            'component' => $component,
            'action' => null,
        ]);
    }
}