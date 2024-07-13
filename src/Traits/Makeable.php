<?php
namespace Addons\AntFusion\Traits;

trait Makeable {
    public static function make(... $arguments) {
        return new static(... $arguments);
    }
}