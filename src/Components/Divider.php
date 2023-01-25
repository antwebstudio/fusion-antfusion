<?php
namespace Addons\AntFusion\Components;

use Addons\AntFusion\Action;

class Divider extends Action {
    public function __construct() {
        $this->onlyInline();
    }

    public function toArrayForDetail() {
        return [
            'component' => 'ui-dropdown-divider',
        ];
    }
}