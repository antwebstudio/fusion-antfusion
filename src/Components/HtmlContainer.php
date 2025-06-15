<?php
namespace Addons\AntFusion\Components;

use Addons\AntFusion\Action;

class HtmlContainer extends ArrayComponent {
    protected $array = [];

    protected $content;
    protected $loadingContent;

    protected $ajax = false;

    public function __construct($array) {

        parent::__construct([
            'component' => 'html-component',
            'containerClass' => 'col px-1 w-full sm:w-1/2',
        ]);
    }

    public function setParent($parent, $indexInParent = null, $indexPrefix = '') {
        $this->parent = $parent;
        if (isset($indexInParent) && $indexPrefix) {
            $this->indexInParent = $indexPrefix.'_'.$indexInParent;
        }
        return $this;
    }

    public function content($callback)
    {
        $this->content = $callback;
        return $this;
    }

    public function loadingContent($callback)
    {
        $this->loadingContent = $callback;
        return $this;
    }

    public function actions()
    {
        return [
            Action::make('load_content')
                ->action(function() {
                    return [
                        'content' => $this->evaluate($this->content),
                    ];
                }),
        ];
    }

    public function toArray() {
        if ($this->ajax) {
            $this->withMeta([
                'loadingContent' => $this->evaluate($this->loadingContent),
                'action' => [
                    'action' => 'load_content',
                    'path' => $this->getPath(),
                    'url' => $this->getActionUrl($this->getSlug()),
                ],
            ]);
        }
        return array_merge($this->array, $this->getMeta());
    }

    public function ajax() {
        $this->ajax = true;
        $this->withMeta([
            'ajax' => $this->ajax,
        ]);
        return $this;
    }
}