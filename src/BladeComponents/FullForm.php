<?php

namespace Addons\AntFusion\BladeComponents;

use Illuminate\View\Component;

class FullForm extends Component
{
    protected $resource;

    protected $value = [];

    protected $debug = false;

    public function __construct($resource, $value = [], $debug = false)
    {
        $this->resource = $resource;
        $this->value = $value;
        $this->debug = $debug;
    }

    public function render()
    {
        $resource = app('resources.'.$this->resource);
        return view('antfusion::blade-components.form', [
            'resource' => $resource,
            'formValues' => $this->value,
            // 'debug' => config('app.debug'),
            'debug' => $this->debug,
        ]);
    }

}
