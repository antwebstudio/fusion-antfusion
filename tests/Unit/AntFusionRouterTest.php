<?php

namespace Tests\Unit\AntFusion;

use Tests\TestCase;
use Addons\AntFusion\Page;
use Addons\AntFusion\Field;
use Addons\AntFusion\Action;
use Addons\AntFusion\Components\Form;
use Addons\AntFusion\Services\AntFusionRouter;

class AntFusionRouterTest extends TestCase
{
    public function test() {
        $router = new AntFusionRouter;
        $router->registerAdminRoute('/taxonomies/{id}', StockSheet::class, [
            
        ]);
        $routes = $router->getAdminRoutes();

        $this->assertEquals('antfusion-page', $routes[0]['component']);
    }
}

class StockSheet extends Page {
    protected $registerMenu = false;

    public function components() {
        return [
            new StockSheetForm,
        ];
    }
}

class StockSheetForm extends Form
{
    public function fields()
    {
        return [
        ];
    }
}