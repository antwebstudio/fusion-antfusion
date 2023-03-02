<?php

namespace Tests\Unit\AntFusion;

use Addons\AntFusion\Traits\HasParent;
use Addons\AntFusion\Traits\HasPath;
use Tests\TestCase;

class HasPathTraitTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testGetPath()
    {
        $component = new TestComponent('test');
        $this->assertEquals('test', $component->getPath());

        $parentComponent = new TestComponent('parent-test');
        $component->setParent($parentComponent);

        $this->assertEquals('parent-test.test', $component->getPath());
    }
}

class TestComponent {
    use HasPath;
    use HasParent;

    public function __construct($slug)
    {
        $this->slug = $slug;   
    }

    public function getSlug() {
        return $this->slug;
    }
}