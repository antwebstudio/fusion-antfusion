<?php
namespace Addons\AntFusion\Actions;

use Addons\AntFusion\Action;

class Link extends Action {
    protected $redirect;
    protected $standalone = true;

    public function __construct($name, $url)
    {
        $this->name = $name;
        $this->redirect = $url;
    }

    public function getActionUrl($actionSlug) {
        if ($this->standalone) {
            return $this->redirect;
        } else {
            return parent::getActionUrl($actionSlug);
        }
    }

    public function handle($request, $entries) {
        if (is_callable($this->redirect)) {
            $redirect = call_user_func($this->redirect, $entries->first());
        } else {
            $redirect = $this->redirect;
        }
        return [
            'redirect' => $redirect,
        ];
    }

    public function onlyInline() {
        $this->standalone = false;
        return $this->onlyShowIn('inline');
    }
}