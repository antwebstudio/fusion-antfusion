<?php
namespace Addons\AntFusion;

use Illuminate\Support\Str;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Database\Eloquent\Builder;

class Filter {
    protected $component = 'filter-tabs';

    public function apply($request, $query, $value) {
    }

    protected function getName() {
        return Str::snake(class_basename(static::class));
    }

    protected function getHandle() {
        return Str::snake(class_basename(static::class));
    }

    public function getAllowedFilter() {
        return AllowedFilter::callback($this->getHandle(), function (Builder $query, $value) {
            return $this->apply(request(), $query, $value);
        });
    }

    public function toArray() {
        return [
            'component' => $this->component,
            'handle' => $this->getHandle(),
            'options' => $this->options(request()),
            'builtin' => false,
        ];
    }

    public function options($request)
    {
		return [];
    }
}