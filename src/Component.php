<?php
namespace Addons\AntFusion;

class Component {
    use \Addons\AntFusion\Traits\HasActions;
    use \Addons\AntFusion\Traits\HasParent;
    use \Addons\AntFusion\Traits\ShowInTrait;
    use \Addons\AntFusion\Traits\HasMeta;

    public function getActionUrl($actionSlug) {
        if (isset($this->parent)) {
            return $this->parent->getActionUrl($actionSlug);
        }
    }

    public static function make(...$arguments)
    {
        return new static(...$arguments);
    }
}