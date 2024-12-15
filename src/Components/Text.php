<?php
namespace Addons\AntFusion\Components;

use Addons\AntFusion\Field;
use Addons\AntFusion\Fields\Fusion;
use Addons\AntFusion\Contracts\Panel;

class Text extends Field {

    protected $component = 'text-component';

    protected $html = false;

    protected $ajax = false;

    protected $content;

    protected $dateFormat;

    public function __construct($attribute)
    {
        $this->handle = $attribute;
        
        $this->withMeta(['load_record' => [$attribute => $attribute]]);

        $this->withMeta('html', function() {
            return $this->html;
        });
        $this->withMeta('ajax', function() {
            return $this->ajax;
        });
        $this->withMeta('content', function() {
            return $this->content;
        });
        $this->withMeta('label', function() {
            return $this->label;
        });
        $this->getStateUsing(function($state) {
            if (isset($this->dateFormat)) {
                return \Carbon\Carbon::parse($state)->format($this->dateFormat);
            }
            return $state;
        });
    }

    public function content($content)
    {
        $this->content = $content;
        return $this;
    }

    public function format($format)
    {
        $this->dateFormat = $format;
        return $this;
    }

    // public function ajax()
    // {
    //     $this->ajax = true;
    //     return $this;
    // }

    public function html()
    {
        $this->html = true;
        return $this;
    }
}