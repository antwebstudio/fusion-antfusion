<?php
namespace Addons\AntFusion\Components;

use Illuminate\Support\Str;
use Addons\AntFusion\Component;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilderRequest;

class MetricCard extends Component {
    use \Addons\AntFusion\Traits\HasParent;

    protected $component = 'metric-item';

    protected $format = true;

    protected function resource() {
        return $this->parent;
    }

    public function calculateAndFormat(...$arguments)
    {
        $value = $this->calculate(...$arguments);
        if ($this->format) {
            return $this->format($value);
        }
        return $value;
    }

    protected function format($value)
    {
        $decimalPlace = stripos($value, '.') !== false ? Str::length(Str::after($value, '.')) : 0;
        return number_Format($value, $decimalPlace);
    }

    public function query() {
        $query = QueryBuilder::for($this->resource()->dataTableQuery());
        $query->allowedFilters($this->resource()->getAllowedFilters());
        return $query;
    }
    
    public function label($label) {
        return $this->withMeta(['label' => $label]);
    }

    public function value($value) {
        return $this->withMeta(['metric_value' => $value]);
    }

    public function icon($icon) {
        return $this->withMeta(['icon' => $icon]);
    }

    public function url($url) {
        return $this->withMeta(['url' => $url]);
    }
}