<?php
namespace Addons\AntFusion;

use Illuminate\Support\Str;

class Component {
    use \Addons\AntFusion\Traits\HasActions;
    use \Addons\AntFusion\Traits\HasParent;
    use \Addons\AntFusion\Traits\HasPath;
    use \Addons\AntFusion\Traits\ShowInTrait;
    use \Addons\AntFusion\Traits\HasMeta;

    protected $id;

    protected $slug;

    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    public function getActionUrl($actionSlug) {
        if (isset($this->parent)) {
            return $this->parent->getActionUrl($actionSlug);
        }
    }

    public function getHandle() {
        return Str::snake(class_basename(static::class));
    }

    public function getSlug() {
        return $this->slug ?? Str::kebab(class_basename(static::class));
    }

    public static function make(...$arguments)
    {
        return new static(...$arguments);
    }
}