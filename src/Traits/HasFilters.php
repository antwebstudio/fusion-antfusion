<?php
namespace Addons\AntFusion\Traits;

trait HasFilters {
    protected $filters = [];

    protected function filters() {
        return $this->filters;
    }

    protected function filtersArray() {
        $array = [];
        foreach ($this->filters() as $filter) {
            $array[] = $filter->toArray();
        }
        return $array;
    }

    public function setFilters($filters)
    {
        $this->filters = $filters;
        return $this;
    }

    protected function defaultFilterValues()
    {
        $array = [];
        foreach ($this->filters() as $filter) {
            $array[$filter->getHandle()] = $filter->defaultValue();
        }
        return $array;
    }
}