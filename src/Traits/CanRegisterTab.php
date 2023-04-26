<?php
namespace Addons\AntFusion\Traits;

use Illuminate\Http\Request;
use Addons\AntFusion\Services\PageTabManager;
use Addons\AntFusion\Http\Resources\ResourceResource;

trait CanRegisterTab {
    protected static $pageTabManager;

    public static function registerTab($label, $componentName, $attributes = []) {
        $pageTabManager = static::getPageTabManager();
        return $pageTabManager->registerTab($label, $componentName, $attributes);
    }

    public static function getTabs() {
        $pageTabManager = static::getPageTabManager();
        return $pageTabManager->getTabs();
    }

    public static function getPageTabManager() {
        if (!isset(static::$pageTabManager)) static::$pageTabManager = new PageTabManager;
        return static::$pageTabManager;
    }
}