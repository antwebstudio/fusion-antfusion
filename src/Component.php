<?php
namespace Addons\AntFusion;

use Illuminate\Support\Str;

class Component {
    use \Addons\AntFusion\Traits\HasActions;
    use \Addons\AntFusion\Traits\HasParent;
    use \Addons\AntFusion\Traits\HasPath;
    use \Addons\AntFusion\Traits\ShowInTrait;
    use \Addons\AntFusion\Traits\HasMeta;
    use \Addons\AntFusion\Traits\HasHooks;
    use \Addons\AntFusion\Traits\EvaluatesClosures;

    protected $id;

    protected $slug;

    protected $component;

    protected $handle;

    protected $debug;

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
        return $this->handle ?? Str::snake(class_basename(static::class));
    }

    public function getSlug() {
        return $this->slug ?? Str::kebab(class_basename(static::class));
    }

    public static function make(...$arguments)
    {
        return new static(...$arguments);
    }

    public function toArray() {
        $component = $this->component ?? Str::kebab(class_basename(static::class));
        return array_merge($this->getMeta(), [
            'component' => $component,
            'handle' => $this->getHandle(),
            'components' => $this->childrenToArray(),
        ]);
    }

    public function components() {
        return [];
    }

    protected function childrenToArray()
    {
        $children = [];
        foreach ($this->components() as $component) {
            $children[] = $component->toArray();
        }
        return $children;
    }
}