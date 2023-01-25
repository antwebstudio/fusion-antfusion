<?php
namespace Addons\AntFusion\Traits;

trait HasMeta {
    protected $meta = [];

    public function withMeta($meta) {
        $this->meta = array_merge($this->meta, $meta);
        return $this;
    }
}