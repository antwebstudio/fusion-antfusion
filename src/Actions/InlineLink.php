<?php
namespace Addons\AntFusion\Actions;

class InlineLink extends Link {
    protected $redirect;
    protected $standalone = true;

    public function __construct($name, $url)
    {
        parent::__construct($name, $url);

        $this->onlyInline();
    }
}