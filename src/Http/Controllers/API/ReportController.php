<?php
namespace Addons\AntFusion\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ReportController extends Controller
{
    public function resource() {
        return app('report.'.request()->report);
    }

    public function index(Request $request)
    {
        return $this->resource()->toArray();
    }
}