<?php
namespace Addons\AntFusion\Traits;

trait HasParent {
    protected $parent;

    public function setParent($parent) {
        $this->parent = $parent;
        return $this;
    }

    public function getParent() {
        return $this->parent ?? null;
    }

    public function getRoot() {
        if ($this->parent && method_exists($this->parent, 'getRoot')) {
            return $this->parent->getRoot();
        } else if ($this->parent) {
            return $this->parent;
        } else {
            return $this;
        }
    }
}