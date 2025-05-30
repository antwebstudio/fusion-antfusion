<?php
namespace Addons\AntFusion\Components;

class ArrayComponent extends \Addons\AntFusion\Component {
    protected $array = [];

    public function __construct($array) {
        $this->array = $array;
    }

    public function toArray() {
        return array_merge($this->array, $this->meta);
    }
}