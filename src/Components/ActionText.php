<?php

namespace Addons\AntFusion\Components;

use Addons\AntFusion\Actions\CustomAction;

class ActionText extends CustomAction
{
    protected $component = 'action-text';

    protected $standalone = false;

    public function __construct($name, $callback)
    {
        parent::__construct($name, $callback);

        $this->withMeta(['name' => $name]);
    }
}
