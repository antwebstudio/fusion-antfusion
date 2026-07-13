<?php
namespace Addons\AntFusion\Components;

use Addons\AntFusion\Action;

class Divider extends Action {
    protected $dropdown = true;
    
    protected static $counter = 0;
    
    public function __construct() {
        $this->onlyInline();
        
        self::$counter++;
        $this->handle = 'divider-' . self::$counter;
    }

    public function toArrayForDetail($record) {
        return [
            'component' => 'ui-dropdown-divider',
            'handle' => $this->handle,
        ];
    }
}
