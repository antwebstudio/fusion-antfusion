<?php
namespace Addons\AntFusion\Traits;

trait CanPrint {

    public function printHeadings()
    {
        $headings = $this->exportToExcelHeadings();
        return $headings;
    }

    public function printMap($model)
    {
        $map = $this->exportToExcelMap($model);
        return $map;
    }
}