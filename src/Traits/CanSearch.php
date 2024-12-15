<?php
namespace Addons\AntFusion\Traits;

use Spatie\QueryBuilder\AllowedSort;
use Illuminate\Support\Str;

trait CanSearch {
    protected $searchable;

    public function searchable($searchable = true) {
        $this->searchable = $searchable;
        return $this;
    }

    public function isSearchable() {
        return $this->searchable;
    }

    public function getSearchableColumn()
    {
        return $this->evaluate($this->searchable);
    }
}