<?php
namespace Addons\AntFusion\Traits;

trait HasParent {
    protected $parent;
    protected $indexInParent;

    public function setParent($parent, $indexInParent = null, $indexPrefix = '') {
        $this->parent = $parent;
        if (isset($indexInParent) && $indexPrefix) {
            $this->indexInParent = $indexPrefix.'_'.$indexInParent;
        }
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