<?php
namespace Addons\AntFusion\Http\Controllers\Web;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PrintController extends Controller
{
    public function index(Request $request) 
    {
        $resource = app('resources.'.$request->resource);
        $query = $resource->dataTableQuery();

        $filters = collect($resource->filters())->keyBy(function($filter) {
            return $filter->getHandle();
        });

        foreach($request->filters as $filterName => $value) {
            if (isset($value)) {
                $filters[$filterName]->applyToQuery($request, $query, $value);
            }
        }
        return view('antfusion::print.index', [
            'resource' => $resource,
            'query' => $query,
            'paginate' => $query->paginate(300),
        ]);
    }
}