<?php
namespace Addons\AntFusion;

use Illuminate\Support\Str;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Database\Eloquent\Builder;

class Filter {
    use \Addons\AntFusion\Traits\HasMeta;
    use \Addons\AntFusion\Traits\Makeable;
    use \Addons\AntFusion\Traits\EvaluatesClosures;

    protected $component = 'filter-tabs';

    protected $builtin = false;

    protected $queryCallback;

    protected $convertOptions = false;

    protected $defaultValue;

    protected $enabled = true;

    public function selectType()
    {
        $this->convertOptions = true;
        $this->component = 'Treeselect';
        return $this->withMeta([
            // 'placeholder' => 'Please Select',
            // 'multiple' => true,
        ]);
    }

    public function default($callback)
    {
        $this->defaultValue = $callback;
        return $this;
    }

    public function query($callback)
    {
        $this->queryCallback = $callback;
        return $this;
    }

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
            if (isset($this->queryCallback)) {
                return $this->evaluate($this->queryCallback, ['query' => $query, 'request' => request(), 'value' => $value, 'filter' => $this]);
            }
            return $this->apply(request(), $query, $value);
        });
    }

    public function toArray() {
        $options = collect($this->options(request()))->mapWithKeys(function($option, $key) {
            return [__($key) => $option];
        })->toArray();

        if ($this->convertOptions) {
            $options = collect($options)->map(function ($value, $label) {
                return [
                    'id' => $value,
                    'label' => $label,
                    // 'children' => [],
                ];
            })->values()->toArray();
        }
        
        return array_merge($this->meta, [
            'id' => 'filter_'.unique_id(),
            'component' => $this->component,
            'handle' => $this->getHandle(),
            'options' => $options,
            'builtin' => $this->builtin,
        ]);
    }

    public function enabled($value)
    {
        $this->enabled = $value;
        return $this;
    }

    public function isEnabled()
    {
        return $this->evaluate($this->enabled);
    }

    public function options($request)
    {
		return [];
    }

    public function defaultValue()
    {
        if ($this->defaultValue) {
            return $this->evaluate($this->defaultValue);
        }
        return collect($this->options(request()))->first();
    }
}