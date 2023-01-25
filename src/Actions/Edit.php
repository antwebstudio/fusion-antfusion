<?php
namespace Addons\AntFusion\Actions;

use Addons\AntFusion\Action;

class Edit extends Action {
    protected $name = 'Edit';

    public function __construct()
    {
        $this->exceptOnIndex();
    }

    public function handle($request, $entries) {
        $id = $entries->first()->id;
        $resourceSlug = $this->parent->getSlug();

        return [
            'redirect' => '/resource/'.$resourceSlug.'/'.$id.'/edit',
        ];
    }

}