<?php
namespace Addons\AntFusion\Components;

use Addons\AntFusion\Component;

class DataTable extends Component 
{
    use \Addons\AntFusion\Traits\HasFilters;

    protected $component = 'resource-datatable';

    public function __construct($endpoint)
    {
        $this->component = config('antfusion.datatable.component', 'resource-datatable');

        $this->withMeta([
            'show_order' => false,
            'id' => 'data-table-'.$this->getSlug(),
            'endpoint' => $endpoint,
        ]);
    }

    public function noSearch() {
        return $this->withMeta(['no-search' => true]);
    }

    public function toArray() {
        return array_merge(parent::toArray(), [
            'filters' => $this->filtersArray(),
        ]);
    }
}