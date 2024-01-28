<?php
namespace Addons\AntFusion;

use Illuminate\Support\Str;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Database\Eloquent\Builder;

class Filter {
    use \Addons\AntFusion\Traits\HasMeta;

    protected $component = 'filter-tabs';

    protected $builtin = false;

    public function apply($request, $query, $value) {
    }

    protected function getName() {
        return Str::snake(class_basename(static::class));
    }

    public function getHandle() {
        return Str::snake(class_basename(static::class));
    }

    public function getAllowedFilter() {
        return AllowedFilter::callback($this->getHandle(), function (Builder $query, $value) {
            return $this->apply(request(), $query, $value);
        });
    }

    public function toArray() {
        $options = collect($this->options(request()))->mapWithKeys(function($option, $key) {
            return [__($key) => $option];
        })->toArray();
        
        return array_merge($this->meta, [
            'id' => 'filter_'.unique_id(),
            'component' => $this->component,
            'handle' => $this->getHandle(),
            'options' => $options,
            'builtin' => $this->builtin,
        ]);
    }

    public function options($request)
    {
		return [];
    }

    public function defaultValue()
    {
        return collect($this->options(request()))->first();
    }
}