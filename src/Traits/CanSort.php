<?php
namespace Addons\AntFusion\Traits;

trait CanSort {
    protected $sortable = true;

    public function sortable($sortable = true) {
        $this->sortable = $sortable;
        return $this;
    }

    public function isSortable() {
        return $this->sortable;
    }
}