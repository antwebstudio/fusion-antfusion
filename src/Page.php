<?php
namespace Addons\AntFusion;

use Fusion\Facades\Menu;
use Illuminate\Support\Str;

class Page {
    use \Addons\AntFusion\Traits\HasActions;
    use \Addons\AntFusion\Traits\HasComponents;

    protected $name;

    protected $component = 'page-as-component';

    protected $icon = 'layer-group';

    protected $pageType = 'page';

    public function getActionUrl($actionSlug) {
        return '/api/antfusion/page/'.$this->getSlug().'/action/'.$actionSlug;
    }

    public function getHandle() {
        return Str::snake($this->name);
    }

    public function getSlug() {
        return Str::kebab($this->name);
    }

    public function getIcon() {
        return $this->icon;
    }

    public static function register() {
    }

    public function boot() {
        app()->bind($this->pageType.'.'.$this->getSlug(), function() {
            return new static;
        });
    }

    public function toArray() {
        $pageArray = $this->pageArray();
        $pageArray['page'] = [
            'title' => $this->name,
        ];
        $pageArray['components'] = $this->componentsArray();
        $pageArray['actions'] = $this->actionsArray();
        $pageArray['component'] = $this->component;

        return $pageArray;
    }

    public function pageArray() {
        return [];
    }

    public function menu() {
        Menu::set('admin.page-'.$this->getSlug(), [
            'title' => $this->name,
            'to'    => '/'.$this->pageType.'/'.$this->getSlug(),
            'icon'  => 'grip-horizontal',
        ]);
    }
}