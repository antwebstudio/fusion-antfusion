<?php
namespace Addons\AntFusion\Components;

use Addons\AntFusion\Component;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilderRequest;

class MetricCard extends Component {
    use \Addons\AntFusion\Traits\HasParent;

    protected $component = 'metric-item';

    protected function resource() {
        return $this->parent;
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
        return $this->withMeta(['value' => $value]);
    }

    public function icon($icon) {
        return $this->withMeta(['icon' => $icon]);
    }

    public function url($url) {
        return $this->withMeta(['url' => $url]);
    }
}