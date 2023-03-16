<?php
namespace Addons\AntFusion\Components;

use Addons\AntFusion\Component;

class DataTable extends Component 
{
    protected $component = 'resource-datatable';

    public function __construct($endpoint)
    {
        $this->withMeta([
            'show_order' => false,
            'id' => 'data-table-'.$this->getSlug(),
            'endpoint' => $endpoint,
        ]);
    }
}