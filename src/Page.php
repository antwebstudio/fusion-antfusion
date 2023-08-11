<?php
namespace Addons\AntFusion;

use Fusion\Facades\Menu;
use Illuminate\Support\Str;

class Page {
    use \Addons\AntFusion\Traits\HasActions;
    use \Addons\AntFusion\Traits\HasComponents;
    use \Addons\AntFusion\Traits\HasPath;

    protected $name;

    protected $component = 'page-as-component';

    protected $icon = 'layer-group';

    protected $pageType = 'page';

    protected $registerMenu = true;

    public function getTitle() {
        return $this->name ?? Str::headline(class_basename(static::class));
    }

    public function getActionUrl($actionSlug) {
        return '/api/antfusion/page/'.$this->getSlug().'/action/'.$actionSlug;
    }

    public function getHandle() {
        return Str::snake($this->name ?? class_basename(static::class));
    }

    public function getSlug() {
        return Str::kebab($this->name ?? class_basename(static::class));
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
            'title' => $this->getTitle(),
            'icon' => $this->getIcon(),
        ];
        $pageArray['title'] = $this->getTitle();
        $pageArray['icon'] = $this->getIcon();
        $pageArray['components'] = $this->componentsArray();
        $pageArray['actions'] = $this->actionsArray();
        $pageArray['component'] = $this->component;
        $pageArray['debug'] = config('app.debug');

        return $pageArray;
    }

    public function pageArray() {
        return [];
    }

    public function menu() {
        if ($this->registerMenu) {
            Menu::set('admin.page-'.$this->getSlug(), [
                'title' => $this->getTitle(),
                'to'    => '/'.$this->pageType.'/'.$this->getSlug(),
                'icon'  => $this->getIcon(),
            ]);
        }
    }

    public function components() {
        return [
            \Addons\AntFusion\Components\ArrayComponent::make([
                'component' => $this->component,
            ]),
        ];
    }

    public function toRouteArray()
    {
        return [
            'component' => 'antfusion-page',
            'props' => $this->toArray(),
        ];
    }
}