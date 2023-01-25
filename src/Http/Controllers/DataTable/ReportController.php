<?php
namespace Addons\AntFusion\Http\Controllers\DataTable;

use Fusion\Models\Matrix;
use Illuminate\Http\Request;
use Fusion\Services\Builders;
use Illuminate\Routing\Controller;
use Spatie\QueryBuilder\QueryBuilder;
use Fusion\Http\Controllers\DataTableController;

class ReportController extends DataTableController {
    public function resource() {
        return app('report.'.request()->report);
    }

    public function getRecords(Request $request) {
        $paginate = parent::getRecords($request);
        $records = is_object($paginate) ? $paginate->toArray() : $paginate;
        // $resource = $this->resource();
        // foreach ($records['data'] as &$record) {
            // $record['actions'] = $resource->getActionsForRecord($record);
        // }
        return $records;
    }

    public function builder() {
        return $this->resource()->query(request());
    }

    public function getDisplayableColumns()
    {
        return $this->resource()->getReportDisplayableColumns();
    }

    public function getFilterable()
    {
        return $this->resource()->getFilterable();
    }
  
    public function getSortable()
    {
        return $this->resource()->getSortable();
    }
    
    public function getCustomColumnTypes()
    {
        return $this->resource()->getCustomColumnTypes();
    }

    protected function getCustomColumnNames()
    {
        return $this->resource()->getCustomColumnNames();
    }

    public function getRelationships()
    {
        return [];
    }
}