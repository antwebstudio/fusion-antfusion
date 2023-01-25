<?php
namespace Addons\AntFusion\Actions;

use Addons\AntFusion\Action;

class Create extends Action {
    protected $name = 'Create';
    protected $standalone = true;

    public function handle($request, $entries) {
        $resourceSlug = $this->parent->getSlug();

        return [
            'redirect' => '/resource/'.$resourceSlug.'/create',
        ];
    }

    public function getActionUrl($actionSlug) {
        $resourceSlug = $this->parent->getSlug();

        return '/resource/'.$resourceSlug.'/create';
    }

}