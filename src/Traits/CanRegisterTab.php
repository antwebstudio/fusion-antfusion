<?php
namespace Addons\AntFusion\Traits;

use Illuminate\Http\Request;
use Addons\AntFusion\Components\Tabs;
use Addons\AntFusion\Components\ArrayComponent;
use Addons\AntFusion\Services\PageTabManager;
use Addons\AntFusion\Http\Resources\ResourceResource;

trait CanRegisterTab {
    protected static $pageTabManager;

    public static function registerTab($label, $component, $attributes = []) {
        $pageTabManager = static::getPageTabManager();
        return $pageTabManager->registerTab($label, $component, $attributes);
    }

    public static function getTabs() {
        $pageTabManager = static::getPageTabManager();
        return $pageTabManager->getTabs();
    }

    public static function getPageTabManager() {
        if (!isset(static::$pageTabManager)) static::$pageTabManager = new PageTabManager;
        return static::$pageTabManager;
    }

    protected function getTabsManagerComponent() {
        $tabs = static::getTabs();

        $component = Tabs::make();
        foreach ($tabs as $tab) {
            $component->addTab($tab['label'], [
                is_object($tab['component']) ? $tab['component'] : new ArrayComponent($tab),
            ]);
        }
        return $component;
    }
}