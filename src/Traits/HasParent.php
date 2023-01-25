<?php
namespace Addons\AntFusion\Traits;

trait HasParent {
    protected $parent;

    public function setParent($parent) {
        $this->parent = $parent;
        return $this;
    }
}