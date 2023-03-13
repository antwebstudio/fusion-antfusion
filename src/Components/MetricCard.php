<?php
namespace Addons\AntFusion\Components;

use Addons\AntFusion\Component;

class MetricCard extends Component {
    protected $component = 'metric-item';
    
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