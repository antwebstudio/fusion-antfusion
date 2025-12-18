<?php
namespace Addons\AntFusion\Http\Controllers\DataTable;

use Fusion\Models\Matrix;
use Fusion\Services\Builders;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Fusion\Http\Controllers\DataTableController;

class ResourceController extends DataTableController {
    public function resource() {
        $resource = app('resources.'.request()->resource);
        if (request()->main) {
            $resource->setMainResource(request()->main);
        }
        return $resource;
    }
    
    public function index(Request $request)
    {
        return response()->json([
            'displayable'         => array_values($this->getDisplayableColumns()),
            'sortable'            => array_values($this->getSortable()),
            'column_names'        => $this->getCustomColumnNames(),
            'column_types'        => $this->getCustomColumnTypes(),
            'column_props'        => $this->getCustomColumnProps(),
            'records'             => $this->getRecords($request),
            'bulk_actions'        => $this->getBulkActions(),
            'bulk_actions_exempt' => $this->getExemptFromBulkActions(),
            'metrics'             => $this->getMetrics(),
        ]);
    }

    public function getMetrics() {
        return $this->resource()->getMetrics();
    }

    public function getRecords(Request $request) {

        return $this->resource()->getDataTableRecordsForController();

        $paginate = parent::getRecords($request);
        // if ($paginate !== []) {
            $resource = $this->resource();
            $paginate = $resource->getDataTableRecords($paginate);

            $paginate->through(function($record) use($resource) {
                $data = $resource->processDataTableRecord($record);
                $data['resource'] = ['slug' => $resource->getSlug(), 'handle' => $resource->getHandle()];
                $data['actions'] = $resource->getActionsForRecord($record);

                return $data;
            });

            return $paginate;
        // }
        // return ['data' => []];
    }

    public function builder() {
        return $this->resource()->dataTableQuery();
    }

    public function getDisplayableColumns()
    {
        return $this->resource()->getDisplayableColumns();
    }

    public function getFilterable()
    {
        return $this->resource()->getFilterable();
    }

    public function getAllowedSorts()
    {
        return $this->resource()->getAllowedSorts();
    }
  
    public function getSortable()
    {
        return $this->resource()->getSortable();
    }

    public function getCustomColumnNames() 
    {
        return $this->resource()->getCustomColumnNames();
    }
    
    public function getCustomColumnTypes()
    {
        return $this->resource()->getCustomColumnTypes();
    }
    
    public function getCustomColumnProps()
    {
        return $this->resource()->getCustomColumnProps();
    }

    public function getRelationships()
    {
        return $this->resource()->getDataTableWith();
    }
    
    protected function getAllowedFilters()
    {
        return $this->resource()->getAllowedFilters();
    }

    protected function getBulkActions()
    {
        return $this->resource()->getBulkActions();
    }

    public function getExemptFromBulkActions()
    {
        return $this->resource()->getExemptFromBulkActions();
    }
}