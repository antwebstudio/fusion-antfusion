<?php
namespace Addons\AntFusion\Http\Controllers\DataTable;

use Fusion\Models\Matrix;
use Fusion\Services\Builders;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Fusion\Http\Controllers\DataTableController;

class ResourceController extends DataTableController {
    public function resource() {
        return app('resources.'.request()->resource);
    }

    public function getRecords(Request $request) {
        $paginate = parent::getRecords($request);
        if ($paginate !== []) {
            $resource = $this->resource();
            $paginate = $resource->getDataTableRecords($paginate);
            $records = json_decode($paginate->toJson(), true);
            foreach ($records['data'] as &$record) {
                $record['resource'] = ['slug' => $resource->getSlug(), 'handle' => $resource->getHandle()];
                $record['actions'] = $resource->getActionsForRecord($record);
            }
        }
        return $records ?? ['data' => []];
    }

    public function builder() {
        return $this->resource()->query();
    }

    public function getDisplayableColumns()
    {
        return $this->resource()->getDisplayableColumns();
    }

    public function getFilterable()
    {
        return $this->resource()->getFilterable();
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

    public function getRelationships()
    {
        return [];
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