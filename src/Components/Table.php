<?php
namespace Addons\AntFusion\Components;

use Addons\AntFusion\Component;
use Addons\AntFusion\Fields\Fusion;
use Addons\AntFusion\Contracts\Panel;

/***
Example usage:
    Table::make()
        ->addRows([
            new \App\AntFusion\Reports\Report1,
        ])
 */
class Table extends Component implements Panel {
    use \Addons\AntFusion\Traits\HasFields;
    use \Addons\AntFusion\Traits\Container;

    protected $rows = [];

    protected $component = 'antfusion-html-table';

    public function toArray() {
        return array_merge($this->meta, [
            'is_panel' => true,
            'component' => 'nested-component',
            'as' => $this->component,
            'children' => $this->convertFieldsToArray($this->rows),
            'fields' => $this->flatternFieldsArray(),
        ]);
    }

    public function addHeaderRow($header) {
        if (is_string($header)) {
            $this->rows[] = Fusion::make('Table Header Row', 'table_header_row')->setComponent('antfusion-html-table-header-row')->withMeta([
                'content' => $header,
            ]);
        }
        return $this;
    }

    public function addRows($components) {
        foreach ($components as $component) {
            $this->addRow($component);
        }
        return $this;
    }

    public function addRow($component) {
        $this->rows[] = $component;
        return $this;
    }

    public function fields() {
        return $this->rows;
    }
}