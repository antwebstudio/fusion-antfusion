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

    public static function getTabs($params) {
        $pageTabManager = static::getPageTabManager();
        return $pageTabManager->getTabs($params);
    }

    public static function getPageTabManager() {
        if (!isset(static::$pageTabManager)) static::$pageTabManager = new PageTabManager;
        return static::$pageTabManager;
    }

    protected function getTabsManagerComponent($params = []) {
        $tabs = static::getTabs($params);

        $component = Tabs::make();
        foreach ($tabs as $tab) {
            $component->addTab($tab['label'], [
                is_object($tab['component']) ? $tab['component'] : new ArrayComponent($tab),
            ]);
        }
        return $component;
    }
}