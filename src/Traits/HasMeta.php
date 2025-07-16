<?php
namespace Addons\AntFusion\Traits;

trait HasMeta {
    protected $meta = [];

    protected $evaluableMeta = [];

    public function withMeta($meta, $value = null) {
        if (is_callable($value)) {
            $this->evaluableMeta[$meta] = $value;
        } else if (isset($callable)) {
            $this->meta[$meta] = $value;
        } else {
            $this->meta = array_merge($this->meta, $meta);
        }
        return $this;
    }

    public function getMeta()
    {
        foreach ($this->evaluableMeta as $meta => $value) {
            $this->meta[$meta] = $this->evaluate($value);
        }
        return $this->meta;
    }
}