<?php

namespace Addons\AntFusion\AllowedSorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class SortByRelation implements Sort
{
  protected $column;

  public function __construct($column = null)
  {
      $this->column = $column;
  }

  public function __invoke(Builder $query, bool $descending, string $property)
  {
    return $query->orderByPowerJoins($this->column ?? $property, $descending ? "desc" : "asc");
  }
}