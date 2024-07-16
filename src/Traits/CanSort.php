<?php
namespace Addons\AntFusion\Traits;

use Spatie\QueryBuilder\AllowedSort;

trait CanSort {
    protected $sortable = true;

    public function sortable($sortable = true) {
        $this->sortable = $sortable;
        return $this;
    }

    public function isSortable() {
        return $this->sortable;
    }

    public function getSortableColumn()
    {
        if ($this->sortable === true) {
            return $this->getHandle();
        }
        if (is_callable($this->sortable)) {
            return AllowedSort::custom($this->getHandle(), new \App\CustomSort($this->sortable));
        }
        return AllowedSort::field($this->getHandle(), $this->sortable);
    }
}