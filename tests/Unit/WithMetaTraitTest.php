<?php

namespace Tests\Unit\AntFusion;

use Tests\TestCase;

class WithMetaTraitTest extends TestCase
{
    public function test() {
        $meta = ['test' => 'test'];
        $object = new WithMetaTraitTestClass;
        $object->withMeta($meta);
        $this->assertEquals($meta, $object->toArray());
    }
}

class WithMetaTraitTestClass {
    use \Addons\AntFusion\Traits\HasMeta;

    public function toArray() {
        return array_merge($this->meta, [
        ]);
    }
}