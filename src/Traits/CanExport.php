<?php
namespace Addons\AntFusion\Traits;

trait CanExport {
    public function exportToExcelHeadings()
    {
        return [];
    }

    public function exportToExcelQuery() {
        return $this->query();
    }

    public function exportToExcelMap($model) {
        return $model->getAttributes();
    }
}