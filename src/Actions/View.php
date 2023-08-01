<?php
namespace Addons\AntFusion\Actions;

use Addons\AntFusion\Action;

class View extends Action {
    protected $name = 'View';
    protected $dropdown = true;

    public function __construct()
    {
        $this->exceptOnIndex();
    }

    public function handle($request, $entries) {
        $id = $entries->first()->id;
        $resourceSlug = $this->parent->getSlug();

        return [
            'redirect' => '/resource/'.$resourceSlug.'/'.$id.'/view',
        ];
    }

}